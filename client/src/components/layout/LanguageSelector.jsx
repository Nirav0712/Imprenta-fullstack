import { useState, useRef, useEffect } from "react";
import { FiGlobe, FiChevronDown, FiCheck, FiSearch, FiX } from "react-icons/fi";

export const LANGUAGES = [
  // Popular & Indian Languages
  { code: "en", name: "English", nativeName: "English", flag: "🇬🇧", category: "Indian & Regional" },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी", flag: "🇮🇳", category: "Indian & Regional" },
  { code: "gu", name: "Gujarati", nativeName: "ગુજરાતી", flag: "🇮🇳", category: "Indian & Regional" },
  { code: "mr", name: "Marathi", nativeName: "मराठी", flag: "🇮🇳", category: "Indian & Regional" },
  { code: "bn", name: "Bengali", nativeName: "বাংলা", flag: "🇮🇳", category: "Indian & Regional" },
  { code: "ta", name: "Tamil", nativeName: "தமிழ்", flag: "🇮🇳", category: "Indian & Regional" },
  { code: "te", name: "Telugu", nativeName: "తెలుగు", flag: "🇮🇳", category: "Indian & Regional" },
  { code: "kn", name: "Kannada", nativeName: "ಕನ್ನಡ", flag: "🇮🇳", category: "Indian & Regional" },
  { code: "ml", name: "Malayalam", nativeName: "മലയാളം", flag: "🇮🇳", category: "Indian & Regional" },
  { code: "pa", name: "Punjabi", nativeName: "ਪੰਜਾਬੀ", flag: "🇮🇳", category: "Indian & Regional" },
  { code: "ur", name: "Urdu", nativeName: "اردو", flag: "🇵🇰", category: "Indian & Regional" },
  { code: "ne", name: "Nepali", nativeName: "नेपाली", flag: "🇳🇵", category: "Indian & Regional" },

  // Global Languages
  { code: "es", name: "Spanish", nativeName: "Español", flag: "🇪🇸", category: "International" },
  { code: "fr", name: "French", nativeName: "Français", flag: "🇫🇷", category: "International" },
  { code: "de", name: "German", nativeName: "Deutsch", flag: "🇩🇪", category: "International" },
  { code: "ar", name: "Arabic", nativeName: "العربية", flag: "🇦🇪", category: "International" },
  { code: "zh-CN", name: "Chinese (Simplified)", nativeName: "简体中文", flag: "🇨🇳", category: "International" },
  { code: "zh-TW", name: "Chinese (Traditional)", nativeName: "繁體中文", flag: "🇹🇼", category: "International" },
  { code: "ja", name: "Japanese", nativeName: "日本語", flag: "🇯🇵", category: "International" },
  { code: "ko", name: "Korean", nativeName: "한국어", flag: "🇰🇷", category: "International" },
  { code: "ru", name: "Russian", nativeName: "Русский", flag: "🇷🇺", category: "International" },
  { code: "pt", name: "Portuguese", nativeName: "Português", flag: "🇵🇹", category: "International" },
  { code: "it", name: "Italian", nativeName: "Italiano", flag: "🇮🇹", category: "International" },
  { code: "nl", name: "Dutch", nativeName: "Nederlands", flag: "🇳🇱", category: "International" },
  { code: "tr", name: "Turkish", nativeName: "Türkçe", flag: "🇹🇷", category: "International" },
  { code: "vi", name: "Vietnamese", nativeName: "Tiếng Việt", flag: "🇻🇳", category: "International" },
  { code: "th", name: "Thai", nativeName: "ไทย", flag: "🇹🇭", category: "International" },
  { code: "id", name: "Indonesian", nativeName: "Bahasa Indonesia", flag: "🇮🇩", category: "International" },
  { code: "fa", name: "Persian", nativeName: "فارسی", flag: "🇮🇷", category: "International" },
  { code: "pl", name: "Polish", nativeName: "Polski", flag: "🇵🇱", category: "International" },
  { code: "sv", name: "Swedish", nativeName: "Svenska", flag: "🇸🇪", category: "International" },
  { code: "el", name: "Greek", nativeName: "Ελληνικά", flag: "🇬🇷", category: "International" },
  { code: "he", name: "Hebrew", nativeName: "עברית", flag: "🇮🇱", category: "International" },
  { code: "cs", name: "Czech", nativeName: "Čeština", flag: "🇨🇿", category: "International" },
  { code: "ro", name: "Romanian", nativeName: "Română", flag: "🇷🇴", category: "International" },
  { code: "hu", name: "Hungarian", nativeName: "Magyar", flag: "🇭🇺", category: "International" },
  { code: "da", name: "Danish", nativeName: "Dansk", flag: "🇩🇰", category: "International" },
  { code: "fi", name: "Finnish", nativeName: "Suomi", flag: "🇫🇮", category: "International" },
  { code: "no", name: "Norwegian", nativeName: "Norsk", flag: "🇳🇴", category: "International" },
  { code: "uk", name: "Ukrainian", nativeName: "Українська", flag: "🇺🇦", category: "International" },
  { code: "ms", name: "Malay", nativeName: "Bahasa Melayu", flag: "🇲🇾", category: "International" },
  { code: "tl", name: "Filipino", nativeName: "Tagalog", flag: "🇵🇭", category: "International" },
  { code: "sw", name: "Swahili", nativeName: "Kiswahili", flag: "🇰🇪", category: "International" },
];

const getActiveLanguage = () => {
  try {
    const match = document.cookie.match(/(?:^|;\s*)googtrans=([^;]*)/);
    if (match && match[1]) {
      const parts = decodeURIComponent(match[1]).split("/");
      const code = parts[parts.length - 1];
      if (code) return code;
    }
    const saved = localStorage.getItem("selected_lang");
    if (saved) return saved;
  } catch {
    // Ignore error
  }
  return "en";
};

const LanguageSelector = ({ isMobile = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [currentCode, setCurrentCode] = useState(getActiveLanguage);
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);

  useEffect(() => {
    setCurrentCode(getActiveLanguage());
  }, []);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      // Focus search input when dropdown opens
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleSelectLanguage = (code) => {
    const host = window.location.hostname;
    const parts = host.split(".");
    const rootDomain = parts.length >= 2 ? parts.slice(-2).join(".") : host;
    const isIpOrLocal = host === "localhost" || /^\d+\.\d+\.\d+\.\d+$/.test(host);

    const domains = [
      "",
      host,
      ...(isIpOrLocal ? [] : [rootDomain, `.${rootDomain}`, `.${host}`]),
    ];

    if (code === "en") {
      domains.forEach((d) => {
        const dStr = d ? `; domain=${d}` : "";
        document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/${dStr}`;
        document.cookie = `googtrans=/auto/en; path=/${dStr}`;
        document.cookie = `googtrans=/en/en; path=/${dStr}`;
      });
      localStorage.setItem("selected_lang", "en");
    } else {
      domains.forEach((d) => {
        const dStr = d ? `; domain=${d}` : "";
        document.cookie = `googtrans=/auto/${code}; path=/${dStr}`;
        document.cookie = `googtrans=/en/${code}; path=/${dStr}`;
      });
      localStorage.setItem("selected_lang", code);
    }

    setCurrentCode(code);
    setIsOpen(false);

    // Try triggering google element if present
    const combo = document.querySelector(".goog-te-combo");
    if (combo) {
      combo.value = code;
      combo.dispatchEvent(new Event("change", { bubbles: true }));
      setTimeout(() => {
        window.location.reload();
      }, 300);
    } else {
      setTimeout(() => {
        window.location.reload();
      }, 100);
    }
  };

  const currentLang = LANGUAGES.find((l) => l.code === currentCode) || LANGUAGES[0];

  const filteredLanguages = LANGUAGES.filter((l) => {
    const query = search.toLowerCase().trim();
    if (!query) return true;
    return (
      l.name.toLowerCase().includes(query) ||
      l.nativeName.toLowerCase().includes(query) ||
      l.code.toLowerCase().includes(query)
    );
  });

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`flex items-center gap-1.5 sm:gap-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-sky-400/40 text-slate-200 transition-all cursor-pointer backdrop-blur-md shadow-sm shrink-0 ${
          isMobile
            ? "px-2 sm:px-2.5 py-1.5 sm:py-2 text-xs font-semibold"
            : "px-2.5 xl:px-3.5 py-2 xl:py-2.5 text-xs xl:text-sm font-semibold"
        }`}
        title="Select Language"
        aria-label="Select Language"
      >
        <FiGlobe size={isMobile ? 15 : 17} className="text-sky-400 shrink-0" />
        <span className="text-sm sm:text-base leading-none">{currentLang.flag}</span>
        <span className="hidden sm:inline font-medium text-white truncate max-w-[90px] xl:max-w-none">
          {currentLang.nativeName || currentLang.name}
        </span>
        <FiChevronDown
          size={13}
          className={`text-slate-400 transition-transform duration-200 shrink-0 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className={`absolute mt-2 bg-[#0B1526]/95 border border-white/15 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.65)] backdrop-blur-2xl z-50 flex flex-col overflow-hidden animate-in fade-in duration-150 ${
            isMobile
              ? "right-0 w-[280px] sm:w-[290px] max-w-[calc(100vw-24px)] max-h-[420px]"
              : "right-0 w-80 sm:w-96 max-w-[calc(100vw-32px)] max-h-[480px]"
          }`}
        >
          {/* Header & Search */}
          <div className="p-3.5 sm:p-4 border-b border-white/10 bg-[#070D18]/90">
            <div className="flex items-center justify-between mb-2.5">
              <div className="flex items-center gap-2">
                <FiGlobe className="text-sky-400" size={16} />
                <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white">
                  Translate Website
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/5 transition"
              >
                <FiX size={16} />
              </button>
            </div>

            <div className="relative">
              <FiSearch
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
              />
              <input
                ref={searchInputRef}
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search language (Hindi, Gujarati, French...)"
                className="h-9 w-full rounded-xl border border-white/10 bg-white/5 pl-9 pr-8 text-xs text-white placeholder-slate-500 outline-none focus:border-sky-400 focus:bg-white/10 transition"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-0.5"
                >
                  <FiX size={12} />
                </button>
              )}
            </div>
          </div>

          {/* Languages List */}
          <div className="overflow-y-auto p-2 space-y-1 max-h-[340px] custom-scrollbar">
            {filteredLanguages.length === 0 ? (
              <div className="py-8 text-center text-xs text-slate-400">
                No matching language found.
              </div>
            ) : (
              filteredLanguages.map((lang) => {
                const isSelected = currentCode === lang.code;
                return (
                  <button
                    key={lang.code}
                    type="button"
                    onClick={() => handleSelectLanguage(lang.code)}
                    className={`w-full text-left px-3 py-2.5 rounded-xl transition flex items-center justify-between group cursor-pointer ${
                      isSelected
                        ? "bg-sky-500/15 border border-sky-500/30 text-white"
                        : "hover:bg-white/5 border border-transparent text-slate-300 hover:text-white"
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="text-xl leading-none shrink-0">{lang.flag}</span>
                      <div className="min-w-0">
                        <p
                          className={`text-sm font-bold truncate ${
                            isSelected ? "text-sky-400" : "text-white"
                          }`}
                        >
                          {lang.nativeName}
                        </p>
                        <p className="text-[11px] text-slate-400 truncate">
                          {lang.name}
                        </p>
                      </div>
                    </div>
                    {isSelected && (
                      <span className="w-5 h-5 rounded-full bg-sky-500/20 border border-sky-500/40 flex items-center justify-center text-sky-400 shrink-0">
                        <FiCheck size={12} />
                      </span>
                    )}
                  </button>
                );
              })
            )}
          </div>

          {/* Footer note */}
          <div className="p-2.5 bg-[#050A14] border-t border-white/5 text-center text-[10px] text-slate-400">
            Powered by Google Translate • 40+ Languages
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
