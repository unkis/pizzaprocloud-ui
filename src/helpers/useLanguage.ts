import { useContext, createContext } from 'react';

interface LanguageCtxType {
  [key: string]: string
}

export const LanguageCtx = createContext({} as LanguageCtxType);

const useLanguage = (...args: string[]) => {
  const langCtx = useContext(LanguageCtx);
  return args.map((key: string) => langCtx[key]);
};

export default useLanguage;
