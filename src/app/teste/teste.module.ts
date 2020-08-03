import { NgModule } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { TesteComponent } from './teste/teste.component';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
  imports: [InputTextModule, ButtonModule, DropdownModule],
  declarations: [TesteComponent],
  exports: [TesteComponent]
})
export class TesteModule {

}