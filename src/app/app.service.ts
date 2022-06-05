import { AuthenticationService } from './authentication.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  usuarioEstaLogado =  false;

  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService
  ) {
    const currentUser = this.authenticationService?.currentUserValue;
    const isLoggedIn = currentUser && currentUser.token;
    this.usuarioEstaLogado = isLoggedIn;
   }

  verificarUsuarioEstaLogado(){
    return this.usuarioEstaLogado
  }

  getWaterUse(){
   return this.http.get(`${environment.apiUrl}/api/read`);
  }



}
