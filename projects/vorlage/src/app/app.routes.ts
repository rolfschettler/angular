import { Routes } from '@angular/router';
import { InfoComponent } from './info/info.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard, LoginComponent } from 'lib';

export const routes: Routes = [

     
     { path: '', redirectTo: 'home', pathMatch: 'full' },  
     
     { path: 'logout', component: LoginComponent },
     { path: 'login', component: LoginComponent },

     { path: 'home', component: HomeComponent },     
     { path: 'info', component: InfoComponent, canActivate: [AuthGuard],data:{expectedRole:'administrator'} },
     
];



//{ path: 'home', component: HomeComponent , canActivate: [AuthGuard],data:{expectedRole:'administrator'}},  




