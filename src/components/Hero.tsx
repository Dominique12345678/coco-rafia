import React from 'react';
import { ArrowRight, Recycle, Sparkles, Shield, TrendingDown, ThermometerSnowflake, CheckCircle2, Leaf } from 'lucide-react';
import heroCoolerImg from '../assets/images/hero_cooler_1779300277827.png';

interface HeroProps {
  onExploreProducts: () => void;
  onReportWaste: () => void;
}

export default function Hero({ onExploreProducts, onReportWaste }: HeroProps) {
  return (
    <header className="relative overflow-hidden bg-gradient-to-b from-[#FFFDF9] via-coco-sand/30 to-white pt-8 pb-16 md:py-24">
      {/* Decorative Organic Elements in Background */}
      <div className="absolute top-12 left-6 w-72 h-72 bg-coco-green-light/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-coco-ice/40 rounded-full blur-3xl pointer-events-none -z-10" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Branding Pitch, Headlines, CTAs */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Tagline / Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-coco-green-light rounded-full text-coco-green font-mono text-xs font-semibold uppercase tracking-wider border border-coco-green/10">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Innovation Circulaire à Lomé, Togo</span>
            </div>

            {/* Main Catchy Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light italic text-coco-green leading-[1.1] tracking-tight">
              L'isolation par la nature, <br className="hidden sm:inline" /><span className="text-coco-brown font-normal">pour un futur frais.</span>
            </h1>

            {/* Explanatory description of the coconut hulls and starch composite */}
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-2xl">
              Nous upcyclons les <strong className="text-coco-brown-dark">coques de noix de coco</strong> collectées sur les plages et marchés de Lomé pour fabriquer des glacières écologiques et biodégradables. Liées grâce à de l'amidon naturel de manioc togolais, nos solutions isothermes sont <strong className="text-coco-green">30% moins chères</strong> que le polystyrène plastique polluant, pour une conservation de froid impeccable.
            </p>

            {/* Highlights bullet grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pb-2 pt-2">
              <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-coco-shell/40 shadow-sm">
                <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-coco-brown">
                  <TrendingDown className="w-5 h-5 text-coco-green" />
                </div>
                <div>
                  <h3 className="font-bold text-xs font-display">Prix Réduit de -30%</h3>
                  <p className="text-[11px] text-gray-400">Plus abordable que le plastique importé</p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-coco-shell/40 shadow-sm">
                <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center text-teal-600">
                  <ThermometerSnowflake className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-xs font-display">Froid Garanti 36h-48h</h3>
                  <p className="text-[11px] text-gray-400">Pour vendeuses de poisson et logistique</p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-coco-shell/40 shadow-sm">
                <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center text-amber-700">
                  <Recycle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-xs font-display">100% Biodégradable</h3>
                  <p className="text-[11px] text-gray-400">Se dégrade naturellement en composteur</p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-coco-shell/40 shadow-sm">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-xs font-display">Impact Social Local</h3>
                  <p className="text-[11px] text-gray-400">Creation d'emplois verts à Lomé</p>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <button
                type="button"
                onClick={onExploreProducts}
                className="px-8 py-4 bg-coco-green hover:bg-coco-green-hover text-white text-base font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all active:scale-[0.98] duration-150"
              >
                <span>Acheter nos Glacières</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              
              <button
                type="button"
                onClick={onReportWaste}
                className="px-6 py-4 bg-white text-coco-brown-dark hover:text-white border-2 border-coco-brown hover:bg-coco-brown text-base font-bold rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.98] duration-150"
              >
                <Recycle className="w-5 h-5" />
                <span>Don de Déchets Coco</span>
              </button>
            </div>

            {/* Simple Trust Metrics */}
            <div className="flex items-center gap-5 pt-4 text-xs font-mono text-gray-500">
              <div className="flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-coco-green inline" />
                <span>Sans plastique</span>
              </div>
              <div>•</div>
              <div className="flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-coco-green inline" />
                <span>Manioc du Togo</span>
              </div>
              <div>•</div>
              <div className="flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-coco-green inline" />
                <span>Plages Propres</span>
              </div>
            </div>

          </div>

          {/* Right: Immersive Product Vector Showcase & Impact Numbers */}
          <div className="lg:col-span-5 relative mt-6 lg:mt-0 flex justify-center">
            
            {/* Main Interactive visual showcase frame */}
            <div className="relative w-full max-w-sm bg-white p-6 rounded-3xl border-2 border-coco-shell/60 shadow-xl overflow-hidden text-center self-center">
              
              {/* Badge representing price difference */}
              <div className="absolute top-4 right-4 bg-coco-brown text-white text-xs font-mono font-black px-3 py-1.5 rounded-xl shadow-md rotate-6 animate-pulse">
                -30% MOINS CHER!
              </div>

              <div className="bg-coco-sand rounded-2xl p-0 mb-4 flex items-center justify-center min-h-[220px] overflow-hidden border border-coco-shell/30 shadow-inner group">
                <img 
                  src={heroCoolerImg} 
                  alt="Glacière Coco-Rafia Standard en situation réelle" 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover aspect-square rounded-2xl group-hover:scale-105 transition-transform duration-500"
                />
                <div className="hidden">
                  <div className="relative w-full aspect-square max-w-[180px]">
                  {/* Organic Fiber Glaciere representation */}
                  <svg viewBox="0 0 200 200" className="w-full h-full">
                    {/* Shell shadows */}
                    <ellipse cx="100" cy="165" rx="60" ry="12" fill="#8D6E63" opacity="0.15" />
                    
                    {/* The Glaciere Box */}
                    <path d="M 40,80 L 40,140 C 40,155 52,160 100,160 C 148,160 160,155 160,140 L 160,80 Z" fill="url(#boxHuskGrad)" />
                    
                    {/* Inner insulation line */}
                    <path d="M 50,85 L 50,135 C 50,145 60,148 100,148 C 140,148 150,145 150,135 L 150,85 Z" fill="#FFFFFF" opacity="0.3" />
                    
                    {/* Basket texture pattern overlay */}
                    <g stroke="#5D4037" strokeWidth="1" opacity="0.25">
                      <line x1="45" y1="90" x2="155" y2="150" />
                      <line x1="45" y1="120" x2="115" y2="155" />
                      <line x1="85" y1="85" x2="155" y2="125" />
                      
                      <line x1="155" y1="90" x2="45" y2="150" />
                      <line x1="155" y1="120" x2="85" y2="155" />
                      <line x1="115" y1="85" x2="45" y2="125" />
                    </g>

                    {/* Freshness Blue Accent */}
                    <path d="M 40,80 C 40,80 80,95 100,95 C 120,95 160,80 160,80 L 160,88 C 160,88 120,102 100,102 C 80,102 40,88 40,88 Z" fill="#80DEEA" />

                    {/* Lid Cover with Palm Leaf */}
                    <path d="M 35,65 C 35,65 100,55 165,65 L 165,80 C 165,80 100,88 35,80 Z" fill="#8D6E63" />
                    <rect x="90" y="45" width="20" height="15" rx="4" fill="#5D4037" />
                    <line x1="100" y1="45" x2="100" y2="30" stroke="#2D7A43" strokeWidth="4" strokeLinecap="round" />

                    {/* Fresh snowflake element on box face */}
                    <circle cx="100" cy="120" r="14" fill="#E0F7FA" />
                    <text x="100" y="125" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#00838F">❄</text>

                    {/* Gradients definitions locally */}
                    <defs>
                      <linearGradient id="boxHuskGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#A1887F" />
                        <stop offset="100%" stopColor="#6D4C41" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>
              </div>

              {/* Tag text info */}
              <h4 className="font-display font-medium text-base text-gray-900">Glacière Coco-Rafia Standard</h4>
              <p className="text-xs text-coco-brown font-mono font-bold mt-1">12 500 FCFA seulement</p>
              
              <div className="mt-4 pt-3 border-t border-coco-shell/30 flex justify-between items-center text-left text-xs text-gray-400">
                <div>
                  <span className="block font-bold text-gray-700 font-display">Taille standard 25L</span>
                  <span>Marchés & Pêcheurs</span>
                </div>
                <div className="bg-coco-green-light px-2.5 py-1 rounded-lg text-coco-green font-mono font-bold">
                  96% compost scientifique
                </div>
              </div>
            </div>

            {/* Absolute Badges of project stats */}
            <div className="absolute top-1/2 -translate-y-1/2 -left-3 bg-white p-3 rounded-xl border border-coco-shell/40 shadow-md max-w-[150px] space-y-1">
              <Leaf className="w-5 h-5 text-coco-green" />
              <span className="block text-xs font-bold font-display text-coco-brown-dark leading-tight">Nettoyage municipal</span>
              <span className="block text-[10px] text-gray-500 font-sans">
                Coques de noix de coco retirées du sable de Lomé.
              </span>
            </div>

            <div className="absolute -bottom-4 right-2 bg-white p-3.5 rounded-2xl border border-coco-shell/40 shadow-lg text-center min-w-[120px]">
              <span className="block text-2xl font-black text-coco-green font-mono">100%</span>
              <span className="text-[10px] uppercase font-mono tracking-wider font-bold text-gray-500">
                Fait au Togo
              </span>
            </div>

          </div>

        </div>
      </div>
    </header>
  );
}
