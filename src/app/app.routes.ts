import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Cadastrar } from './components/cadastrar/cadastrar';
import { Listar } from './components/listar/listar';
import { Consultar } from './components/consultar/consultar';
import { Atualizar } from './components/atualizar/atualizar';
import { Excluir } from './components/excluir/excluir';

export const routes: Routes = [
    {
        path: "",
        component: Home
    },
    {
        path: "home",
        component: Home
    },
    {
        path: "cadastrar",
        component: Cadastrar
    },
    {
        path: "listar",
        component: Listar
    },
    {
        path: "consultar",
        component: Consultar
    },
    {
        path: "atualizar",
        component: Atualizar
    },
    {
        path: "excluir",
        component: Excluir
    }
];
