import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Heroi } from '../../models/heroi.model';
import { HeroiService } from '../../services/cadastrar/heroi.service';

@Component({
  selector: 'app-consultar',
  imports: [MatTableModule, CommonModule, ReactiveFormsModule],
  templateUrl: './consultar.html',
  styleUrl: './consultar.css'
})
export class Consultar implements OnInit {
  formHeroi: FormGroup;
  dataSource = new MatTableDataSource<Heroi>();
  displayedColumns: string[] = ['id', 'nome', 'nomeHeroi', 'dataNascimento', 'altura', 'peso', 'superpoderes'];

  constructor(private fb: FormBuilder, private heroiService: HeroiService) {
    this.formHeroi = this.fb.group({
      id: ['', Validators.required] // Aqui "nome" é o campo do ID
    });
  }

  ngOnInit() {}

  onSubmit() {
    const id = this.formHeroi.value.id;
    this.heroiService.consultarHeroiPorId(id).subscribe({
      next: (heroi: Heroi) => {
        this.dataSource.data = heroi ? [heroi] : [];
      },
      error: () => {
        this.dataSource.data = [];
        alert('Herói não encontrado!');
      }
    });
  }

}
