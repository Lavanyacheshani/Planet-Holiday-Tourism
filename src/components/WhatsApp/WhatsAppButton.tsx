import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

const WhatsAppButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const whatsappNumber = '+94771234567'; // Replace with actual WhatsApp number
  const defaultMessage = 'Hello! I\'m interested in your Sri Lanka tour packages. Can you help me?';

  const openWhatsApp = () => {
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(defaultMessage)}`;
    window.open(url, '_blank');
  };

  return (
    <>
      {/* WhatsApp Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-2xl hover:scale-110 transition-all duration-300 animate-float"
        >
          {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
        </button>
      </div>

      {/* WhatsApp Chat Widget */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-40 bg-white rounded-2xl shadow-2xl w-80 max-w-[calc(100vw-3rem)] animate-scale-in">
          <div className="bg-green-500 text-white p-4 rounded-t-2xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold">Planet Holiday Support</h4>
                <p className="text-sm opacity-90">Typically replies instantly</p>
              </div>
            </div>
          </div>
          <div className="p-4">
            <div className="bg-gray-100 rounded-lg p-3 mb-4">
              <p className="text-sm text-gray-700">
                Hi there! 👋 Ready to explore Sri Lanka? Ask us anything about our tours and packages!
              </p>
            </div>
            <button
              onClick={openWhatsApp}
              className="w-full bg-green-500 text-white py-3 rounded-lg font-medium hover:bg-green-600 transition-colors duration-300 flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              Start Conversation
            </button>
          </div>
        </div>
      )}

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default WhatsAppButton;