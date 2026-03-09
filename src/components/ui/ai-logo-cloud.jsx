import { InfiniteSlider } from "./infinite-slider.jsx";
import { cn } from "../../lib/utils.js";

export function LogoCloud({ className, logos, ...props }) {
    return (
        <div
            {...props}
            className={cn(
                "overflow-hidden py-4 [mask-image:linear-gradient(to_right,transparent,black,transparent)]",
                className
            )}
        >
            <InfiniteSlider gap={42} reverse duration={80} durationOnHover={25}>
                {logos.map((logo) => (
                    <img
                        alt={logo.alt}
                        className="pointer-events-none h-4 select-none md:h-5 brightness-0 dark:invert"
                        height={logo.height || "auto"}
                        key={`logo-${logo.alt}`}
                        loading="lazy"
                        src={logo.src}
                        width={logo.width || "auto"}
                    />
                ))}
            </InfiniteSlider>
        </div>
    );
}

const logos = [
    {
        src: "https://svgl.app/library/nvidia-wordmark-light.svg",
        alt: "Nvidia Logo",
    },
    {
        src: "https://svgl.app/library/supabase_wordmark_light.svg",
        alt: "Supabase Logo",
    },
    {
        src: "https://svgl.app/library/openai_wordmark_light.svg",
        alt: "OpenAI Logo",
    },
    {
        src: "https://svgl.app/library/turso-wordmark-light.svg",
        alt: "Turso Logo",
    },
    {
        src: "https://svgl.app/library/vercel_wordmark.svg",
        alt: "Vercel Logo",
    },
    {
        src: "https://svgl.app/library/github_wordmark_light.svg",
        alt: "GitHub Logo",
    },
    {
        src: "https://svgl.app/library/claude-ai-wordmark-icon_light.svg",
        alt: "Claude AI Logo",
    },
    {
        src: "https://svgl.app/library/clerk-wordmark-light.svg",
        alt: "Clerk Logo",
    },
];

export function AILogoCloudSection() {
    return (
        <section id="tools" className="sec-rev" style={{ padding: '8rem 5vw', background: '#F5F5F7' }}>
            <div className="relative mx-auto max-w-4xl flex flex-col items-center">
                <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', letterSpacing: '0.1em', color: '#059669', marginBottom: '1rem', textTransform: 'uppercase' }}>
                    // INTELLIGENCE STACK
                </p>
                <h2 className="text-center" style={{ fontSize: '2.5rem', fontWeight: 500, letterSpacing: '-0.03em', marginBottom: '3rem' }}>
                    Manage different AI tools.<br />
                    Maximize your capability.
                </h2>

                <div className="mx-auto my-8 h-px w-full max-w-sm bg-[rgba(0,0,0,0.1)]" style={{ WebkitMaskImage: 'linear-gradient(to right, transparent, black, transparent)' }} />

                <LogoCloud logos={logos} className="w-full max-w-5xl" />

                <div className="mx-auto mt-8 h-px w-full max-w-sm bg-[rgba(0,0,0,0.1)]" style={{ WebkitMaskImage: 'linear-gradient(to right, transparent, black, transparent)' }} />
            </div>
        </section>
    );
}
