import { AppService } from '../../app.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../authentication.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);
  hide = true;

  constructor(
    private authenticationService : AuthenticationService,
    private router:Router,
    private appService: AppService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  logar(){
    if(this.email.valid && this.password.valid) {
      let config : MatSnackBarConfig = new MatSnackBarConfig();
        config.duration=3000;
      this.authenticationService.login(this.email.value, this.password.value).
      subscribe( res => {
        this.appService.usuarioEstaLogado = true;
        this.snackBar.open( ` Bem vindo ${res.user.name}` , 'OK',config);
        this.router.navigate(['/'])
      } ,
      err => this.snackBar.open( `Usuário ou senha invalidos` , 'error',config))
      return;
    } else {
      this.email.markAsTouched();
      this.password.markAllAsTouched();
    }
  }

  cadastrar(){
    this.router.navigate(['/','cadastrar'])
  }

  get errorMessage() {
    if (this.email.hasError('required')) {
      return 'Campo obrigatório';
    }

    if (this.password.hasError('required')){
      return 'Campo  obrigatório';
    }

    return this.email.hasError('email') ? 'Não é um email valido' : '';
  }

  hidem(event:Event){
    event.preventDefault();
    this.hide = !this.hide;
  }

}
