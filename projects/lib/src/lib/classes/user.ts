
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


