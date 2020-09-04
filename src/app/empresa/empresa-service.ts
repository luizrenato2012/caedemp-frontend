import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { Empresa } from './empresa';
import { Observable } from 'rxjs';
import { query } from '@angular/animations';
import { FiltroEmpresa } from './listagem/filtro-empresa';

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

  pesquisa(filtro: FiltroEmpresa) {
    const queryString = this.getQueryString(filtro);
    return this.httpClient.get(`${URL}?${queryString}`)
      .pipe(
        map(({ content, totalElements }: any) => {
          return { content, totalElements }
        })
      );
  }

  private getQueryString(filtro: FiltroEmpresa) {
    let params = new HttpParams();
    let keysValidas = Object.keys(filtro).filter(key => filtro[key] !== '');
    keysValidas.forEach(key => params = params.set(key, filtro[key]));
    return params.toString();
  }

  listaMatriz(): Observable<Empresa[]> {
    return this.httpClient.get<Empresa[]>(`${URL}?tipo=matriz`)
      .pipe(
        map((response: any) => response.content)
      );
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