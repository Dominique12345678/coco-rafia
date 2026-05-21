import React, { useState, useEffect } from 'react';
import { ArrowRight, Recycle, Sparkles, Shield, TrendingDown, ThermometerSnowflake, CheckCircle2, Leaf, ChevronLeft, ChevronRight, Wand2 } from 'lucide-react';
import { motion } from 'motion/react';

import glaciereMiniImg from '../assets/images/glaciere_5l_resin_1779397998567.png';
import glaciereCabasImg from '../assets/images/glaciere_15l_resin_1779398016057.png';
import glaciereStdImg from '../assets/images/glaciere_25l_resin_1779398032622.png';
import glaciereCargoImg from '../assets/images/glaciere_55l_resin_1779398048736.png';
import fertilizer1kgImg from '../assets/images/fertilizer_1kg_1779380348921.png';
import fertilizerSacImg from '../assets/images/fertilizer_sac_1779380366195.png';
import fertilizer25kgImg from '../assets/images/fertilizer_25kg_heavy_bag_1779396825649.png';
import perlesCocoImg from '../assets/images/perles_de_coco_1779396843587.png';
import plafondsCocoImg from '../assets/images/plafonds_en_coco_1779396861481.png';

// Import high-resolution 1920x1080 widescreen background scenes
import cocoBeachBg from '../assets/images/coco_beach_bg_1920_1779397365415.png';
import cocoFarmBg from '../assets/images/coco_farm_bg_1920_1779397385966.png';
import cocoInteriorBg from '../assets/images/coco_interior_bg_1920_1779397404885.png';
import cocoCargoBg from '../assets/images/coco_cargo_bg_1920_1779397421260.png';

interface HeroProps {
  onExploreProducts: () => void;
  onReportWaste: () => void;
}

const HERO_SLIDES = [
  {
    image: glaciereStdImg,
    bgImage: cocoBeachBg,
    title: "Glacière Coco Standard 25L",
    badge: "LA PLUS ADOPTÉE",
    price: "10 500 FCFA",
    size: "Format Standard 25 Litres",
    use: "Pour marchandes, restaurateurs et pique-niques",
    spec: "Fini laqué lisse & brillant"
  },
  {
    image: glaciereMiniImg,
    bgImage: cocoBeachBg,
    title: "Glacière Coco Lisse 5L",
    badge: "PRATIQUE & COMPACT",
    price: "6 500 FCFA",
    size: "Format Individuel 5 Litres",
    use: "Déjeuners de bureau et petites sorties",
    spec: "Paroi lisse brillante étanche"
  },
  {
    image: glaciereCabasImg,
    bgImage: cocoBeachBg,
    title: "Glacière Coco-Sprint 15L",
    badge: "LIVRSONS & SPRINT",
    price: "8 500 FCFA",
    size: "Format Transport 15 Litres",
    use: "Idéal pour coursiers et livraisons moto",
    spec: "Composite de coco robuste"
  },
  {
    image: glaciereCargoImg,
    bgImage: cocoCargoBg,
    title: "Malle Coco-Cargo Pro 55L",
    badge: "CHAÎNE DU FROID PRO",
    price: "18 000 FCFA",
    size: "Format Malle 55 Litres",
    use: "Idéal pour grossistes, maraîchers et vrac",
    spec: "Haute densité & finition vernie"
  },
  {
    image: fertilizer25kgImg,
    bgImage: cocoFarmBg,
    title: "Coco Rafia Fertilizer 25kg",
    badge: "FORMAT PRO ROBUSTE",
    price: "42 000 FCFA",
    size: "Gros Sac Agricole de 25 kg",
    use: "Pour maraîchers et exploitants d'Aného",
    spec: "Rétention d'eau multipliée par 3"
  },
  {
    image: fertilizer1kgImg,
    bgImage: cocoFarmBg,
    title: "Coco Rafia Fertilizer 1kg",
    badge: "100% AMENDEMENT BIO",
    price: "2 500 FCFA",
    size: "Poche Pratique de 1 Kilogramme",
    use: "Nourrit les plantes et fleurs côtières",
    spec: "Optimise la structure du sol"
  },
  {
    image: perlesCocoImg,
    bgImage: cocoInteriorBg,
    title: "Perles de Coco Décoratives",
    badge: "ARTISANAT DU TOGO",
    price: "3 000 FCFA",
    size: "Lot de 100 perles polies",
    use: "Rideaux perlés, mode éco-responsable et déco",
    spec: "Coques de coco revalorisées"
  },
  {
    image: plafondsCocoImg,
    bgImage: cocoInteriorBg,
    title: "Plafonds en Coco Acoustiques",
    badge: "ÉCO-CONSTRUCTION HAUT DE GAMME",
    price: "12 500 FCFA",
    size: "Dalle standard 60x60cm",
    use: "Isolation des villas, hôtels et bureaux",
    spec: "Absorption phonique d'exception"
  }
];

export default function Hero({ onExploreProducts, onReportWaste }: HeroProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 6000);

    return () => clearInterval(timer);
  }, [currentIndex]);

  const handleNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    setTimeout(() => setIsTransitioning(false), 450);
  };

  const handlePrev = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
    setTimeout(() => setIsTransitioning(false), 450);
  };

  const currentSlide = HERO_SLIDES[currentIndex];

  return (
    <header className="relative z-0 w-full min-h-[620px] md:min-h-[720px] lg:min-h-[780px] flex items-center overflow-hidden transition-all duration-1000">
      
      {/* Immersive Fullscreen Widescreen Background Image */}
      <div className="absolute inset-0 z-0 overflow-hidden w-full h-full">
        <img
          src={currentSlide.bgImage}
          alt={currentSlide.title}
          referrerPolicy="no-referrer"
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-in-out transform ${
            isTransitioning ? 'opacity-30 scale-103 filter blur-[10px]' : 'opacity-100 scale-100 filter blur-0'
          }`}
        />
        {/* Soft elegant vignette */}
        <div className="absolute inset-0 bg-black/15 pointer-events-none" />
        
        {/* Horizontal adaptive mask: 
            Allows the background images to be perfectly visible on both mobile and desktop while preserving perfect readability of text. */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#FFFDF9]/100 via-[#FFFDF9]/85 via-45% to-transparent hidden lg:block" />
        <div className="absolute inset-0 bg-[#FFFDF9]/80 backdrop-blur-[1px] lg:hidden" />
      </div>

      {/* Subtle organic light accent spheres below overlay */}
      <div className="absolute top-12 left-6 w-96 h-96 bg-coco-green-light/20 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-coco-ice/15 rounded-full blur-3xl pointer-events-none -z-10" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12 lg:py-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Core Brand Positioning & Actions (always highly readable on off-white ground) */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Tagline / Badge */}
            <motion.div 
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-coco-green-light rounded-full text-coco-green font-mono text-xs font-semibold uppercase tracking-wider border border-coco-green/10"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Innovation Circulaire à Lomé, Togo</span>
            </motion.div>

            {/* Main Catchy Headline */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
              className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light italic text-coco-green leading-[1.1] tracking-tight"
            >
              L'isolation par la nature, <br className="hidden sm:inline" />
              <span className="text-coco-brown font-normal font-sans">pour un futur frais.</span>
            </motion.h1>

            {/* Description */}
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-2xl"
            >
              Nous transformons et revalorisons les <strong className="text-coco-brown-dark">coques de noix de coco</strong> collectées sur les plages et marchés de Lomé pour fabriquer des glacières écologiques et biodégradables. Liées grâce à de l'amidon naturel de manioc togolais, nos solutions isothermes sont <strong className="text-coco-green">30% moins chères</strong> que le polystyrène plastique polluant, pour une conservation de froid impeccable.
            </motion.p>

            {/* Micro Highlights grid */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3 pb-2 pt-1"
            >
              {[
                { icon: TrendingDown, color: "text-coco-green", bg: "bg-green-50", title: "Prix Réduit de -30%", desc: "Moins cher que le plastique d'importation" },
                { icon: ThermometerSnowflake, color: "text-teal-600", bg: "bg-teal-50", title: "Conservation Prolongée", desc: "Isolant thermique haut de gamme" },
                { icon: Recycle, color: "text-amber-700", bg: "bg-amber-50", title: "Zéro Plastique • Bio", desc: "100% compostable et naturel" },
                { icon: Shield, color: "text-emerald-600", bg: "bg-emerald-50", title: "Artisanat de Lomé", desc: "Soutenir durablement le Togo" }
              ].map((highlight, idx) => {
                const IconComponent = highlight.icon;
                return (
                  <motion.div 
                    key={idx}
                    whileHover={{ scale: 1.02, y: -2 }}
                    className="flex items-center gap-3 bg-white/85 backdrop-blur-sm p-3 rounded-xl border border-coco-shell/45 shadow-sm transition-all duration-200"
                  >
                    <div className={`w-8 h-8 rounded-lg ${highlight.bg} flex items-center justify-center ${highlight.color}`}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xs font-display text-gray-900">{highlight.title}</h3>
                      <p className="text-[11px] text-gray-400">{highlight.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Action buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2"
            >
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={onExploreProducts}
                className="px-8 py-4 bg-coco-green hover:bg-coco-green-hover text-white text-base font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all duration-150 cursor-pointer"
              >
                <span>Découvrir la Boutique</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={onReportWaste}
                className="px-6 py-4 bg-white/95 text-coco-brown-dark hover:text-white border-2 border-coco-brown hover:bg-coco-brown text-base font-bold rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all duration-150 cursor-pointer"
              >
                <Recycle className="w-5 h-5" />
                <span>Don de Déchets de Coco</span>
              </motion.button>
            </motion.div>

            {/* Trust Badges */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="flex items-center gap-5 pt-3 text-xs font-mono text-gray-500"
            >
              <div className="flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-coco-green inline" />
                <span>Sans polystyrène</span>
              </div>
              <div>•</div>
              <div className="flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-coco-green inline" />
                <span>Manioc local</span>
              </div>
              <div>•</div>
              <div className="flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-coco-green inline" />
                <span>Soutien au Togo</span>
              </div>
            </motion.div>

          </div>

          {/* Right Column: Dynamic Slider Controller Interface (Transparent and glassmorphic overlay over the big picture) */}
          <div className="lg:col-span-5 relative mt-6 lg:mt-0 flex flex-col items-center justify-center">
            
            {/* The Floating Showcase Plate (Acts as an organic caption plate and dialer for the fullscreen image) */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative w-full max-w-sm bg-white p-6 rounded-3xl border border-coco-shell/50 shadow-2xl overflow-hidden self-center group"
            >
              
              {/* Badge representing active category/state */}
              <div className="absolute top-4 right-4 bg-coco-brown text-white text-[10px] sm:text-xs font-mono font-black px-3 py-1.5 rounded-xl shadow-sm z-10 uppercase tracking-wider">
                {currentSlide.badge}
              </div>

              {/* Slider image wrapper inside plate */}
              <div className="bg-coco-sand rounded-xl p-0 mb-4 flex items-center justify-center min-h-[160px] max-h-[180px] overflow-hidden border border-coco-shell/30 shadow-inner relative">
                <img 
                  src={currentSlide.image} 
                  alt={currentSlide.title} 
                  referrerPolicy="no-referrer"
                  className={`w-full h-full object-cover aspect-video transition-all duration-500 ${isTransitioning ? 'opacity-30 scale-95 filter blur-[2px]' : 'opacity-100 scale-100'}`}
                />
              </div>

              {/* High-fidelity title and price info */}
              <h3 className="font-display font-bold text-lg text-gray-905 leading-tight">
                {currentSlide.title}
              </h3>
              
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-lg font-bold text-coco-green-hover font-mono">
                  {currentSlide.price}
                </span>
                <span className="text-[10px] text-gray-400 font-mono">FCFA TTC</span>
              </div>

              <div className="mt-3 pt-3 border-t border-coco-shell/30 space-y-2 text-left">
                <div className="flex justify-between items-start gap-2">
                  <div>
                    <span className="block font-bold text-gray-800 font-sans text-xs">
                      {currentSlide.size}
                    </span>
                    <span className="text-[11px] block text-gray-500 mt-0.5 leading-snug">
                      {currentSlide.use}
                    </span>
                  </div>
                  
                  <div className="bg-coco-green/10 text-coco-green-hover px-2.5 py-1 rounded-lg font-mono text-[10px] font-bold text-right flex-shrink-0 self-center">
                    {currentSlide.spec}
                  </div>
                </div>
              </div>

              {/* Slider Controls Inside Card */}
              <div className="mt-4 pt-3 border-t border-coco-shell/30 flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <span className="text-xs font-mono font-bold text-coco-brown">
                    0{currentIndex + 1}
                  </span>
                  <span className="text-xs font-mono text-gray-400">/</span>
                  <span className="text-xs font-mono text-gray-400">
                    0{HERO_SLIDES.length}
                  </span>
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => handlePrev()}
                    className="p-1.5 bg-coco-sand hover:bg-coco-sand/85 hover:text-coco-green text-gray-700 rounded-lg transition-all border border-coco-shell/30 shadow-sm cursor-pointer"
                    aria-label="Diapositive précédente"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleNext()}
                    className="p-1.5 bg-coco-sand hover:bg-coco-sand/85 hover:text-coco-green text-gray-700 rounded-xl transition-all border border-coco-shell/30 shadow-sm cursor-pointer"
                    aria-label="Diapositive suivante"
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </motion.div>

            {/* Slider dot progress indicator on floor */}
            <div className="flex gap-2 mt-4">
              {HERO_SLIDES.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    idx === currentIndex ? 'w-6 bg-coco-green shadow-sm' : 'w-1.5 bg-coco-shell/60 hover:bg-coco-shell'
                  }`}
                  aria-label={`Aller à l'image ${idx + 1}`}
                />
              ))}
            </div>

            {/* Tiny Floating Trust Badges over the background */}
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="absolute top-1/2 -left-4 -translate-y-1/2 bg-white/95 backdrop-blur-sm p-3 rounded-2xl border border-coco-shell/40 shadow-xl max-w-[130px] space-y-1 hidden sm:block"
            >
              <Leaf className="w-5 h-5 text-coco-green" />
              <span className="block text-[10px] font-bold font-display text-coco-brown-dark leading-tight">Plages Propres</span>
              <span className="block text-[9px] text-gray-500">
                Coques de coco collectées de Lomé
              </span>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="absolute -bottom-3 -right-3 bg-white/95 backdrop-blur-sm p-3.5 rounded-2xl border border-coco-shell/40 shadow-xl text-center min-w-[100px] hidden sm:block"
            >
              <span className="block text-xl font-black text-coco-green font-mono">105%</span>
              <span className="text-[9px] uppercase font-mono tracking-widest font-black text-gray-400">
                Fait au Togo
              </span>
            </motion.div>

          </div>

        </div>
      </div>
    </header>
  );
}
