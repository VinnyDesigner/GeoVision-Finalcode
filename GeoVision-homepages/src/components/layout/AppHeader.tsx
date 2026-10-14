import React, { useState, useRef, useEffect } from 'react';
import { useAppState } from '../../context/AppStateContext';
import { getAssetUrl } from '../../utils/assetUtils';
import { ensureAbuDhabiLocation } from '../../utils/locationUtils';
import { FeedbackStarIcon } from '../common/FeedbackStarIcon';
import {
  Globe,
  Sun,
  Moon,
  User as UserIcon,
  LogOut,
  HelpCircle,
  Info,
  Map,
  Home,
  ChevronDown,
  Menu,
  X,
} from 'lucide-react';

export const AppHeader: React.FC = () => {
  const {
    language,
    setLanguage,
    theme,
    setTheme,
    currentView,
    setCurrentView,
    userLocation,
    setMapCenterAndZoom,
    user,
    setUser,
    setLoginModalOpen,
    setFeedbackModalOpen,
    t,
  } = useAppState();

  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const userDropdownRef = useRef<HTMLDivElement>(null);

  // Auto-close user dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target as Node)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavClick = (view: any) => {
    if (view === 'map' && userLocation) {
      const validLoc = ensureAbuDhabiLocation(userLocation[0], userLocation[1]);
      setMapCenterAndZoom(validLoc, 14);
    }
    setCurrentView(view);
    setUserDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
    setUserDropdownOpen(false);
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
    setUserDropdownOpen(false);
  };

  const handleLogout = () => {
    setUser({
      id: 'guest-1',
      username: 'guest',
      email: '',
      name: 'Guest User',
      isGuest: true,
    });
    setUserDropdownOpen(false);
  };

  return (
    <div className="fixed top-2 sm:top-3 left-3 sm:left-4 right-3 sm:right-4 z-[500]">
      <header className="relative w-full h-[56px] sm:h-[62px] glass-level-2 rounded-2xl px-3 sm:px-6 flex items-center justify-between shadow-xl border border-white/80 dark:border-white/10">
        
        {/* Left: Department of Government Enablement Logo */}
        <div className="flex items-center cursor-pointer shrink-0 pr-0.5 sm:pr-1" onClick={() => handleNavClick('home')}>
          <img
            src={getAssetUrl(theme === 'dark' ? 'assets/logos/dge-logo-dark.png' : 'assets/logos/dge-logo.png')}
            alt="Department of Government Enablement"
            className="h-4.5 min-[360px]:h-5 sm:h-7 lg:h-8.5 max-w-[65px] min-[360px]:max-w-[80px] sm:max-w-[130px] lg:max-w-none object-contain shrink-0 transition-transform hover:scale-105"
          />
        </div>

        {/* Center: Desktop Navigation Bar (Visible on lg screens >= 1024px) */}
        <nav className="hidden lg:flex items-center gap-1 glass-level-1 p-1 rounded-xl shrink-0 whitespace-nowrap">
          <button
            onClick={() => handleNavClick('home')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap shrink-0 transition-all ${
              currentView === 'home'
                ? 'bg-[#215A9E]/15 text-[#215A9E] dark:bg-white/15 dark:text-white font-extrabold shadow-2xs'
                : 'text-slate-600 hover:text-[#063360] dark:text-slate-200 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-800'
            }`}
          >
            <Home className="w-3.5 h-3.5 shrink-0" />
            <span className="whitespace-nowrap">{t('nav.home')}</span>
          </button>

          <button
            onClick={() => handleNavClick('map')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap shrink-0 transition-all ${
              currentView === 'map'
                ? 'bg-[#215A9E]/15 text-[#215A9E] dark:bg-white/15 dark:text-white font-extrabold shadow-2xs'
                : 'text-slate-600 hover:text-[#063360] dark:text-slate-200 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-800'
            }`}
          >
            <Map className="w-3.5 h-3.5 shrink-0" />
            <span className="whitespace-nowrap">{t('nav.exploreMap')}</span>
          </button>

          <button
            onClick={() => handleNavClick('about')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap shrink-0 transition-all ${
              currentView === 'about'
                ? 'bg-[#215A9E]/15 text-[#215A9E] dark:bg-white/15 dark:text-white font-extrabold shadow-2xs'
                : 'text-slate-600 hover:text-[#063360] dark:text-slate-200 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-800'
            }`}
          >
            <Info className="w-3.5 h-3.5 shrink-0" />
            <span className="whitespace-nowrap">{t('nav.about')}</span>
          </button>
        </nav>

        {/* Right: Action Controls + Far-Right Abu Dhabi Spatial Data Logo */}
        <div className="flex items-center gap-0.5 min-[360px]:gap-1 sm:gap-2 shrink-0">
          
          {/* Mobile/Tablet Hamburger Navigation Button (Visible on screens < lg) */}
          <button
            onClick={() => {
              setMobileMenuOpen(!mobileMenuOpen);
              setUserDropdownOpen(false);
            }}
            className="lg:hidden p-1 min-[360px]:p-1.5 sm:p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-white/60 dark:hover:bg-slate-800 transition-colors glass-level-1 cursor-pointer shrink-0"
            title="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-geovision-blue dark:text-white" /> : <Menu className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-geovision-blue dark:text-white" />}
          </button>

          {/* Language Switcher */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1 px-1.5 min-[360px]:px-2 sm:px-3 py-1 sm:py-1.5 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-100 border border-white/60 dark:border-slate-700 hover:border-geovision-blue hover:text-geovision-blue dark:hover:text-white transition-all glass-level-1 shrink-0 whitespace-nowrap"
            title="Switch Language"
          >
            <Globe className="w-3.5 h-3.5 text-geovision-blue dark:text-white shrink-0" />
            <span className="hidden sm:inline text-[11px] sm:text-xs whitespace-nowrap">{t('nav.language')}</span>
            <span className="sm:hidden text-[10px] font-black uppercase text-geovision-blue dark:text-white">{language === 'en' ? 'AR' : 'EN'}</span>
          </button>

          {/* Theme Switcher */}
          <button
            onClick={toggleTheme}
            className="p-1 min-[360px]:p-1.5 sm:p-2 rounded-xl text-slate-600 dark:text-slate-200 hover:bg-white/60 dark:hover:bg-slate-800 transition-colors glass-level-1 cursor-pointer shrink-0"
            title="Toggle Light/Dark Theme"
          >
            {theme === 'light' ? <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-geovision-blue dark:text-white" /> : <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-geovision-blue dark:text-white" />}
          </button>

          {/* Help Icon Button */}
          <button
            onClick={() => handleNavClick('help')}
            className={`hidden md:flex p-1.5 sm:p-2 rounded-xl transition-colors glass-level-1 cursor-pointer shrink-0 ${
              currentView === 'help'
                ? 'bg-[#215A9E]/15 text-geovision-blue dark:bg-white/15 dark:text-white font-extrabold ring-1 ring-geovision-blue/30'
                : 'text-slate-600 dark:text-slate-200 hover:bg-white/60 dark:hover:bg-slate-800 hover:text-geovision-blue dark:hover:text-white'
            }`}
            title={t('nav.help')}
          >
            <HelpCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-geovision-blue dark:text-white" />
          </button>

          {/* Feedback Icon Button */}
          <button
            onClick={() => {
              setFeedbackModalOpen(true);
              setUserDropdownOpen(false);
            }}
            className="hidden md:flex p-1.5 sm:p-2 rounded-xl text-slate-600 dark:text-slate-200 hover:bg-white/60 dark:hover:bg-slate-800 hover:text-geovision-blue dark:hover:text-white transition-colors glass-level-1 cursor-pointer shrink-0"
            title={t('nav.feedback')}
          >
            <FeedbackStarIcon className="w-4 h-4 text-geovision-blue dark:text-white" />
          </button>

          {/* User Account / Guest Controls */}
          {user.isGuest ? (
            <button
              onClick={() => {
                setLoginModalOpen(true);
                setUserDropdownOpen(false);
              }}
              className="flex items-center gap-1 sm:gap-2 px-2 min-[360px]:px-2.5 sm:px-4 py-1 sm:py-2 rounded-xl text-xs font-bold bg-geovision-blue text-white hover:bg-blue-600 shadow-md shadow-blue-500/25 transition-all shrink-0 cursor-pointer whitespace-nowrap"
            >
              <UserIcon className="w-3.5 h-3.5 shrink-0" />
              <span className="hidden sm:inline whitespace-nowrap">{t('nav.signIn')}</span>
            </button>
          ) : (
            <div className="relative shrink-0" ref={userDropdownRef}>
              <button
                onClick={() => {
                  setUserDropdownOpen(!userDropdownOpen);
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-1 sm:gap-2 p-1 min-[360px]:px-2 sm:px-3 py-1 sm:py-1.5 rounded-xl border border-white/60 dark:border-slate-700 hover:bg-white/60 dark:hover:bg-slate-800 transition-colors glass-level-1 cursor-pointer"
                title={user.name}
              >
                <div className="w-5.5 h-5.5 sm:w-7 sm:h-7 rounded-full bg-geovision-blue text-white font-bold flex items-center justify-center text-[10px] sm:text-xs shadow-sm">
                  {user.name.charAt(0)}
                </div>
                <span className="hidden sm:inline text-xs font-bold text-slate-800 dark:text-slate-200 max-w-[80px] sm:max-w-[100px] truncate">
                  {user.name}
                </span>
                <ChevronDown className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-slate-400 hidden sm:inline" />
              </button>
            </div>
          )}

          {/* Far Right: Abu Dhabi Spatial Data Logo */}
          <div className="flex items-center gap-0.5 sm:gap-2 pl-0.5 sm:pl-1.5 pr-1 sm:pr-3 shrink-0 cursor-pointer" onClick={() => handleNavClick('home')}>
            <div className="w-px h-3.5 sm:h-5 bg-slate-300/80 dark:bg-slate-700/80 shrink-0" />
            <img
              src={getAssetUrl(theme === 'dark' ? 'assets/logos/spatial-data-logo-dark.png' : 'assets/logos/spatial-data-logo.png')}
              alt="Abu Dhabi Spatial Data"
              className="h-3.5 min-[360px]:h-4.5 sm:h-5.5 lg:h-6.5 max-w-[45px] min-[360px]:max-w-[60px] sm:max-w-[95px] lg:max-w-[130px] object-contain shrink-0 transition-transform hover:scale-105"
            />
          </div>
        </div>

      </header>

      {/* User Profile Dropdown Menu — Right-aligned to header bar */}
      {userDropdownOpen && (
        <div className="absolute top-[calc(100%+8px)] right-0 w-60 sm:w-64 max-w-[calc(100vw-2rem)] bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl rounded-2xl p-2.5 shadow-2xl border border-slate-200/90 dark:border-slate-800 z-[999] overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="px-3.5 py-2.5 bg-blue-50/80 dark:bg-slate-800/90 rounded-xl border border-blue-100 dark:border-slate-700 mb-1.5">
            <p className="text-xs font-black text-slate-900 dark:text-white truncate">
              {user.name}
            </p>
            <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 truncate mt-0.5">
              {user.email || 'admin@fea.local'}
            </p>
          </div>

          <div className="space-y-0.5">
            <button
              onClick={() => {
                setCurrentView('profile');
                setUserDropdownOpen(false);
              }}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-extrabold text-slate-800 dark:text-slate-100 hover:bg-blue-50 dark:hover:bg-slate-800 hover:text-geovision-blue dark:hover:text-blue-300 transition-all cursor-pointer group"
            >
              <UserIcon className="w-4 h-4 text-slate-400 group-hover:text-geovision-blue dark:group-hover:text-blue-300 shrink-0" />
              <span>{t('nav.profile')}</span>
            </button>

            <div className="border-t border-slate-100 dark:border-slate-800 my-1" />

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-extrabold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-all cursor-pointer group"
            >
              <LogOut className="w-4 h-4 text-rose-500 shrink-0" />
              <span>{t('nav.logout')}</span>
            </button>
          </div>
        </div>
      )}

      {/* Mobile/Tablet Navigation Dropdown Drawer — Outside header to avoid clipping, compact right-aligned popover */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-[calc(100%+8px)] right-0 w-56 sm:w-64 max-w-[calc(100vw-2rem)] bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl rounded-2xl p-2.5 shadow-2xl border border-slate-200/90 dark:border-slate-800 space-y-1 z-[900] animate-in fade-in slide-in-from-top-2 duration-150">
          <button
            onClick={() => handleNavClick('home')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
              currentView === 'home' ? 'bg-geovision-blue text-white shadow-md' : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Home className="w-4 h-4" />
            <span>{t('nav.home')}</span>
          </button>

          <button
            onClick={() => handleNavClick('map')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
              currentView === 'map' ? 'bg-geovision-blue text-white shadow-md' : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Map className="w-4 h-4" />
            <span>{t('nav.exploreMap')}</span>
          </button>

          <button
            onClick={() => handleNavClick('about')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
              currentView === 'about' ? 'bg-geovision-blue text-white shadow-md' : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Info className="w-4 h-4" />
            <span>{t('nav.about')}</span>
          </button>

          <button
            onClick={() => handleNavClick('help')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
              currentView === 'help' ? 'bg-geovision-blue text-white shadow-md' : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>{t('nav.help')}</span>
          </button>

          <button
            onClick={() => { setFeedbackModalOpen(true); setMobileMenuOpen(false); }}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <FeedbackStarIcon className="w-4 h-4 text-geovision-blue dark:text-white" />
            <span>{t('nav.feedback')}</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default AppHeader;
