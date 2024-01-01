import { TheseWertung } from './These';

export type ThesePartei = {
  wertung: TheseWertung;
  begruendung: string;
};

export type Partei = {
  nameKurz: string;
  nameLang: string;
  logo: string;
  beschreibung: string;
  internetadresse: string;
  thesen: ThesePartei[];
};
