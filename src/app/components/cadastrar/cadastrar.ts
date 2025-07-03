import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-cadastrar',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './cadastrar.html',
  styleUrl: './cadastrar.css'
})
export class Cadastrar implements OnInit {
  formHeroi: FormGroup;
  superpoderes: string[] = ['Teste'];

  constructor(private fb: FormBuilder) {
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
    // Simule a busca dos superpoderes do backend
    // Substitua por chamada real ao serviço quando disponível
    this.superpoderes = ['Voo', 'Super Força', 'Invisibilidade', 'Telepatia', 'Velocidade'];
  }

  onCheckboxChange(event: any) {
    const superpoderesArray: FormArray = this.formHeroi.get('superpoderes') as FormArray;
    if (event.target.checked) {
      superpoderesArray.push(this.fb.control(event.target.value));
    } else {
      const index = superpoderesArray.controls.findIndex(x => x.value === event.target.value);
      superpoderesArray.removeAt(index);
    }
  }

  onSubmit() {
    if (this.formHeroi.valid) {
      console.log(this.formHeroi.value);
      // Aqui você pode enviar os dados para o backend ou fazer outra ação
      alert('Herói cadastrado com sucesso!');
      this.formHeroi.reset();
    }
  }
}
