import { NextResponse } from "next/server";
import { quoteSchema } from "../../lib/quote-schema";
import { buildCreateDemoRequestInput, submitCreateDemoRequest } from "../../lib/demo-request";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = quoteSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: parsed.error.issues[0]?.message ?? "Please check the highlighted fields.",
      },
      { status: 400 },
    );
  }

  try {
    const input = buildCreateDemoRequestInput(parsed.data);
    const created = await submitCreateDemoRequest(input);

    return NextResponse.json({
      ok: true,
      id: created._id,
      formType: created.formType,
      trackingStatus: created.trackingStatus,
      createdAt: created.createdAt,
    });
  } catch (error) {
    const detail = error instanceof Error ? error.message : String(error);
    console.error("[api/quote] Failed to submit CreateDemoRequest:", detail);
    return NextResponse.json(
      {
        ok: false,
        error: "Could not send your demo request just now. Please try again shortly or use the contact details.",
        ...(process.env.NODE_ENV !== "production" ? { detail } : {}),
      },
      { status: 502 },
    );
  }
}
