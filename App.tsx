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
  FileText, 
  Trash, 
  Menu, 
  X,
  Plus
} from "lucide-react";

// Types for structural data
interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  notes?: string;
  createdAt: string;
}

// Seed data for leads to make the dashboard look realistic on first mount
const DEFAULT_LEADS: Lead[] = [
  {
    id: "lead-1",
    name: "Sophie Binder",
    email: "sophie.b@outlooks.de",
    phone: "0172 9876543",
    service: "Balayage Premier & Glossing",
    date: "2026-06-12",
    time: "10:30",
    notes: "Wünsche mir einen sehr natürlichen Verlauf.",
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
  {
    id: "lead-2",
    name: "Maximilian K.",
    email: "max.koenig@gmail.com",
    phone: "0151 12345678",
    service: "Couture Cut & Finish",
    date: "2026-06-15",
    time: "14:00",
    notes: "Nur Spitzenschnitt und Kopfmassage.",
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
  }
];

export default function App() {
  // Mobile menu state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // CTA Interactive Booking form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "Balayage Premier & Glossing",
    date: "",
    time: "10:00",
    notes: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [validationError, setValidationError] = useState("");

  // Storage and SME leads dashboard visibility
  const [leads, setLeads] = useState<Lead[]>([]);
  const [showDashboard, setShowDashboard] = useState(false);
  const [modalType, setModalType] = useState<"imprint" | "privacy" | null>(null);

  // Initialize and load saved leads from localStorage
  useEffect(() => {
    const savedLeads = localStorage.getItem("avantgarde_leads");
    if (savedLeads) {
      try {
        setLeads(JSON.parse(savedLeads));
      } catch (e) {
        setLeads(DEFAULT_LEADS);
      }
    } else {
      localStorage.setItem("avantgarde_leads", JSON.stringify(DEFAULT_LEADS));
      setLeads(DEFAULT_LEADS);
    }
  }, []);

  // Form input change handler
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (validationError) setValidationError(""); // Clear error upon typing
  };

  // Form submission handler (Action-oriented, saves locally so KMU can manage)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Quick validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim() || !formData.date) {
      setValidationError("Bitte alle Pflichtfelder (*) vollständig ausfüllen.");
      return;
    }

    setIsSubmitting(true);

    // Simulate reliable CRM capture
    setTimeout(() => {
      const newLead: Lead = {
        id: "lead-" + Date.now(),
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        service: formData.service,
        date: formData.date,
        time: formData.time,
        notes: formData.notes,
        createdAt: new Date().toISOString()
      };

      const updatedLeads = [newLead, ...leads];
      setLeads(updatedLeads);
      localStorage.setItem("avantgarde_leads", JSON.stringify(updatedLeads));

      setIsSubmitting(false);
      setSubmitSuccess(true);
      
      // Reset only fields, preserve some choice
      setFormData({
        name: "",
        email: "",
        phone: "",
        service: "Balayage Premier & Glossing",
        date: "",
        time: "10:00",
        notes: ""
      });
    }, 1000);
  };

  // Delete lead (for dashboard utility)
  const handleDeleteLead = (id: string) => {
    const updated = leads.filter(l => l.id !== id);
    setLeads(updated);
    localStorage.setItem("avantgarde_leads", JSON.stringify(updated));
  };

  // Scroll helper to bypass complicated navigation setup
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-[#1C1A17] font-sans antialiased selection:bg-[#B45309]/10 selection:text-[#B45309] relative">
      
      {/* 1. Header / Navigation */}
      <header id="top-header" className="sticky top-0 z-40 bg-[#FAF9F5]/90 backdrop-blur-md border-b border-[#EAE9E4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex justify-between items-center">
          
          {/* Logo Brand with a custom geometric/typographic mark */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-10 h-10 border border-[#1C1A17] flex items-center justify-center font-serif text-lg font-bold tracking-widest text-[#1C1A17]">
              A
            </div>
            <div>
              <span className="font-serif text-lg font-bold tracking-[0.2em] block leading-none">AVANTGARDE</span>
              <span className="text-[10px] font-mono tracking-[0.3em] font-medium text-amber-800 uppercase block mt-1">Hair & Art</span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex space-x-10 items-center">
            <button 
              onClick={() => scrollTo("promise")} 
              className="text-xs uppercase tracking-widest font-medium text-neutral-600 hover:text-[#1C1A17] transition-colors focus:outline-none"
            >
              Versprechen
            </button>
            <button 
              onClick={() => scrollTo("details")} 
              className="text-xs uppercase tracking-widest font-medium text-neutral-600 hover:text-[#1C1A17] transition-colors focus:outline-none"
            >
              Leistungen
            </button>
            <button 
              onClick={() => scrollTo("social-proof")} 
              className="text-xs uppercase tracking-widest font-medium text-neutral-600 hover:text-[#1C1A17] transition-colors focus:outline-none"
            >
              Kundenstimmen
            </button>
          </nav>

          {/* Desktop Call-To-Action Button */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={() => scrollTo("booking-form")}
              className="px-5 py-2.5 bg-[#1C1A17] text-white text-xs uppercase tracking-widest font-semibold hover:bg-amber-800 focus:bg-amber-800 focus:outline-none transition-all duration-300"
              id="header-cta"
            >
              Termin anfragen
            </button>
          </div>

          {/* Mobile Menu Icon Toggle */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-[#1C1A17] p-2 hover:bg-neutral-100 rounded focus:outline-none"
              aria-label="Hauptmenü"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Panel */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[#EAE9E4] bg-[#FAF9F5] py-4 px-6 space-y-4 shadow-sm animate-fade-in">
            <button 
              onClick={() => scrollTo("promise")} 
              className="block w-full text-left py-2 text-xs uppercase tracking-widest font-bold text-neutral-600"
            >
              Versprechen
            </button>
            <button 
              onClick={() => scrollTo("details")} 
              className="block w-full text-left py-2 text-xs uppercase tracking-widest font-bold text-neutral-600"
            >
              Leistungen
            </button>
            <button 
              onClick={() => scrollTo("social-proof")} 
              className="block w-full text-left py-2 text-xs uppercase tracking-widest font-bold text-neutral-600"
            >
              Kundenstimmen
            </button>
            <hr className="border-[#EAE9E4]" />
            <button
              onClick={() => scrollTo("booking-form")}
              className="w-full text-center block py-3 bg-[#1C1A17] text-white text-xs uppercase tracking-widest font-bold"
            >
              Jetzt Termin anfragen
            </button>
          </div>
        )}
      </header>

      {/* 2. Hero-Sektion mit starkem Hook & Subheadline */}
      <section id="hero" className="py-12 md:py-20 lg:py-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column: Offer / Text Copy */}
            <div className="lg:col-span-7 space-y-8 text-left">
              
              <div className="inline-flex items-center space-x-2 bg-amber-50 border border-amber-200/50 px-3 py-1 rounded-full">
                <Sparkles className="w-4 h-4 text-amber-700" />
                <span className="text-[10px] font-mono tracking-widest uppercase text-amber-800 font-bold">Hamburgs exklusivste Haarkunst</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl text-[#1C1A17] leading-[1.1] tracking-tight font-bold">
                Dein Premium-Haarschnitt & Balayage von Meisterhand. 
                <span className="block mt-2 text-amber-800 font-semibold italic text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif">
                  Ohne monatelange Wartezeit.
                </span>
              </h1>

              <p className="text-sm sm:text-base text-neutral-600 max-w-xl leading-relaxed">
                Wir reduzieren deine Wartezeit auf ein Minimum und heben dein Haar-Erlebnis auf ein neues Level. Keine standardisierten Fließbänder, sondern maßgeschneiderte Pariser Schnitttechnik und erstklassige biologische Coloration.
              </p>

              {/* Hormozi High-Conversion CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 pt-2">
                <button
                  onClick={() => scrollTo("booking-form")}
                  className="px-8 py-4 bg-[#1C1A17] text-white text-xs uppercase tracking-widest font-semibold hover:bg-amber-800 transition-all duration-300 shadow-md text-center"
                >
                  Termin online anfragen
                </button>
                <a
                  href="tel:+49401234567"
                  className="px-8 py-4 border border-[#1C1A17] text-[#1C1A17] text-xs uppercase tracking-widest font-semibold hover:bg-neutral-100 transition-all duration-300 text-center flex items-center justify-center space-x-2"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Direkt anrufen: +49 40 1234567</span>
                </a>
              </div>

              {/* Hormozi Trust Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-[#EAE9E4]">
                <div className="flex items-center space-x-2.5">
                  <div className="rounded-full bg-emerald-50 p-1">
                    <Check className="w-4 h-4 text-emerald-600" />
                  </div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-500">100% Zufrieden</span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <div className="rounded-full bg-emerald-50 p-1">
                    <Check className="w-4 h-4 text-emerald-600" />
                  </div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-500">Sofort-Rückmeldung</span>
                </div>
                <div className="flex items-center space-x-2.5 col-span-2 sm:col-span-1">
                  <div className="rounded-full bg-emerald-50 p-1">
                    <Check className="w-4 h-4 text-emerald-600" />
                  </div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-500">Spezial-Coloristen</span>
                </div>
              </div>

            </div>

            {/* Right Column: Hero Showcase Image Layout inspired by upscale magazines */}
            <div className="lg:col-span-5 relative">
              <div className="relative z-10 w-full aspect-[4/5] overflow-hidden shadow-2xl border-4 border-white bg-neutral-200">
                <img
                  src="https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&q=80&w=1200"
                  alt="High-end Balayage und präziser Schnitt im Avantgarde Haarsalon"
                  className="w-full h-full object-cover grayscale-[15%] hover:scale-105 duration-700 transition-transform"
                  referrerPolicy="no-referrer"
                />
                
                {/* Floating Micro Badge overlay */}
                <div className="absolute bottom-6 left-6 right-6 bg-[#FAF9F5]/95 backdrop-blur-sm p-4 border border-[#EAE9E4] flex justify-between items-center">
                  <div>
                    <p className="text-[10px] font-mono uppercase text-amber-800 tracking-widest font-bold">Exklusiv-Zertifikat</p>
                    <p className="text-xs uppercase font-bold tracking-wider text-[#1C1A17] mt-0.5">L'Oréal Color Expert</p>
                  </div>
                  <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                </div>
              </div>

              {/* Backing structural geometric line elements */}
              <div className="absolute -top-6 -left-6 w-32 h-32 border-t border-l border-neutral-300 -z-10" />
              <div className="absolute -bottom-6 -right-6 w-32 h-32 border-b border-r border-[#1C1A17]/20 -z-10" />
            </div>

          </div>
        </div>
      </section>

      {/* 3. Promise of Value (Klares, ehrliches Wertversprechen) */}
      <section id="promise" className="bg-[#1C1A17] text-white py-16 md:py-24 relative overflow-hidden">
        
        {/* Subtle abstract background accent */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/5 blur-3xl rounded-full pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 text-center relative z-10 space-y-8">
          
          <div className="inline-flex items-center space-x-2 border border-amber-500/20 px-3 py-1 bg-amber-500/10">
            <ShieldCheck className="w-4 h-4 text-amber-500" />
            <span className="text-[10px] font-mono tracking-widest uppercase text-amber-400 font-semibold">Das ehrliche Avantgarde Wertversprechen</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
            100% Zufriedenheidsgarantie <br className="hidden sm:inline" />
            oder du zahlst <span className="text-amber-400 italic">keinen Cent</span>.
          </h2>

          <p className="text-sm sm:text-base text-neutral-300 max-w-2xl mx-auto leading-relaxed">
            Wir stehen kompromisslos hinter unserem Friseurhandwerk. Solltest du mit deinem Haarschnitt oder deiner Coloration nicht absolut glücklich sein, korrigieren wir das Ergebnis sofort kostenfrei. Sind du und dein Umfeld immer noch nicht begeistert, erstatten wir dir den vollen Rechnungsbetrag. <strong>Keine Fragen. Keine Ausreden. Dein Vertrauen steht für uns an oberster Stelle.</strong>
          </p>

          <div className="pt-2 text-center">
            <span className="inline-block border-b border-amber-500/30 pb-1 text-xs font-mono text-amber-400 tracking-widest uppercase font-bold">
              Unterschrieben von Meister-Inhaberin Alice & Team
            </span>
          </div>

        </div>
      </section>

      {/* 4. Details zum Versprechen (2-3 konkrete, nutzenorientierte Stichpunkte) */}
      <section id="details" className="py-16 md:py-24 bg-white border-y border-[#EAE9E4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-xl mx-auto mb-16 space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-[0.25em] text-amber-800 font-bold">Unsere Kernkompetenzen</h3>
            <p className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1A17]">Was dein Salon-Erlebnis einzigartig macht</p>
            <div className="h-0.5 w-16 bg-[#1C1A17] mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
            
            {/* Benefit 1 */}
            <div className="bg-[#FAF9F5] p-8 md:p-10 border border-[#EAE9E4] flex flex-col justify-between hover:border-[#1C1A17] transition-all duration-300">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-neutral-900 text-white flex items-center justify-center mb-6">
                  <Clock className="w-6 h-6 text-amber-400" />
                </div>
                <h4 className="font-serif text-xl sm:text-2xl font-bold text-[#1C1A17]">Exklusive Einzeltermine</h4>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                  Deine Zeit ist wertvoll. Wir hassen Wartezimmer und unpünktliche Stylisten. Durch unser intelligentes Buchungskonzept buchst du ein dediziertes Zeitfenster. Die volle Aufmerksamkeit gehört ausschließlich dir und deinen Haaren. No Rush.
                </p>
              </div>
              <div className="pt-6">
                <span className="text-[10px] font-mono tracking-widest text-[#1C1A17] uppercase font-bold flex items-center">
                  0 MINUTEN WARTEZEIT <ChevronRight className="w-3.5 h-3.5 ml-1" />
                </span>
              </div>
            </div>

            {/* Benefit 2 */}
            <div className="bg-[#FAF9F5] p-8 md:p-10 border border-[#EAE9E4] flex flex-col justify-between hover:border-[#1C1A17] transition-all duration-300">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-neutral-900 text-white flex items-center justify-center mb-6">
                  <Scissors className="w-6 h-6 text-amber-400" />
                </div>
                <h4 className="font-serif text-xl sm:text-2xl font-bold text-[#1C1A17]">Meister-Balayage & Color</h4>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                  Vergiss unnatürliche Streifen oder fleckige Bleichungen. Wir beherrschen die französische Freihand-Maltechnik perfekt. Deine Babylights und dein Balayage fließen nahtlos in dein Haar ein – für einen extrem natürlichen Glow, der wochenlang hält.
                </p>
              </div>
              <div className="pt-6">
                <span className="text-[10px] font-mono tracking-widest text-[#1C1A17] uppercase font-bold flex items-center">
                  ORGANISCHES COLORIEREN <ChevronRight className="w-3.5 h-3.5 ml-1" />
                </span>
              </div>
            </div>

            {/* Benefit 3 */}
            <div className="bg-[#FAF9F5] p-8 md:p-10 border border-[#EAE9E4] flex flex-col justify-between hover:border-[#1C1A17] transition-all duration-300">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-neutral-900 text-white flex items-center justify-center mb-6">
                  <Sparkles className="w-6 h-6 text-amber-400" />
                </div>
                <h4 className="font-serif text-xl sm:text-2xl font-bold text-[#1C1A17]">Vegane Premium Care</h4>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                  Wir pflegen deine Kopfhaut und Haare nur mit zertifizierten, paraben- und sulfatfreien Wirkstoffen. Keine Mineralöle, kein Silikon-Slick. Erlebe spürbare Gesundheit vom Ansatz bis in die Spitzen und langanhaltenden Glanz nach jedem Salonbesuch.
                </p>
              </div>
              <div className="pt-6">
                <span className="text-[10px] font-mono tracking-widest text-[#1C1A17] uppercase font-bold flex items-center">
                  Premium Markenqualität <ChevronRight className="w-3.5 h-3.5 ml-1" />
                </span>
              </div>
            </div>

          </div>

          {/* Clean secondary visual asset showcase */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-[#FAF9F5] p-6 sm:p-10 border border-[#EAE9E4]">
            <div className="space-y-4">
              <span className="text-[10px] font-mono text-amber-800 uppercase tracking-widest font-bold">Hormozi-Fokus</span>
              <h3 className="font-serif text-2xl font-bold text-[#1C1A17]">Keine versteckten Materialpauschalen.</h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Kennst du die Friseure, bei denen du am Ende ein Drittel mehr zahlst als vereinbart? Bei uns gibt es das nicht. Alle Spezialprodukte, Glanzbehandlungen und Pflegemasken sind im Paketpreis ehrlichen transparent mitgeteilt.
              </p>
              <div className="inline-flex items-center space-x-2 text-[#1C1A17] font-semibold text-xs uppercase tracking-widest mt-2 hover:text-amber-800 transition-colors cursor-pointer" onClick={() => scrollTo("booking-form")}>
                <span>Jetzt Wunschtermin sichern</span>
                <ChevronRight className="w-4 h-4 text-amber-700" />
              </div>
            </div>
            <div className="h-64 overflow-hidden shadow-md">
              <img
                src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=1200"
                alt="Aesthetic professional hair tools and luxury salon interior in Hamburg"
                className="w-full h-full object-cover grayscale-[10%]"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

        </div>
      </section>

      {/* 5. Social Proof (Kundenstimmen & Press Mentions) */}
      <section id="social-proof" className="py-16 md:py-24 bg-[#FAF9F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          <div className="max-w-xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-amber-800 font-bold">Unabhängiger Social Proof</span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#1C1A17]">Was unsere Kundinnen über uns sagen</h2>
            <p className="text-sm text-neutral-500 leading-relaxed">
              Über 280 Fünf-Sterne-Bewertungen auf Treatwell und Google sprechen für sich. Hier sind drei echte Stimmen.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            
            {/* Testimonial 1 */}
            <div className="bg-white p-8 border border-[#EAE9E4] shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex space-x-1 text-amber-500 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-500 text-amber-500" />
                  ))}
                </div>
                <p className="font-serif text-lg font-medium text-[#1C1A17] leading-snug mb-4">
                  „Endlich ein Salon, der kühles Blond und Balayage versteht! Nahtlose Übergänge ohne Gelbstich.“
                </p>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                  Ich war zuvor bei 3 renommierten Salons in Hamburg, doch niemand hat meine Erwartungen erfüllt. Alice hat sich extrem viel Zeit genommen. Das Ergebnis ist umwerfend natürlich. Absolute Empfehlung!
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-[#FAF9F5] flex justify-between items-center">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-[#1C1A17]">Katharina Meyer</p>
                  <p className="text-[10px] font-mono text-neutral-400 mt-1">Eimsbüttel, Hamburg</p>
                </div>
                <span className="text-[10px] text-amber-800 font-mono tracking-widest font-semibold uppercase bg-amber-50 px-2 py-1">Bestätigt</span>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white p-8 border border-[#EAE9E4] shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex space-x-1 text-amber-500 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-500 text-amber-500" />
                  ))}
                </div>
                <p className="font-serif text-lg font-medium text-[#1C1A17] leading-snug mb-4">
                  „Die Termintreue ist eine absolute Wohltat. Null Hektik, 100% Entspannung.“
                </p>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                  Ich liebe das minimalistische Ambiente. Kein ständiges Kaffeemaschinen-Summen oder fünf Friseure, die durcheinander schreien. Ich habe gearbeitet während der Farbe einwirkte und habe mich fabelhaft betreut gefühlt.
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-[#FAF9F5] flex justify-between items-center">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-[#1C1A17]">Luisa von Bulow</p>
                  <p className="text-[10px] font-mono text-neutral-400 mt-1">Eppendorf, Hamburg</p>
                </div>
                <span className="text-[10px] text-amber-800 font-mono tracking-widest font-semibold uppercase bg-amber-50 px-2 py-1">Bestätigt</span>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white p-8 border border-[#EAE9E4] shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex space-x-1 text-amber-500 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-500 text-amber-500" />
                  ))}
                </div>
                <p className="font-serif text-lg font-medium text-[#1C1A17] leading-snug mb-4">
                  „Das ehrliche Versprechen greift wirklich - hier geht es um die Qualität, nicht um Upselling.“
                </p>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                  Sie sagten mir direkt beim Beratungsgespräch ehrlich, was für meine Haarlänge und Struktur am besten funktioniert und haben mir keine überteuerten Shampoos aufgedrängt. Ich bin extrem froh, diese Perle gefunden zu haben.
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-[#FAF9F5] flex justify-between items-center">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-[#1C1A17]">Elena Schneider</p>
                  <p className="text-[10px] font-mono text-neutral-400 mt-1">HafenCity, Hamburg</p>
                </div>
                <span className="text-[10px] text-amber-800 font-mono tracking-widest font-semibold uppercase bg-amber-50 px-2 py-1">Bestätigt</span>
              </div>
            </div>

          </div>

          {/* Minimalist monochromatic logos bar */}
          <div className="mt-16 pt-12 border-t border-[#EAE9E4]">
            <p className="text-[10px] font-mono text-neutral-400 tracking-[0.25em] uppercase mb-6">BEKANNT AUS EXKLUSIVEN MEDIEN</p>
            <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6 opacity-40 grayscale contrast-200">
              <span className="font-serif text-sm sm:text-lg tracking-[0.3em] font-semibold text-[#1C1A17]">VOGUE</span>
              <span className="font-sans text-sm sm:text-lg tracking-[0.2em] font-black text-[#1C1A17]">ELLE</span>
              <span className="font-serif text-sm sm:text-lg tracking-[0.1em] italic font-bold text-[#1C1A17]">Madame</span>
              <span className="font-sans text-sm sm:text-lg tracking-wider font-semibold text-[#1C1A17]">HAMBURGER ABENDBLATT</span>
            </div>
          </div>

        </div>
      </section>

      {/* 6. Call-to-Action (Direktes, einfaches Kontakt- oder Buchungsformular) */}
      <section id="booking-form" className="py-16 md:py-24 bg-white relative scroll-mt-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="bg-[#FAF9F5] border-2 border-[#1C1A17] p-8 md:p-12 relative">
            
            {/* Visual corner decoration accentuating premium style */}
            <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-amber-800 -mt-1 -mr-1 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-amber-800 -mb-1 -ml-1 pointer-events-none" />

            {/* Form Headline Block */}
            <div className="text-center max-w-xl mx-auto mb-10 space-y-4">
              <span className="text-xs font-mono uppercase tracking-[0.15em] text-amber-800 font-bold block">SCHNELLE ONLINE-ANFRAGE</span>
              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-[#1C1A17]">Wunschtermin unverbindlich anfragen</h2>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Trage dich in 1 Minute ein. Unser Team ruft dich innerhalb von maximal 2 Stunden zurück (während der Öffnungszeiten), um deinen Premium-Termin zu bestätigen.
              </p>
            </div>

            {validationError && (
              <div className="mb-6 p-4 bg-rose-50 border-l-4 border-rose-600 text-rose-800 text-xs sm:text-sm font-medium flex items-center space-x-2">
                <span>⚠️ {validationError}</span>
              </div>
            )}

            {submitSuccess ? (
              <div className="my-8 p-8 bg-emerald-50 border border-emerald-300 text-center space-y-4 max-w-xl mx-auto">
                <div className="w-12 h-12 bg-emerald-600 text-white flex items-center justify-center rounded-full mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-neutral-900">Anfrage erfolgreich gesendet!</h3>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                  Vielen Dank für dein Vertrauen. Wir haben deine Daten erfolgreich erfasst. Wir rufen dich unter deiner Mobilfunknummer zurück, um deinen Termin zu finalisieren.
                </p>
                <div className="pt-2">
                  <button 
                    onClick={() => setSubmitSuccess(false)}
                    className="text-xs uppercase tracking-widest font-bold underline text-amber-800 hover:text-[#1C1A17] focus:outline-none"
                  >
                    Weitere Anfrage einreichen
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Name Input */}
                  <div className="space-y-2">
                    <label htmlFor="name" className="block text-xs uppercase tracking-wider font-bold text-neutral-700">
                      Dein Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                      <input
                        type="text"
                        name="name"
                        id="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="z.B. Sophie Binder"
                        className="w-full pl-10 pr-4 py-3 bg-white border border-[#EAE9E4] text-xs sm:text-sm text-neutral-900 focus:border-[#1C1A17] focus:ring-1 focus:ring-[#1C1A17] outline-none"
                        required
                      />
                    </div>
                  </div>

                  {/* Phone Input - Crucial for local KMU return calls */}
                  <div className="space-y-2">
                    <label htmlFor="phone" className="block text-xs uppercase tracking-wider font-bold text-neutral-700">
                      Telefonnummer für Rückruf *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                      <input
                        type="tel"
                        name="phone"
                        id="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="z.B. 0172 1234567"
                        className="w-full pl-10 pr-4 py-3 bg-white border border-[#EAE9E4] text-xs sm:text-sm text-neutral-900 focus:border-[#1C1A17] focus:ring-1 focus:ring-[#1C1A17] outline-none"
                        required
                      />
                    </div>
                  </div>

                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Email Input */}
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-xs uppercase tracking-wider font-bold text-neutral-700">
                      E-Mail-Adresse *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                      <input
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="sophie@beispiel.de"
                        className="w-full pl-10 pr-4 py-3 bg-white border border-[#EAE9E4] text-xs sm:text-sm text-neutral-900 focus:border-[#1C1A17] focus:ring-1 focus:ring-[#1C1A17] outline-none"
                        required
                      />
                    </div>
                  </div>

                  {/* Dropdown for services selection */}
                  <div className="space-y-2">
                    <label htmlFor="service" className="block text-xs uppercase tracking-wider font-bold text-neutral-700">
                      Gewünschte Leistung *
                    </label>
                    <div className="relative">
                      <Scissors className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
                      <select
                        name="service"
                        id="service"
                        value={formData.service}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 bg-white border border-[#EAE9E4] text-xs sm:text-sm text-neutral-900 focus:border-[#1C1A17] focus:ring-1 focus:ring-[#1C1A17] outline-none appearance-none cursor-pointer"
                      >
                        <option value="Balayage Premier & Glossing">Balayage Premier & Glossing (ab 185€)</option>
                        <option value="Couture Cut & Finish">Couture Cut & Finish (ab 95€)</option>
                        <option value="Signature Color & Treatment">Signature Color & Treatment (ab 135€)</option>
                        <option value="Individuelle Erstberatung">Individuelle Erstberatung (30€)</option>
                      </select>
                    </div>
                  </div>

                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Date selection field */}
                  <div className="space-y-2">
                    <label htmlFor="date" className="block text-xs uppercase tracking-wider font-bold text-neutral-700">
                      Wunschdatum *
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
                      <input
                        type="date"
                        name="date"
                        id="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 bg-white border border-[#EAE9E4] text-xs sm:text-sm text-neutral-900 focus:border-[#1C1A17] focus:ring-1 focus:ring-[#1C1A17] outline-[#1C1A17] cursor-pointer"
                        required
                      />
                    </div>
                  </div>

                  {/* Preferred Time block selection */}
                  <div className="space-y-2">
                    <label htmlFor="time" className="block text-xs uppercase tracking-wider font-bold text-neutral-700">
                      Bevorzugte Tageszeit *
                    </label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
                      <select
                        name="time"
                        id="time"
                        value={formData.time}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 bg-white border border-[#EAE9E4] text-xs sm:text-sm text-neutral-900 focus:border-[#1C1A17] focus:ring-1 focus:ring-[#1C1A17] outline-[#1C1A17] cursor-pointer"
                      >
                        <option value="Vormittags (09:00 - 12:00 Uhr)">Vormittags (09:00 - 12:00 Uhr)</option>
                        <option value="Mittags (12:00 - 15:00 Uhr)">Mittags (12:00 - 15:00 Uhr)</option>
                        <option value="Nachmittags (15:00 - 18:30 Uhr)">Nachmittags (15:00 - 18:30 Uhr)</option>
                      </select>
                    </div>
                  </div>

                </div>

                {/* Additional Client notes */}
                <div className="space-y-2">
                  <label htmlFor="notes" className="block text-xs uppercase tracking-wider font-bold text-neutral-700">
                    Spezielle Wünsche oder Fragen (Optional)
                  </label>
                  <textarea
                    name="notes"
                    id="notes"
                    rows={3}
                    value={formData.notes}
                    onChange={handleInputChange}
                    placeholder="Hast du bspw. besonders dickes Haar, wünschst du bestimmte Nuancen oder spezielle vegane Pflegeprodukte?"
                    className="w-full p-4 bg-white border border-[#EAE9E4] text-xs sm:text-sm text-neutral-900 focus:border-[#1C1A17] focus:ring-1 focus:ring-[#1C1A17] outline-none resize-none"
                  ></textarea>
                </div>

                <div className="pt-4 text-center">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-[#1C1A17] text-white text-xs uppercase tracking-widest font-bold hover:bg-amber-800 disabled:bg-neutral-400 transition-all duration-300 shadow-md cursor-pointer flex items-center justify-center space-x-2"
                  >
                    {isSubmitting ? (
                      <span>Verarbeite Anfrage...</span>
                    ) : (
                      <>
                        <span>Terminanfrage unverbindlich absenden</span>
                        <ChevronRight className="w-4 h-4 text-white" />
                      </>
                    )}
                  </button>
                  <p className="text-[10px] text-neutral-400 mt-3 italic leading-relaxed">
                    Sicherheitsgarantie: Deine Daten werden streng vertraulich behandelt und ausschließlich zur persönlichen Beratung für diesen Termin verwendet. Keine Werbemails.
                  </p>
                </div>

              </form>
            )}

          </div>
        </div>
      </section>

      {/* Leads CRM Visualizer Panel for the local business prototype */}
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <div className="border border-dashed border-amber-600/50 bg-amber-50/50 p-6 text-center space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-left space-y-1">
              <span className="inline-block bg-amber-700 text-white text-[9px] font-mono uppercase px-2 py-0.5 rounded font-bold">
                KMU-Inhaber Feature
              </span>
              <h4 className="text-xs sm:text-sm font-bold text-[#1C1A17]">Interaktiver CRM-Leads Visualisierer (Prototyping)</h4>
              <p className="text-[11px] text-neutral-500 leading-none">
                Teste das Formular oben! Alle Anfragen werden live im Browser-Speicher erfasst.
              </p>
            </div>
            <button
              onClick={() => setShowDashboard(!showDashboard)}
              className="text-xs uppercase font-bold tracking-wider px-4 py-2 bg-amber-800 text-white hover:bg-neutral-900 transition-colors focus:outline-none"
            >
              {showDashboard ? "Leads verbergen" : "Leads anzeigen (" + leads.length + ")"}
            </button>
          </div>

          {showDashboard && (
            <div className="pt-6 border-t border-amber-200/50 text-left space-y-4 animate-fade-in">
              {leads.length === 0 ? (
                <p className="text-xs text-neutral-500 italic text-center py-4">Noch keine Anfragen empfangen. Fülle das Kontaktformular oben aus!</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-neutral-200 text-xs text-neutral-800 bg-white shadow-sm">
                    <thead>
                      <tr className="bg-neutral-100 text-left font-mono font-bold tracking-wider text-neutral-600 uppercase border-b border-neutral-200">
                        <th className="p-3">Empfangen</th>
                        <th className="p-3">Kunde & Telefon</th>
                        <th className="p-3">Gewünschter Service</th>
                        <th className="p-3">Wunschtermin</th>
                        <th className="p-3 text-right">Aktion</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-200">
                      {leads.map((lead) => (
                        <tr key={lead.id} className="hover:bg-neutral-50">
                          <td className="p-3 whitespace-nowrap text-[10px] font-mono text-neutral-400">
                            {new Date(lead.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} ({new Date(lead.createdAt).toLocaleDateString()})
                          </td>
                          <td className="p-3">
                            <div className="font-bold text-neutral-900">{lead.name}</div>
                            <div className="text-[10px] text-neutral-500 font-mono">{lead.phone} | {lead.email}</div>
                          </td>
                          <td className="p-3 font-medium text-amber-900">{lead.service}</td>
                          <td className="p-3 whitespace-nowrap font-mono font-medium">
                            {lead.date} &mdash; {lead.time}
                          </td>
                          <td className="p-3 text-right whitespace-nowrap">
                            <button
                              onClick={() => handleDeleteLead(lead.id)}
                              className="text-rose-600 hover:text-rose-900 p-1 bg-rose-50 hover:bg-rose-100 transition-colors inline-flex items-center justify-center"
                              title="Lead löschen"
                            >
                              <Trash className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="flex justify-between items-center text-[10px] font-mono text-neutral-400 mt-2 px-1">
                    <span>Hinweis: Daten sind nur in diesem Browser-Sandbox (localStorage) gespeichert.</span>
                    <button 
                      onClick={() => {
                        localStorage.removeItem("avantgarde_leads");
                        setLeads([]);
                      }} 
                      className="text-rose-600 font-bold hover:underline uppercase"
                    >
                      Alle löschen
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* 7. Footer (Kompakte Rechtshinweise & Öffnungszeiten) */}
      <footer className="bg-[#1C1A17] text-white/90 pt-16 pb-8 border-t border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-12 text-left">
          
          {/* Brand Info */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 border border-white flex items-center justify-center font-serif text-sm font-bold tracking-widest text-[#FFFFFF]">
                A
              </div>
              <span className="font-serif text-base font-bold tracking-[0.25em] text-white">AVANTGARDE</span>
            </div>
            <p className="text-xs text-neutral-400 max-w-sm leading-relaxed">
              Exklusiver Friseursalon spezialisiert auf handgemaltes Balayage, naturgetreue Farben und typgerechte Couture-Haarschnitte. 
            </p>
            <div className="flex items-center space-x-3 pt-2">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-neutral-800 hover:bg-amber-800 transition-colors text-white" aria-label="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="tel:+49401234567" className="p-2 bg-neutral-800 hover:bg-amber-800 transition-colors text-white" aria-label="Telefon">
                <Phone className="w-4 h-4" />
              </a>
              <a href="#booking-form" className="p-2 bg-neutral-800 hover:bg-amber-800 transition-colors text-white" aria-label="Anfahrt">
                <MapPin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Contact Details & Address */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs uppercase font-mono tracking-widest text-amber-400 font-bold">KONTAKT & ANFAHRT</h4>
            <ul className="space-y-2.5 text-xs text-neutral-300">
              <li className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>Neuer Wall 42, 20354 Hamburg (Deutschland)</span>
              </li>
              <li className="flex items-start space-x-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>+49 40 1234567</span>
              </li>
              <li className="flex items-start space-x-2">
                <Mail className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>termine@avantgarde-hair.de</span>
              </li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs uppercase font-mono tracking-widest text-amber-400 font-bold">ÖFFNUNGSZEITEN</h4>
            <ul className="space-y-2 text-xs text-neutral-300 font-mono">
              <li className="flex justify-between border-b border-neutral-800 pb-1.5">
                <span>Montag - Freitag:</span>
                <span>09:00 - 18:30 Uhr</span>
              </li>
              <li className="flex justify-between border-b border-neutral-800 pb-1.5">
                <span>Samstag:</span>
                <span>09:00 - 15:00 Uhr</span>
              </li>
              <li className="flex justify-between text-neutral-500">
                <span>Sonntag & Feiertage:</span>
                <span>Geschlossen</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Legal Links Footer Area */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-8 border-t border-neutral-800 text-center md:flex md:justify-between md:items-center">
          <p className="text-[10px] text-neutral-500">
            &copy; {new Date().getFullYear()} Avantgarde Hair & Art Studio Hamburg. Alle Rechte vorbehalten.
          </p>
          <div className="flex justify-center space-x-6 mt-4 md:mt-0 text-[10px] text-neutral-400 uppercase tracking-widest">
            <button onClick={() => setModalType("imprint")} className="hover:text-amber-400">Impressum</button>
            <span>&bull;</span>
            <button onClick={() => setModalType("privacy")} className="hover:text-amber-400">Datenschutz</button>
          </div>
        </div>
      </footer>

      {/* Elegant minimalist Legal overlay Modal */}
      {modalType && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white text-[#1C1A17] p-8 max-w-lg w-full border-2 border-[#1C1A17] relative shadow-2xl max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => setModalType(null)} 
              className="absolute top-4 right-4 text-neutral-500 hover:text-[#1C1A17] transition-colors"
              aria-label="Schließen"
            >
              <X className="w-5 h-5" />
            </button>
            
            {modalType === "imprint" ? (
              <div className="space-y-4 text-sm text-left">
                <h3 className="font-serif text-2xl font-bold tracking-tight border-b border-neutral-200 pb-2">Impressum</h3>
                <p className="text-xs uppercase tracking-wider font-mono text-neutral-400 font-semibold">Angaben gemäß § 5 TMG</p>
                <div className="space-y-2 text-xs leading-relaxed text-neutral-700">
                  <p><strong>Avantgarde Hair & Art GmbH</strong></p>
                  <p>Neuer Wall 42<br />20354 Hamburg</p>
                  <p><strong>Vertreten durch:</strong><br />Geschäftsführerin Alice Schneider</p>
                  <p><strong>Kontakt:</strong><br />Telefon: +49 40 1234567<br />E-Mail: kontakt@avantgarde-hair.de</p>
                  <p><strong>Registereintrag:</strong><br />Eintragung im Handelsregister.<br />Registergericht: Amtsgericht Hamburg<br />Registernummer: HRB 98765</p>
                  <p><strong>Umsatzsteuer-ID:</strong><br />Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz: DE123456789</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4 text-sm text-left">
                <h3 className="font-serif text-2xl font-bold tracking-tight border-b border-neutral-200 pb-2">Datenschutzerklärung</h3>
                <p className="text-xs uppercase tracking-wider font-mono text-neutral-400 font-semibold">Umgang mit Ihren Anfragedaten</p>
                <div className="space-y-2 text-xs leading-relaxed text-neutral-700">
                  <p><strong>1. Erhebung und Speicherung personenbezogener Daten</strong></p>
                  <p>Wenn Sie unser Buchungs-Anfrageformular nutzen, erfassen wir die von Ihnen eingegebenen Daten (Name, Telefonnummer, E-Mail-Adresse, Servicepräferenz, Datum & Tageszeit) ausschließlich zum Zwecke der Kontaktaufnahme zur Terminabstimmung.</p>
                  <p><strong>2. Weitergabe von Daten</strong></p>
                  <p>Ihre personenbezogenen Daten werden streng vertraulich behandelt und zu keinem Zeitpunkt an unbefugte Dritte weitergegeben.</p>
                  <p><strong>3. Ihre Rechte (Auskunft & Löschung)</strong></p>
                  <p>Sie haben jederzeit das Recht auf unentgeltliche Auskunft über die bei uns gespeicherten personenbezogenen Daten. Zur Berichtigung oder Löschung Ihrer Daten kontaktieren Sie uns unter datenschutz@avantgarde-hair.de.</p>
                </div>
              </div>
            )}

            <div className="mt-8 pt-4 border-t border-neutral-200 flex justify-end">
              <button 
                onClick={() => setModalType(null)} 
                className="px-4 py-2 bg-[#1C1A17] text-white text-xs uppercase tracking-widest font-bold hover:bg-amber-800 transition-colors"
              >
                Verstanden
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
