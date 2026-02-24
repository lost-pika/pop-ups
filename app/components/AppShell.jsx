import React, { useState } from "react";

import DashboardView from "./DashboardView";
import TemplatesView from "./TemplatesView";
import EditorView from "./EditorView";
import SettingsView from "./SettingsView";

export default function AppShell() {
  const [activeRoute, setActiveRoute] = useState("dashboard");
  const [appEmbedEnabled, setAppEmbedEnabled] = useState(true);
  const [myPopups, setMyPopups] = useState([]);
  const [currentPopupConfig, setCurrentPopupConfig] = useState(null);
  const [previewMode, setPreviewMode] = useState("desktop");

  const isNewUser = myPopups.length === 0;

  const handleCreateNew = () => setActiveRoute("templates");

  const handleManualCreate = () => {
    setCurrentPopupConfig({
      id: `popup_${Date.now()}`,
      internalName: "Manual Pop-up",
      heading: "My New Pop-up",
      subheading: "Add description",
      buttonText: "Click Me",
      bgColor: "#fff",
      textColor: "#000",
      btnColor: "#008060",
      position: "modal",
      borderRadius: 16,
      shadowIntensity: 15,
      overlayOpacity: 40,
      fontFamily: "sans",
    });
    setActiveRoute("editor");
  };

  const handleUseTemplate = (template) => {
    setCurrentPopupConfig({
      ...template,
      id: `popup_${Date.now()}`,
      internalName: template.name,
      overlayOpacity: 40,
    });
    setActiveRoute("editor");
  };

  return (
    <>
      {activeRoute === "dashboard" && (
        <DashboardView
          isNewUser={isNewUser}
          appEmbedEnabled={appEmbedEnabled}
          setAppEmbedEnabled={setAppEmbedEnabled}
          onCreateNew={handleCreateNew}
          myPopups={myPopups}
        />
      )}

      {activeRoute === "templates" && (
        <TemplatesView
          onUseTemplate={handleUseTemplate}
          onManualCreate={handleManualCreate}
          onBack={() => setActiveRoute("dashboard")}
        />
      )}

      {activeRoute === "editor" && (
        <EditorView
          config={currentPopupConfig}
          setConfig={setCurrentPopupConfig}
          previewMode={previewMode}
          setPreviewMode={setPreviewMode}
        />
      )}

      {activeRoute === "settings" && (
        <SettingsView
          appEmbedEnabled={appEmbedEnabled}
          setAppEmbedEnabled={setAppEmbedEnabled}
        />
      )}
    </>
  );
}