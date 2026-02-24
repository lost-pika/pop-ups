(async function () {
  // ===== Prevent duplicate execution =====
  if (window.__EXPLI_POPUP_LOADED__) return;
  window.__EXPLI_POPUP_LOADED__ = true;

  const shop = window.EXPLI_SHOP;
  const appUrl = window.EXPLI_APP_URL;

  if (!shop || !appUrl) return;

  try {
    const res = await fetch(
      `${appUrl}/api/popups/active?shop=${shop}`
    );

    if (!res.ok) return;

    const popup = await res.json();
    if (!popup || !popup.config) return;

    renderPopup(popup.config);
  } catch (err) {
    console.error("Expli popup error:", err);
  }
})();


// ===== POPUP RENDERER =====
function renderPopup(config) {
  const el = document.createElement("div");

  el.style.position = "fixed";
  el.style.bottom = "20px";
  el.style.right = "20px";
  el.style.background = config.bgColor || "#fff";
  el.style.color = config.textColor || "#000";
  el.style.padding = "20px";
  el.style.borderRadius = (config.borderRadius || 12) + "px";
  el.style.boxShadow = "0 10px 30px rgba(0,0,0,0.2)";
  el.style.zIndex = "99999";
  el.style.maxWidth = "320px";
  el.style.fontFamily =
    config.fontFamily === "serif" ? "serif" : "sans-serif";

  el.innerHTML = `
    <h3 style="margin:0 0 10px;font-size:20px;font-weight:700;">
      ${config.heading || ""}
    </h3>

    <p style="margin:0 0 16px;font-size:14px;opacity:.8;">
      ${config.subheading || ""}
    </p>

    <button style="
      background:${config.btnColor || "#008060"};
      color:white;
      border:none;
      padding:10px 14px;
      border-radius:8px;
      cursor:pointer;
      width:100%;
      font-weight:600;
    ">
      ${config.buttonText || "Click"}
    </button>
  `;

  document.body.appendChild(el);
}