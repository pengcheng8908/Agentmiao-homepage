import React from 'react';

const AbstractDemo: React.FC = () => {
  return (
    <div className="relative w-full max-w-2xl h-48 perspective-1000 mx-auto mt-16 opacity-0 animate-focus-in" style={{ animationDelay: '3s', animationFillMode: 'forwards' }}>
      {/* Glass Container */}
      <div className="absolute inset-0 bg-white/[0.02] backdrop-blur-sm border border-white/[0.08] rounded-xl shadow-2xl flex items-center justify-between px-12 overflow-hidden transform rotate-x-12 transition-transform hover:scale-[1.02] duration-700 group">
        
        {/* Background Grid Hint */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />

        {/* Left: Input (The Idea) */}
        <div className="relative z-10 w-12 h-12 rounded-lg border border-white/20 flex items-center justify-center bg-black/40">
          <div className="w-2 h-2 bg-white/80 rounded-full animate-pulse" />
        </div>

        {/* Middle: The Process (Splitting Beams) */}
        <div className="flex-1 h-full relative mx-8">
            <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                {/* Top Beam */}
                <path 
                    d="M0,50 C 50,50 50,20 100,20 L 200,20 C 250,20 250,50 300,50" 
                    fill="none" 
                    stroke="rgba(59, 130, 246, 0.5)" 
                    strokeWidth="1"
                    strokeDasharray="5 5"
                    className="animate-[dash_3s_linear_infinite]"
                >
                  <animate attributeName="stroke-opacity" values="0.2;1;0.2" dur="3s" repeatCount="indefinite" />
                </path>
                
                {/* Middle Beam */}
                <path 
                    d="M0,50 L 300,50" 
                    fill="none" 
                    stroke="rgba(255, 255, 255, 0.3)" 
                    strokeWidth="1"
                     className="animate-[dash_2s_linear_infinite]"
                />

                {/* Bottom Beam */}
                <path 
                    d="M0,50 C 50,50 50,80 100,80 L 200,80 C 250,80 250,50 300,50" 
                    fill="none" 
                    stroke="rgba(59, 130, 246, 0.5)" 
                    strokeWidth="1"
                    strokeDasharray="5 5"
                     className="animate-[dash_3.5s_linear_infinite]"
                >
                  <animate attributeName="stroke-opacity" values="0.2;1;0.2" dur="3.5s" repeatCount="indefinite" />
                </path>

                {/* Nodes (Simulating Correction) */}
                <circle cx="150" cy="20" r="3" fill="#3b82f6" opacity="0.8">
                    <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite" />
                </circle>
                 <circle cx="180" cy="80" r="3" fill="#3b82f6" opacity="0.8">
                    <animate attributeName="opacity" values="0;1;0" dur="2.5s" repeatCount="indefinite" />
                </circle>
            </svg>
        </div>

        {/* Right: Output (The Cube) */}
        <div className="relative z-10 group-hover:scale-110 transition-transform duration-500">
            {/* CSS 3D Cube approximation using simple divs for performance/cleanliness */}
            <div className="w-12 h-12 relative transform-style-3d animate-[spin_10s_linear_infinite]">
                 <div className="absolute inset-0 border border-blue-400/30 bg-blue-500/10 translate-z-6" />
                 <div className="absolute inset-0 border border-white/20 rotate-45 scale-75" />
            </div>
        </div>

      </div>
    </div>
  );
};

export default AbstractDemo;