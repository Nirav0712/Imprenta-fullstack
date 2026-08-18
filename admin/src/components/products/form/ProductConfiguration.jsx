import { useFormContext, useFieldArray } from "react-hook-form";
import { FiPlus, FiTrash2, FiSettings, FiMinusCircle } from "react-icons/fi";

const ProductConfiguration = () => {
    const { register, control, watch } = useFormContext();
    const isEnabled = watch("configuration.enabled");

    const renderSection = (title, fieldName) => {
        const { fields, append, remove } = useFieldArray({
            control,
            name: `configuration.${fieldName}`,
        });

        return (
            <div className="mb-6 bg-slate-800/50 p-4 rounded-xl border border-slate-700">
                <h4 className="text-[15px] font-bold text-white mb-4 uppercase tracking-widest">{title}</h4>

                {fields.map((item, index) => (
                    <div key={item.id} className="grid grid-cols-[1fr_1fr_auto_auto] gap-3 mb-3 items-center">
                        {fieldName === "quantityOptions" ? (
                            <>
                                <input
                                    type="number"
                                    placeholder="Quantity"
                                    {...register(`configuration.${fieldName}.${index}.quantity`)}
                                    className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white w-full"
                                />
                                <input
                                    type="number"
                                    step="0.01"
                                    placeholder="Total Price Override"
                                    {...register(`configuration.${fieldName}.${index}.price`)}
                                    className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white w-full"
                                />
                            </>
                        ) : (
                            <>
                                <input
                                    placeholder="Option Name"
                                    {...register(`configuration.${fieldName}.${index}.name`)}
                                    className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white w-full"
                                />
                                <input
                                    type="number"
                                    step="0.01"
                                    placeholder="Add. Price"
                                    {...register(`configuration.${fieldName}.${index}.additionalPrice`)}
                                    className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white w-full"
                                />
                            </>
                        )}

                        <label className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" defaultChecked={item.enabled ?? true} {...register(`configuration.${fieldName}.${index}.enabled`)} className="rounded bg-slate-900 border-slate-700 w-4 h-4 accent-cyan-500" />
                            <span className="text-xs text-slate-400">On</span>
                        </label>

                        <button type="button" onClick={() => remove(index)} className="p-2 text-red-400 hover:text-red-300 transition-colors">
                            <FiMinusCircle size={18} />
                        </button>
                    </div>
                ))}

                <button
                    type="button"
                    onClick={() => fieldName === "quantityOptions" ? append({ quantity: "", price: "", enabled: true }) : append({ name: "", additionalPrice: 0, enabled: true })}
                    className="mt-2 text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 uppercase tracking-widest"
                >
                    <FiPlus size={14} /> Add {title}
                </button>
            </div>
        );
    };

    return (
        <div className="bg-slate-800 rounded-2xl border border-slate-700 p-6 shadow-sm overflow-hidden">
            <div className="flex items-center gap-4 border-b border-slate-700/50 pb-4 mb-6">
                <div className="p-3 bg-cyan-500/10 rounded-xl text-cyan-500">
                    <FiSettings size={22} className="opacity-80" />
                </div>
                <div>
                    <h3 className="text-base font-bold text-white mb-0.5">Product Configurator Engine</h3>
                    <p className="text-xs text-slate-400">Enable advanced product configurations and options</p>
                </div>

                {/* Toggle Configurator */}
                <div className="ml-auto flex items-center">
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" {...register("configuration.enabled")} className="sr-only peer" />
                        <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
                        <span className="ml-3 text-sm font-semibold text-slate-300 uppercase tracking-widest">
                            {isEnabled ? 'Enabled' : 'Disabled'}
                        </span>
                    </label>
                </div>
            </div>

            {isEnabled && (
                <div className="space-y-6">
                    <div className="grid grid-cols-3 gap-6 bg-slate-800/30 p-4 rounded-xl border border-slate-700 border-dashed">
                        <div>
                            <label className="block text-xs font-bold text-slate-300 uppercase tracking-widest mb-2">Base Min Quantity</label>
                            <input type="number" {...register("configuration.minimumQuantity")} className="bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white w-full focus:border-cyan-500 outline-none" />
                        </div>
                        <div className="flex items-center gap-3 pt-6">
                            <input type="checkbox" id="CustomQty" {...register("configuration.allowCustomQuantity")} className="w-4 h-4 rounded bg-slate-900 border-slate-700 accent-cyan-500 cursor-pointer" />
                            <label htmlFor="CustomQty" className="text-sm font-medium text-slate-300 cursor-pointer">Allow Custom Quantity</label>
                        </div>
                        <div className="flex items-center gap-3 pt-6">
                            <input type="checkbox" id="CustomSize" {...register("configuration.allowCustomSize")} className="w-4 h-4 rounded bg-slate-900 border-slate-700 accent-cyan-500 cursor-pointer" />
                            <label htmlFor="CustomSize" className="text-sm font-medium text-slate-300 cursor-pointer">Allow Custom Size</label>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {renderSection("Sizes", "sizes")}
                        {renderSection("Materials", "materials")}
                        {renderSection("Laminations (Finish)", "laminations")}
                        {renderSection("Foil Stampings", "foils")}
                        {renderSection("Design Options", "designOptions")}
                        {renderSection("Split on Back Paper", "splitOnBackPapers")}
                        {renderSection("Quantity Tiers (Overrides base price)", "quantityOptions")}
                    </div>

                </div>
            )}
        </div>
    );
};

export default ProductConfiguration;
