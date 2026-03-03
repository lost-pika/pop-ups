(function () {

  // ===== Skip inside Theme Editor =====
  const isThemeEditor =
    window.Shopify && window.Shopify.designMode;

  if (isThemeEditor) return;

  // ===== Wait for DOM =====
  function domReady() {
    return new Promise((resolve) => {
      if (
        document.readyState === "complete" ||
        document.readyState === "interactive"
      ) {
        resolve();
      } else {
        document.addEventListener("DOMContentLoaded", resolve);
      }
    });
  }

  // ===== MAIN INIT =====
  async function init() {
    await domReady();

    const instances = window.EXPLI_POPUPS || [];
    if (!instances.length) return;

    for (const [index, instance] of instances.entries()) {
  initPopup(instance, index);
}
  }

  // ===== FETCH POPUP =====
 async function initPopup({ shop, appUrl, popupId }, index){
  if (!popupId) return;

  try {
    const res = await fetch(
      `${appUrl}/api/popups/by-id?shop=${shop}&id=${popupId}`
    );

    if (!res.ok) return;

    const popup = await res.json();

    // 🔥 IMPORTANT LINE
    if (!popup || !popup.config) return;

   renderPopup(popup.config, index);

  } catch (err) {
    console.error("Expli popup error:", err);
  }
}

  // ===== RENDER =====
  function renderPopup(config, index){

    const uniqueId = "expli-popup-" + index;
    if (document.getElementById(uniqueId)) return;

    const el = document.createElement("div");
    el.id = uniqueId;

    el.style.position = "fixed";
    applyPosition(el, config.position, index);
    el.style.background = config.bgColor || "#fff";
    el.style.color = config.textColor || "#000";
    el.style.padding = "20px";
    el.style.borderRadius = (config.borderRadius || 12) + "px";
    el.style.boxShadow = "0 10px 30px rgba(0,0,0,0.2)";
    el.style.zIndex = "99999";
    el.style.maxWidth = "320px";
    el.style.fontFamily =
      config.fontFamily === "serif" ? "serif" : "sans-serif";

    // animation start
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "all 0.3s ease";

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

    requestAnimationFrame(() => {
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    });
  }

  function applyPosition(el, position, index = 0) {

  // reset first
  el.style.top = "";
  el.style.bottom = "";
  el.style.left = "";
  el.style.right = "";
  el.style.transform = "";
  el.style.width = "";
  el.style.maxWidth = "";
  el.style.borderRadius = "";

  switch (position) {

  case "modal":
    el.style.top = "50%";
    el.style.left = "50%";
    el.style.transform = "translate(-50%, -50%)";
    el.style.maxWidth = "420px";
    break;

  case "top-bar":
    el.style.top = "0";
    el.style.left = "0";
    el.style.right = "0";
    el.style.width = "100%";
    el.style.borderRadius = "0";
    el.style.maxWidth = "none";
    break;

  case "bottom-right":
    el.style.bottom = `${20 + index * 140}px`;
    el.style.right = "20px";
    break;

  case "bottom-left":
    el.style.bottom = `${20 + index * 140}px`;
    el.style.left = "20px";
    break;

  default:
    el.style.bottom = "20px";
    el.style.right = "20px";
}
}

  init();

})();