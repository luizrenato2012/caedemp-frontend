import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Empresa } from '../empresa';
import { EmpresaService } from '../empresa-service';

@Injectable({
  providedIn: "root"
})
export class EmpresaEdicaoResolve implements Resolve<Empresa> {

  constructor(private service: EmpresaService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Empresa {
    return this.service.empresaEdicao;
  }

}