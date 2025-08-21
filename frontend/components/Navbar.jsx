import { useTranslation } from "react-i18next";
import { useState } from "react";
import { FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import logo from "/logo.png";

function Navbar({ activeSection, setActiveSection }) {
  const { t, i18n } = useTranslation();
  const [lang, setLang] = useState("vi");

  const navItems = ["login", "search", "about", "guide", "form", "contact"];

  const toggleLanguage = () => {
    const newLang = lang === "vi" ? "en" : "vi";
    setLang(newLang);
    i18n.changeLanguage(newLang);
  };

  return (
    <nav className="sticky top-0 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-1 flex justify-between items-center z-50 w-full shadow-md h-[52px]">
      <div className="flex items-center h-10 pl-4 overflow-hidden">
        <img
          src={logo}
          alt="Logo"
          className="h-full w-auto transform scale-150"
        />
      </div>

      <div className="flex space-x-4">
        {navItems.map((item) => (
          <button
            key={item}
            onClick={() => {
              const element = document.getElementById(item);
              if (element) {
                element.scrollIntoView({ behavior: "smooth", block: "start" });
              }
            }}
            className={`px-3 py-2 rounded transition-all duration-200 font-medium ${
              activeSection === item
                ? "bg-blue-700 text-white"
                : "text-white hover:bg-blue-700"
            }`}
          >
            {t(`navbar.${item}`)}
          </button>
        ))}
      </div>

      <div className="text-sm text-right space-y-1">
        <div className="flex items-center space-x-2">
          <FaPhoneAlt className="text-blue-200" />
          <span>{t("navbar.phone")}</span>
        </div>
        <div className="flex items-center space-x-2">
          <FaEnvelope className="text-blue-200" />
          <span>{t("navbar.email")}</span>
        </div>
      </div>

      <div>
        <button
          onClick={toggleLanguage}
          className="flex items-center w-16 h-8 bg-white border-2 border-blue-700 rounded-full relative shadow-inner"
        >
          <span className="absolute left-1 text-[10px] font-semibold text-blue-700">
            ENG
          </span>
          <span className="absolute right-1 text-[10px] font-semibold text-blue-700">
            VIE
          </span>
          <div
            className={`w-5 h-5 rounded-full transition-all duration-200 transform ${
              lang === "vi" ? "translate-x-1" : "translate-x-9"
            }`}
            style={{
              backgroundImage:
                lang === "vi"
                  ? `url('https://flagcdn.com/w40/vn.png')`
                  : `url('https://flagcdn.com/w40/gb.png')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
