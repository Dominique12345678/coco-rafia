import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, HelpCircle, Recycle, Store, Phone, Menu, X, Check,
  Info, Leaf, Truck, ShieldCheck, ThermometerSnowflake, SlidersHorizontal,
  ArrowRight, ExternalLink, HelpCircle as HelpIcon, Flame, Globe2, Eye, Trash2,
  Quote
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Mission from './components/Mission';
import EspaceCollecte from './components/EspaceCollecte';
import { PRODUCTS, Product } from './data/products';
import Cart from './components/Cart';
import cocorafiaLogo from './assets/images/WhatsApp Image 2026-05-22 at 9.03.12 AM.jpeg';

interface CartItem {
  productId: string;
  quantity: number;
}

export default function App() {
  const [activeTab, setActiveTab] = useState('impact');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'glaciere' | 'logistique' | 'agri' | 'autres'>('all');
  const [selectedProductDetails, setSelectedProductDetails] = useState<Product | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Synchronize with LocalStorage on startup and updates
  useEffect(() => {
    const savedCart = localStorage.getItem('coco_rafia_cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to load local cart:", e);
      }
    }
  }, []);

  const saveCart = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem('coco_rafia_cart', JSON.stringify(newCart));
  };

  const handleAddToCart = (productId: string) => {
    const existing = cart.find(item => item.productId === productId);
    let updated: CartItem[];
    if (existing) {
      updated = cart.map(item => 
        item.productId === productId 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      updated = [...cart, { productId, quantity: 1 }];
    }
    saveCart(updated);
    
    // Toast notification
    const prod = PRODUCTS.find(p => p.id === productId);
    if (prod) {
      setToastMessage(`"${prod.name}" a été ajouté à votre panier !`);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    const updated = cart.map(item => 
      item.productId === productId ? { ...item, quantity } : item
    );
    saveCart(updated);
  };

  const handleRemoveItem = (productId: string) => {
    const updated = cart.filter(item => item.productId !== productId);
    saveCart(updated);
  };

  const handleClearCart = () => {
    saveCart([]);
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Filter products
  const filteredProducts = selectedCategory === 'all' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen flex flex-col font-sans antialiased text-gray-900 bg-coco-sand">
      
      {/* Navbar Integration */}
      <Navbar 
        cartCount={totalCartCount} 
        onOpenCart={() => setCartOpen(true)} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
      />

      {/* Floating Success Notification Toast */}
      {showToast && (
        <div className="fixed bottom-6 right-6 z-50 max-w-sm bg-coco-green text-white p-4 rounded-2xl shadow-2xl flex items-center gap-3 border border-white/10 animate-slide-up">
          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
            <Check className="w-5 h-5 text-white" />
          </div>
          <div className="text-xs font-medium">
            {toastMessage}
          </div>
          <button 
            type="button"
            onClick={() => setShowToast(false)}
            className="text-white/70 hover:text-white ml-auto"
          >
            ✕
          </button>
        </div>
      )}

      {/* Hero Header Presentation */}
      <Hero 
        onExploreProducts={() => {
          setActiveTab('boutique');
          document.getElementById('boutique')?.scrollIntoView({ behavior: 'smooth' });
        }}
        onReportWaste={() => {
          setActiveTab('collecte');
          document.getElementById('collecte')?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      <main className="flex-grow">
        
        {/* Tab 1: Notre Mission & Circular Impact Block */}
        <Mission />

        {/* Tab 2: Boutique (Interactive Local Catalog) */}
        <section id="boutique" className="py-20 bg-white scroll-mt-20 border-b border-coco-shell/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Header section with categories slider */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-coco-shell/30 pb-6 text-left">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1 bg-coco-brown-dark/10 text-coco-brown-dark px-2.5 py-1 rounded-full text-xs font-mono font-bold uppercase">
                  <Store className="w-3.5 h-3.5" />
                  <span>Catalogue Local Lomé</span>
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl font-light italic text-coco-green tracking-tight">
                  Nos solutions <span className="text-coco-brown font-normal">isothermes durables</span>
                </h2>
                <p className="text-xs sm:text-sm text-gray-500 max-w-xl">
                  Glacières légères, emballages de transport de vaccins et amendements biochar. Économiques, robustes, façonnés au Togo.
                </p>
              </div>

              {/* Categories Navigation with filter buttons */}
              <div className="flex flex-wrap gap-2.5 items-center bg-coco-sand p-1.5 rounded-2xl border border-coco-shell/50 md:self-end">
                <button
                  type="button"
                  onClick={() => setSelectedCategory('all')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
                    selectedCategory === 'all'
                      ? 'bg-coco-green text-white shadow-sm'
                      : 'text-gray-600 hover:text-coco-green hover:bg-white'
                  }`}
                >
                  Tous nos produits
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedCategory('glaciere')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
                    selectedCategory === 'glaciere'
                      ? 'bg-coco-green text-white shadow-sm'
                      : 'text-gray-600 hover:text-coco-green hover:bg-white'
                  }`}
                >
                  Glacières
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedCategory('logistique')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
                    selectedCategory === 'logistique'
                      ? 'bg-coco-green text-white shadow-sm'
                      : 'text-gray-600 hover:text-coco-green hover:bg-white'
                  }`}
                >
                  Logistique Isotherme
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedCategory('agri')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
                    selectedCategory === 'agri'
                      ? 'bg-coco-green text-white shadow-sm'
                      : 'text-gray-600 hover:text-coco-green hover:bg-white'
                  }`}
                >
                  Agro-Biochar
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedCategory('autres')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
                    selectedCategory === 'autres'
                      ? 'bg-coco-green text-white shadow-sm'
                      : 'text-gray-600 hover:text-coco-green hover:bg-white'
                  }`}
                >
                  Autres produits
                </button>
              </div>
            </div>

            {/* Product Grid */}
            <motion.div 
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((product) => (
                  <motion.article 
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    whileHover={{ 
                      y: -10, 
                      boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
                      borderColor: "var(--color-coco-brown)"
                    }}
                    key={product.id}
                    className="bg-coco-sand/35 rounded-2xl border border-coco-shell/60 overflow-hidden flex flex-col justify-between transition-colors text-left"
                  >
                    {/* Category Indicator Tag */}
                    <div className="p-4 flex-grow space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] uppercase font-mono tracking-wider font-extrabold px-2.5 py-1 bg-white rounded-lg border border-coco-shell/30 text-coco-brown">
                          {product.category === 'glaciere' 
                            ? 'Isotherme standard' 
                            : product.category === 'logistique' 
                            ? 'Professionnel' 
                            : product.category === 'agri' 
                            ? 'Ressource Agricole' 
                            : 'Art & Déco'}
                        </span>
                        <span className="text-xs font-mono text-gray-500 font-bold">
                          {product.capacity}
                        </span>
                      </div>

                      {/* Image Graphic - REAL PHOTOREALISTIC IMAGES */}
                      <div className="bg-white aspect-video rounded-xl border border-coco-shell/30 flex items-center justify-center p-0 relative overflow-hidden group">
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        
                        {/* Technical Performance Badge Overlay */}
                        <div className="absolute bottom-2 left-2 right-2 bg-black/75 backdrop-blur-sm p-1.5 rounded-lg text-[10px] text-white flex items-center gap-1.5">
                          <ThermometerSnowflake className="w-3.5 h-3.5 text-coco-ice flex-shrink-0" />
                          <span className="truncate">{product.thermalPerformance}</span>
                        </div>
                      </div>

                      {/* Titles */}
                      <div className="space-y-1 pt-1">
                        <h3 className="font-display font-medium text-lg text-gray-900 leading-tight">
                          {product.name}
                        </h3>
                        <p className="text-xs text-coco-brown italic font-medium leading-tight">
                          {product.tagline}
                        </p>
                      </div>

                      <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed pt-1">
                        {product.description}
                      </p>
                    </div>

                    {/* Pricing action bottom wrap */}
                    <div className="p-4 bg-white border-t border-coco-shell/45 flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-[9px] font-mono text-gray-400 font-bold uppercase">Tarif Lomé</span>
                        <span className="font-mono text-base font-black text-coco-green">
                          {product.price.toLocaleString('fr-FR')} FCFA
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => setSelectedProductDetails(product)}
                          className="p-2 text-gray-500 hover:text-coco-brown bg-coco-sand px-2.5 py-2.5 rounded-xl border border-coco-shell/30 transition-colors cursor-pointer"
                          title="Fiche technique complète"
                        >
                          <Eye className="w-4 h-4" />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleAddToCart(product.id)}
                          className="px-4 py-2 bg-coco-green hover:bg-coco-green-hover text-white text-xs font-bold rounded-xl shadow-sm transition-all duration-150 active:scale-[0.97] cursor-pointer"
                        >
                          Commander
                        </button>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </AnimatePresence>
            </motion.div>

          </div>
        </section>

        {/* Tab 3: Espace Collecte (Forms and Instructions) */}
        <EspaceCollecte />

        {/* Client Success Testimonials from Togo artisans */}
        <section className="py-20 bg-coco-sand/30 border-t border-coco-shell/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-coco-green-light rounded-full text-coco-green font-mono text-xs font-bold uppercase mb-4">
              <Globe2 className="w-4 h-4" />
              <span>Témoignages du Terrain</span>
            </div>
            
            <h2 className="font-serif text-2xl sm:text-3xl font-light italic text-coco-green mb-12">
              Adopté par la <span className="text-coco-brown font-normal">communauté côtière de Lomé</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
              <div className="bg-white p-6 rounded-2xl border border-coco-shell/40 shadow-sm space-y-4">
                <Quote className="w-8 h-8 text-coco-green/30" />
                <p className="text-xs sm:text-sm text-gray-600 italic leading-relaxed">
                  "J'utilise la glacière Coco-Rafia Standard pour transporter mes poissons d'Assigamé jusqu'au port de Lomé. Mon poisson reste aussi froid que dans du polystyrène coûteux, mais elle est bien plus solide ! Elle a survécu à plusieurs petits chocs sur la moto sans se craqueler."
                </p>
                <div>
                  <h4 className="font-bold text-xs font-display text-gray-900">Maman Adjovi</h4>
                  <p className="text-[10px] text-gray-400">Vendeuse de Poissons en Gros, Assigamé</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-coco-shell/40 shadow-sm space-y-4">
                <Quote className="w-8 h-8 text-coco-green/30" />
                <p className="text-xs sm:text-sm text-gray-600 italic leading-relaxed">
                  "Dans nos jardins maraîchers côtiers sableux du côté d'Aného, l'eau s'écoule trop vite. Les sacs de Biochar Coco-Terre enrichi de manioc ont triplé notre capacité de rétention d'eau. Nos tomates ne sèchent plus avant la récolte."
                </p>
                <div>
                  <h4 className="font-bold text-xs font-display text-gray-900">M. Kokou Lawson</h4>
                  <p className="text-[10px] text-gray-400">Coopérative Maraîchère de Baguida-Plage</p>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* FOOTER SECTION */}
      <footer className="bg-coco-brown-dark text-white pt-16 pb-8 border-t border-[#4E342E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-white/10 text-left">
            
            {/* Brand column */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-lg overflow-hidden flex items-center justify-center border border-white/10 p-0.5 shadow-sm">
                  <img src={cocorafiaLogo} alt="Logo Coco-Rafia" className="w-full h-full object-contain" />
                </div>
                <h3 className="font-serif font-light text-xl tracking-tight text-white">
                  Coco<span className="text-coco-mint font-normal italic">Rafia</span>
                </h3>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed max-w-xs">
                La manufacture écologique de Lomé fabriquant des alternatives isolantes biodégradables de classe mondiale à partir de déchets de noix de coco locaux.
              </p>
              <div className="text-xs text-coco-ice font-mono">
                Assigamé, Boulevard Circulaire, Lomé, Togo
              </div>
            </div>

            {/* Quick links to sections */}
            <div className="space-y-3">
              <h4 className="font-display font-medium text-sm text-coco-ice">Projet & Impact</h4>
              <ul className="space-y-1.5 text-xs text-gray-300">
                <li><a href="#impact" className="hover:text-coco-ice transition-colors">Notre Mission Écologique</a></li>
                <li><a href="#boutique" className="hover:text-coco-ice transition-colors">Boutique & Catalogue</a></li>
                <li><a href="#collecte" className="hover:text-coco-ice transition-colors">Espace Collecte Gratuit</a></li>
                <li><span className="text-gray-500">Valorisation ODD 12 & 14</span></li>
              </ul>
            </div>

            {/* Local business information */}
            <div className="space-y-3">
              <h4 className="font-display font-medium text-sm text-coco-ice">Boutique Directe</h4>
              <ul className="space-y-1.5 text-xs text-gray-300">
                <li><span>Paiement T-Money / Moov Money</span></li>
                <li><span>Espèces acceptées à la livraison</span></li>
                <li><span>Livraison partout à Lomé (Togo)</span></li>
                <li><span>Dégression tarifaire pour grossistes</span></li>
              </ul>
            </div>

            {/* Togo Pride & Contact */}
            <div className="space-y-3">
              <h4 className="font-display font-medium text-sm text-coco-ice">Renseignements</h4>
              <div className="text-xs text-gray-300 space-y-1">
                <p><strong>Heures d'ouverture :</strong></p>
                <p>Lundi au Vendredi : 08h00 - 17h30</p>
                <p>Samedi matin : 09h00 - 13h00</p>
                <p className="pt-2 text-coco-ice flex items-center gap-1.5 font-bold">
                  <Phone className="w-3.5 h-3.5" />
                  <span>+228 90 00 00 00</span>
                </p>
              </div>
            </div>

          </div>

          <div className="pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-400 gap-4">
            <p>© {new Date().getFullYear()} Coco-Rafia Lomé - Économie Circulaire. Tous droits réservés.</p>
            <div className="flex items-center gap-3">
              <span>Projet durable soutenu au Togo</span>
              <span>•</span>
              <span className="text-coco-ice">Vercel Front-End</span>
            </div>
          </div>

        </div>
      </footer>

      {/* SLIDING CART DRAWER (RIGHT) */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop overlay */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
            onClick={() => setCartOpen(false)}
          />

          <div className="absolute inset-y-0 right-0 max-w-full flex">
            {/* Slide-in panel container */}
            <div className="w-screen max-w-md bg-white">
              <Cart 
                cart={cart}
                onUpdateQuantity={handleUpdateQuantity}
                onRemoveItem={handleRemoveItem}
                onClearCart={handleClearCart}
                onClose={() => setCartOpen(false)}
              />
            </div>
          </div>
        </div>
      )}

      {/* PRODUCT DETAILS MODAL DIALOG */}
      {selectedProductDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto">
          {/* Backdrop overlay */}
          <div 
            className="absolute inset-0 bg-black/75 backdrop-blur-sm" 
            onClick={() => setSelectedProductDetails(null)}
          />

          {/* Modal box */}
          <div className="relative bg-white w-full max-w-2xl rounded-3xl border border-coco-shell shadow-2xl overflow-hidden text-left z-10 my-8">
            
            {/* Modal Header */}
            <div className="bg-coco-green text-white p-5 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest bg-white/10 px-2 py-0.5 rounded-md">
                  Label Éco-Innovation
                </span>
                <h3 className="font-serif font-light text-lg sm:text-xl italic">Fiche technique de l'isolant</h3>
              </div>
              <button 
                type="button"
                onClick={() => setSelectedProductDetails(null)}
                className="text-white hover:text-gray-300 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center font-bold"
              >
                ✕
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-5 overflow-y-auto max-h-[75vh]">
              
              <div className="flex flex-col sm:flex-row gap-5 items-start">
                {/* Visual Circle Avatar */}
                <div className="w-20 h-20 bg-coco-sand rounded-2xl overflow-hidden flex-shrink-0 flex items-center justify-center border border-coco-shell">
                  <img 
                    src={selectedProductDetails.image} 
                    alt={selectedProductDetails.name} 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="space-y-1">
                  <h4 className="font-display font-medium text-xl text-gray-900 leading-none">
                    {selectedProductDetails.name}
                  </h4>
                  <p className="text-xs text-coco-brown italic font-bold">
                    {selectedProductDetails.tagline}
                  </p>
                  <p className="text-sm font-semibold text-coco-green font-mono">
                    Prix de vente : {selectedProductDetails.price.toLocaleString('fr-FR')} FCFA
                  </p>
                </div>
              </div>

              {/* Specific Characteristics Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs font-sans">
                <div className="bg-coco-sand p-3 rounded-xl border border-coco-shell/30">
                  <span className="text-gray-400 font-mono block text-[10px] uppercase">Capacité Isotherme :</span>
                  <span className="font-bold text-gray-800">{selectedProductDetails.capacity}</span>
                </div>

                <div className="bg-coco-sand p-3 rounded-xl border border-coco-shell/30">
                  <span className="text-gray-400 font-mono block text-[10px] uppercase">Rendement thermique :</span>
                  <span className="font-bold text-coco-green">{selectedProductDetails.thermalPerformance}</span>
                </div>

                <div className="bg-coco-sand p-3 rounded-xl border border-coco-shell/30 col-span-1 sm:col-span-2">
                  <span className="text-gray-400 font-mono block text-[10px] uppercase">Composition Organique :</span>
                  <span className="font-bold text-gray-800">{selectedProductDetails.composition}</span>
                </div>

                <div className="bg-coco-sand p-3 rounded-xl border border-coco-shell/30 col-span-1 sm:col-span-2">
                  <span className="text-gray-400 font-mono block text-[10px] uppercase">Spécification Biodégradabilité :</span>
                  <span className="font-bold text-coco-brown-dark">{selectedProductDetails.biodegradability}</span>
                </div>
              </div>

              {/* Manufacturing list details */}
              <div className="space-y-2 pt-2">
                <h5 className="font-display font-bold text-sm text-[#2D1B18] flex items-center gap-1">
                  <Leaf className="w-4 h-4 text-coco-green" />
                  <span>Atouts et caractéristiques de fabrication de Coco-Rafia :</span>
                </h5>
                <ul className="space-y-1.5 text-xs text-gray-600 list-disc list-inside bg-coco-green-light/30 p-4 rounded-xl border border-coco-green/10">
                  {selectedProductDetails.fullDetails.map((detStr, i) => (
                    <li key={i} className="leading-relaxed">
                      {detStr}
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* Modal Footer actions */}
            <div className="bg-coco-sand p-4 border-t border-coco-shell/45 flex justify-between items-center">
              <span className="text-[10px] font-mono text-gray-400">
                Lomé Éco-Matériaux • Togo
              </span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedProductDetails(null)}
                  className="px-4 py-2 bg-white hover:bg-gray-100 text-gray-700 text-xs font-bold rounded-xl border border-coco-shell/40"
                >
                  Fermer
                </button>
                <button
                  type="button"
                  onClick={() => {
                    handleAddToCart(selectedProductDetails.id);
                    setSelectedProductDetails(null);
                  }}
                  className="px-5 py-2 bg-coco-green hover:bg-coco-green-hover text-white text-xs font-bold rounded-xl"
                >
                  Ajouter au panier
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
