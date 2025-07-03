import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Home } from './components/home/home';
import { SidebarComponent } from "./components/sidebar/sidebar";
import { Header } from './components/header/header';
import { Cadastrar } from './components/cadastrar/cadastrar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,
            RouterModule,
            Home,
            SidebarComponent,
            Header,
            Cadastrar],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected title = 'FrontDesafioFullStackVisceri';
}
