export default async function handler(req, res) {
  const mp3Url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/generate-tts`;

  const twiml = `
    <Response>
      <Play>${mp3Url}</Play>
    </Response>
  `;

  res.setHeader("Content-Type", "text/xml");
  res.status(200).send(twiml);
}
