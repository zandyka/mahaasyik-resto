import React from "react";

export function GununganLogo({ size = 40 }: { size?: number }) {
  return (
    <div style={{ width: size, height: size, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(211, 15, 37, 0.1)', borderRadius: '50%' }}>
      <img
        src="/favicon2.svg"
        alt="Mahaasyik Logo"
        style={{ width: size * 0.7, height: size * 0.7, objectFit: 'contain' }}
      />
    </div>
  );
}
