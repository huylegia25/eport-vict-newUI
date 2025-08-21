import { useState, useRef } from "react";
import React from "react";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaRegUserCircle,
  FaSearch,
} from "react-icons/fa";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { MdCircleNotifications, MdDesignServices } from "react-icons/md";
import { ImExit } from "react-icons/im";
import { GrServices } from "react-icons/gr";
import { TbTruckDelivery } from "react-icons/tb";
import { AiOutlineFileSearch } from "react-icons/ai";
import { PiInvoice } from "react-icons/pi";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import LogisticsPage from "../pages/LogisticsPage.jsx";

export default function Actionbar({ role }) {
  const { t, i18n } = useTranslation();
  const [lang, setLang] = useState(i18n.language || "vi");
  const [activeTab, setActiveTab] = useState(["notification"]);
  const [activeFeature, setActiveFeature] = useState("notification");
  const featuresRef = useRef(null);

  const scrollFeatures = (direction) => {
    if (featuresRef.current) {
      featuresRef.current.scrollBy({
        left: direction * 150, // adjust scroll step
        behavior: "smooth",
      });
    }
  };

  const toggleLanguage = () => {
    const newLang = lang === "vi" ? "en" : "vi";
    setLang(newLang);
    i18n.changeLanguage(newLang);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  const features = [
    {
      key: "service_registration",
      label: t("features.service_registration"),
      icon: <GrServices />,
      children: [
        { key: "receive_loaded", label: t("features.receive_loaded") },
        {
          key: "container_yard_dropoff",
          label: t("features.container_yard_dropoff"),
        },
        { key: "receive_empty", label: t("features.receive_empty") },
        {
          key: "container_yard_pickup",
          label: t("features.container_yard_pickup"),
        },
      ],
    },
    {
      key: "special_services",
      label: t("features.special_services"),
      icon: <MdDesignServices />,
      children: [
        { key: "fcl_stuffing", label: t("features.fcl_stuffing") },
        { key: "fcl_unstuffing", label: t("features.fcl_unstuffing") },
        {
          key: "container_transshipment",
          label: t("features.container_transshipment"),
        },
        { key: "customs_inspection", label: t("features.customs_inspection") },
      ],
    },
    {
      key: "operations",
      label: t("features.operations"),
      icon: <TbTruckDelivery />,
    },
    {
      key: "lookup",
      label: t("features.lookup"),
      icon: <AiOutlineFileSearch />,
    },
    {
      key: "split_bill",
      label: t("features.split_bill"),
      icon: <FaMoneyBillTransfer />,
    },
    {
      key: "electronic_invoice",
      label: t("features.electronic_invoice"),
      icon: <PiInvoice />,
    },
  ];

  const addTab = (key, label) => {
    if (!activeTab.includes(key)) setActiveTab([...activeTab, key]);
    setActiveFeature(key);
  };

  return (
    <div className="flex h-screen">
      {/* Left Sidebar */}
      <div className="w-1/6 bg-gray-200 flex flex-col items-center justify-between">
        <div className="flex flex-col items-center space-y-4">
          <img src="/logo.png" alt="Logo" className="w-32 h-auto" />
          <div className="text-black text-sm text-center flex flex-col items-center">
            <div className="flex items-center space-x-1">
              <FaPhoneAlt /> <span>(84-28) 3872 4235</span>
            </div>
            <div className="flex items-center space-x-1">
              <FaEnvelope /> <span>info@vict-vn.com</span>
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
              />
            </button>
          </div>
          <hr className="w-full border-black" />
          <FaRegUserCircle className="text-blue-300 text-8xl" />
          <div className="font-bold text-black pb-5">{role}</div>
          <button
            className="text-white bg-blue-600 hover:bg-blue-900 active:bg-blue-900 p-2 rounded-full"
            onClick={() => addTab("notification", t("notification"))}
          >
            <MdCircleNotifications size={24} />
          </button>
        </div>

        <button
          className="flex items-center space-x-2 text-white font-bold px-4 py-2 rounded-lg bg-gradient-to-r from-rose-400 to-red-500 hover:from-rose-600 hover:to-red-900 mb-6"
          onClick={logout}
        >
          <ImExit /> <span>{t("logout")}</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="h-[100px] bg-gray-100 flex flex-col">
          {/* Row 1: Features + Search */}
          <div className="flex items-center px-4 border-b border-black relative h-[60px]">
            {/* Nút điều hướng trái */}
            <button
              className="flex items-center justify-center w-10 h-10 bg-gray-300 rounded-full mr-2"
              onClick={() => scrollFeatures(-1)}
            >
              <FiChevronLeft className="text-xl" />
            </button>

            {/* Feature Buttons */}
            <div ref={featuresRef} className="flex-1 flex overflow-visible">
              <div
                className="flex space-x-2 max-w-full"
                style={{ maxWidth: "calc(100% - 200px)" }}
              >
                {features.map((feat) => (
                  <div key={feat.key} className="relative group flex-shrink-0">
                    <button
                      onClick={() =>
                        !feat.children && addTab(feat.key, feat.label)
                      }
                      className="flex items-center justify-between px-3 py-2 hover:bg-gray-300 rounded"
                    >
                      <span className="flex items-center space-x-1">
                        {React.cloneElement(feat.icon, {
                          className: "text-blue-600",
                        })}
                        <span>{feat.label}</span>
                      </span>
                      {feat.children && <span className="ml-2">▼</span>}
                    </button>

                    {feat.children && (
                      <div className="absolute top-full left-0 bg-white border shadow-md z-20 w-auto min-w-full hidden group-hover:block">
                        {feat.children.map((child) => (
                          <button
                            key={child.key}
                            onClick={() => addTab(child.key, child.label)}
                            className="block w-full text-left px-3 py-1 hover:bg-gray-200"
                          >
                            {child.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Nút điều hướng phải */}
            <button
              className="flex items-center justify-center w-10 h-10 bg-gray-300 rounded-full ml-2"
              onClick={() => scrollFeatures(1)}
            >
              <FiChevronRight className="text-xl" />
            </button>

            {/* Search */}
            <div
              className="ml-4 border-l border-black pl-4"
              style={{ minWidth: "200px" }}
            >
              <div className="flex items-center border border-indigo-500 rounded-full px-2 py-1 hover:border-indigo-900">
                <FaSearch className="mr-1" />
                <input
                  type="text"
                  placeholder={t("searchs")}
                  className="outline-none bg-transparent w-full"
                />
              </div>
            </div>
          </div>

          {/* Row 2: Active Tabs */}
          <div className="flex h-14 items-center border-t border-black px-4 space-x-2 overflow-x-auto">
            {activeTab.map((tabKey) => {
              const tabLabel =
                tabKey === "notification"
                  ? t("notification")
                  : features
                      .flatMap((f) => f.children || [])
                      .concat(features)
                      .find((f) => f.key === tabKey)?.label || tabKey;
              return (
                <div
                  key={tabKey}
                  className={`flex items-center space-x-1 px-2 py-1 rounded border border-blue-900 cursor-pointer ${
                    activeFeature === tabKey ? "bg-blue-300" : "bg-blue-100"
                  }`}
                  onClick={() => setActiveFeature(tabKey)}
                >
                  <span>{tabLabel}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      const newTabs = activeTab.filter((t) => t !== tabKey);
                      setActiveTab(newTabs);
                      if (activeFeature === tabKey) {
                        if (newTabs.length > 0) {
                          // Chuyển sang tab đầu tiên trong danh sách còn lại
                          setActiveFeature(newTabs[0]);
                        } else {
                          // Nếu không còn tab, đặt activeFeature về null hoặc giá trị mặc định
                          setActiveFeature(null); // Hoặc "notification" nếu muốn quay về tab mặc định
                        }
                      }
                    }}
                    className="text-red-500 font-bold"
                  >
                    ×
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto">
          <LogisticsPage activeFeature={activeFeature} />
        </div>
      </div>
    </div>
  );
}
