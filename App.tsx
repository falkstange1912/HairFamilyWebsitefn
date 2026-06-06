/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { 
  Scissors, 
  Calendar, 
  Clock, 
  Check, 
  Star, 
  ChevronRight, 
  Sparkles, 
  ShieldCheck, 
  Instagram, 
  Phone, 
  MapPin, 
  User, 
  Mail, 
  Trash, 
  Menu, 
  X,
  Users
} from "lucide-react";

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  salon: string;
  service: string;
  date: string;
  time: string;
  createdAt: string;
}

const SALONS = [
  { name: "Salon Königslutter", address: "Amtsgarten 2, 38154 Königslutter am Elm", phone: "(0 53 53) 22 02" },
  { name: "Salon Schöningen", address: "Burgplatz 5, 38364 Schöningen", phone: "(0 53 52) 90 75 67" },
  { name: "Salon Sickte", address: "Bahnhofstraße 16c, 38173 Sickte", phone: "(0 53 05) 25 94" },
  { name: "Salon Destedt", address: "Destedter Hauptstraße 25, 38162 Cremlingen", phone: "(0 53 06) 18 14" },
  { name: "Salon Weddel", address: "Dorfplatz 13, 38162 Cremlingen", phone: "(0 53 06) 60 15" }
];

const SERVICES = [
  "Nordic Clarity Cut & Finish",
  "Premium Balayage & Farb-Veredelung",
  "Organic Komplett-Tönung",
  "Individuelle Typ-Veränderung"
];

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [modalType, setModalType] = useState<"imprint" | "privacy" | null>(null);
  const [leads, setLeads] = useState<Lead[]>([]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    salon: "Salon Sickte",
    service: "Nordic Clarity Cut & Finish",
    date: "",
    time: "Vormittags (09:00 - 12:00 Uhr)"
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [validationError, setValidationError] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("hair_family_leads");
    if (saved) {
      try { setLeads(JSON.parse(saved)); } catch (e) { setLeads([]); }
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (validationError) setValidationError("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim() || !formData.date) {
      setValidationError("Bitte alle Pflichtfelder (*) vollständig ausfüllen.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const newLead: Lead = {
        id: "lead-" + Date.now(),
        ...formData,
        createdAt: new Date().toISOString()
      };
      const updated = [newLead, ...leads];
      setLeads(updated);
      localStorage.setItem("hair_family_leads", JSON.stringify(updated));
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        salon: "Salon Sickte",
        service: "Nordic Clarity Cut & Finish",
        date: "",
        time: "Vormittags (09:00 - 12:00 Uhr)"
      });
    }, 800);
  };

  const handleDeleteLead = (id: string) => {
    const updated = leads.filter(l => l.id !== id);
    setLeads(updated);
    localStorage.setItem("hair_family_leads", JSON.stringify(updated));
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900 font-sans antialiased selection:bg-[#D32F2F]/10 selection:text-[#D32F2F]">
      
      {/* Top Bar Indicator */}
      <div className="w-full bg-[#D32F2F] text-white text-[11px] py-2 px-4 text-center tracking-widest font-mono uppercase font-bold">
        ⚡ NEU: 24/7 ONLINE-TERMINANFRAGE FÜR ALLE STANDORTE AKTIV
      </div>

      {/* Navigation Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex justify-between items-center">
          
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-10 h-10 border-2 border-[#D32F2F] flex items-center justify-center font-serif text-lg font-bold tracking-widest text-[#D32F2F]">
              HF
            </div>
            <div>
              <span className="font-serif text-xl font-black tracking-wider block leading-none">HAIR FAMILY</span>
              <span className="text-[9px] font-mono tracking-[0.25em] font-bold text-[#D32F2F] uppercase block mt-1">Der Friseur • Region Braunschweig</span>
            </div>
          </div>

          <nav className="hidden md:flex space-x-8 items-center font-mono text-xs uppercase tracking-widest font-semibold">
            <button onClick={() => scrollTo("promise")} className="text-neutral-600 hover:text-[#D32F2F] transition-colors">Versprechen</button>
            <button onClick={() => scrollTo("details")} className="text-neutral-600 hover:text-[#D32F2F] transition-colors">Leistungen</button>
            <button onClick={() => scrollTo("social-proof")} className="text-neutral-600 hover:text-[#D32F2F] transition-colors">Kundenstimmen</button>
            <button onClick={() => scrollTo("career")} className="text-white bg-[#D32F2F] px-3 py-1 rounded text-[10px]">💼 Karriere</button>
          </nav>

          <div className="hidden lg:block">
            <button onClick={() => scrollTo("booking-form")} className="px-5 py-3 bg-neutral-900 text-white text-xs uppercase tracking-widest font-bold hover:bg-[#D32F2F] transition-all">
              Termin anfragen
            </button>
          </div>

          <div className="flex md:hidden">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-neutral-900 focus:outline-none">
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-neutral-200 bg-white py-4 px-6 space-y-3 font-mono text-xs uppercase tracking-widest shadow-lg">
            <button onClick={() => scrollTo("promise")} className="block w-full text-left py-2 text-neutral-600">Versprechen</button>
            <button onClick={() => scrollTo("details")} className="block w-full text-left py-2 text-neutral-600">Leistungen</button>
            <button onClick={() => scrollTo("social-proof")} className="block w-full text-left py-2 text-neutral-600">Kundenstimmen</button>
            <button onClick={() => scrollTo("career")} className="block w-full text-left py-2 text-[#D32F2F] font-bold">💼 Karriere</button>
            <hr className="border-neutral-200" />
            <button onClick={() => scrollTo("booking-form")} className="w-full text-center block py-3 bg-[#D32F2F] text-white font-bold">Jetzt Termin anfragen</button>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section id="hero" className="py-12 md:py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center space-x-2 bg-red-50 border border-red-200 px-3 py-1 rounded-full">
                <Sparkles className="w-3.5 h-3.5 text-[#D32F2F]" />
                <span className="text-[10px] font-mono tracking-widest uppercase text-[#D32F2F] font-bold">Nordic Premium Haircare</span>
              </div>

              <h1 className="font-serif text-3.5xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl text-neutral-900 leading-[1.15] tracking-tight font-black">
                Dein skandinavischer Premium-Look. <br />
                <span className="text-[#D32F2F] italic font-serif font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
                  Ohne ewige Wartezeit im Salon.
                </span>
              </h1>

              <p className="text-sm sm:text-base text-neutral-600 max-w-xl leading-relaxed">
                Hair Family bringt erstklassige Schnittkunst und biologisch schonende Colorationen direkt zu dir in die Region. Schluss mit Fließbandarbeit – wir nehmen uns exklusiv Zeit für dich.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <button onClick={() => scrollTo("booking-form")} className="px-8 py-4 bg-[#D32F2F] hover:bg-neutral-900 text-white text-xs uppercase tracking-widest font-bold transition-all text-center shadow-md">
                  Wunschtermin online anfragen
                </button>
                <button onClick={() => scrollTo("details")} className="px-8 py-4 border border-neutral-300 hover:bg-neutral-50 text-neutral-800 text-xs uppercase tracking-widest font-bold text-center">
                  Unsere 5 Salons ansehen
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-neutral-200 font-mono text-[11px] text-neutral-500 uppercase tracking-wider">
                <div className="flex items-center space-x-2"><Check className="w-4 h-4 text-[#D32F2F]" /> <span>Feste Zeitfenster</span></div>
                <div className="flex items-center space-x-2"><Check className="w-4 h-4 text-[#D32F2F]" /> <span>Vegan & Ammoniakfrei</span></div>
                <div className="flex items-center space-x-2 col-span-2 sm:col-span-1"><Check className="w-4 h-4 text-[#D32F2F]" /> <span>Kao Master-Care</span></div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative w-full aspect-[4/5] overflow-hidden shadow-xl border border-neutral-200 bg-neutral-50">
                <img
                  src="https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&q=80&w=600"
                  alt="Premium Balayage Hair Family"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 duration-700 transition-all"
                />
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 p-3 border border-neutral-200 flex justify-between items-center text-xs font-bold font-mono uppercase tracking-wider">
                  <span>SALON QUALITY</span>
                  <span className="text-[#D32F2F]">KAO GOLDWELL CERTIFIED</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Promise Section */}
      <section id="promise" className="bg-neutral-900 text-white py-16 md:py-20 text-center">
        <div className="max-w-3xl mx-auto px-4 space-y-6">
          <div className="inline-flex items-center space-x-2 border border-red-500/20 px-3 py-1 bg-[#D32F2F]/10 text-[#D32F2F] text-[10px] font-mono uppercase font-bold">
            // DAS HAIR FAMILY EHREN-VERSPRECHEN
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold tracking-tight">
            100% Begeisterung oder Nachbesserung <br />
            <span className="text-[#D32F2F] italic">ohne Diskussion</span>.
          </h2>
          <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed max-w-xl mx-auto">
            Wir hassen ungenaue Absprachen und Massenabfertigung. Solltest du mit deinem Haarschnitt oder deiner Tönung nicht absolut glücklich sein, korrigieren wir es sofort kostenfrei. Dein Vertrauen steht für uns an oberster Stelle.
          </p>
        </div>
      </section>

      {/* Details / Benefits Section */}
      <section id="details" className="py-16 bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-[#D32F2F] font-bold block mb-1">DEINE VORTEILE</span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold">Warum anspruchsvolle Kunden uns wählen</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-neutral-50 border border-neutral-200 hover:border-[#D32F2F] transition-all">
              <div className="w-10 h-10 bg-neutral-900 text-white flex items-center justify-center mb-4"><Clock className="w-5 h-5 text-white" /></div>
              <h4 className="font-serif text-lg font-bold mb-2">Exklusive Einzel-Slots</h4>
              <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed">Wir blocken feste Zeiten exklusiv für dich. Keine parallelen Colorationen, kein stressiges Hin-und-Her-Gerenne deines Stylisten.</p>
            </div>
            <div className="p-6 bg-neutral-50 border border-neutral-200 hover:border-[#D32F2F] transition-all">
              <div className="w-10 h-10 bg-[#D32F2F] text-white flex items-center justify-center mb-4"><Scissors className="w-5 h-5 text-white" /></div>
              <h4 className="font-serif text-lg font-bold mb-2">Meisterliche Freihandtechnik</h4>
              <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed">Ob Babylights oder fließendes Premium-Balayage: Unsere Stylisten beherrschen modernste Techniken für absolut natürliche Farbverläufe.</p>
            </div>
            <div className="p-6 bg-neutral-50 border border-neutral-200 hover:border-[#D32F2F] transition-all">
              <div className="w-10 h-10 bg-neutral-900 text-white flex items-center justify-center mb-4"><Sparkles className="w-5 h-5 text-white" /></div>
              <h4 className="font-serif text-lg font-bold mb-2">Ehrliche Festpreise</h4>
              <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed">Keine bösen Überraschungen oder versteckten Materialpauschalen an der Kasse. Alle Preise werden vorab transparent kommuniziert.</p>
            </div>
          </div>

        </div>
      </section>

      {/* Social Proof Section */}
      <section id="social-proof" className="py-16 bg-neutral-50 border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-10">
            <span className="text-xs font-mono uppercase tracking-widest text-[#D32F2F] font-bold block mb-1">STIMMEN DER REGION</span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold">Über 350 glückliche Stammkunden</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="bg-white p-6 border border-neutral-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex text-red-600 mb-3">{[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}</div>
                <p className="text-neutral-700 text-xs sm:text-sm italic font-serif">„Endlich ein Friseur in Sickte, der kühles Blond perfekt hinkriegt. Der Salon ist super schön hell und clean gestaltet.“</p>
              </div>
              <span className="block text-[10px] font-mono text-neutral-400 mt-4 uppercase font-bold">Katharina M., Sickte</span>
            </div>
            <div className="bg-white p-6 border border-neutral-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex text-red-600 mb-3">{[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}</div>
                <p className="text-neutral-700 text-xs sm:text-sm italic font-serif">„Die Termintreue in Königslutter ist ein Segen. Keine Wartezeit – ich komme an und sitze sofort auf dem Stuhl.“</p>
              </div>
              <span className="block text-[10px] font-mono text-neutral-400 mt-4 uppercase font-bold">Luisa B., Königslutter</span>
            </div>
            <div className="bg-white p-6 border border-neutral-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex text-red-600 mb-3">{[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}</div>
                <p className="text-neutral-700 text-xs sm:text-sm italic font-serif">„Sehr kompetente Beratung in Schöningen. Mir wurde nichts aufgedrängt, das Ergebnis spricht absolut für sich.“</p>
              </div>
              <span className="block text-[10px] font-mono text-neutral-400 mt-4 uppercase font-bold">Elena S., Schöningen</span>
            </div>
          </div>
        </div>
      </section>

      {/* Recruiting Section (Hormozi Framework for Hiring) */}
      <section id="career" className="bg-gradient-to-br from-[#D32F2F] to-red-800 text-white py-12 px-4 text-center">
        <div className="max-w-2xl mx-auto flex flex-col items-center gap-3">
          <Users className="w-6 h-6 text-white mb-1" />
          <h2 className="font-serif text-2xl md:text-3xl font-black uppercase tracking-tight">Wir suchen Verstärkung! Friseure (m/w/d) gesucht</h2>
          <p className="text-neutral-100 text-xs md:text-sm font-light max-w-lg leading-relaxed">
            Für unsere Salons in **Königslutter, Sickte und Schöningen** in Voll- oder Teilzeit. Freue dich auf übertarifliche Bezahlung, ein eingespieltes Premium-Umfeld und flexible Arbeitszeitmodelle.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-center mt-3">
            <a href="tel:+491733085774" className="bg-white text-[#D32F2F] font-mono text-xs uppercase tracking-widest px-5 py-2.5 font-bold hover:bg-neutral-900 hover:text-white transition-all">
              Direkt-Call: 0173 / 3 08 57 74
            </a>
            <span className="text-[11px] font-mono text-white/80">Ansprechpartnerin: Renate Domke</span>
          </div>
        </div>
      </section>

      {/* Booking Form Section */}
      <section id="booking-form" className="py-12 bg-white relative scroll-mt-6">
        <div className="max-w-3xl mx-auto px-4">
          <div className="bg-white border-2 border-neutral-900 p-6 md:p-10 relative">
            
            <div className="absolute top-0 right-0 w-6 h-6 border-r-2 border-t-2 border-[#D32F2F] -mt-1 -mr-1" />
            <div className="absolute bottom-0 left-0 w-6 h-6 border-l-2 border-b-2 border-[#D32F2F] -mb-1 -ml-1" />

            <div className="text-center max-w-xl mx-auto mb-8 space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-[#D32F2F] font-bold block">1-MINUTE ONLINE ANFRAGE</span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold">Unverbindlichen Wunschtermin sichern</h2>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Trage dich kurz ein. Unser Team kontaktiert dich innerhalb kürzester Zeit zur finalen Terminbestätigung.
              </p>
            </div>

            {validationError && (
              <div className="mb-4 p-3 bg-red-50 text-[#D32F2F] text-xs font-bold border-l-4 border-[#D32F2F]">
                ⚠️ {validationError}
              </div>
            )}

            {submitSuccess ? (
              <div className="p-6 bg-green-50 border border-green-300 text-center space-y-3 max-w-md mx-auto">
                <div className="w-10 h-10 bg-green-600 text-white flex items-center justify-center rounded-full mx-auto">✓</div>
                <h4 className="font-serif text-xl font-bold text-neutral-900">Anfrage erfolgreich gesendet!</h4>
                <p className="text-xs text-neutral-600">Wir rufen dich schnellstmöglich zur festen Bestätigung zurück.</p>
                <button onClick={() => setSubmitSuccess(false)} className="text-xs font-bold underline text-[#D32F2F] font-mono uppercase">Weitere Anfrage senden</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-[11px] uppercase font-mono tracking-wider font-bold text-neutral-500">Dein Name *</label>
                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="z.B. Anna Müller" className="w-full p-3 border border-neutral-200 text-xs outline-none focus:border-[#D32F2F]" required />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-[11px] uppercase font-mono tracking-wider font-bold text-neutral-500">Telefonnummer *</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="z.B. 05305 12345" className="w-full p-3 border border-neutral-200 text-xs outline-none focus:border-[#D32F2F]" required />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-[11px] uppercase font-mono tracking-wider font-bold text-neutral-500">E-Mail-Adresse *</label>
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="anna@mail.de" className="w-full p-3 border border-neutral-200 text-xs outline-none focus:border-[#D32F2F]" required />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-[11px] uppercase font-mono tracking-wider font-bold text-neutral-500">Wunsch-Salon *</label>
                    <select name="salon" value={formData.salon} onChange={handleInputChange} className="w-full p-3 border border-neutral-200 text-xs outline-none focus:border-[#D32F2F] bg-white cursor-pointer">
                      {SALONS.map((s, idx) => <option key={idx} value={s.name}>{s.name}</option>)}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-[11px] uppercase font-mono tracking-wider font-bold text-neutral-500">Leistung *</label>
                    <select name="service" value={formData.service} onChange={handleInputChange} className="w-full p-3 border border-neutral-200 text-xs outline-none focus:border-[#D32F2F] bg-white cursor-pointer">
                      {SERVICES.map((srv, idx) => <option key={idx} value={srv}>{srv}</option>)}
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <label className="block text-[11px] uppercase font-mono tracking-wider font-bold text-neutral-500">Datum *</label>
                      <input type="date" name="date" value={formData.date} onChange={handleInputChange} className="w-full p-3 border border-neutral-200 text-xs outline-none focus:border-[#D32F2F] cursor-pointer" required />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-[11px] uppercase font-mono tracking-wider font-bold text-neutral-500">Tageszeit *</label>
                      <select name="time" value={formData.time} onChange={handleInputChange} className="w-full p-3 border border-neutral-200 text-xs outline-none focus:border-[#D32F2F] bg-white cursor-pointer">
                        <option value="Vormittags (09:00 - 12:00 Uhr)">Vormittags</option>
                        <option value="Mittags (12:00 - 15:00 Uhr)">Mittags</option>
                        <option value="Nachmittags (15:00 - 18:30 Uhr)">Nachmittags</option>
                      </select>
                    </div>
                  </div>
                </div>

                <button type="submit" disabled={isSubmitting} className="w-full py-4 bg-[#D32F2F] hover:bg-neutral-900 text-white font-mono text-xs uppercase tracking-widest font-bold transition-all mt-4">
                  {isSubmitting ? "Verarbeite..." : "Anfrage absenden"}
                </button>
              </form>
            )}

          </div>
        </div>
      </section>

      {/* Internal CRM Storage Viewer for Falk & Hair Family Dashboard Prototype */}
      <div className="max-w-3xl mx-auto px-4 pb-12">
        <div className="border border-dashed border-red-300 bg-red-50/30 p-4 text-center space-y-3">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
            <div className="text-left">
              <span className="bg-[#D32F2F] text-white text-[9px] font-mono uppercase px-2 py-0.5 font-bold rounded">Dashboard-Ansicht</span>
              <p className="text-xs text-neutral-600 mt-1">Eingegangene Kundenanfragen verwalten (Sandbox Prototyping)</p>
            </div>
            <button onClick={() => setShowDashboard(!showDashboard)} className="text-xs font-bold font-mono uppercase tracking-wider px-3 py-1.5 bg-neutral-900 text-white">
              {showDashboard ? "Schließen" : "Anzeigen (" + leads.length + ")"}
            </button>
          </div>

          {showDashboard && (
            <div className="pt-4 border-t border-neutral-200 text-left overflow-x-auto text-xs bg-white p-2">
              {leads.length === 0 ? <p className="text-neutral-400 italic text-center py-2">Noch keine Anfragen im Speicher vorhanden.</p> : (
                <table className="w-full table-auto text-left border divide-y divide-neutral-200">
                  <thead className="bg-neutral-50 font-mono text-[10px]">
                    <tr>
                      <th className="p-2">Kunde</th>
                      <th className="p-2">Salon</th>
                      <th className="p-2">Wunschzeit</th>
                      <th className="p-2 text-right">Aktion</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100">
                    {leads.map(l => (
                      <tr key={l.id}>
                        <td className="p-2"><strong>{l.name}</strong><br /><span className="text-[10px] text-neutral-400">{l.phone}</span></td>
                        <td className="p-2 text-[#D32F2F] font-medium">{l.salon}</td>
                        <td className="p-2 font-mono text-[11px]">{l.date}</td>
                        <td className="p-2 text-right"><button onClick={() => handleDeleteLead(l.id)} className="text-red-600 font-bold p-1 bg-red-50 hover:bg-red-100">Löschen</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Footer Section */}
      <footer className="bg-neutral-900 text-neutral-300 pt-12 pb-6 border-t border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-8 text-xs text-left">
          
          <div className="md:col-span-4 space-y-3">
            <span className="font-serif text-lg font-black tracking-wider text-white">HAIR FAMILY</span>
            <p className="text-neutral-400 font-light leading-relaxed">Skandinavische Schnittpräzision und vegane Haarpflege an 5 Standorten in den Landkreisen Helmstedt, Wolfenbüttel und Helmstedt.</p>
          </div>

          <div className="md:col-span-5 space-y-2 font-mono text-[11px]">
            <h4 className="text-[#D32F2F] font-bold tracking-widest uppercase">STANDORTE & DIREKTNUMMERN</h4>
            <div className="grid grid-cols-1 gap-1 text-neutral-400">
              {SALONS.map((s, i) => (
                <div key={i} className="border-b border-neutral-800 pb-1">
                  <strong>{s.name}</strong>: {s.address} <br /><span className="text-white font-sans">{s.phone}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="md:col-span-3 space-y-2 font-mono">
            <h4 className="text-white font-bold tracking-widest uppercase">ZEITEN</h4>
            <ul className="space-y-1 text-neutral-400 text-[11px]">
              <li>Montag - Freitag: 09:00 - 18:30 Uhr</li>
              <li>Samstag: 08:30 - 14:00 Uhr</li>
              <li className="text-neutral-600">Sonntag: Geschlossen</li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 mt-12 pt-6 border-t border-neutral-800 text-center md:flex md:justify-between text-[10px] text-neutral-500 font-mono uppercase tracking-wider">
          <p>&copy; {new Date().getFullYear()} Hair Family – Der Friseur. Webdesign by Falk Stange.</p>
          <div className="space-x-4 mt-2 md:mt-0">
            <button onClick={() => setModalType("imprint")} className="hover:text-white">Impressum</button>
            <button onClick={() => setModalType("privacy")} className="hover:text-white">Datenschutz</button>
          </div>
        </div>
      </footer>

      {/* Modals for Imprint and Privacy Statement */}
      {modalType && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white text-neutral-900 p-6 max-w-md w-full border-2 border-neutral-900 relative shadow-2xl max-h-[85vh] overflow-y-auto text-xs text-left space-y-3">
            <button onClick={() => setModalType(null)} className="absolute top-4 right-4 text-neutral-400 hover:text-black"><X className="w-4 h-4" /></button>
            {modalType === "imprint" ? (
              <>
                <h3 className="font-serif text-lg font-bold border-b pb-2">Impressum</h3>
                <p><strong>Hair Family GmbH</strong><br />Zentrale Verwaltung<br />38173 Sickte</p>
                <p><strong>Vertreten durch:</strong><br />Renate Domke</p>
                <p><strong>Kontakt:</strong><br />Mobil: 0173 / 3 08 57 74</p>
              </>
            ) : (
              <>
                <h3 className="font-serif text-lg font-bold border-b pb-2">Datenschutzerklärung</h3>
                <p>Die Nutzung dieses Anfrageformulars erfolgt auf freiwilliger Basis. Alle erhobenen personenbezogenen Kundendaten werden verschlüsselt verarbeitet und ausschließlich zur persönlichen Terminabsprache verwendet. Eine Weitergabe an unbefugte Dritte ist ausgeschlossen.</p>
              </>
            )}
            <div className="pt-2 text-right"><button onClick={() => setModalType(null)} className="px-4 py-2 bg-neutral-900 text-white font-mono uppercase tracking-widest font-bold">Verstanden</button></div>
          </div>
        </div>
      )}

    </div>
  );
}
