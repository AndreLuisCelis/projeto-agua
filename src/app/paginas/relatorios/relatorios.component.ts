import { AppService } from '../../app.service';
import { Component, Input, OnInit } from '@angular/core';
import { WaterUse } from 'src/app/models/water-use';

@Component({
  selector: 'app-relatorios',
  templateUrl: './relatorios.component.html',
  styleUrls: ['./relatorios.component.scss']
})
export class RelatoriosComponent implements OnInit {

  dados:WaterUse[] =[]

  constructor(
    private service: AppService
  ) { }

  ngOnInit(): void {
    this.service.getWaterUse().subscribe( (res:any) => {
      this.dados = res.waterUse as WaterUse[];
    })
  }

exportarExcel(tabela:Element , local:string){
  var a = document.createElement('a');
  var data_type = 'data:application/vnd.ms-excel';
  var table_div = tabela
  var table_html = table_div.outerHTML.replace(/ /g, '%20');
  let filename =  local.replace(/ /g,'-');
  a.href = data_type + ', ' + table_html;
  a.download = `${filename}.xls`;
  a.click();
}

}
