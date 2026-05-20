import glaciereStdImage from '../assets/images/glaciere_std_1779300297795.png';
import caisseCargoImage from '../assets/images/caisse_cargo_1779300313130.png';
import cabasSprintImage from '../assets/images/cabas_sprint_1779300332396.png';
import biocharAgriImage from '../assets/images/biochar_agri_1779300352224.png';

export interface Product {
  id: string;
  name: string;
  tagline: string;
  category: 'glaciere' | 'logistique' | 'agri';
  price: number; // in FCFA
  capacity: string;
  thermalPerformance: string;
  weight: string;
  composition: string;
  biodegradability: string;
  description: string;
  fullDetails: string[];
  image: string; // fallback inline/generated aesthetic placeholder svg
}

export const PRODUCTS: Product[] = [
  {
    id: "coco-std-25",
    name: "Glacière Coco-Rafia Standard",
    tagline: "L'alternative idéale au polystyrène pour les marchés et pique-niques",
    category: "glaciere",
    price: 12500,
    capacity: "25 Litres",
    thermalPerformance: "Conservation du froid pendant 36h (entre 0°C et 8°C)",
    weight: "1.8 kg (vide)",
    composition: "Fibre de coco upcyclée (70%), Composite d'amidon de manioc local (30%), Vernis ciré naturel imperméable.",
    biodegradability: "Amortissement d'impact carbone nul, dégradation totale en compost de jardin en 180 jours.",
    description: "Parfaite pour les vendeuses de poissons d'Assigamé et de Port de Lomé, cette glacière légère remplace durablement le polystyrène plastique polluant, tout en offrant une meilleure robustesse aux chocs au Togo.",
    fullDetails: [
      "Isolation thermique de pointe équivalente aux plastiques fossiles",
      "Structure extérieure rigide recouverte de toile de jute naturelle tissée",
      "Poignée en corde de rafia sauvage résistante pour le transport",
      "Double étanchéité grâce à l'enduit de cire végétale locale",
      "Lavable et réutilisable pour de multiples campagnes de pêche ou de vente"
    ],
    image: glaciereStdImage
  },
  {
    id: "coco-cargo-55",
    name: "Caisse Logistique Coco-Cargo",
    tagline: "La solution d'exportation fraîcheur et de chaîne du froid professionnelle",
    category: "logistique",
    price: 22500,
    capacity: "55 Litres",
    thermalPerformance: "Conservation frigorifique prolongée jusqu'à 48h+",
    weight: "3.2 kg (vide)",
    composition: "Flocons agglomérés de bourre de coco compressée à chaud, liant amylacé de manioc togolais de Mission-Tové.",
    biodegradability: "100% compostable à grande échelle. Revêtement extérieur recyclable.",
    description: "Conçue pour les producteurs horticoles, exportateurs de fruits frais du Togo et la livraison de produits thermosensibles (vaccins, produits laitiers) dans toute la sous-région ouest-africaine.",
    fullDetails: [
      "Résistance à la compression mécanique élevée pour l'empilement en camions",
      "Excellente étanchéité à l'air grâce à un joint thermique compressible",
      "Épaisseur d'isolant de 40mm pour des performances extrêmes sous climat tropical",
      "Conçue pour être modulable et s'adapter aux dimensions standards des palettes",
      "Économie directe de 30% par rapport aux conteneurs isothermes importés"
    ],
    image: caisseCargoImage
  },
  {
    id: "coco-cabas-15",
    name: "Cabas Isotherme Coco-Sprint",
    tagline: "Sacoche isotherme souple et robuste pour livreurs à moto",
    category: "glaciere",
    price: 8500,
    capacity: "15 Litres",
    thermalPerformance: "Chambre isotherme conservant le frais pendant 12h à 18h",
    weight: "0.9 kg (vide)",
    composition: "Tissu souple de Rafia naturel et coton local imperméabilisé, matelas isolant thermique flexible en fibres de coco cardées.",
    biodegradability: "Composants biodégradables (92%), fermetures et sangles réutilisables.",
    description: "Destiné aux livreurs à deux-roues de Lomé, aux supermarchés éco-responsables et aux particuliers qui exigent un sac à dos/boîte isotherme compact pour leurs achats quotidiens.",
    fullDetails: [
      "Conception ergonomique avec sangles d'épaule réglables renforcées",
      "Poche extérieure zippée pour les reçus ou petits accessoires de livraison",
      "Doublure intérieure souple, lavable d'un simple coup d'éponge humide",
      "Panneaux souples pliables pour un rangement à plat peu encombrant",
      "Matériau brut indigène valorisant le patrimoine artisanal du Togo"
    ],
    image: cabasSprintImage
  },
  {
    id: "coco-biochar-25",
    name: "Biochar Agricole Coco-Terre",
    tagline: "L'amendement ultime pour fertiliser les sols maraîchers sableux de Lomé",
    category: "agri",
    price: 4500,
    capacity: "Sac de 25 kg",
    thermalPerformance: "Capacité de rétention de l'eau multipliée par 3 dans les sols poreux",
    weight: "25.0 kg",
    composition: "Poudre et granulés de charbon de coque de coco pyrolyse (85%), résidus organiques de fécule de manioc riches en amidon azoté (15%).",
    biodegradability: "Séquestration permanente du carbone dans le sol (puits de carbone millénaire).",
    description: "Fabriqué à Lomé à partir des résidus de carbonisation propre de nos chutes de coques de coco, le biochar restaure biologiquement la fertilité des sols de la côte togolaise abîmés par l'érosion.",
    fullDetails: [
      "Réduit les besoins d'arrosage de 45% dans les zones d'agriculture urbaine de Lomé",
      "Fixe les nutriments organiques NPK près des racines des plantes",
      "Favorise le développement rapide du réseau microbien constructeur de sol",
      "Chaque sac acheté équivaut à la séquestration de 15kg de CO2 de l'atmosphère",
      "Idéal pour la culture de tomates, carottes et oignons au littoral"
    ],
    image: biocharAgriImage
  }
];
