"use client";

import { trackEvent } from "@/lib/analytics";

const PHONE = "5519323243660"; // ajustar para o número real com DDI+DDD
const MESSAGE = "Olá! Vim pela página de Matrículas e quero agendar uma visita.";

export default function WhatsappButton() {
  const href = `https://wa.me/${PHONE}?text=${encodeURIComponent(MESSAGE)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackEvent("clique_whatsapp")}
      className="fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-bold text-white shadow-lg ring-2 ring-white transition-transform hover:scale-105"
      aria-label="Falar no WhatsApp com a Central de Matrículas"
    >
      WhatsApp
    </a>
  );
}
