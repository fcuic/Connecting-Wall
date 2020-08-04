import { Component } from '@angular/core';
import {HelloComponent} from './components/hello/hello.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'hello-world';

  constructor()
  {
  }

  callMyFunction(){
    console.log("button called");
  }

}
