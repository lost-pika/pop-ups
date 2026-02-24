import React from "react";
import { ShieldCheck, Zap, ToggleLeft, ToggleRight, ExternalLink } from "lucide-react";

export default function SettingsView({
  appEmbedEnabled,
  setAppEmbedEnabled,
}) {
  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
       <div><h2 className="text-3xl font-bold">Settings</h2><p className="text-gray-500 font-medium leading-relaxed">Manage your account and app integration settings.</p></div>
      <div className="bg-white border border-[#e1e3e5] rounded-3xl shadow-sm divide-y divide-gray-100 overflow-hidden">
        <div className="p-8">
           <h4 className="text-lg font-bold mb-4 flex items-center"><ShieldCheck size={20} className="mr-3 text-teal-600" /> Storefront Integration</h4>
           <p className="text-sm text-gray-500 mb-6 font-medium">Expli needs to be enabled in your theme for pop-ups to show. This is handled via Shopify App Embeds.</p>
           <div className="flex items-center justify-between p-5 bg-gray-50 rounded-2xl border border-gray-100">
              <div className="flex items-center space-x-4">
                <div className={`p-3 rounded-xl ${appEmbedEnabled ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-500'}`}><Zap size={20} /></div>
                <div><div className="font-bold text-gray-900">App Embed Status</div><div className="text-xs text-gray-500 font-medium">{appEmbedEnabled ? 'Connected and Live' : 'Disconnected'}</div></div>
              </div>
              <button onClick={() => setAppEmbedEnabled(!appEmbedEnabled)} className="flex items-center space-x-2 bg-white px-4 py-2 border border-gray-300 rounded-xl shadow-sm hover:bg-white transition-all">
                {appEmbedEnabled ? <ToggleRight className="text-[#008060]" size={28} /> : <ToggleLeft className="text-gray-400" size={28} />}
                <span className="text-xs font-black uppercase tracking-widest">{appEmbedEnabled ? 'ON' : 'OFF'}</span>
              </button>
           </div>
           <button className="w-full mt-6 py-4 bg-[#008060] text-white rounded-2xl font-bold flex items-center justify-center hover:bg-[#006e52] shadow-lg shadow-teal-900/5 transition-all"><ExternalLink size={18} className="mr-2" /> Open Shopify Theme Editor</button>
        </div>
      </div>
    </div>
  );
}