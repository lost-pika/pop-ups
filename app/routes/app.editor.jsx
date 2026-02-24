import EditorView from "../components/EditorView";
import { useApp } from "../context/AppContext";
import { useNavigate } from "react-router";

export default function EditorPage() {
  const {
    currentPopupConfig,
    setCurrentPopupConfig,
    handleSavePopup,
    previewMode,
    setPreviewMode,
  } = useApp();

  const navigate = useNavigate();

  // Safeguard: If currentPopupConfig is null, don't crash
  if (!currentPopupConfig) {
    return (
      <div className="p-20 text-center">
        <h2 className="text-xl font-bold mb-4 text-gray-400">No popup selected.</h2>
        <button 
          onClick={() => navigate("/app/templates")}
          className="bg-[#008060] text-white px-6 py-2 rounded-xl font-bold"
        >
          Go to Templates
        </button>
      </div>
    );
  }

  return (
    <EditorView
      config={currentPopupConfig}
      setConfig={setCurrentPopupConfig}
      onSave={() => {
        handleSavePopup();
        navigate("/app");
      }}
      onCancel={() => {
        setCurrentPopupConfig(null);
        navigate("/app");
      }}
      previewMode={previewMode}
      setPreviewMode={setPreviewMode}
    />
  );
}