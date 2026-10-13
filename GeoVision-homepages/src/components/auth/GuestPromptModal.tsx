import React from 'react';
import { useAppState } from '../../context/AppStateContext';
import { getAssetUrl } from '../../utils/assetUtils';
import { X, UserCheck } from 'lucide-react';

export const GuestPromptModal: React.FC = () => {
  const { guestPromptOpen, setGuestPromptOpen, setLoginModalOpen, language, theme } = useAppState();

  if (!guestPromptOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-7 shadow-2xl border border-slate-200/90 dark:border-slate-800 text-center space-y-5 overflow-hidden">
        
        {/* Close Button — High Visibility Top-Right Badge */}
        <button
          type="button"
          onClick={() => setGuestPromptOpen(false)}
          className="absolute top-3.5 right-3.5 rtl:right-auto rtl:left-3.5 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white flex items-center justify-center border border-slate-200/80 dark:border-slate-700 shadow-xs transition-all cursor-pointer"
          aria-label="Close"
        >
          <X className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2.5]" />
        </button>

        {/* Modal Top Header Row featuring both official logos */}
        <div className="flex items-center justify-center gap-2.5 sm:gap-3 border-b border-slate-200/80 dark:border-slate-800 pb-3.5 pt-1 pr-10 rtl:pl-10 rtl:pr-0">
          <img
            src={getAssetUrl(theme === 'dark' ? 'assets/logos/dge-logo-dark.png' : 'assets/logos/dge-logo.png')}
            alt="Department of Government Enablement"
            className="h-6 xs:h-7 sm:h-8 max-w-[120px] xs:max-w-[135px] sm:max-w-[150px] object-contain shrink-0"
          />
          <div className="w-px h-5 sm:h-6 bg-slate-200 dark:bg-slate-700 shrink-0" />
          <img
            src={getAssetUrl(theme === 'dark' ? 'assets/logos/spatial-data-logo-dark.png' : 'assets/logos/spatial-data-logo.png')}
            alt="Abu Dhabi Spatial Data"
            className="h-5.5 xs:h-6.5 sm:h-7 max-w-[110px] xs:max-w-[125px] sm:max-w-[140px] object-contain shrink-0"
          />
        </div>

        {/* Title & Subtitle */}
        <div className="space-y-3 text-center">
          <h2 className="text-xl font-black text-slate-900 dark:text-white">
            {language === 'ar' ? 'قم بإنشاء حساب للحفظ' : 'Create an Account to Save'}
          </h2>

          <div className="p-3 rounded-2xl bg-blue-50/80 dark:bg-slate-800/80 border border-blue-200/60 dark:border-slate-700 text-left rtl:text-right space-y-1.5 text-xs font-bold text-slate-700 dark:text-slate-200">
            <p className="text-[11px] font-black text-geovision-blue dark:text-blue-300">
              {language === 'ar' ? 'عند تسجيل الدخول يمكنك حفظ:' : 'Create an account to save:'}
            </p>
            <div className="space-y-1 text-slate-800 dark:text-slate-100 font-extrabold">
              <p>✓ {language === 'ar' ? 'المواقع المفضلة' : 'Favourite locations'}</p>
              <p>✓ {language === 'ar' ? 'سجل البحث' : 'Search history'}</p>
              <p>✓ {language === 'ar' ? 'محادثات الذكاء الاصطناعي المكانية' : 'Saved AI conversations'}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2.5 pt-2">
          <button
            onClick={() => {
              setGuestPromptOpen(false);
              setLoginModalOpen(true);
            }}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-geovision-blue text-white text-xs font-black hover:bg-blue-600 shadow-xl shadow-blue-500/30 transition-all cursor-pointer"
          >
            <UserCheck className="w-4 h-4" />
            <span>{language === 'ar' ? 'تسجيل الدخول / إنشاء حساب' : 'Sign In / Register Account'}</span>
          </button>

          <button
            onClick={() => setGuestPromptOpen(false)}
            className="w-full py-2.5 rounded-xl border border-white/70 dark:border-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors glass-level-1 cursor-pointer"
          >
            {language === 'ar' ? 'المتابعة كزائر' : 'Continue as Guest'}
          </button>
        </div>

      </div>
    </div>
  );
};

export default GuestPromptModal;
