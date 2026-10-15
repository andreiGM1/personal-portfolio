import React from 'react';
import { motion } from 'framer-motion';

export default function PersonalPortfolio() {
  return (
    <div className="min-h-screen bg-zinc-950 font-sans text-zinc-300">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-20">
          <div className="text-2xl font-black tracking-tight text-white">
            Andrei<span className="text-violet-500">.</span>Dev
          </div>
          <div className="hidden md:flex space-x-8">
            <a href="#servicii" className="font-medium hover:text-white transition-colors">Servicii</a>
            <a href="#portofoliu" className="font-medium hover:text-white transition-colors">Portofoliu</a>
            <a href="#contact" className="font-medium hover:text-white transition-colors">Contact</a>
          </div>
          <a href="#contact" className="bg-violet-600 text-white px-6 py-2.5 rounded-full font-bold hover:bg-violet-500 transition-all shadow-lg shadow-violet-600/20">
            Let's Talk
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block bg-zinc-900 border border-zinc-800 text-zinc-400 font-medium px-4 py-1.5 rounded-full text-sm mb-6"
            >
              👋 Salut! Eu sunt Andrei.
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-black text-white tracking-tight mb-6 leading-tight"
            >
              Construiesc experiențe web <br className="hidden md:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-fuchsia-500">care vând.</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-zinc-400 mb-10 font-medium leading-relaxed"
            >
              Transform vizitatorii tăi în clienți plătitori prin site-uri ultra-rapide, construite cu Next.js, React și strategii moderne de conversie. Nu fac doar "design", fac afaceri profitabile.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <a href="#portofoliu" className="bg-white text-zinc-950 px-8 py-4 rounded-full font-bold text-lg hover:bg-zinc-200 transition-all text-center">
                Vezi Proiectele
              </a>
              <a href="#contact" className="bg-zinc-900 border border-zinc-700 text-white px-8 py-4 rounded-full font-bold text-lg hover:border-violet-500 transition-all text-center">
                Cere o ofertă
              </a>
            </motion.div>
          </div>
        </div>
        {/* Glow Effect */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-violet-600/20 blur-[150px] rounded-full z-0 pointer-events-none" />
      </section>

      {/* Services Section */}
      <section id="servicii" className="py-24 bg-zinc-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4">Ce pot face pentru tine</h2>
            <p className="text-xl text-zinc-400 max-w-2xl">Diferența dintre un site de 100€ și unul de 1000€ stă în performanță și modul în care este gândit pentru a genera bani.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: '🚀', title: 'Landing Pages / Funnels', desc: 'Pagini de prezentare ultra-optimizate pentru campanii de Facebook Ads, TikTok sau Google Ads. Viteza de încărcare sub 1 secundă.' },
              { icon: '💻', title: 'Web Apps / Portals', desc: 'Aplicații complexe, portaluri pentru agenții de recrutare, dashboard-uri și sisteme de programare complet custom.' },
              { icon: '🔍', title: 'Tehnic SEO & Viteză', desc: 'Dacă site-ul tău actual e pe WordPress și merge greu, îl rescriu în Next.js pentru a dubla rata de retenție.' },
            ].map((srv, idx) => (
              <div key={idx} className="bg-zinc-900 p-8 rounded-3xl border border-zinc-800 hover:border-violet-500/50 transition-colors group">
                <div className="text-4xl mb-6 bg-zinc-800 w-16 h-16 rounded-2xl flex items-center justify-center group-hover:bg-violet-500/20 transition-colors">{srv.icon}</div>
                <h3 className="text-2xl font-bold text-white mb-3">{srv.title}</h3>
                <p className="text-zinc-400 leading-relaxed">{srv.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 relative overflow-hidden">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6">Pregătit să scalăm?</h2>
          <p className="text-xl text-zinc-400 mb-10">Lasă-mi câteva detalii despre proiectul tău și revin cu o analiză gratuită și un plan de acțiune.</p>
          <form className="bg-zinc-900 p-8 rounded-3xl border border-zinc-800 shadow-2xl text-left space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-zinc-400 mb-1">Nume</label>
                <input type="text" className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-white focus:outline-none focus:border-violet-500 transition-colors" />
              </div>
              <div>
                <label className="block text-sm text-zinc-400 mb-1">Telefon / Email</label>
                <input type="text" className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-white focus:outline-none focus:border-violet-500 transition-colors" />
              </div>
            </div>
            <div>
              <label className="block text-sm text-zinc-400 mb-1">Despre ce este proiectul?</label>
              <textarea rows={4} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-white focus:outline-none focus:border-violet-500 transition-colors" />
            </div>
            <button className="w-full bg-white text-zinc-950 font-bold text-lg p-4 rounded-xl hover:bg-zinc-200 transition-colors mt-2">
              Trimite Mesajul
            </button>
          </form>
        </div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[800px] h-[800px] bg-fuchsia-600/10 blur-[120px] rounded-full z-0 pointer-events-none" />
      </section>

      {/* Footer */}
      <footer className="bg-zinc-950 py-8 text-center text-zinc-600 border-t border-zinc-900">
        <p>© 2026 Andrei.Dev. Făcut cu Next.js.</p>
      </footer>
    </div>
  );
}
