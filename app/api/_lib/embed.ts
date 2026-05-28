export async function embedText(text: string): Promise<number[]> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error("Missing OPENAI_API_KEY");

  const resp = await fetch("https://api.openai.com/v1/embeddings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: "text-embedding-3-small",
      input: text
    })
  });

  if (!resp.ok) {
    const body = await resp.text();
    throw new Error(`OpenAI embeddings failed: ${resp.status} ${body}`);
  }

  const data = await resp.json();
  return data.data[0].embedding as number[];
}
