import { Outlet, useLoaderData } from "react-router";
import { AppProvider } from "@shopify/shopify-app-react-router/react";
import { authenticate } from "../shopify.server";
import { useState } from "react";
import { AppContext } from "../context/AppContext";

export const loader = async ({ request }) => {
  await authenticate.admin(request);
  return {
    apiKey: process.env.SHOPIFY_API_KEY || "",
  };
};

export default function AppLayout() {
  const { apiKey } = useLoaderData();
  
  // App State
  const [myPopups, setMyPopups] = useState([]);
  const [currentPopupConfig, setCurrentPopupConfig] = useState(null);
  const [previewMode, setPreviewMode] = useState("desktop");
  const [appEmbedEnabled, setAppEmbedEnabled] = useState(true);

  // --- HANDLERS ---

  const handleUseTemplate = (template) => {
    setCurrentPopupConfig({
      ...template,
      id: `popup_${Date.now()}`, 
      internalName: `Draft ${template.name}`,
      status: "active",
      overlayOpacity: 40,
    });
  };

  const handleManualCreate = () => {
    setCurrentPopupConfig({
      id: `popup_${Date.now()}`,
      internalName: "Manual Pop-up",
      heading: "New Offer",
      subheading: "GET20OFF",
      buttonText: "Claim Now",
      bgColor: "#ffffff",
      textColor: "#000000",
      btnColor: "#008060",
      position: "modal",
      borderRadius: 16,
      shadowIntensity: 20,
      overlayOpacity: 40,
      fontFamily: "sans",
    });
  };

  // const handleSavePopup = () => {
  //   if (!currentPopupConfig) return;

  //   setMyPopups((prev) => {
  //     // Logic to check if we are updating an existing one or adding new
  //     const existingIndex = prev.findIndex((p) => p.id === currentPopupConfig.id);
      
  //     if (existingIndex > -1) {
  //       const updated = [...prev];
  //       updated[existingIndex] = {
  //         ...updated[existingIndex],
  //         name: currentPopupConfig.internalName,
  //         config: currentPopupConfig,
  //       };
  //       return updated;
  //     } else {
  //       return [
  //         ...prev,
  //         {
  //           id: currentPopupConfig.id,
  //           name: currentPopupConfig.internalName,
  //           status: "active",
  //           views: 0,
  //           clicks: 0,
  //           config: currentPopupConfig,
  //         },
  //       ];
  //     }
  //   });
  //   setCurrentPopupConfig(null);
  // };

const handleSavePopup = async () => {
  if (!currentPopupConfig) return;

  const res = await fetch("/api/popups/save", {
    method: "POST",
    credentials: "include", // 🔥 CRITICAL
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(currentPopupConfig),
  });

  if (!res.ok) {
    console.error("Save failed");
    return;
  }

  setCurrentPopupConfig(null);
};

  const handleDeletePopup = (id) => {
    setMyPopups((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <AppProvider embedded apiKey={apiKey}>
      <s-app-nav>
        <s-link href="/app">Dashboard</s-link>
        <s-link href="/app/templates">Templates</s-link>
        <s-link href="/app/editor">Editor</s-link>
        <s-link href="/app/settings">Settings</s-link>
      </s-app-nav>
      <AppContext.Provider
        value={{
          myPopups,
          appEmbedEnabled,
          setAppEmbedEnabled,
          currentPopupConfig,
          setCurrentPopupConfig,
          previewMode,
          setPreviewMode,
          handleUseTemplate,
          handleManualCreate,
          handleSavePopup,
          handleDeletePopup,
        }}
      >
        <Outlet />
      </AppContext.Provider>
    </AppProvider>
  );
}