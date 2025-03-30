import { ConfirmdialogComponent,CanceldialogComponent} from 'al-lib';
import { UsersService } from './../users.service';
import { User } from './../../db-structure/user';
import { ActivatedRoute, Router } from '@angular/router';
import { DatabaseService } from './../../database.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Component, OnInit, AfterViewInit } from '@angular/core';


@Component({
  selector: 'app-userslist',
  templateUrl: './userslist.component.html',
  styleUrls: ['./userslist.component.scss']
})
export class UserslistComponent implements OnInit, AfterViewInit {

  items: Observable<any[]>;
  selectedId: string = '';
  searchstring: string = '';

  constructor(
    private databaseService: DatabaseService,
    private usersService: UsersService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog) {

  }


  ScrollTo(element: any) {
    if (element)
      element.scrollIntoView(false);
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.ScrollTo(document.getElementById("" + this.selectedId))
    }, 150);
  }



  ngOnInit(): void {
    this.items = this.databaseService.getUsers();
    this.route.paramMap.subscribe(params => {
      let id = params.get("id");
      this.selectedId = id;
    })

  }

  clearSearch() {
    this.searchstring = '';
  }

  doSearch(searchstr: string) {
    this.searchstring = searchstr;
  }


  gotoUserId(id) {
    this.router.navigate(['/user', id]);
  }


  newUser() {
    this.router.navigate(['/user', '']);
  }


  dodelete(user: User) {
    this.databaseService.deleteUser(user).subscribe(
      erg => {
        if (erg && erg.status === 'OK') {
          //Refresh
          this.items = this.databaseService.getUsers();
        } else {
          const dialogConfig = new MatDialogConfig();
          dialogConfig.data = user.username + ' konnte nicht gelöscht werden : ' + erg.status;
          this.dialog.open(ConfirmdialogComponent, dialogConfig);
        }
      }
    )
  }


  deleteUser(event, user) {
    event.stopPropagation();//Verhindert ein "durchschlagen" des Click auf den ParentContainer
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = user.username + ' wirklich löschen ?';
    let dialogRef = this.dialog.open(CanceldialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(value => {
      if (value) {
        this.dodelete(user);
      }
    });

  }

}
