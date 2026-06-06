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
  Users,
  TrendingUp,
  Award
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
  "Couture Cut & Finish Expert",
  "Premium Balayage & High-Glossing",
  "Organic Deep Color Treatment",
  "Complete Style Transformation"
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
    service: "Couture Cut & Finish Expert",
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
        service: "Couture Cut & Finish Expert",
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
    <div className="min-h-screen bg-white text-neutral-900 font-sans antialiased selection:bg-[#D32F2F]/10 selection:text-[#D32F2F] overflow-x-hidden">
      
      {/* Custom Keyframe Animations injected natively */}
      <style>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.15; }
          50% { opacity: 0.3; }
        }
        @keyframes slide-track {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-float { animation: float 4s ease-in-out infinite; }
        .animate-pulse-slow { animation: pulse-slow 6s ease-in-out infinite; }
        .animate-marquee { animation: slide-track 25s linear infinite; }
      `}</style>

      {/* Top Bar Indicator with subtle pulse layout */}
      <div className="w-full bg-[#D32F2F] text-white text-[10px] md:text-xs py-2.5 px-4 text-center tracking-widest font-mono uppercase font-black sticky top-0 z-50 shadow-sm">
        <span className="inline-block relative">
          ⚡ NEU: 24/7 ONLINE-TERMINANFRAGE FÜR ALLE STANDORTE AKTIV
        </span>
      </div>

      {/* High-End Navigation Header */}
      <header className="w-full bg-white/80 backdrop-blur-xl border-b border-neutral-100 z-40 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-24 flex justify-between items-center">
          
          <div className="flex items-center space-x-3 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-11 h-11 bg-[#D32F2F] transition-transform duration-500 group-hover:rotate-12 flex items-center justify-center text-white font-serif text-xl font-black">
              HF
            </div>
            <div>
              <span className="font-serif text-2xl font-black tracking-tighter block leading-none transition-colors duration-300 group-hover:text-[#D32F2F]">HAIR FAMILY</span>
              <span className="text-[9px] font-mono tracking-[0.25em] font-bold text-[#D32F2F] uppercase block mt-1">DER MEISTER-FRISEUR</span>
            </div>
          </div>

          <nav className="hidden md:flex space-x-8 items-center font-mono text-xs uppercase tracking-widest font-bold">
            <button onClick={() => scrollTo("promise")} className="relative text-neutral-600 hover:text-neutral-900 transition-colors after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#D32F2F] hover:after:w-full after:transition-all pb-1">Versprechen</button>
            <button onClick={() => scrollTo("details")} className="relative text-neutral-600 hover:text-neutral-900 transition-colors after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#D32F2F] hover:after:w-full after:transition-all pb-1">Leistungen</button>
            <button onClick={() => scrollTo("social-proof")} className="relative text-neutral-600 hover:text-neutral-900 transition-colors after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#D32F2F] hover:after:w-full after:transition-all pb-1">Kundenstimmen</button>
            <button onClick={() => scrollTo("career")} className="text-white bg-[#D32F2F] px-4 py-1.5 rounded-full text-[10px] transform hover:scale-105 hover:bg-neutral-900 transition-all shadow-sm">💼 Karriere</button>
          </nav>

          <div className="hidden lg:block">
            <button onClick={() => scrollTo("booking-form")} className="px-6 py-3.5 bg-neutral-900 text-white text-xs font-mono uppercase tracking-widest font-black rounded-none shadow-md hover:bg-[#D32F2F] hover:-translate-y-0.5 transition-all duration-300">
              Termin anfragen
            </button>
          </div>

          <div className="flex md:hidden">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-neutral-900">
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-neutral-100 bg-white/95 backdrop-blur-lg py-5 px-6 space-y-4 font-mono text-xs uppercase tracking-widest shadow-xl">
            <button onClick={() => scrollTo("promise")} className="block w-full text-left py-2 text-neutral-600">Versprechen</button>
            <button onClick={() => scrollTo("details")} className="block w-full text-left py-2 text-neutral-600">Leistungen</button>
            <button onClick={() => scrollTo("social-proof")} className="block w-full text-left py-2 text-neutral-600">Kundenstimmen</button>
            <button onClick={() => scrollTo("career")} className="block w-full text-left py-2 text-[#D32F2F] font-bold">💼 Karriere</button>
            <hr className="border-neutral-200" />
            <button onClick={() => scrollTo("booking-form")} className="w-full text-center block py-4 bg-[#D32F2F] text-white font-black tracking-widest">Jetzt Termin anfragen</button>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section id="hero" className="relative py-16 md:py-28 bg-white overflow-hidden">
        {/* Glow effect background blur decoration */}
        <div className="absolute top-1/4 right-0 w-80 h-80 bg-red-500/10 rounded-full blur-[120px] pointer-events-none animate-pulse-slow" />
        <div className="absolute bottom-10 left-10 w-60 h-60 bg-neutral-200/50 rounded-full blur-[100px] pointer-events-none animate-pulse-slow" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            <div className="lg:col-span-7 space-y-8 text-left">
              <div className="inline-flex items-center space-x-2 bg-neutral-50 border border-neutral-200 pl-2 pr-4 py-1.5 rounded-full transition-transform duration-300 hover:scale-102">
                <span className="bg-[#D32F2F] text-white text-[9px] font-mono uppercase px-2 py-0.5 font-bold rounded-full">Exklusiv</span>
                <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-600 font-bold">5x in der Region Braunschweig</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl text-neutral-900 leading-[1.1] tracking-tighter font-black">
                Dein High-End Look. <br />
                <span className="relative inline-block text-[#D32F2F] mt-2 block font-serif font-black italic">
                  Perfektioniert ohne Kompromisse.
                </span>
              </h1>

              <p className="text-sm sm:text-base md:text-lg text-neutral-500 max-w-xl leading-relaxed font-light">
                Erlebe absolute handwerkliche Präzision, brillante Freihand-Farbverläufe und exklusive Treatments. Ohne unendliche Wartezeiten, maßgeschneidert auf deine Persönlichkeit.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <button onClick={() => scrollTo("booking-form")} className="px-8 py-4.5 bg-neutral-900 hover:bg-[#D32F2F] text-white font-mono text-xs uppercase tracking-widest font-black transition-all duration-300 text-center shadow-lg hover:-translate-y-1">
                  Wunschtermin online anfragen
                </button>
                <button onClick={() => scrollTo("details")} className="px-8 py-4.5 border border-neutral-200 hover:bg-neutral-50 text-neutral-800 font-mono text-xs uppercase tracking-widest font-black transition-all duration-300 text-center flex items-center justify-center gap-2 group">
                  <span>Unsere Salons</span>
                  <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 text-[#D32F2F]" />
                </button>
              </div>

              {/* Minimalist Micro Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-neutral-100 font-mono text-left">
                <div className="space-y-1">
                  <span className="block text-2xl md:text-3xl font-black text-[#D32F2F]">5</span>
                  <span className="block text-[9px] uppercase tracking-widest text-neutral-400 font-bold">Salons vor Ort</span>
                </div>
                <div className="space-y-1">
                  <span className="block text-2xl md:text-3xl font-black text-neutral-900">100%</span>
                  <span className="block text-[9px] uppercase tracking-widest text-neutral-400 font-bold">Transparenz</span>
                </div>
                <div className="space-y-1">
                  <span className="block text-2xl md:text-3xl font-black text-neutral-900">0 min</span>
                  <span className="block text-[9px] uppercase tracking-widest text-neutral-400 font-bold">Wartezeit</span>
                </div>
              </div>
            </div>

            {/* Asymmetric Graphic Design Frame Stack with Hover Tilt Effect */}
            <div className="lg:col-span-5 relative flex justify-center items-center">
              <div className="relative w-full max-w-[380px] aspect-[4/5] bg-neutral-50 shadow-2xl transition-all duration-500 hover:scale-[1.02] border border-neutral-100 p-3 group">
                <div className="w-full h-full overflow-hidden relative">
                  <img
                    src="https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&q=80&w=600"
                    alt="Luxury Balayage Artwork"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 group-hover:rotate-1"
                  />
                  <div className="absolute inset-0 bg-neutral-900/5 transition-opacity group-hover:opacity-0" />
                </div>
                
                {/* Float-Card Detail overlay */}
                <div className="absolute -bottom-5 -left-5 bg-white p-4 border border-neutral-100 shadow-xl max-w-[190px] text-left space-y-1 animate-float">
                  <div className="flex text-red-600"><Star className="w-3.5 h-3.5 fill-current" /> <Star className="w-3.5 h-3.5 fill-current" /> <Star className="w-3.5 h-3.5 fill-current" /></div>
                  <p className="font-serif font-bold text-xs">Exklusive Goldwell Curation</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Infinte Loop Marquee Text effect for modern corporate impact */}
      <div className="w-full bg-neutral-50 border-y border-neutral-100 py-4 overflow-hidden flex whitespace-nowrap select-none font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] font-black text-neutral-400">
        <div className="flex animate-marquee shrink-0 space-x-12 pr-12">
          <span>KÖNIGSLUTTER • AMTSGARTEN 2</span> <span className="text-[#D32F2F]">✦</span>
          <span>SCHÖNINGEN • BURGPLATZ 5</span> <span className="text-[#D32F2F]">✦</span>
          <span>SICKTE • BAHNHOFSTRASSE 16C</span> <span className="text-[#D32F2F]">✦</span>
          <span>DESTEDT • HAUPTSTRASSE 25</span> <span className="text-[#D32F2F]">✦</span>
          <span>WEDDEL • DORFPLATZ 13</span> <span className="text-[#D32F2F]">✦</span>
        </div>
        <div className="flex animate-marquee shrink-0 space-x-12 pr-12" aria-hidden="true">
          <span>KÖNIGSLUTTER • AMTSGARTEN 2</span> <span className="text-[#D32F2F]">✦</span>
          <span>SCHÖNINGEN • BURGPLATZ 5</span> <span className="text-[#D32F2F]">✦</span>
          <span>SICKTE • BAHNHOFSTRASSE 16C</span> <span className="text-[#D32F2F]">✦</span>
          <span>DESTEDT • HAUPTSTRASSE 25</span> <span className="text-[#D32F2F]">✦</span>
          <span>WEDDEL • DORFPLATZ 13</span> <span className="text-[#D32F2F]">✦</span>
        </div>
      </div>

      {/* The Honest Promise Block */}
      <section id="promise" className="bg-neutral-900 text-white py-20 md:py-28 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-radial-gradient from-white/5 to-transparent opacity-30 pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-4 text-center space-y-8 relative z-10">
          <div className="inline-flex items-center space-x-2 border border-red-500/20 px-3 py-1 bg-[#D32F2F]/10 text-[#D32F2F] text-[10px] font-mono uppercase tracking-widest font-black rounded-sm">
            // DAS HAIR FAMILY VERSPRECHEN
          </div>
          
          <h2 className="font-serif text-3xl sm:text-5xl font-black tracking-tight leading-tight max-w-3xl mx-auto">
            Absolute Begeisterung oder kostenfreie Korrektur. <span className="text-[#D32F2F] underline decoration-wavy decoration-1 underline-offset-8 font-serif">Ohne Diskussion</span>.
          </h2>
          
          <p className="text-neutral-300 text-xs sm:text-base leading-relaxed max-w-xl mx-auto font-light">
            Wir stehen kompromisslos hinter unserem Friseurhandwerk. Solltest du mit deiner Schnitt- oder Farbanpassung nicht absolut glücklich sein, reagieren wir sofort. Dein perfektes Ergebnis steht bei uns an oberster Stelle.
          </p>

          <div className="pt-4">
            <span className="text-[10px] font-mono text-[#D32F2F] tracking-[0.25em] uppercase font-black block"> Alice Domke & das Hair Family Team</span>
          </div>
        </div>
      </section>

      {/* Details/Core Value Section with Interactive Cards */}
      <section id="details" className="py-20 md:py-32 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-xl mx-auto mb-16 space-y-2">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#D32F2F] font-black block">UNSERE CORE VALUES</span>
            <h3 className="font-serif text-3xl md:text-4xl font-black tracking-tight text-neutral-900">Was dein Hair-Erlebnis ausmacht</h3>
            <div className="h-1 w-12 bg-[#D32F2F] mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Card 1 */}
            <div className="bg-white p-8 border border-neutral-100 shadow-sm hover:shadow-2xl hover:border-neutral-200 transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-neutral-50 text-neutral-900 flex items-center justify-center transition-colors group-hover:bg-[#D32F2F] group-hover:text-white rounded-none">
                  <Clock className="w-5 h-5" />
                </div>
                <h4 className="font-serif text-xl font-black">Null-Wartezeit System</h4>
                <p className="text-neutral-500 text-xs sm:text-sm leading-relaxed font-light">Deine Zeit ist kostbar. Durch unsere präzise getakteten Einzel-Slots garantieren wir minimale Aufenthalte im Wartebereich. Du kommst an und bist sofort an der Reihe.</p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-8 border border-neutral-100 shadow-sm hover:shadow-2xl hover:border-neutral-200 transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-neutral-50 text-neutral-900 flex items-center justify-center transition-colors group-hover:bg-[#D32F2F] group-hover:text-white rounded-none">
                  <Scissors className="w-5 h-5" />
                </div>
                <h4 className="font-serif text-xl font-black">Color & Blend Excellence</h4>
                <p className="text-neutral-500 text-xs sm:text-sm leading-relaxed font-light">Keine blockhaften Balken oder Streifen. Unsere Stylisten beherrschen nahtlose Balayage-Verläufe und High-Glossing Techniken für glänzende, gesunde Reflexe.</p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-8 border border-neutral-100 shadow-sm hover:shadow-2xl hover:border-neutral-200 transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-neutral-50 text-neutral-900 flex items-center justify-center transition-colors group-hover:bg-[#D32F2F] group-hover:text-white rounded-none">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h4 className="font-serif text-xl font-black">100% Transparente Preise</h4>
                <p className="text-neutral-500 text-xs sm:text-sm leading-relaxed font-light">Wir kommunizieren Paket-Festpreise ehrlich vorab. Keine versteckten Pauschalen für Handtücher, Spezialshampoos oder Pflegeöle an der Kasse.</p>
              </div>
            </div>

          </div>

          {/* Asymmetric Secondary Info-Split Row */}
          <div className="mt-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-neutral-50 p-6 sm:p-12 border border-neutral-100 relative">
            <div className="lg:col-span-7 space-y-4 text-left">
              <span className="text-[10px] font-mono font-bold uppercase text-[#D32F2F] tracking-widest block">// PREMIUM STANDARDS</span>
              <h3 className="font-serif text-2xl sm:text-3xl font-black text-neutral-900">Zertifizierte Wirkstoffpflege für deine Kopfhaut</h3>
              <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed font-light">
                Wir nutzen in allen 5 Salons ausschließlich ammoniakfreie, vegane Premium-Care Produkte von Kao Goldwell. Das schont die Haarstruktur nachhaltig, verhindert Irritationen auf der Kopfhaut und sorgt für ein langanhaltendes, brillantes Farbergebnis.
              </p>
              <div onClick={() => scrollTo("booking-form")} className="inline-flex items-center space-x-2 text-xs font-mono font-bold uppercase tracking-widest text-neutral-900 hover:text-[#D32F2F] transition-colors pt-2 cursor-pointer group">
                <span>Jetzt Wunschslot sichern</span>
                <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </div>
            <div className="lg:col-span-5 h-72 w-full overflow-hidden shadow-lg border border-white">
              <img
                src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=600"
                alt="Aesthetic Hair Studio Setup"
                className="w-full h-full object-cover grayscale transition-all duration-500 hover:grayscale-0"
              />
            </div>
          </div>

        </div>
      </section>

      {/* Social Proof Review Testimonials */}
      <section id="social-proof" className="py-20 bg-neutral-50 border-y border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          <div className="max-w-xl mx-auto mb-16 space-y-2">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#D32F2F] font-black block">RECHTSKONFORME REALTÄT</span>
            <h2 className="font-serif text-3xl font-black tracking-tight text-neutral-900">Erfahrungen aus den Salons</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            
            <div className="bg-white p-8 border border-neutral-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex text-red-600">{[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}</div>
                <p className="font-serif text-base font-bold text-neutral-900">„Perfektes Blond in Sickte!“</p>
                <p className="text-neutral-500 text-xs sm:text-sm leading-relaxed font-light">Ich war super skeptisch wegen meinen feinen Haaren, aber das Glossing und der Übergang sind traumhaft natürlich geworden. Der Salon in Sickte ist zudem mega modern eingerichtet.</p>
              </div>
              <span className="block text-[10px] font-mono text-neutral-400 mt-6 tracking-wider font-bold uppercase">// KATHARINA M., SALON SICKTE</span>
            </div>

            <div className="bg-white p-8 border border-neutral-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex text-red-600">{[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}</div>
                <p className="font-serif text-base font-bold text-neutral-900">„Keine Waritzeiten mehr.“</p>
                <p className="text-neutral-500 text-xs sm:text-sm leading-relaxed font-light">In Königslutter klappt das Online-System perfekt. Ich kam pünktlich an, wurde sofort empfangen und unfassbar gut beraten. Absolut empfehlenswert.</p>
              </div>
              <span className="block text-[10px] font-mono text-neutral-400 mt-6 tracking-wider font-bold uppercase">// LUISA B., SALON KÖNIGSLUTTER</span>
            </div>

            <div className="bg-white p-8 border border-neutral-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex text-red-600">{[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}</div>
                <p className="font-serif text-base font-bold text-neutral-900">„Ehrliche, direkte Beratung.“</p>
                <p className="text-neutral-500 text-xs sm:text-sm leading-relaxed font-light">Es wird einem in Schöningen nichts unnötig aufgedrängt. Es wird genau das gemacht, was zum Typ passt. Der Paketpreis stand vorher fest. Großartig!</p>
              </div>
              <span className="block text-[10px] font-mono text-neutral-400 mt-6 tracking-wider font-bold uppercase">// ELENA S., SALON SCHÖNINGEN</span>
            </div>

          </div>
        </div>
      </section>

      {/* Dynamic Career / Hiring Section */}
      <section id="career" className="relative bg-neutral-900 text-white py-20 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-950/20 to-neutral-900 pointer-events-none" />
        <div className="max-w-3xl mx-auto flex flex-col items-center gap-4 relative z-10">
          <Users className="w-7 h-7 text-[#D32F2F] animate-bounce" />
          <h2 className="font-serif text-3xl md:text-4xl font-black uppercase tracking-tight">WIR SUCHEN VERSTÄRKUNG (M/W/D)</h2>
          <p className="text-neutral-300 text-xs md:text-sm font-light max-w-xl leading-relaxed">
            Werde Teil unserer Erfolgsgeschichte in **Königslutter, Sickte oder Schöningen**. Wir bieten übertarifliche, pünktliche Bezahlung, flexible Urlaubsmodelle und ein modernes Arbeitsumfeld. Vollzeit oder Teilzeit möglich.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center pt-2 w-full sm:w-auto">
            <a href="tel:+491733085774" className="w-full sm:w-auto bg-[#D32F2F] hover:bg-white hover:text-neutral-900 text-white font-mono text-xs uppercase tracking-widest px-6 py-3.5 font-black transition-all text-center shadow-lg">
              Direkt-Bewerbung via Call: 0173 / 3 08 57 74
            </a>
            <span className="text-xs font-mono text-neutral-400 font-bold block">Ansprechpartnerin: Renate Domke</span>
          </div>
        </div>
      </section>

      {/* High-Converting Form Section */}
      <section id="booking-form" className="py-20 bg-white relative scroll-mt-6">
        <div className="max-w-3xl mx-auto px-4">
          <div className="bg-white border-[3px] border-neutral-900 p-6 md:p-12 relative shadow-2xl transition-all duration-300">
            
            <div className="absolute top-0 right-0 w-8 h-8 border-r-4 border-t-4 border-[#D32F2F] -mt-1.5 -mr-1.5" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-l-4 border-b-4 border-[#D32F2F] -mb-1.5 -ml-1.5" />

            <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#D32F2F] font-black block">DIGITALE RESERVIERUNG</span>
              <h2 className="font-serif text-3xl font-black text-neutral-900">Wunschtermin unverbindlich sichern</h2>
              <p className="text-xs text-neutral-500 font-light leading-relaxed">
                Trage deine Präferenzen ein. Unser System erfasst die Anfrage sofort und unser Team meldet sich zeitnah zur finalen Bestätigung bei dir.
              </p>
            </div>

            {validationError && (
              <div className="mb-6 p-4 bg-red-50 text-[#D32F2F] text-xs font-bold border-l-4 border-[#D32F2F] font-mono">
                ⚠️ {validationError}
              </div>
            )}

            {submitSuccess ? (
              <div className="p-8 bg-neutral-900 text-white text-center space-y-4 max-w-md mx-auto border-t-4 border-[#D32F2F]">
                <div className="w-12 h-12 bg-[#D32F2F] text-white flex items-center justify-center rounded-none mx-auto font-bold text-lg">✓</div>
                <h4 className="font-serif text-xl font-black">Anfrage übermittelt!</h4>
                <p className="text-xs text-neutral-300 font-light leading-relaxed">Wir haben deine Wunschparameter in unserer Datenbank hinterlegt und rufen dich schnellstmöglich zurück.</p>
                <button onClick={() => setSubmitSuccess(false)} className="text-[10px] font-bold underline text-[#D32F2F] font-mono uppercase tracking-widest block mx-auto">Neue Anfrage senden</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 text-left">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-[10px] uppercase font-mono tracking-wider font-black text-neutral-400">Dein Name *</label>
                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="z.B. Anna Müller" className="w-full p-3.5 border border-neutral-200 text-xs focus:border-[#D32F2F] focus:ring-1 focus:ring-[#D32F2F] outline-none transition-all" required />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-[10px] uppercase font-mono tracking-wider font-black text-neutral-400">Telefonnummer für Rückruf *</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="z.B. 05305 12345" className="w-full p-3.5 border border-neutral-200 text-xs focus:border-[#D32F2F] focus:ring-1 focus:ring-[#D32F2F] outline-none transition-all" required />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-[10px] uppercase font-mono tracking-wider font-black text-neutral-400">E-Mail-Adresse *</label>
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="anna@mail.de" className="w-full p-3.5 border border-neutral-200 text-xs focus:border-[#D32F2F] focus:ring-1 focus:ring-[#D32F2F] outline-none transition-all" required />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-[10px] uppercase font-mono tracking-wider font-black text-neutral-400">Wunsch-Salon wählen *</label>
                    <select name="salon" value={formData.salon} onChange={handleInputChange} className="w-full p-3.5 border border-neutral-200 text-xs outline-none focus:border-[#D32F2F] focus:ring-1 focus:ring-[#D32F2F] bg-white cursor-pointer font-mono">
                      {SALONS.map((s, idx) => <option key={idx} value={s.name}>{s.name}</option>)}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-[10px] uppercase font-mono tracking-wider font-black text-neutral-400">Wunsch-Leistung *</label>
                    <select name="service" value={formData.service} onChange={handleInputChange} className="w-full p-3.5 border border-neutral-200 text-xs outline-none focus:border-[#D32F2F] focus:ring-1 focus:ring-[#D32F2F] bg-white cursor-pointer font-mono">
                      {SERVICES.map((srv, idx) => <option key={idx} value={srv}>{srv}</option>)}
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <label className="block text-[10px] uppercase font-mono tracking-wider font-black text-neutral-400">Datum *</label>
                      <input type="date" name="date" value={formData.date} onChange={handleInputChange} className="w-full p-3.5 border border-neutral-200 text-xs outline-none focus:border-[#D32F2F] cursor-pointer" required />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-[10px] uppercase font-mono tracking-wider font-black text-neutral-400">Tageszeit *</label>
                      <select name="time" value={formData.time} onChange={handleInputChange} className="w-full p-3.5 border border-neutral-200 text-xs outline-none focus:border-[#D32F2F] bg-white cursor-pointer font-mono">
                        <option value="Vormittags (09:00 - 12:00 Uhr)">Vormittags</option>
                        <option value="Mittags (12:00 - 15:00 Uhr)">Mittags</option>
                        <option value="Nachmittags (15:00 - 18:30 Uhr)">Nachmittags</option>
                      </select>
                    </div>
                  </div>
                </div>

                <button type="submit" disabled={isSubmitting} className="w-full py-4 bg-neutral-900 text-white hover:bg-[#D32F2F] font-mono text-xs uppercase tracking-widest font-black transition-all duration-300 mt-4 shadow-lg">
                  {isSubmitting ? "Wird verarbeitet..." : "Unverbindliche Terminanfrage absenden"}
                </button>
              </form>
            )}

          </div>
        </div>
      </section>

      {/* Leads Storage Dashboard Panel for Falk's live presentation */}
      <div className="max-w-3xl mx-auto px-4 pb-16">
        <div className="border border-dashed border-neutral-200 bg-neutral-50 p-6 text-center space-y-3">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-left space-y-0.5">
              <span className="bg-neutral-900 text-white text-[9px] font-mono uppercase px-2 py-0.5 font-bold rounded-sm">Sandbox Mode</span>
              <p className="text-xs font-bold text-neutral-800">Echtzeit CRM-Leads Visualisierer</p>
            </div>
            <button onClick={() => setShowDashboard(!showDashboard)} className="text-xs font-mono font-black uppercase tracking-wider px-4 py-2 bg-neutral-200 hover:bg-[#D32F2F] hover:text-white text-neutral-800 transition-colors">
              {showDashboard ? "Schließen" : "Anfragen anzeigen (" + leads.length + ")"}
            </button>
          </div>

          {showDashboard && (
            <div className="pt-4 border-t border-neutral-200 text-left overflow-x-auto bg-white p-3 shadow-sm">
              {leads.length === 0 ? <p className="text-neutral-400 italic text-center py-4 text-xs">Noch keine Anfragen im lokalen Speicher vorhanden. Fülle das Formular aus!</p> : (
                <table className="w-full table-auto text-left border divide-y divide-neutral-200 text-xs">
                  <thead className="bg-neutral-50 font-mono text-[10px] uppercase text-neutral-400">
                    <tr>
                      <th className="p-3">Kunde</th>
                      <th className="p-3">Ausgewählter Salon</th>
                      <th className="p-3">Datum / Fenster</th>
                      <th className="p-3 text-right">Aktion</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100 font-light text-neutral-700">
                    {leads.map(l => (
                      <tr key={l.id} className="hover:bg-neutral-50">
                        <td className="p-3"><strong>{l.name}</strong><br /><span className="text-[10px] text-neutral-400 font-mono">{l.phone}</span></td>
                        <td className="p-3 text-[#D32F2F] font-bold font-mono text-[11px]">{l.salon}</td>
                        <td className="p-3 font-mono text-neutral-600">{l.date} <br /><span className="text-[10px] text-neutral-400">{l.time}</span></td>
                        <td className="p-3 text-right"><button onClick={() => handleDeleteLead(l.id)} className="text-red-600 font-bold px-2 py-1 bg-red-50 hover:bg-red-100 transition-colors">Löschen</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}
        </div>
      </div>

      {/* High-End Minimalist Footer Area */}
      <footer className="bg-neutral-900 text-neutral-300 pt-16 pb-8 border-t border-neutral-800 font-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-12 text-xs text-left">
          
          <div className="md:col-span-4 space-y-4">
            <span className="font-serif text-2xl font-black tracking-wider text-white">HAIR FAMILY</span>
            <p className="text-neutral-400 leading-relaxed font-light">
              Exklusive Haarschnitte, meisterhaftes Balayage und vegane Kao Wirkstoffpflege an 5 modernen Standorten in der Region Braunschweig und Cremlingen.
            </p>
            <div className="flex space-x-3 pt-2">
              <span className="p-2 bg-neutral-800 text-white font-mono uppercase tracking-widest text-[9px] hover:text-[#D32F2F] cursor-pointer">@instagram</span>
              <span className="p-2 bg-neutral-800 text-white font-mono uppercase tracking-widest text-[9px] hover:text-[#D32F2F] cursor-pointer">@journal</span>
            </div>
          </div>

          <div className="md:col-span-5 space-y-3 font-mono text-[11px]">
            <h4 className="text-[#D32F2F] font-black tracking-widest uppercase">// SALONS & DIREKTKONTAKT</h4>
            <div className="grid grid-cols-1 gap-2 text-neutral-400">
              {SALONS.map((s, i) => (
                <div key={i} className="border-b border-neutral-800/60 pb-1.5 flex justify-between items-start gap-4">
                  <div>
                    <strong className="text-white font-serif text-xs">{s.name}</strong>
                    <p className="font-sans text-[11px] font-light mt-0.5">{s.address}</p>
                  </div>
                  <span className="text-white shrink-0 font-sans font-bold">{s.phone}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="md:col-span-3 space-y-3 font-mono text-[11px]">
            <h4 className="text-white font-black tracking-widest uppercase">// ÖFFNUNGSZEITEN</h4>
            <ul className="space-y-2 text-neutral-400 font-mono">
              <li className="flex justify-between border-b border-neutral-800 pb-1"><span>Mo - Fr:</span> <span className="text-white font-sans">09:00 - 18:30 Uhr</span></li>
              <li className="flex justify-between border-b border-neutral-800 pb-1"><span>Samstag:</span> <span className="text-white font-sans">08:30 - 14:00 Uhr</span></li>
              <li className="flex justify-between text-neutral-600"><span>Sonntag:</span> <span>Geschlossen</span></li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 mt-16 pt-8 border-t border-neutral-800 text-center md:flex md:justify-between text-[10px] font-mono text-neutral-500 uppercase tracking-widest font-bold">
          <p>&copy; {new Date().getFullYear()} Hair Family – Der Friseur. Webdesign & Marketing by Falk Stange.</p>
          <div className="space-x-4 mt-3 md:mt-0">
            <button onClick={() => setModalType("imprint")} className="hover:text-white transition-colors">Impressum</button>
            <button onClick={() => setModalType("privacy")} className="hover:text-white transition-colors">Datenschutz</button>
          </div>
        </div>
      </footer>

      {/* Full Accessible Legal Overlays */}
      {modalType && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white text-neutral-900 p-8 max-w-md w-full border-2 border-neutral-900 relative shadow-2xl max-h-[80vh] overflow-y-auto text-xs text-left space-y-4">
            <button onClick={() => setModalType(null)} className="absolute top-4 right-4 text-neutral-400 hover:text-black"><X className="w-4 h-4" /></button>
            {modalType === "imprint" ? (
              <>
                <h3 className="font-serif text-xl font-black border-b pb-2">Impressum</h3>
                <p><strong>Hair Family GmbH</strong><br />Zentrale Verwaltung<br />38173 Sickte</p>
                <p><strong>Geschäftsführung / Vertretung:</strong><br />Renate Domke</p>
                <p><strong>Kontakt-Zentrale:</strong><br />Mobil: 0173 / 3 08 57 74</p>
              </>
            ) : (
              <>
                <h3 className="font-serif text-xl font-black border-b pb-2">Datenschutzerklärung</h3>
                <p>Die Datenerfassung innerhalb dieses Anfrageassistenten dient ausschließlich der unverbindlichen Koordination freier Slots in unseren Friseursalons. Sämtliche Daten werden verschlüsselt verarbeitet und keinesfalls zu Werbezwecken an Dritte übermittelt.</p>
              </>
            )}
            <div className="pt-2 text-right"><button onClick={() => setModalType(null)} className="px-5 py-2.5 bg-neutral-900 text-white font-mono uppercase tracking-widest font-black text-[10px]">Schließen</button></div>
          </div>
        </div>
      )}

    </div>
  );
}
