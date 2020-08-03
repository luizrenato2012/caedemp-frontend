import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { ListagemComponent } from './listagem.component';

const routes: Routes = [
  {
    path: '',
    component: ListagemComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListagemRoutingModule { }