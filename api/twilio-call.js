import twilio from "twilio";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { phone } = req.body;
  if (!phone) {
    return res.status(400).json({ error: "Phone number required" });
  }

  try {
    const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH);

    const call = await client.calls.create({
      to: phone,
      from: process.env.TWILIO_NUMBER, // your Twilio number
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/twilio-voice`
    });

    res.status(200).json({ success: true, call });
  } catch (err) {
    console.error("Twilio Call Error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
}
