import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmpresaService } from '../empresa-service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Empresa } from '../empresa';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listagem',
  templateUrl: './listagem.component.html',
  styleUrls: ['./listagem.component.scss']
})
export class ListagemComponent implements OnInit {

  formPesquisa: FormGroup;
  tiposEmpresa: any[];
  registros: Registro[];
  total: number;

  constructor(private formBuilder: FormBuilder,
    private empresaService: EmpresaService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.initForm();
    this.tiposEmpresa = [
      { label: 'Todos', value: '' },
      { label: 'Filial', value: 'FILIAL' },
      { label: 'Matriz', value: 'MATRIZ' }
    ];
    this.registros = [];
    this.total = this.registros.length;
  }

  private initForm() {
    this.formPesquisa = this.formBuilder.group({
      'cnpj': ['', [Validators.maxLength(14)]],
      'tipo': ['', [Validators.maxLength(10)]],
      'nome': [''],
    });
  }

  onFind() {
    let cnpj = this.formPesquisa.get('cnpj').value;
    let nome = this.formPesquisa.get('nome').value;
    let tipo = this.formPesquisa.get('tipo').value;
    this.empresaService.pesquisa(cnpj, nome, tipo)
      .subscribe(response => {
        this.registros = response as Registro[];
      }, error => {
        console.error(error);
      })
  }

  onDelete(id: number) {
    let registro = this.registros.find(registro => registro.id === id);
    if (registro.tipo === 'MATRIZ') {
      this.showMessage('Empresa matriz não poderá ser excluída', 'warn');
      return;
    }

    this.confirmationService.confirm({
      message: 'Confirma a exclusão da empresa?',
      accept: () => {
        this.deleleEmpresa(id);
      }
    });
  }

  private deleleEmpresa(id: number) {
    this.empresaService.delete(id)
      .subscribe(response => {
        this.showMessage('Registro excluído com sucesso', 'success');
        this.onFind();
      },
        error => {
          console.error(error);
          this.showMessage('Registro exxcluído com sucesso', 'error');
        });
  }

  onEditar(registro: Empresa) {
    this.empresaService.empresaEdicao = registro;
    this.router.navigate(['cadastro']);
  }

  onAdd() {
    this.empresaService.empresaEdicao = null;
    this.router.navigate(['cadastro']);
  }

  showMessage(mensagem: string, tipo: string) {
    this.messageService.add({
      severity: tipo,
      summary: 'Listagem de Empresasa', detail: mensagem
    });
  }
}



export interface Registro {
  id: number;
  nome: string;
  cnpj: string;
  tipo: string;
}