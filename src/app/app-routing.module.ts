import { CadastroComponent } from './paginas/cadastro/cadastro.component';
import { SobreComponent } from './paginas/sobre/sobre.component';
import { RelatoriosComponent } from './paginas/relatorios/relatorios.component';
import { GraficosComponent } from './paginas/graficos/graficos.component';
import { LoginComponent } from './paginas/login/login.component';
import { DashboardComponent } from './paginas/dashboard/dashboard.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {
    path:'dashboard',
    component: DashboardComponent,
    children:[
      {path:'', redirectTo: 'graficos', pathMatch: 'full'},
      {path:'graficos', component:GraficosComponent},
      {path:'relatorios', component: RelatoriosComponent},
      {path: 'sobre', component: SobreComponent}
    ]},

  {path:'login', component: LoginComponent},
  {path:'cadastrar', component: CadastroComponent},
  {path:'relatorios', component:RelatoriosComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
