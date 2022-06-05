import { WaterUse } from 'src/app/models/water-use';
import { AppService } from '../../app.service';
import { Component, Input, OnInit } from '@angular/core';




@Component({
  selector: 'app-graficos',
  templateUrl: './graficos.component.html',
  styleUrls: ['./graficos.component.scss']
})

export class GraficosComponent implements OnInit {

  dados:WaterUse[] =[] ;

  constructor(
    private service: AppService
  ) {
    this.getWaterUse();
   }

  ngOnInit(): void {
  }

  async getWaterUse(){
    let res:any = await this.service.getWaterUse().toPromise();
    this.dados = res.waterUse as WaterUse[];
  }

}
