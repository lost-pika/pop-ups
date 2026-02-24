import React, { useState } from "react";
import { Monitor, Smartphone } from "lucide-react";
import { EditorTab, FieldGroup, Field, PopupRenderer } from "./ui";

export default function EditorView({
  config,
  setConfig,
  onSave,
  onCancel,
  previewMode,
  setPreviewMode,
}) {
  const [activeTab, setActiveTab] = useState("content");

  if (!config) return null;

  const update = (field, value) => setConfig({ ...config, [field]: value });

  return (
    <div className="flex flex-col h-full w-full bg-[#f6f6f7] overflow-hidden rounded-xl border border-[#e1e3e5]">
      
      {/* 1. HEADER: Fixed Height */}
      <div className="bg-white border-b border-[#e1e3e5] px-6 py-4 flex items-center justify-between z-20 shadow-sm shrink-0">
        <input
          type="text"
          value={config.internalName}
          onChange={(e) => update("internalName", e.target.value)}
          className="text-lg font-black border-none focus:ring-0 p-0 w-64 bg-transparent outline-none text-gray-900"
        />
        <div className="flex items-center space-x-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 font-bold text-gray-500 hover:bg-gray-100 rounded-xl text-sm transition-colors"
          >
            Discard
          </button>
          <button
            onClick={onSave}
            className="px-6 py-2 bg-[#008060] text-white font-bold rounded-xl shadow-md hover:bg-[#006e52] text-sm transition-all"
          >
            Publish
          </button>
        </div>
      </div>

      {/* 2. BODY: Fills remaining height */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* LEFT SIDEBAR: Scrollable settings */}
        <div className="w-80 lg:w-96 bg-white border-r border-[#e1e3e5] flex flex-col h-full shrink-0">
          <div className="flex border-b border-gray-100 bg-white z-10 shrink-0">
            <EditorTab
              active={activeTab === "content"}
              onClick={() => setActiveTab("content")}
            >
              Design
            </EditorTab>
            <EditorTab
              active={activeTab === "settings"}
              onClick={() => setActiveTab("settings")}
            >
              Behavior
            </EditorTab>
          </div>
          
          <div className="flex-1 overflow-y-auto p-8 space-y-10 pb-24">
            {activeTab === "content" ? (
              <div className="space-y-8">
                <FieldGroup label="Text Content">
                  <Field label="Heading">
                    <input
                      className="w-full border border-gray-200 focus:border-[#008060] rounded-xl p-4 text-sm outline-none transition-colors shadow-sm"
                      value={config.heading}
                      onChange={(e) => update("heading", e.target.value)}
                    />
                  </Field>
                  <Field label="Description / Code">
                    <textarea
                      className="w-full border border-gray-200 focus:border-[#008060] rounded-xl p-4 text-sm h-28 resize-none outline-none transition-colors shadow-sm"
                      value={config.subheading}
                      onChange={(e) => update("subheading", e.target.value)}
                    />
                  </Field>
                </FieldGroup>

                <FieldGroup label="Appearance">
                  <div className="grid grid-cols-2 gap-6">
                    <Field label="Background">
                      <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                        <input
                          type="color"
                          className="w-12 h-12 border-none cursor-pointer bg-transparent"
                          value={config.bgColor}
                          onChange={(e) => update("bgColor", e.target.value)}
                        />
                        <span className="text-[10px] font-bold text-gray-400 px-3 uppercase tracking-widest">
                          {config.bgColor}
                        </span>
                      </div>
                    </Field>
                    <Field label="Text Color">
                      <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                        <input
                          type="color"
                          className="w-12 h-12 border-none cursor-pointer bg-transparent"
                          value={config.textColor}
                          onChange={(e) => update("textColor", e.target.value)}
                        />
                        <span className="text-[10px] font-bold text-gray-400 px-3 uppercase tracking-widest">
                          {config.textColor}
                        </span>
                      </div>
                    </Field>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <Field label="Corner Radius">
                      <div className="flex items-center space-x-2">
                        <input
                          type="range"
                          min="0"
                          max="60"
                          className="flex-1 accent-[#008060]"
                          value={config.borderRadius}
                          onChange={(e) => update("borderRadius", parseInt(e.target.value))}
                        />
                        <span className="text-[10px] font-bold text-gray-400 w-8">
                          {config.borderRadius}px
                        </span>
                      </div>
                    </Field>
                    <Field label="Shadow Depth">
                      <div className="flex items-center space-x-2">
                        <input
                          type="range"
                          min="0"
                          max="100"
                          className="flex-1 accent-[#008060]"
                          value={config.shadowIntensity}
                          onChange={(e) => update("shadowIntensity", parseInt(e.target.value))}
                        />
                        <span className="text-[10px] font-bold text-gray-400 w-8">
                          {config.shadowIntensity}%
                        </span>
                      </div>
                    </Field>
                  </div>
                  <Field label="Font Style">
                    <div className="flex bg-gray-100 p-1 rounded-xl">
                      <button
                        onClick={() => update("fontFamily", "sans")}
                        className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${config.fontFamily === "sans" ? "bg-white shadow-sm text-black" : "text-gray-400"}`}
                      >
                        Sans Serif
                      </button>
                      <button
                        onClick={() => update("fontFamily", "serif")}
                        className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${config.fontFamily === "serif" ? "bg-white shadow-sm text-black" : "text-gray-400"}`}
                      >
                        Serif
                      </button>
                    </div>
                  </Field>
                </FieldGroup>

                <FieldGroup label="Call to Action">
                  <Field label="Button Text">
                    <input
                      className="w-full border border-gray-200 rounded-xl p-4 text-sm outline-none shadow-sm"
                      value={config.buttonText}
                      onChange={(e) => update("buttonText", e.target.value)}
                    />
                  </Field>
                  <Field label="Button Color">
                    <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                      <input
                        type="color"
                        className="w-12 h-12 border-none cursor-pointer bg-transparent"
                        value={config.btnColor}
                        onChange={(e) => update("btnColor", e.target.value)}
                      />
                      <span className="text-[10px] font-bold text-gray-400 px-3 uppercase tracking-widest">
                        {config.btnColor}
                      </span>
                    </div>
                  </Field>
                </FieldGroup>
              </div>
            ) : (
              <div className="space-y-8">
                <FieldGroup label="Layout & Placement">
                  <Field label="Position">
                    <select
                      className="w-full border border-gray-200 rounded-xl p-4 text-sm bg-white outline-none appearance-none cursor-pointer shadow-sm"
                      value={config.position}
                      onChange={(e) => update("position", e.target.value)}
                    >
                      <option value="modal">Center Modal</option>
                      <option value="top-bar">Floating Bar (Top)</option>
                      <option value="bottom-right">Slide-in (Bottom Right)</option>
                      <option value="bottom-left">Slide-in (Bottom Left)</option>
                    </select>
                  </Field>
                  <Field label="Overlay Dimming">
                    <div className="flex items-center space-x-2">
                      <input
                        type="range"
                        min="0"
                        max="90"
                        className="flex-1 accent-[#008060]"
                        value={config.overlayOpacity}
                        onChange={(e) => update("overlayOpacity", parseInt(e.target.value))}
                      />
                      <span className="text-[10px] font-bold text-gray-400 w-8">
                        {config.overlayOpacity}%
                      </span>
                    </div>
                  </Field>
                </FieldGroup>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT PREVIEW CANVAS: The fix is here */}
        <div className="flex-1 flex flex-col relative bg-[#f1f2f3] overflow-hidden">
          {/* Subtle Grid Background */}
          <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "radial-gradient(#000 1px, transparent 1px)", backgroundSize: "24px 24px" }}></div>
          
          {/* Device Toggle Buttons */}
          <div className="absolute top-6 left-1/2 -translate-x-1/2 z-30 flex bg-white/90 backdrop-blur border border-gray-200 rounded-2xl shadow-xl p-1.5">
            <button
              onClick={() => setPreviewMode("desktop")}
              className={`px-4 py-2 rounded-xl transition-all ${previewMode === "desktop" ? "bg-[#008060] text-white shadow-lg" : "text-gray-400 hover:text-gray-600"}`}
            >
              <Monitor size={18} />
            </button>
            <button
              onClick={() => setPreviewMode("mobile")}
              className={`px-4 py-2 rounded-xl transition-all ${previewMode === "mobile" ? "bg-[#008060] text-white shadow-lg" : "text-gray-400 hover:text-gray-600"}`}
            >
              <Smartphone size={18} />
            </button>
          </div>

          {/* This container ensures the preview doesn't grow taller than the parent */}
          <div className="flex-1 flex items-center justify-center p-4 md:p-12 overflow-hidden">
            <div 
              className={`bg-white shadow-2xl transition-all duration-500 relative flex flex-col overflow-hidden origin-center max-h-full
               ${previewMode === 'mobile' 
                 ? 'w-[320px] h-[580px] border-[12px] border-[#111] rounded-[40px] shrink-0' 
                 : 'w-full max-w-4xl aspect-video rounded-2xl'
               }`}
              style={{
                // Scale down slightly on smaller screens to ensure it fits vertically
                transform: previewMode === 'desktop' ? 'scale(min(1, calc((100vh - 200px) / 540)))' : 'scale(min(1, calc((100vh - 200px) / 600)))'
              }}
            >
              {/* Dummy Background content */}
              <div className="flex-1 p-10 opacity-5 pointer-events-none select-none overflow-hidden">
                <div className="w-48 h-10 bg-gray-500 rounded-full mb-12"></div>
                <div className="grid grid-cols-3 gap-8">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="aspect-square bg-gray-300 rounded-3xl"></div>
                  ))}
                </div>
              </div>

              {/* Overlay for Modal */}
              {config.position === "modal" && (
                <div
                  className="absolute inset-0 z-[5] pointer-events-none transition-all duration-500"
                  style={{ backgroundColor: `rgba(0,0,0,${config.overlayOpacity / 100})` }}
                ></div>
              )}
              
              {/* Actual Popup Rendering Area */}
              <div className="absolute inset-0 z-10 flex items-center justify-center p-8 pointer-events-none">
                <PopupRenderer config={config} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}