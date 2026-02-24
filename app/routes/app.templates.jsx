import TemplatesView from "../components/TemplatesView";
import { useApp } from "../context/AppContext";
import { useNavigate } from "react-router";

export default function TemplatesPage() {
  const { handleUseTemplate, handleManualCreate } = useApp();
  const navigate = useNavigate();

  return (
    <TemplatesView 
      onUseTemplate={(template) => {
        handleUseTemplate(template);
        navigate("/app/editor");
      }} 
      onManualCreate={() => {
        handleManualCreate();
        navigate("/app/editor");
      }}
      onBack={() => navigate("/app")}
    />
  );
}