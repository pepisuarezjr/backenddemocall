import fetch from "node-fetch";

export default async function handler(req, res) {
  try {
    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${process.env.ELEVEN_VOICE_ID}`,
      {
        method: "POST",
        headers: {
          "xi-api-key": process.env.ELEVEN_API_KEY,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          text: "Hi, this is your Talklytics AI Agent calling! How can I help you today?",
          voice_settings: { stability: 0.5, similarity_boost: 0.8 }
        })
      }
    );

    if (!response.ok) {
      const err = await response.text();
      console.error("ElevenLabs error:", err);
      return res.status(500).json({ error: "ElevenLabs failed" });
    }

    const audioBuffer = await response.arrayBuffer();
    res.setHeader("Content-Type", "audio/mpeg");
    res.send(Buffer.from(audioBuffer));
  } catch (err) {
    console.error("TTS error:", err);
    res.status(500).json({ error: err.message });
  }
}
