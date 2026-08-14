import React from 'react';

interface RnLogoProps {
  variant?: 'colorida' | 'positiva' | 'negativa';
  className?: string;
  height?: number;
}

export const RnLogo: React.FC<RnLogoProps> = ({
  variant = 'colorida',
  className = '',
  height = 44,
}) => {
  // Official Brand Colors from Manual:
  // Marinho: #141831 | Dourado: #F8B03B | Branco: #FFFFFF
  const isPositiva = variant === 'positiva';
  const rnColor = isPositiva ? '#141831' : '#FFFFFF';
  const goldColor = '#F8B03B';

  return (
    <div className={`inline-flex flex-col items-center select-none ${className}`}>
      {/* Top Monogram + Divider + Text */}
      <div className="flex items-center gap-2.5">
        
        {/* Monograma RN */}
        <span
          className="font-bebas tracking-tighter leading-none"
          style={{
            fontSize: `${height * 0.85}px`,
            color: rnColor,
            fontWeight: 400,
          }}
        >
          RN
        </span>

        {/* Linha Divisória Dourada */}
        <div
          className="w-[2px] rounded-full shrink-0"
          style={{
            height: `${height * 0.7}px`,
            backgroundColor: goldColor,
          }}
        />

        {/* RIAN NICOLAU + OAB */}
        <div className="flex flex-col leading-none" style={{ color: goldColor }}>
          <span
            className="font-bebas tracking-wider uppercase font-light"
            style={{ fontSize: `${height * 0.36}px` }}
          >
            RIAN
          </span>
          <span
            className="font-bebas tracking-wider uppercase font-light -mt-1"
            style={{ fontSize: `${height * 0.36}px` }}
          >
            NICOLAU
          </span>
          <span
            className="text-[9px] font-mono opacity-90 mt-0.5 tracking-wider"
            style={{ fontSize: `${height * 0.18}px` }}
          >
            OAB/CE 2.057
          </span>
        </div>
      </div>

      {/* Subtítulo ADVOCACIA com espaçamento amplo */}
      <span
        className="font-bebas text-center uppercase mt-0.5 tracking-[0.42em] w-full"
        style={{
          fontSize: `${height * 0.24}px`,
          color: goldColor,
        }}
      >
        ADVOCACIA
      </span>
    </div>
  );
};
