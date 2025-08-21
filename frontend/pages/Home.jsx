import { useTranslation } from "react-i18next";
import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import logo from "/logo.png";
import gov from "/gov.png";
import Navbar from "../components/Navbar.jsx";
import { PiShippingContainerFill } from "react-icons/pi";
import { BsLayerForward } from "react-icons/bs";
import { GiCargoShip } from "react-icons/gi";
import { FaTruckArrowRight } from "react-icons/fa6";
import {
  FaTruck,
  FaShip,
  FaUser,
  FaFileInvoice,
  FaFileAlt,
  FaCreditCard,
  FaShieldAlt,
  FaFileSignature,
  FaFileInvoiceDollar,
  FaCalendar,
  FaCalendarAlt,
  FaChevronLeft,
  FaChevronRight,
  FaDownload,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaPlayCircle,
} from "react-icons/fa";

const images = [
  "/slider1.jpg",
  "/slider2.jpg",
  "/slider3.jpg",
  "/slider4.jpg",
  "/slider5.jpg",
];

const roles = [
  { icon: <FaTruck />, label: "logistics" },
  { icon: <FaShip />, label: "shippingline" },
  { icon: <FaUser />, label: "admin" },
];

const extendedImages = [images[images.length - 1], ...images, images[0]];

const files = [
  {
    key: "guide.file1",
    link: "https://eport.vict.com.vn/file/public-document/2024/03/01/700709e8204d4b7d9c7da4b2314cb03b.pdf",
  },
  {
    key: "guide.file2",
    link: "https://eport.vict.com.vn/file/public-document/2023/08/28/1f3d6dd22aa344c9810f5ec175e6bd76.pdf",
  },
  {
    key: "guide.file3",
    link: "https://eport.vict.com.vn/file/public-document/2023/11/28/aee28f0a9c714895b4301ba8d4897e39.pdf",
  },
  {
    key: "guide.file4",
    link: "https://eport.vict.com.vn/file/public-document/2023/11/03/1d3f7594f1e44c2781ab8ad3a64c4730.pdf",
  },
];

const videos = [
  { key: "guide.video1", link: "https://youtu.be/g-ljUT4uxv4" },
  { key: "guide.video2", link: "https://youtu.be/eMt2oXFxvfM" },
  { key: "guide.video3", link: "https://youtu.be/cJz-DI7XVHs" },
  { key: "guide.video4", link: "https://youtu.be/EgrZM92rRC0" },
  { key: "guide.video5", link: "https://youtu.be/P4xK7IeU-QI" },
  { key: "guide.video6", link: "https://youtu.be/BztmdrNgNI0" },
  { key: "guide.video7", link: "https://youtu.be/nG1LlsWHBBA" },
  { key: "guide.video8", link: "https://youtu.be/fsOGo7wXYK4" },
];

const toPages = (arr, size = 2) => {
  const pages = [];
  for (let i = 0; i < arr.length; i += size) pages.push(arr.slice(i, i + size));
  return pages;
};

const forms = [
  {
    key: "form.form1",
    icon: <GiCargoShip className="text-blue-900 text-8xl" />,
    link: "/files/form1.doc",
  },
  {
    key: "form.form2",
    icon: <BsLayerForward className="text-blue-900 text-8xl" />,
    link: "/files/form2.doc",
  },
  {
    key: "form.form3",
    icon: <FaTruckArrowRight className="text-blue-900 text-8xl" />,
    link: "/files/form3.doc",
  },
  {
    key: "form.form4",
    icon: <FaFileAlt className="text-blue-900 text-8xl" />,
    link: "/files/form4.pdf",
  },
  {
    key: "form.form5",
    icon: <FaFileInvoiceDollar className="text-blue-900 text-8xl" />,
    link: "/files/form5.pdf",
  },
];

const sections = ["login", "search", "about", "guide", "form", "contact"];

function Home({ activeSection, setActiveSection, onLogin }) {
  const { t } = useTranslation();
  const [currentImage, setCurrentImage] = useState(1);
  const [selectedRole, setSelectedRole] = useState("logistics");
  const [transitioning, setTransitioning] = useState(true);
  const [activeForm, setActiveForm] = useState(0);
  const [eirDate, setEirDate] = useState(null);
  const [shipFromDate, setShipFromDate] = useState(null);
  const [shipToDate, setShipToDate] = useState(null);
  const [openVideo, setOpenVideo] = useState(null);
  const [docIndex, setDocIndex] = useState(0);
  const [videoIndex, setVideoIndex] = useState(0);
  const docPages = useMemo(() => toPages(files, 2), []);
  const videoPages = useMemo(() => toPages(videos, 2), []);
  const [formIndex, setFormIndex] = useState(0);
  const [edoContainer, setEdoContainer] = useState("");
  const [edoOrderId, setEdoOrderId] = useState("");
  const [containerCode, setContainerCode] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/auth/login", {
        username,
        password,
        role: selectedRole,
      });

      const { token, user } = res.data;

      // ✅ Lưu token + user
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // ✅ Nếu có tick remember thì lưu cả username + password
      const rememberEl = document.getElementById("remember");
      if (rememberEl?.checked) {
        localStorage.setItem("rememberedUser", username);
        localStorage.setItem("rememberedPass", password);
      } else {
        localStorage.removeItem("rememberedUser");
        localStorage.removeItem("rememberedPass");
      }

      // ✅ Chuyển route theo role (không hiện message nữa)
      if (onLogin) onLogin(user);
      navigate(`/${user.role}`);
    } catch (err) {
      console.error("Login error:", err.response?.data?.error || err.message);
    }
  };

  useEffect(() => {
    const rememberedUser = localStorage.getItem("rememberedUser");
    const rememberedPass = localStorage.getItem("rememberedPass");
    if (rememberedUser && rememberedPass) {
      setUsername(rememberedUser);
      setPassword(rememberedPass);
      const checkbox = document.getElementById("remember");
      if (checkbox) checkbox.checked = true;
    }
  }, []);

  useEffect(() => {
    const docInterval = setInterval(() => {
      setDocIndex((prev) => (prev + 1) % docPages.length);
    }, 15000);
    return () => clearInterval(docInterval);
  }, [docPages.length]);

  useEffect(() => {
    const videoInterval = setInterval(() => {
      setVideoIndex((prev) => (prev + 1) % videoPages.length);
    }, 15000);
    return () => clearInterval(videoInterval);
  }, [videoPages.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => prev + 1);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (currentImage === extendedImages.length - 1) {
      setTimeout(() => {
        setTransitioning(false);
        setCurrentImage(1);
      }, 1000);
    } else if (currentImage === 0) {
      setTimeout(() => {
        setTransitioning(false);
        setCurrentImage(extendedImages.length - 2);
      }, 1000);
    } else {
      setTransitioning(true);
    }
  }, [currentImage]);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-52px 0px 0px 0px",
      threshold: 0.5,
    };

    const callback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(callback, observerOptions);

    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => {
      observer.disconnect();
    };
  }, [setActiveSection]);

  return (
    <>
      <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />

      <section
        id="login"
        className="scroll-mt-[52px] h-[calc(100vh-52px)] w-full flex overflow-hidden"
      >
        {/* Background slideshow */}
        <div className="w-2/3 h-full overflow-hidden relative">
          <div
            className={`flex h-full ${
              transitioning
                ? "transition-transform duration-1000 ease-in-out"
                : ""
            }`}
            style={{ transform: `translateX(-${currentImage * 100}%)` }}
          >
            {extendedImages.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Slide ${index}`}
                className="w-full h-full object-cover flex-shrink-0"
              />
            ))}
          </div>
          <div className="absolute inset-0 bg-black bg-opacity-50 pointer-events-none" />
        </div>

        {/* Login form */}
        <div className="w-1/3 h-full flex items-center">
          <div className="w-full h-full p-10 shadow-lg bg-gradient-to-t from-cyan-500 to-blue-600 bg-opacity-70 flex flex-col justify-center">
            <h2 className="text-3xl font-bold text-center text-black mb-8">
              {t("login.title")}
            </h2>

            <div className="flex justify-around mb-8">
              {roles.map((role) => (
                <button
                  type="button"
                  key={role.label}
                  onClick={() => setSelectedRole(role.label)}
                  className={`flex flex-col items-center px-2 transition-colors duration-200 ${
                    selectedRole === role.label
                      ? "text-white"
                      : "text-black hover:text-white"
                  }`}
                >
                  <div className="text-3xl mb-1">{role.icon}</div>
                  <div className="text-sm font-medium">
                    {t(`login.roles.${role.label}`)}
                  </div>
                </button>
              ))}
            </div>

            {/* Form */}
            <form
              className="space-y-6 text-black font-bold"
              onSubmit={handleSubmit}
            >
              <div>
                <label htmlFor="username" className="block text-sm">
                  {t("login.username")}
                </label>
                <input
                  id="username"
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="mt-1 block w-full rounded-md bg-white px-3 py-2 text-gray-900 outline outline-1 outline-gray-300 focus:outline-2 focus:outline-indigo-600"
                />
              </div>

              <div>
                <div className="flex">
                  <label htmlFor="password" className="block text-sm">
                    {t("login.password")}
                  </label>
                </div>

                <div className="flex items-center mt-1">
                  <input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1 block w-full rounded-md bg-white px-3 py-2 text-gray-900 outline outline-1 outline-gray-300 focus:outline-2 focus:outline-indigo-600"
                  />
                  <label
                    htmlFor="remember"
                    className="flex items-center w-4/5 justify-start pl-5 text-sm text-black"
                  >
                    <input type="checkbox" id="remember" className="mr-2" />
                    {t("login.remember")}
                  </label>
                </div>
                <div className="text-center pt-5">
                  <a
                    href="#"
                    className="text-sm text-blue-800 hover:text-white"
                  >
                    {t("login.forgot")}
                  </a>
                </div>
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="w-1/2 rounded-md bg-indigo-600 px-3 py-2 text-white font-semibold shadow hover:bg-indigo-500"
                >
                  {t("login.submit")}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <section
        id="search"
        className="scroll-mt-[52px] h-[calc(100vh-52px)] bg-gray-100 w-screen flex"
      >
        {/* Left */}
        <div className="w-3/5 h-full flex">
          {/* Sidebar */}
          <div className="w-1/6 bg-gradient-to-b from-cyan-500 to-blue-600 flex flex-col items-center justify-center space-y-6 py-10">
            {[
              {
                key: 0,
                icon: <FaFileInvoice className="text-3xl" />,
                label: "eDO",
              },
              {
                key: 1,
                icon: <FaFileAlt className="text-3xl" />,
                label: "EIR",
              },
              {
                key: 2,
                icon: <PiShippingContainerFill className="text-3xl" />,
                label: "Container",
              },
              {
                key: 3,
                icon: <FaCalendar className="text-3xl" />,
                label: "Schedule",
              },
            ].map(({ key, icon, label }) => (
              <button
                key={key}
                onClick={() => setActiveForm(key)}
                className={`flex flex-col items-center text-white hover:text-yellow-300 transition ${
                  activeForm === key ? "text-yellow-300 font-bold" : ""
                }`}
              >
                {icon}
                <span className="text-sm mt-1">{label}</span>
              </button>
            ))}
          </div>

          {/* Forms container */}
          <div className="w-5/6 h-full relative overflow-hidden">
            <div
              className="absolute top-0 left-0 w-full h-full transition-transform duration-500 ease-in-out"
              style={{ transform: `translateY(-${activeForm * 100}%)` }}
            >
              {/* Form 1: eDO */}
              <div className="w-full h-full bg-gray-200 p-10 flex flex-col justify-center">
                <h2 className="text-center text-xl font-bold mb-6 pb-2">
                  {t("search.edo.title")}
                </h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm text-black/70 pb-1">
                      {t("search.edo.containerNo")}
                    </label>
                    <input
                      type="text"
                      value={edoContainer}
                      onChange={(e) => setEdoContainer(e.target.value)}
                      className="w-full p-2 rounded border"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-black/70 pb-1">
                      {t("search.edo.billNo")}
                    </label>
                    <input
                      type="text"
                      value={edoOrderId}
                      onChange={(e) => setEdoOrderId(e.target.value)}
                      className="w-full p-2 rounded border"
                    />
                  </div>
                  <div className="text-center pt-3">
                    <button
                      className="bg-blue-800 text-white px-6 py-2 rounded hover:bg-blue-700"
                      onClick={async () => {
                        try {
                          const res = await fetch(
                            `/api/search/edo?containerCode=${edoContainer}&orderId=${edoOrderId}`
                          );
                          const data = await res.json();
                          if (!res.ok) throw new Error(data.error || "Error");
                          setSearchResult({
                            type: "edo",
                            data,
                          });
                        } catch (err) {
                          setSearchResult({ error: err.message });
                        }
                      }}
                    >
                      {t("search.button")}
                    </button>
                  </div>
                </div>
              </div>

              {/* Form 2: EIR */}
              <div className="w-full h-full bg-gray-200 p-10 flex flex-col justify-center">
                <h2 className="text-center text-xl font-bold mb-6 pb-2">
                  {t("search.eir.title")}
                </h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm text-black/70 pb-1">
                      {t("search.eir.containerNo")}
                    </label>
                    <input type="text" className="w-full p-2 rounded border" />
                  </div>
                  <div className="flex space-x-4">
                    <div className="w-1/2">
                      <label className="block text-sm text-black/70 pb-1">
                        {t("search.eir.truckNo")}
                      </label>
                      <input
                        type="text"
                        className="w-full p-2 rounded border"
                      />
                    </div>
                    <div className="w-1/2">
                      <label className="block text-sm text-black/70 pb-1">
                        {t("search.eir.date")}
                      </label>
                      <ReactDatePicker
                        selected={eirDate}
                        onChange={(date) => setEirDate(date)}
                        dateFormat="dd/MM/yyyy"
                        placeholderText="dd/mm/yyyy"
                        className="w-full p-2 rounded border text-gray-900"
                        wrapperClassName="w-full"
                      />
                    </div>
                  </div>
                  <div className="text-center pt-3">
                    <button className="bg-blue-800 text-white px-6 py-2 rounded hover:bg-blue-700">
                      {t("search.button")}
                    </button>
                  </div>
                </div>
              </div>

              {/* Form 3: Container */}
              <div className="w-full h-full bg-gray-200 p-10 flex flex-col justify-center">
                <h2 className="text-center text-xl font-bold mb-6">
                  {t("search.container.title")}
                </h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm text-black/70 pb-1">
                      {t("search.container.containerNo")}
                    </label>
                    <input
                      type="text"
                      value={containerCode}
                      onChange={(e) => setContainerCode(e.target.value)}
                      className="w-full p-2 rounded border"
                    />
                  </div>
                  <div className="text-center pt-3">
                    <button
                      className="bg-blue-800 text-white px-6 py-2 rounded hover:bg-blue-700"
                      onClick={async () => {
                        try {
                          const res = await fetch(
                            `/api/search/container?containerCode=${containerCode}`
                          );
                          const data = await res.json();
                          if (!res.ok) throw new Error(data.error || "Error");
                          setSearchResult({
                            type: "container",
                            data,
                          });
                        } catch (err) {
                          setSearchResult({ error: err.message });
                        }
                      }}
                    >
                      {t("search.button")}
                    </button>
                  </div>
                </div>
              </div>

              {/* Form 4: Ship */}
              <div className="w-full h-full bg-gray-200 p-10 flex flex-col justify-center">
                <h2 className="text-center text-xl font-bold mb-6 pb-2">
                  {t("search.ship.title")}
                </h2>
                <div className="flex space-x-4">
                  <div className="w-1/2">
                    <label className="block text-sm text-black/70 pb-1">
                      {t("search.ship.from")}
                    </label>
                    <ReactDatePicker
                      selected={shipFromDate}
                      onChange={(date) => setShipFromDate(date)}
                      dateFormat="dd/MM/yyyy"
                      placeholderText="dd/mm/yyyy"
                      className="w-full p-2 rounded border text-gray-900"
                      wrapperClassName="w-full"
                    />
                  </div>
                  <div className="w-1/2">
                    <label className="block text-sm text-black/70 pb-1">
                      {t("search.ship.to")}
                    </label>
                    <ReactDatePicker
                      selected={shipToDate}
                      onChange={(date) => setShipToDate(date)}
                      dateFormat="dd/MM/yyyy"
                      placeholderText="dd/mm/yyyy"
                      className="w-full p-2 rounded border text-gray-900"
                      wrapperClassName="w-full"
                    />
                  </div>
                </div>
                <div className="text-center mt-6 pt-3">
                  <button className="bg-blue-800 text-white px-6 py-2 rounded hover:bg-blue-700">
                    {t("search.button")}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="w-2/5 h-full flex flex-col pt-10 items-center">
          {/* Title */}
          <h2 className="text-4xl font-bold">{t("search.resultTitle")}</h2>

          {/* Result wrapper */}
          <div className="flex-1 w-full flex items-center justify-center">
            {searchResult && (
              <div className="border-2 border-black rounded-lg p-4 text-black font-bold w-4/5 text-center">
                {searchResult.error ? (
                  <p>{t("search.noResult")}</p>
                ) : (
                  <>
                    {searchResult.type === "edo" && (
                      <div className="space-y-2">
                        <p>
                          {t("search.edo.billNo")}: {searchResult.data.id}
                        </p>
                        <p>
                          {t("search.edo.containerNo")}:{" "}
                          {searchResult.data.container_code}
                        </p>
                        <p>
                          {t("search.result.logistics")}:{" "}
                          {searchResult.data.logistics_name}
                        </p>
                        <p>
                          {t("search.result.driver")}:{" "}
                          {searchResult.data.driver_name}
                        </p>
                        <p>
                          {t("search.result.shippingline")}:{" "}
                          {searchResult.data.shippingline_name}
                        </p>
                        <p>
                          {t("search.result.createdAt")}:{" "}
                          {searchResult.data.created_at}
                        </p>
                        <p>
                          {t("search.result.status")}:{" "}
                          {t(`status.${searchResult.data.status}`)}
                        </p>
                      </div>
                    )}

                    {searchResult.type === "container" && (
                      <div className="space-y-2">
                        <p>ID: {searchResult.data.id}</p>
                        <p>
                          {t("search.container.containerNo")}:{" "}
                          {searchResult.data.code}
                        </p>
                        <p>
                          {t("search.result.status")}:{" "}
                          {t(`status.${searchResult.data.status}`)}
                        </p>
                      </div>
                    )}
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      <section
        id="about"
        className="scroll-mt-[52px] h-[calc(100vh-52px)] bg-gray-100 w-screen flex"
      >
        {/* Left side */}
        <div className="w-3/5 grid grid-rows-2 grid-cols-3 gap-0">
          {/* Row 1 */}
          <div className="relative w-full h-full overflow-hidden">
            <img
              src="/about1.jpg"
              alt="Guide 1"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent p-3">
              <p className="text-white font-bold text-center text-s">
                {t("about.roles.shippingLine")}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <h2 className="text-base font-bold text-white text-center px-4 py-2 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 shadow-md">
              {t("about.builtFor")}
            </h2>
          </div>

          <div className="relative w-full h-full overflow-hidden">
            <img
              src="/about2.jpg"
              alt="Guide 2"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent p-3">
              <p className="text-white font-bold text-center text-s">
                {t("about.roles.logistics")}
              </p>
            </div>
          </div>

          {/* Row 2 */}
          <div className="col-span-3 relative w-full h-full overflow-hidden">
            <img
              src="/about3.jpg"
              alt="Guide 3"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent p-3">
              <p className="text-white font-bold text-center text-s">
                {t("about.roles.driver")}
              </p>
            </div>
          </div>
        </div>

        {/* Right side */}
        <div className="w-2/5 grid grid-rows-3">
          {/* Row 1 */}
          <div className="grid grid-cols-3 items-start justify-center text-center gap-y-2 pt-20">
            <div className="flex flex-col items-center justify-center px-2">
              <div className="bg-blue-600 text-white p-4 rounded-full">
                <FaFileSignature className="text-4xl" />
              </div>
              <p className="text-sm mt-2 font-medium leading-tight max-w-[120px]">
                {t("about.features.onlineServices")}
              </p>
            </div>

            <div className="flex flex-col items-center justify-center px-2">
              <div className="bg-blue-600 text-white p-4 rounded-full">
                <FaFileInvoice className="text-4xl" />
              </div>
              <p className="text-sm mt-2 font-medium leading-tight max-w-[120px]">
                {t("about.features.eDO")}
              </p>
            </div>

            <div className="flex flex-col items-center justify-center px-2">
              <div className="bg-blue-600 text-white p-4 rounded-full">
                <FaCreditCard className="text-4xl" />
              </div>
              <p className="text-sm mt-2 font-medium leading-tight max-w-[120px]">
                {t("about.features.onlinePayment")}
              </p>
            </div>
          </div>

          {/* Row 2 */}
          <div className="flex items-center justify-center py-2">
            <h2 className="text-xl font-bold text-white text-center px-4 py-2 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 shadow-md">
              {t("about.integrateTitle")}
            </h2>
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-2 items-start justify-center text-center gap-y-2">
            <div className="flex flex-col items-center justify-center px-2">
              <div className="bg-blue-600 text-white p-4 rounded-full">
                <FaShieldAlt className="text-4xl" />
              </div>
              <p className="text-sm mt-2 font-medium leading-tight max-w-[120px]">
                {t("about.features.eCustoms")}
              </p>
            </div>

            <div className="flex flex-col items-center justify-center px-2">
              <div className="bg-blue-600 text-white p-4 rounded-full">
                <FaFileInvoiceDollar className="text-4xl" />
              </div>
              <p className="text-sm mt-2 font-medium leading-tight max-w-[120px]">
                {t("about.features.eInvoice")}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        id="guide"
        className="scroll-mt-[52px] h-[calc(100vh-52px)] bg-gray-100 flex p-6 gap-6 items-stretch"
      >
        {/* Left side - Documents */}
        <div className="w-1/2 flex flex-col relative">
          <h2 className="text-4xl font-bold text-black text-center tracking-wide relative top-10">
            {t("guide.filesTitle")}
          </h2>

          <div className="relative w-full overflow-hidden flex-1">
            {/* Track */}
            <div
              className="flex transition-transform duration-700 ease-in-out h-full"
              style={{
                width: `${docPages.length * 100}%`,
                transform: `translateX(-${
                  docIndex * (100 / docPages.length)
                }%)`,
              }}
            >
              {docPages.map((page, pIdx) => (
                <div
                  key={pIdx}
                  className="flex-shrink-0 h-full"
                  style={{ width: `${100 / docPages.length}%` }}
                >
                  <div className="grid grid-cols-2 gap-4 px-1 items-center justify-center h-full">
                    {page.map((doc, idx) => (
                      <div
                        key={`${pIdx}-${idx}`}
                        className="cursor-pointer flex justify-center"
                        onClick={() => window.open(doc.link, "_blank")}
                      >
                        <div className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden flex flex-col w-11/12 h-full">
                          <div className="aspect-video w-full overflow-hidden">
                            <img
                              src="/guide1.jpg"
                              alt={t(doc.key)}
                              className="w-full h-full object-cover"
                            />
                          </div>

                          <div className="p-3 flex flex-col justify-between flex-grow">
                            <p className="text-black font-bold text-sm text-left leading-snug line-clamp-3 min-h-[3.6em]">
                              {t(doc.key)}
                            </p>
                            <div className="flex items-center justify-center text-gray-600 text-sm mt-2">
                              <FaCalendarAlt className="text-blue-600 mr-2" />
                              <span>01/01/2025</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Arrows */}
            <button
              aria-label="Prev documents"
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-2"
              onClick={() =>
                setDocIndex(
                  (prev) => (prev - 1 + docPages.length) % docPages.length
                )
              }
            >
              <FaChevronLeft />
            </button>
            <button
              aria-label="Next documents"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-2"
              onClick={() =>
                setDocIndex((prev) => (prev + 1) % docPages.length)
              }
            >
              <FaChevronRight />
            </button>
          </div>
        </div>

        {/* Right side - Videos */}
        <div className="w-1/2 flex flex-col relative">
          <h2 className="text-4xl font-bold text-black text-center tracking-wide relative top-10">
            {t("guide.videosTitle")}
          </h2>

          <div className="relative w-full overflow-hidden flex-1">
            {/* Track */}
            <div
              className="flex transition-transform duration-700 ease-in-out h-full"
              style={{
                width: `${videoPages.length * 100}%`,
                transform: `translateX(-${
                  videoIndex * (100 / videoPages.length)
                }%)`,
              }}
            >
              {videoPages.map((page, pIdx) => (
                <div
                  key={pIdx}
                  className="flex-shrink-0 h-full"
                  style={{ width: `${100 / videoPages.length}%` }}
                >
                  <div className="grid grid-cols-2 gap-4 px-1 items-center justify-center h-full">
                    {page.map((vid, idx) => (
                      <div
                        key={`${pIdx}-${idx}`}
                        className="cursor-pointer flex justify-center"
                        onClick={() => setOpenVideo(vid.link)}
                      >
                        <div className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden flex flex-col w-11/12 h-full">
                          <div className="aspect-video w-full overflow-hidden">
                            <img
                              src="/guide2.jpg"
                              alt={t(vid.key)}
                              className="w-full h-full object-cover"
                            />
                          </div>

                          <div className="p-3 flex flex-col justify-between flex-grow">
                            <p className="text-black font-bold text-sm text-left leading-snug line-clamp-3 min-h-[3.6em]">
                              {t(vid.key)}
                            </p>
                            <div className="flex items-center justify-center text-gray-600 text-sm mt-2">
                              <FaCalendarAlt className="text-blue-600 mr-2" />
                              <span>01/01/2025</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Arrows */}
            <button
              aria-label="Prev videos"
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-2"
              onClick={() =>
                setVideoIndex(
                  (prev) => (prev - 1 + videoPages.length) % videoPages.length
                )
              }
            >
              <FaChevronLeft />
            </button>
            <button
              aria-label="Next videos"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-2"
              onClick={() =>
                setVideoIndex((prev) => (prev + 1) % videoPages.length)
              }
            >
              <FaChevronRight />
            </button>
          </div>
        </div>

        {/* Popup Video */}
        {openVideo && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg overflow-hidden w-3/4 max-w-4xl relative aspect-video">
              <iframe
                width="100%"
                height="100%"
                src={
                  openVideo.replace("youtu.be/", "www.youtube.com/embed/") +
                  "?autoplay=1"
                }
                title="Video Guide"
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
              ></iframe>
              <button
                className="absolute top-2 right-2 bg-red-600 text-white px-3 py-1 rounded"
                onClick={() => setOpenVideo(null)}
              >
                X
              </button>
            </div>
          </div>
        )}
      </section>

      <section
        id="form"
        className="scroll-mt-[52px] h-[calc(100vh-52px)] bg-gray-100 flex flex-col p-6 items-center justify-center"
      >
        {/* Title */}
        <h2 className="text-4xl font-bold text-black text-center tracking-wide mb-20">
          {t("form.title")}
        </h2>

        {/* Carousel */}
        <div className="relative w-full max-w-6xl overflow-hidden">
          {/* Track */}
          <div
            className="flex transition-transform duration-700 ease-in-out gap-4"
            style={{
              width: `${(forms.length / 3) * 100}%`, // ví dụ 6 form = 200%, 5 form = 166.6%
              transform: `translateX(-${formIndex * (100 / forms.length)}%)`,
            }}
          >
            {forms.map((form, idx) => (
              <div
                key={idx}
                className="flex-shrink-0"
                style={{
                  flex: `0 0 calc(100% / ${forms.length})`, // mỗi card chiếm đúng 1/ tổng
                }}
              >
                <div className="bg-white rounded-xl shadow hover:shadow-lg transition flex flex-col h-80">
                  {/* Icon */}
                  <div className="flex-1 flex items-center justify-center bg-blue-100">
                    {form.icon}
                  </div>

                  {/* Content */}
                  <div className="bg-blue-500 p-4 flex flex-col items-center justify-between flex-1">
                    <p className="text-white font-bold text-center mb-3 pt-5">
                      {t(form.key)}
                    </p>
                    <a
                      href={form.link} // đường dẫn tới file docx
                      download
                      className="flex items-center gap-2 bg-indigo-800 hover:bg-indigo-900 text-white px-4 py-2 rounded transition"
                    >
                      <FaDownload />
                      {t("form.download")}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Arrows */}
          <button
            aria-label="Prev forms"
            disabled={formIndex === 0}
            className={`absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full ${
              formIndex === 0
                ? "bg-gray-300"
                : "bg-black/40 hover:bg-black/60 text-white"
            }`}
            onClick={() => setFormIndex((prev) => Math.max(prev - 1, 0))}
          >
            <FaChevronLeft />
          </button>
          <button
            aria-label="Next forms"
            disabled={formIndex >= forms.length - 3}
            className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full ${
              formIndex >= forms.length - 3
                ? "bg-gray-300"
                : "bg-black/40 hover:bg-black/60 text-white"
            }`}
            onClick={() =>
              setFormIndex((prev) => Math.min(prev + 1, forms.length - 3))
            }
          >
            <FaChevronRight />
          </button>
        </div>
      </section>

      <section
        id="contact"
        className="scroll-mt-[52px] h-[calc(100vh-52px)] bg-cover bg-center text-white"
        style={{ backgroundImage: "url('/contact.jpg')" }}
      >
        <div className="w-full h-full bg-black/60 flex px-20 py-16 gap-12">
          {/* Cột 1 */}
          <div className="flex flex-col items-center justify-start w-1/5 space-y-8 pt-12">
            <img src={logo} alt="Logo" className="w-56 h-auto" />
            <img src={gov} alt="Gov" className="w-28 h-auto opacity-90" />
          </div>

          {/* Cột 2 */}
          <div className="flex flex-col w-2/5 space-y-5 text-lg pt-12 pl-5">
            <h3 className="font-bold text-2xl">{t("contact.addressTitle")}</h3>
            <p className="font-bold text-xl">
              CÔNG TY LIÊN DOANH PHÁT TRIỂN TIẾP VẬN SỐ 1
            </p>
            <hr className="border-white/70" />

            <div className="flex items-start gap-3">
              <FaMapMarkerAlt className="text-cyan-400 mt-1 text-xl" />
              <p>
                <span className="font-bold">{t("contact.addressLabel")}:</span>{" "}
                {t("contact.addressValue")}
              </p>
            </div>

            <div className="flex items-start gap-3">
              <FaPhoneAlt className="text-cyan-400 mt-1 text-xl" />
              <p>
                <span className="font-bold">{t("contact.phoneLabel")}:</span>{" "}
                (84-28) 3872 4235
              </p>
            </div>

            <div className="flex items-start gap-3">
              <FaFileInvoiceDollar className="text-cyan-400 mt-1 text-xl flex-shrink-0" />
              <p>
                <span className="font-bold">{t("contact.taxLabel")}:</span>{" "}
                {t("contact.taxValue")}
              </p>
            </div>

            <div className="flex items-start gap-3">
              <FaEnvelope className="text-cyan-400 mt-1 text-xl" />
              <p>
                <span className="font-bold">Email:</span>{" "}
                fosupervisor@vict.com.vn | nth.yen@vict.com.vn
              </p>
            </div>
          </div>

          {/* Cột 3 */}
          <div className="flex flex-col w-2/5 space-y-4 text-lg pt-12 pl-20">
            <h3 className="font-bold text-2xl">{t("contact.policyTitle")}</h3>

            {[
              {
                key: "services",
                href: "https://eport.vict.com.vn/homepage/services-introduction",
              },
              {
                key: "price",
                href: "https://eport.vict.com.vn/file/public-document/2025/07/23/370b37e59ff34736b11e6facdf90c4c4.pdf",
              },
              {
                key: "policy",
                href: "https://eport.vict.com.vn/homepage/customer-policy",
              },
              {
                key: "refund",
                href: "https://eport.vict.com.vn/homepage/refund-policy",
              },
              {
                key: "payment",
                href: "https://eport.vict.com.vn/homepage/payment-term",
              },
              {
                key: "shipping",
                href: "https://eport.vict.com.vn/homepage/service-term",
              },
              {
                key: "confidentiality",
                href: "https://eport.vict.com.vn/homepage/confidential-policy",
              },
            ].map((item) => (
              <a
                key={item.key}
                href={item.href}
                className="flex items-center gap-3 hover:text-cyan-300 transition"
              >
                <FaPlayCircle className="text-cyan-500 text-xl" />
                {t(`contact.${item.key}`)}
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
