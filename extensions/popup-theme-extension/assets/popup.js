console.log("Expli popup script loaded");

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

  function waitForPopups() {
  return new Promise((resolve) => {
    const check = () => {
      if (window.EXPLI_POPUPS && window.EXPLI_POPUPS.length) {
        resolve();
      } else {
        setTimeout(check, 50);
      }
    };
    check();
  });
}

  // ===== MAIN INIT =====
 async function init() {
  console.log("INIT RUNNING");
console.log("POPUPS:", window.EXPLI_POPUPS);
console.log("SHOP:", window.EXPLI_SHOP);
console.log("APP URL:", window.EXPLI_APP_URL);
  await domReady();

  const shop = window.EXPLI_SHOP;
  const appUrl = window.EXPLI_APP_URL;

  if (!shop || !appUrl) return;

  try {

  await waitForPopups();

for (const [index, popupRef] of window.EXPLI_POPUPS.entries()) {

    const res = await fetch(
      `${popupRef.appUrl}/api/popups/by-id?shop=${popupRef.shop}&id=${popupRef.popupId}`
    );

    if (!res.ok) continue;

    const popup = await res.json();

    if (!popup || !popup.config) continue;

    renderPopup(popup.config, index);

  }

} catch (err) {
  console.error("Expli popup error:", err);
}
}

function handleAction(config) {

  const action = config.buttonAction || "redirect";

  if (action === "redirect") {

    if (config.buttonUrl) {
      window.location.href = config.buttonUrl;
    }

  }

  if (action === "copy_code") {

    if (config.discountCode) {

      navigator.clipboard.writeText(config.discountCode);

      alert("Discount code copied!");

    }

  }

}

  // ===== RENDER =====
function renderPopup(config, index = 0) {
  const el = document.createElement("div");

  // =============================
  // Base Styles
  // =============================
  el.style.position = "fixed";
  el.style.background = config.bgColor || "#fff";
  el.style.color = config.textColor || "#000";
  el.style.fontFamily = config.fontFamily || "sans-serif";
  el.style.zIndex = "9999";
  el.style.transition = "all 0.3s ease";
  el.style.opacity = "0";

  // Border radius
  el.style.borderRadius =
    config.position === "top-bar"
      ? "0px"
      : (config.borderRadius || 16) + "px";

  // Shadow
  const shadow = config.shadowIntensity || 15;
  el.style.boxShadow = `0 15px 40px rgba(0,0,0,${shadow / 100})`;

  applyPosition(el, config.position, index);

  // =============================
  // TOP BAR LAYOUT
  // =============================
  if (config.position === "top-bar") {
    el.style.padding = "14px 24px";
    el.style.display = "flex";
    el.style.alignItems = "center";
    el.style.justifyContent = "center";
    el.style.gap = "20px";

    const heading = document.createElement("div");
    heading.innerText = config.heading || "";
    heading.style.fontWeight = "600";
    heading.style.fontSize = "16px";

    el.appendChild(heading);

   if (config.buttonText) {
  const btn = document.createElement("button");
  btn.innerText = config.buttonText;

  btn.style.padding = "8px 18px";
  btn.style.background = config.btnColor || "#000";
  btn.style.color = "#fff";
  btn.style.borderRadius = "6px";
  btn.style.border = "none";
  btn.style.cursor = "pointer";
  btn.style.fontSize = "14px";

  btn.addEventListener("click", () => {
    handleAction(config);
  });

  el.appendChild(btn);
}

  } else {

    // =============================
    // CARD / MODAL LAYOUT
    // =============================
    el.style.padding = "26px";
    el.style.width = "320px";   // wider than before

    const wrapper = document.createElement("div");
    wrapper.style.display = "flex";
    wrapper.style.flexDirection = "column";
    wrapper.style.alignItems = "center";
    wrapper.style.textAlign = "center";
    wrapper.style.gap = "12px";

    const heading = document.createElement("div");
    heading.innerText = config.heading || "";
    heading.style.fontWeight = "600";
    heading.style.fontSize = "20px";

    wrapper.appendChild(heading);

    if (config.subheading) {
      const sub = document.createElement("div");
      sub.innerText = config.subheading;
      sub.style.fontSize = "14px";
      sub.style.opacity = "0.9";
      wrapper.appendChild(sub);
    }

    if (config.buttonText) {
  const btn = document.createElement("button");
  btn.innerText = config.buttonText;

  btn.style.padding = "10px 22px";
  btn.style.background = config.btnColor || "#000";
  btn.style.color = "#fff";
  btn.style.borderRadius = "8px";
  btn.style.border = "none";
  btn.style.cursor = "pointer";
  btn.style.fontSize = "14px";

  btn.addEventListener("click", () => {
    handleAction(config);
  });

  wrapper.appendChild(btn);
}

    el.appendChild(wrapper);
  }

  // =============================
  // CLOSE BUTTON
  // =============================
  const closeBtn = document.createElement("button");
  closeBtn.innerHTML = "×";
  closeBtn.style.position = "absolute";
  closeBtn.style.top = "10px";
  closeBtn.style.right = "14px";
  closeBtn.style.background = "transparent";
  closeBtn.style.border = "none";
  closeBtn.style.fontSize = "18px";
  closeBtn.style.cursor = "pointer";
  closeBtn.style.color = config.textColor || "#000";

  el.appendChild(closeBtn);

  // =============================
  // MODAL OVERLAY
  // =============================
let overlay = null;

if (config.position === "modal" && !document.querySelector(".expli-overlay")) {
  overlay = document.createElement("div");
  overlay.className = "expli-overlay";
  overlay.style.position = "fixed";
  overlay.style.inset = "0";
  overlay.style.background = `rgba(0,0,0,${
    (config.overlayOpacity || 40) / 100
  })`;
  overlay.style.zIndex = "9998";

  document.body.appendChild(overlay);
}
  function removePopup() {
    el.style.opacity = "0";
    setTimeout(() => {
      el.remove();
      if (overlay) overlay.remove();
    }, 300);
  }

  closeBtn.addEventListener("click", removePopup);

  document.body.appendChild(el);

  requestAnimationFrame(() => {
    el.style.opacity = "1";
  });
}

function applyPosition(el, position, index = 0) {
  el.style.top = "";
  el.style.bottom = "";
  el.style.left = "";
  el.style.right = "";
  el.style.width = "";
  el.style.transform = "";

  const gap = 20;
  const stackOffset = 180;

  switch (position) {

    case "modal":
      el.style.top = "50%";
      el.style.left = "50%";
      el.style.width = "380px";
      el.style.transform = `translate(-50%, calc(-50% + ${index * stackOffset}px))`;
      break;

    case "top-bar":
      el.style.top = `${index * 60}px`;
      el.style.left = "0";
      el.style.right = "0";
      el.style.width = "100%";
      break;

    case "bottom-right":
      el.style.bottom = `${30 + index * (stackOffset)}px`;
      el.style.right = "30px";
      break;

    case "bottom-left":
      el.style.bottom = `${30 + index * (stackOffset)}px`;
      el.style.left = "30px";
      break;

    default:
      el.style.bottom = `${30 + index * (stackOffset)}px`;
      el.style.right = "30px";
  }
}
  init();

})();