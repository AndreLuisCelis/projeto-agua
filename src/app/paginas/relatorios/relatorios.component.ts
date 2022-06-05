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

  exportToExcel(tabela:Element) {
    let htmltable = document.querySelector('.relatorios')as Element;
    let html = tabela.outerHTML;
    window.open('data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, ' + encodeURIComponent(html));
}

}
