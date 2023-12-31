import { TheseWertung } from './These';

export type Partei = {
  id: number;
  nameKurz: string;
  nameLang: string;
  logo: string;
  beschreibung: string;
  internetadresse: string;
  thesen: TheseWertung[];
};
