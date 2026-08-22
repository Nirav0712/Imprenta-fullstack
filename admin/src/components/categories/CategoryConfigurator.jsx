import { FiPlus, FiTrash2, FiSettings, FiMenu, FiChevronUp, FiChevronDown } from "react-icons/fi";
import { useState } from "react";

const CategoryConfigurator = ({ configurator, setConfigurator }) => {

    // Global Config Update 
    const updateGlobal = (key, value) => {
        setConfigurator(prev => ({ ...prev, [key]: value }));
    };

    // Generate Unique ID
    const generateId = () => Math.random().toString(36).substr(2, 9);

    // SECTION MANAGEMENT
    const addSection = () => {
        const newSection = {
            id: generateId(),
            title: "New Configuration Section",
            type: "dropdown",
            enabled: true,
            required: false,
            order: configurator.sections.length + 1,
            options: []
        };
        const newSections = [...configurator.sections, newSection];
        setConfigurator({ ...configurator, sections: newSections });
    };

    const updateSection = (sId, key, value) => {
        const newSections = configurator.sections.map(s => s.id === sId ? { ...s, [key]: value } : s);
        setConfigurator({ ...configurator, sections: newSections });
    };

    const deleteSection = (sId) => {
        if (!window.confirm("Are you sure you want to delete this entire configuration section?")) return;
        const newSections = configurator.sections.filter(s => s.id !== sId);
        setConfigurator({ ...configurator, sections: newSections });
    };

    // Reorder Sections
    const [draggedSectionIndex, setDraggedSectionIndex] = useState(null);

    const handleSectionDragStart = (idx) => {
        setDraggedSectionIndex(idx);
    };

    const handleSectionDragOver = (e, idx) => {
        e.preventDefault();
    };

    const handleSectionDrop = (e, dropIdx) => {
        e.preventDefault();
        if (draggedSectionIndex === null || draggedSectionIndex === dropIdx) return;

        const newSections = [...configurator.sections];
        const draggedItem = newSections[draggedSectionIndex];
        newSections.splice(draggedSectionIndex, 1);
        newSections.splice(dropIdx, 0, draggedItem);

        // reset orders
        newSections.forEach((sec, i) => sec.order = i + 1);
        setConfigurator({ ...configurator, sections: newSections });
        setDraggedSectionIndex(null);
    };

    // OPTION MANAGEMENT
    const addOption = (sId) => {
        const section = configurator.sections.find(s => s.id === sId);
        if (!section) return;

        const newOption = {
            id: generateId(),
            name: "New Option",
            priceAdjustment: 0,
            enabled: true,
            order: section.options.length + 1
        };

        const newSections = configurator.sections.map(s => {
            if (s.id === sId) {
                return { ...s, options: [...s.options, newOption] };
            }
            return s;
        });

        setConfigurator({ ...configurator, sections: newSections });
    };

    const updateOption = (sId, oId, key, value) => {
        const newSections = configurator.sections.map(s => {
            if (s.id === sId) {
                const newOptions = s.options.map(o => o.id === oId ? { ...o, [key]: value } : o);
                return { ...s, options: newOptions };
            }
            return s;
        });
        setConfigurator({ ...configurator, sections: newSections });
    };

    const deleteOption = (sId, oId) => {
        const newSections = configurator.sections.map(s => {
            if (s.id === sId) {
                return { ...s, options: s.options.filter(o => o.id !== oId) };
            }
            return s;
        });
        setConfigurator({ ...configurator, sections: newSections });
    };

    // Move option natively within a section using basic UP/DOWN logic 
    const moveOption = (sId, oIdx, direction) => {
        const newSections = configurator.sections.map(s => {
            if (s.id === sId) {
                const newOptions = [...s.options];
                if (direction === 'up' && oIdx > 0) {
                    [newOptions[oIdx - 1], newOptions[oIdx]] = [newOptions[oIdx], newOptions[oIdx - 1]];
                } else if (direction === 'down' && oIdx < newOptions.length - 1) {
                    [newOptions[oIdx + 1], newOptions[oIdx]] = [newOptions[oIdx], newOptions[oIdx + 1]];
                }
                newOptions.forEach((o, i) => o.order = i + 1);
                return { ...s, options: newOptions };
            }
            return s;
        });
        setConfigurator({ ...configurator, sections: newSections });
    };

    return (
        <section className="rounded-3xl border border-white/10 bg-[#101B2D] p-6 lg:p-8">
            {/* HEADER & GLOBAL TOGGLE */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                    <h2 className="flex items-center gap-2 text-2xl font-bold text-white">
                        <FiSettings className="text-sky-400" />
                        Product Configurator
                    </h2>
                    <p className="mt-2 text-slate-400 text-sm">
                        Configure dynamic fields, variations, and pricing structures directly inherited by products inside this category.
                    </p>
                </div>

                {/* Toggle Configurator ON/OFF */}
                <div className="flex items-center gap-3 bg-[#0A1220] p-3 rounded-2xl border border-white/5">
                    <span className="text-xs font-black text-slate-400 uppercase tracking-widest leading-none mt-0.5">
                        {configurator.enabled ? "Enabled" : "Disabled"}
                    </span>
                    <button
                        type="button"
                        onClick={() => updateGlobal("enabled", !configurator.enabled)}
                        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none ${configurator.enabled ? 'bg-sky-500' : 'bg-white/10'}`}
                    >
                        <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${configurator.enabled ? 'translate-x-5' : 'translate-x-1'}`} />
                    </button>
                </div>
            </div>

            {configurator.enabled && (
                <div className="space-y-10 animate-fade-in">

                    {/* BASE CONFIGURATION */}
                    <div className="bg-[#0A1220] p-6 rounded-2xl border border-white/5 space-y-6">
                        <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-2">Base Minimums</h3>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <label className="mb-2 block text-xs font-bold text-slate-400 uppercase tracking-widest">Base Minimum QTY</label>
                                <input
                                    type="number"
                                    min="1"
                                    value={configurator.baseMinQuantity}
                                    onChange={(e) => updateGlobal("baseMinQuantity", Number(e.target.value) || 1)}
                                    className="w-full rounded-xl border border-white/10 bg-[#08111F] px-4 py-3 text-white outline-none focus:border-sky-500"
                                />
                            </div>

                            <div className="flex items-center gap-3 bg-[#08111F] p-4 rounded-xl border border-white/10 cursor-pointer" onClick={() => updateGlobal("allowCustomQuantity", !configurator.allowCustomQuantity)}>
                                <input type="checkbox" checked={configurator.allowCustomQuantity} readOnly className="w-5 h-5 accent-sky-500 cursor-pointer" />
                                <div>
                                    <span className="block text-sm font-bold text-white">Custom Quantity</span>
                                    <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Allow User Input</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 bg-[#08111F] p-4 rounded-xl border border-white/10 cursor-pointer" onClick={() => updateGlobal("allowCustomSize", !configurator.allowCustomSize)}>
                                <input type="checkbox" checked={configurator.allowCustomSize} readOnly className="w-5 h-5 accent-sky-500 cursor-pointer" />
                                <div>
                                    <span className="block text-sm font-bold text-white">Custom Size Block</span>
                                    <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Allow WxH inputs</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <hr className="border-white/10" />

                    {/* DYNAMIC SECTIONS */}
                    <div>
                        <div className="flex items-center justify-between mb-5">
                            <h3 className="text-lg font-bold text-white tracking-widest uppercase">Configuration Sections</h3>
                            <button type="button" onClick={addSection} className="flex items-center gap-2 rounded-xl bg-sky-500/20 text-sky-400 px-4 py-2 text-sm font-bold hover:bg-sky-500 hover:text-white transition">
                                <FiPlus /> Add Section
                            </button>
                        </div>

                        {configurator.sections.length === 0 ? (
                            <div className="text-center py-10 bg-white/5 border border-dashed border-white/20 rounded-2xl text-slate-500">
                                <p className="text-sm font-semibold">No configuration sections added yet.</p>
                                <p className="text-xs mt-1">Click "Add Section" to create dropdowns, materials, checkboxes, etc.</p>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {configurator.sections.map((section, sIdx) => (
                                    <div
                                        key={section.id}
                                        className="bg-[#050B14] rounded-2xl border border-white/10 overflow-hidden shadow-lg group relative"
                                        draggable
                                        onDragStart={() => handleSectionDragStart(sIdx)}
                                        onDragOver={(e) => handleSectionDragOver(e, sIdx)}
                                        onDrop={(e) => handleSectionDrop(e, sIdx)}
                                    >

                                        {/* Section Header */}
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-[#08111F] border-b border-white/5 group-hover:bg-[#0A1526] transition-colors cursor-move">
                                            <div className="flex items-center gap-4 flex-1">
                                                <div className="text-slate-500/50 group-hover:text-slate-400 transition" title="Drag to reorder">
                                                    <FiMenu size={20} />
                                                </div>

                                                <div className="flex-1 max-w-sm">
                                                    <label className="text-[10px] font-black uppercase text-sky-500/80 tracking-widest block mb-1">Section Title</label>
                                                    <input
                                                        value={section.title}
                                                        onChange={e => updateSection(section.id, "title", e.target.value)}
                                                        placeholder="e.g. Materials, Binding, etc..."
                                                        className="w-full bg-transparent border-b border-dashed border-slate-700 pb-1 text-white text-lg font-bold outline-none focus:border-sky-500 transition"
                                                    />
                                                </div>

                                                <div className="flex-1 max-w-[150px]">
                                                    <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest block mb-1">Field Type</label>
                                                    <select
                                                        value={section.type}
                                                        onChange={e => updateSection(section.id, "type", e.target.value)}
                                                        className="w-full bg-[#101B2D] border border-white/10 rounded-lg px-2 py-1.5 text-xs text-white outline-none cursor-pointer"
                                                    >
                                                        <option value="dropdown">Dropdown ▼</option>
                                                        <option value="radio">Radio Button ◉</option>
                                                        <option value="checkbox">Checkbox ☑</option>
                                                        <option value="text">Text Input ✎</option>
                                                        <option value="number">Number Input #</option>
                                                        <option value="quantity">Quantity Tiers</option>
                                                        <option value="custom_size">Custom Size Grid</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-4 shrink-0">
                                                <div className="flex flex-col items-center">
                                                    <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest block mb-1">REQ</label>
                                                    <button
                                                        type="button"
                                                        onClick={() => updateSection(section.id, "required", !section.required)}
                                                        className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-200 focus:outline-none ${section.required ? 'bg-rose-500' : 'bg-slate-700'}`}
                                                    >
                                                        <span className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white transition duration-200 ${section.required ? 'translate-x-4' : 'translate-x-1'}`} />
                                                    </button>
                                                </div>
                                                <div className="flex flex-col items-center">
                                                    <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest block mb-1">{section.enabled ? 'ON' : 'OFF'}</label>
                                                    <button
                                                        type="button"
                                                        onClick={() => updateSection(section.id, "enabled", !section.enabled)}
                                                        className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-200 focus:outline-none ${section.enabled ? 'bg-sky-500' : 'bg-slate-700'}`}
                                                    >
                                                        <span className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white transition duration-200 ${section.enabled ? 'translate-x-4' : 'translate-x-1'}`} />
                                                    </button>
                                                </div>
                                                <div className="w-px h-8 bg-white/10"></div>
                                                <button type="button" onClick={() => deleteSection(section.id)} className="text-slate-500 hover:text-red-400 p-2 rounded-xl hover:bg-red-500/10 transition">
                                                    <FiTrash2 size={18} />
                                                </button>
                                            </div>
                                        </div>

                                        {/* Options Area */}
                                        <div className="p-5">
                                            {section.options.length > 0 ? (
                                                <div className="space-y-2 mb-4">
                                                    {section.options.map((opt, oIdx) => (
                                                        <div key={opt.id} className="flex flex-wrap md:flex-nowrap items-center gap-3 p-3 bg-white/5 border border-white/5 rounded-xl hover:border-white/10 transition">

                                                            {/* Reorder Arrows */}
                                                            <div className="flex flex-col shrink-0">
                                                                <button type="button" onClick={() => moveOption(section.id, oIdx, 'up')} className="text-slate-600 hover:text-sky-400"><FiChevronUp size={16} /></button>
                                                                <button type="button" onClick={() => moveOption(section.id, oIdx, 'down')} className="text-slate-600 hover:text-sky-400"><FiChevronDown size={16} /></button>
                                                            </div>

                                                            <div className="flex-1 min-w-[200px]">
                                                                <input
                                                                    value={opt.name}
                                                                    onChange={e => updateOption(section.id, opt.id, "name", e.target.value)}
                                                                    placeholder="Option Name"
                                                                    className="w-full bg-[#08111F] border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-sky-500"
                                                                />
                                                            </div>

                                                            <div className="flex items-center gap-2 min-w-[120px]">
                                                                <span className="text-slate-500 text-sm font-bold">+ ₹</span>
                                                                <input
                                                                    type="number"
                                                                    value={opt.priceAdjustment}
                                                                    onChange={e => updateOption(section.id, opt.id, "priceAdjustment", Number(e.target.value) || 0)}
                                                                    placeholder="0"
                                                                    className="w-full max-w-[80px] bg-[#08111F] border border-white/10 rounded-lg px-2 py-2 text-sm text-white outline-none focus:border-sky-500"
                                                                />
                                                            </div>

                                                            <div className="flex items-center gap-4 shrink-0">
                                                                <button
                                                                    type="button"
                                                                    onClick={() => updateOption(section.id, opt.id, "enabled", !opt.enabled)}
                                                                    className={`px-3 py-1 text-xs font-bold rounded-lg transition-colors border ${opt.enabled ? 'bg-sky-500/20 text-sky-400 border-sky-500/20' : 'bg-slate-800 text-slate-400 border-slate-700'}`}
                                                                >
                                                                    {opt.enabled ? 'ON' : 'OFF'}
                                                                </button>

                                                                <button type="button" onClick={() => deleteOption(section.id, opt.id)} className="text-rose-500/50 hover:text-rose-400 p-2">
                                                                    <FiTrash2 size={16} />
                                                                </button>
                                                            </div>

                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <div className="text-xs text-slate-500 italic mb-4">No options defined.</div>
                                            )}

                                            <button type="button" onClick={() => addOption(section.id)} className="flex items-center gap-2 text-xs font-bold text-sky-400 hover:text-sky-300">
                                                <FiPlus /> Add Option
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </section>
    );
};

export default CategoryConfigurator;
