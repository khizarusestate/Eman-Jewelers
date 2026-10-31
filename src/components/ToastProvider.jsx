import { createContext, useCallback, useContext, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";
const ToastContext = createContext(null);
const icons = { success: CheckCircle2, error: AlertCircle, info: Info };
export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null);
  const showToast = useCallback((message, type = "success") => {
    setToast({ message, type, id: Date.now() });
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(() => setToast(null), 4200);
  }, []);
  return <ToastContext.Provider value={showToast}>
    {children}
    <div className="pointer-events-none fixed right-4 top-24 z-[200] w-[min(92vw,390px)]">
      <AnimatePresence>
        {toast && (() => { const Icon = icons[toast.type] || Info; return <motion.div key={toast.id} initial={{ opacity: 0, y: -12, scale: .97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, x: 24 }} role="status" aria-live="polite" className="pointer-events-auto flex items-start gap-3 rounded-2xl border border-[#D7B36B]/30 bg-[#100D08]/95 p-4 shadow-[0_18px_55px_rgba(0,0,0,.55)] backdrop-blur-2xl">
          <Icon size={21} className={toast.type === "error" ? "shrink-0 text-rose-300" : toast.type === "success" ? "shrink-0 text-emerald-300" : "shrink-0 text-[#F1C965]"} />
          <p className="flex-1 text-sm leading-6 text-[#F8EED7]">{toast.message}</p>
          <button aria-label="Dismiss notification" onClick={() => setToast(null)} className="text-[#B8A98F] hover:text-white"><X size={17}/></button>
        </motion.div>; })()}
      </AnimatePresence>
    </div>
  </ToastContext.Provider>;
}
export const useToast = () => useContext(ToastContext);
