"use client";

import Script from "next/script";
import React from "react";

declare global {
  interface Window {
    vapiSDK?: { run: (config: any) => void };
  }
}

const ASSISTANT_ID = "4914d5c9-e0ad-4593-9d93-eeb34a4e4aee";
const VAPI_PUBLIC_KEY = "c417c6e6-10ca-4c74-b02c-ba2e19db58a5";

export default function Page(): JSX.Element {
  return (
    <section
      style={{
        borderRadius: 18,
        background: "rgba(255,255,255,.06)",
        border: "1px solid rgba(255,255,255,.14)",
        padding: 18,
        backdropFilter: "blur(10px)"
      }}
    >
      <Script
        src="https://cdn.jsdelivr.net/gh/VapiAI/html-script-tag@latest/dist/assets/index.js"
        strategy="afterInteractive"
        onLoad={() => {
          if (!window.vapiSDK?.run) return;

          window.vapiSDK.run({
            apiKey: VAPI_PUBLIC_KEY,
            assistant: ASSISTANT_ID,
            config: {
              position: "bottom-right",
              theme: { primary: "#00E5FF", secondary: "#0B1022" }
            }
          });
        }}
      />

      <div style={{ display: "grid", gridTemplateColumns: "1.1fr .9fr", gap: 18 }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 30, lineHeight: 1.15, fontWeight: 900 }}>
            Robx Innovations â€” <strong>Chat + Voice</strong> Assistant
          </h1>

          <p style={{ margin: "10px 0 0", color: "rgba(234,240,255,.72)", lineHeight: 1.55 }}>
            The Vapi widget is enabled (bottom-right). Click it and allow microphone permissions.
          </p>
        </div>

        <div style={{ borderRadius: 16, overflow: "hidden", border: "1px solid rgba(255,255,255,.14)" }}>
          <img
            src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1400&q=80"
            alt="Robotics"
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        </div>
      </div>
    </section>
  );
}
