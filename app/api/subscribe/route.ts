export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return Response.json(
        { error: "Email required" },
        { status: 400 }
      );
    }

    const res = await fetch(
      "https://script.google.com/macros/s/AKfycbxphwMY2jMZKExBFpRGi1heNFfJTRiryC_Mp5oZaGpmW6AweX8-6y_i-ZVlSu6bijyy/exec",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      }
    );

    // ⚠️ 关键优化：Google Apps Script 有时不会返回 JSON
    const text = await res.text();

    return Response.json({
      ok: true,
      googleResponse: text,
    });
  } catch (err: any) {
    return Response.json(
      { ok: false, error: err.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  return Response.json({
    ok: true,
    message: "API is working (use POST to submit email)"
  });
}