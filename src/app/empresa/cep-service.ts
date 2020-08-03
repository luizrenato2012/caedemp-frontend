import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RespostaBuscaCep } from './cadastro/resposta-busca-cep';

const URL_CEP = 'http://localhost:8080/enderecos/cep';
@Injectable({
  providedIn: 'root'
})
export class CepService {

  constructor(private httpClient: HttpClient) { }

  busca(cep: string): Observable<RespostaBuscaCep> {
    return this.httpClient.get<RespostaBuscaCep>(`${URL_CEP}/${cep}`);
  }

}