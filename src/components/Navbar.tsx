import React from 'react';
import { ShoppingBag, HelpCircle, Recycle, Store, Phone, Menu, X, Landmark } from 'lucide-react';
import cocorafiaLogo from '../assets/images/WhatsApp Image 2026-05-22 at 9.03.12 AM.jpeg';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Navbar({ cartCount, onOpenCart, activeTab, setActiveTab }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navItems = [
    { id: 'impact', label: 'Notre Impact', icon: Recycle },
    { id: 'boutique', label: 'La Boutique', icon: Store },
    { id: 'collecte', label: 'Espace Collecte', icon: HelpCircle },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    
    // Smooth scroll to element if on same page
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-coco-shell/40 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          
          {/* Logo Brand area */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleNavClick('impact')}>
            <div className="w-12 h-12 flex-shrink-0 bg-white rounded-xl overflow-hidden flex items-center justify-center border border-coco-shell/45 shadow-sm p-1">
              {/* Real generated brand logo icon instead of SVG */}
              <img 
                src={cocorafiaLogo} 
                alt="Logo Coco-Rafia" 
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-serif font-light text-xl sm:text-2xl text-coco-green leading-none tracking-tight">
                Coco<span className="text-coco-brown font-normal italic">Rafia</span>
              </span>
              <span className="text-[10px] font-mono text-coco-brown-dark font-medium tracking-widest uppercase">
                Lomé · Éco-Isolants
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    activeTab === item.id 
                      ? 'bg-coco-green text-white shadow-sm' 
                      : 'text-gray-600 hover:text-coco-green hover:bg-coco-green-light/60'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Right utility buttons: Cart indicator & Togo Badge */}
          <div className="hidden md:flex items-center space-x-3">
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-coco-shell/30 rounded-lg text-xs font-mono text-coco-brown-dark font-bold border border-coco-shell/40">
              <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse"></span>
              LOMÉ, TOGO
            </div>

            <button
              type="button"
              onClick={onOpenCart}
              className="relative flex items-center gap-2 px-5 py-2.5 bg-coco-green hover:bg-coco-green-hover text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 active:scale-95 text-sm font-bold"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Panier</span>
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-coco-brown text-white text-[11px] font-mono font-bold px-2 py-0.5 rounded-full border-2 border-white animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile menu and cart trigger controls */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              type="button"
              onClick={onOpenCart}
              className="relative p-2 text-gray-700 bg-coco-sand hover:bg-coco-shell/50 rounded-xl transition-colors border border-coco-shell/30"
            >
              <ShoppingBag className="w-5 h-5 text-coco-green" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-coco-brown text-white text-[10px] font-mono font-bold px-1.5 py-0.2 rounded-full border border-white">
                  {cartCount}
                </span>
              )}
            </button>
            
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-700 bg-coco-sand hover:bg-coco-shell/50 rounded-xl transition-colors border border-coco-shell/30"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-coco-brown" /> : <Menu className="w-5 h-5 text-coco-green" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu panel */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-coco-shell/30 bg-white/95 backdrop-blur-md px-4 pt-2 pb-5 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-sm font-semibold transition-all ${
                  activeTab === item.id 
                    ? 'bg-coco-green text-white' 
                    : 'text-gray-700 hover:bg-coco-green-light'
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </button>
            );
          })}
          
          <div className="pt-3 border-t border-coco-shell/20 flex items-center justify-between">
            <span className="text-xs font-mono text-coco-brown font-bold">LOMÉ, TOGO</span>
            <span className="text-xs text-gray-500">Contact: +228 90 00 00 00</span>
          </div>
        </div>
      )}
    </nav>
  );
}
