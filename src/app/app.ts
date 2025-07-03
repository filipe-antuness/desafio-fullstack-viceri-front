import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { SidebarComponent } from "./components/sidebar/sidebar";
import { Header } from './components/header/header';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,
            RouterModule,
            SidebarComponent,
            Header],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected title = 'FrontDesafioFullStackVisceri';
}
