import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SuperPoder } from '../../models/superpoder.model';
import { HeroiService } from '../../services/cadastrar/heroi.service';
import { Heroi } from '../../models/heroi.model';

@Component({
  selector: 'app-atualizar',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './atualizar.html',
  styleUrl: './atualizar.css'
})
export class Atualizar  implements OnInit{
  heroiEncontrado = false;
  formBuscar: FormGroup;
  formHeroi: FormGroup;
  superpoderes: SuperPoder[] = [];

  constructor(private fb: FormBuilder, private service: HeroiService) {
    this.formBuscar = this.fb.group({
      id: ['', Validators.required]
    });

    this.formHeroi = this.fb.group({
      nome: ['', Validators.required],
      nomeHeroi: ['', Validators.required],
      dataNascimento: ['', Validators.required],
      altura: ['', [Validators.required, Validators.min(0)]],
      peso: ['', [Validators.required, Validators.min(0)]],
      superpoderes: this.fb.array([])
    });
  }

  ngOnInit() {
    this.service.buscarSuperPoderes().subscribe((data: any) => {
      this.superpoderes = data;
    });
  }

  onSubmitBuscar() {
    const id = this.formBuscar.value.id;
    this.service.consultarHeroiPorId(id).subscribe({
      next: (heroi: Heroi) => {
        
        let dataAjustada = '';
        if (heroi.dataNascimento) {
          if (typeof heroi.dataNascimento === 'string') {
            dataAjustada = (heroi.dataNascimento as string).substring(0, 10);
          } else if (heroi.dataNascimento instanceof Date) {
            dataAjustada = heroi.dataNascimento.toISOString().substring(0, 10);
          }
        }

        this.formHeroi.patchValue({
          nome: heroi.nome,
          nomeHeroi: heroi.nomeHeroi,
          dataNascimento: dataAjustada,
          altura: heroi.altura,
          peso: heroi.peso
        });

        const superpoderesArray = this.formHeroi.get('superpoderes') as FormArray;
        superpoderesArray.clear();
        heroi.superpoderes.forEach((p: SuperPoder) => {
          superpoderesArray.push(this.fb.control(p.id));
        });

        this.heroiEncontrado = true;
      },
      error: () => {
        this.heroiEncontrado = false;
        alert('Herói não encontrado!')
      }
    });
  }

  onCheckboxChange(event: any, poder: SuperPoder) {
    const superpoderesArray: FormArray = this.formHeroi.get('superpoderes') as FormArray;
    if (event.target.checked) {
      superpoderesArray.push(this.fb.control(poder.id));
    } else {
      const index = superpoderesArray.controls.findIndex(x => x.value === poder.id);
      superpoderesArray.removeAt(index);
    }
  }

  onSubmitAtualizar() {
    if (this.formHeroi.valid) {
      const formValue = this.formHeroi.value;
      const dataNascimento = formValue.dataNascimento
        ? `${formValue.dataNascimento}T00:00:00`
        : null;

      const superpoderesIds = formValue.superpoderes;
      const superpoderes = superpoderesIds.map((id: number) => ({ id }));

      const dados = {
        ...formValue,
        dataNascimento,
        id: formValue.id,
        superpoderes 
      };

      this.service.atualizarHeroi(dados, superpoderesIds).subscribe({
        next: () => {alert('Herói atualizado com sucesso!')
          this.formBuscar.reset();
          this.formHeroi.reset();
          this.heroiEncontrado = false;
        },
        error: () => alert('Erro ao atualizar herói!')
      });
    }
  }

}
