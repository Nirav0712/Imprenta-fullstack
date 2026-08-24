import { useEffect, useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import {
  FiCheckCircle,
  FiShoppingCart,
  FiTruck,
  FiShield,
  FiAward,
  FiX,
  FiChevronRight,
  FiMaximize2
} from "react-icons/fi";

import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { fetchProductBySlug, submitInquiry } from "../../services/api";
import { useNavigate } from "react-router-dom";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { user } = useAuth();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [activeImage, setActiveImage] = useState("");

  // Dynamic Category Configurator States
  const [selectedDynamicOptions, setSelectedDynamicOptions] = useState({});
  const [validationErrors, setValidationErrors] = useState({});
  const [activeEngine, setActiveEngine] = useState("none"); // "category", "legacy", or "none"


  const [selectedQuantity, setSelectedQuantity] = useState(0);

  // Custom Dimensions
  const [customWidth, setCustomWidth] = useState("");
  const [customHeight, setCustomHeight] = useState("");
  const [customUnit, setCustomUnit] = useState("inch");

  // Quote Modal
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [quoteForm, setQuoteForm] = useState({ name: "", email: "", phone: "", company: "", message: "", additionalRequirements: "" });
  const [quoteLoading, setQuoteLoading] = useState(false);

  // Auth Modal
  const [showAuthModal, setShowAuthModal] = useState(false);

  // Tabs
  const [activeTab, setActiveTab] = useState("description"); // description, specs, features

  // Auto Rotation Timer
  useEffect(() => {
    if (!product) return;
    const gImages = [];
    if (product.mainImage?.url) gImages.push(product.mainImage.url);
    if (product.images?.length > 0) {
      product.images.forEach(img => {
        if (img.url && !gImages.includes(img.url)) gImages.push(img.url);
      });
    }
    if (product.image && !gImages.includes(product.image)) {
      gImages.push(product.image);
    }

    if (gImages.length <= 1) return;

    const timer = setInterval(() => {
      setActiveImage(currentVal => {
        const idx = gImages.indexOf(currentVal);
        if (idx === -1) return currentVal;
        const nextIdx = (idx + 1) % gImages.length;
        return gImages[nextIdx];
      });
    }, 2000);

    return () => clearInterval(timer);
  }, [product]);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const data = await fetchProductBySlug(id);
        if (data.product) {
          const p = data.product;
          setProduct(p);

          // Set Initial Main Image
          if (p.mainImage?.url) {
            setActiveImage(p.mainImage.url);
          } else if (p.images && p.images.length > 0) {
            setActiveImage(p.images[0].url);
          } else if (p.image) {
            setActiveImage(p.image);
          }

          // Configurator Initialization Logic
          if (p.category?.configurator?.enabled && p.category.configurator.sections?.filter(s => s.enabled).length > 0) {
            setActiveEngine("category");
            const conf = p.category.configurator;
            let initialDynamics = {};

            if (conf.sections?.length > 0) {
              conf.sections.forEach(sec => {
                const prodMapping = p.configuratorSections?.find(c => c.sectionId === sec.id);
                if (sec.enabled && prodMapping?.enabled === true && sec.options?.length > 0) {
                  const activeOpts = sec.options.filter(o => o.enabled).sort((a, b) => a.order - b.order);
                  if (activeOpts.length > 0) {
                    initialDynamics[sec.id] = activeOpts[0];
                  }
                }
              });
            }
            setSelectedDynamicOptions(initialDynamics);
            setSelectedQuantity(conf.baseMinQuantity || 100);

          } else {
            setActiveEngine("none");
            setSelectedQuantity(1);
          }

        } else {
          setError(true);
        }
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    getProduct();
  }, [id]);

  // Dynamic Pricing Engine
  const pricing = useMemo(() => {
    if (!product) return { unitPrice: 0, total: 0, showPrice: false };

    let basePrice = product.salePrice && product.salePrice > 0 ? product.salePrice : product.price || 0;
    let qty = parseInt(selectedQuantity) || 1;
    let addons = 0;

    if (activeEngine === "category") {
      const conf = product.category.configurator;

      // Look for custom quantity tier override if applicable by scanning for an option labeled as quantity? 
      // Nah, currently in requirements Category Configurator quantity tiers aren't specifically overriding basePrice cleanly yet unless mapped as options. We'll simply sum options.

      Object.keys(selectedDynamicOptions).forEach(secId => {
        // Enforce mappings on pricing calculation explicitly
        const secDef = conf.sections.find(s => s.id === secId);
        const prodMapping = product.configuratorSections?.find(c => c.sectionId === secId);
        if (!secDef || !secDef.enabled || prodMapping?.enabled !== true) return;

        const val = selectedDynamicOptions[secId];
        if (Array.isArray(val)) {
          val.forEach(v => {
            if (v && v.priceAdjustment) addons += Number(v.priceAdjustment);
          });
        } else if (val && val.priceAdjustment) {
          addons += Number(val.priceAdjustment);
        }
      });
      // Legacy custom size? No, `allowCustomSize` handled on custom engine later.

    }

    basePrice += addons;

    // Ensure we don't return NaN
    if (isNaN(basePrice)) basePrice = 0;
    let computedTotal = basePrice * qty;
    if (isNaN(computedTotal)) computedTotal = 0;

    return {
      unitPrice: basePrice,
      total: computedTotal,
      showPrice: product.showPrice
    };
  }, [product, selectedQuantity, selectedDynamicOptions, activeEngine]);

  const handleAddToCart = () => {
    if (!product) return;

    if (!user) {
      setShowAuthModal(true);
      return;
    }

    if (activeEngine === "category") {
      const conf = product.category.configurator;
      let errors = {};
      for (const sec of conf.sections) {
        if (sec.enabled && sec.required) {
          const val = selectedDynamicOptions[sec.id];
          if (!val || (Array.isArray(val) && val.length === 0) || val === '') {
            errors[sec.id] = `Please select ${sec.title}.`;
          }
        }
      }
      if (Object.keys(errors).length > 0) {
        setValidationErrors(errors);
        return;
      }
      setValidationErrors({});
    }

    // Bundle up the configuration
    let configSelection = {};

    if (activeEngine === "category") {
      const conf = product.category.configurator;
      conf.sections.forEach(sec => {
        const prodMapping = product.configuratorSections?.find(c => c.sectionId === sec.id);
        if (!sec.enabled || prodMapping?.enabled !== true) return;

        const val = selectedDynamicOptions[sec.id];
        if (Array.isArray(val) && val.length > 0) {
          configSelection[sec.title] = val.map(opt => ({
            optionId: opt.id,
            label: opt.name,
            priceAdjustment: opt.priceAdjustment
          }));
        } else if (val && !Array.isArray(val)) {
          configSelection[sec.title] = {
            optionId: val.id,
            label: val.name,
            priceAdjustment: val.priceAdjustment
          };
        }
      });
      if (conf.allowCustomSize && customWidth && customHeight) {
        configSelection["Custom Dimensions"] = {
          label: `${customWidth}x${customHeight} ${customUnit}`,
        };
      }
    }

    const cartItem = {
      _id: product._id,
      name: product.name,
      sku: product.sku,
      price: pricing.unitPrice,
      image: activeImage,
      quantity: selectedQuantity,
      configuration: Object.entries(configSelection).filter(([k, v]) => v).reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {})
    };

    addToCart(cartItem);
    alert(`${product.name} added to cart successfully!`);
  };

  const handleQuoteSubmit = async (e) => {
    e.preventDefault();
    if (activeEngine === "category") {
      const conf = product.category.configurator;
      let errors = {};
      for (const sec of conf.sections) {
        const prodMapping = product.configuratorSections?.find(c => c.sectionId === sec.id);
        if (sec.enabled && prodMapping?.enabled === true && sec.required) {
          const val = selectedDynamicOptions[sec.id];
          if (!val || (Array.isArray(val) && val.length === 0) || val === '') {
            errors[sec.id] = `Please select ${sec.title}.`;
          }
        }
      }
      if (Object.keys(errors).length > 0) {
        setValidationErrors(errors);
        return;
      }
      setValidationErrors({});
    }

    try {
      setQuoteLoading(true);

      let configSelection = {};
      if (activeEngine === "category") {
        const conf = product.category.configurator;
        conf.sections.forEach(sec => {
          const prodMapping = product.configuratorSections?.find(c => c.sectionId === sec.id);
          if (!sec.enabled || prodMapping?.enabled !== true) return;

          const val = selectedDynamicOptions[sec.id];
          if (Array.isArray(val) && val.length > 0) {
            configSelection[sec.title] = val.map(opt => ({
              optionId: opt.id,
              label: opt.name,
              priceAdjustment: opt.priceAdjustment
            }));
          } else if (val && !Array.isArray(val)) {
            configSelection[sec.title] = {
              optionId: val.id,
              label: val.name,
              priceAdjustment: val.priceAdjustment
            };
          }
        });
      }

      const payload = {
        ...quoteForm,
        productId: product._id,
        productName: product.name,
        categoryId: product.category?._id,
        categoryName: product.category?.name,
        product: product.name,
        sku: product.sku,
        quantity: selectedQuantity.toString(),
        size: `${customWidth}x${customHeight} ${customUnit}`,
        customWidth,
        customHeight,
        unit: customUnit,
        company: quoteForm.company,
        message: quoteForm.message,
        additionalRequirements: quoteForm.additionalRequirements,
        configuration: configSelection
      };

      await submitInquiry(payload);
      setQuoteOpen(false);
      setQuoteForm({ name: "", email: "", phone: "", company: "", message: "", additionalRequirements: "" });
      alert("Quote request submitted securely!");
    } catch (err) {
      console.error(err);
      alert("Failed to submit request.");
    } finally {
      setQuoteLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="h-16 w-16 animate-spin rounded-full border-b-4 border-sky-500 border-t-4"></div>
          <p className="mt-4 font-semibold text-slate-400 text-lg">Loading Product...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-black text-white">Product Not Found</h1>
          <p className="text-xl text-slate-400">This product might have been removed or is unavailable.</p>
          <button onClick={() => navigate("/products")} className="mt-8 px-8 py-4 bg-sky-500 rounded-xl font-bold text-white shadow-xl shadow-sky-500/20 hover:bg-sky-600 transition">
            Browse All Products
          </button>
        </div>
      </div>
    );
  }

  // Prepare gallery images
  const galleryImages = [];
  if (product.mainImage?.url) galleryImages.push(product.mainImage.url);
  if (product.images && product.images.length > 0) {
    product.images.forEach(img => {
      if (img.url && !galleryImages.includes(img.url)) galleryImages.push(img.url);
    });
  }
  if (product.image && !galleryImages.includes(product.image)) {
    galleryImages.push(product.image);
  }

  return (
    <section className="relative min-h-screen py-10 lg:py-16 overflow-hidden bg-gradient-to-br from-[#0A1220] via-[#0F1C36] to-[#050A14]">
      {/* Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-sky-500/10 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-4 sm:px-7 lg:px-11 xl:px-15 2xl:px-19">

        {/* Breadcrumbs */}
        <div className="flex flex-wrap items-center gap-2 text-sm text-slate-400 mb-8 font-medium">
          <Link to="/" className="hover:text-white transition whitespace-nowrap">Home</Link>
          <FiChevronRight />
          <Link to="/products" className="hover:text-white transition">Products</Link>
          {product.category?.name && (
            <>
              <FiChevronRight />
              <span className="text-sky-400">{product.category.name}</span>
            </>
          )}
        </div>

        <div className="grid lg:grid-cols-2 gap-10 xl:gap-16">

          {/* L: IMAGE PREVIEW */}
          <div className="flex flex-col gap-5 lg:sticky lg:top-24 max-h-[calc(100vh-100px)]">
            <div className="relative rounded-2xl bg-white/5 backdrop-blur-md p-4 lg:p-10 overflow-hidden group flex items-center justify-center aspect-square w-full shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] border border-white/10 ring-1 ring-white/5">

              {/* Overlay Top Icons */}
              <div className="absolute top-5 right-5 flex flex-col gap-4 z-10 hidden sm:flex">
                <button className="w-11 h-11 rounded-full bg-black/40 backdrop-blur-xl flex items-center justify-center text-slate-300 hover:text-rose-400 hover:bg-white/10 transition shadow-xl border border-white/10">
                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path></svg>
                </button>
                <button className="w-11 h-11 rounded-full bg-black/40 backdrop-blur-xl flex items-center justify-center text-slate-300 hover:text-sky-400 hover:bg-white/10 transition shadow-xl border border-white/10">
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path></svg>
                </button>
              </div>

              {activeImage ? (
                <img
                  src={activeImage}
                  alt={product.name}
                  className="relative w-full h-full object-contain transition duration-700 ease-out group-hover:scale-105"
                />
              ) : (
                <div className="text-slate-300 text-lg flex flex-col items-center">
                  <FiMaximize2 size={40} className="mb-4 opacity-30 text-slate-300" />
                  No Image Available
                </div>
              )}

              {product.badge && (
                <div className="absolute top-6 left-6 inline-flex rounded-full bg-rose-500 px-4 py-1.5 text-xs font-black tracking-wider uppercase text-white shadow-md">
                  {product.badge}
                </div>
              )}
            </div>

            {/* Thumbnail Gallery */}
            {galleryImages.length > 1 && (
              <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar">
                {galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-xl backdrop-blur-md border ${activeImage === img ? 'border-sky-400 border-2 bg-white/10 shadow-[0_0_15px_rgba(56,189,248,0.3)]' : 'border-white/10 bg-white/5 opacity-70 hover:opacity-100 hover:bg-white/10'} p-2 transition-all overflow-hidden cursor-pointer flex items-center justify-center`}
                  >
                    <img src={img} alt="Thumbnail" className="w-full h-full object-contain" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* R: PRODUCT CONFIGURATION & DETAILS */}
          <div className="flex flex-col">

            <div className="border-b border-white/10 pb-6 mb-6">
              <h1 className="text-3xl sm:text-4xl font-black leading-tight text-white mb-3">
                {product.name}
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-xs font-semibold mb-4">
                {product.sku && <div className="px-2 py-0.5 rounded-[4px] bg-[#0A1220] text-[#A0AEC0] border border-white/10 tracking-wider">SKU: <span className="text-white">{product.sku}</span></div>}
                {product.brand && <div className="text-[#00D4FF] uppercase tracking-widest">{product.brand}</div>}
              </div>
              <p className="mt-6 text-sm leading-relaxed text-slate-400">
                {product.shortDescription}
              </p>
            </div>

            {/* CONFIGURATOR ENGINE */}
            {activeEngine === "category" && (
              <div className="bg-[#050B14]/40 backdrop-blur-xl rounded-2xl p-6 sm:p-8 shadow-[0_8px_32px_rgba(0,0,0,0.4)] border border-white/5 mb-8 space-y-7 ring-1 ring-white/5">
                <div className="space-y-6">
                  {product.category.configurator.sections.filter(s => {
                    if (!s.enabled) return false;
                    const map = product.configuratorSections?.find(c => c.sectionId === s.id);
                    return map?.enabled === true;
                  }).sort((a, b) => a.order - b.order).map(section => {
                    const fieldType = String(section.fieldType || section.type || "").toLowerCase();

                    return (
                      <div key={section.id}>
                        <div className="flex items-center justify-between mb-2">
                          <label className="block text-[11px] font-black text-[#6E8098] uppercase tracking-widest">
                            {section.title} {section.required && <span className="text-rose-500">*</span>}
                          </label>
                          {validationErrors[section.id] && (
                            <span className="text-[10px] text-rose-400 font-bold bg-rose-500/10 px-2 py-0.5 rounded animate-pulse">{validationErrors[section.id]}</span>
                          )}
                        </div>

                        {(fieldType === "dropdown" || fieldType === "select") && (
                          <select
                            value={selectedDynamicOptions[section.id]?.id || ''}
                            onChange={e => {
                              const opt = section.options.find(o => o.id === e.target.value);
                              setSelectedDynamicOptions(prev => ({ ...prev, [section.id]: opt }));
                            }}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm font-semibold outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 cursor-pointer backdrop-blur-sm transition"
                          >
                            {!section.required && <option value="">Select optional {section.title.toLowerCase()}</option>}
                            {section.options.filter(o => o.enabled).sort((a, b) => a.order - b.order).map(opt => (
                              <option key={opt.id} value={opt.id} className="bg-[#0A1220]">
                                {opt.name} {opt.priceAdjustment > 0 ? `(+₹${opt.priceAdjustment})` : ''}
                              </option>
                            ))}
                          </select>
                        )}

                        {fieldType === "radio" && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {section.options.filter(o => o.enabled).sort((a, b) => a.order - b.order).map(opt => (
                              <button
                                key={opt.id}
                                onClick={() => setSelectedDynamicOptions(prev => ({ ...prev, [section.id]: opt }))}
                                className={`relative px-4 py-3 rounded-xl border text-sm font-semibold transition-all text-left flex justify-between items-center ${selectedDynamicOptions[section.id]?.id === opt.id ? 'border-sky-400 bg-sky-500/10 text-sky-400 shadow-[0_0_15px_rgba(56,189,248,0.15)]' : 'border-white/10 bg-white/5 text-slate-300 hover:border-white/20 hover:bg-white/10'}`}
                              >
                                <span>{opt.name}</span>
                                {opt.priceAdjustment > 0 && <span className="text-xs text-slate-500 font-bold">+₹{opt.priceAdjustment}</span>}
                              </button>
                            ))}
                          </div>
                        )}

                        {fieldType === "checkbox" && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {section.options.filter(o => o.enabled).sort((a, b) => a.order - b.order).map(opt => {
                              const isSelected = Array.isArray(selectedDynamicOptions[section.id])
                                ? selectedDynamicOptions[section.id].some(v => v.id === opt.id)
                                : false;

                              return (<button
                                key={opt.id}
                                onClick={() => {
                                  setSelectedDynamicOptions(prev => {
                                    const current = Array.isArray(prev[section.id]) ? prev[section.id] : [];
                                    const exists = current.some(v => v.id === opt.id);
                                    return {
                                      ...prev,
                                      [section.id]: exists ? current.filter(v => v.id !== opt.id) : [...current, opt]
                                    };
                                  });
                                }}
                                className={`relative px-4 py-3 rounded-xl border text-sm font-semibold transition-all text-left flex justify-between items-center ${isSelected ? 'border-sky-400 bg-sky-500/10 text-sky-400 shadow-[0_0_15px_rgba(56,189,248,0.15)]' : 'border-white/10 bg-white/5 text-slate-300 hover:border-white/20 hover:bg-white/10'}`}
                              >
                                <div className="flex items-center gap-3">
                                  <div className={`w-4 h-4 rounded border flex items-center justify-center ${isSelected ? 'border-sky-400 bg-sky-400 text-black' : 'border-slate-500'}`}>
                                    {isSelected && <svg width="10" height="8" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 5L4.5 8.5L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                                  </div>
                                  <span>{opt.name}</span>
                                </div>
                                {opt.priceAdjustment > 0 && <span className="text-xs text-slate-500 font-bold">+₹{opt.priceAdjustment}</span>}
                              </button>
                              );
                            })}
                          </div>
                        )}

                        {(fieldType === "text" || fieldType === "number") && (
                          <input
                            type={fieldType}
                            value={selectedDynamicOptions[section.id]?.name || ''}
                            onChange={(e) => {
                              setSelectedDynamicOptions(prev => ({
                                ...prev,
                                [section.id]: { id: section.id, name: e.target.value, priceAdjustment: 0 }
                              }));
                            }}
                            placeholder={`Enter ${section.title}...`}
                            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-sky-400 transition text-sm"
                          />
                        )}

                      </div>
                    );
                  })}

                  {/* Custom Size Check */}
                  {product.category.configurator.allowCustomSize && (
                    <div className="pt-4 mt-4 border-t border-white/10">
                      <label className="block text-[11px] font-black text-[#6E8098] uppercase tracking-widest mb-3">Custom Dimensions</label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 animate-fade-in bg-white/5 p-4 rounded-xl border border-white/10 backdrop-blur-md">
                        <div>
                          <span className="text-[10px] text-[#6E8098] font-bold block mb-1 uppercase tracking-widest">Width</span>
                          <input type="number" value={customWidth} onChange={(e) => setCustomWidth(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 outline-none text-white focus:border-sky-400 transition text-sm" placeholder="0.0" />
                        </div>
                        <div>
                          <span className="text-[10px] text-[#6E8098] font-bold block mb-1 uppercase tracking-widest">Height</span>
                          <input type="number" value={customHeight} onChange={(e) => setCustomHeight(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 outline-none text-white focus:border-sky-400 transition text-sm" placeholder="0.0" />
                        </div>
                        <div>
                          <span className="text-[10px] text-[#6E8098] font-bold block mb-1 uppercase tracking-widest">Unit</span>
                          <select value={customUnit} onChange={(e) => setCustomUnit(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 outline-none text-white focus:border-sky-400 transition text-sm appearance-none">
                            <option value="inches">Inches</option>
                            <option value="cm">cm</option>
                            <option value="mm">mm</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Quantity Logic inherited securely base requirements */}
                  <div className="pt-6 mt-6 border-t border-white/10">
                    <label className="block text-[11px] font-black text-[#6E8098] uppercase tracking-widest mb-2">Total Quantity</label>
                    <input
                      type="number"
                      min={product.category.configurator.baseMinQuantity || 1}
                      value={selectedQuantity}
                      onChange={(e) => setSelectedQuantity(parseInt(e.target.value) || 0)}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white outline-none focus:border-sky-400 focus:outline-none transition shadow-inner font-black text-xl"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeEngine === "none" && (
              <div className="pt-8 mb-8">
                <label className="block text-sm font-bold text-slate-300 mb-3">Quantity</label>
                <div className="flex items-center gap-4 max-w-xs">
                  <input
                    type="number"
                    min="1"
                    value={selectedQuantity}
                    onChange={(e) => setSelectedQuantity(parseInt(e.target.value) || 1)}
                    className="w-full bg-[#101B2D] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-sky-500"
                  />
                </div>
              </div>
            )}

            {/* ACTION FOOTER */}
            {pricing.showPrice !== false ? (
              <div className="bg-[#050B14]/40 backdrop-blur-xl border border-white/5 rounded-2xl p-6 sm:p-8 mb-8 shadow-[0_8px_32px_rgba(0,0,0,0.4)] ring-1 ring-white/5">
                <div className="flex flex-col xl:flex-row items-center justify-between gap-6">
                  <div className="w-full xl:w-auto text-center xl:text-left">
                    <p className="text-[10px] uppercase font-black text-[#6E8098] mb-1 tracking-widest">Final Price</p>
                    <div className="flex items-baseline justify-center xl:justify-start gap-2">
                      <span className="text-3xl sm:text-4xl font-black text-white">₹{pricing.total?.toLocaleString()}</span>
                      {pricing.unitPrice > 0 && selectedQuantity > 0 && (
                        <span className="text-xs text-sky-400 font-semibold tracking-wider">/ ₹{pricing.unitPrice.toLocaleString()} ea</span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 w-full xl:w-auto">
                    <button
                      onClick={() => setQuoteOpen(true)}
                      className="border border-white/10 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white font-bold px-6 py-4 rounded-xl transition-all text-sm shadow-[0_0_15px_rgba(0,0,0,0.2)] backdrop-blur-sm"
                    >
                      Request Quote
                    </button>
                    <button
                      onClick={handleAddToCart}
                      className="flex items-center justify-center gap-2 bg-sky-500 text-white font-black px-8 py-4 rounded-xl hover:bg-sky-400 transition-all shadow-[0_0_20px_rgba(14,165,233,0.3)] hover:shadow-[0_0_30px_rgba(14,165,233,0.5)] text-sm"
                    >
                      <FiShoppingCart size={18} />
                      Add To Cart
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-[#050B14]/40 backdrop-blur-xl border border-white/5 rounded-2xl p-6 sm:p-8 mb-8 flex flex-col gap-4 shadow-[0_8px_32px_rgba(0,0,0,0.4)] text-center sm:text-left ring-1 ring-white/5">
                <div>
                  <p className="text-[#6E8098] text-[10px] font-black uppercase tracking-widest mb-1">Custom Pricing Required</p>
                  <p className="text-slate-300 font-medium text-sm">This product configuration requires a tailored quote.</p>
                </div>

                <button
                  onClick={() => setQuoteOpen(true)}
                  className="w-full h-auto min-h-[56px] flex flex-wrap items-center justify-center gap-2 bg-sky-500/10 text-sky-400 hover:bg-sky-500 hover:text-white font-black px-4 sm:px-8 py-3 sm:py-4 rounded-xl transition-all shadow-md border border-sky-500/50 text-center leading-normal text-sm sm:text-base"
                >
                  Submit Configuration for Quote
                </button>
              </div>
            )}

            <div className="pt-4 border-t border-white/5 flex gap-6 text-[#6E8098] text-xs font-bold uppercase tracking-wider justify-center">
              <div className="flex items-center gap-1.5"><FiTruck className="text-[#00D4FF]" size={14} /> Global Shipping</div>
              <div className="flex items-center gap-1.5"><FiShield className="text-[#00D4FF]" size={14} /> Secure Processing</div>
            </div>
          </div>

        </div>
      </div>

      {/* BOTTOM CONTENT AREA */}
      <div className="mt-20 xl:mt-32 border-t border-white/10 pt-16 max-w-5xl mx-auto px-4 sm:px-7">

        {/* Tabs Navbar */}
        <div className="flex overflow-x-auto gap-8 border-b border-white/10 pb-4 mb-8 custom-scrollbar">
          <button onClick={() => setActiveTab("description")} className={`text-sm font-black tracking-widest uppercase whitespace-nowrap transition-all ${activeTab === "description" ? "text-[#00D4FF] border-b-2 border-[#00D4FF]" : "text-[#6E8098] hover:text-white"}`}>Product Overview</button>
          {product.specifications?.length > 0 && <button onClick={() => setActiveTab("specs")} className={`text-sm font-black tracking-widest uppercase whitespace-nowrap transition-all ${activeTab === "specs" ? "text-[#00D4FF] border-b-2 border-[#00D4FF]" : "text-[#6E8098] hover:text-white"}`}>Specifications</button>}
          {product.features?.length > 0 && <button onClick={() => setActiveTab("features")} className={`text-sm font-black tracking-widest uppercase whitespace-nowrap transition-all ${activeTab === "features" ? "text-[#00D4FF] border-b-2 border-[#00D4FF]" : "text-[#6E8098] hover:text-white"}`}>Features & Apps</button>}
        </div>

        {/* Tab Content */}
        <div className="prose prose-invert max-w-none prose-a:text-[#00D4FF] break-words">
          {activeTab === "description" && (
            <div className="text-[#A0AEC0] text-sm leading-7 whitespace-pre-wrap break-words">
              {product.description || product.shortDescription}
            </div>
          )}

          {activeTab === "specs" && product.specifications && (
            <div className="grid md:grid-cols-2 gap-3">
              {product.specifications.map((spec, i) => (
                <div key={i} className="flex bg-[#0A1220] border border-white/5 p-4 rounded-[6px]">
                  <span className="w-1/3 text-xs font-bold uppercase tracking-wider text-[#6E8098]">{spec.key}</span>
                  <span className="w-2/3 text-sm text-white font-medium">{spec.value}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === "features" && product.features && (
            <ul className="grid sm:grid-cols-2 gap-3 list-none pl-0">
              {product.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-4 bg-[#0A1220] p-4 rounded-[6px] border border-white/5">
                  <FiAward className="shrink-0 text-[#00D4FF] mt-0.5" size={18} />
                  <span className="text-[#A0AEC0] text-sm font-medium leading-relaxed">{feature}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* REQUEST QUOTE MODAL OVERLAY */}
      {
        quoteOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in custom-scrollbar overflow-y-auto">
            <div className="bg-[#0A1220] border border-white/10 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl mt-auto mb-auto">
              <div className="p-6 border-b border-white/10 flex items-center justify-between sticky top-0 bg-[#0A1220] z-10">
                <div>
                  <h3 className="text-xl font-black text-white uppercase tracking-widest">Request Custom Quote</h3>
                  <p className="text-sm text-[#00D4FF] mt-1">{product.name}</p>
                </div>
                <button onClick={() => setQuoteOpen(false)} className="p-2 rounded-full hover:bg-white/5 text-slate-400 hover:text-white transition-colors">
                  <FiX size={24} />
                </button>
              </div>

              <form onSubmit={handleQuoteSubmit} className="p-6 space-y-5">
                {/* Product Configuration Details */}
                <div className="bg-[#101B2D] p-5 rounded-xl border border-white/5 space-y-3 mb-6">
                  <h4 className="text-[10px] uppercase tracking-widest text-[#6E8098] font-bold mb-3">Selected Configuration</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div><span className="text-slate-500 mr-2">Quantity:</span> {selectedQuantity}</div>

                    {activeEngine === "category" && Object.entries(selectedDynamicOptions).map(([secId, val]) => {
                      const secDef = product.category.configurator.sections.find(s => s.id === secId);
                      const prodMapping = product.configuratorSections?.find(c => c.sectionId === secId);
                      if (!secDef || !secDef.enabled || prodMapping?.enabled !== true) return null;

                      let displayVal = "";
                      if (Array.isArray(val)) {
                        displayVal = val.map(v => v.name).join(", ");
                      } else if (val && val.name) {
                        displayVal = val.name;
                      }

                      if (!displayVal) return null;

                      return (
                        <div key={secId}><span className="text-slate-500 mr-2">{secDef.title}:</span> {displayVal}</div>
                      );
                    })}

                    {activeEngine === "category" && product.category.configurator.allowCustomSize && customWidth && customHeight && (
                      <div><span className="text-slate-500 mr-2">Size:</span> {customWidth}x{customHeight} {customUnit}</div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-2 uppercase tracking-widest">Full Name *</label>
                    <input required value={quoteForm.name} onChange={e => setQuoteForm({ ...quoteForm, name: e.target.value })} className="w-full bg-[#101B2D] border border-white/10 rounded-lg px-4 py-3 text-white outline-none focus:border-[#00D4FF]" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-2 uppercase tracking-widest">Email Address *</label>
                    <input required type="email" value={quoteForm.email} onChange={e => setQuoteForm({ ...quoteForm, email: e.target.value })} className="w-full bg-[#101B2D] border border-white/10 rounded-lg px-4 py-3 text-white outline-none focus:border-[#00D4FF]" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-2 uppercase tracking-widest">Phone Number *</label>
                    <input required type="tel" value={quoteForm.phone} onChange={e => setQuoteForm({ ...quoteForm, phone: e.target.value })} className="w-full bg-[#101B2D] border border-white/10 rounded-lg px-4 py-3 text-white outline-none focus:border-[#00D4FF]" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-2 uppercase tracking-widest">Company Name</label>
                    <input value={quoteForm.company} onChange={e => setQuoteForm({ ...quoteForm, company: e.target.value })} className="w-full bg-[#101B2D] border border-white/10 rounded-lg px-4 py-3 text-white outline-none focus:border-[#00D4FF]" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-2 uppercase tracking-widest">Additional Requirements / Specific Details</label>
                  <textarea rows="4" value={quoteForm.additionalRequirements} onChange={e => setQuoteForm({ ...quoteForm, additionalRequirements: e.target.value })} className="w-full bg-[#101B2D] border border-white/10 rounded-lg px-4 py-3 text-white outline-none focus:border-[#00D4FF] resize-none" placeholder="Let us know if you need any specific customization..." />
                </div>

                <div className="pt-4 border-t border-white/10 flex justify-end gap-3 sticky bottom-0 bg-[#0A1220]">
                  <button type="button" onClick={() => setQuoteOpen(false)} className="px-6 py-3 rounded-lg font-bold text-slate-300 hover:text-white transition-colors">
                    Cancel
                  </button>
                  <button type="submit" disabled={quoteLoading} className="px-8 py-3 rounded-lg font-black text-[#0A1220] bg-[#00D4FF] hover:bg-sky-400 disabled:opacity-50 transition-colors">
                    {quoteLoading ? "Submitting..." : "Send Request"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )
      }

      {/* AUTH REQUIRED MODAL OVERLAY */}
      {
        showAuthModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#050B14]/80 backdrop-blur-xl animate-fade-in">
            <div className="relative bg-[#0A1220]/80 backdrop-blur-2xl border border-white/10 rounded-3xl w-full max-w-md overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] ring-1 ring-white/5 p-8 text-center">
              {/* Ambient Modal Glow */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-40 bg-sky-500/20 blur-[60px] rounded-full pointer-events-none"></div>

              <div className="relative z-10 flex flex-col items-center">
                <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-sky-400 mb-6 shadow-lg shadow-sky-500/10">
                  <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                </div>
                <h3 className="text-2xl font-black text-white tracking-widest uppercase mb-2">Login Required</h3>
                <p className="text-slate-400 text-sm mb-8 leading-relaxed">
                  You must have an authenticated account to add items to your cart or retain saved designs.
                </p>

                <div className="flex flex-col w-full gap-3">
                  <button
                    onClick={() => navigate("/login")}
                    className="w-full py-4 rounded-xl bg-sky-500 text-white font-black hover:bg-sky-400 transition-all shadow-[0_0_20px_rgba(14,165,233,0.3)] hover:shadow-[0_0_30px_rgba(14,165,233,0.5)]"
                  >
                    Log In Securely
                  </button>
                  <button
                    onClick={() => navigate("/signup")}
                    className="w-full py-4 rounded-xl bg-white/5 border border-white/10 text-slate-300 font-bold hover:bg-white/10 hover:text-white transition-all shadow-md"
                  >
                    Create an Account
                  </button>
                  <button
                    onClick={() => setShowAuthModal(false)}
                    className="w-full mt-2 py-2 text-xs font-bold text-slate-500 tracking-widest uppercase hover:text-white transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )
      }
    </section >
  );
};

export default ProductDetails;