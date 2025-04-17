
export class User {
  id: string = null;//WICHTIG:InitialWert null
  username: string = "";
  vorname: string = "";
  nachname: string = "";
  password: string = "";
  email: string = "";
  rechte: any = "{}";
  erstellungsdatum: string = "";



  constructor() {
    this.id = null;//WICHTIG:InitialWert null
    this.username = "";
    this.vorname = "";
    this.nachname = "";
    this.password = "";
    this.email = "";
    this.rechte = "{}";
    this.erstellungsdatum = "";

  }

}




export const rechtedef = [
  { 'recht': 'administrator', 'label': 'Administrator (Programm konfigurieren)', 'description': 'Programme konfigurieren, kein Zugang zu Patientendaten.' },
  { 'recht': 'arzt', 'label': 'Arzt', 'description': 'Zugang zu allen Bereiche außer VIP-Patientendaten.' },
  { 'recht': 'bearbeiter', 'label': 'Sachbearbeiter', 'description': 'Aufgaben der Verwaltung, kein Zugang zu Patientendaten.' },
  { 'recht': 'fachkraft', 'label': 'Medizinische Fachkraft', 'description': 'Beschränkter Zugang zu Patientendaten.' },  
  { 'recht': 'vip', 'label': 'VIP', 'description': 'Erweiterter Zugang zu Patientendaten (VIP) ' },
  { 'recht': 'gast', 'label': 'Gast', 'description': 'Einsicht in Praxisinfo, Keine Einsicht in Patientendaten.' },
  { 'recht': 'global', 'label': 'global', 'description': 'Alle Programmeinstellungen dieses Benutzers werden als Default gesetzt' },
]





