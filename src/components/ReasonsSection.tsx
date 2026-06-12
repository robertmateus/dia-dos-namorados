// src/components/ReasonsSection.tsx
import React from "react";
import { LoveReason } from "../types";

interface Props {
  reasons: LoveReason[];
  onAddReason: (reason: Omit<LoveReason, "id">) => void;
  onDeleteReason: (id: string) => void;
  onResetReasons: () => void;
}

export default function ReasonsSection({ reasons }: Props) {
  return (
    <div className="p-8">
      <h2 className="font-serif text-2xl text-brand-wine dark:text-brand-gold mb-4">
        Motivos de Amor
      </h2>
      <ul className="space-y-2">
        {reasons.map((r) => (
          <li key={r.id} className="text-brand-charcoal dark:text-white/80">
            {r.text ?? JSON.stringify(r)}
          </li>
        ))}
      </ul>
    </div>
  );
}
