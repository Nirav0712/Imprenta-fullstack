import { useState, useEffect } from "react";
import { themeService } from "../../services/themeService";
import { FiSave, FiRefreshCw } from "react-icons/fi";

const PRESETS = {
    "imprenta-ocean": {
        name: "Imprenta Ocean",
        colors: {
            primary: "#0B5FA5",
            secondary: "#123B73",
            accent: "#00AEEF",
            heading: "#FFFFFF",
            paragraph: "#9FB3C8",
            background: "#061525",
            surface: "#12263A",
            border: "#29435C",
            button: "#00AEEF",
            buttonHover: "#0095D1",
            gradientStart: "#123B73",
            gradientEnd: "#00AEEF",
        },
        design: { style: "modern", radius: "12px", shadow: "subtle" },
        typography: { headingFont: "Poppins", bodyFont: "Inter" },
    },
    "forest-premium": {
        name: "Forest Premium",
        colors: {
            primary: "#176B5B",
            secondary: "#0D3B36",
            accent: "#35C98A",
            heading: "#FFFFFF",
            paragraph: "#A8C7BE",
            background: "#071B18",
            surface: "#102B27",
            border: "#28504A",
            button: "#176B5B",
            buttonHover: "#1b816d",
            gradientStart: "#0D3B36",
            gradientEnd: "#35C98A",
        },
        design: { style: "elegant", radius: "8px", shadow: "medium" },
        typography: { headingFont: "Montserrat", bodyFont: "Inter" },
    },
    "royal-burgundy": {
        name: "Royal Burgundy",
        colors: {
            primary: "#8B2F4A",
            secondary: "#4A1728",
            accent: "#D6A85F",
            heading: "#FFFFFF",
            paragraph: "#C9B5BC",
            background: "#170A10",
            surface: "#27121B",
            border: "#4A2935",
            button: "#8B2F4A",
            buttonHover: "#9e3554",
            gradientStart: "#4A1728",
            gradientEnd: "#8B2F4A",
        },
        design: { style: "luxury", radius: "4px", shadow: "luxury-glow" },
        typography: { headingFont: "Inter", bodyFont: "Manrope" },
    },
};

const ThemeCustomization = () => {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [activePreset, setActivePreset] = useState("imprenta-ocean");

    const [theme, setTheme] = useState(PRESETS["imprenta-ocean"]);

    useEffect(() => {
        loadTheme();
    }, []);

    const loadTheme = async () => {
        try {
            const dbTheme = await themeService.getTheme();
            if (dbTheme && dbTheme.colors) {
                setTheme({
                    colors: dbTheme.colors,
                    design: dbTheme.design,
                    typography: dbTheme.typography,
                });
                setActivePreset(dbTheme.activePreset || "custom");
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleColorChange = (key, value) => {
        setActivePreset("custom");
        setTheme((prev) => ({
            ...prev,
            colors: { ...prev.colors, [key]: value },
        }));
    };

    const handlePresetChange = (presetId) => {
        setActivePreset(presetId);
        if (presetId !== "custom" && PRESETS[presetId]) {
            setTheme(PRESETS[presetId]);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            await themeService.updateTheme({
                activePreset,
                colors: theme.colors,
                design: theme.design,
                typography: theme.typography,
            });
            alert("Theme updated successfully.");
        } catch (error) {
            console.error(error);
            alert("Failed to update theme.");
        } finally {
            setSaving(false);
        }
    };

    const handleReset = () => {
        if (window.confirm("Reset theme to Imprenta Ocean?")) {
            setActivePreset("imprenta-ocean");
            setTheme(PRESETS["imprenta-ocean"]);
        }
    };

    if (loading) {
        return <div className="text-white">Loading theme settings...</div>;
    }

    return (
        <div className="space-y-8 pb-20">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-4xl font-black text-white">Theme Customization</h1>
                    <p className="mt-2 text-slate-400">Customize your client website's visual identity.</p>
                </div>
                <div className="flex items-center gap-4">
                    <button onClick={handleReset} className="flex items-center gap-2 rounded-xl border border-white/10 px-5 py-3 text-white transition hover:bg-white/5">
                        <FiRefreshCw /> Reset
                    </button>
                    <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 rounded-xl bg-sky-500 px-5 py-3 font-semibold text-white transition hover:bg-sky-600 disabled:opacity-50">
                        <FiSave /> {saving ? "Saving..." : "Save Theme"}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8">
                <div className="space-y-8">
                    {/* PRESETS */}
                    <div className="rounded-3xl border border-white/10 bg-[#101B2D] p-6">
                        <h2 className="mb-4 text-xl font-bold text-white">Theme Presets</h2>
                        <div className="flex flex-wrap gap-4">
                            {Object.entries(PRESETS).map(([key, data]) => (
                                <button
                                    key={key}
                                    onClick={() => handlePresetChange(key)}
                                    className={`rounded-xl px-5 py-3 font-medium transition ${activePreset === key ? "bg-sky-500 text-white" : "border border-white/10 bg-white/5 text-slate-400 hover:bg-white/10"}`}
                                >
                                    {data.name}
                                </button>
                            ))}
                            <button
                                onClick={() => setActivePreset("custom")}
                                className={`rounded-xl px-5 py-3 font-medium transition ${activePreset === "custom" ? "bg-sky-500 text-white" : "border border-white/10 bg-white/5 text-slate-400 hover:bg-white/10"}`}
                            >
                                Custom Theme
                            </button>
                        </div>
                    </div>

                    {/* PALETTE */}
                    <div className="rounded-3xl border border-white/10 bg-[#101B2D] p-6">
                        <h2 className="mb-6 text-xl font-bold text-white">Color Palette</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                            {Object.entries(theme.colors).map(([key, value]) => (
                                <div key={key} className="flex flex-col gap-2">
                                    <label className="text-sm font-medium text-slate-400 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()} Color</label>
                                    <div className="flex items-center gap-3">
                                        <input
                                            type="color"
                                            value={value}
                                            onChange={(e) => handleColorChange(key, e.target.value)}
                                            className="h-10 w-10 cursor-pointer rounded border-none bg-transparent"
                                        />
                                        <input
                                            type="text"
                                            value={value}
                                            onChange={(e) => handleColorChange(key, e.target.value)}
                                            className="w-full rounded-lg border border-white/10 bg-[#08111F] px-3 py-2 text-white"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* DESIGN */}
                    <div className="rounded-3xl border border-white/10 bg-[#101B2D] p-6">
                        <h2 className="mb-6 text-xl font-bold text-white">Design & Typography</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-400">Design Style</label>
                                <select
                                    value={theme.design.style}
                                    onChange={(e) => { setActivePreset("custom"); setTheme(p => ({ ...p, design: { ...p.design, style: e.target.value } })) }}
                                    className="w-full rounded-lg border border-white/10 bg-[#08111F] px-3 py-2 text-white"
                                >
                                    <option value="modern">Modern</option>
                                    <option value="minimal">Minimal</option>
                                    <option value="luxury">Luxury</option>
                                    <option value="corporate">Corporate</option>
                                    <option value="soft">Soft / Rounded</option>
                                </select>
                            </div>
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-400">Border Radius</label>
                                <select
                                    value={theme.design.radius}
                                    onChange={(e) => { setActivePreset("custom"); setTheme(p => ({ ...p, design: { ...p.design, radius: e.target.value } })) }}
                                    className="w-full rounded-lg border border-white/10 bg-[#08111F] px-3 py-2 text-white"
                                >
                                    <option value="0px">Sharp (0px)</option>
                                    <option value="4px">4px</option>
                                    <option value="8px">8px</option>
                                    <option value="12px">12px</option>
                                    <option value="16px">16px</option>
                                    <option value="24px">24px</option>
                                    <option value="999px">Fully Rounded</option>
                                </select>
                            </div>
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-400">Shadow Style</label>
                                <select
                                    value={theme.design.shadow}
                                    onChange={(e) => { setActivePreset("custom"); setTheme(p => ({ ...p, design: { ...p.design, shadow: e.target.value } })) }}
                                    className="w-full rounded-lg border border-white/10 bg-[#08111F] px-3 py-2 text-white"
                                >
                                    <option value="none">None</option>
                                    <option value="subtle">Subtle</option>
                                    <option value="medium">Medium</option>
                                    <option value="strong">Strong</option>
                                    <option value="luxury-glow">Luxury Glow</option>
                                </select>
                            </div>
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-400">Heading Font</label>
                                <select
                                    value={theme.typography.headingFont}
                                    onChange={(e) => { setActivePreset("custom"); setTheme(p => ({ ...p, typography: { ...p.typography, headingFont: e.target.value } })) }}
                                    className="w-full rounded-lg border border-white/10 bg-[#08111F] px-3 py-2 text-white"
                                >
                                    <option value="Inter">Inter</option>
                                    <option value="Poppins">Poppins</option>
                                    <option value="Montserrat">Montserrat</option>
                                    <option value="Manrope">Manrope</option>
                                </select>
                            </div>
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-400">Body Font</label>
                                <select
                                    value={theme.typography.bodyFont}
                                    onChange={(e) => { setActivePreset("custom"); setTheme(p => ({ ...p, typography: { ...p.typography, bodyFont: e.target.value } })) }}
                                    className="w-full rounded-lg border border-white/10 bg-[#08111F] px-3 py-2 text-white"
                                >
                                    <option value="Inter">Inter</option>
                                    <option value="Poppins">Poppins</option>
                                    <option value="Open Sans">Open Sans</option>
                                    <option value="Manrope">Manrope</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                {/* LIVE PREVIEW */}
                <div className="sticky top-6 h-fit rounded-3xl border border-white/10 bg-[#101B2D] p-6 preview-container">
                    <h2 className="mb-6 text-xl font-bold text-white">Live Preview</h2>
                    <div
                        style={{
                            backgroundColor: theme.colors.background,
                            fontFamily: theme.typography.bodyFont,
                            borderRadius: theme.design.radius,
                            border: `1px solid ${theme.colors.border}`,
                        }}
                        className="overflow-hidden p-6 relative"
                    >
                        {/* Visual gradient injection */}
                        <div style={{ background: `linear-gradient(to right, ${theme.colors.gradientStart}, ${theme.colors.gradientEnd})`, opacity: 0.1 }} className="absolute inset-0 blur-3xl pointer-events-none" />

                        <h3 style={{ color: theme.colors.heading, fontFamily: theme.typography.headingFont }} className="text-2xl font-black mb-2 relative z-10">
                            Premium Packaging
                        </h3>
                        <p style={{ color: theme.colors.paragraph }} className="mb-6 leading-relaxed relative z-10 text-sm">
                            Discover our comprehensive catalog of professional printing solutions designed for your brand.
                        </p>

                        <div style={{ backgroundColor: theme.colors.surface, borderRadius: theme.design.radius, border: `1px solid ${theme.colors.border}`, boxShadow: theme.design.shadow === 'subtle' ? '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' : 'none' }} className="p-4 mb-6 relative z-10">
                            <div className="h-32 mb-4 rounded-lg bg-black/20 flex items-center justify-center">
                                <span style={{ color: theme.colors.heading }}>Image Graphic</span>
                            </div>
                            <h4 style={{ color: theme.colors.heading, fontFamily: theme.typography.headingFont }} className="font-bold mb-1">Mono Cartons</h4>
                            <p style={{ color: theme.colors.paragraph }} className="text-xs mb-4">High quality paper packaging</p>

                            <button style={{ backgroundColor: theme.colors.button, color: theme.colors.heading, borderRadius: theme.design.radius }} className="w-full py-2 font-semibold text-sm transition-opacity hover:opacity-90">
                                Explore Product →
                            </button>
                        </div>

                        <button style={{ backgroundColor: theme.colors.primary, color: '#FFF', borderRadius: theme.design.radius }} className="w-full py-3 font-semibold relative z-10 transition-opacity hover:opacity-90">
                            Primary Action
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ThemeCustomization;
