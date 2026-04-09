import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import {
    motion,
    useMotionValue,
    useTransform,
    useMotionTemplate,
    useAnimationFrame
} from "framer-motion";
import { ArrowRight, Play, LayoutGrid } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { AnimatedText } from "@/components/ui/animated-shiny-text";

export const Component = () => {
    const [count, setCount] = useState(0);
    const containerRef = useRef(null);
    const navigate = useNavigate();

    // Typewriter effect state
    const PHRASES = [
        'practical AI implementation.',
        'intelligent automation.',
        'enterprise AI systems.'
    ];
    const TYPING_MS = 60;
    const DELETING_MS = 30;
    const PAUSE_MS = 1500;

    const [display, setDisplay] = useState('');
    const [phase, setPhase] = useState('typing'); // typing | paused | deleting
    const [phraseIdx, setPhraseIdx] = useState(0);
    const tRef = useRef(null);

    useEffect(() => {
        const target = PHRASES[phraseIdx];
        let cancelled = false;

        const schedule = (fn, delay) => {
            tRef.current = setTimeout(() => { if (!cancelled) fn() }, delay);
        };

        if (phase === 'typing') {
            if (display.length < target.length) {
                schedule(() => setDisplay(target.slice(0, display.length + 1)), TYPING_MS);
            } else {
                setPhase('paused');
            }
        }

        if (phase === 'paused') {
            schedule(() => setPhase('deleting'), PAUSE_MS);
        }

        if (phase === 'deleting') {
            if (display.length > 0) {
                schedule(() => setDisplay(d => d.slice(0, -1)), DELETING_MS);
            } else {
                schedule(() => {
                    setPhraseIdx(i => (i + 1) % PHRASES.length);
                    setPhase('typing');
                }, 220);
            }
        }

        return () => { cancelled = true; clearTimeout(tRef.current); };
    }, [display, phase, phraseIdx]);

    const LONGEST = PHRASES.reduce((a, b) => a.length > b.length ? a : b);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = (e) => {
        const { left, top } = e.currentTarget.getBoundingClientRect();
        mouseX.set(e.clientX - left);
        mouseY.set(e.clientY - top);
    };

    const gridOffsetX = useMotionValue(0);
    const gridOffsetY = useMotionValue(0);

    const speedX = 0.5;
    const speedY = 0.5;

    useAnimationFrame(() => {
        const currentX = gridOffsetX.get();
        const currentY = gridOffsetY.get();
        gridOffsetX.set((currentX + speedX) % 40);
        gridOffsetY.set((currentY + speedY) % 40);
    });

    const maskImage = useMotionTemplate`radial-gradient(300px circle at ${mouseX}px ${mouseY}px, black, transparent)`;

    return (
        <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            className={cn(
                "relative w-full h-[100dvh] flex flex-col items-center justify-center overflow-hidden bg-background font-sans"
            )}
        >
            <div className="absolute inset-0 z-0 opacity-[0.05]">
                <GridPattern offsetX={gridOffsetX} offsetY={gridOffsetY} />
            </div>
            <motion.div
                className="absolute inset-0 z-0 opacity-40 mix-blend-multiply"
                style={{ maskImage, WebkitMaskImage: maskImage }}
            >
                <GridPattern offsetX={gridOffsetX} offsetY={gridOffsetY} />
            </motion.div>

            <div className="absolute inset-0 pointer-events-none z-0">
                <div className="absolute right-[-20%] top-[-20%] w-[40%] h-[40%] rounded-full bg-orange-500/30 blur-[120px]" />
                <div className="absolute right-[10%] top-[-10%] w-[20%] h-[20%] rounded-full bg-primary/20 blur-[100px]" />
                <div className="absolute left-[-10%] bottom-[-20%] w-[40%] h-[40%] rounded-full bg-blue-500/30 blur-[120px]" />
            </div>

            <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-3xl mx-auto space-y-6 pointer-events-none">
                <div className="space-y-4 mb-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-primary/10 text-primary border border-primary/20 mb-2 font-mono">
                        <LayoutGrid size={14} /> Enreal AI Consulting
                    </div>
                    <AnimatedText
                        text="Enable REAL AI"
                        textClassName="mx-auto font-sans font-black whitespace-nowrap"
                        gradientColors="linear-gradient(90deg, #1C1C1E, #2563EB, #1C1C1E)"
                        gradientAnimationDuration={3}
                        hoverEffect={true}
                    />

                    {/* Subtext container with typewriter effect */}
                    <div style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center' }}>
                        {/* Hidden longest text to maintain height/width boundaries */}
                        <p aria-hidden className="text-lg md:text-xl font-medium invisible whitespace-pre-wrap break-word select-none" style={{ fontFamily: 'Manrope, sans-serif' }}>
                            Upgrade your career or transform your business with<br />{LONGEST}
                        </p>

                        {/* Visible typing text */}
                        <p className="text-lg md:text-xl text-muted-foreground font-medium absolute top-0 left-0 right-0 max-w-lg mx-auto whitespace-pre-wrap break-word" style={{ fontFamily: 'Manrope, sans-serif' }}>
                            Upgrade your career or transform your business with<br />
                            <span style={{ color: '#2563EB', fontWeight: 700 }}>{display}</span>
                            <span className="tw-cursor" style={{
                                display: 'inline-block', width: '0.08em', height: '0.9em',
                                background: '#2563EB', marginLeft: '0.05em', verticalAlign: 'middle', borderRadius: 1
                            }} />
                        </p>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pointer-events-auto mt-8 justify-center items-center">
                    <button
                        onClick={() => navigate('/business')}
                        className="group flex items-center justify-center gap-2 px-7 py-3.5 bg-primary text-primary-foreground font-semibold font-sans rounded-[2rem] hover:bg-blue-600 hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-blue-500/30 active:scale-95 text-[0.95rem]"
                    >
                        Business AI Consulting <Play size={16} fill="currentColor" className="group-hover:scale-110 transition-transform" />
                    </button>
                    <button
                        onClick={() => navigate('/course')}
                        className="group flex items-center justify-center gap-2 px-7 py-3.5 bg-[#1C1C1E] text-white font-semibold font-sans rounded-[2rem] hover:bg-[#3A3A3E] hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-[#1C1C1E]/30 active:scale-95 text-[0.95rem]"
                    >
                        AI Elite Course <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>
        </div>
    );
};

const GridPattern = ({ offsetX, offsetY }) => {
    return (
        <svg className="w-full h-full">
            <defs>
                <motion.pattern
                    id="grid-pattern"
                    width="40"
                    height="40"
                    patternUnits="userSpaceOnUse"
                    x={offsetX}
                    y={offsetY}
                >
                    <path
                        d="M 40 0 L 0 0 0 40"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1"
                        className="text-muted-foreground/60"
                    />
                </motion.pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-pattern)" />
        </svg>
    );
};
