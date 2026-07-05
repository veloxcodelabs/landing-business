import React, { useEffect } from "react";

export default function AiPayment() {
  useEffect(() => {
    // ---- HIDE CHATBOT (generic) ----
    const hideChatbot = () => {
      const chat =
        document.querySelector("#chatbot") ||
        document.querySelector(".chatbot") ||
        document.querySelector("[class*='chat']") ||
        document.querySelector("iframe[src*='chat']") ||
        document.querySelector("iframe[src*='bot']");

      if (chat) {
        chat.style.display = "none";
      }

      // hide possible floating buttons
      const floating =
        document.querySelector("[class*='widget']") ||
        document.querySelector("[class*='intercom']") ||
        document.querySelector("[class*='crisp']") ||
        document.querySelector("[id*='chat']");

      if (floating) {
        floating.style.display = "none";
      }
    };

    hideChatbot();

    // ---- LOAD PAYPAL SDK ----
    if (!document.getElementById("paypal-sdk")) {
      const script = document.createElement("script");
      script.id = "paypal-sdk";
      script.src =
        "https://www.paypal.com/sdk/js?client-id=BAAVYiC-srs0QQ7eQzFSPWsDfdJxKxthYO920jVotBhncf-yHaoRwrA_AOdHpsvzPCvCzWsQxa6UzGm5gA&components=hosted-buttons&disable-funding=venmo&currency=EUR";
      script.async = true;
      script.onload = () => {
        if (window.paypal) {
          window.paypal
            .HostedButtons({
              hostedButtonId: "ZM7D8VVQS7NGE",
            })
            .render("#paypal-container");
        }
      };
      document.head.appendChild(script);
    }

    // restore on exit
    return () => {
      const chat =
        document.querySelector("#chatbot") ||
        document.querySelector(".chatbot") ||
        document.querySelector("[class*='chat']") ||
        document.querySelector("iframe[src*='chat']") ||
        document.querySelector("iframe[src*='bot']");

      if (chat) {
        chat.style.display = "block";
      }

      const floating =
        document.querySelector("[class*='widget']") ||
        document.querySelector("[class*='intercom']") ||
        document.querySelector("[class*='crisp']") ||
        document.querySelector("[id*='chat']");

      if (floating) {
        floating.style.display = "block";
      }
    };
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "column",
        backgroundColor: "#fff",
        padding: "2rem",
        paddingTop: "1rem",
      }}
    >
      <div
        style={{
          maxWidth: "600px",
          width: "100%",
          textAlign: "center",
          border: "1px solid #eee",
          borderRadius: "10px",
          padding: "2rem",
          boxShadow: "0 0 10px rgba(0,0,0,0.05)",
        }}
      >
        <h2 style={{ fontSize: "1.8rem", fontWeight: "700", marginBottom: "1rem" }}>
          Готов AI Чатбот 💬
        </h2>

        <p style={{ fontSize: "1rem", color: "#444", marginBottom: "1rem" }}>
          💬 Вземи своя AI чатбот за €15! Стартирай автоматични разговори с клиенти
          за минути – без кодиране.
        </p>

        <h3 style={{ fontWeight: "600", marginBottom: "1rem" }}>
          Какво включва пакетът:
        </h3>

        <ul
          style={{
            textAlign: "left",
            listStyleType: "disc",
            margin: "0 auto 2rem auto",
            paddingLeft: "1.5rem",
            maxWidth: "500px",
            lineHeight: "1.6",
            color: "#333",
          }}
        >
          <li>Напълно готов AI чатбот</li>
          <li>Автоматични отговори</li>
          <li>Подходящ за сайтове и бизнеси</li>
          <li>Цена: €15</li>
        </ul>

        <p style={{ fontWeight: "bold", fontSize: "1.1rem" }}>€15.00 EUR</p>

        <div
          id="paypal-container"
          style={{
            display: "block",
            maxWidth: "400px",
            width: "100%",
            margin: "0 auto",
            textAlign: "center",
          }}
        ></div>
      </div>
    </div>
  );
}