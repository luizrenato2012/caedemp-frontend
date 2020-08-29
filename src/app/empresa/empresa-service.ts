import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Empresa } from './empresa';
import { Observable } from 'rxjs';
import { query } from '@angular/animations';

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

  pesquisa(argumentos: any) {
    return this.httpClient.get(URL + this.getQueryString(argumentos));
  }

  private getQueryString(argumentos: any) {
    let queryString = '';
    let keysValidas = Object.keys(argumentos).filter(key => argumentos[key] !== '');
    if (!keysValidas || keysValidas.length == 0) {
      return "";
    }
    keysValidas.forEach(key => queryString += `${key}=` + argumentos[key] + '&');
    if (keysValidas.length == 1) {
      queryString = queryString.replace('&', '');
    } else {
      queryString = queryString.substr(0, queryString.length - 1);
    }
    queryString = `?${queryString}`;
    return queryString;
  }

  listaMatriz(): Observable<Empresa[]> {
    return this.httpClient.get<Empresa[]>(`${URL} ? tipo = matriz`);
  }

  delete(id: number) {
    return this.httpClient.delete(`${URL} / ${id}`);
  }

  set empresaEdicao(empresa: Empresa) {
    this.empresa = empresa;
  }

  get empresaEdicao() {
    return this.empresa;
  }
}