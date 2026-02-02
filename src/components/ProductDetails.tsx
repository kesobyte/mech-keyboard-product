'use client';

import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const } }
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2
    }
  }
};

export default function ProductDetails() {
  return (
    <section className="relative z-10 bg-[#ECECEC] text-black">
      
      {/* 01. INTRO / MARQUEE BREAK */}
      <div className="py-32 overflow-hidden">
        <motion.div 
            initial={{ x: '10%' }}
            whileInView={{ x: '-10%' }}
            transition={{ duration: 10, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
            className="whitespace-nowrap"
        >
            <h2 className="text-[12vw] leading-none font-bold tracking-tighter opacity-10">
                PRECISION ENGINEERING — PRECISION ENGINEERING —
            </h2>
        </motion.div>
      </div>

      {/* 02. FEATURES GRID */}
      <div id="features" className="max-w-7xl mx-auto px-6 py-24">
        <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-12"
        >
            {[
                { title: "Gasket Mount", desc: "Isolating the plate from the case for a pure, dampened sound profile." },
                { title: "PBT Keycaps", desc: "Double-shot PBT with Japanese sublegends. Textured for grip, legends never fade." },
                { title: "Rotary Encoder", desc: "Precision aluminum knob for volume, scroll, or custom macros. Fully programmable." }
            ].map((feature, i) => (
                <motion.div key={i} variants={fadeUp} className="space-y-4">
                    <div className="h-px w-full bg-black/20 mb-6" />
                    <h3 className="text-2xl font-semibold tracking-tight">{feature.title}</h3>
                    <p className="text-lg text-black/60 leading-relaxed">{feature.desc}</p>
                </motion.div>
            ))}
        </motion.div>
      </div>

      {/* 03. GALLERY GRID */}
      <div id="gallery" className="w-full bg-[#ECECEC] py-24">
        <div className="max-w-7xl mx-auto px-6">
            <motion.h3 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-sm font-bold uppercase tracking-widest text-black/40 mb-12"
            >
                Gallery
            </motion.h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[2, 1, 4, 3].map((num) => (
                    <motion.div  
                        key={num}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: num * 0.1 }}
                        className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-black/5"
                    >
                        <img 
                            src={`/images/gallery-${num}.png`} 
                            alt={`Gallery image ${num}`}
                            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
                    </motion.div>
                ))}
            </div>
        </div>
      </div>

      {/* 04. TECH SPECS */}
      <div id="specs" className="max-w-4xl mx-auto px-6 py-40">
        <motion.h3 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-sm font-bold uppercase tracking-widest text-black/40 mb-12"
        >
            Specifications
        </motion.h3>

        <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="space-y-8"
        >
            {[
                { label: "Layout", value: "75% Compact (82 Keys)" },
                { label: "Case Material", value: "6063 Aluminum" },
                { label: "Weight", value: "1.4 kg (Assembled)" },
                { label: "Typing Angle", value: "6.5 Degrees" },
                { label: "PCB", value: "Hot-swappable, South-facing RGB" },
                { label: "Special", value: "Rotary Encoder Knob" }
            ].map((spec, i) => (
                <motion.div key={i} variants={fadeUp} className="flex flex-col md:flex-row md:items-baseline justify-between py-6 border-b border-black/10 group hover:border-black/40 transition-colors">
                    <span className="text-xl font-medium">{spec.label}</span>
                    <span className="text-xl text-black/60 font-light">{spec.value}</span>
                </motion.div>
            ))}
        </motion.div>
      </div>


      {/* 05. SUPPORT SECTION */}
      <div id="support" className="bg-white/50 border-t border-black/5 py-32 px-6">
        <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-8">Here to help.</h2>
            <p className="text-xl text-black/60 max-w-2xl mx-auto mb-12">
                Questions about compatibility, built-in features or shipping? Our support team is ready.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
                 <button className="px-8 py-3 bg-black text-white rounded-full font-medium hover:bg-black/90 transition-all">
                    Contact Support
                 </button>
                 <button className="px-8 py-3 bg-transparent border border-black/20 rounded-full font-medium hover:bg-black/5 transition-all">
                    View FAQ
                 </button>
            </div>
        </div>
      </div>
    </section>
  );
}
