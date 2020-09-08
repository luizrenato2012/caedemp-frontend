import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { PanelModule } from 'primeng/panel';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';

import { ListagemRoutingModule } from './listagem-routing.module';
import { ListagemComponent } from './listagem.component';
import { ConfirmationService } from 'primeng/api';

@NgModule({
  declarations: [
    ListagemComponent
  ],
  imports: [
    CommonModule,
    ConfirmDialogModule,
    FormsModule,
    // ReactiveFormsModule,
    ButtonModule,
    DropdownModule,
    PanelModule,
    InputMaskModule,
    InputTextModule,
    TableModule,
    ToastModule,
    ListagemRoutingModule
  ],
  providers: [ConfirmationService]
})
export class ListagemModule {

}