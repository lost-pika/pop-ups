import React from "react";
import { Plus, LayoutTemplate, Eye, Zap, Edit, Trash2, ToggleLeft, ToggleRight, Sparkles, ArrowRight, ExternalLink } from "lucide-react";
import { AnalyticsCard } from "./ui";
import { useAppBridge } from "@shopify/app-bridge-react";

export default function DashboardView(props) {
  const {
    shop,
    isNewUser,
    appEmbedEnabled,
    onCreateNew,
    myPopups,
    onEditPopup,
    onDeletePopup,
  } = props;

  const app = useAppBridge();

  return (
    <div className="max-w-full mx-auto space-y-6 animate-in fade-in duration-500 px-4 md:px-8">
      
     {/* Info Banner */}
{/* Info Banner */}
<div className="p-4 rounded-2xl border border-[#e1e3e5] bg-white flex flex-col md:flex-row md:items-center justify-between gap-4">
  
  <div className="flex items-start space-x-4">
    <div className="p-2 rounded-xl bg-green-50 text-[#008060]">
      <Zap size={20} />
    </div>

    <div>
      <h3 className="font-bold text-gray-900 text-sm md:text-base">
        Pop-Up Notifications Ready
      </h3>

      <p className="text-xs md:text-sm text-gray-500">
        Create and manage pop-ups for your storefront. Configure them in the editor and they will appear automatically on your store.
      </p>
    </div>
  </div>

  <button
    onClick={() => {
      const shop = app?.config?.shop;
      if (!shop) return;

      window.open(
        `https://${shop}/admin/themes/current/editor?context=apps`,
        "_blank"
      );
    }}
    className="px-4 py-2 bg-[#008060] text-white rounded-xl text-xs font-bold shadow-sm hover:bg-[#006e52] flex items-center transition-all whitespace-nowrap"
  >
    <ExternalLink size={14} className="mr-2" />
    Open Theme Editor
  </button>

</div>



      {isNewUser ? (
        <div className="flex flex-col items-center justify-center py-24 bg-white border border-[#e1e3e5] rounded-3xl shadow-sm text-center px-6">
          {/* Functional Plus Hero Button */}
          <div
            onClick={onCreateNew}
            className="w-24 h-24 bg-[#f1f8f5] rounded-full flex items-center justify-center text-[#008060] mb-8 relative cursor-pointer hover:scale-105 transition-transform shadow-inner"
          >
            <Plus size={48} />
            <div className="absolute -top-1 -right-1 w-8 h-8 bg-teal-500 rounded-full border-4 border-white flex items-center justify-center text-white shadow-lg">
              <Sparkles size={16} />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4 max-w-xl leading-tight">
            Increase sales with Expli Pop-Up Notifications and auto apply
            Discounts
          </h2>
          <button
            onClick={onCreateNew}
            className="group flex items-center space-x-4 bg-[#008060] text-white px-10 py-5 rounded-2xl font-bold text-xl hover:scale-[1.02] active:scale-95 transition-all shadow-2xl"
          >
            <span>Create First Pop-Up</span>
            <ArrowRight
              size={24}
              className="group-hover:translate-x-1 transition-transform"
            />
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <AnalyticsCard
              title="Active Campaigns"
              value={myPopups.filter((p) => p.status === "active").length}
              icon={<LayoutTemplate size={18} />}
            />
            <AnalyticsCard
              title="Impressions"
              value={myPopups.reduce((a, b) => a + b.views, 0).toLocaleString()}
              icon={<Eye size={18} />}
              color="blue"
            />
            <AnalyticsCard
              title="Performance"
              value="+12.4%"
              icon={<Zap size={18} />}
              color="purple"
            />
          </div>
          <div className="bg-white border border-[#e1e3e5] rounded-2xl shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between bg-gray-50/30">
              <h3 className="font-bold text-gray-900 uppercase text-xs tracking-widest">
                Active Campaigns
              </h3>
              <button
                onClick={onCreateNew}
                className="text-xs font-bold text-[#008060] bg-white border border-[#e1e3e5] px-3 py-2 rounded-xl flex items-center shadow-sm"
              >
                <Plus size={16} className="mr-1.5" /> New Pop-up
              </button>
            </div>
            <div className="divide-y divide-gray-100">
              {myPopups.map((popup) => (
                <div
                  key={popup.id}
                  className="p-6 hover:bg-gray-50/50 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-6"
                >
                  <div className="flex items-center space-x-5">
                    <div className="w-12 h-12 bg-[#f4f6f8] rounded-xl flex items-center justify-center text-gray-400 border border-gray-100">
                      <LayoutTemplate size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-base">
                        {popup.name}
                      </h4>
                      <p className="text-xs text-gray-400 mt-1">
  Popup ID: {popup.id}
</p>
                      <p className="text-[10px] text-gray-400 font-bold uppercase mt-0.5">
                        {popup.config?.type || "POPUP"} • {popup.config?.position || "modal"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => onEditPopup(popup)}
                      className="p-2.5 hover:bg-white border border-transparent hover:border-gray-200 rounded-xl text-gray-600"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => onDeletePopup(popup.id)}
                      className="p-2.5 hover:bg-red-50 rounded-xl text-gray-400 hover:text-red-600"
                    >
                      <Trash2 size={18} />
                    </button>
                    
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
