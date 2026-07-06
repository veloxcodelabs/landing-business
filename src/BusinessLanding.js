import React, { useEffect, useState } from "react";

export default function AiPayment() {
  const [paypalError, setPaypalError] = useState(false);

  useEffect(() => {
    // ---- 1. INITIALIZE CHATBOX ----
    const scriptId = "chatbox-script";
    const initChat = () => {
      if (window.Chatbox && document.getElementById('my-chatbox')) {
        window.Chatbox.init({
          elementId: 'my-chatbox',
          backendUrl: 'https://my-vercel-api-ecru.vercel.app/api/chat',
          language: 'en',
          clientPrompt: `Official Style Assistant for Martitony. 
          1. HOW IT WORKS: Upload photo + prompt = AI redesign.
          2. PRICING: 1000 credits/$1. 10000 credits/$9.
          3. PRIVACY: Data deleted within 60s.
          4. CONTACT: Message us on WhatsApp at https://wa.me/5521959474552`
        });
      }
    };

    let chatScript = document.getElementById(scriptId);
    if (!chatScript) {
      chatScript = document.createElement('script');
      chatScript.id = scriptId;
      chatScript.src = "https://my-vercel-api-ecru.vercel.app/chatbox.bundle.js";
      chatScript.async = true;
      chatScript.onload = initChat;
      document.body.appendChild(chatScript);
    } else {
      initChat();
    }

    // ---- 2. LOAD PAYPAL SDK ----
    if (!document.getElementById("paypal-sdk")) {
      const ppScript = document.createElement("script");
      ppScript.id = "paypal-sdk";
      ppScript.src = "https://www.paypal.com/sdk/js?client-id=BAAVYiC-srs0QQ7eQzFSPWsDfdJxKxthYO920jVotBhncf-yHaoRwrA_AOdHpsvzPCvCzWsQxa6UzGm5gA&components=hosted-buttons&disable-funding=venmo&currency=EUR";
      ppScript.async = true;
      ppScript.onload = () => {
        if (window.paypal && window.paypal.HostedButtons) {
          window.paypal.HostedButtons({ hostedButtonId: "ZM7D8VVQS7NGE" }).render("#paypal-container");
        } else {
          setPaypalError(true);
        }
      };
      ppScript.onerror = () => setPaypalError(true);
      document.head.appendChild(ppScript);
    }
  }, []);

  return (
    <div style={{ padding: "2rem", display: "flex", flexDirection: "column", alignItems: "center" }}>
      {/* Container for your Chatbox */}
      <div id="my-chatbox" style={{ marginBottom: "2rem" }}></div>

      {/* Payment Section */}
      <div style={{ maxWidth: "600px", width: "100%", textAlign: "center", border: "1px solid #eee", borderRadius: "10px", padding: "2rem" }}>
        <h2>Готов AI Чатбот 💬</h2>
        <div id="paypal-container" style={{ minHeight: "150px" }}>
          {paypalError && <p style={{ color: "red" }}>Плащането е блокирано. Моля, изключете AdBlocker.</p>}
        </div>
      </div>
    </div>
  );
}