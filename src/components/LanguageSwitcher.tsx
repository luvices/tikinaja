'use client';

import { useState, useRef, useEffect } from 'react';
import { useI18n } from '@/i18n/I18nProvider';
import { ChevronDown } from 'lucide-react';

const LANGUAGES = [
  { code: 'id', flag: 'id', name: 'ID' },
  { code: 'en', flag: 'gb', name: 'EN' },
  { code: 'de', flag: 'de', name: 'DE' }
] as const;

export function LanguageSwitcher() {
  const { lang } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const activeLang = LANGUAGES.find(l => l.code === lang) || LANGUAGES[0];

  const handleLanguageChange = (newLang: string) => {
    document.cookie = `lang=${newLang}; path=/; max-age=31536000`; // 1 year
    window.location.reload();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-flex items-center ml-2 sm:ml-4" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 h-8 px-3 rounded-full border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 text-xs font-medium text-neutral-600 dark:text-neutral-300 outline-none focus:ring-2 focus:ring-neutral-200 dark:focus:ring-neutral-700 transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800"
      >
        <img
          src={`https://flagcdn.com/16x12/${activeLang.flag}.png`}
          srcSet={`https://flagcdn.com/32x24/${activeLang.flag}.png 2x, https://flagcdn.com/48x36/${activeLang.flag}.png 3x`}
          width={16}
          height={12}
          alt={activeLang.name}
          className="rounded-[2px] object-cover"
        />
        <span>{activeLang.name}</span>
        <ChevronDown className={`h-3.5 w-3.5 text-neutral-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-1.5 w-24 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-background shadow-lg overflow-hidden z-50">
          <div className="p-1">
            {LANGUAGES.map((l) => (
              <button
                key={l.code}
                onClick={() => {
                  setIsOpen(false);
                  handleLanguageChange(l.code);
                }}
                className={`w-full flex items-center gap-2 px-2.5 py-2 text-xs font-medium rounded-lg transition-colors ${
                  lang === l.code 
                    ? 'bg-neutral-100 dark:bg-neutral-800 text-foreground' 
                    : 'text-neutral-500 hover:bg-neutral-50 dark:hover:bg-neutral-900 hover:text-foreground'
                }`}
              >
                <img
                  src={`https://flagcdn.com/16x12/${l.flag}.png`}
                  srcSet={`https://flagcdn.com/32x24/${l.flag}.png 2x, https://flagcdn.com/48x36/${l.flag}.png 3x`}
                  width={16}
                  height={12}
                  alt={l.name}
                  className="rounded-[2px] object-cover"
                />
                {l.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
