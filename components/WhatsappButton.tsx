"use client";

import { trackEvent } from "@/lib/analytics";

const PHONE = "551931136780"; // ajustar para o número real com DDI+DDD
const MESSAGE = "Olá! Vim pela página de Matrículas e quero agendar uma visita.";

export default function WhatsappButton() {
  const href = `https://wa.me/${PHONE}?text=${encodeURIComponent(MESSAGE)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackEvent("clique_whatsapp", { local: "botao_flutuante" })}
      className="fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-bold text-white shadow-lg ring-2 ring-white transition-transform hover:scale-105"
      aria-label="Falar no WhatsApp com a Central de Matrículas"
    >
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5 shrink-0 fill-white"
        aria-hidden="true"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.472-.148-.67.15-.198.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
        <path d="M12.05 21.785h-.004a9.87 9.87 0 0 1-4.988-1.365l-.358-.213-3.712.973.99-3.617-.233-.371a9.86 9.86 0 0 1-1.511-5.26c.002-5.45 4.436-9.884 9.822-9.884a9.79 9.79 0 0 1 6.955 2.881 9.79 9.79 0 0 1 2.877 6.964c-.003 5.45-4.437 9.884-9.838 9.884zm8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.304-1.654a11.86 11.86 0 0 0 5.684 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 0 0-3.48-8.413z" />
      </svg>
      WhatsApp
    </a>
  );
}
