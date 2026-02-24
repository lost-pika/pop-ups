import React from "react";
import { Edit, ChevronRight } from "lucide-react";
import { PREDEFINED_TEMPLATES } from "../data/templates";

export default function TemplatesView({
  onUseTemplate,
  onManualCreate,
  onBack,
}) {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <button onClick={onBack} className="text-sm text-gray-500 hover:text-black mb-4 flex items-center font-bold"><ChevronRight size={16} className="rotate-180 mr-1.5"/> Back to Dashboard</button>
          <h2 className="text-4xl font-bold">Choose a Template</h2>
          <p className="text-gray-500 text-lg mt-1 font-medium leading-relaxed">Ready-to-use pop-ups designed by marketing experts.</p>
        </div>
        <button onClick={onManualCreate} className="bg-white border-2 border-dashed border-gray-300 hover:border-[#008060] hover:text-[#008060] transition-all px-6 py-3 rounded-2xl font-bold text-sm flex items-center shadow-sm">
          <Edit size={16} className="mr-2" /> Create from Scratch
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {PREDEFINED_TEMPLATES.map(template => (
          <div key={template.id} className="group bg-white rounded-3xl border border-[#e1e3e5] overflow-hidden hover:shadow-2xl hover:border-[#008060] transition-all flex flex-col cursor-pointer border-2" onClick={() => onUseTemplate(template)}>
            <div className={`h-56 p-8 flex items-center justify-center relative bg-gradient-to-br ${template.gradient || 'from-gray-100 to-gray-200'}`}>
               <div className="w-full max-w-[120px] bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-2 flex flex-col shadow-lg transition-transform group-hover:scale-110">
                  <div className="w-1/2 h-2 rounded-full bg-white/40 mb-1.5"></div>
                  <div className="w-full h-1 rounded-full bg-white/20 mb-4"></div>
                  <div className="mt-auto h-4 rounded-lg bg-white/80 shadow-sm"></div>
               </div>
               <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="bg-white text-black text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full shadow-2xl scale-90 group-hover:scale-100 transition-transform">Use Template</div>
               </div>
            </div>
            <div className="p-6">
              <h3 className="font-bold text-gray-900 text-lg leading-tight">{template.name}</h3>
              <div className="flex items-center space-x-2 mt-3">
                <span className="text-[10px] font-bold text-[#008060] bg-teal-50 px-2.5 py-1 rounded-full uppercase tracking-wider">{template.type}</span>
                <span className="text-[10px] font-bold text-gray-400 bg-gray-100 px-2.5 py-1 rounded-full uppercase tracking-wider">{template.position}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}