import type { ReactNode } from "react";
import "./globals.css";

export const metadata = {
  title: "ROBX Innovations â€” Chat + Voice Assistant",
  description: "Robx Innovations assistant (text + voice) with DB memory"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div style={{ maxWidth: 1150, margin: "0 auto", padding: "26px 18px 90px" }}>
          <header
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 12,
              padding: "14px 16px",
              borderRadius: 18,
              background: "rgba(255,255,255,.06)",
              border: "1px solid rgba(255,255,255,.14)",
              backdropFilter: "blur(10px)"
            }}
          >
            <div>
              <div style={{ fontWeight: 900, letterSpacing: 0.6 }}>ROBX INNOVATIONS</div>
              <div style={{ marginTop: 4, fontSize: 12, color: "rgba(234,240,255,.72)" }}>
                <strong>Robotics</strong> â€¢ <strong>AI</strong> â€¢ <strong>IoT</strong> â€¢{" "}
                <strong>Automation</strong>
              </div>
            </div>

            <div
              style={{
                fontSize: 12,
                padding: "8px 12px",
                border: "1px solid rgba(255,255,255,.14)",
                borderRadius: 999,
                background: "rgba(255,255,255,.04)",
                color: "rgba(234,240,255,.72)",
                whiteSpace: "nowrap"
              }}
            >
              <strong style={{ color: "#eaf0ff" }}>Chat + Voice</strong> enabled
            </div>
          </header>

          <main style={{ marginTop: 18 }}>{children}</main>

          <footer
            style={{
              marginTop: 26,
              padding: "14px 16px",
              borderRadius: 18,
              background: "rgba(255,255,255,.05)",
              border: "1px solid rgba(255,255,255,.14)",
              color: "rgba(234,240,255,.72)",
              fontSize: 12,
              display: "flex",
              justifyContent: "space-between",
              gap: 12,
              flexWrap: "wrap"
            }}
          >
            <div>
              <strong style={{ color: "#eaf0ff" }}>ROBX Innovations</strong> â€” â€œLearning by Building and Teaching by Doing.â€
            </div>
            <div>
              Memory endpoints: <code>/api/search</code> â€¢ <code>/api/log</code>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
