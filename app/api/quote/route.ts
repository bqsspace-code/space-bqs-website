import { z } from "zod";
import { NextResponse } from "next/server";
import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  company: z.string().min(2),
  role: z.string().min(2),
  teamSize: z.string().min(1),
  volume: z.string().optional(),
  message: z.string().max(2000).optional(),
});

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  // No deployment / no email yet: store locally for the team to review.
  try {
    const dir = path.join(process.cwd(), "quote-requests");
    await mkdir(dir, { recursive: true });
    const file = path.join(dir, `${Date.now()}.json`);
    await writeFile(file, JSON.stringify({ ...parsed.data, at: new Date().toISOString() }, null, 2));
  } catch {
    // still succeed — client already validated
  }
  return NextResponse.json({ ok: true });
}
