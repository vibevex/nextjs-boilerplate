export async function POST(req: Request) {
  const { email } = await req.json();

  if (!email) {
    return Response.json({ error: "Email required" }, { status: 400 });
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

  const data = await res.json();

  return Response.json(data);
}