'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

export default function SanWishHome() {
  const [menuItems, setMenuItems] = useState([]);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    async function fetchMenu() {
      const { data, error } = await supabase
        .from('menu_items')
        .select('*')
        .eq('is_available', true);
      
      if (!error && data) {
        setMenuItems(data);
      }
    }
    fetchMenu();
  }, []);

  const groupedMenu = menuItems.reduce((acc, item) => {
    const cat = item.category || 'General';
    acc[cat] = acc[cat] || [];
    acc[cat].push(item);
    return acc;
  }, {});

  const faqs = [
    { q: "¿El pan es realmente fresco?", a: "En SanWish, el pan amasado y pan brioche se prepara TODOS LOS DÍAS desde las 6:00 AM con masa madre artesanal." },
    { q: "¿Qué tipo de carne utilizan?", a: "Trabajamos exclusivamente con carne Angus Nacional y Wagyu Premium seleccionada por nuestro Chef." },
    { q: "¿La mayonesa y salsas son caseras?", a: "Nuestra mayonesa casera es elaborada con huevos frescos, aceite de oliva, limón de árbol y especias secretas." }
  ];

  return (
    <div className="min-h-screen bg-[#1e1e1e] text-white font-sans selection:bg-[#c11c17]">
      {/* Header Sticky */}
      <nav className="fixed w-full z-50 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-center sm:text-left">
            <span className="bg-black text-white text-xs px-3 py-1 rounded border border-gray-700">🔥 ¡Hacemos Nuestro Pan!</span>
            <p className="text-sm text-gray-400 mt-1">Sanguchería Tradicional Chilena</p>
          </div>
          <div className="text-2xl font-serif italic text-white font-bold tracking-wider">SanWish</div>
          <div className="flex gap-4">
            <a href="https://wa.me/56958976362" className="text-green-500 hover:text-green-400 flex items-center gap-2 font-bold">
              Contáctanos
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-16 px-4 text-center max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-serif italic text-[#c11c17] mb-4">
          Sabores clásicos, <span className="text-white">toque gourmet</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
          Hacemos Nuestro Pan • Carnes Angus / Wagyu Premium • Mayonesa casera<br/>
          <strong className="text-[#c11c17]">Delivery, Take away y consumo en lugar</strong> | Estacionamiento gratuito
        </p>
        <a href="#carta" className="inline-flex items-center gap-2 bg-[#181818] border border-gray-700 text-white px-8 py-4 rounded-full font-bold hover:bg-[#c11c17] hover:border-[#c11c17] transition-all transform hover:scale-105">
          VER CARTA INTERACTIVA
        </a>
      </section>

      {/* Carta Interactiva */}
      <section id="carta" className="py-20 bg-[#151515] px-4 border-t border-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif italic text-[#c11c17] mb-4">Nuestra Carta</h2>
            <div className="w-20 h-1 bg-[#c11c17] mx-auto rounded"></div>
            <p className="text-gray-400 mt-4">Clásicos chilenos con toque gourmet</p>
          </div>

          {Object.keys(groupedMenu).length === 0 ? (
            <div className="text-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#c11c17] mx-auto"></div>
              <p className="mt-4 text-gray-400">Cargando delicias...</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {Object.keys(groupedMenu).map((category) => (
                <div key={category} className="bg-black/40 backdrop-blur-sm border border-[#c11c17]/30 p-8 rounded-2xl hover:border-[#c11c17] transition-all">
                  <h3 className="text-2xl text-yellow-500 font-serif italic mb-6 border-b border-gray-800 pb-3">
                    {category}
                  </h3>
                  <ul className="space-y-6">
                    {groupedMenu[category].map((item) => (
                      <li key={item.id} className="flex justify-between items-start gap-4 group">
                        <div className="flex-1">
                          <h4 className="font-bold text-lg text-gray-100 group-hover:text-white transition-colors">{item.name}</h4>
                          {item.description && <p className="text-sm text-gray-400 mt-1 leading-snug">{item.description}</p>}
                        </div>
                        <div className="font-bold text-[#c11c17] whitespace-nowrap text-lg">
                          ${item.price ? item.price.toLocaleString('es-CL') : ''}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Opiniones */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif italic mb-4">Lo que dicen <span className="text-[#c11c17]">nuestros clientes</span></h2>
            <span className="text-white font-bold ml-2">4.6 ★★★★★</span>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Carlos Miranda", review: "El Chacarero es insuperable, pan maravilloso." },
              { name: "Ivonne Molina", review: "El mejor lugar de Huechuraba para hamburguesas." },
              { name: "Stephanie Birkner", review: "La Tropi Burguer excelente, atención rápida y deliciosa." }
            ].map((review, idx) => (
              <div key={idx} className="bg-[#1f1f1f] border-l-4 border-[#c11c17] p-6 rounded-xl">
                <p className="italic text-gray-300 mb-4">"{review.review}"</p>
                <strong className="block text-white">{review.name}</strong>
                <span className="text-yellow-500 text-sm">★★★★★</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-20 bg-[#151515] px-4 border-t border-gray-800">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif italic text-[#c11c17] mb-4">Preguntas Frecuentes</h2>
            <div className="w-20 h-1 bg-[#c11c17] mx-auto rounded"></div>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border border-gray-700 rounded-lg overflow-hidden">
                <button 
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full bg-[#1a1a1a] p-5 text-left font-bold flex justify-between items-center hover:bg-[#222] transition-colors"
                >
                  <span>{faq.q}</span>
                  <span>{openFaq === idx ? '▲' : '▼'}</span>
                </button>
                {openFaq === idx && (
                  <div className="bg-[#0f0f0f] p-5 text-gray-400 border-t border-gray-800">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black pt-16 pb-8 border-t border-gray-800 text-center md:text-left">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <h3 className="text-3xl font-serif italic text-white mb-4">SanWish</h3>
            <p className="text-gray-400">Sabores clásicos, toque gourmet.<br/>Pan amasado diario y carnes premium.</p>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4">Horario</h4>
            <p className="text-gray-400">Lun-Dom: 12:00 - 22:00hrs<br/>Delivery hasta 23:00hrs</p>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4">Ubicación</h4>
            <p className="text-gray-400">Pedro Fontova 7280, Local 116<br/>Huechuraba, Santiago.</p>
          </div>
        </div>
        <div className="text-center text-gray-600 text-sm border-t border-gray-900 pt-8">
          &copy; 2026 SanWish - Sanguchería Tradicional Chilena.
        </div>
      </footer>
    </div>
  );
}