import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Projeto Água';
  usuarioEstaLogado = this.appService.verificarUsuarioEstaLogado();;

  constructor(
     private router:Router,
     private appService: AppService
     ){}

  ngOnInit() {
    console.log(this.usuarioEstaLogado)
    if (!this.usuarioEstaLogado) {
      console.log('Não')
      // this.router.navigate(['/','login'])
    }
  }

}
