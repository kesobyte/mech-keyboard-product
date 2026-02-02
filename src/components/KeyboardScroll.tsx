'use client';

import { useEffect, useRef, useState } from 'react';
import { useScroll, useTransform, motion, useMotionValueEvent } from 'framer-motion';

export default function KeyboardScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loadedCount, setLoadedCount] = useState(0);
  const totalFrames = 120; // ezgif sequence length

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, totalFrames - 1]);

  // Preload images
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let count = 0;

    for (let i = 0; i < totalFrames; i++) {
        const img = new Image();
        // Construct filename: ezgif-frame-001.jpg to ezgif-frame-120.jpg
        const frameNum = (i + 1).toString().padStart(3, '0');
        img.src = `/sequence/ezgif-frame-${frameNum}.jpg`; 
        img.onload = () => {
            count++;
            setLoadedCount(count);
        };
        loadedImages.push(img);
    }
    setImages(loadedImages);
  }, []);

  // Draw to canvas
  const drawImage = (index: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    const img = images[index];

    if (!canvas || !ctx || !img) return;

    const dpr = window.devicePixelRatio || 1;
    // Only resize if necessary
    if (canvas.width !== window.innerWidth * dpr || canvas.height !== window.innerHeight * dpr) {
        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;
        ctx.scale(dpr, dpr);
    }

    const canvasWidth = window.innerWidth;
    const canvasHeight = window.innerHeight;

    // Cover logic
    const scale = Math.max(canvasWidth / img.width, canvasHeight / img.height);
    const drawWidth = img.width * scale;
    const drawHeight = img.height * scale;
    const offsetX = (canvasWidth - drawWidth) / 2;
    const offsetY = (canvasHeight - drawHeight) / 2;

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };

  useMotionValueEvent(frameIndex, 'change', (latest) => {
    const index = Math.round(latest);
    if (images[index] && images[index].complete) {
        requestAnimationFrame(() => drawImage(index));
    }
  });

  useEffect(() => {
    if (loadedCount === totalFrames && images[0]) {
        drawImage(0);
    }
  }, [loadedCount, images]);
  
  useEffect(() => {
      const handleResize = () => {
         const currentScroll = frameIndex.get();
         drawImage(Math.round(currentScroll));
      };
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
  }, [frameIndex, images]);


  const isLoading = loadedCount < totalFrames;

  // Apple-style: Scroll indicator fade out
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);

  // Text animations
  const opacity1 = useTransform(scrollYProgress, [0, 0.08, 0.15], [1, 1, 0]);
  const scale1 = useTransform(scrollYProgress, [0, 0.15], [1, 0.95]);
  const y1 = useTransform(scrollYProgress, [0, 0.15], [0, -50]);

  const opacity2 = useTransform(scrollYProgress, [0.18, 0.25, 0.4, 0.48], [0, 1, 1, 0]);
  const y2 = useTransform(scrollYProgress, [0.18, 0.25, 0.4, 0.48], [60, 0, 0, -60]);

  const opacity3 = useTransform(scrollYProgress, [0.5, 0.58, 0.72, 0.8], [0, 1, 1, 0]);
  const y3 = useTransform(scrollYProgress, [0.5, 0.58, 0.72, 0.8], [60, 0, 0, -60]);

  const opacity4 = useTransform(scrollYProgress, [0.82, 0.9, 1], [0, 1, 1]);
  const y4 = useTransform(scrollYProgress, [0.82, 0.9], [60, 0]);
  const scale4 = useTransform(scrollYProgress, [0.82, 0.9], [0.95, 1]);


  return (
    <div ref={containerRef} className="relative h-[400vh] bg-[#ECECEC]">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        
        {/* Loading State */}
        {isLoading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center z-50 bg-[#ECECEC]">
                <div className="relative w-12 h-12 mb-6">
                    <svg className="animate-spin" viewBox="0 0 50 50">
                        <circle 
                            cx="25" cy="25" r="20" 
                            fill="none" 
                            stroke="rgba(0,0,0,0.1)" 
                            strokeWidth="4"
                        />
                        <circle 
                            cx="25" cy="25" r="20" 
                            fill="none" 
                            stroke="rgba(0,0,0,0.8)" 
                            strokeWidth="4"
                            strokeDasharray="31.4 94.2"
                            strokeLinecap="round"
                        />
                    </svg>
                </div>
                <span className="text-xs font-medium tracking-widest uppercase text-black/40">
                    {Math.round((loadedCount / totalFrames) * 100)}%
                </span>
            </div>
        )}
        
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

        {/* Text Layer */}
        <div className="absolute inset-0 pointer-events-none">
            
            {/* Hero Title */}
            <motion.div 
                style={{ opacity: opacity1, y: y1, scale: scale1 }}
                className="absolute inset-0 flex flex-col items-center justify-start pt-[15vh] text-center px-6"
            >
                <div className="relative z-10 w-full">
                    <h1 className="text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] font-bold text-neutral-900 tracking-tighter leading-none mb-2 drop-shadow-2xl">
                        ミツバチ
                    </h1>
                    <p className="text-xl md:text-2xl text-neutral-800 font-medium tracking-tight max-w-md mx-auto drop-shadow-md">
                        Honeybee Keyboard
                    </p>
                </div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div 
                style={{ opacity: scrollIndicatorOpacity }}
                className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
            >
                <span className="text-xs font-medium tracking-widest uppercase text-black/40">Scroll to explore</span>
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    className="w-6 h-10 border-2 border-black/20 rounded-full flex justify-center pt-2"
                >
                    <motion.div className="w-1.5 h-1.5 bg-black/40 rounded-full" />
                </motion.div>
            </motion.div>

            {/* Feature 1 */}
            <motion.div 
                style={{ opacity: opacity2, y: y2 }}
                className="absolute inset-0 flex items-center px-8 md:px-20 lg:px-32"
            >
                <div className="max-w-2xl backdrop-blur-md bg-white/30 p-8 md:p-12 rounded-3xl border border-white/20 shadow-2xl">
                    <p className="text-sm font-bold tracking-widest uppercase text-neutral-600 mb-4">Precision</p>
                    <h2 className="text-5xl sm:text-6xl md:text-7xl font-bold text-neutral-900 tracking-tight leading-[1.1] mb-6 shadow-black/5">
                        Built for those who notice everything.
                    </h2>
                    <p className="text-xl text-neutral-800 font-medium max-w-md">
                        Every switch, every stabilizer, every screw—measured to the micron.
                    </p>
                </div>
            </motion.div>

            {/* Feature 2 */}
            <motion.div 
                style={{ opacity: opacity3, y: y3 }}
                className="absolute inset-0 flex items-center justify-end px-8 md:px-20 lg:px-32"
            >
                <div className="max-w-2xl text-right backdrop-blur-md bg-white/30 p-8 md:p-12 rounded-3xl border border-white/20 shadow-2xl">
                    <p className="text-sm font-bold tracking-widest uppercase text-neutral-600 mb-4">Engineering</p>
                    <h2 className="text-5xl sm:text-6xl md:text-7xl font-bold text-neutral-900 tracking-tight leading-[1.1] mb-6">
                        Layered for perfection.
                    </h2>
                    <p className="text-xl text-neutral-800 font-medium max-w-md ml-auto">
                        Gasket-mounted plates, sound-dampening foam, and a flex-cut PCB.
                    </p>
                </div>
            </motion.div>

            {/* CTA */}
             <motion.div 
                style={{ opacity: opacity4, y: y4, scale: scale4 }}
                className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
            >
                <div className="backdrop-blur-md bg-white/30 p-10 md:p-16 rounded-[2.5rem] border border-white/20 shadow-2xl max-w-4xl mx-auto">
                    <h2 className="text-5xl sm:text-6xl md:text-7xl font-bold text-neutral-900 tracking-tight leading-tight mb-8">
                        Assembled. Ready.
                    </h2>
                    <p className="text-xl text-neutral-800 font-medium mb-10 max-w-md mx-auto">
                        Scroll back up to replay. Or take the next step.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center pointer-events-auto">
                        <button className="px-8 py-4 bg-neutral-900 text-white rounded-full font-medium text-lg hover:bg-black transition-all hover:scale-105 shadow-xl">
                            Pre-order Now
                        </button>
                        <button className="px-8 py-4 bg-white/50 backdrop-blur-sm text-neutral-900 border-2 border-neutral-900/10 rounded-full font-medium text-lg hover:bg-white/80 hover:border-neutral-900/30 transition-all shadow-lg">
                            Learn More
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
      </div>
    </div>
  );
}
