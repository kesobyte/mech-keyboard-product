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
      <div className="max-w-7xl mx-auto px-6 py-24">
        <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-12"
        >
            {[
                { title: "Gasket Mount", desc: "Isolating the plate from the case for a pure, dampened sound profile." },
                { title: "PBT Keycaps", desc: "Double-shot molding ensures legends never fade. Textured for grip." },
                { title: "QMK/VIA Ready", desc: "Full programmability. Remap keys and create macros on the fly." }
            ].map((feature, i) => (
                <motion.div key={i} variants={fadeUp} className="space-y-4">
                    <div className="h-px w-full bg-black/20 mb-6" />
                    <h3 className="text-2xl font-semibold tracking-tight">{feature.title}</h3>
                    <p className="text-lg text-black/60 leading-relaxed">{feature.desc}</p>
                </motion.div>
            ))}
        </motion.div>
      </div>

      {/* 03. LARGE IMAGE BANNER (Placeholder logic) */}
      <div className="w-full h-[60vh] bg-black/5 relative overflow-hidden flex items-center justify-center">
            {/* If user had more images, one would go here. Using pattern for now. */}
            <div className="absolute inset-0 opacity-10" 
                style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '20px 20px' }} 
            />
            <motion.h2 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                className="text-4xl md:text-6xl font-medium tracking-tight relative z-10"
            >
                Defined by density.
            </motion.h2>
      </div>

      {/* 04. TECH SPECS */}
      <div className="max-w-4xl mx-auto px-6 py-40">
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
                { label: "Layout", value: "65% (67 Keys)" },
                { label: "Case Material", value: "6063 Aluminum" },
                { label: "Weight", value: "1.2 kg (Assembled)" },
                { label: "Typing Angle", value: "6.5 Degrees" },
                { label: "PCB", value: "Hot-swappable, South-facing RGB" }
            ].map((spec, i) => (
                <motion.div key={i} variants={fadeUp} className="flex flex-col md:flex-row md:items-baseline justify-between py-6 border-b border-black/10 group hover:border-black/40 transition-colors">
                    <span className="text-xl font-medium">{spec.label}</span>
                    <span className="text-xl text-black/60 font-light">{spec.value}</span>
                </motion.div>
            ))}
        </motion.div>
      </div>


    </section>
  );
}
