import { Component, OnInit } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { Heroi } from '../../models/heroi.model';
import { HeroiService } from '../../services/cadastrar/heroi.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listar',
  imports: [MatTableModule, CommonModule],
  templateUrl: './listar.html',
  styleUrl: './listar.css'
})
export class Listar implements OnInit {
  dataSource: MatTableDataSource<Heroi>;
  herois: Heroi[] = [];
  displayedColumns: string[] = ['id', 'nome', 'nomeHeroi', 'dataNascimento', 'altura', 'peso', 'superpoderes'];

  constructor(private heroisService: HeroiService) {
    this.dataSource = new MatTableDataSource(this.herois);
  }

  ngOnInit() {
    this.heroisService.listarHerois().subscribe((data: Heroi[]) => {
      this.herois = data;
      this.dataSource.data = this.herois;
    });
  }
}
