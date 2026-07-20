import 'server-only';
import { cookies } from 'next/headers';

const dictionaries = {
  en: () => import('@/dictionaries/en.json').then((module) => module.default),
  id: () => import('@/dictionaries/id.json').then((module) => module.default),
  de: () => import('@/dictionaries/de.json').then((module) => module.default),
};

export type Locale = keyof typeof dictionaries;

export const getDictionary = async (locale: Locale) => {
  return dictionaries[locale]?.() ?? dictionaries.id();
};

export const getLocale = async (): Promise<Locale> => {
  const cookieStore = await cookies();
  const lang = cookieStore.get('lang')?.value as Locale | undefined;
  if (lang && dictionaries[lang]) {
    return lang;
  }
  return 'id'; // default to ID
};

export const getTranslations = async () => {
  const lang = await getLocale();
  const dict = await getDictionary(lang);
  return (keyPath: string): string => {
    const keys = keyPath.split('.');
    let result: any = dict;
    for (const key of keys) {
      if (result[key] === undefined) return keyPath;
      result = result[key];
    }
    return result as string;
  };
};
