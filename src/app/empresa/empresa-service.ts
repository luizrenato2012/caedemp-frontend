import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Empresa } from './empresa';
import { Observable } from 'rxjs';

const URL = 'http://localhost:8080/empresas';
@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  private empresa: Empresa;
  constructor(private httpClient: HttpClient) { }

  save(empresa: Empresa) {
    if (empresa.id) {
      return this.httpClient.put(URL, empresa);
    }
    return this.httpClient.post(URL, empresa);
  }

  pesquisa(cnpj: string, nome: string, tipo: string) {
    return this.httpClient.get(URL);
  }

  listaMatriz(): Observable<Empresa[]> {
    return this.httpClient.get<Empresa[]>(`${URL}?tipo=matriz`);
  }

  delete(id: number) {
    return this.httpClient.delete(`${URL}/${id}`);
  }

  set empresaEdicao(empresa: Empresa) {
    this.empresa = empresa;
  }

  get empresaEdicao() {
    return this.empresa;
  }
}