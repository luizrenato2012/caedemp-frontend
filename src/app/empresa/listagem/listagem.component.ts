import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmpresaService } from '../empresa-service';
import { ConfirmationService, MessageService, LazyLoadEvent } from 'primeng/api';
import { Empresa } from '../empresa';
import { Router } from '@angular/router';
import { FiltroEmpresa } from './filtro-empresa';

@Component({
  selector: 'app-listagem',
  templateUrl: './listagem.component.html',
  styleUrls: ['./listagem.component.scss']
})
export class ListagemComponent implements OnInit {

  tiposEmpresa: any[];
  registros: Registro[];
  totalRegistros: number;
  filtroEmpresa: FiltroEmpresa;

  constructor(private empresaService: EmpresaService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.initForm();
    this.initRows();
  }

  private initForm() {
    this.filtroEmpresa = new FiltroEmpresa();
    this.tiposEmpresa = [
      { label: 'Todos', value: '' },
      { label: 'Filial', value: 'FILIAL' },
      { label: 'Matriz', value: 'MATRIZ' }
    ];
  }

  private initRows() {
    this.registros = [];
    this.totalRegistros = this.registros.length;
  }

  onFind() {
    this.empresaService.pesquisa(this.filtroEmpresa)
      .subscribe(({ content, totalElements }: any) => {
        this.registros = content as Registro[];
        this.totalRegistros = totalElements;
      }, error => {
        console.error(error);
        this.showMessage('Erro ao pesquisar', 'error');
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

  onChangePage(event: LazyLoadEvent) {
    const paginaAtual = event.first / event.rows;
    this.filtroEmpresa.page = paginaAtual;
    this.onFind();
  }
}

export interface Registro {
  id: number;
  nome: string;
  cnpj: string;
  tipo: string;
}