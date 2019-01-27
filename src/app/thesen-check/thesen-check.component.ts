import { Component, OnInit, TemplateRef } from '@angular/core';
import * as _ from 'lodash';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ParteiDetailsComponent } from '../partei-details/partei-details.component';
import { TheseDetailsComponent } from '../these-details/these-details.component';


@Component({
    selector: 'app-thesen-check',
    templateUrl: './thesen-check.component.html',
    styleUrls: ['./thesen-check.component.css']
})
export class ThesenCheckComponent implements OnInit {


    modus = 'Eingabe';

    thesen = [];
    parteien = [];
    ergebnisseThesen = [];
    ergebnisseParteien = [];

    aktuelleTheseIndex = -1;
    aktuelleThese = null;

    modalRef: BsModalRef;


    constructor(private modalService: BsModalService) {
    }


    ngOnInit() {
        this.neustart();
    }


    waehleThese(index: number) {
        this.aktuelleTheseIndex = index;
        this.aktuelleThese = this.thesen[this.aktuelleTheseIndex];
    }


    stimmeJa() {
        this.aktuelleThese.wertung = 'ja';
        this.aktuelleThese.nichtGewertet = false;
        this.naechsteTheseOderAuswertung();
    }


    stimmeEgal() {
        this.aktuelleThese.wertung = 'neutral';
        this.aktuelleThese.nichtGewertet = false;
        this.naechsteTheseOderAuswertung();
    }


    stimmeNein() {
        this.aktuelleThese.wertung = 'nein';
        this.aktuelleThese.nichtGewertet = false;
        this.naechsteTheseOderAuswertung();
    }


    ueberspringen() {
        this.aktuelleThese.wertung = 'ohne';
        this.aktuelleThese.nichtGewertet = true;
        this.naechsteTheseOderAuswertung();
    }


    zurueck() {

        if (this.aktuelleTheseIndex > 0) {
            this.waehleThese(this.aktuelleTheseIndex - 1);
        }

    }


    neustart() {
        this.modus = 'Eingabe';
        this.ladeThesen();
        this.ladeParteien();
        this.waehleThese(0);
    }


    zeigePartei(partei: any) {
        this.modalRef = this.modalService.show(ParteiDetailsComponent, { initialState: { partei }});
    }


    zeigeThese(these: any) {
        this.modalRef = this.modalService.show(TheseDetailsComponent, { initialState: { these, anzahlThesen: this.thesen.length, parteien: this.parteien }});
    }


    private ladeThesen() {

        this.thesen = [
            {
                id: 0,
                kategorie: '',
                text: 'Bei der Terrorismusbekämpfung soll die Bundeswehr im Inland eingesetzt werden dürfen.',
                doppeltGewertet: false,
                nichtGewertet: true,
                wertung: 'ohne'
            },
            {
                id: 1,
                kategorie: '',
                text: 'Dieselkraftstoff für Pkw soll höher besteuert werden.',
                doppeltGewertet: false,
                nichtGewertet: true,
                wertung: 'ohne'
            },
            {
                id: 2,
                kategorie: '',
                text: 'Für die Aufnahme von neuen Asylsuchenden soll eine jährliche Obergrenze gelten.',
                doppeltGewertet: false,
                nichtGewertet: true,
                wertung: 'ohne'
            },
            {
                id: 3,
                kategorie: '',
                text: 'Der Ausbau erneuerbarer Energien soll vom Bund dauerhaft finanziell gefördert werden.',
                doppeltGewertet: false,
                nichtGewertet: true,
                wertung: 'ohne'
            },
            {
                id: 4,
                kategorie: '',
                text: 'Der Bund soll mehr Mittel für den sozialen Wohnungsbau bereitstellen.',
                doppeltGewertet: false,
                nichtGewertet: true,
                wertung: 'ohne'
            },
            {
                id: 5,
                kategorie: '',
                text: 'BAföG soll generell unabhängig vom Einkommen der Eltern gezahlt werden.',
                doppeltGewertet: false,
                nichtGewertet: true,
                wertung: 'ohne'
            },
            {
                id: 6,
                kategorie: '',
                text: 'Die Videoüberwachung im öffentlichen Raum soll ausgeweitet werden.',
                doppeltGewertet: false,
                nichtGewertet: true,
                wertung: 'ohne'
            },
            {
                id: 7,
                kategorie: '',
                text: 'Deutschland soll einem Schuldenschnitt für Griechenland zustimmen.',
                doppeltGewertet: false,
                nichtGewertet: true,
                wertung: 'ohne'
            },
/*
            {
                id: 8,
                kategorie: '',
                text: 'Generelles Tempolimit auf Autobahnen!',
                doppeltGewertet: false,
                nichtGewertet: true,
                wertung: 'ohne'
            },
            {
                id: 9,
                kategorie: '',
                text: 'Die Verteidigungsausgaben Deutschlands sollen erhöht werden.',
                doppeltGewertet: false,
                nichtGewertet: true,
                wertung: 'ohne'
            },
            {
                id: 10,
                kategorie: '',
                text: 'Betreiber von Internetseiten sollen gesetzlich dazu verpflichtet sein, Falschinformationen (“Fake News”) zu löschen, auf die sie hingewiesen wurden.',
                doppeltGewertet: false,
                nichtGewertet: true,
                wertung: 'ohne'
            },
            {
                id: 11,
                kategorie: '',
                text: 'Ökologische Landwirtschaft soll stärker gefördert werden als konventionelle Landwirtschaft.',
                doppeltGewertet: false,
                nichtGewertet: true,
                wertung: 'ohne'
            },
            {
                id: 12,
                kategorie: '',
                text: 'Kindergeld soll nur an deutsche Familien ausgezahlt werden.',
                doppeltGewertet: false,
                nichtGewertet: true,
                wertung: 'ohne'
            },
            {
                id: 13,
                kategorie: '',
                text: 'Arbeitsverträge sollen weiterhin ohne Angabe von Gründen befristet sein dürfen.',
                doppeltGewertet: false,
                nichtGewertet: true,
                wertung: 'ohne'
            },
            {
                id: 14,
                kategorie: '',
                text: 'Kinder sollen gegen ansteckende Krankheiten geimpft werden müssen.',
                doppeltGewertet: false,
                nichtGewertet: true,
                wertung: 'ohne'
            },
            {
                id: 15,
                kategorie: '',
                text: 'Alle Banken sollen verstaatlicht werden.',
                doppeltGewertet: false,
                nichtGewertet: true,
                wertung: 'ohne'
            },
            {
                id: 16,
                kategorie: '',
                text: 'Der Völkermord an den europäischen Juden soll weiterhin zentraler Bestandteil der deutschen Erinnerungskultur sein.',
                doppeltGewertet: false,
                nichtGewertet: true,
                wertung: 'ohne'
            },
            {
                id: 17,
                kategorie: '',
                text: 'Haushaltsüberschüsse sollen überwiegend zum Abbau von Staatsschulden verwendet werden.',
                doppeltGewertet: false,
                nichtGewertet: true,
                wertung: 'ohne'
            },
            {
                id: 18,
                kategorie: '',
                text: 'Die Gesamtzahl der Nutztiere in den landwirtschaftlichen Betrieben einer Gemeinde soll begrenzt werden können.',
                doppeltGewertet: false,
                nichtGewertet: true,
                wertung: 'ohne'
            },
            {
                id: 19,
                kategorie: '',
                text: 'In Deutschland soll auch zukünftig Braunkohle abgebaut werden dürfen.',
                doppeltGewertet: false,
                nichtGewertet: true,
                wertung: 'ohne'
            },
            {
                id: 20,
                kategorie: '',
                text: 'Unternehmen sollen weiterhin Leiharbeiterinnen und Leiharbeiter beschäftigen dürfen.',
                doppeltGewertet: false,
                nichtGewertet: true,
                wertung: 'ohne'
            },
            {
                id: 21,
                kategorie: '',
                text: 'In Deutschland geborene und aufgewachsene Kinder ausländischer Eltern sollen weiterhin neben der deutschen ihre zweite Staatsangehörigkeit behalten dürfen.',
                doppeltGewertet: false,
                nichtGewertet: true,
                wertung: 'ohne'
            },
            {
                id: 22,
                kategorie: '',
                text: 'Bereits nach 40 Beitragsjahren soll der Renteneintritt abschlagsfrei möglich sein.',
                doppeltGewertet: false,
                nichtGewertet: true,
                wertung: 'ohne'
            },
            {
                id: 23,
                kategorie: '',
                text: 'Deutschland soll zu einer nationalen Währung zurückkehren.',
                doppeltGewertet: false,
                nichtGewertet: true,
                wertung: 'ohne'
            },
            {
                id: 24,
                kategorie: '',
                text: 'Die Frauenquote für die Aufsichtsräte börsennotierter Unternehmen soll abgeschafft werden.',
                doppeltGewertet: false,
                nichtGewertet: true,
                wertung: 'ohne'
            },
            {
                id: 25,
                kategorie: '',
                text: 'Hohe Vermögen sollen besteuert werden.',
                doppeltGewertet: false,
                nichtGewertet: true,
                wertung: 'ohne'
            },
            {
                id: 26,
                kategorie: '',
                text: 'Für begangene Straftaten sollen auch Kinder unter 14 Jahren verurteilt werden können.',
                doppeltGewertet: false,
                nichtGewertet: true,
                wertung: 'ohne'
            },
            {
                id: 27,
                kategorie: '',
                text: 'Alle Bürgerinnen und Bürger sollen bei gesetzlichen Krankenkassen versichert sein müssen.',
                doppeltGewertet: false,
                nichtGewertet: true,
                wertung: 'ohne'
            },
            {
                id: 28,
                kategorie: '',
                text: 'Der Bund soll weiterhin Projekte gegen Rechtsextremismus fördern.',
                doppeltGewertet: false,
                nichtGewertet: true,
                wertung: 'ohne'
            },
            {
                id: 29,
                kategorie: '',
                text: 'Der Erwerb von selbstgenutztem Wohneigentum soll bis zu einer bestimmten Höhe steuerfrei sein.',
                doppeltGewertet: false,
                nichtGewertet: true,
                wertung: 'ohne'
            },
            {
                id: 30,
                kategorie: '',
                text: 'Rüstungsexporte aus Deutschland sollen ausnahmslos verboten werden.',
                doppeltGewertet: false,
                nichtGewertet: true,
                wertung: 'ohne'
            },
            {
                id: 31,
                kategorie: '',
                text: 'Der kontrollierte Verkauf von Cannabis soll generell erlaubt sein.',
                doppeltGewertet: false,
                nichtGewertet: true,
                wertung: 'ohne'
            },
            {
                id: 32,
                kategorie: '',
                text: 'Der Solidaritätszuschlag soll Ende 2019 vollständig abgeschafft werden.',
                doppeltGewertet: false,
                nichtGewertet: true,
                wertung: 'ohne'
            },
            {
                id: 33,
                kategorie: '',
                text: 'Anerkannten Flüchtlingen, die sich Integrationsmaßnahmen verweigern, sollen die Leistungen gekürzt werden können.',
                doppeltGewertet: false,
                nichtGewertet: true,
                wertung: 'ohne'
            },
            {
                id: 34,
                kategorie: '',
                text: 'Eltern sollen für ihre Kinder bis zum Ende der Grundschulzeit einen Rechtsanspruch auf Ganztagsbetreuung erhalten.',
                doppeltGewertet: false,
                nichtGewertet: true,
                wertung: 'ohne'
            },
            {
                id: 35,
                kategorie: '',
                text: 'Der Gottesbezug im Grundgesetz soll bestehen bleiben.',
                doppeltGewertet: false,
                nichtGewertet: true,
                wertung: 'ohne'
            },
            {
                id: 36,
                kategorie: '',
                text: 'In Deutschland soll es ein bedingungsloses Grundeinkommen geben.',
                doppeltGewertet: false,
                nichtGewertet: true,
                wertung: 'ohne'
            },
            {
                id: 37,
                kategorie: '',
                text: 'Die Zusammenarbeit der Mitgliedstaaten in der Europäischen Union soll verstärkt werden.',
                doppeltGewertet: false,
                nichtGewertet: true,
                wertung: 'ohne'
            }
*/
        ];

    }


    private ladeParteien() {

        this.parteien = [
            {
                id: 0,
                nameKurz: 'CDU/CSU',
                nameLang: 'Christlich Demokratische Union Deutschlands / Christlich-Soziale Union in Bayern e.V.',
                logo: 'CDU_CSU.png',
                beschreibung: 'CDU und CSU stützen sich auf christliche Werte und kombinieren eine marktwirtschaftliche Ausrichtung mit staatlichen Eingriffen. Sie stellen aktuell wie in 48 von 68 Jahren die Kanzlerin bzw. den Kanzler. Zur Bundestagswahl geben sie Vollbeschäftigung als Ziel aus und wollen eine moderate Steuerentlastung umsetzen.',
                thesen: ['ja', 'nein', 'neutral', 'nein', 'ja', 'nein', 'ja', 'nein', 'nein', 'ja', 'ja', 'neutral', 'nein', 'ja', 'ja', 'nein', 'ja', 'neutral', 'neutral', 'neutral', 'ja', 'neutral', 'nein', 'nein', 'nein', 'neutral', 'nein', 'nein', 'ja', 'ja', 'nein', 'nein', 'neutral', 'ja', 'ja', 'ja', 'nein', 'ja']
            },
            {
                id: 1,
                nameKurz: 'SPD',
                nameLang: 'Sozialdemokratische Partei Deutschlands',
                logo: 'SPD.png',
                beschreibung: 'Die SPD stützt sich auf die Grundwerte Freiheit, Gerechtigkeit und Solidarität. Sie ist derzeit Teil der Bundesregierung und stellte in 20 von 68 Jahren den Kanzler. In ihrem Wahlprogramm will sie hohe Einkommen und große Erbschaften stärker besteuern und Bildung bis zum ersten Abschluss gebührenfrei gestalten.',
                thesen: ['nein', 'nein', 'nein', 'ja', 'ja', 'neutral', 'ja', 'neutral', 'nein', 'neutral', 'ja', 'nein', 'nein', 'nein', 'nein', 'nein', 'ja', 'nein', 'ja', 'ja', 'ja', 'ja', 'nein', 'nein', 'nein', 'neutral', 'nein', 'ja', 'ja', 'nein', 'neutral', 'nein', 'nein', 'ja', 'ja', 'ja', 'nein', 'ja']
            },
            {
                id: 2,
                nameKurz: 'DIE LINKE',
                nameLang: 'DIE LINKE',
                logo: 'DieLinke.png',
                beschreibung: 'DIE LINKE tritt für einen demokratischen Sozialismus und einen umfassenden Ausbau des Sozialstaates ein. Sie ist seit 1990 im Bundestag vertreten. Zur Bundestagswahl fordert sie eine deutliche Erhöhung des Mindestlohns und eine Anhebung des Rentenniveaus sowie den Rückzug der Bundeswehr aus allen Auslandseinsätzen.',
                thesen: ['nein', 'ja', 'nein', 'ja', 'ja', 'ja', 'nein', 'ja', 'ja', 'nein', 'nein', 'ja', 'nein', 'nein', 'nein', 'nein', 'ja', 'nein', 'ja', 'nein', 'nein', 'ja', 'ja', 'nein', 'nein', 'ja', 'nein', 'ja', 'ja', 'nein', 'ja', 'ja', 'nein', 'nein', 'ja', 'nein', 'neutral', 'neutral']
            },
            {
                id: 3,
                nameKurz: 'GRÜNE',
                nameLang: 'BÜNDNIS 90/DIE GRÜNEN',
                logo: 'Gruene.png',
                beschreibung: 'Die GRÜNEN orientieren sich an den Themen Umweltschutz, Bürger- und Menschenrechte, Gleichstellung sowie Demokratisierung der Gesellschaft. Seit 1983 sind sie im Bundestag vertreten. Zur Bundestagswahl wenden sie sich gegen eine Verschärfung des Asylrechts und wollen ab 2030 nur noch abgasfreie Autos zulassen.',
                thesen: ['nein', 'ja', 'nein', 'ja', 'ja', 'ja', 'nein', 'ja', 'ja', 'nein', 'ja', 'ja', 'nein', 'nein', 'nein', 'nein', 'ja', 'nein', 'ja', 'nein', 'ja', 'ja', 'nein', 'nein', 'nein', 'ja', 'nein', 'ja', 'ja', 'nein', 'nein', 'ja', 'neutral', 'neutral', 'ja', 'ja', 'neutral', 'ja']
            },
            {
                id: 4,
                nameKurz: 'FDP',
                nameLang: 'Freie Demokratische Partei',
                logo: 'FDP.png',
                beschreibung: 'Die FDP bewertet Freiheit höher als Gleichheit. Sie war über viele Jahre an Bundesregierungen beteiligt, ist seit 2013 aber nicht mehr im Bundestag vertreten. In ihrem Wahlprogramm fordert sie höhere Bildungsausgaben. Sie setzt sich für Steuerentlastungen ein und spricht sich gegen eine anlasslose Überwachung aus.',
                thesen: ['neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral']
            },
            {
                id: 5,
                nameKurz: 'AfD',
                nameLang: 'Alternative für Deutschland',
                logo: 'AfD.png',
                beschreibung: 'Die AfD wendet sich gegen die aktuelle Europapolitik und nimmt verstärkt die Themen Asyl und Zuwanderung in den Fokus. Sie ist seit 2014 bei allen Wahlen in die Parlamente eingezogen. In ihrem Wahlprogramm fordert sie die Schließung der Grenzen und bezweifelt, dass der Klimawandel vorwiegend menschengemacht ist.',
                thesen: ['neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral']
            },
            {
                id: 6,
                nameKurz: 'PIRATEN',
                nameLang: 'Piratenpartei Deutschland',
                logo: 'Piraten.png',
                beschreibung: 'Die PIRATEN sind um die Themen Netzpolitik, Digitalisierung, Transparenz und Partizipation entstanden. Sie waren zwischen 2011 und 2017 in mehreren Landtagen vertreten. Zur Bundestagswahl möchten sie die Videoüberwachung einschränken, ein bedingungsloses Grundeinkommen schaffen und das Asylrecht vereinfachen.',
                thesen: ['neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral']
            },
            {
                id: 7,
                nameKurz: 'NPD',
                nameLang: 'Nationaldemokratische Partei Deutschlands',
                logo: 'NPD.png',
                beschreibung: 'Die NPD ist eine rechtsextreme Partei, deren politisches Konzept die Menschenwürde missachtet. Sie lehnt die freiheitliche Demokratie ab und vertritt fremdenfeindliche Positionen. In ihrem Programm wendet sie sich gegen Zuwanderung, "ethnische Überfremdung" und die Einbindung Deutschlands in die Europäische Union.',
                thesen: ['neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral']
            },
            {
                id: 8,
                nameKurz: 'FREIE WÄHLER',
                nameLang: 'FREIE WÄHLER',
                logo: 'FreieWaehler.png',
                beschreibung: 'Die FREIEN WÄHLER sind aus kommunalpolitisch aktiven Wählergemeinschaften entstanden. Sie sind seit 1998 im Bayerischen Landtag vertreten. Zur Bundestagswahl fordern sie Volksentscheide und eine Direktwahl des Bundespräsidenten. Außerdem sprechen sie sich für kostenfreie Kinderbetreuung aus.',
                thesen: ['neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral']
            },
            {
                id: 9,
                nameKurz: 'Tierschutzpartei',
                nameLang: 'PARTEI MENSCH UMWELT TIERSCHUTZ',
                logo: 'Tierschutzpartei.png',
                beschreibung: 'Die Tierschutzpartei gesteht Tieren unveräußerliche Grundrechte zu, die nur in Notwehrsituationen berührt werden dürfen. Sie zog 2014 mit einem Abgeordneten ins Europaparlament ein. Zur Bundestagswahl fordert sie ein Verbot aller Tierversuche und die gleichberechtigte Teilhabe aller Menschen an allen Lebensbereichen.',
                thesen: ['neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral']
            },
            {
                id: 10,
                nameKurz: 'ÖDP',
                nameLang: 'Ökologisch-Demokratische Partei',
                logo: 'OeDP.png',
                beschreibung: 'Die ÖDP ist eine ökologische und wertkonservative Partei. Sie zog 2014 mit einem Abgeordneten ins Europaparlament ein. In ihrem Wahlprogramm fordert sie den Ausstieg aus der Braunkohle sowie mehr Wertschätzung für Kindererziehung und Pflege durch Familienangehörige. Volksentscheide will die Partei ausweiten.',
                thesen: ['neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral']
            },
            {
                id: 11,
                nameKurz: 'Die PARTEI',
                nameLang: 'Partei für Arbeit, Rechtsstaat, Tierschutz, Elitenförderung und basisdemokratische Initiative',
                logo: 'DiePartei.png',
                beschreibung: 'Die PARTEI verwendet satirische Elemente in ihren Programmen und Aktionen. Sie zog 2014 mit einem Abgeordneten ins Europaparlament ein. In ihrem Wahlprogramm fordert sie eine bundesweite Bierpreisbremse, die Abschaffung von Tierversuchen und die Unterdrückung von Beschwerden über Ungerechtigkeit.',
                thesen: ['neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral']
            },
            {
                id: 12,
                nameKurz: 'BP',
                nameLang: 'Bayernpartei',
                logo: 'BP.png',
                beschreibung: 'Die BP fordert einen Volksentscheid über die Unabhängigkeit Bayerns. Sie war von 1949 bis 1953 im ersten Bundestag vertreten. In ihrem Programm positioniert sie sich außerdem für einen Ausstieg aus dem Euro, will Schwangerschaftsabbrüche deutlich einschränken und ausländische Wiederholungstäter sofort abschieben.',
                thesen: ['neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral']
            },
            {
                id: 13,
                nameKurz: 'Volksabstimmung',
                nameLang: 'Ab jetzt...Demokratie durch Volksabstimmung',
                logo: 'Volksabstimmung.png',
                beschreibung: 'Die Volksabstimmung vereint Forderungen nach direktdemokratischen Elementen auf Bundesebene mit nationalkonservativen Positionen. Sie fordert die Anhebung des Rentenniveaus sowie die Wiedereinführung der D-Mark und befürwortet die Gleichstellung von Naturheilverfahren mit der Schulmedizin.',
                thesen: ['neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral']
            },
            {
                id: 14,
                nameKurz: 'PDV',
                nameLang: 'Partei der Vernunft',
                logo: 'PDV.png',
                beschreibung: 'Die PDV setzt auf die Stärkung der Freiheit sowie Verantwortung des Einzelnen und möchte staatliche Kompetenzen reduzieren. Parteipolitik möchte sie auf die kommunale Ebene zurückdrängen. Die Partei sieht die EU als überflüssig an und bezweifelt, dass der CO2-Ausstoß eine negative Auswirkung auf die Umwelt hat.',
                thesen: ['neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral']
            },
            {
                id: 15,
                nameKurz: 'MLPD',
                nameLang: 'Marxistisch-Leninistische Partei Deutschlands',
                logo: 'MLPD.png',
                beschreibung: 'Die MLPD ist eine linksextreme, kommunistische Partei, deren Ziel die Schaffung einer klassenlosen Gesellschaft ist. In ihrem Wahlprogramm fordert sie höhere Löhne, die Absenkung des Renteneintrittsalters und ein uneingeschränktes Asylrecht. Die EU kritisiert sie als imperialistische Organisation.',
                thesen: ['neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral']
            },
            {
                id: 16,
                nameKurz: 'BüSo',
                nameLang: 'Bürgerrechtsbewegung Solidarität',
                logo: 'BueSo.png',
                beschreibung: 'Die BüSo fordert eine neue Weltwirtschaftsordnung, die sie mit Änderungen im Finanzsystem und transnationalen sowie globalen Infrastrukturprojekten erreichen will. Zur Bundestagswahl fordert sie die Beendigung des Atomausstiegs, den Ausbau wichtiger Bundeswasserstraßen und ein "Europa souveräner Republiken".',
                thesen: ['neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral']
            },
            {
                id: 17,
                nameKurz: 'SGP',
                nameLang: 'Sozialistische Gleichheitspartei, Vierte Internationale',
                logo: 'SGP.png',
                beschreibung: 'Die SGP ist eine antikapitalistische Partei, die sich das Ziel gesetzt hat, die internationale Arbeiterschaft zu vereinigen und eine Umgestaltung der Gesellschaft nach sozialistischen Grundsätzen durchzusetzen. Zur Bundestagswahl fordert sie die Abschaffung der Geheimdienste und die Auflösung von EU und Nato.',
                thesen: ['neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral']
            },
            {
                id: 18,
                nameKurz: 'DIE RECHTE',
                nameLang: 'DIE RECHTE',
                logo: 'DieRechte.png',
                beschreibung: 'DIE RECHTE ist eine rechtsextreme Partei mit rassistisch motivierten fremden- und islamfeindlichen Äußerungen. Parlamentarismus betrachtet sie lediglich als Mittel zum Kampf gegen das demokratische System. Zur Bundestagswahl fordert sie ein Werbeverbot in Fremdsprachen und weitreichende Änderungen im Asylrecht.',
                thesen: ['neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral']
            },
            {
                id: 19,
                nameKurz: 'Allianz Deutscher Demokraten',
                nameLang: 'Allianz Deutscher Demokraten',
                logo: 'AllianzDeutscherDemokraten.png',
                beschreibung: 'Die Allianz Deutscher Demokraten möchte besonders Menschen mit Migrationshintergrund ein gleichberechtigtes Leben in Deutschland ermöglichen. In ihrem Programm setzt sie sich für die doppelte Staatsangehörigkeit sowie für die Rechte muslimischer Menschen ein. Die EU erklärt sie als gescheitert.',
                thesen: ['neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral']
            },
            {
                id: 20,
                nameKurz: 'Tierschutzallianz',
                nameLang: 'Allianz für Menschenrechte, Tier- und Naturschutz',
                logo: 'Tierschutzallianz.png',
                beschreibung: 'Die Tierschutzallianz bezieht neben ihrem Hauptanliegen Tierschutz auch andere Politikfelder in ihre Ziele mit ein. In ihrem Programm setzt sie sich ein für tierversuchsfreie Forschung, für mehr direkte Bürgerbeteiligung, für ein garantiertes Grundeinkommen und bessere Hygienestandards in Krankenhäusern.',
                thesen: ['neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral']
            },
            {
                id: 21,
                nameKurz: 'B*',
                nameLang: 'bergpartei, die überpartei',
                logo: 'B.png',
                beschreibung: 'Die B* ist eine alternative linke Partei, die ihre Wurzeln in der Berliner Hausbesetzer-Szene hat. In ihrem Programm fordert sie ein bedingungsloses Grundeinkommen und plädiert für eine Begrenzung von Besitz. Darüber hinaus wirbt sie für einen Nato-Austritt und die direkte Ausübung der politischen Macht durch das Volk.',
                thesen: ['neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral']
            },
            {
                id: 22,
                nameKurz: 'BGE',
                nameLang: 'Bündnis Grundeinkommen',
                logo: 'BGE.png',
                beschreibung: 'Die BGE verfolgt als einziges politisches Ziel die Einführung eines bedingungslosen Grundeinkommens in Deutschland, womit allen die Teilhabe am Gemeinwesen ermöglicht werden soll. Andere Themen sind für die Partei nur dann von Bedeutung, wenn sie Einfluss auf das bedingungslose Grundeinkommen haben.',
                thesen: ['neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral']
            },
            {
                id: 23,
                nameKurz: 'DiB',
                nameLang: 'DEMOKRATIE IN BEWEGUNG',
                logo: 'DiB.png',
                beschreibung: 'Die DiB setzt sich für eine stärkere Mitbestimmung und höhere Transparenz in der Politik ein. Zur Bundestagswahl fordert sie die Einführung verbindlicher Lobbyregister. Sie unterstützt eine Ausweitung der Kompetenzen der Europäischen Union und plädiert für eine "menschengerechte" Migrations- und Entwicklungspolitik.',
                thesen: ['neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral']
            },
            {
                id: 24,
                nameKurz: 'DKP',
                nameLang: 'Deutsche Kommunistische Partei',
                logo: 'DKP.png',
                beschreibung: 'Die DKP ist eine linksextreme Partei, die auf die Errichtung eines sozialistischen Systems hinarbeitet. In ihrem Programm zur Bundestagswahl benennt sie Frieden und soziale Sicherheit als ihre wichtigsten Themen. Sie fordert Investitionen, die Schaffung von Arbeitsplätzen und die Wiedereinführung der Vermögenssteuer.',
                thesen: ['neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral']
            },
            {
                id: 25,
                nameKurz: 'DM',
                nameLang: 'Deutsche Mitte',
                logo: 'DM.png',
                beschreibung: 'Die DM äußert in vielen Politikfeldern Kritik und sieht die eigenen Positionen als unverhandelbar an. Sie lehnt den Euro sowie die EU ab und fordert eine Begrenzung der Zuwanderung. Die Partei spricht sich gegen den öffentlich-rechtlichen Rundfunk, den verpflichtenden Schulbesuch und gegen Zinsen sowie Steuern aus.',
                thesen: ['neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral']
            },
            {
                id: 26,
                nameKurz: 'Die Grauen',
                nameLang: 'Die Grauen - Für alle Generationen',
                logo: 'DieGrauen.png',
                beschreibung: 'Die Grauen sind aus der Interessenvertretung von Senioren entstanden, verstehen sich aber als Partei für alle Generationen. In ihrem Programm fordern sie eine gesetzliche Mindestrente und die Senkung des Renteneintrittsalters. Sie plädieren für die Stärkung direkter Demokratie und die Senkung der Fünfprozenthürde.',
                thesen: ['neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral']
            },
            {
                id: 27,
                nameKurz: 'du.',
                nameLang: 'Die Urbane. Eine HipHop Partei',
                logo: 'DieUrbane.png',
                beschreibung: 'Die du. versteht sich als Partei, welche die Schlüsselelemente der Hip-Hop-Kultur in politisches Handeln übertragen will. Sie spricht sich gegen Diskriminierung und für die Gleichstellung aller Bürger aus. In ihrem Programm fordert sie das Ende deutscher Waffenexporte und den Austritt Deutschlands aus der Nato.',
                thesen: ['neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral']
            },
            {
                id: 28,
                nameKurz: 'MENSCHLICHE WELT',
                nameLang: 'Menschliche Welt',
                logo: 'MenschlicheWelt.png',
                beschreibung: 'Die MENSCHLICHE WELT orientiert sich an der Theorie eines indischen Philosophen und möchte die Gesellschaft auf der Basis spiritueller Praktiken verbessern. In ihrem Programm fordert sie eine Minimierung deutscher Waffenexporte, ein Verbot von Tierversuchen und die massive Förderung umweltfreundlicher Technologien.',
                thesen: ['neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral']
            },
            {
                id: 29,
                nameKurz: 'Die Humanisten',
                nameLang: 'Partei der Humanisten',
                logo: 'DieHumanisten.png',
                beschreibung: 'Die Humanisten vertreten eine Weltsicht, die auf Naturgesetzen und Wissenschaft und nicht auf "Göttern oder höheren Mächten" gründet. In ihrem Programm fordern sie ein Ende der Beziehungen zwischen Kirche und Staat, die Legalisierung von Cannabis und freien Zugang zu steuerfinanzierten Forschungsergebnissen.',
                thesen: ['neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral']
            },
            {
                id: 30,
                nameKurz: 'Gesundheitsforschung',
                nameLang: 'Partei für Gesundheitsforschung',
                logo: 'Gesundheitsforschung.png',
                beschreibung: 'Die Gesundheitsforschung verfolgt als einziges politisches Ziel die bessere Erforschung altersbedingter Krankheiten. In ihrem Programm fordert sie daher, ein zusätzliches Prozent des Bundeshaushaltes in dieses Forschungsgebiet zu investieren. Zu anderen politischen Fragestellungen äußert sich die Partei nicht.',
                thesen: ['neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral']
            },
            {
                id: 31,
                nameKurz: 'V-Partei3',
                nameLang: 'V-Partei3 - Partei für Veränderung, Vegetarier und Veganer',
                logo: 'V_Partei3.png',
                beschreibung: 'Die V-Partei³ sieht sich als Vertretung von Vegetariern und Veganern. Ihre Kernforderungen zielen auf die Verbesserung des Verbraucher-, Klima- und Tierschutzes. In ihrem Programm setzt sie sich gegen Tierschlachtungen zur Nahrungsmittelproduktion ein, entwickelt aber auch Positionen zu anderen Politikfeldern.',
                thesen: ['neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral']
            }
        ];

    }


    private naechsteTheseOderAuswertung() {

        if (this.aktuelleTheseIndex + 1 >= this.thesen.length) {

            this.modus = 'Auswertung';

            this.ergebnisseThesen = [];
            for (const these of this.thesen) {
                this.ergebnisseThesen.push({
                    these,
                    maxPunkte: this.bestimmeMaxPunkte(these)
                });
            }

            const maxPunkte = _.sumBy(this.ergebnisseThesen, 'maxPunkte');

            this.ergebnisseParteien = [];
            for (const partei of this.parteien) {

                this.ergebnisseParteien.push({
                    partei,
                    prozent: this.berechneProzent(partei, maxPunkte)
                });

            }

            this.ergebnisseParteien = _.orderBy(this.ergebnisseParteien, 'prozent', 'desc');

        } else {
            this.waehleThese(this.aktuelleTheseIndex + 1);
        }

    }


    private bestimmeMaxPunkte(these): number {

        const punkteProPartei = _.map(this.parteien, partei => {

            const wertungPartei =  partei.thesen[these.id];

            let punkte = 0;
            switch (these.wertung) {

                case 'ja':
                    if (wertungPartei === 'ja') {
                        punkte = 2;
                    } else if (wertungPartei === 'neutral') {
                        punkte = 1;
                    }
                    break;

                case 'neutral':
                    if (wertungPartei === 'neutral') {
                        punkte = 2;
                    } else if (wertungPartei === 'ja' || wertungPartei === 'nein') {
                        punkte = 1;
                    }
                    break;

                case 'nein':
                    if (wertungPartei === 'nein') {
                        punkte = 2;
                    } else if (wertungPartei === 'neutral') {
                        punkte = 1;
                    }
                    break;

            }

            return these.doppeltGewertet ? 2 * punkte : punkte;

        });

        return _.max(punkteProPartei);

    }


    private berechneProzent(partei, maxPunkte: number): number {

        if (maxPunkte === 0) {
            return 0;
        }

        let summe = 0;

        for (const these of this.thesen) {

            let punkte = 0;

            switch (partei.thesen[these.id]) {

                case 'ja':
                    if (these.wertung === 'ja') {
                        punkte = 2;
                    } else if (these.wertung === 'neutral') {
                        punkte = 1;
                    }
                    break;

                case 'neutral':
                    if (these.wertung === 'neutral') {
                        punkte = 2;
                    } else if (these.wertung === 'ja' || these.wertung === 'nein') {
                        punkte = 1;
                    }
                    break;

                case 'nein':
                    if (these.wertung === 'nein') {
                        punkte = 2;
                    } else if (these.wertung === 'neutral') {
                        punkte = 1;
                    }
                    break;

            }

            summe += these.doppeltGewertet ? 2 * punkte : punkte;

        }

        return summe / maxPunkte;

    }


}
