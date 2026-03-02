import { Button } from "./button.jsx";

const integrations = [
    "https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg",
    "https://upload.wikimedia.org/wikipedia/commons/8/8a/Google_Gemini_logo.svg",
    "https://upload.wikimedia.org/wikipedia/commons/7/78/Anthropic_logo.svg",
    "https://upload.wikimedia.org/wikipedia/commons/e/ee/Mistral_AI_logo.svg",
    "https://upload.wikimedia.org/wikipedia/commons/1/1a/Perplexity_AI_logo.svg",
    "https://huggingface.co/front/assets/huggingface_logo-noborder.svg",
    "https://upload.wikimedia.org/wikipedia/commons/a/ab/Meta_Platforms_Inc._logo.svg",
    "https://upload.wikimedia.org/wikipedia/commons/e/e6/Midjourney_Emblem.png",
    "https://upload.wikimedia.org/wikipedia/commons/f/fb/Microsoft_Copilot_Icon.svg",
    "https://github.githubassets.com/images/modules/site/copilot/cp-icon.svg",
    "https://groq.com/wp-content/uploads/2024/02/Groq-logo-black.svg",
    "https://upload.wikimedia.org/wikipedia/commons/e/e0/Stability_AI_logo.jpg",
    "https://avatars.githubusercontent.com/u/73934372?s=200&v=4",
    "https://js.langchain.com/v0.1/img/favicon.png",
    "https://upload.wikimedia.org/wikipedia/commons/9/90/Runway_logo.svg",
    "https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png",
    "https://assets.vercel.com/image/upload/v1607554385/repositories/vercel/logo.png",
    "https://upload.wikimedia.org/wikipedia/commons/e/e4/X-%28X.com%29-Logo.svg"
];

export default function IntegrationsSection() {
    return (
        <section id="program" className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center border border-gray-200 p-8 rounded-3xl" style={{ backgroundColor: '#fff' }}>
            {/* Left Side */}
            <div>
                <p className="uppercase text-sm font-semibold mb-3 tracking-widest" style={{ color: '#059669', fontFamily: 'JetBrains Mono, monospace' }}>
          // INTELLIGENCE
                </p>
                <h2 className="text-5xl font-bold mt-2 mb-6" style={{ letterSpacing: '-0.03em', lineHeight: 1.1, fontFamily: 'Inter, sans-serif' }}>
                    Supercharge yourself<br />with AI components.
                </h2>
                <p className="text-gray-600 mb-8 max-w-md" style={{ fontFamily: 'Manrope, sans-serif', fontSize: '1.1rem', lineHeight: 1.6 }}>
                    Build sleek, responsive intelligence into your workflows. Integrate the world's most powerful AI engines directly into your daily operations.
                </p>
                <div className="flex gap-4">
                    <Button className="bg-black text-white px-6 py-3 rounded-full font-medium transition-colors hover:bg-gray-800 shadow-none">
                        <a href="#curriculum">Explore Curriculum</a>
                    </Button>
                    <Button variant="outline" className="border border-gray-300 px-6 py-3 rounded-full font-medium hover:bg-gray-50 transition-colors shadow-none text-black">
                        <a href="#outcomes">View Outcomes →</a>
                    </Button>
                </div>
            </div>

            {/* Right Side */}
            <div className="grid grid-cols-6 gap-3 ml-auto">
                {integrations.map((url, idx) => (
                    <div
                        key={idx}
                        className="relative w-[4.5rem] h-[4.5rem] p-3 bg-white shadow-sm border border-gray-100 flex items-center justify-center transition-transform hover:scale-105"
                        style={{
                            clipPath: "polygon(25% 0%, 75% 0%, 100% 25%, 100% 75%, 75% 100%, 25% 100%, 0% 75%, 0% 25%)",
                        }}
                    >
                        <img
                            src={url}
                            alt={`ai-integration-${idx}`}
                            className="w-full h-full object-contain"
                        />
                    </div>
                ))}
            </div>
        </section>
    );
}
