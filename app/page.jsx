'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

export default function CartaDigital() {
  const [menuItems, setMenuItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchMenu() {
      const { data, error } = await supabase
        .from('menu_items')
        .select('*')
        .eq('is_available', true);
      
      if (!error && data) {
        setMenuItems(data);
      }
      setIsLoading(false);
    }
    fetchMenu();
  }, []);

  // Agrupar los productos por categoría
  const groupedMenu = menuItems.reduce((acc, item) => {
    const cat = item.category || 'Otros';
    acc[cat] = acc[cat] || [];
    acc[cat].push(item);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-[#121212] text-white font-sans pb-12">
      
      {/* HEADER DE LA CARTA */}
      <header className="sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm border-b border-gray-800 px-4 py-4 flex justify-center items-center shadow-md">
        <div className="flex items-center gap-3">
          {/* Reemplaza src por el logo real de San Wish o Pecado del Inka */}
          <div className="h-10 w-10 bg-gray-800 rounded-full flex items-center justify-center overflow-hidden">
            <span className="text-xl">🍔</span> 
          </div>
          <h1 className="text-2xl font-bold italic font-serif tracking-wide text-white">SanWish</h1>
        </div>
      </header>

      {/* MENÚ INTERACTIVO */}
      <main className="max-w-7xl mx-auto py-8 space-y-10">
        
        {/* Banner de Bienvenida corto */}
        <div className="px-4 text-center mb-8">
          <h2 className="text-xl text-gray-300">Explora nuestra carta</h2>
          <div className="w-12 h-1 bg-[#c11c17] mx-auto rounded mt-3"></div>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center mt-20 space-y-4">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#c11c17]"></div>
            <p className="text-gray-500">Cargando nuestra carta...</p>
          </div>
        ) : Object.keys(groupedMenu).length === 0 ? (
          <p className="text-center text-gray-500 mt-20">El menú se está actualizando.</p>
        ) : (
          Object.keys(groupedMenu).map((category) => (
            <section key={category} className="px-4">
              
              {/* TÍTULO DE CATEGORÍA */}
              <div className="mb-4">
                <h3 className="text-2xl font-bold text-white mb-1">
                  {category}
                </h3>
              </div>

              {/* SLIDER HORIZONTAL DE PRODUCTOS (SOLO VISUAL) */}
              <div className="flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                
                {groupedMenu[category].map((item) => (
                  <article 
                    key={item.id} 
                    className="relative bg-[#1e1e1e] rounded-2xl overflow-hidden flex-shrink-0 w-[240px] snap-start border border-gray-800 shadow-lg"
                  >
                    {/* IMAGEN DEL PLATO */}
                    <div className="h-44 w-full bg-[#2a2a2a]">
                      {/* Aquí irá la URL de la imagen que suban a Supabase */}
                      <img 
                        src={`/placeholder-${category.substring(0,3)}.jpg`} 
                        alt={item.name} 
                        className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity"
                        onError={(e) => { e.target.src = 'https://via.placeholder.com/400x300/2a2a2a/ffffff?text=SanWish' }} // Imagen por defecto si falla
                      />
                    </div>

                    {/* CONTENIDO (TÍTULO, DESCRIPCIÓN Y PRECIO) */}
                    <div className="p-5 flex flex-col justify-between min-h-[140px]">
                      <div>
                        <h4 className="font-bold text-lg text-white leading-tight mb-2">{item.name}</h4>
                        <p className="text-sm text-gray-400 line-clamp-3 leading-snug">
                          {item.description}
                        </p>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t border-gray-700/50">
                        <span className="text-xl font-bold text-[#e67e22]">
                          ${item.price ? item.price.toLocaleString('es-CL') : ''}
                        </span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ))
        )}
      </main>
    </div>
  );
}