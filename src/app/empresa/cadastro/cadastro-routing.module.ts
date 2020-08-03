import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CadastroComponent } from './cadastro.component';
import { CadastroResolve } from './cadastro.resolve';
import { EmpresaEdicaoResolve } from './empresa-edicao.resolve';

const routes: Routes = [
  {
    path: '',
    component: CadastroComponent,
    resolve: {
      listaMatriz: CadastroResolve,
      empresaEdicao: EmpresaEdicaoResolve
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CadastroRoutingModule { }