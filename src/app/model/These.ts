export type TheseWertung = 'ja' | 'neutral' | 'nein' | 'ohne';

export type These = {
  kategorie: string;
  text: string;
};

export type TheseEingabe = {
  these: These;
  wertung: TheseWertung;
  doppeltGewertet: boolean;
};
