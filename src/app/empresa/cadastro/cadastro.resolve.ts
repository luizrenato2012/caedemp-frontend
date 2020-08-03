import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { EmpresaService } from '../empresa-service';
import { Empresa } from '../empresa';

@Injectable({
  providedIn: "root"
})
export class CadastroResolve implements Resolve<Observable<Empresa[]>>{

  constructor(private service: EmpresaService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Empresa[]> {
    return this.service.listaMatriz();
  }
}
