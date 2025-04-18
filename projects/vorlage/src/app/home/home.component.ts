import { Component, inject,OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { AlertService, DialogService, MaterialModule } from 'lib';
import { DbconfigService, UidService } from 'lib';
import { CommonModule } from '@angular/common';
import { map, Observable, of, shareReplay } from 'rxjs';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AuthenticationService } from 'lib';
import  * as customlib  from 'lib';
import moment from 'moment';



@Component({
  selector: 'app-virtual-scroll',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  imports: [MatButtonModule, CommonModule, ScrollingModule, MatIconModule],
})
export class HomeComponent implements OnInit {


  zahl: number = 10000.30;
  path: string = '';
  hallo: string = '';
  datum: any = null;
  loggedin: boolean = false;
  isadmin: boolean = false;
  users: any[] = [];
  antwort=null;
  suchbegriff=""







  json = {
    id: '0000000000',
    username: 'Administrator',
    email: 'yyy',
    password: 'xxxx',
  };




  isSmallScreen = this.breakpointObserver.isMatched('(max-width: 599px)');

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.XSmall)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );



  constructor(
    private breakpointObserver: BreakpointObserver,
    private dataservice: DataService,
    private alertservice: AlertService,
    private dialogService: DialogService,
    private dbconfigService: DbconfigService,
    private authenticationService:AuthenticationService
  ) {


  }


ngOnInit(): void {
  this.path = this.dbconfigService.url; //Konfiguration abfragen
    this.hallo = customlib.gethello(); //Testfunktion aus der Library "customlib"
    this.datum = moment(); //Das Tagesdatum mit der "moment.js"-Library

    this.authenticationService.currentUser.subscribe(res => { this.isadmin = res.rechte.administrator; }) //Rechte des angemeldeten Benutzers
    this.authenticationService.Loggedin.subscribe(res => { //Prüfen ob angemeldet
      this.loggedin = res;
       if (this.loggedin) //Wenn angemeldet, dann Datenbankabfrage
         this.dataservice.getUsers().subscribe(users => { console.log(this.users= users['data'])});

    });
}




  fillertest = Array.from({ length: 120 }, (_, i) => `Test Item ${i + 1}`);

  fillerContent = Array.from(
    { length: 1 },
    () =>
      `Bavaria ipsum dolor sit amet glei Zidern umananda baddscher Buam Bladl mechad Diandldrahn iabaroi des is a gmahde Wiesn. Hod af wolpern, umma ghupft wia gsprunga gar nia need. Des Obazda gscheid Ohrwaschl a geh o’ha aasgem jo mei is des schee hawadere midananda. Stubn Hendl Auffisteign in da.      Obazda Biagadn ma oba hea Kuaschwanz Auffisteign da oa, guad. Fünferl Wurschtsolod singd Trachtnhuat zua Brodzeid soi, wos. Resch Watschnbaam midanand aba midanand ma Haferl Leonhardifahrt, om auf’n Gipfe! Marterl Biagadn hob i an Suri.      Wolpern sammawiedaguad in da greana Au, muass wo hi am acht’n Tag schuf Gott des Bia Sauakraud Marterl obandln midanand Enzian. Heitzdog mim Radl foahn auf’d Schellnsau, des is schee noch da Giasinga Heiwog Goaßmaß ded Resi auffi umananda. Sammawiedaguad Haberertanz koa wann griagd ma nacha wos z’dringa Zidern nia need, Sepp hod Landla.`
  );




  openDialog() {
    this.dialogService.WaitForConfirm('Du wolltest einen Dialog, Du hast einen Dialog !').subscribe()
  }



  YesOrNo() {
    this.dialogService.YesNoDialog('Ja oder Nein ?').subscribe(res=>this.antwort= res?'JA':'NEIN' )
  }






  ShowInputDialog() {
    
    let myarray = [

      { label: 'Beruf', value: 'a', required: true, type: ['Pilot', 'Künstler', 'Artzt'] },
      { label: 'Objekteauswahl', value: 'a', required: true, type: [{ key: '1', value: 'Topic1' }, { key: '2', value: 'Topic2' }, { key: '3', value: 'Topic3' }] },
      { label: 'Vorname', value: 'paul', required: true },
      { label: 'Geburtstag', value: '2000-12-02', required: true, type: 'date' }

    ]


    this.dialogService.InputDialog('Bitte Adresse angeben', myarray, 'myHelpTopic').subscribe(res => console.info(res))
  }

  GetUsers() {
    this.dataservice.getUsers().subscribe((res) => {
      this.users = res['data'];
    });
  }

  SaveUser() {
    this.dataservice.saveUser(this.json).subscribe({
      next: (v) => this.alertservice.success(v),
      error: (e) => {
        if (String(e).includes('23505')) {
          console.error(e);
          this.alertservice.error('Diese Schlüssel existiert bereits', false, 2000);
        } else {
          console.error(e);
        }
      },
      complete: () => console.info('complete'),
    });
  }
}
