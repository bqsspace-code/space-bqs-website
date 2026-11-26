import { spawn } from "node:child_process";
import { createServer } from "node:net";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const cli = path.join(root, "node_modules", "next", "dist", "bin", "next");

function reservePort() {
  return new Promise((resolve, reject) => {
    const server = createServer();
    server.once("error", reject);
    server.listen(0, "127.0.0.1", () => {
      const address = server.address();
      if (!address || typeof address === "string") {
        server.close();
        reject(new Error("Could not reserve a local port"));
        return;
      }
      const { port } = address;
      server.close((error) => error ? reject(error) : resolve(port));
    });
  });
}

function decodeHtml(value) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#([0-9]+);/g, (_, decimal) => String.fromCodePoint(Number(decimal)));
}

function metaContent(html, property) {
  const escaped = property.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const tag = html.match(new RegExp(`<meta\\s+[^>]*(?:name|property)=["']${escaped}["'][^>]*>`, "i"))?.[0];
  return tag?.match(/content=["']([^"']*)["']/i)?.[1] ?? null;
}

function canonicalHref(html) {
  const tags = html.match(/<link\b[^>]*>/gi) ?? [];
  const tag = tags.find((item) => /rel=["']canonical["']/i.test(item));
  return tag?.match(/href=["']([^"']*)["']/i)?.[1] ?? null;
}

async function waitForServer(baseUrl, child) {
  const started = Date.now();
  while (Date.now() - started < 60_000) {
    if (child.exitCode !== null) throw new Error(`Next server exited with ${child.exitCode}`);
    try {
      const response = await fetch(baseUrl, { signal: AbortSignal.timeout(2_000) });
      if (response.ok) return;
    } catch {
      // Wait for Next to bind its port.
    }
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
  throw new Error("Next production server did not become ready within 60 seconds");
}

const port = await reservePort();
const baseUrl = `http://127.0.0.1:${port}`;
const server = spawn(process.execPath, [cli, "start", "--hostname", "127.0.0.1", "--port", String(port)], {
  cwd: root,
  env: { ...process.env, PORT: String(port) },
  stdio: "ignore",
});

const fail = [];
try {
  await waitForServer(baseUrl, server);

  const [robotsResponse, sitemapResponse] = await Promise.all([
    fetch(`${baseUrl}/robots.txt`),
    fetch(`${baseUrl}/sitemap.xml`),
  ]);
  const robots = await robotsResponse.text();
  const sitemap = await sitemapResponse.text();
  if (!robotsResponse.ok) fail.push(`robots.txt returned ${robotsResponse.status}`);
  if (!sitemapResponse.ok) fail.push(`sitemap.xml returned ${sitemapResponse.status}`);
  if (!robots.includes("Sitemap: https://aibqs.com/sitemap.xml")) fail.push("robots.txt sitemap URL is not https://aibqs.com/sitemap.xml");
  if (/spacebqs\.example|www\.spacebqs\.example/i.test(sitemap)) fail.push("sitemap contains a placeholder or noncanonical host");
  if (!robots.includes("Disallow: /api/")) fail.push("robots.txt does not disallow crawling the API path");

  const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
  if (urls.length === 0) fail.push("sitemap contains no URLs");

  const titles = new Map();
  const descriptions = new Map();
  for (const listedUrl of urls) {
    const pathName = new URL(listedUrl).pathname;
    const response = await fetch(`${baseUrl}${pathName}`, { redirect: "manual" });
    if (!response.ok) {
      fail.push(`${pathName} returned ${response.status}`);
      continue;
    }
    const html = await response.text();
    const title = decodeHtml(html.match(/<title>([^<]*)<\/title>/i)?.[1] ?? "").trim();
    const description = decodeHtml(metaContent(html, "description") ?? "").trim();
    const canonical = canonicalHref(html);
    const canonicalUrl = canonical ? new URL(canonical, baseUrl).toString() : null;
    const expectedCanonical = `https://aibqs.com${pathName === "/" ? "/" : pathName}`;
    const h1Count = (html.match(/<h1\b/gi) ?? []).length;

    if (!title) fail.push(`${pathName} has no title`);
    if (title && titles.has(title)) fail.push(`${pathName} duplicates title from ${titles.get(title)}: ${title}`);
    if (title) titles.set(title, pathName);
    if (!description) fail.push(`${pathName} has no meta description`);
    if (description && descriptions.has(description)) fail.push(`${pathName} duplicates description from ${descriptions.get(description)}`);
    if (description) descriptions.set(description, pathName);
    if (!canonicalUrl) fail.push(`${pathName} has no canonical link`);
    else if (canonicalUrl !== expectedCanonical) fail.push(`${pathName} canonical mismatch: ${canonicalUrl}`);
    if (h1Count !== 1) fail.push(`${pathName} has ${h1Count} H1 elements, expected one`);
    if (!metaContent(html, "og:title")) fail.push(`${pathName} has no Open Graph title`);
    if (!metaContent(html, "twitter:card")) fail.push(`${pathName} has no Twitter card metadata`);
    if (/spacebqs\.example|www\.spacebqs\.example/i.test(html)) fail.push(`${pathName} HTML contains a placeholder or noncanonical host`);

    const jsonLdEntities = [];
    for (const script of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi)) {
      try {
        const data = JSON.parse(script[1]);
        if (Array.isArray(data["@graph"])) jsonLdEntities.push(...data["@graph"]);
        else jsonLdEntities.push(data);
      } catch {
        fail.push(`${pathName} contains invalid JSON-LD`);
      }
    }

    if (pathName === "/") {
      const types = new Set(jsonLdEntities.flatMap((entity) =>
        Array.isArray(entity["@type"]) ? entity["@type"] : [entity["@type"]],
      ));
      for (const type of ["Organization", "WebSite", "SoftwareApplication", "Product", "Service", "FAQPage"]) {
        if (!types.has(type)) fail.push(`homepage is missing ${type} JSON-LD`);
      }
      const serviceCount = jsonLdEntities.filter((entity) => entity["@type"] === "Service").length;
      if (serviceCount < 2) fail.push(`homepage has ${serviceCount} Service entities, expected at least two`);
    }

    if (["/videos", "/solutions/cargo-wms"].includes(pathName) && !jsonLdEntities.some((entity) => entity["@type"] === "VideoObject")) {
      fail.push(`${pathName} is missing VideoObject JSON-LD`);
    }
    if (pathName === "/videos" && !jsonLdEntities.some((entity) => entity["@type"] === "VideoObject" && entity.name?.startsWith("Space WMS"))) {
      fail.push("/videos is missing the Space WMS VideoObject");
    }
    if (pathName === "/how-we-measure" && !jsonLdEntities.some((entity) => entity["@type"] === "TechArticle")) {
      fail.push("/how-we-measure is missing TechArticle JSON-LD");
    }
  }

  console.log(`Checked ${urls.length} sitemap URLs, canonicals, titles, descriptions, H1 counts, social metadata, and JSON-LD.`);
  if (fail.length) {
    console.error(fail.map((item) => `- ${item}`).join("\n"));
    process.exitCode = 1;
  } else {
    console.log("SEO smoke check passed.");
  }
} finally {
  server.kill();
}
