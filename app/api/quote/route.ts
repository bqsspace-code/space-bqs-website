import { quoteSchema } from "../../lib/quote-schema";
import { NextResponse } from "next/server";
import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = quoteSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  // No deployment / no email yet: store locally for the team to review.
  try {
    const dir = path.join(process.cwd(), "quote-requests");
    await mkdir(dir, { recursive: true });
    const file = path.join(dir, `${Date.now()}-${randomUUID()}.json`);
    await writeFile(file, JSON.stringify({ ...parsed.data, at: new Date().toISOString() }, null, 2));
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
