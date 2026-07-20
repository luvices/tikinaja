'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import type { Locale } from './index';

type Dictionary = any;

interface I18nContextType {
  lang: Locale;
  dict: Dictionary;
  t: (keyPath: string) => string;
}

const I18nContext = createContext<I18nContextType | null>(null);

export function I18nProvider({ lang, dict, children }: { lang: Locale; dict: Dictionary; children: ReactNode }) {
  const t = (keyPath: string): string => {
    const keys = keyPath.split('.');
    let result = dict;
    for (const key of keys) {
      if (result[key] === undefined) {
        return keyPath;
      }
      result = result[key];
    }
    return result as string;
  };

  return (
    <I18nContext.Provider value={{ lang, dict, t }}>
      <script
        id="i18n-global-dict"
        dangerouslySetInnerHTML={{
          __html: `
            window.__I18N_DICT__ = ${JSON.stringify(dict)};
            window.getTranslation = function(key) {
              const fallback = {
                  'status_processing': 'Processing...',
                  'status_loading_engine': 'Loading engine...',
                  'status_encoding': 'Encoding...',
                  'status_finalizing': 'Finalizing...',
                  'status_completed': 'Completed!',
                  'status_error': 'Error: ',
                  'interp_checking_gpu': 'Checking WebGPU...',
                  'interp_ready_gpu': 'WebGPU Ready',
                  'interp_failed_gpu': 'WebGPU Not Supported',
                  'upscale_checking_ai': 'Checking AI Engine...',
                  'upscale_checking_gpu': 'Checking GPU/WebGL...',
                  'upscale_checking_ffmpeg': 'Checking WebCodecs...',
                  'upscale_ready_gpu': 'GPU/WebGL Ready',
                  'upscale_failed_gpu': 'GPU/WebGL Not Supported',
                  'upscale_ready_ffmpeg': 'WebCodecs Ready',
                  'upscale_failed_ffmpeg': 'WebCodecs Not Supported',
                  'upscale_ready_ai': 'AI Engine Ready',
                  'upscale_failed_ai': 'AI Engine Failed',
                  'upscale_label_enhanced_ai': 'Enhanced (AI)',
                  'upscale_label_live_enhanced': 'Live Enhanced',
                  'upscale_label_original': 'Original',
                  'status_extracting_frames': 'Extracting frames...',
                  'status_empty_zip': 'Empty ZIP file',
                  'status_writing_frames': 'Writing frames...',
                  'status_writing_audio': 'Writing audio...',
                  'status_download_success': 'Ready to download',
                  'status_selected': 'Selected: '
              };
              
              if (window.__I18N_DICT__) {
                const parts = key.includes('.') ? key.split('.') : ['toolPages', key];
                let res = window.__I18N_DICT__;
                for (const p of parts) {
                  if (res && res[p] !== undefined) {
                    res = res[p];
                  } else {
                    res = undefined;
                    break;
                  }
                }
                if (res && typeof res === 'string') return res;
              }
              return fallback[key] || key;
            };
          `,
        }}
      />
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}
