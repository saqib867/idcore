export default function AboutUs() {
    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');

                .au-root {
                    --cream: #F9F5EE;
                    --warm-white: #FDFAF4;
                    --ink: #1A1612;
                    --muted: #7A6F63;
                    --accent: #C4A97D;
                    --accent-light: #E8D9C0;
                    --border: #E0D8CD;
                    background: var(--warm-white);
                    color: var(--ink);
                    font-family: 'DM Sans', sans-serif;
                    overflow-x: hidden;
                }

                .au-page {
                    max-width: 960px;
                    margin: 0 auto;
                    padding: 80px 32px 120px;
                }

                /* HERO */
                .au-hero {
                    text-align: center;
                    margin-bottom: 80px;
                }

                .au-eyebrow {
                    font-family: 'DM Sans', sans-serif;
                    font-size: 11px;
                    font-weight: 500;
                    letter-spacing: 0.22em;
                    text-transform: uppercase;
                    color: var(--accent);
                    margin-bottom: 20px;
                    opacity: 0;
                    animation: au-fadeUp 0.7s ease forwards 0.1s;
                }

                .au-hero-title {
                    font-family: 'Cormorant Garamond', serif;
                    font-size: clamp(54px, 8vw, 96px);
                    font-weight: 300;
                    line-height: 0.95;
                    letter-spacing: -0.02em;
                    color: var(--ink);
                    opacity: 0;
                    animation: au-fadeUp 0.8s ease forwards 0.25s;
                }

                .au-hero-title em {
                    font-style: italic;
                    color: var(--accent);
                }

                .au-hero-rule {
                    width: 1px;
                    height: 64px;
                    background: linear-gradient(to bottom, var(--accent), transparent);
                    margin: 32px auto 0;
                    opacity: 0;
                    animation: au-fadeUp 0.6s ease forwards 0.5s;
                }

                /* INTRO */
                .au-intro {
                    max-width: 640px;
                    margin: 0 auto 80px;
                    text-align: center;
                    opacity: 0;
                    animation: au-fadeUp 0.8s ease forwards 0.6s;
                }

                .au-intro p {
                    font-family: 'Cormorant Garamond', serif;
                    font-size: 22px;
                    font-weight: 300;
                    line-height: 1.7;
                    color: var(--muted);
                }

                .au-intro strong {
                    font-weight: 600;
                    color: var(--ink);
                }

                /* SPLIT */
                .au-split {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 0;
                    margin-bottom: 80px;
                    border: 1px solid var(--border);
                    opacity: 0;
                    animation: au-fadeUp 0.8s ease forwards 0.75s;
                }

                .au-split-panel {
                    padding: 52px 44px;
                }

                .au-split-panel:first-child {
                    border-right: 1px solid var(--border);
                }

                .au-panel-num {
                    font-family: 'Cormorant Garamond', serif;
                    font-size: 72px;
                    font-weight: 300;
                    color: var(--accent-light);
                    line-height: 1;
                    margin-bottom: 12px;
                }

                .au-panel-title {
                    font-family: 'DM Sans', sans-serif;
                    font-size: 11px;
                    font-weight: 500;
                    letter-spacing: 0.18em;
                    text-transform: uppercase;
                    color: var(--accent);
                    margin-bottom: 20px;
                }

                .au-panel-body {
                    font-size: 15px;
                    line-height: 1.8;
                    color: var(--muted);
                }

                /* WHY */
                .au-why {
                    opacity: 0;
                    animation: au-fadeUp 0.8s ease forwards 0.9s;
                }

                .au-why-header {
                    display: flex;
                    align-items: center;
                    gap: 24px;
                    margin-bottom: 48px;
                }

                .au-why-line {
                    flex: 1;
                    height: 1px;
                    background: var(--border);
                }

                .au-why-label {
                    font-family: 'DM Sans', sans-serif;
                    font-size: 11px;
                    font-weight: 500;
                    letter-spacing: 0.2em;
                    text-transform: uppercase;
                    color: var(--muted);
                    white-space: nowrap;
                }

                .au-why-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 2px;
                    background: var(--border);
                }

                .au-card {
                    background: var(--warm-white);
                    padding: 40px 36px;
                    position: relative;
                    overflow: hidden;
                    transition: background 0.3s ease;
                    cursor: default;
                }

                .au-card::before {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background: var(--cream);
                    transform: scaleY(0);
                    transform-origin: bottom;
                    transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                }

                .au-card:hover::before {
                    transform: scaleY(1);
                }

                .au-card-icon {
                    font-size: 28px;
                    margin-bottom: 16px;
                    position: relative;
                    z-index: 1;
                    display: block;
                }

                .au-card-text {
                    font-family: 'Cormorant Garamond', serif;
                    font-size: 20px;
                    font-weight: 400;
                    color: var(--ink);
                    line-height: 1.4;
                    position: relative;
                    z-index: 1;
                }

                .au-card-sub {
                    font-family: 'DM Sans', sans-serif;
                    font-size: 13px;
                    color: var(--muted);
                    margin-top: 6px;
                    line-height: 1.6;
                    position: relative;
                    z-index: 1;
                }

                /* CLOSING */
                .au-closing {
                    text-align: center;
                    padding: 80px 40px 0;
                    opacity: 0;
                    animation: au-fadeUp 0.8s ease forwards 1.05s;
                }

                .au-closing blockquote {
                    font-family: 'Cormorant Garamond', serif;
                    font-size: clamp(24px, 3.5vw, 36px);
                    font-style: italic;
                    font-weight: 300;
                    color: var(--ink);
                    line-height: 1.5;
                    max-width: 560px;
                    margin: 0 auto 24px;
                }

                .au-closing cite {
                    font-family: 'DM Sans', sans-serif;
                    font-size: 11px;
                    letter-spacing: 0.2em;
                    text-transform: uppercase;
                    color: var(--accent);
                    font-style: normal;
                }

                @keyframes au-fadeUp {
                    from { opacity: 0; transform: translateY(24px); }
                    to   { opacity: 1; transform: translateY(0); }
                }

                @media (max-width: 640px) {
                    .au-split { grid-template-columns: 1fr; }
                    .au-split-panel:first-child { border-right: none; border-bottom: 1px solid var(--border); }
                    .au-why-grid { grid-template-columns: 1fr; }
                    .au-page { padding: 48px 20px 80px; }
                }
            `}</style>

            <div className="au-root">
                <div className="au-page">

                    {/* Hero */}
                    <header className="au-hero">
                        <p className="au-eyebrow">Est. 2020 &ensp;·&ensp; Home Décor</p>
                        <h1 className="au-hero-title">
                            About<br /><em>Your Brand</em>
                        </h1>
                        <div className="au-hero-rule" />
                    </header>

                    {/* Intro */}
                    <div className="au-intro">
                        <p>
                            Welcome to <strong>Your Brand Name</strong> — where creativity meets
                            comfort. We believe every space tells a story, and our goal is to help
                            you transform your home into a place that truly reflects your personality
                            and style.
                        </p>
                    </div>

                    {/* Story / Mission */}
                    <div className="au-split">
                        <div className="au-split-panel">
                            <div className="au-panel-num">01</div>
                            <p className="au-panel-title">Our Story</p>
                            <p className="au-panel-body">
                                Our journey started with a passion for home decoration. We wanted to
                                create a place where people could easily find stylish, high-quality
                                décor pieces. What began as a small idea has grown into a curated
                                store that makes homes feel genuinely special.
                            </p>
                        </div>
                        <div className="au-split-panel">
                            <div className="au-panel-num">02</div>
                            <p className="au-panel-title">Our Mission</p>
                            <p className="au-panel-body">
                                To help you create spaces you love. We provide modern and elegant
                                decorative items that inspire creativity and bring lasting comfort to
                                your everyday life — one beautifully chosen piece at a time.
                            </p>
                        </div>
                    </div>

                    {/* Why Choose Us */}
                    <div className="au-why">
                        <div className="au-why-header">
                            <div className="au-why-line" />
                            <span className="au-why-label">Why Choose Us</span>
                            <div className="au-why-line" />
                        </div>

                        <div className="au-why-grid">
                            <div className="au-card">
                                <span className="au-card-icon">✦</span>
                                <p className="au-card-text">Carefully Curated</p>
                                <p className="au-card-sub">Every product is hand-selected for its beauty, quality, and character.</p>
                            </div>
                            <div className="au-card">
                                <span className="au-card-icon">◈</span>
                                <p className="au-card-text">Modern Designs</p>
                                <p className="au-card-sub">Stylish pieces that feel timeless, never trend-chasing.</p>
                            </div>
                            <div className="au-card">
                                <span className="au-card-icon">◇</span>
                                <p className="au-card-text">Premium Materials</p>
                                <p className="au-card-sub">Crafted to last — quality you can feel the moment you hold it.</p>
                            </div>
                            <div className="au-card">
                                <span className="au-card-icon">○</span>
                                <p className="au-card-text">Customer-First</p>
                                <p className="au-card-sub">Real support from people who genuinely care about your home.</p>
                            </div>
                        </div>
                    </div>

                    {/* Closing Quote */}
                    <div className="au-closing">
                        <blockquote>
                            "Your home is the canvas — we simply help you paint it beautifully."
                        </blockquote>
                        <cite>— The Your Brand Name Team</cite>
                    </div>

                </div>
            </div>
        </>
    );
}