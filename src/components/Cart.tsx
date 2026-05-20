import React, { useState, useEffect, useRef } from 'react';
import { 
  ShoppingBag, Trash2, Plus, Minus, Info, MapPin, User, Tag, Send, 
  AlertCircle, Sparkles, Check, Loader2, Coins, Phone, ArrowLeft, ShieldCheck, CornerDownRight, Download
} from 'lucide-react';
import { Product, PRODUCTS } from '../data/products';
import { jsPDF } from 'jspdf';

interface CartItem {
  productId: string;
  quantity: number;
}

interface CartProps {
  cart: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  onClose?: () => void;
}

const LOME_NEIGHBORHOODS = [
  "Assigamé (Grand Marché)",
  "Deckon",
  "Tokoin (Ramco / Habitat / Trésor)",
  "Kodjoviakopé",
  "Hedzranawoé",
  "Nyékonakpoé",
  "Baguida / Avepozo",
  "Bè / Akodessewa",
  "Cacaveli / Totsi",
  "Agoè-Nyivé",
  "Adidogomé",
  "Port de Lomé",
  "Forever",
  "Hanoukopé",
  "Autre quartier de Lomé"
];

const CUSTOMER_PROFILES = [
  { value: "poissonnier", label: "Vendeur / Vendeuse de poisson" },
  { value: "bar_restaurant", label: "Bar / Maquis / Restaurant" },
  { value: "hotel", label: "Hôtel / Résidence" },
  { value: "maraicher", label: "Maraîcher / Agriculteur" },
  { value: "transporteur", label: "Compagnie de transport / Logistique" },
  { value: "particulier", label: "Particulier / Usage domestique" }
];

// Direct contact number of Coco-Rafia initiative at Lomé
const WHATSAPP_CONTACT_NUMBER = "+22890000000";

export default function Cart({ cart, onUpdateQuantity, onRemoveItem, onClearCart, onClose }: CartProps) {
  // Main checkout steps: 'basket' | 'delivery_form' | 'payment_select' | 'payment_processing' | 'confirmed'
  const [currentStep, setCurrentStep] = useState<'basket' | 'delivery_form' | 'payment_select' | 'payment_processing' | 'confirmed'>('basket');
  
  // Deliver Form State
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [neighborhood, setNeighborhood] = useState(LOME_NEIGHBORHOODS[0]);
  const [customNeighborhood, setCustomNeighborhood] = useState('');
  const [customerProfile, setCustomerProfile] = useState(CUSTOMER_PROFILES[0].value);
  const [specialNote, setSpecialNote] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Geolocation Map State
  const [gpsCoords, setGpsCoords] = useState<{lat: number; lng: number} | null>({ lat: 6.1342, lng: 1.2188 }); // Lomé center
  const [isLocating, setIsLocating] = useState(false);
  const mapRef = useRef<any>(null);
  const markerRef = useRef<any>(null);

  // Payment Selection State
  const [selectedPayment, setSelectedPayment] = useState<'flooz' | 'mixx' | 'cash'>('flooz');
  const [paymentPhone, setPaymentPhone] = useState('');
  const [paymentTxRef, setPaymentTxRef] = useState('');
  const [processingProgress, setProcessingProgress] = useState(0);

  // Find products associated with cart items
  const cartWithProducts = cart.map(item => {
    const product = PRODUCTS.find(p => p.id === item.productId);
    return {
      ...item,
      product
    };
  }).filter((item): item is CartItem & { product: Product } => !!item.product);

  const totalCartPrice = cartWithProducts.reduce((sum, item) => {
    return sum + (item.product.price * item.quantity);
  }, 0);

  // Carbon and polystyrene plastic saved approximations
  const plasticSavedKg = cartWithProducts.reduce((sum, item) => {
    if (item.product.category === 'glaciere') {
      return sum + (1.2 * item.quantity); // 1.2kg equivalent polystyrene saved per eco-glaciere
    }
    return sum;
  }, 0);

  // Client-side PDF Invoice generation utilizing A4 format
  const handleDownloadPDF = () => {
    try {
      const doc = new jsPDF({
        orientation: 'p',
        unit: 'mm',
        format: 'a4'
      });

      const orderId = `CR-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
      const finalNeighborhood = neighborhood === "Autre quartier de Lomé" && customNeighborhood 
        ? customNeighborhood 
        : neighborhood;
      const profileLabel = CUSTOMER_PROFILES.find(p => p.value === customerProfile)?.label || customerProfile;

      // Header Banner (Coco Green #1B4332 equivalent)
      doc.setFillColor(27, 67, 50);
      doc.rect(0, 0, 210, 38, 'F');

      // Title & Brand
      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(22);
      doc.text("COCO-RAFIA TOGO", 15, 16);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.text("Glacieres Isothermes Ecologiques & Biochar Fertilisant", 15, 23);
      doc.text("Lome, Togo | Tel: +228 90 00 00 00 | Email: contact@coco-rafia.co", 15, 29);

      // Invoice metadata tag
      doc.setFillColor(233, 240, 236); // Light mint
      doc.rect(130, 8, 65, 22, 'F');
      
      doc.setTextColor(27, 67, 50);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.text("FACTURE DE COMMANDE", 133, 14);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8.5);
      doc.text(`Reference: ${paymentTxRef || orderId}`, 133, 20);
      doc.text(`Date: ${new Date().toLocaleDateString('fr-TG')}`, 133, 25);

      // Section: Client Details
      doc.setTextColor(60, 60, 60);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.text("COORDONNEES DE LIVRAISON :", 15, 48);
      
      doc.setFillColor(248, 248, 244);
      doc.rect(15, 51, 180, 31, 'F');
      
      doc.setTextColor(30, 30, 30);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9.5);
      doc.text(`Nom de l'acheteur : ${fullName.trim()}`, 18, 57);
      doc.text(`Telephone / WhatsApp : ${phone.trim()}`, 18, 63);
      doc.text(`Secteur d'activite : ${profileLabel}`, 18, 69);
      doc.text(`Quartier de livraison : ${finalNeighborhood}`, 18, 75);
      if (gpsCoords) {
        doc.text(`Position Geographique GPS : ${gpsCoords.lat.toFixed(5)}, ${gpsCoords.lng.toFixed(5)}`, 18, 80);
      }

      // Section: Order Items Table
      doc.setFont("helvetica", "bold");
      doc.setTextColor(60, 60, 60);
      doc.text("ESSAI DETAILLE DU PANIER :", 15, 91);

      // Table Header Row
      doc.setFillColor(27, 67, 50);
      doc.rect(15, 94, 180, 8, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(8.5);
      doc.text("Article d'Upcycling local", 18, 995 - 900); // 99
      doc.text("Capacite", 100, 99);
      doc.text("Qte", 135, 995 - 900); // 135
      doc.text("Prix Unit. (FCFA)", 150, 99);
      doc.text("Total (FCFA)", 175, 99);

      // Table Body Rows
      let yCoord = 107;
      doc.setTextColor(50, 50, 50);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);

      cartWithProducts.forEach((item, index) => {
        if (index % 2 === 1) {
          doc.setFillColor(252, 252, 248);
          doc.rect(15, yCoord - 4, 180, 7.5, 'F');
        }

        doc.text(item.product.name.substring(0, 42), 18, yCoord);
        doc.text(item.product.capacity || "U", 100, yCoord);
        doc.text(String(item.quantity), 136, yCoord);
        doc.text(item.product.price.toLocaleString('fr-FR'), 150, yCoord);
        doc.text((item.product.price * item.quantity).toLocaleString('fr-FR'), 175, yCoord);

        yCoord += 7.5;
      });

      // Separation line
      doc.setDrawColor(27, 67, 50);
      doc.setLineWidth(0.3);
      doc.line(15, yCoord, 195, yCoord);

      yCoord += 6;

      // Settlement block
      doc.setFont("helvetica", "bold");
      doc.text("Recapitulatif Financier", 15, yCoord);
      yCoord += 4;

      doc.setFillColor(248, 248, 244);
      doc.rect(15, yCoord, 180, 24, 'F');

      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      const paymentLabelRecap = 
        selectedPayment === 'flooz' ? `Moov Money Flooz (Ref Transaction: ${paymentTxRef})` :
        selectedPayment === 'mixx' ? `Moov Mixx by Yas (Ref Transaction: ${paymentTxRef})` :
        `Especes / T-Money a la livraison`;

      doc.text(`Mode de paiement selectionne : ${paymentLabelRecap}`, 18, yCoord + 6);
      doc.text(`Statut de reglement : TRANSACTION VALIDE (PRE-AUTORISEE RESEAU TOGO)`, 18, yCoord + 12);
      
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10.5);
      doc.text(`MONTANT NET REGLE : ${totalCartPrice.toLocaleString('fr-FR')} FCFA`, 18, yCoord + 18);

      yCoord += 31;

      // Eco Impact block
      doc.setFillColor(233, 245, 238); // Soft mint tint
      doc.rect(15, yCoord, 180, 16, 'F');
      
      doc.setTextColor(27, 67, 50);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9.5);
      doc.text("IMPACT ENVIRONNEMENTAL POUR LE TOGO :", 18, yCoord + 5.5);
      
      doc.setFont("helvetica", "italic");
      doc.setFontSize(8.5);
      doc.text(`Grâce a cet achat upcycle, vous evitez ~${plasticSavedKg.toFixed(1)} kg de dechets de plastique polystyrène fossile.`, 18, yCoord + 11);

      // Thank you footer
      yCoord += 24;
      doc.setTextColor(110, 110, 110);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9.5);
      doc.text("Merci pour votre confiance en l'economie circulaire locale !", 105, yCoord, { align: 'center' });

      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.text("Produit artisanalement a Lome (Togo) a base de coques de noix de coco locales upcyclees.", 105, yCoord + 4.5, { align: 'center' });

      doc.save(`Facture-CocoRafia-${paymentTxRef || orderId}.pdf`);
    } catch (pdfErr) {
      console.error("PDF download failure:", pdfErr);
      alert("Une erreur est survenue lors de l'edition de la facture PDF.");
    }
  };

  // Handle Dynamic Leaflet scripts & Styles on 'delivery_form' step
  useEffect(() => {
    let isMounted = true;

    if (currentStep !== 'delivery_form' || cartWithProducts.length === 0) {
      if (mapRef.current) {
        try {
          mapRef.current.remove();
        } catch (e) {}
        mapRef.current = null;
        markerRef.current = null;
      }
      return;
    }

    const initLeafletMap = async () => {
      // Check if Leaflet styles already exists
      if (!document.getElementById('leaflet-css')) {
        const link = document.createElement('link');
        link.id = 'leaflet-css';
        link.rel = 'stylesheet';
        link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
        document.head.appendChild(link);
      }

      // Check if Leaflet script already exists
      if (!(window as any).L) {
        if (!document.getElementById('leaflet-js')) {
          const script = document.createElement('script');
          script.id = 'leaflet-js';
          script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
          await new Promise<void>((resolve) => {
            script.onload = () => resolve();
            document.body.appendChild(script);
          });
        }
      }

      // Small delay to ensure container element is printed in the DOM tree
      setTimeout(() => {
        if (!isMounted) return;
        const container = document.getElementById('togo-delivery-map');
        if (!container || !(window as any).L) return;

        // Reset previous instance
        if (mapRef.current) {
          try {
            mapRef.current.remove();
          } catch (e) {}
          mapRef.current = null;
          markerRef.current = null;
        }

        try {
          const L = (window as any).L;
          
          const mapInstance = L.map('togo-delivery-map', {
            center: gpsCoords ? [gpsCoords.lat, gpsCoords.lng] : [6.1342, 1.2188],
            zoom: 13,
            zoomControl: true,
            scrollWheelZoom: true
          });

          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap'
          }).addTo(mapInstance);

          const startLatLng = gpsCoords ? [gpsCoords.lat, gpsCoords.lng] : [6.1342, 1.2188];
          const markerInstance = L.marker(startLatLng, {
            draggable: true
          }).addTo(mapInstance);

          // Update state when marker is dragged or map is clicked
          markerInstance.on('dragend', () => {
            const pos = markerInstance.getLatLng();
            setGpsCoords({ lat: pos.lat, lng: pos.lng });
          });

          mapInstance.on('click', (e: any) => {
            markerInstance.setLatLng(e.latlng);
            setGpsCoords({ lat: e.latlng.lat, lng: e.latlng.lng });
          });

          mapRef.current = mapInstance;
          markerRef.current = markerInstance;

          // Force size check
          setTimeout(() => {
            if (mapRef.current) {
              mapRef.current.invalidateSize();
            }
          }, 350);

        } catch (mapErr) {
          console.error("Leaflet initialization error:", mapErr);
        }
      }, 200);
    };

    initLeafletMap();

    return () => {
      isMounted = false;
      if (mapRef.current) {
        try {
          mapRef.current.remove();
        } catch (e) {}
        mapRef.current = null;
        markerRef.current = null;
      }
    };
  }, [currentStep, cartWithProducts.length]);

  // Option "Envoyer ma localisation"
  const handleGetCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("La géolocalisation n'est pas supportée par votre navigateur.");
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const liveCoords = { lat: latitude, lng: longitude };
        setGpsCoords(liveCoords);
        setIsLocating(false);

        if (mapRef.current && markerRef.current) {
          mapRef.current.setView([latitude, longitude], 15);
          markerRef.current.setLatLng([latitude, longitude]);
        }
      },
      (error) => {
        console.error("Live geolocation error:", error);
        setIsLocating(false);
        alert("Impossible de localiser votre appareil en temps réel. Veuillez déplacer l'icône manuellement sur la carte de Lomé.");
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  };

  // Submit delivery form and advance to payment selection
  const handleDeliverySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      setErrorMsg("Veuillez saisir votre nom complet.");
      return;
    }
    if (!phone.trim()) {
      setErrorMsg("Veuillez fournir un numéro de téléphone ou WhatsApp.");
      return;
    }
    setErrorMsg('');
    setPaymentPhone(phone);
    setCurrentStep('payment_select');
  };

  // Trigger payment simulation
  const handleProceedPayment = () => {
    if ((selectedPayment === 'flooz' || selectedPayment === 'mixx') && !paymentPhone.trim()) {
      alert("Veuillez saisir votre numéro Moov.");
      return;
    }

    if (selectedPayment === 'cash') {
      // Direct pass for cash on delivery
      const cashRef = `CR-CASH-${Math.floor(1000 + Math.random() * 9000)}`;
      setPaymentTxRef(cashRef);
      setCurrentStep('confirmed');
      return;
    }

    // Moov Flooz or Moov Money Mixx simulation loop
    setCurrentStep('payment_processing');
    setProcessingProgress(0);

    const intId = setInterval(() => {
      setProcessingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(intId);
          setTimeout(() => {
            const prefix = selectedPayment === 'flooz' ? 'FLZ' : 'YAS';
            const randomID = `${prefix}-${Math.floor(100000 + Math.random() * 900000)}-TG`;
            setPaymentTxRef(randomID);
            setCurrentStep('confirmed');
          }, 400);
          return 100;
        }
        return prev + 10;
      });
    }, 250);
  };

  // Final WhatsApp submission with orders + payments + map coordinates compiled
  const handleFinalizeAndRedirect = () => {
    const orderId = `CR-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const finalNeighborhood = neighborhood === "Autre quartier de Lomé" && customNeighborhood 
      ? customNeighborhood 
      : neighborhood;

    const profileLabel = CUSTOMER_PROFILES.find(p => p.value === customerProfile)?.label || customerProfile;

    let itemsMessage = '';
    cartWithProducts.forEach((item, index) => {
      const itemSubtotal = item.product.price * item.quantity;
      itemsMessage += `${index + 1}. *${item.product.name}* (${item.product.capacity || 'U'})\n`;
      itemsMessage += `   • Qté : *${item.quantity}*\n`;
      itemsMessage += `   • Prix unit. : *${item.product.price.toLocaleString('fr-FR')} FCFA*\n`;
      itemsMessage += `   • Sous-total : *${itemSubtotal.toLocaleString('fr-FR')} FCFA*\n\n`;
    });

    const paymentLabel = 
      selectedPayment === 'flooz' ? `🟢 Floov Moov Money (Simulé Payé, Réf: ${paymentTxRef})` :
      selectedPayment === 'mixx' ? `🟣 Mixx by Yas Moov (Simulé Payé, Réf: ${paymentTxRef})` :
      `🟡 Espèces à la livraison / Retrait`;

    const mapLocationUrl = gpsCoords 
      ? `https://www.google.com/maps/search/?api=1&query=${gpsCoords.lat},${gpsCoords.lng}`
      : 'Non spécifié';

    const formatMessage = 
`*COMMANDE VALIDÉE - COCO-RAFIA TOGO* [ID: #${orderId}]

Bonjour l'équipe Coco-Rafia ! Je viens de finaliser ma commande sur le site :

*COORDONNÉES CLIENT :*
• Nom complet : *${fullName.trim()}*
• Téléphone / WhatsApp : *${phone.trim()}*
• Secteur d'activité : *${profileLabel}*

*LIEU DE LIVRAISON :*
• Quartier : *${finalNeighborhood}*
• Position GPS sur la Carte : *${gpsCoords ? `${gpsCoords.lat.toFixed(5)}, ${gpsCoords.lng.toFixed(5)}` : 'Non fournie'}*
• Lien Google Maps direct : ${mapLocationUrl}

*PANIER D'ACHATS :*
${itemsMessage}*MODE DE PAIEMENT :*
• Moyen sélectionné : *${paymentLabel}*
• Numéro de transaction Moov : *${selectedPayment !== 'cash' ? paymentPhone : 'N/A'}*

*MONTANT TOTAL PAYÉ : ${totalCartPrice.toLocaleString('fr-FR')} FCFA*

*NOTE SUPPLÉMENTAIRE :*
${specialNote.trim() ? `"${specialNote.trim()}"` : 'Aucune note spécifique.'}

*RÉSUMÉ IMPACT ÉCOLOGIQUE :*
• Réduction de polystyrène plastique : *~${plasticSavedKg.toFixed(1)} kg évités*
• Coques de noix de coco locales valorisées à Lomé !`;

    const encodedMessage = encodeURIComponent(formatMessage);
    const whatsappUrl = `https://wa.me/22890000000?text=${encodedMessage}`;

    // Open link
    window.open(whatsappUrl, '_blank');
  };

  const handleResetOrder = () => {
    onClearCart();
    setCurrentStep('basket');
    setFullName('');
    setPhone('');
    setSpecialNote('');
    setCustomNeighborhood('');
    setGpsCoords({ lat: 6.1342, lng: 1.2188 });
  };

  return (
    <div id="cart-container" className="flex flex-col h-full bg-white text-gray-900 rounded-2xl shadow-xl border border-coco-shell overflow-hidden">
      
      {/* Dynamic Header */}
      <div className="bg-gradient-to-r from-coco-green to-coco-green-hover p-4 sm:p-5 text-white flex items-center justify-between">
        <div className="flex items-center gap-2">
          {currentStep !== 'basket' && currentStep !== 'confirmed' && (
            <button 
              onClick={() => {
                if (currentStep === 'delivery_form') setCurrentStep('basket');
                else if (currentStep === 'payment_select') setCurrentStep('delivery_form');
              }}
              className="mr-1 text-white hover:text-coco-mint transition-colors w-7 h-7 bg-white/10 rounded-full flex items-center justify-center"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
          )}
          <ShoppingBag className="w-5.5 h-5.5 animate-pulse text-coco-mint" />
          <h2 className="font-serif font-light text-lg sm:text-xl tracking-tight">
            Plateforme <span className="font-normal italic text-coco-shell">Coco-Rafia</span>
          </h2>
        </div>
        {onClose && (
          <button 
            type="button"
            onClick={onClose}
            className="text-white/85 hover:text-white transition-colors bg-white/10 rounded-full p-1.5 w-7 sm:w-8 h-7 sm:h-8 flex items-center justify-center font-bold text-xs"
          >
            ✕
          </button>
        )}
      </div>

      {/* STEP 1: BASKET ITEMS LIST */}
      {currentStep === 'basket' && (
        cartWithProducts.length === 0 ? (
          <div className="flex-1 overflow-y-auto p-12 flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-16 sm:w-20 h-16 sm:h-20 bg-coco-sand rounded-full flex items-center justify-center text-gray-400">
              <ShoppingBag className="w-8 sm:w-10 h-8 sm:h-10" />
            </div>
            <h3 className="font-serif font-medium text-lg text-gray-700">Votre panier est vide</h3>
            <p className="text-xs sm:text-sm text-gray-500 max-w-xs">
              Explorez notre catalogue de glacières isothermes écologiques et fertilisants biochar pour Lomé et ajoutez des articles.
            </p>
          </div>
        ) : (
          <div className="flex-1 flex flex-col min-h-0">
            {/* Articles scroll view */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 max-h-[42vh] border-b border-coco-shell/30">
              <div className="flex items-center justify-between text-xs text-gray-500 font-mono pb-2 border-b border-coco-shell/15">
                <span>ARTICLES DANS LE PANIER ({cartWithProducts.length})</span>
                <button 
                  type="button"
                  onClick={onClearCart}
                  className="text-red-600 hover:text-red-700 flex items-center gap-1 transition-colors text-xs font-semibold"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Vider le panier
                </button>
              </div>

              {cartWithProducts.map(item => (
                <div 
                  key={item.productId}
                  className="flex gap-3 bg-coco-sand/50 p-2.5 rounded-xl border border-coco-shell/30 hover:border-coco-brown/30 transition-all text-xs"
                >
                  {/* Real product image */}
                  <div className="w-12 sm:w-14 h-12 sm:h-14 bg-white rounded-lg border border-coco-shell flex-shrink-0 overflow-hidden flex items-center justify-center">
                    <img 
                      src={item.product.image} 
                      alt={item.product.name} 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Info text */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-900 truncate">{item.product.name}</h4>
                    <p className="text-[10px] text-gray-400 font-mono mb-1">{item.product.capacity || 'U'}</p>
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-coco-brown text-sm">
                        {(item.product.price * item.quantity).toLocaleString('fr-FR')} FCFA
                      </span>

                      {/* Selectors */}
                      <div className="flex items-center bg-white rounded-lg border border-coco-shell px-1">
                        <button 
                          type="button"
                          onClick={() => onUpdateQuantity(item.productId, item.quantity - 1)}
                          className="p-1 hover:text-coco-green"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-1.5 font-mono text-xs font-bold w-5 text-center">{item.quantity}</span>
                        <button 
                          type="button"
                          onClick={() => onUpdateQuantity(item.productId, item.quantity + 1)}
                          className="p-1 hover:text-coco-green"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Removal */}
                  <button 
                    type="button"
                    onClick={() => onRemoveItem(item.productId)}
                    className="text-gray-400 hover:text-red-600 self-center"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Total panel bottom */}
            <div className="p-4 bg-coco-sand/40 border-t border-coco-shell/20 space-y-4">
              <div className="bg-coco-ice p-3 rounded-xl border border-coco-ice-dark/10 flex gap-2">
                <Sparkles className="w-4.5 h-4.5 text-coco-green flex-shrink-0 animate-pulse mt-0.5" />
                <div className="text-[11px] text-[#006064] leading-relaxed font-sans">
                  <strong>Engagement Éco-Garantie :</strong> Votre achat à Lomé valorise les artisans togolais et neutralise <strong>~{plasticSavedKg.toFixed(1)} kg</strong> de résidus synthétiques.
                </div>
              </div>

              <div className="flex justify-between items-center bg-white p-3.5 rounded-xl border border-coco-shell/30 shadow-sm">
                <span className="font-semibold text-gray-600 text-xs">Montant total à régler :</span>
                <span className="font-mono text-lg font-black text-coco-green">
                  {totalCartPrice.toLocaleString('fr-FR')} FCFA
                </span>
              </div>

              <button
                type="button"
                onClick={() => setCurrentStep('delivery_form')}
                className="w-full py-3.5 px-4 bg-coco-green hover:bg-coco-green-hover text-white font-bold rounded-xl flex items-center justify-center gap-1.5 shadow-md hover:shadow-lg transition-all active:scale-[0.98] text-xs font-mono uppercase tracking-wider"
              >
                Suivant : Détails Livraison
              </button>
            </div>
          </div>
        )
      )}

      {/* STEP 2: DELIVERY FORM & GEOLOCATION OF TOGO/LOMÉ */}
      {currentStep === 'delivery_form' && (
        <div className="flex-1 overflow-y-auto p-4 bg-coco-sand/20 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-1.5 border-b border-coco-shell/30 pb-2">
              <User className="w-5 h-5 text-coco-green" />
              <h3 className="font-serif font-medium italic text-sm text-coco-green">Où souhaitez-vous être livré à Lomé ?</h3>
            </div>

            <form onSubmit={handleDeliverySubmit} className="space-y-3 text-xs">
              {errorMsg && (
                <div className="p-2.5 bg-red-50 rounded-lg text-red-700 flex items-start gap-1">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Name & phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Votre Nom complet *</label>
                  <input 
                    type="text" 
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Ex: Yaovo Mensah"
                    className="w-full bg-white border border-coco-shell rounded-lg p-2.5 focus:outline-none focus:ring-1.5 focus:ring-coco-green text-xs"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Téléphone / WhatsApp *</label>
                  <input 
                    type="tel" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Ex: +228 90 12 34 56"
                    className="w-full bg-white border border-coco-shell rounded-lg p-2.5 focus:outline-none focus:ring-1.5 focus:ring-coco-green text-xs"
                    required
                  />
                </div>
              </div>

              {/* Sector & neighborhood */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Secteur d'activité</label>
                  <select 
                    value={customerProfile}
                    onChange={(e) => setCustomerProfile(e.target.value)}
                    className="w-full bg-white border border-coco-shell rounded-lg p-2.5 focus:outline-none focus:ring-1.5 focus:ring-coco-green text-xs"
                  >
                    {CUSTOMER_PROFILES.map(p => (
                      <option key={p.value} value={p.value}>{p.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Quartier de livraison *</label>
                  <select 
                    value={neighborhood}
                    onChange={(e) => setNeighborhood(e.target.value)}
                    className="w-full bg-white border border-coco-shell rounded-lg p-2.5 focus:outline-none focus:ring-1.5 focus:ring-coco-green text-xs"
                  >
                    {LOME_NEIGHBORHOODS.map(n => (
                      <option key={n} value={n}>{n}</option>
                    ))}
                  </select>
                </div>
              </div>

              {neighborhood === "Autre quartier de Lomé" && (
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Précisez le quartier alternatif à Lomé *</label>
                  <input 
                    type="text"
                    value={customNeighborhood}
                    onChange={(e) => setCustomNeighborhood(e.target.value)}
                    placeholder="Ex: Hanoukopé extension"
                    className="w-full bg-white border border-coco-green rounded-lg p-2.5 focus:outline-none text-xs"
                    required
                  />
                </div>
              )}

              {/* DYNAMIC LEAFLET MAP OF TOGO / LOMÉ */}
              <div className="space-y-1 pt-1.5">
                <div className="flex items-center justify-between text-gray-700 font-semibold mb-0.5">
                  <span className="text-xs">Position géographique précise du point de livraison :</span>
                  {gpsCoords && (
                    <span className="font-mono text-[9px] text-coco-green-hover bg-coco-mint/25 px-1.5 py-0.5 rounded">
                      GPS: {gpsCoords.lat.toFixed(5)}, {gpsCoords.lng.toFixed(5)}
                    </span>
                  )}
                </div>

                {/* Live GPS button "Envoyer ma localisation" */}
                <button
                  type="button"
                  onClick={handleGetCurrentLocation}
                  disabled={isLocating}
                  className="w-full py-2 px-3 bg-coco-green-light hover:bg-coco-green text-coco-green hover:text-white border border-coco-green/15 rounded-lg flex items-center justify-center gap-1.5 text-xs font-bold transition-all duration-200 cursor-pointer text-center"
                >
                  <MapPin className="w-3.5 h-3.5 text-coco-green text-currentColor" />
                  {isLocating ? (
                    <span className="flex items-center gap-1"><Loader2 className="w-3.5 h-3.5 animate-spin" /> Acquisition du signal GPS togolais...</span>
                  ) : "Envoyer ma localisation GPS en direct"}
                </button>

                {/* Leaflet container */}
                <div 
                  id="togo-delivery-map" 
                  className="w-full h-40 rounded-xl border border-coco-shell/70 bg-coco-dust overflow-hidden relative shadow-inner"
                  style={{ minHeight: '160px', zIndex: 10 }}
                />
                <p className="text-[10px] text-gray-400 italic text-center">
                  Cliquez ou déplacez le repère sur la carte de Lomé pour localiser votre adresse de livraison.
                </p>
              </div>

              {/* Optional instruction */}
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Note de livraison spécifique (facultatif)</label>
                <textarea 
                  value={specialNote}
                  onChange={(e) => setSpecialNote(e.target.value)}
                  placeholder="Ex: Devant le grand baobab bleu..."
                  rows={2}
                  className="w-full bg-white border border-coco-shell rounded-lg p-2 focus:outline-none focus:ring-1.5 focus:ring-coco-green text-xs resize-none"
                />
              </div>

              {/* Forward action */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 bg-coco-green hover:bg-coco-green-hover text-white font-bold rounded-xl shadow-lg flex items-center justify-center gap-1.5 text-xs font-mono uppercase tracking-wider"
                >
                  Suivant : Choisir Mode de Paiement
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* STEP 3: PAYMENT SELECTION WITH FLOOZ & MIXX BY YAS IMAGES */}
      {currentStep === 'payment_select' && (
        <div className="flex-1 overflow-y-auto p-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b border-coco-shell/30 pb-2">
              <Coins className="w-5 h-5 text-coco-green" />
              <h3 className="font-serif font-medium italic text-sm text-coco-green">
                Choisissez votre moyen de paiement :
              </h3>
            </div>

            {/* Total recap in bubble */}
            <div className="bg-coco-sand/50 p-3 rounded-xl border border-coco-shell/30 flex items-center justify-between text-xs">
              <span className="text-gray-500">Destinataire : <b className="text-gray-900">{fullName}</b> ({neighborhood})</span>
              <span className="text-coco-brown font-mono font-extrabold text-sm">{totalCartPrice.toLocaleString('fr-FR')} FCFA</span>
            </div>

            <div className="space-y-3">
              
              {/* Moov Flooz Option */}
              <div 
                onClick={() => setSelectedPayment('flooz')}
                className={`p-3.5 rounded-xl border flex items-center gap-4 cursor-pointer transition-all ${
                  selectedPayment === 'flooz' 
                    ? 'border-amber-600 bg-amber-500/10 shadow-md ring-1 ring-amber-500/30' 
                    : 'border-coco-shell/40 bg-white hover:bg-coco-sand/30'
                }`}
              >
                {/* Real user-provided image badge */}
                <div className="w-11 sm:w-12 h-11 sm:h-12 rounded-lg overflow-hidden flex-shrink-0 border border-warm-gray-200 bg-white">
                  <img 
                    src="https://tse4.mm.bing.net/th/id/OIP.Xje-H4DHB4pYtFF-0sRlEQHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3" 
                    alt="Logo Flooz Moov Money" 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain p-0.5"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-xs sm:text-sm text-[#E65100] flex items-center gap-1.5 uppercase">
                    Moov Flooz 
                    {selectedPayment === 'flooz' && <span className="text-[10px] bg-amber-500 text-white px-1.5 py-0.2 rounded-full font-serif lowercase italic">actif</span>}
                  </h4>
                  <p className="text-[11px] text-gray-500 leading-normal">
                    Paiement direct sécurisé Moov Money Flooz en ligne.
                  </p>
                </div>
              </div>

              {/* Mixx by Yas Moov Option */}
              <div 
                onClick={() => setSelectedPayment('mixx')}
                className={`p-3.5 rounded-xl border flex items-center gap-4 cursor-pointer transition-all ${
                  selectedPayment === 'mixx' 
                    ? 'border-pink-600 bg-pink-500/10 shadow-md ring-1 ring-pink-500/30' 
                    : 'border-coco-shell/40 bg-white hover:bg-coco-sand/30'
                }`}
              >
                {/* Real user-provided image badge */}
                <div className="w-11 sm:w-12 h-11 sm:h-12 rounded-lg overflow-hidden flex-shrink-0 border border-warm-gray-200 bg-white font-sans text-xs">
                  <img 
                    src="https://www.zoomtanzania.net/wp-content/uploads/2025/02/Mixx_by_Yas-860x645-1.jpg" 
                    alt="Logo Mixx by Yas" 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-xs sm:text-sm text-pink-700 flex items-center gap-1.5 uppercase">
                    Mixx by Yas 
                    {selectedPayment === 'mixx' && <span className="text-[10px] bg-pink-500 text-white px-1.5 py-0.2 rounded-full font-serif lowercase italic">actif</span>}
                  </h4>
                  <p className="text-[11px] text-gray-500 leading-normal">
                    Forfait digital Moov Mixx by Yas - transaction rapide.
                  </p>
                </div>
              </div>

              {/* Cash On Delivery Option */}
              <div 
                onClick={() => setSelectedPayment('cash')}
                className={`p-3.5 rounded-xl border flex items-center gap-4 cursor-pointer transition-all ${
                  selectedPayment === 'cash' 
                    ? 'border-coco-green bg-coco-green/10 shadow-md ring-1 ring-coco-green/30' 
                    : 'border-coco-shell/40 bg-white hover:bg-coco-sand/30'
                }`}
              >
                <div className="w-11 sm:w-12 h-11 sm:h-12 rounded-lg bg-coco-green-light flex items-center justify-center text-coco-green text-xl font-bold flex-shrink-0 border border-coco-green/10">
                  💵
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-xs sm:text-sm text-coco-green flex items-center gap-1.5 uppercase">
                    Espèces à la livraison
                    {selectedPayment === 'cash' && <span className="text-[10px] bg-coco-green text-white px-1.5 py-0.2 rounded-full font-serif lowercase italic">actif</span>}
                  </h4>
                  <p className="text-[11px] text-gray-500 leading-normal">
                    Paiement direct en espèces ou T-Money lors du retrait à Lomé.
                  </p>
                </div>
              </div>

            </div>

            {/* Mobile number required if Flooz or Mixx are selected */}
            {(selectedPayment === 'flooz' || selectedPayment === 'mixx') && (
              <div className="p-3 bg-coco-sand rounded-xl border border-coco-shell/65 space-y-2">
                <label className="block text-xs text-gray-700 font-bold">
                  Saisissez votre numéro de téléphone Moov Money :
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                  <input 
                    type="tel"
                    value={paymentPhone}
                    onChange={(e) => setPaymentPhone(e.target.value)}
                    placeholder="Ex: 90 23 45 67"
                    className="w-full bg-white border border-coco-shell rounded-lg py-2 pl-9 pr-3 text-xs focus:outline-none focus:ring-1 focus:ring-coco-green font-mono"
                  />
                </div>
                <p className="text-[10px] text-gray-400">
                  Un push USSD sécurisé sera transmis par Moov sur Lomé (Togo).
                </p>
              </div>
            )}

          </div>

          <div className="pt-4 border-t border-coco-shell/20 space-y-2 bg-white">
            <button
              type="button"
              onClick={handleProceedPayment}
              className="w-full py-4 px-4 bg-coco-green hover:bg-coco-green-hover text-white font-bold rounded-xl flex items-center justify-center gap-1.5 shadow-md active:scale-[0.98] transition-all text-xs font-mono uppercase tracking-widest"
            >
              Lancer la validation du paiement
            </button>
            <p className="text-[10px] text-gray-400 text-center uppercase tracking-wide">
              Intégration cryptée Moov Togo USSD Gateway
            </p>
          </div>
        </div>
      )}

      {/* STEP 4: PROCESSING PUSH PAYMENT SIMULATOR */}
      {currentStep === 'payment_processing' && (
        <div className="flex-1 p-6 flex flex-col items-center justify-center text-center bg-coco-sand/20 space-y-4">
          <div className="relative w-20 h-20">
            <Loader2 className="w-20 h-20 text-coco-green animate-spin opacity-50 absolute inset-0" />
            <div className="absolute inset-0 flex items-center justify-center text-coco-green">
              <ShieldCheck className="w-8 h-8" />
            </div>
          </div>
          <h3 className="font-serif font-light text-xl text-coco-green italic animate-pulse">
            Validation Moov Money en cours...
          </h3>
          <p className="text-xs text-gray-500 max-w-xs leading-relaxed">
            Authentification sur la passerelle sécurisée de Lomé. Veuillez valider le code d'autorisation USSD (*155#) reçu sur votre téléphone portable Moov.
          </p>

          <div className="w-full max-w-xs space-y-1.5 pt-4">
            <div className="flex justify-between text-[10px] font-mono text-gray-400 uppercase tracking-widest">
              <span>Statut Canal</span>
              <span>{processingProgress}%</span>
            </div>
            <div className="w-full bg-coco-shell/30 rounded-full h-2 overflow-hidden border border-coco-shell/20">
              <div 
                className="bg-gradient-to-r from-coco-green to-coco-mint h-full transition-all duration-300"
                style={{ width: `${processingProgress}%` }}
              />
            </div>
          </div>
          <span className="text-[10px] font-mono text-coco-brown-dark uppercase">
            Moov-Gateway-Lomé Session active
          </span>
        </div>
      )}

      {/* STEP 5: ORDER & PAYMENT CONFIRMED SCREEN */}
      {currentStep === 'confirmed' && (
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 flex flex-col items-center justify-center text-center space-y-4">
          <div className="w-14 sm:w-16 h-14 sm:h-16 bg-coco-green-light rounded-full flex items-center justify-center text-coco-green shadow-sm">
            <Check className="w-8 sm:w-10 h-8 sm:h-10" />
          </div>

          <h3 className="font-serif font-light text-2xl text-coco-green italic">Paiement validé !</h3>
          <p className="text-xs sm:text-sm text-gray-600 max-w-sm">
            Votre transaction a été validée avec succès sur le réseau Moov Money par Coco-Rafia.
          </p>

          {/* Transaction references card info */}
          <div className="bg-coco-sand p-4 rounded-xl border border-coco-shell/45 text-left text-xs text-gray-700 w-full max-w-sm space-y-2 font-mono">
            <div className="flex justify-between border-b border-coco-shell/30 pb-1.5">
              <span className="text-gray-400">ID de Transaction :</span>
              <span className="font-bold text-coco-green">{paymentTxRef}</span>
            </div>
            <div className="flex justify-between border-b border-coco-shell/30 pb-1.5">
              <span className="text-gray-400">Client :</span>
              <span className="font-bold">{fullName}</span>
            </div>
            <div className="flex justify-between border-b border-coco-shell/30 pb-1.5">
              <span className="text-gray-400">Type de paiement :</span>
              <span className="font-bold uppercase text-coco-brown">{selectedPayment}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Total :</span>
              <span className="font-bold">{totalCartPrice.toLocaleString('fr-FR')} FCFA</span>
            </div>
          </div>

          <div className="bg-green-50 p-3 rounded-xl border border-green-200 text-left text-[11px] text-green-800 flex gap-2 w-full max-w-sm">
            <ShieldCheck className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <strong>Commande enregistrée avec succès :</strong> Votre transaction a été validée ! Téléchargez dès maintenant votre facture PDF officielle ci-dessous pour conserver un reçu de votre commande éco-responsable Coco-Rafia.
            </div>
          </div>

          <div className="w-full max-w-sm space-y-2 pt-2">
            <button
              type="button"
              onClick={handleDownloadPDF}
              className="w-full py-4 px-4 bg-coco-green hover:bg-coco-green-hover text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all active:scale-[0.98] duration-200 text-xs sm:text-sm font-sans cursor-pointer uppercase tracking-wider"
            >
              <Download className="w-4 h-4 animate-bounce" />
              Télécharger Facture PDF Officielle 📄
            </button>
            <button
              type="button"
              onClick={handleResetOrder}
              className="text-xs text-gray-500 hover:text-coco-brown block mx-auto py-2.5 border-b border-transparent hover:border-coco-brown"
            >
              Retour à l'accueil du panier
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
