"use client";

import Image from "next/image";
import { trackEvent } from "@/lib/analytics";

export default function Footer() {
  return (
    <footer className="bg-navy-deep pt-10 text-white/80">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Image
            src="/logo-dombarreto-branco.png"
            alt="Colégio Dom Barreto"
            width={160}
            height={78}
            className="h-16 w-auto"
          />
        </div>
        <div className="text-sm">
          <p>Av. da Saudade, 705 – Ponte Preta – Campinas/SP – CEP 13041-670</p>
          <p className="mt-1">
            matriculas@colegiodombarreto.com.br · (19) 3232-4366
          </p>
          <p className="mt-1">Matrículas: (19) 3113-6780</p>
        </div>
        <div className="flex gap-4 text-sm">
          <a
            href="https://www.facebook.com/colegiodombarreto"
            onClick={() => trackEvent("clique_rede_social", { rede: "facebook" })}
            className="hover:text-gold"
          >
            Facebook
          </a>
          <a
            href="https://www.instagram.com/colegiodombarreto/?hl=pt-br"
            onClick={() => trackEvent("clique_rede_social", { rede: "instagram" })}
            className="hover:text-gold"
          >
            Instagram
          </a>
          <a
            href="https://www.youtube.com/@colegiodombarreto1953"
            onClick={() => trackEvent("clique_rede_social", { rede: "youtube" })}
            className="hover:text-gold"
          >
            Youtube
          </a>
        </div>
      </div>
      <div className="mt-10 flex h-3 w-full">
        <span className="flex-1 bg-navy" />
        <span className="flex-1 bg-gold" />
        <span className="flex-1 bg-red" />
      </div>
    </footer>
  );
}
