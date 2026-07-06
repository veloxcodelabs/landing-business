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
          language: 'bg', // Set language environment directly to Bulgarian
          clientPrompt: `Ти си любезен търговски асистент за Martitony, който предлага Готов AI Чатбот.
          1. ПРОДУКТ: Готов AI чатбот за сайтове, онлайн магазини и бизнеси.
          2. ЦЕНА: Пакетът струва точно €15.00 EUR (еднократно плащане).
          3. ПРЕДИМСТВА: Автоматични отговори за клиенти, инсталация за минути, без кодиране, вдига продажбите.
          4. КАК СЕ КУПУВА: Чрез PayPal или дебитна карта от бутоните на тази страница.
          5. ПРАВИЛО: Отговаряй кратко (до 2 изречения) винаги на български език и помагай на потребителя да направи покупка.`
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

    // Safe fallback to ensure initialization happens even during fast page refreshes
    const timeout = setTimeout(initChat, 1000);

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

    return () => clearTimeout(timeout);
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