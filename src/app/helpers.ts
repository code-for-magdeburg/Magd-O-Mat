import { Partei } from './model/Partei';


export function getParteiLogo(wahlSlug: string, partei: Partei): string {
  return `/assets/thesen-checks/${wahlSlug}/img/${partei.logo}`;
}


export function getPositionenDokument(wahlSlug: string): string {
  return `/assets/thesen-checks/${wahlSlug}/Alle_Positionen.pdf`;
}


export function getParteiHref(partei: Partei): string {
  return partei.internetadresse.startsWith('http://') || partei.internetadresse.startsWith('https://')
    ? partei.internetadresse
    : `http://${partei.internetadresse}`;
}
