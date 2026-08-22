import { useFormContext, useWatch } from "react-hook-form";
import { useEffect, useState } from "react";
import axiosInstance from "../../../config/axios";
import { FiSettings, FiCheck } from "react-icons/fi";

const CategoryConfiguratorMapping = () => {
    const { control, setValue } = useFormContext();

    const categoryId = useWatch({ control, name: "category" });
    const configuratorSections = useWatch({ control, name: "configuratorSections" }) || [];

    const [categoryDef, setCategoryDef] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!categoryId) {
            setCategoryDef(null);
            setValue("configuratorSections", []);
            return;
        }

        const fetchCat = async () => {
            try {
                setLoading(true);
                const { data } = await axiosInstance.get(`/categories/${categoryId}`);
                const category = data.category || data;
                setCategoryDef(category);

                // Merge loaded configurations securely
                const availableSections = category.configurator?.sections?.filter(s => s.enabled) || [];

                // Initialize missing local toggles as OFF (or ON if you want them on by default, user requested ON for existing mapping, but mapping defaults correctly via toggle)
                const newMappings = availableSections.map(sec => {
                    const existing = configuratorSections.find(c => c.sectionId === sec.id);
                    return existing ? existing : { sectionId: sec.id, enabled: false };
                });

                // Compare deeply before setting to avoid loop
                if (JSON.stringify(newMappings) !== JSON.stringify(configuratorSections)) {
                    setValue("configuratorSections", newMappings, { shouldValidate: true, shouldDirty: true });
                }

            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchCat();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [categoryId, setValue]);

    if (!categoryId) return null;

    if (loading) return (
        <section className="rounded-3xl border border-white/10 bg-[#101B2D] p-6 lg:p-8 animate-pulse">
            <h2 className="text-xl font-bold text-white mb-2">Product Configurator</h2>
            <div className="h-4 w-1/3 bg-white/10 rounded mb-6"></div>
            <div className="space-y-4">
                <div className="h-12 w-full bg-white/5 rounded-xl"></div>
            </div>
        </section>
    );

    const sections = categoryDef?.configurator?.sections?.filter(s => s.enabled) || [];

    if (sections.length === 0) return null;

    const handleToggle = (secId, currentStatus) => {
        const newMaps = configuratorSections.map(c =>
            c.sectionId === secId ? { ...c, enabled: !currentStatus } : c
        );
        setValue("configuratorSections", newMaps, { shouldValidate: true, shouldDirty: true });
    };

    return (
        <section className="rounded-3xl border border-white/10 bg-[#101B2D] p-6 lg:p-8 overflow-hidden relative">
            <div className="flex items-center gap-3 mb-2">
                <div className="p-2.5 rounded-xl bg-sky-500/10 text-sky-400">
                    <FiSettings size={20} />
                </div>
                <div>
                    <h2 className="text-xl font-bold text-white tracking-wide">
                        Product Configurator
                    </h2>
                </div>
            </div>

            <p className="text-sm font-medium text-slate-500 mb-6">
                Inherited from: <span className="text-sky-400 font-bold">{categoryDef.name}</span>.<br />
                Turn sections ON to display them on this product's page.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {sections.map(sec => {
                    const map = configuratorSections.find(c => c.sectionId === sec.id);
                    const isEnabled = map?.enabled === true;

                    return (
                        <div
                            key={sec.id}
                            className={`flex items-center justify-between p-4 rounded-2xl border transition-all cursor-pointer ${isEnabled ? 'bg-sky-500/10 border-sky-500/30' : 'bg-[#0A1220] border-white/5 hover:border-white/10'}`}
                            onClick={() => handleToggle(sec.id, isEnabled)}
                        >
                            <div>
                                <span className="block text-sm font-bold text-white mb-1">{sec.title}</span>
                                <span className="text-[10px] uppercase tracking-widest text-slate-500 font-black">{sec.type}</span>
                            </div>

                            <button
                                type="button"
                                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none ${isEnabled ? 'bg-sky-500' : 'bg-slate-700'}`}
                            >
                                <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${isEnabled ? 'translate-x-5' : 'translate-x-1'}`} />
                            </button>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default CategoryConfiguratorMapping;
