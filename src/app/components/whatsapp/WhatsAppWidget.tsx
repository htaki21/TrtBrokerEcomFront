"use client";

import { useEffect, useState } from "react";

const WhatsAppWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Moroccan phone number with country code
  const phoneNumber = "212727931789"; // +212 is Morocco's country code

  // Customer message in French for insurance inquiry
  const message =
    "Bonjour, j'aimerais avoir des informations sur vos offres d'assurance. Pouvez-vous m'aider ?";

  // WhatsApp URL with pre-filled message
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  // Show widget after page load for smooth entrance
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleWhatsAppClick = () => {
    window.open(whatsappUrl, "_blank");
    setIsOpen(false); // Close popup after redirecting
  };

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`fixed bottom-20 md:bottom-6 right-6 z-50 transition-all duration-700 ease-out transform ${
        isVisible
          ? "translate-y-0 opacity-100 scale-100"
          : "translate-y-8 opacity-0 scale-95"
      }`}
    >
      {/* Chat Popup */}
      {isOpen && (
        <div className="absolute bottom-20 right-2 bg-white rounded-xl shadow-2xl border border-gray-200 w-80 max-w-[88vw] animate-fadeInUp backdrop-blur-sm">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#25370b] to-[#739a38] text-white p-4 rounded-t-xl flex items-center justify-between relative overflow-hidden">
            {/* Subtle background pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-20"></div>
            <div className="flex items-center gap-3 relative z-10">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg animate-pulse">
                {/* WhatsApp Logo - Original Green */}
                <svg
                  className="w-6 h-6 text-[#25D366]"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.516" />
                </svg>
              </div>
              <div className="animate-slideInLeft">
                <h3 className="font-semibold text-sm">TRT BROKER</h3>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <p className="text-xs opacity-90">En ligne maintenant</p>
                </div>
              </div>
            </div>
            <button
              onClick={togglePopup}
              className="text-white hover:bg-white/20 rounded-full p-2 transition-all duration-300 hover:scale-110 relative z-10 group"
              aria-label="Fermer le popup WhatsApp"
            >
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:rotate-90"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>

          {/* Message Body */}
          <div className="p-5">
            <div className="bg-gradient-to-br from-[#e2efce] to-[#f8fcf3] rounded-xl p-4 mb-4 border-l-4 border-[#739a38] animate-slideInRight">
              <p className="text-sm text-[#25370b] mb-3 font-medium">
                👋 Bonjour ! Comment puis-je vous aider ?
              </p>
              <p className="text-xs text-[#545454] leading-relaxed mb-3">
                Cliquez sur le bouton ci-dessous pour commencer une conversation
                WhatsApp avec notre équipe d&apos;experts.
              </p>
              <p className="text-xs text-[#739a38] font-medium">
                ⚡ Réponse rapide garantie
              </p>
            </div>

            {/* Additional info section */}
            <div className="mb-4 text-center">
              <p className="text-xs text-gray-500 mb-2">Disponible :</p>
              <div className="flex justify-center gap-4 text-xs text-gray-600">
                <span>📞 Lun-Ven: 9h-18h</span>
                <span>💬 24h/7j</span>
              </div>
            </div>

            <button
              onClick={handleWhatsAppClick}
              className="w-full bg-gradient-to-r from-[#25370b] to-[#739a38] hover:from-[#739a38] hover:to-[#25370b] text-white py-3.5 px-4 rounded-xl flex items-center justify-center gap-3 transition-all duration-500 font-medium shadow-lg hover:shadow-xl transform hover:scale-105 group relative overflow-hidden"
              aria-label="Ouvrir WhatsApp pour contacter TRT Broker"
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
              {/* WhatsApp Logo - Original Green */}
              <svg
                className="w-5 h-5 text-[#25D366] relative z-10 group-hover:scale-110 transition-transform duration-300"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.516" />
              </svg>
              <span className="relative z-10">Démarrer la conversation</span>
            </button>
          </div>
        </div>
      )}

      {/* Tooltip when hovering over the button */}
      {isHovered && !isOpen && (
        <div className="absolute bottom-full right-0 mb-3 bg-[#25370b] text-white text-sm px-4 py-2 rounded-lg shadow-xl whitespace-nowrap animate-fadeIn">
          Contactez-nous sur WhatsApp
          <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-[#25370b]"></div>
        </div>
      )}

      {/* Floating Animation Ring */}
      {isVisible && (
        <div className="absolute inset-0 bg-[#25D366] rounded-full animate-ping opacity-20"></div>
      )}

      {/* WhatsApp Button */}
      <button
        onClick={togglePopup}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative bg-gradient-to-br from-[#25D366] to-[#128C7E] hover:from-[#128C7E] hover:to-[#25D366] text-white p-4 rounded-full shadow-2xl transition-all duration-500 hover:scale-115 flex items-center justify-center group border-4 border-white"
        aria-label="Ouvrir le chat WhatsApp"
      >
        {/* Pulse effect on hover */}
        <div className="absolute inset-0 bg-white rounded-full opacity-0 group-hover:opacity-20 group-hover:scale-150 transition-all duration-500"></div>
        {/* WhatsApp Icon SVG - Relative positioned for animations */}
        <svg
          className="w-8 h-8 relative z-10 group-hover:scale-110 transition-transform duration-300"
          fill="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.516" />
        </svg>
      </button>
    </div>
  );
};

export default WhatsAppWidget;
