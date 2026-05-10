import React from 'react';

interface KarakterKerjaProps {
  className?: string;
}

export default function KarakterKerja({ className }: KarakterKerjaProps) {
  return (
    <div className={className}>
      
      {/* CSS Khusus untuk Animasi Looping Karakter */}
      <style>{`
        /* Rotasi Gear di Background */
        .gear-spin {
          transform-origin: 150px 150px;
          animation: spinGear 15s linear infinite;
        }

        /* Animasi Tangan Bekerja (Naik Turun) */
        .arm-work {
          transform-origin: 90px 140px;
          animation: tinker 1s ease-in-out infinite alternate;
        }

        /* Animasi Kepala Mengangguk Sedikit (Fokus) */
        .head-bob {
          transform-origin: 90px 120px;
          animation: bob 2s ease-in-out infinite alternate;
        }

        /* Animasi Petir/Percikan Listrik */
        .spark-bounce {
          transform-origin: 185px 145px;
          animation: sparkPulse 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) infinite alternate;
        }

        /* Lampu Indikator Berkedip */
        .blink-light {
          animation: blink 1s steps(2, start) infinite;
        }

        /* Animasi Sinyal Data/Arus Listrik */
        .data-flow {
          stroke-dasharray: 10 10;
          animation: flow 1s linear infinite;
        }

        @keyframes spinGear {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes tinker {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(12deg); }
        }

        @keyframes bob {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(2deg) translateY(2px); }
        }

        @keyframes sparkPulse {
          0% { transform: scale(0.8); opacity: 0.8; }
          100% { transform: scale(1.1); opacity: 1; }
        }

        @keyframes blink {
          0%, 100% { fill: #ef4444; } /* Merah menyala */
          50% { fill: #7f1d1d; }      /* Merah redup */
        }

        @keyframes flow {
          to { stroke-dashoffset: -20; }
        }
      `}</style>

      {/* Container Ilustrasi Animasi */}
      <div className="relative flex justify-center items-center w-full max-w-[500px] aspect-square z-10">
        <svg viewBox="0 0 300 300" className="w-full h-full overflow-visible">
          
          {/* Latar Belakang Lingkaran Utama */}
          <circle cx="150" cy="150" r="140" fill="#0f172a" />

          {/* Ornamen Gear (Roda Gigi Teknik) Latar Belakang */}
          <path 
            className="gear-spin"
            fill="none" 
            stroke="#1e293b" 
            strokeWidth="8"
            strokeDasharray="20 15"
            d="M 150 40 A 110 110 0 1 1 149 40"
          />
          <circle cx="150" cy="150" r="90" fill="none" stroke="#1e293b" strokeWidth="2" />

          {/* Jalur Sirkuit di Latar Belakang */}
          <path d="M 50 100 L 100 100 L 120 80" fill="none" stroke="#334155" strokeWidth="4" />
          <path d="M 250 200 L 220 200 L 200 180" fill="none" stroke="#334155" strokeWidth="4" />

          {/* Meja Kerja */}
          <rect x="30" y="240" width="240" height="15" rx="5" fill="#1e293b" />
          <rect x="50" y="255" width="200" height="30" fill="#020617" />

          {/* Grup Karakter (Tubuh, Kepala, Topi) */}
          <g className="head-bob">
            {/* Tubuh */}
            <path d="M 60 240 L 60 160 Q 60 140 90 140 L 110 140 Q 120 140 120 150 L 120 240 Z" fill="#0ea5e9" />
            
            {/* Detail Garis Rompi/Baju */}
            <path d="M 85 140 L 85 240" stroke="#0284c7" strokeWidth="4" />
            <path d="M 60 220 L 120 220" stroke="#0284c7" strokeWidth="4" />

            {/* Leher & Kepala */}
            <rect x="85" y="120" width="15" height="25" fill="#fcd34d" />
            <circle cx="95" cy="100" r="28" fill="#fde047" />

            {/* Kacamata / Mata */}
            <rect x="105" y="95" width="18" height="8" rx="2" fill="#334155" />
            <line x1="85" y1="99" x2="105" y2="99" stroke="#334155" strokeWidth="2" />

            {/* Topi Proyek (Hardhat) Teknik */}
            <path d="M 63 100 A 32 32 0 0 1 127 100 Z" fill="#eab308" />
            <rect x="55" y="95" width="85" height="7" rx="3" fill="#ca8a04" />
          </g>

          {/* Mesin Panel / Perangkat Listrik di Meja */}
          <rect x="140" y="150" width="100" height="90" rx="6" fill="#334155" />
          <rect x="150" y="160" width="80" height="40" rx="3" fill="#0f172a" />
          
          {/* Animasi Garis Arus Listrik / Data di Layar Mesin */}
          <line x1="160" y1="180" x2="220" y2="180" stroke="#38bdf8" strokeWidth="4" className="data-flow" />
          
          {/* Lampu Indikator Berkedip di Panel */}
          <circle cx="165" cy="220" r="8" fill="#22c55e" />
          <circle cx="190" cy="220" r="8" className="blink-light" />
          <circle cx="215" cy="220" r="8" fill="#eab308" />

          {/* Kabel Menguntai dari Mesin ke Meja */}
          <path d="M 240 210 Q 260 210 260 240" fill="none" stroke="#475569" strokeWidth="6" strokeLinecap="round" />

          {/* Tangan Bergerak (Di Depan Semuanya) */}
          <path 
            className="arm-work" 
            d="M 90 140 L 120 180 L 155 175" 
            fill="none" 
            stroke="#fde047" 
            strokeWidth="14" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />
          {/* Lengan Baju */}
          <path 
            className="arm-work" 
            d="M 90 140 L 115 175" 
            fill="none" 
            stroke="#0284c7" 
            strokeWidth="16" 
            strokeLinecap="round" 
          />

          {/* Ikon Petir / Percikan Listrik dari Mesin (Flat, Tanpa Glow) */}
          <polygon 
            className="spark-bounce"
            points="180,110 170,135 185,135 175,160 200,125 185,125 195,110" 
            fill="#facc15" 
          />

        </svg>
      </div>

    </div>
  );
}
