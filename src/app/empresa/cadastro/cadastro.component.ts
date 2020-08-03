import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, MaxLengthValidator } from '@angular/forms';

import { CnpjValidator } from './cnpj-validator';
import { CepService } from '../cep-service';
import { Empresa, Endereco } from '../empresa';
import { RespostaBuscaCep } from './resposta-busca-cep';
import { EmpresaService } from '../empresa-service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./style/cadastro.component.scss'],
})
export class CadastroComponent implements OnInit {
  tipoSelecionado: string;
  tiposEmpresa: any[];
  mensagens: any[];


  formEmpresa: FormGroup;
  isShowDialog = false;
  idMatrizSelecionada = 0;
  listaMatriz = [];

  empresaEdicao: Empresa;

  constructor(private formBuilder: FormBuilder,
    private cepService: CepService,
    private empresaService: EmpresaService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.initEmpresa();
    this.initValues();
    this.initForm();
    this.initMatriz();
  }

  private initEmpresa() {
    this.empresaEdicao =
      this.activatedRoute.snapshot.data.empresaEdicao || null;
  }

  private initValues() {
    this.tipoSelecionado = '';
    this.tiposEmpresa = [
      { label: 'Esolha um tipo', value: '' },
      { label: 'Filial', value: 'FILIAL' },
      { label: 'Matriz', value: 'MATRIZ' }
    ];
  }

  private initForm() {
    this.formEmpresa = this.formBuilder.group({
      'cnpj': ['', [Validators.required, Validators.maxLength(14)]],
      'tipo': ['', [Validators.required]],
      'nome': ['', [Validators.required, Validators.maxLength(50)]],
      'razaoSocial': ['', [Validators.required, Validators.maxLength(40)]],
      'contato': ['', [Validators.required, Validators.maxLength(40)]],
      'email': ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$'), Validators.maxLength(40)]],
      'cep': ['', [Validators.required, Validators.maxLength(40)]],
      'estado': ['', [Validators.required, Validators.maxLength(40)]],
      'bairro': ['', [Validators.required, Validators.maxLength(40)]],
      'cidade': ['', [Validators.required, Validators.maxLength(40)]],
      'logradouro': ['', [Validators.required, Validators.maxLength(40)]],
      'complemento': [],
      'idMatriz': [],
      'id': []
    });

    if (this.empresaEdicao) {
      this.fillEdits();
    }
    this.initTipoEmpresa();
  }

  private fillEdits() {
    this.formEmpresa.get('cnpj').setValue(this.empresaEdicao.cnpj);
    this.formEmpresa.get('tipo').setValue(this.empresaEdicao.tipo);
    this.formEmpresa.get('nome').setValue(this.empresaEdicao.nome);
    this.formEmpresa.get('razaoSocial').setValue(this.empresaEdicao.razaoSocial);
    this.formEmpresa.get('contato').setValue(this.empresaEdicao.contato);
    this.formEmpresa.get('email').setValue(this.empresaEdicao.email);
    this.formEmpresa.get('cep').setValue(this.empresaEdicao.endereco.cep);
    this.formEmpresa.get('estado').setValue(this.empresaEdicao.endereco.estado);
    this.formEmpresa.get('bairro').setValue(this.empresaEdicao.endereco.bairro);
    this.formEmpresa.get('cidade').setValue(this.empresaEdicao.endereco.cidade);
    this.formEmpresa.get('logradouro').setValue(this.empresaEdicao.endereco.logradouro);
    this.formEmpresa.get('complemento').setValue(this.empresaEdicao.endereco.complemento);
    this.formEmpresa.get('idMatriz').setValue(this.empresaEdicao.idMatriz);
    this.formEmpresa.get('id').setValue(this.empresaEdicao.id);
  }

  private initTipoEmpresa() {
    this.formEmpresa.get('tipo').valueChanges
      .subscribe(value => {
        if (!value || value === 'MATRIZ') {
          this.formEmpresa.get('idMatriz').setValue(null);
          return;
        }

        if (value && value === 'FILIAL') {
          this.showDialog();
          return;
        }
      });
  }

  initMatriz() {
    this.listaMatriz = this.activatedRoute.snapshot.data.listaMatriz;
  }

  onSave() {
    const cnpj = this.formEmpresa.get('cnpj').value;
    if (!CnpjValidator.isValido(cnpj)) {
      this.showMensagemErro('CNPJ inválido.');
      return;
    }

    if (this.formEmpresa.invalid) {
      this.showMensagemErro('Preencha todos os dados.');
      return;
    }
    let empresa = this.getEmpresa();
    this.saveEmpresa(empresa);
  }

  private saveEmpresa(empresa) {
    this.empresaService.save(empresa).subscribe(response => {
      this.showMensagemInfo('Empresa incluída com sucesso!');
      this.formEmpresa.reset();
    }, error => {
      console.error(error);
      this.showMensagemErro('Erro ao incluir empresa');
    })
  }

  private getEmpresa(): Empresa {
    let endereco: Endereco;
    endereco = {
      bairro: this.formEmpresa.get('bairro').value,
      cep: this.formEmpresa.get('cep').value,
      complemento: this.formEmpresa.get('complemento').value,
      logradouro: this.formEmpresa.get('logradouro').value,
      estado: this.formEmpresa.get('estado').value,
      cidade: this.formEmpresa.get('cidade').value
    }
    return {
      'cnpj': this.formEmpresa.get('cnpj').value,
      'contato': this.formEmpresa.get('contato').value,
      'email': this.formEmpresa.get('email').value,
      'nome': this.formEmpresa.get('nome').value,
      'razaoSocial': this.formEmpresa.get('razaoSocial').value,
      'tipo': this.formEmpresa.get('tipo').value,
      'idMatriz': this.formEmpresa.get('idMatriz').value,
      'endereco': endereco,

    }

  }

  onFindCep() {
    const NOT_FOUND = 404;
    this.hideMensagem();
    this.deleteEndereco();
    const cep = this.formEmpresa.get('cep').value;
    if (!cep) {
      console.log('Digite um CEP válido');
      this.showMensagemErro('Digite uma CEP válido');
    }
    this.cepService.busca(cep).subscribe(response => {
      let endereco = response;
      this.fillEndereco(endereco);
    }, error => {
      console.error(error);
      this.showMensagemErro(error.status == NOT_FOUND ? 'CEP não encontrado' :
        'Erro ao pesquisar CEP');
    }
    );
  }

  deleteEndereco() {
    this.formEmpresa.get('estado').setValue('');
    this.formEmpresa.get('bairro').setValue('');
    this.formEmpresa.get('cidade').setValue('');
    this.formEmpresa.get('logradouro').setValue('');
    this.formEmpresa.get('complemento').setValue('');
  }

  private fillEndereco(respostaCep: RespostaBuscaCep) {
    this.formEmpresa.get('estado').setValue(respostaCep.uf);
    this.formEmpresa.get('bairro').setValue(respostaCep.bairro);
    this.formEmpresa.get('cidade').setValue(respostaCep.localidade);
    this.formEmpresa.get('logradouro').setValue(respostaCep.logradouro);
    this.formEmpresa.get('complemento').setValue(respostaCep.complemento);
  }

  showDialog() {
    this.isShowDialog = true;
  }

  get email() {
    return this.formEmpresa.get('email');
  }

  showMensagemErro(texto: string) {
    this.hideMensagem();
    this.mensagens.push({ severity: 'error', summary: 'Erro', detail: texto });
  }

  showMensagemInfo(texto: string) {
    this.hideMensagem();
    this.mensagens.push({ severity: 'info', summary: 'Informação', detail: texto });
  }

  hideMensagem() {
    this.mensagens = [];
  }

  onListaMatriz() {
    this.empresaService.listaMatriz()
      .subscribe((response: Empresa[]) => {
        let matrizes = response.map(empresa => {
          return { id: empresa.id, nome: empresa.nome }
        });

      }, error => console.error(error));
  }

  setMatriz(id) {
    event.preventDefault();
    this.idMatrizSelecionada = id;
    this.formEmpresa.get('idMatriz').setValue(id);
    this.isShowDialog = false;
  }

  closeDialog() {
    this.formEmpresa.get('idMatriz').setValue(null);
    this.formEmpresa.get('tipo').setValue('');
    this.isShowDialog = false;
  }

}
