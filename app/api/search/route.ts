import { NextResponse } from "next/server";
import { getPool } from "../_lib/mysql";
import { embedText } from "../_lib/embed";
import { cosineSimilarity } from "../_lib/cosine";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const question = String(body?.question || "");
    const threshold = Number(body?.threshold ?? 0.86);

    if (!question) {
      return NextResponse.json({ error: "question is required" }, { status: 400 });
    }

    const qEmb = await embedText(question);
    const pool = getPool();

    const CANDIDATE_LIMIT = 200;

    const [rows] = await pool.execute<any[]>(
      "SELECT id, question, answer, question_embedding FROM qa_memory ORDER BY id DESC LIMIT ?",
      [CANDIDATE_LIMIT]
    );

    let bestSim = -1;
    let bestRow: any = null;

    for (const r of rows) {
      let emb: number[] | null = null;
      try {
        emb = JSON.parse(r.question_embedding);
      } catch {
        emb = null;
      }
      if (!emb) continue;

      const sim = cosineSimilarity(qEmb, emb);
      if (sim > bestSim) {
        bestSim = sim;
        bestRow = r;
      }
    }

    if (bestRow && bestSim >= threshold) {
      return NextResponse.json({
        found: true,
        similarity: bestSim,
        id: bestRow.id,
        matchedQuestion: bestRow.question,
        answer: bestRow.answer
      });
    }

    return NextResponse.json({ found: false });
  } catch (err: any) {
    return NextResponse.json({ error: true, message: err.message }, { status: 500 });
  }
}
