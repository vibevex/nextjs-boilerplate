export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    // 后端邮箱格式安全防御
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return Response.json(
        { error: "Invalid or missing email" },
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
        redirect: "follow", // 🌟 显式指示跟随 Google 的 302 重定向
      }
    );

    const text = await res.text();
    let parsedData;
    
    // 尝试将其解析为 JSON，解析失败则当做文本返回
    try {
      parsedData = JSON.parse(text);
    } catch {
      parsedData = text;
    }

    return Response.json({
      ok: res.ok,
      googleResponse: parsedData,
    });
  } catch (err: any) {
    return Response.json(
      { ok: false, error: err.message || "Internal Server Error" },
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
