import React from 'react';
import { Heart, Github, Mail } from 'lucide-react';
import SITE_CONFIG from '../../config/settings';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-sakura-50 to-sakura-100 border-t border-sakura-200 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-3xl">{SITE_CONFIG.logo.icon}</span>
              <h3 className="text-xl font-bold font-serif">
                <span className="text-sakura-600">{SITE_CONFIG.logo.highlight}</span>
                <span className="text-gray-800">
                  {SITE_CONFIG.logo.text.replace(SITE_CONFIG.logo.highlight, '')}
                </span>
              </h3>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              {SITE_CONFIG.siteDescription}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-600 hover:text-sakura-600 text-sm transition-colors">
                  Tentang Kami
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-sakura-600 text-sm transition-colors">
                  Kebijakan Privasi
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-sakura-600 text-sm transition-colors">
                  Syarat & Ketentuan
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-sakura-600 text-sm transition-colors">
                  Kontak
                </a>
              </li>
            </ul>
          </div>

          {/* Social & Info */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-4">Connect</h4>
            <div className="flex gap-3 mb-4">
              {SITE_CONFIG.social.github && (
                <a 
                  href={SITE_CONFIG.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white rounded-full hover:bg-sakura-100 transition-colors shadow-sm"
                >
                  <Github className="w-5 h-5 text-gray-700" />
                </a>
              )}
              <a 
                href="mailto:contact@sakuranovel.com"
                className="p-2 bg-white rounded-full hover:bg-sakura-100 transition-colors shadow-sm"
              >
                <Mail className="w-5 h-5 text-gray-700" />
              </a>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed">
              Baca light novel terjemahan favoritmu dengan pengalaman membaca terbaik. 
              Gratis dan mudah diakses.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-sakura-200 mt-8 pt-6 text-center">
          <p className="text-sm text-gray-600 flex items-center justify-center gap-2">
            Made with <Heart className="w-4 h-4 text-sakura-500 fill-current animate-pulse" /> 
            by {SITE_CONFIG.siteName} Team
          </p>
          <p className="text-xs text-gray-500 mt-2">
            © {new Date().getFullYear()} {SITE_CONFIG.siteName}. All rights reserved.
          </p>
          <p className="text-xs text-gray-400 mt-2">
            API by <a href="https://www.sankavollerei.com" target="_blank" rel="noopener noreferrer" className="text-sakura-600 hover:underline">Sanka Vollerei</a>
          </p>
        </div>
      </div>

      {/* Decorative Petals */}
      <div className="absolute bottom-0 left-0 text-6xl opacity-10 pointer-events-none">
        🌸
      </div>
      <div className="absolute bottom-10 right-10 text-4xl opacity-10 pointer-events-none">
        🌸
      </div>
    </footer>
  );
};

export default Footer;
