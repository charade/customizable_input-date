import { CustomMap } from './struct-utils';

export enum Language {
  En = 1,
  Fr,
  Es,
}

export namespace Language {
  export const convertLocalToLang = new CustomMap<string, Language>([
    ['fr', Language.Fr],
    ['en', Language.En],
    ['es', Language.Es],
  ]);

  export const convertToLocale = new CustomMap<Language, string>([
    [Language.Fr, 'fr'],
    [Language.En, 'en'],
    [Language.Es, 'es'],
  ]);
  const supportedLanguages = [Language.En, Language.Fr, Language.Es];

  const langSettingsKey = 'input.date.settings.lang.';
  const translate = new CustomMap<Language, string>([
    [Language.Fr, langSettingsKey + 'fr'],
    [Language.En, langSettingsKey + 'en'],
    [Language.Es, langSettingsKey + 'es'],
  ]);

  export const settings = supportedLanguages.map((supportedLanguage) => ({
    value: supportedLanguage,
    label: translate.value(supportedLanguage),
  }));
}
