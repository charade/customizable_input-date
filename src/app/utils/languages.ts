import { CustomMap } from './struct-utils';

export enum Language {
  Fr = 1,
  En,
  Es,
}

export namespace Language {
  export const convertLocalToLang = new CustomMap<string, Language>([
    ['fr', Language.Fr],
    ['en', Language.En],
    ['es', Language.Es],
  ]);
}
