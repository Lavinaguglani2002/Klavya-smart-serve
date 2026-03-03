
export async function run(prompt) {
  try {
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": "AIzaSyCnA8SWQq_AU2hePs2x77jwiF59X1m-5_s", // 🔐 Replace with your actual API key
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (reply) return reply;
    else return "⚠️ No response from Gemini.";
  } catch (error) {
    console.error("❌ Gemini API error:", error);
    return "Error while generating response.";
  }
}
