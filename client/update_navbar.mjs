import fs from 'fs';

const path = "d:\\allweb\\imprenta - Copy\\client\\src\\components\\layout\\Navbar.jsx";
let content = fs.readFileSync(path, 'utf8');

// 1. Imports
content = content.replace(
    `import { useState } from "react";`,
    `import { useState, useEffect } from "react";\nimport { fetchCategories, fetchProducts } from "../../services/api";\nimport { FiChevronDown } from "react-icons/fi";`
);

// 2. States
const stateTarget = `const Navbar = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);`;

const stateReplacement = `const Navbar = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  
  const [categoriesList, setCategoriesList] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [categoryProducts, setCategoryProducts] = useState({});
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileDropdowns, setMobileDropdowns] = useState({}); 

  const toggleMobileDropdown = (name) => {
    setMobileDropdowns(prev => ({ ...prev, [name]: !prev[name] }));
  };

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        let cats = [];
        if (data && data.categories) {
          cats = data.categories.slice(0, 8);
        } else if (Array.isArray(data)) {
          cats = data.slice(0, 8);
        } else if (data && data.data) {
          cats = data.data.slice(0, 8);
        }
        setCategoriesList(cats);
        if (cats.length > 0) setActiveCategory(cats[0]);
      } catch (err) {
        console.error("Failed to load categories:", err);
      }
    };
    loadCategories();
  }, []);

  useEffect(() => {
    if (!activeCategory || categoryProducts[activeCategory._id]) return;
    let isMounted = true;
    const fetchCategoryProducts = async () => {
      try {
        const res = await fetchProducts({ category: activeCategory._id, limit: 12 });
        if (isMounted) {
          const prods = res.products || res.data || [];
          setCategoryProducts(prev => ({ ...prev, [activeCategory._id]: prods }));
        }
      } catch (e) {
        console.error(e);
      }
    };
    fetchCategoryProducts();
    return () => { isMounted = false; };
  }, [activeCategory, categoryProducts]);`;

content = content.replace(stateTarget, stateReplacement);

// 3. Desktop Navigation
const navTarget = `          {/* Main Navigation Links */}
          <nav className="hidden md:flex flex-1 justify-center items-center gap-8 lg:gap-10">
            <Link to="/" className="text-[15px] font-medium text-slate-300 hover:text-sky-400 transition-colors">Home</Link>
            <Link to="/about" className="text-[15px] font-medium text-slate-300 hover:text-sky-400 transition-colors">Company</Link>
            <Link to="/request-sample" className="text-[15px] font-medium text-slate-300 hover:text-sky-400 transition-colors">Service</Link>
            <Link to="/contact" className="text-[15px] font-medium text-slate-300 hover:text-sky-400 transition-colors">Contact Us</Link>
          </nav>`;

const navReplacement = `          {/* Main Navigation Links */}
          <nav className="hidden md:flex flex-1 justify-center items-center gap-8 lg:gap-10 relative">
            <Link to="/" className="text-[15px] font-medium text-slate-300 hover:text-sky-400 transition-colors">Home</Link>

            {/* Company Dropdown */}
            <div 
              className="relative group h-full py-6"
              onMouseEnter={() => setActiveDropdown("company")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center gap-1 text-[15px] font-medium text-slate-300 group-hover:text-sky-400 transition-colors">
                Company <FiChevronDown />
              </button>
              
              <div
                className={\`absolute top-full left-1/2 -translate-x-1/2 w-64 bg-white rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 transform \${
                  activeDropdown === "company" ? "opacity-100 translate-y-0 visible" : "opacity-0 translate-y-4 invisible"
                }\`}
              >
                <div className="p-3">
                  <Link to="/about" className="block px-4 py-3 text-slate-700 hover:bg-sky-50 hover:text-sky-500 rounded-xl transition-all font-medium">Who We Are</Link>
                  <Link to="/process" className="block px-4 py-3 text-slate-700 hover:bg-sky-50 hover:text-sky-500 rounded-xl transition-all font-medium">Our Process</Link>
                  <Link to="/team" className="block px-4 py-3 text-slate-700 hover:bg-sky-50 hover:text-sky-500 rounded-xl transition-all font-medium">Our Team</Link>
                </div>
              </div>
            </div>

            {/* Services Dropdown */}
            <div 
              className="relative group h-full py-6"
              onMouseEnter={() => setActiveDropdown("services")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center gap-1 text-[15px] font-medium text-slate-300 group-hover:text-sky-400 transition-colors">
                Our Services <FiChevronDown />
              </button>

              <div
                className={\`absolute top-full left-1/2 -translate-x-1/2 w-[800px] bg-white rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 transform \${
                  activeDropdown === "services" ? "opacity-100 translate-y-0 visible" : "opacity-0 translate-y-4 invisible"
                } flex z-50\`}
              >
                {/* Left Side (Categories) */}
                <div className="w-1/3 bg-slate-50 p-4 border-r border-slate-100">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 px-3">Categories</h3>
                  <div className="space-y-1 h-[280px] overflow-y-auto custom-scrollbar pr-2">
                    {categoriesList.map(cat => (
                      <button
                        key={cat._id}
                        onMouseEnter={() => setActiveCategory(cat)}
                        onClick={() => window.location.href = \`/products?category=\${cat._id}\`}
                        className={\`w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium transition-all \${
                          activeCategory?._id === cat._id ? "bg-sky-500 text-white shadow-md" : "text-slate-600 hover:bg-white hover:shadow-sm"
                        }\`}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Right Side (Products) */}
                <div className="w-2/3 p-6 bg-white min-h-[300px]">
                  {activeCategory && (
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-slate-800">{activeCategory.name}</h3>
                        <p className="text-sm text-slate-500 mt-1">
                          {categoryProducts[activeCategory._id] ? categoryProducts[activeCategory._id].length : "..."} Products Available
                        </p>
                      </div>
                      <Link to={\`/products?category=\${activeCategory._id}\`} className="text-sm font-medium text-sky-500 hover:text-sky-600 transition-colors flex items-center gap-1">
                        View All <FiChevronRight />
                      </Link>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    {(!categoryProducts[activeCategory?._id]) ? (
                       <div className="col-span-2 flex justify-center py-10 opacity-50">
                         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-500"></div>
                       </div>
                    ) : (
                      categoryProducts[activeCategory?._id].slice(0, 4).map(prod => (
                        <Link to={\`/product/\${prod.slug || prod.id}\`} key={prod._id || prod.id} className="group block border border-slate-100 rounded-xl p-3 hover:border-sky-200 hover:shadow-lg transition-all">
                           <div className="h-24 bg-slate-50 rounded-lg mb-3 overflow-hidden flex items-center justify-center">
                             {prod.image && <img src={prod.image} alt={prod.title} className="max-h-full object-contain group-hover:scale-105 transition-transform duration-300" />}
                           </div>
                           <h4 className="text-sm font-semibold text-slate-700 truncate">{prod.title}</h4>
                           <span className="text-xs font-medium text-sky-500">{prod.price}</span>
                        </Link>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Blog Dropdown */}
            <div 
              className="relative group h-full py-6"
              onMouseEnter={() => setActiveDropdown("blog")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center gap-1 text-[15px] font-medium text-slate-300 group-hover:text-sky-400 transition-colors">
                Blog <FiChevronDown />
              </button>
              
              <div
                className={\`absolute top-full left-1/2 -translate-x-1/2 w-80 bg-white rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 transform \${
                  activeDropdown === "blog" ? "opacity-100 translate-y-0 visible" : "opacity-0 translate-y-4 invisible"
                }\`}
              >
                <div className="p-5">
                   <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Latest Insights</h3>
                   <div className="space-y-4">
                      <Link to="/blog" className="flex gap-4 group/item">
                         <div className="w-16 h-16 bg-slate-100 rounded-xl overflow-hidden flex-shrink-0"></div>
                         <div>
                            <h4 className="text-sm font-semibold text-slate-700 group-hover/item:text-sky-500 transition-colors line-clamp-2">Latest Trends in Custom Packaging for 2026</h4>
                            <span className="text-xs text-slate-400 mt-1 block">2 days ago</span>
                         </div>
                      </Link>
                      <Link to="/blog" className="flex gap-4 group/item">
                         <div className="w-16 h-16 bg-slate-100 rounded-xl overflow-hidden flex-shrink-0"></div>
                         <div>
                            <h4 className="text-sm font-semibold text-slate-700 group-hover/item:text-sky-500 transition-colors line-clamp-2">How to Choose the Right Paper Stock for Business Cards</h4>
                            <span className="text-xs text-slate-400 mt-1 block">5 days ago</span>
                         </div>
                      </Link>
                   </div>
                   <div className="mt-4 pt-4 border-t border-slate-100 text-center">
                      <Link to="/blog" className="text-sm font-semibold text-sky-500 hover:text-sky-600 transition-colors">View All Articles</Link>
                   </div>
                </div>
              </div>
            </div>

            <Link to="/contact" className="text-[15px] font-medium text-slate-300 hover:text-sky-400 transition-colors">Contact Us</Link>
          </nav>`;

content = content.replace(navTarget, navReplacement);

// 4. Mobile Navigation
const mobileNavTarget = `                <Link
                  to="/about"
                  onClick={() => setMobileMenu(false)}
                  className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-5 py-4 transition-all duration-300 hover:border-sky-400 hover:bg-sky-500/10"
                >
                  <div className="flex items-center gap-4">
                    <FiInfo className="text-sky-400" size={20} />
                    <span>About Us</span>
                  </div>

                  <FiChevronRight className="text-slate-500 group-hover:translate-x-1 transition" />
                </Link>

                <Link
                  to="/request-sample"
                  onClick={() => setMobileMenu(false)}
                  className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-5 py-4 transition-all duration-300 hover:border-sky-400 hover:bg-sky-500/10"
                >
                  <div className="flex items-center gap-4">
                    <FiFileText className="text-sky-400" size={20} />
                    <span>Request Sample</span>
                  </div>

                  <FiChevronRight className="text-slate-500 group-hover:translate-x-1 transition" />
                </Link>`;

const mobileNavReplacement = `                {/* Mobile Company Accordion */}
                <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden transition-all duration-300">
                  <button
                    onClick={() => toggleMobileDropdown("company")}
                    className="w-full group flex items-center justify-between px-5 py-4 transition-all duration-300 hover:bg-sky-500/10"
                  >
                    <div className="flex items-center gap-4">
                      <FiInfo className="text-sky-400" size={20} />
                      <span>Company</span>
                    </div>
                    <FiChevronDown className={\`text-slate-500 transition-transform duration-300 \${mobileDropdowns.company ? "rotate-180" : ""}\`} />
                  </button>
                  {mobileDropdowns.company && (
                    <div className="px-5 pb-4 pt-1 space-y-2 border-t border-white/5 bg-black/20">
                      <Link to="/about" onClick={() => setMobileMenu(false)} className="block py-2 text-sm text-slate-300 hover:text-sky-400">Who We Are</Link>
                      <Link to="/process" onClick={() => setMobileMenu(false)} className="block py-2 text-sm text-slate-300 hover:text-sky-400">Our Process</Link>
                      <Link to="/team" onClick={() => setMobileMenu(false)} className="block py-2 text-sm text-slate-300 hover:text-sky-400">Our Team</Link>
                    </div>
                  )}
                </div>

                {/* Mobile Services Accordion */}
                <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden transition-all duration-300">
                  <button
                    onClick={() => toggleMobileDropdown("services")}
                    className="w-full group flex items-center justify-between px-5 py-4 transition-all duration-300 hover:bg-sky-500/10"
                  >
                    <div className="flex items-center gap-4">
                      <FiBox className="text-sky-400" size={20} />
                      <span>Our Services</span>
                    </div>
                    <FiChevronDown className={\`text-slate-500 transition-transform duration-300 \${mobileDropdowns.services ? "rotate-180" : ""}\`} />
                  </button>
                  {mobileDropdowns.services && (
                    <div className="px-5 pb-4 pt-1 space-y-2 border-t border-white/5 bg-black/20 max-h-64 overflow-y-auto">
                      {categoriesList.map(cat => (
                         <Link key={cat._id} to={\`/products?category=\${cat._id}\`} onClick={() => setMobileMenu(false)} className="block py-2 text-sm text-slate-300 hover:text-sky-400">{cat.name}</Link>
                      ))}
                    </div>
                  )}
                </div>
                
                {/* Mobile Blog Accordion */}
                <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden transition-all duration-300">
                  <button
                    onClick={() => toggleMobileDropdown("blog")}
                    className="w-full group flex items-center justify-between px-5 py-4 transition-all duration-300 hover:bg-sky-500/10"
                  >
                    <div className="flex items-center gap-4">
                      <FiFileText className="text-sky-400" size={20} />
                      <span>Blog</span>
                    </div>
                    <FiChevronDown className={\`text-slate-500 transition-transform duration-300 \${mobileDropdowns.blog ? "rotate-180" : ""}\`} />
                  </button>
                  {mobileDropdowns.blog && (
                    <div className="px-5 pb-4 pt-1 space-y-2 border-t border-white/5 bg-black/20">
                      <Link to="/blog" onClick={() => setMobileMenu(false)} className="block py-2 text-sm text-slate-300 hover:text-sky-400">View All Blog Posts</Link>
                    </div>
                  )}
                </div>`;

content = content.replace(mobileNavTarget, mobileNavReplacement);

fs.writeFileSync(path, content, 'utf8');
console.log("Successfully replaced navbar mega menus!");
