import { X, Ticket } from "lucide-react";

export function NavButton({ children, active, onClick, disabled }) {
  return (
    <button onClick={onClick} disabled={disabled} className={`px-5 py-2 rounded-xl text-sm font-bold transition-all duration-300 ${
        disabled ? 'opacity-30 cursor-not-allowed text-gray-300' :
        active ? 'bg-[#f1f8f5] text-[#008060]' : 'text-gray-600 hover:bg-gray-100'
      }`}>
      {children}
    </button>
  );
}

export function AnalyticsCard({ title, value, icon, color = 'green' }) {
  const themes = { green: 'text-[#008060] bg-[#f1f8f5]', blue: 'text-blue-600 bg-blue-50', purple: 'text-purple-600 bg-purple-50' };
  return (
    <div className="bg-white border border-[#e1e3e5] rounded-2xl p-6 shadow-sm group hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.15em]">{title}</span>
        <div className={`p-2 rounded-xl transition-transform group-hover:scale-110 ${themes[color]}`}>{icon}</div>
      </div>
      <div className="text-3xl font-black text-gray-900 tracking-tight">{value}</div>
    </div>
  );
}

export function EditorTab({ children, active, onClick }) {
  return <button onClick={onClick} className={`flex-1 py-4 text-[11px] font-black uppercase tracking-[0.2em] border-b-2 transition-all ${active ? 'border-[#008060] text-[#008060]' : 'border-transparent text-gray-400 hover:text-gray-600'}`}>{children}</button>;
}

export function FieldGroup({ label, children }) {
  return <div className="space-y-5"><h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.15em] border-b border-gray-100 pb-3 tracking-widest">{label}</h4><div className="space-y-4">{children}</div></div>;
}

export function Field({ label, children }) {
  return <div className="space-y-2"><label className="text-[11px] font-bold text-gray-600 ml-1 uppercase tracking-wider">{label}</label>{children}</div>;
}

// ==========================================
// 8. RENDERING ENGINE
// ==========================================

export function PopupRenderer({ config }) {
  const styles = { 
    backgroundColor: config.bgColor, 
    color: config.textColor,
    borderRadius: `${config.borderRadius}px`,
    boxShadow: `0 ${config.shadowIntensity / 2}px ${config.shadowIntensity}px rgba(0,0,0,${config.shadowIntensity / 200})`,
    fontFamily: config.fontFamily === 'serif' ? 'serif' : 'sans-serif'
  };
  const btnStyles = { 
    backgroundColor: config.btnColor, 
    color: getContrast(config.btnColor),
    borderRadius: config.borderRadius > 12 ? '12px' : `${config.borderRadius}px`
  };

  const isVoucher = config.heading.toLowerCase().includes('discount') || config.subheading.toLowerCase().includes('off') || config.name?.toLowerCase().includes('voucher');

  if (config.position === 'modal') {
    return (
      <div className="p-10 text-center animate-in zoom-in duration-500 max-w-md w-full border border-white/10" style={styles}>
        {isVoucher ? (
           <div className="mb-6 flex justify-center"><div className="p-3 bg-white/10 rounded-2xl"><Ticket size={32} /></div></div>
        ) : (
           <div className="w-16 h-1 w-gray-200 mx-auto rounded-full mb-8 opacity-20"></div>
        )}
        <h3 className="text-3xl font-black mb-4 leading-tight tracking-tight uppercase">{config.heading}</h3>
        {isVoucher ? (
          <div className="my-6 py-4 px-6 border-2 border-dashed border-white/30 rounded-2xl bg-black/10">
            <span className="text-2xl font-black tracking-widest uppercase">{config.subheading}</span>
          </div>
        ) : (
          <p className="text-base opacity-70 mb-10 leading-relaxed font-medium">{config.subheading}</p>
        )}
        <button className="w-full py-4 font-black text-sm shadow-2xl shadow-black/10 active:scale-95 transition-all uppercase tracking-widest" style={btnStyles}>
          {config.buttonText}
        </button>
      </div>
    );
  }

  if (config.position === 'top-bar') {
    return (
      <div className="absolute top-0 left-0 right-0 p-5 flex items-center justify-center space-x-6 shadow-xl animate-in slide-in-from-top duration-700 z-50" style={{...styles, borderRadius: 0, boxShadow: 'none'}}>
        <p className="text-base font-bold tracking-tight uppercase">{config.heading}</p>
        <button className="px-6 py-2.5 rounded-xl text-xs font-black shadow-lg" style={btnStyles}>{config.buttonText}</button>
        <button className="absolute right-6 opacity-30 hover:opacity-100 transition-opacity"><X size={18} /></button>
      </div>
    );
  }

  if (config.position === 'bottom-right' || config.position === 'bottom-left') {
    const posClasses = config.position === 'bottom-right' ? 'bottom-8 right-8' : 'bottom-8 left-8';
    return (
      <div className={`absolute ${posClasses} max-w-[340px] w-full p-8 rounded-[28px] shadow-2xl animate-in slide-in-from-bottom-8 duration-500 z-50 border border-white/10`} style={styles}>
        <button className="absolute top-4 right-4 opacity-30 hover:opacity-100 transition-opacity"><X size={16}/></button>
        <h4 className="font-black text-xl mb-3 tracking-tight uppercase">{config.heading}</h4>
        <p className="text-sm opacity-70 mb-6 font-medium leading-relaxed">{config.subheading}</p>
        <button className="w-full py-3.5 rounded-2xl text-sm font-black shadow-xl" style={btnStyles}>{config.buttonText}</button>
      </div>
    );
  }
}

export function getContrast(hex) {
  if (!hex) return 'white';
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
  return (yiq >= 128) ? 'black' : 'white';
}