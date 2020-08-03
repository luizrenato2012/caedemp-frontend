import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-teste',
  templateUrl: './teste.component.html',
  styleUrls: ['./teste.component.scss']
})
export class TesteComponent implements OnInit {

  isVisible: false;
  tipoSelecionado: string;
  tiposEmpresa: any[];

  constructor() { }

  ngOnInit(): void {
    this.tipoSelecionado = '';
    this.tiposEmpresa = [
      { label: 'Filial', value: 'FILIAL' },
      { label: 'Matriz', value: 'MATRIZ' }
    ];
  }

  testa() {
    console.log('Testando');
  }

}
