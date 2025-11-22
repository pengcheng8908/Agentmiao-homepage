import React, { useState, useEffect } from 'react';
import NeuralBackground from './components/NeuralBackground';
import AbstractDemo from './components/AbstractDemo';
import { AppPhase } from './types';

export default function App() {
  const [phase, setPhase] = useState<AppPhase>(AppPhase.INITIALIZING);
  const [displayedSubtitle, setDisplayedSubtitle] = useState('');
  
  const subtitleText = "Guide the process. Shape the intelligence. Create beyond experience.";

  // Orchestrate the "Theatrical" Entrance
  useEffect(() => {
    // Phase 1: Cursor only (0-1s) -> Trigger Title
    const t1 = setTimeout(() => setPhase(AppPhase.TITLE_REVEAL), 1200);
    
    // Phase 2: Title Revealed -> Trigger Subtitle Typing
    const t2 = setTimeout(() => setPhase(AppPhase.SUBTITLE_TYPING), 2800);

    // Phase 3: Subtitle done -> Full Interactive Mode
    const t3 = setTimeout(() => setPhase(AppPhase.INTERACTIVE), 2800 + (subtitleText.length * 40) + 500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  // Typewriter effect logic
  useEffect(() => {
    if (phase === AppPhase.SUBTITLE_TYPING || phase === AppPhase.INTERACTIVE) {
      let currentIndex = 0;
      const interval = setInterval(() => {
        if (currentIndex <= subtitleText.length) {
          setDisplayedSubtitle(subtitleText.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(interval);
        }
      }, 35); // Speed of typing
      return () => clearInterval(interval);
    }
  }, [phase]);

  return (
    <div className="relative w-screen h-screen bg-deep overflow-hidden flex flex-col items-center justify-center selection:bg-blue-500/30">
      
      {/* Interactive Background */}
      <NeuralBackground phase={phase} />

      {/* Content Layer */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-5xl px-6">
        
        {/* Phase 1: Initial Cursor */}
        {phase === AppPhase.INITIALIZING && (
           <div className="font-mono text-2xl text-white animate-blink">_</div>
        )}

        {/* Main Title - Serif */}
        {phase !== AppPhase.INITIALIZING && (
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white text-center tracking-tight leading-none animate-focus-in">
            A super agent for <br />
            <span className="italic opacity-90">every great mind.</span>
          </h1>
        )}

        {/* Subtitle - Monospace */}
        {(phase === AppPhase.SUBTITLE_TYPING || phase === AppPhase.INTERACTIVE) && (
          <div className="mt-8 md:mt-10 w-full max-w-3xl">
            <p className="font-mono text-xs md:text-sm text-gray-400 tracking-widest text-center uppercase h-6">
              {displayedSubtitle}
              <span className="animate-blink text-blue-400">_</span>
            </p>
          </div>
        )}

        {/* Interactive Demo & CTA - Only in Final Phase */}
        {phase === AppPhase.INTERACTIVE && (
          <>
            <AbstractDemo />
            
            {/* Minimal CTA */}
            <div className="mt-16 w-full max-w-md animate-focus-in" style={{ animationDuration: '2s' }}>
              <div className="group relative flex items-center">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-transparent blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="absolute left-4 font-mono text-gray-500 text-sm pointer-events-none">{'>'}</span>
                <input 
                  type="text" 
                  placeholder="Start collaborating..." 
                  className="w-full bg-white/5 border-b border-white/20 px-10 py-4 font-mono text-sm text-white placeholder-gray-600 outline-none focus:border-blue-500/50 transition-colors bg-transparent"
                />
                <button className="absolute right-2 text-gray-400 hover:text-white transition-colors p-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Aesthetic Footer Overlay */}
      <div className="absolute bottom-8 left-8 font-mono text-[10px] text-gray-700 tracking-widest pointer-events-none mix-blend-difference">
        SYSTEM_READY // V.2.5.0
      </div>
      <div className="absolute bottom-8 right-8 font-mono text-[10px] text-gray-700 tracking-widest pointer-events-none mix-blend-difference">
        COCKPIT_MODE: ACTIVE
      </div>
    </div>
  );
}