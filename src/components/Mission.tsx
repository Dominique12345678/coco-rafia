import React from 'react';
import { Target, Leaf, HeartHandshake, CheckCircle2, ChevronRight, Recycle, Sparkles, Sprout, Zap, Droplet, Sun, ShoppingBag } from 'lucide-react';

export default function Mission() {
  const steps = [
    {
      num: "01",
      title: "Collecte Éco-citoyenne",
      desc: "Nous ramassons les coques rejetées sur la plage de Lomé (Coco Beach, Lomé 2) et auprès des vendeurs ambulants de coco d'Assigamé.",
      icon: Sprout
    },
    {
      num: "02",
      title: "Broyage & Cardage",
      desc: "Les coques rebelles sont broyées pour extraire de longues fibres rudes de coco et de la bourre isolante d'excellente capacité thermique.",
      icon: Zap
    },
    {
      num: "03",
      title: "Liant Amidon de Manioc",
      desc: "Pas de colle pétrochimique ! Nous préparons un liant naturel à base de fécule de manioc cultivé par les coopératives locales.",
      icon: Droplet
    },
    {
      num: "04",
      title: "Pressage & Séchage",
      desc: "Le composite coco-manioc est compressé dans des moules sur-mesure puis séché au soleil togolais pour donner sa rigidité finale.",
      icon: Sun
    },
    {
      num: "05",
      title: "Tissage de protection",
      desc: "La glacière est revêtue à la main d'une toile protectrice de jute et de cordages en rafia tressés par nos artisans partenaires.",
      icon: ShoppingBag
    }
  ];

  const sdgs = [
    {
      id: 12,
      title: "Consommation & Production Responsables",
      text: "Transformation de déchets organiques encombrants en emballages isothermes réutilisables.",
      color: "bg-amber-600"
    },
    {
      id: 8,
      title: "Travail Décent & Croissance",
      text: "Revenus d'appoint pour les ramasseurs côtiers de Lomé et valorisation de l'artisanat du Togo.",
      color: "bg-red-700"
    },
    {
      id: 14,
      title: "Vie Aquatique & Protection des Océans",
      text: "Désencombrement du sable de mer et prévention de l'érosion des plages causée par le plastique accumulé.",
      color: "bg-blue-600"
    },
    {
      id: 13,
      title: "Lutte Contre le Changement Climatique",
      text: "Matériaux d'origine biologique locaux captant durablement le CO2 et réduisant les importations de pétrole.",
      color: "bg-emerald-700"
    }
  ];

  return (
    <section id="impact" className="py-20 bg-[#FDFBF7] border-y border-coco-shell/30 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-coco-brown/10 rounded-full text-coco-brown font-mono text-xs font-bold uppercase tracking-wider">
            <Target className="w-3.5 h-3.5" />
            <span>Notre Mission & Impact</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light italic text-coco-green tracking-tight">
            Remplacer le polystyrène <span className="text-coco-brown font-normal">par la force de nos côtes</span>
          </h2>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            Chaque jour, à Lomé, des milliers de noix de coco sont vendues pour leur eau fraîche. Leurs coques fibreuses finissent entassées au hasard, bouchant les caniveaux urbains. En parallèle, les marchandes utilisent du polystyrène fragile importé. Coco-Rafia résout ces deux défis d'un coup.
          </p>
        </div>

        {/* Circular Economy Process Workflow */}
        <div className="space-y-8">
          <div className="flex items-center gap-2 border-b border-coco-shell/40 pb-3">
            <Recycle className="w-5 h-5 text-coco-green" />
            <h3 className="font-serif font-medium italic text-lg text-coco-green">Le Cycle Circulaire Coco-Rafia</h3>
          </div>

          {/* Staggered process cards */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div 
                  key={step.num}
                  className="relative bg-white p-5 rounded-2xl border border-coco-shell/40 shadow-sm hover:shadow-md transition-all group hover:-translate-y-1 duration-200"
                >
                  {/* Connector arrow on desktops */}
                  {idx < steps.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 -right-3.5 -translate-y-1/2 z-10 text-coco-green/30">
                      <ChevronRight className="w-6 h-6" />
                    </div>
                  )}
                  
                  {/* Number & Icon badge header */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-2xl font-black text-coco-green/20 group-hover:text-coco-green/40 transition-colors">
                      {step.num}
                    </span>
                    <span className="w-10 h-10 bg-coco-sand rounded-xl flex items-center justify-center border border-coco-shell/20 text-coco-green">
                      <Icon className="w-5 h-5" />
                    </span>
                  </div>

                  <h4 className="font-display font-bold text-sm text-gray-900 mb-2">{step.title}</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* SDGs (ODD) Impact Board */}
        <div className="mt-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* SDGs explanatory text */}
          <div className="lg:col-span-5 space-y-5 text-left">
            <div className="inline-flex items-center gap-1 bg-emerald-100 text-coco-green px-2.5 py-1 rounded-lg text-xs font-mono font-bold">
              <Sparkles className="w-4 h-4 animate-spin-slow" />
              <span>Contribution Officielle aux ODD</span>
            </div>
            
            <h3 className="font-serif text-2xl sm:text-3xl font-light italic text-coco-green leading-tight">
              Une solution togolaise <span className="text-coco-brown font-normal">engagée pour l’agenda mondial</span>
            </h3>
            
            <p className="text-sm text-gray-600 leading-relaxed">
              Coco-Rafia s'aligne rigoureusement sur les Objectifs de Développement Durable (ODD) des Nations Unies, favorisant la création d'emplois décents pour les jeunes et les femmes de Lomé tout en nettoyant activement notre environnement côtier.
            </p>

            <div className="bg-white p-4 rounded-2xl border border-coco-shell/40 shadow-sm space-y-3">
              <h4 className="font-display font-bold text-sm text-coco-brown-dark">
                Impact social tangible mesuré à Lomé :
              </h4>
              <ul className="space-y-2 text-xs text-gray-600">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-coco-green flex-shrink-0 mt-0.5" />
                  <span><strong>+150 ramasseurs côtiers</strong> rémunérés équitablement pour leur collecte.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-coco-green flex-shrink-0 mt-0.5" />
                  <span><strong>35 tonnes de déchets</strong> de coco retirés des rues et canaux chaque mois.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-coco-green flex-shrink-0 mt-0.5" />
                  <span><strong>Coopératives de manioc partenaires</strong> soutenues par l'achat d'amidon brut.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Grid of ODD / SDG tiles */}
          <div className="lg:col-span-1" />
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {sdgs.map((sdg) => (
              <div 
                key={sdg.id}
                className="bg-white p-5 rounded-2xl border border-coco-shell/40 shadow-sm flex flex-col justify-between hover:shadow-md transition-all"
              >
                {/* SDG Indicator Badge */}
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 ${sdg.color} text-white flex items-center justify-center font-bold font-mono text-sm rounded-lg`}>
                    {sdg.id}
                  </div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-gray-400 font-bold">ODD TOGO</span>
                </div>

                <div className="space-y-2 text-left">
                  <h4 className="font-display font-bold text-sm text-gray-900">{sdg.title}</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">{sdg.text}</p>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
