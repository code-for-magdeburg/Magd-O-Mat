export type TheseWertung = 'ja' | 'neutral' | 'nein' | 'ohne';

export type These = {
  kategorie: string;
  text: string;
  infos: Info[];
};

export type Info = {
  titel: string;
  quelle: string;
  link: string;
};

export type TheseEingabe = {
  these: These;
  wertung: TheseWertung;
  doppeltGewertet: boolean;
};
