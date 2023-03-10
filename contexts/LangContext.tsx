import type { FC, PropsWithChildren } from 'react';
import type { LangContextTypes } from '../types/contexts';
import { createContext, useState, useEffect } from 'react';

const initialState = {
  lang: 'fr',
  changeLang: (newLang: string) => {}
};

export const LangContext = createContext<LangContextTypes>(initialState);

export const LangContextProvider: FC<PropsWithChildren> = ({ children }) => {

  const [lang, setLang] = useState<string>('fr');

  useEffect(() => {
    // The favorite lang is saved in local storage
    const previousLang = localStorage.getItem('lang');

    // Update the state in terms of previous lang
    if(previousLang) {
      setLang(previousLang);
      localStorage.setItem('lang', previousLang);
    };
  }, []);

  const changeLang = (newLang: string) => {
    // When user change the lang, in Params component,
    // we update the state and save it in local storage
    setLang(newLang);
    localStorage.setItem('lang', newLang);
  };

  return (
    <LangContext.Provider value={{ lang, changeLang }}>
      {children}
    </LangContext.Provider>
  );
};