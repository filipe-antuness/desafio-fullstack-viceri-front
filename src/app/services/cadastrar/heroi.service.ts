import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SuperPoder } from '../../models/superpoder.model';
import { Heroi } from '../../models/heroi.model';

@Injectable({
  providedIn: 'root'
})
export class HeroiService {
  url: string = 'http://localhost:8080/herois/';
  urlSuperPoderes: string = 'http://localhost:8080/superpoder/listar';

  constructor(private http: HttpClient) { }

  buscarSuperPoderes() {
    return this.http.get<SuperPoder[]>(this.urlSuperPoderes);
  }

  cadastrarHeroi(heroi: any) {
    return this.http.post(this.url+"cadastrar", heroi);
  }

  listarHerois() {
    return this.http.get<Heroi[]>(this.url+"listar");
  }

  consultarHeroiPorId(id: number) {
    return this.http.get<Heroi>(this.url+'buscar/' + id);
  }

  atualizarHeroi(heroi: Heroi, idsSuperpoderes: number[]) {
    const ids = idsSuperpoderes.join(',');
    const url = `${this.url}atualizar/${heroi.id}?idsSuperpoderes=${ids}`;
    return this.http.put(url, heroi);
  }

  excluirHeroi(id: number) {
    return this.http.delete(`${this.url}deletar/${id}`);
  }
}
