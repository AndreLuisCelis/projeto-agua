import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AppService } from '../../app.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit {
  formCadastro = this.formBuild.group({
    nome:['',[Validators.required]],
    email:['',[Validators.required,Validators.email]],
    password:['',Validators.required],
    confirmPassword:['',Validators.required]
  })
  hidePassword = true;
  hideConfirmPassword = true;

  constructor(
    private router:Router,
    private appService: AppService,
    private formBuild: FormBuilder,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  cadastrar(){
    this.verificarSenhaSaoIguais();
    this.markAllControlTouched();
    if(this.formCadastro.valid){
      this.snackBar.open(
        `Usuário ${this.formCadastro.get('nome')?.value} cadastrado com sucesso`,
         'OK',
         {duration:3000, verticalPosition:'top',horizontalPosition:'right'}
         );
      setTimeout(() => {
        this.router.navigate(['/','login'])
      }, 2000);
    }
  }

  verificarSenhaSaoIguais(){
    let senha:string  = this.formCadastro.get('password')?.value;
    let confirmacaoSenha: string = this.formCadastro.get('confirmPassword')?.value;
    if(senha != confirmacaoSenha) {
      this.formCadastro.get('confirmPassword')?.setErrors({diferente:true})
    } else if(this.formCadastro.get('confirmPassword')?.hasError('diferente')) {
      this.formCadastro.get('confirmPassword')?.setErrors({diferente:false})
    }
  }

  markAllControlTouched(){
    this.formCadastro.get('nome')?.markAllAsTouched();
    this.formCadastro.get('email')?.markAllAsTouched();
    this.formCadastro.get('password')?.markAllAsTouched();
    this.formCadastro.get('confirmPassword')?.markAllAsTouched();
  }
  getErrorMessage(campo:string) {
    if(campo == 'email') {
      if (this.formCadastro.get('email')?.hasError('required')) {
        return 'Email é obrigatório.';
      }
      return this.formCadastro.get('email')?.hasError('email') ? 'Não é um email valido' : '';
    }

    if (campo == 'nome') {
      if (this.formCadastro.get('nome')?.hasError('required')) {
        return 'Nome é obrigatório.'
      }
    }

    if (campo =='password'){
      if(this.formCadastro.get('password')?.hasError('required')){
        return 'Senha é obrigatório.'
      }
    }

    if (campo == 'confirmPassword'){
      if(this.formCadastro.get('confirmPassword')?.hasError('required')){
        return 'Confirmação da senha é obrigatório.'
      } else {
        return this.formCadastro.get('confirmPassword')?.hasError('diferente')?'Senhas diferentes':'';
      }
    }
    return '';
  }

}
