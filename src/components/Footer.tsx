'use client';

import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="bg-black text-[#ECECEC] py-24 px-6 relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col gap-20">
        
        {/* Top Section: Brand + Newsletter */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-12">
            <div className="max-w-md">
                 <h2 className="text-8xl font-bold tracking-tighter mb-6 relative left-[-4px] text-white">ミツバチ</h2>
                 <p className="text-white/60 text-lg leading-relaxed">
                    Designed for the obsessed. <br />
                    Milled from solid aerospace aluminum. <br />
                    The last keyboard you'll ever need.
                 </p>
            </div>

            <div className="w-full md:w-auto flex flex-col gap-6">
                <h3 className="text-sm font-bold uppercase tracking-widest text-white/40">Stay Updated</h3>
                <div className="flex gap-4">
                    <input 
                        type="email" 
                        placeholder="Enter your email" 
                        className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 min-w-[300px] text-white placeholder:text-white/30 focus:outline-none focus:border-white/60 transition-colors"
                    />
                    <button className="bg-white text-black px-6 py-3 rounded-lg font-medium hover:bg-white/90 transition-colors">
                        Join
                    </button>
                </div>
            </div>
        </div>

        <div className="h-px w-full bg-white/10" />

        {/* Bottom Section: Links & Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <p className="text-white/40 text-sm">© 2026 Mitsubachi Inc. All rights reserved.</p>
            
            <div className="flex gap-8 text-sm font-medium">
                <a href="#" className="text-white/80 hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="text-white/80 hover:text-white transition-colors">Terms of Service</a>
                <a href="#" className="text-white/80 hover:text-white transition-colors">Shipping</a>
                <a href="#" className="text-white/80 hover:text-white transition-colors">Returns</a>
            </div>
        </div>
      </div>
    </footer>
  );
}
