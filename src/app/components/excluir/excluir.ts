import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HeroiService } from '../../services/cadastrar/heroi.service';

@Component({
  selector: 'app-excluir',
  imports: [ReactiveFormsModule],
  templateUrl: './excluir.html',
  styleUrl: './excluir.css'
})
export class Excluir {

  formExcluir: FormGroup;

  constructor(private fb: FormBuilder, private service: HeroiService) {
    this.formExcluir = this.fb.group({
      id: ['', Validators.required]
    });
  }

  onSubmit() {
  const id = this.formExcluir.value.id;
  this.service.excluirHeroi(id).subscribe({
    next: () => {
      this.formExcluir.reset();
      alert('Herói excluído com sucesso!')
    },
    error: () => alert('Erro ao excluir herói!')
  });
}

}
