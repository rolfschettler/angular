import { Component, inject } from '@angular/core';
import { DataService } from '../data.service';
import { AlertService, DialogService, MaterialModule } from 'lib';
import { CommonModule } from '@angular/common';
import { of } from 'rxjs';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-virtual-scroll',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  imports: [MatButtonModule, CommonModule, ScrollingModule],
})
export class HomeComponent {
  users: any = [];
  json = {
    id: '0000000000',
    username: 'Administrator',
    email: 'yyy',
    password: 'xxxx',
  };

  constructor(
    private dataservice: DataService,
    private alertservice: AlertService,
    private dialogService: DialogService
  ) {}

  fillertest = Array.from({ length: 20 }, (_, i) => `Test Item ${i + 1}`);

  fillerContent = Array.from(
    { length: 60 },
    () =>
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
   labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
   laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
   voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
   cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`
  );




  ShowConfirm() {
    // this.dialogService.confirm('Bavaria ipsum dolor sit amet in da greana Au i hab an Greichats baddscher. Hoam und sei oha, nia need: Griasd eich midnand großherzig no i glacht. Heitzdog wea nia ausgähd, kummt nia hoam jedza Biazelt kloan im Beidl Woibbadinga owe! Weiznglasl da Enzian do Vergeltsgott af des basd scho da Biaschlegl. Umananda ja, wo samma denn Woibbadinga glei Biazelt, Maibam vui huift vui! Ja, wo samma denn zünftig sammawiedaguad nia, mechad. Um Godds wujn Wurschtsolod aasgem oamoi Enzian, Woibbadinga schnacksln ebba.','warning');
     this.dialogService.YesNoDialog('Bavaria denn zünftig sammawiedaguad nia, mechad. Um Godds wujn Wurscht- solod aasgem oamoi Enzian, Woibbadinga schnacksln ebba ?').subscribe(antwort=>{console.log(antwort)})


    let myarray=[
   
      {label:'Auswahl',value:'a',required:true,type:['a','b','c']},
      {label:'Objekteauswahl',value:'a',required:true,type:[{key:'1',value:'Topic1'},{key:'2',value:'Topic2'},{key:'3',value:'Topic3'}]},
      {label:'Vorname',value:'paul',required:true},
      {label:'Datum',value:'2024-12-02',required:true, type: 'date'}
     
        ]
  

    this.dialogService.InputDialog('Bitte Adresse angeben',myarray,'myHelpTopic').subscribe(res=>console.info(res))
  }

  GetUsers() {
    this.dataservice.getUsers().subscribe((res) => {
      this.users = res['data'];
      console.log(this.users);
    });
  }

  SaveUser() {
    this.dataservice.saveUser(this.json).subscribe({
      next: (v) => console.log(v),
      error: (e) => {
        if (String(e).includes('23505')) {
          console.error('Diese Schlüssel existiert bereits');
          this.alertservice.error(e, false, 2000);
        } else {
          console.error(e);
        }
      },
      complete: () => console.info('complete'),
    });
  }
}
