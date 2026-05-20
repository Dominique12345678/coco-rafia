import React, { useState, useRef } from 'react';
import { Truck, UploadCloud, CheckCircle2, AlertCircle, Trash2, Send, Recycle, MapPin, Sparkles, Building, Coins, Star, Image as ImageIcon } from 'lucide-react';

interface WasteReport {
  establishment: string;
  contactName: string;
  phone: string;
  neighborhood: string;
  customNeighborhood: string;
  volume: string;
  additionalInfo: string;
}

const COLLECTE_NEIGHBORHOODS = [
  "Marché d'Assigamé",
  "Plage de Lomé (Coco Beach)",
  "Marché de Bè",
  "Hôtel de la Paix / Sarakawa",
  "Hôtel du 2 Février",
  "Tokoin Ramco / Douanes",
  "Hedzranawoé (Grand Marché)",
  "Baguida / Avepozo (Zone Hôtelière)",
  "Kodjoviakopé",
  "Agoè-Nyivé",
  "Adidogomé",
  "Port autonome de Lomé",
  "Autre quartier / zone"
];

const VOLUMES = [
  { value: "petits_sacs", label: "Quelques sacs isolés (Moins de 5 sacs)" },
  { value: "moyens_sacs", label: "Volume moyen (5 à 15 grands sacs de bourre)" },
  { value: "grand_tas", label: "Tas important (Plus de 15 sacs ou tas en vrac)" },
  { value: "benne", label: "Volume industriel / Benne entière de coques" }
];

export default function EspaceCollecte() {
  const [formData, setFormData] = useState<WasteReport>({
    establishment: '',
    contactName: '',
    phone: '',
    neighborhood: COLLECTE_NEIGHBORHOODS[0],
    customNeighborhood: '',
    volume: VOLUMES[0].value,
    additionalInfo: ''
  });

  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState('');
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelection(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelection(e.target.files[0]);
    }
  };

  const handleFileSelection = (file: File) => {
    // Basic verification
    if (!file.type.startsWith('image/')) {
      alert("Veuillez sélectionner uniquement des fichiers image (PNG, JPG, JPEG) pour vérifier les coques.");
      return;
    }
    setUploadedFile(file);
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.establishment.trim()) {
      setErrors("Veuillez saisir le nom de votre établissement ou commerce.");
      return;
    }
    if (!formData.contactName.trim()) {
      setErrors("Veuillez renseigner le nom d'un contact.");
      return;
    }
    if (!formData.phone.trim()) {
      setErrors("Veuillez renseigner votre numéro de téléphone WhatsApp.");
      return;
    }
    
    setErrors('');
    
    // Build direct dynamic WhatsApp trigger link so they can dispatch details to Coco-Rafia team
    const selectedVolumeLabel = VOLUMES.find(v => v.value === formData.volume)?.label || formData.volume;
    const finalLocation = formData.neighborhood === "Autre quartier / zone" && formData.customNeighborhood
      ? formData.customNeighborhood
      : formData.neighborhood;

    const textToSend = 
`*SIGNALEMENT DE COLLECTE COCO-RAFIA* [Donateur]
Bonjour l'équipe Coco-Rafia ! Nous disposons de déchets de noix de coco prêts à être valorisés :

*ÉTABLISSEMENT :*
• Nom : *${formData.establishment}*
• Contact direct : *${formData.contactName}*
• WhatsApp / Tél : *${formData.phone}*
• Emplacement (Lomé) : *${finalLocation}*

*VOLUME ESTIMÉ :*
• Quantité : *${selectedVolumeLabel}*

*NOTE DE COLLECTE :*
${formData.additionalInfo.trim() ? `"${formData.additionalInfo.trim()}"` : 'Aucun commentaire.'}
${uploadedFile ? `*Note :* Une photo des coques de coco a été préparée et est prête à vous être envoyée.` : ''}

Merci de planifier le passage gratuit de votre équipe pour upcycler ces matières à Lomé !`;

    const encodedText = encodeURIComponent(textToSend);
    const whatsappUrl = `https://wa.me/22890000000?text=${encodedText}`;

    window.open(whatsappUrl, '_blank');
    setSuccess(true);
  };

  const handleResetForm = () => {
    setFormData({
      establishment: '',
      contactName: '',
      phone: '',
      neighborhood: COLLECTE_NEIGHBORHOODS[0],
      customNeighborhood: '',
      volume: VOLUMES[0].value,
      additionalInfo: ''
    });
    setUploadedFile(null);
    setSuccess(false);
  };

  return (
    <section id="collecte" className="py-20 bg-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left info panel about coconut husk recycling and logistics */}
          <div className="lg:col-span-5 space-y-6 text-left self-center">
            
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-coco-green-light text-coco-green font-mono text-xs font-bold rounded-full uppercase tracking-wider">
              <Truck className="w-4 h-4" />
              <span>Collecte Gratuite à Lomé</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl font-light italic text-coco-green tracking-tight">
              Hôtels, bars, marchands : <span className="text-coco-brown font-normal">valorisez vos écorces !</span>
            </h2>

            <p className="text-sm text-gray-600 leading-relaxed">
              Ne payez plus pour l’évacuation de vos déchets de noix de coco ou ne les laissez plus encombrer le domaine public de Lomé. Notre équipe de collecte Coco-Rafia passe <strong>gratuitement</strong> récupérer vos stocks pour les réinsérer dans l'économie circulaire locale.
            </p>

            <div className="space-y-4">
              <h4 className="font-display font-bold text-sm text-[#2D1B18]">Pourquoi donner vos résidus à Coco-Rafia ?</h4>
              
              <div className="space-y-3">
                <div className="flex gap-3 items-start bg-[#FDFBF7] p-3.5 rounded-xl border border-coco-shell/30">
                  <span className="p-1.5 bg-coco-green-light text-coco-green rounded-lg">
                    <Coins className="w-5 h-5" />
                  </span>
                  <div>
                    <h5 className="font-bold text-xs font-display text-gray-900">Service de transport 100% gratuit</h5>
                    <p className="text-[11px] text-gray-500">Aucuns frais cachés, nous nous déplaçons directement chez vous.</p>
                  </div>
                </div>

                <div className="flex gap-3 items-start bg-[#FDFBF7] p-3.5 rounded-xl border border-coco-shell/30">
                  <span className="p-1.5 bg-coco-green-light text-coco-green rounded-lg">
                    <Trash2 className="w-5 h-5" />
                  </span>
                  <div>
                    <h5 className="font-bold text-xs font-display text-gray-900">Propreté des abords commerciaux</h5>
                    <p className="text-[11px] text-gray-500">Éliminez les moustiques et nuisibles qui se logent dans les coques de coco humides.</p>
                  </div>
                </div>

                <div className="flex gap-3 items-start bg-[#FDFBF7] p-3.5 rounded-xl border border-coco-shell/30">
                  <span className="p-1.5 bg-coco-green-light text-coco-green rounded-lg">
                    <Star className="w-5 h-5" />
                  </span>
                  <div>
                    <h5 className="font-bold text-xs font-display text-gray-900">Label Éco-Responsable</h5>
                    <p className="text-[11px] text-gray-500">Obtenez notre certification partenaire vert à afficher dans votre hôtel ou restaurant de Lomé.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct contact details */}
            <div className="p-4 bg-coco-ice rounded-2xl border border-coco-ice-dark/15 text-xs text-[#006064] space-y-1">
              <span className="font-bold block uppercase tracking-wider font-display">Urgence Collecte à Lomé ?</span>
              <p className="leading-relaxed">
                Appelez notre centrale logistique directement au <strong>+228 90 00 00 00</strong> pour un dispatching de tricycle rapide dans la demi-journée.
              </p>
            </div>

          </div>

          {/* Right actual submission form */}
          <div className="lg:col-span-7 bg-[#FDFBF7] p-6 sm:p-8 rounded-3xl border-2 border-coco-shell/50 shadow-sm text-left relative">
            
            {success ? (
              <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-16 h-16 bg-coco-green-light rounded-full flex items-center justify-center text-coco-green">
                  <CheckCircle2 className="w-10 h-10 animate-scale-up" />
                </div>
                
                <h3 className="font-display font-bold text-2xl text-coco-green">Demande Envoyée !</h3>
                
                <p className="text-sm text-gray-600 max-w-md">
                  Votre formulaire a été généré avec succès. Vous avez été redirigé vers WhatsApp pour finaliser la transmission de la photo et l'heure de passage idéale avec notre chauffeur de tricycle à Lomé.
                </p>

                <div className="bg-white p-4 rounded-xl border border-coco-shell/30 text-xs text-gray-700 max-w-md space-y-2 text-left">
                  <span className="font-bold text-coco-brown-dark font-display block">Prochaines étapes :</span>
                  <ol className="list-decimal list-inside space-y-1 text-gray-600">
                    <li>Un agent vérifie la localisation indiquée.</li>
                    <li>Un tricycle électrique ou camion de tri Coco-Rafia est dépêché.</li>
                    <li>Vos stocks sont pesés et chargés en moins de 10 minutes.</li>
                  </ol>
                </div>

                <button
                  type="button"
                  onClick={handleResetForm}
                  className="px-6 py-3 bg-coco-green hover:bg-coco-green-hover text-white font-medium rounded-xl transition-all shadow-md active:scale-95"
                >
                  Signaler une autre collecte
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4 text-xs font-sans">
                
                <div className="flex items-center gap-2 border-b border-coco-shell/40 pb-2">
                  <Recycle className="w-5 h-5 text-coco-green animate-spin-slow" />
                  <h3 className="font-serif font-medium italic text-lg text-coco-green">Signaler un tas de résidus de coco</h3>
                </div>

                {errors && (
                  <div className="p-3 bg-red-50 rounded-lg text-red-700 flex items-start gap-1.5 text-xs">
                    <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <span>{errors}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-bold mb-1 flex items-center gap-1">
                      <Building className="w-3.5 h-3.5 text-coco-brown" />
                      Nom de l'établissement / Commerce *
                    </label>
                    <input 
                      type="text" 
                      value={formData.establishment}
                      onChange={(e) => setFormData({ ...formData, establishment: e.target.value })}
                      placeholder="Ex: Hôtel Sarakawa, Coco Beach, Vendeur de coco..."
                      className="w-full bg-white border border-coco-shell rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-coco-green/40 transition-all text-xs"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-bold mb-1">
                      Nom de l'interlocuteur / Responsable *
                    </label>
                    <input 
                      type="text" 
                      value={formData.contactName}
                      onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                      placeholder="Ex: M. Jean Lawson"
                      className="w-full bg-white border border-coco-shell rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-coco-green/40 transition-all text-xs"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-bold mb-1">
                      Téléphone WhatsApp de contact *
                    </label>
                    <input 
                      type="tel" 
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="Ex: +228 91 88 55 22"
                      className="w-full bg-white border border-coco-shell rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-coco-green/40 transition-all text-xs"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-bold mb-1">
                      Volume approximatif de coques *
                    </label>
                    <select 
                      value={formData.volume}
                      onChange={(e) => setFormData({ ...formData, volume: e.target.value })}
                      className="w-full bg-white border border-coco-shell rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-coco-green/40 transition-all text-xs"
                    >
                      {VOLUMES.map(v => (
                        <option key={v.value} value={v.value}>{v.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-bold mb-1 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-coco-green" />
                      Emplacement / Marché de Lomé *
                    </label>
                    <select 
                      value={formData.neighborhood}
                      onChange={(e) => setFormData({ ...formData, neighborhood: e.target.value })}
                      className="w-full bg-white border border-coco-shell rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-coco-green/40 transition-all text-xs"
                    >
                      {COLLECTE_NEIGHBORHOODS.map(n => (
                        <option key={n} value={n}>{n}</option>
                      ))}
                    </select>
                  </div>

                  {formData.neighborhood === "Autre quartier / zone" ? (
                    <div>
                      <label className="block text-gray-700 font-bold mb-1">Précisez le quartier à Lomé *</label>
                      <input 
                        type="text"
                        value={formData.customNeighborhood}
                        onChange={(e) => setFormData({ ...formData, customNeighborhood: e.target.value })}
                        placeholder="Ex: Tokoin Ramco, face station T-Oil"
                        className="w-full bg-white border border-coco-shell rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-coco-green/40 transition-all text-xs"
                        required
                      />
                    </div>
                  ) : (
                    <div className="hidden sm:block opacity-60 self-end pb-3 text-[10px] text-gray-400 font-mono">
                      * Notre équipe dessert quotidiennement toute la côte litorale togolaise.
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-gray-700 font-bold mb-1">Instructions de repère ou accès (facultatif)</label>
                  <textarea 
                    value={formData.additionalInfo}
                    onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
                    placeholder="Ex: Derrière l'hôtel, près des bennes de tri sélectif ou à côté du grand cocotier du bar..."
                    rows={2}
                    className="w-full bg-white border border-coco-shell rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-coco-green/40 transition-all text-xs resize-none"
                  />
                </div>

                {/* Drag and Drop Zone with manual browse option (Native Usability Pattern) */}
                <div>
                  <label className="block text-gray-700 font-bold mb-1 flex items-center gap-1.5">
                    <UploadCloud className="w-4 h-4 text-coco-brown" />
                    <span>Photo du tas de coques (Recommandé pour vérification rapide)</span>
                  </label>
                  
                  <div 
                    onDragEnter={handleDrag}
                    onDragOver={handleDrag}
                    onDragLeave={handleDrag}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-2xl p-5 text-center cursor-pointer transition-all flex flex-col items-center justify-center space-y-2 select-none ${
                      dragActive 
                        ? 'border-coco-green bg-coco-green-light/45 scale-[1.01]' 
                        : uploadedFile 
                          ? 'border-coco-green bg-white' 
                          : 'border-coco-shell/80 bg-white hover:bg-coco-sand/30 hover:border-coco-brown/50'
                    }`}
                  >
                    <input 
                      type="file" 
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept="image/*"
                      className="hidden" 
                    />

                    {uploadedFile ? (
                      <div className="flex flex-col items-center space-y-2">
                        <ImageIcon className="w-8 h-8 text-coco-green mx-auto" />
                        <div className="text-xs text-gray-900 font-bold truncate max-w-xs">{uploadedFile.name}</div>
                        <div className="text-[10px] text-gray-400 font-mono">({(uploadedFile.size / 1024).toFixed(1)} KB)</div>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveFile();
                          }}
                          className="px-2 py-1 bg-red-100 text-red-700 hover:bg-red-200 rounded-lg text-xs font-mono transition-colors flex items-center gap-1"
                        >
                          <Trash2 className="w-3 h-3" /> Retirer la photo
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-1">
                        <UploadCloud className="w-8 h-8 text-coco-brown mx-auto" />
                        <div className="text-xs text-gray-600">
                          <strong className="text-coco-green">Glissez-déposez l'image</strong> ou <span className="underline">parcourez vos fichiers</span>.
                        </div>
                        <div className="text-[10px] text-gray-400 font-mono">PNG, JPG, JPEG jusqu'à 5 MB</div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Submit button on WhatsApp redirection */}
                <button
                  type="submit"
                  className="w-full py-4 px-6 bg-coco-green hover:bg-coco-green-hover text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2 text-sm"
                >
                  <Send className="w-4 h-4 animate-bounce-slow" />
                  Envoyer ma demande de collecte gratuite
                </button>
                
                <span className="block text-center text-[10px] text-gray-400">
                  Note : Nous répondons sous 1 heure pour planifier le passage gratuitement.
                </span>

              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
