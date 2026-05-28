import { NextResponse } from "next/server";
import { getPool } from "../_lib/mysql";
import { embedText } from "../_lib/embed";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const question = String(body?.question || "");
    const answer = String(body?.answer || "");
    const source = String(body?.source || "mixed");

    if (!question || !answer) {
      return NextResponse.json({ error: "question and answer are required" }, { status: 400 });
    }

    const embedding = await embedText(question);
    const pool = getPool();

    const [result] = await pool.execute(
      "INSERT INTO qa_memory (question, answer, source, question_embedding) VALUES (?, ?, ?, ?)",
      [question, answer, source, JSON.stringify(embedding)]
    );

    return NextResponse.json({ ok: true, id: (result as any).insertId });
  } catch (err: any) {
    return NextResponse.json({ error: true, message: err.message }, { status: 500 });
  }
}
