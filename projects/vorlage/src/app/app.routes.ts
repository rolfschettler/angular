import { Routes } from '@angular/router';
import { InfoComponent } from './info/info.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard, LoginComponent } from 'lib';
//import { UsersformComponent } from './usersform/usersform.component';
import { SidesheetComponent } from './sidesheet/sidesheet.component';
import { UsertableComponent } from '../../../sharedcomponents/src/app/usertable/usertable.component';
import { UsersformComponent } from '../../../sharedcomponents/src/app/usersform/usersform.component';

export const routes: Routes = [

     
     { path: '', redirectTo: 'home', pathMatch: 'full' },  
     
     { path: 'logout', component: LoginComponent },
     { path: 'login', component: LoginComponent },

     { path: 'home', component: HomeComponent },     
     { path: 'sidesheet', component: SidesheetComponent },     
//     { path: 'form', component: UsersformComponent , canActivate: [AuthGuard],data:{expectedRole:'administrator'} },


     { path: 'userslist', component: UsertableComponent, canActivate: [AuthGuard], data: { expectedRole: 'administrator' } },
     { path: 'userslist/:id', component: UsertableComponent, canActivate: [AuthGuard], data: { expectedRole: 'administrator' } },
     { path: 'user/:id', component: UsersformComponent, canActivate: [AuthGuard], data: { expectedRole: 'administrator' } },





     { path: 'info', component: InfoComponent },
//     { path: 'info', component: InfoComponent, canActivate: [AuthGuard],data:{expectedRole:'administrator'} },
     
];



//{ path: 'home', component: HomeComponent , canActivate: [AuthGuard],data:{expectedRole:'administrator'}},  




