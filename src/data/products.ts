import glaciereMiniImage from '../assets/images/glaciere_5l_resin_1779397998567.png';
import glaciereCabasImage from '../assets/images/glaciere_15l_resin_1779398016057.png';
import glaciereStdImage from '../assets/images/glaciere_25l_resin_1779398032622.png';
import glaciereCargoImage from '../assets/images/glaciere_55l_resin_1779398048736.png';
import fertilizer1kgImage from '../assets/images/fertilizer_1kg_1779380348921.png';
import fertilizerSacImage from '../assets/images/fertilizer_sac_1779380366195.png';
import fertilizer25kgImage from '../assets/images/fertilizer_25kg_heavy_bag_1779396825649.png';
import perlesCocoImage from '../assets/images/perles_de_coco_1779396843587.png';
import plafondsCocoImage from '../assets/images/plafonds_en_coco_1779396861481.png';
import sacDosCocoImage from '../assets/images/sac_dos_coco_1779399338765.png';

export interface Product {
  id: string;
  name: string;
  tagline: string;
  category: 'glaciere' | 'logistique' | 'agri' | 'autres';
  price: number; // in FCFA
  capacity: string;
  thermalPerformance: string;
  weight: string;
  composition: string;
  biodegradability: string;
  description: string;
  fullDetails: string[];
  image: string;
}

export const PRODUCTS: Product[] = [
  {
    id: "coco-mini-5",
    name: "Glacière Coco Lisse 5L",
    tagline: "Ultra-compacte et élégante avec une finition lisse, brillante et imperméable",
    category: "glaciere",
    price: 6500,
    capacity: "5 Litres",
    thermalPerformance: "Conservation du frais pendant 24h (entre 0°C et 10°C)",
    weight: "0.6 kg (vide)",
    composition: "Fibre de coco fine revalorisée moulée sous pression (70%), composite d'amidon thermique et de liant végétal pour un rendu brillant et parfaitement lisse (30%).",
    biodegradability: "100% biodégradable et compostable sous 180 jours.",
    description: "Une magnifique petite glacière moderne, agréable au toucher, étanche et ultra-isolante avec sa magnifique paroi lisse effet laqué.",
    fullDetails: [
      "Finition laquée lisse et brillante très facile à nettoyer",
      "Épaisseur d'isolation optimisée pour un modèle compact léger",
      "Poignée en corde tressée robuste et couvercle étanche",
      "Format facilement transportable sur deux-roues"
    ],
    image: glaciereMiniImage
  },
  {
    id: "coco-sprint-15",
    name: "Glacière de Transport Coco-Sprint 15L",
    tagline: "Glacière rigide de taille polyvalente avec revêtement brillant haute résistance",
    category: "glaciere",
    price: 8500,
    capacity: "15 Litres",
    thermalPerformance: "Chambre isotherme hermétique gardant le frais pendant 24h a 36h",
    weight: "1.1 kg (vide)",
    composition: "Fibre de coco de Lomé mélangée à du liant d'amidon de manioc togolais, polie à chaud pour un fini lisse et brillant.",
    biodegradability: "Matériaux d'origine naturelle et amidon de manioc 100% biosourcé.",
    description: "Parfaite pour les livraisons à Lomé et pour conserver vos boissons bien au frais avec un design brillant éco-conçu d'exception.",
    fullDetails: [
      "Matériau composite coco d'aspect brillant et lisse haut de gamme",
      "Sangle d'épaule ergonomique, réglable et rembourrée",
      "Doublure intérieure étanche lavable d'un coup d'éponge",
      "Excellente étanchéité et solidité lors des transports sur moto"
    ],
    image: glaciereCabasImage
  },
  {
    id: "coco-std-25",
    name: "Glacière Coco Standard 25L",
    tagline: "L'alternative phare de 25L avec paroi extérieure polie et brillante",
    category: "glaciere",
    price: 10500,
    capacity: "25 Litres",
    thermalPerformance: "Excellente conservation du froid supérieure à 36h-48h",
    weight: "1.8 kg (vide)",
    composition: "Plaque dense de coco agglomérée, revêtue d'un liant solide de manioc naturel togolais verni pour une surface lisse et satinée.",
    biodegradability: "Totalement biodégradable et compostable en fin de vie, ne produit aucun micro-plastique.",
    description: "Particulièrement plébiscitée par les commerçantes et restaurateurs de Lomé pour sa robustesse incomparable et son nettoyage d'un geste grâce à sa finition brillante sans aspérité.",
    fullDetails: [
      "Isolation thermique équivalente ou supérieure au PSE classique",
      "Revêtement externe poli, étanche et brillant pour protéger de la pluie et de la boue",
      "Haute étanchéité préservant l'eau glacée de fonte",
      "Ultra-robuste : ne s'effrite pas lors des chocs sur moto"
    ],
    image: glaciereStdImage
  },
  {
    id: "coco-cargo-55",
    name: "Malle Frigorifique Coco-Cargo 55L",
    tagline: "Malle logistique isotherme professionnelle grand format d'aspect lisse et résistant",
    category: "logistique",
    price: 18000,
    capacity: "55 Litres",
    thermalPerformance: "Performance frigorifique prolongée jusqu'à 48h-72h",
    weight: "3.5 kg (vide)",
    composition: "Composite haute densité de coco de Lomé et de liant naturel de manioc, compressé sous haute température avec finition vitrifiée brillante.",
    biodegradability: "100% compostable à grande échelle en fin de vie commerciale.",
    description: "Le top de l'isolation professionnelle au Togo : un grand volume robuste, lisse, lavable à grande eau et doté d'une finition brillante impeccable anti-rayures.",
    fullDetails: [
      "Fini lisse effet laque protectrice résistant aux chocs et intempéries",
      "Épaisseur thermique renforcée de 40mm d'isolant de coco",
      "Étanchéité optimale avec joint compressible d'isolation",
      "Modulable pour s'adapter aux dimensions standards des palettes"
    ],
    image: glaciereCargoImage
  },
  {
    id: "coco-fertilizer-1",
    name: "Coco Rafia Fertilizer - 1kg",
    tagline: "Sachet d'amendement biologique enrichi pour revitaliser vos plantes d'intérieur et d'extérieur",
    category: "agri",
    price: 2500,
    capacity: "Sachet de 1 kg",
    thermalPerformance: "Rétention d'eau accrue des sols poreux et sableux",
    weight: "1.0 kg",
    composition: "Charbon végétal de coques de noix de coco pyrolyse (85%), nutriments organiques d'amidon azoté de manioc (15%).",
    biodegradability: "Séquestration carbone à très long terme (puits de carbone permanent).",
    description: "Une formule fertilisante saine et naturelle au format pratique de 1kg pour nourrir vos fleurs, jardins urbains et bacs potagers à Lomé.",
    fullDetails: [
      "Stimule intensément l'activité biologique bénéfique du sol",
      "Optimise la filtration des nutriments",
      "Augmente la résistance thermique racinaire lors des fortes chaleurs",
      "Zéro produit chimique de synthèse : pur produit agricole togolais"
    ],
    image: fertilizer1kgImage
  },
  {
    id: "coco-fertilizer-5",
    name: "Coco Rafia Fertilizer - 5kg",
    tagline: "Format intermédiaire idéal pour les potagers familiaux et petits maraîchers urbains",
    category: "agri",
    price: 10000,
    capacity: "Sac de 5 kg",
    thermalPerformance: "Capacité d'absorption hydrique multipliée par 3",
    weight: "5.0 kg",
    composition: "Charbon végétal de coques de noix de coco pyrolyse (85%), nutriments organiques d'amidon azoté de manioc (15%).",
    biodegradability: "Amendement organique pérenne qui capture durablement le CO2.",
    description: "Conçu pour la permaculture de Lomé, ce format intermédiaire fortifie le rendement de vos cultures maraîchères de quartier.",
    fullDetails: [
      "Permet de réduire la fréquence des arrosages de près de 35%",
      "Retient activement les minéraux naturels",
      "Facile à mélanger à la terre côtière sableuse",
      "Augmente la porosité et l'aération naturelle de la terre"
    ],
    image: fertilizerSacImage
  },
  {
    id: "coco-fertilizer-25",
    name: "Coco Rafia Fertilizer - 25kg",
    tagline: "Le format professionnel ultime pour restructurer durablement les sols agricoles",
    category: "agri",
    price: 42000,
    capacity: "Sac de 25 kg",
    thermalPerformance: "Rétention en eau maximale et stabilisation des éléments nutritifs",
    weight: "25.0 kg",
    composition: "Charbon végétal de coques de noix de coco pyrolyse (85%), nutriments organiques d'amidon azoté de manioc (15%).",
    biodegradability: "Puits de carbone millénaire qui enrichit les terres sableuses du littoral.",
    description: "Destiné aux exploitants maraîchers d'Aného, de Lomé et du littoral togolais, pour doubler le rendement des cultures sous haute chaleur.",
    fullDetails: [
      "Réduit l'apport en engrais coûteux de près de 40%",
      "Forme un tampon hydrique durable sous le réseau racinaire",
      "Limite le lessivage des nutriments en cas d'averses intenses",
      "Chaque sac séquestre l'équivalent de 15 kg de CO2"
    ],
    image: fertilizer25kgImage
  },
  {
    id: "coco-perles",
    name: "Perles de Coco Décoratives",
    tagline: "Perles polies de coques de coco revalorisées pour accessoires et décoration",
    category: "autres",
    price: 3000,
    capacity: "Lot de 100 perles",
    thermalPerformance: "Excellente durabilité et résistance mécanique",
    weight: "0.2 kg",
    composition: "Coques de noix de coco de Lomé polies à la main, cirées à l'huile végétale biologique.",
    biodegradability: "Matériau 100% naturel et biodégradable.",
    description: "Des perles élégantes et polies avec soin à Lomé pour l'artisanat, la mode éco-responsable et la décoration d'intérieur durable.",
    fullDetails: [
      "Sélectionnées rigoureusement et polies pour un fini impeccable",
      "Teinte brune foncée naturelle chaleureuse unique",
      "Idéal pour rideaux de perles, bijoux et loisirs créatifs",
      "Soutien direct à l'artisanat circulaire togolais"
    ],
    image: perlesCocoImage
  },
  {
    id: "coco-plafond",
    name: "Plafonds en Coco Acoustiques",
    tagline: "Dalles de plafond isolantes et acoustiques de haute qualité architecturale",
    category: "autres",
    price: 12500,
    capacity: "Dalle 60x60 cm",
    thermalPerformance: "Isolation thermique optimale et absorption acoustique performante",
    weight: "1.5 kg (par dalle)",
    composition: "Fibres et bourre de coco agglomérées en plaques denses, liant ignifuge naturel de manioc togolais.",
    biodegradability: "100% biosourcé, durable et compostable en fin d'usage.",
    description: "Solution écologique pour l'aménagement intérieur de bureaux, d'hôtels et de résidences. Apporte un confort acoustique et thermique haut de gamme.",
    fullDetails: [
      "Excellente absorption sonore des moyennes et hautes fréquences",
      "Régulation naturelle de l'humidité et de la température intérieure",
      "Design esthétique géométrique et chaleureux",
      "Finition résistante à la moisissure tropicale"
    ],
    image: plafondsCocoImage
  },
  {
    id: "coco-sac-dos",
    name: "Sac à Dos Chic en Fibre de Coco",
    tagline: "Élégant, robuste et 100% éco-conçu pour vos déplacements au quotidien",
    category: "autres",
    price: 15500,
    capacity: "Contenance 18 Litres",
    thermalPerformance: "Excellente aération naturelle anti-transpiration",
    weight: "0.8 kg",
    composition: "Fibre de coco tressée de Lomé (80%), doublure douce en coton écru togolais (20%), boucles en laiton recyclé.",
    biodegradability: "95% biodégradable et compostable, boucles métalliques durables.",
    description: "Un sac à dos d'une élégance rare, alliant la robustesse naturelle de la fibre de coco au raffinement du tressage traditionnel togolais. Totalement imperméable et léger.",
    fullDetails: [
      "Compartiment principal spacieux avec doublure douce en coton local",
      "Bretelles ergonomiques ajustables pour un confort de transport optimal",
      "Rangement intégré et compartiment secret pour effets précieux",
      "Finition de tressage haut de gamme à la main, durable face à l'usure"
    ],
    image: sacDosCocoImage
  }
];
