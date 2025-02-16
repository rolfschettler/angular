import { Routes } from '@angular/router';
import { SidebarComponent } from '../../sidebar/sidebar.component';
import { InfoComponent } from './info/info.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [

     
     { path: '', redirectTo: 'home', pathMatch: 'full' },     
     { path: 'home', component: HomeComponent },     
     { path: 'info', component: InfoComponent },
];






