import DashboardView from "../components/DashboardView";
import { useApp } from "../context/AppContext";
import { useNavigate } from "react-router";

export default function Index() {
  const { 
    myPopups, 
    appEmbedEnabled, 
    setAppEmbedEnabled, 
    handleDeletePopup,
    setCurrentPopupConfig 
  } = useApp();
  
  const navigate = useNavigate();

  // Logic to determine if we show the onboarding screen
  const isNewUser = myPopups.length === 0;

  return (
    <DashboardView
      isNewUser={isNewUser}
      myPopups={myPopups}
      appEmbedEnabled={appEmbedEnabled}
      setAppEmbedEnabled={setAppEmbedEnabled}
      onCreateNew={() => navigate("/app/templates")}
      onDeletePopup={handleDeletePopup}
      onEditPopup={(popup) => {
        // Load the existing config into the context before navigating
        setCurrentPopupConfig(popup.config);
        navigate("/app/editor");
      }}
      onOpenThemeEditor={() => console.log("Theme Editor Simulation")}
    />
  );
}
