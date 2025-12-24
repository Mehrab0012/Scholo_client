
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white pt-20 pb-10 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1 space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 text-primary">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 3L1 9L12 15L21 10.09V17H23V9M5 13.18V17.18L12 21L19 17.18V13.18L12 17L5 13.18Z" /></svg>
              </div>
              <span className="text-xl font-bold">ScholarStream</span>
            </div>
            <p className="text-slate-400 text-sm font-medium leading-relaxed">
              Empowering students to reach their full potential through accessible funding and education tools.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-6">Platform</h4>
            <ul className="space-y-4 text-slate-400 text-sm font-medium">
              <li><a href="#" className="hover:text-primary transition-colors">Browse Grants</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Essay Helper</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Deadlines</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Success Kit</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6">Company</h4>
            <ul className="space-y-4 text-slate-400 text-sm font-medium">
              <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Privacy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Terms</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6">Join Newsletter</h4>
            <div className="flex gap-2 mb-4">
              <input 
                type="email" 
                placeholder="email@address.com" 
                className="bg-slate-800 border-none rounded-lg px-4 py-2 text-sm w-full focus:ring-1 focus:ring-primary"
              />
              <button className="bg-primary hover:bg-primary-dark p-2 rounded-lg transition-colors">
                <span className="material-symbols-outlined text-sm">send</span>
              </button>
            </div>
            <p className="text-xs text-slate-500">Weekly updates on new grants.</p>
          </div>
        </div>

        <div className="pt-10 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-500 text-xs font-medium">© 2024 ScholarStream Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="text-slate-500 hover:text-white transition-colors"><span className="material-symbols-outlined text-xl">share</span></a>
            <a href="#" className="text-slate-500 hover:text-white transition-colors"><span className="material-symbols-outlined text-xl">person_add</span></a>
            <a href="#" className="text-slate-500 hover:text-white transition-colors"><span className="material-symbols-outlined text-xl">rss_feed</span></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;