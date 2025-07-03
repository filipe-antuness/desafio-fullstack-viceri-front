import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HeroiService } from '../../services/cadastrar/heroi.service';
import { SuperPoder } from '../../models/superpoder.model';

@Component({
  selector: 'app-cadastrar',
  imports: [ReactiveFormsModule, 
            CommonModule],
  templateUrl: './cadastrar.html',
  styleUrl: './cadastrar.css'
})
export class Cadastrar implements OnInit {
  formHeroi: FormGroup;
  superpoderes: SuperPoder[] = [];

  constructor(private fb: FormBuilder, private service: HeroiService) {
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

  onCheckboxChange(event: any, poder: SuperPoder) {
    const superpoderesArray: FormArray = this.formHeroi.get('superpoderes') as FormArray;
    if (event.target.checked) {
      superpoderesArray.push(this.fb.control(poder.id));
    } else {
      const index = superpoderesArray.controls.findIndex(x => x.value === poder.id);
      superpoderesArray.removeAt(index);
    }
  }

  onSubmit() {
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
        superpoderes
      };

      this.service.cadastrarHeroi(dados).subscribe({
        next: () => {
          alert('Herói cadastrado com sucesso!');
          this.formHeroi.reset();
        },
        error: () => alert('Erro ao cadastrar herói!')
      });
    }
  }

}
