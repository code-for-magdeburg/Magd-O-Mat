export type TheseWertung = 'ja' | 'neutral' | 'nein' | 'ohne';

export type These = {
  id: number;
  kategorie: string;
  text: string;
};

export type TheseEingabe = {
  wertung: TheseWertung;
  doppeltGewertet: boolean;
};
