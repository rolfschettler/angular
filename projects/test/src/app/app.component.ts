import { Component,OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LibComponent, LibService } from 'lib';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LibComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'test';


constructor(
  private libService:LibService
){}

ngOnInit(){
  console.log('XXXXXXXXXXXXXXXXXXXXXX')
  console.log(this.libService.sayHallo());

}





}

