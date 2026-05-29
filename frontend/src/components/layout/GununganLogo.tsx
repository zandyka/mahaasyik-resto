import React from "react";
import { Drumstick } from "lucide-react";

export function GununganLogo({ size = 40 }: { size?: number }) {
  return (
    <div style={{ width: size, height: size, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(211, 15, 37, 0.1)', borderRadius: '50%' }}>
      <Drumstick size={size * 0.7} color="#D30F25" />
    </div>
  );
}
