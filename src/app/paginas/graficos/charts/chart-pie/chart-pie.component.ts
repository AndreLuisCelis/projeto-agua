import { Component, Inject, Input, NgZone, OnInit, PLATFORM_ID } from '@angular/core';
import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";
import { WaterUse } from 'src/app/models/water-use';
import { isPlatformBrowser } from '@angular/common';
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import am5themes_Micro from "@amcharts/amcharts5/themes/Micro";

@Component({
  selector: 'app-chart-pie',
  templateUrl: './chart-pie.component.html',
  styleUrls: ['./chart-pie.component.scss']
})
export class ChartPieComponent implements OnInit {

  private root!: am5.Root;
  @Input() data!: WaterUse[];
  @Input() title !: string;
  @Input() subTitle !: string;
  @Input() field !: string;
  @Input() serieName !: string;
  @Input() chartDiv !: string;

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private zone: NgZone,
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.generateChartPie();
    }, 1000);

  }

  generateChartPie() {
    // Create root and chart
    let root = am5.Root.new(this.chartDiv);
    let chart = root.container.children.push(
      am5percent.PieChart.new(root, {
        layout: root.verticalLayout
      })
    );
    // Define data
    let data = this.data;

    // Create series
    let series = chart.series.push(
      am5percent.PieSeries.new(root, {
        name: this.serieName,
        valueField: this.field,
        categoryField: "local"
      })
    );
    series.data.setAll(data);

    // Add legend
    let legend = chart.children.push(am5.Legend.new(root, {
      centerX: am5.percent(50),
      x: am5.percent(50),
      layout: root.horizontalLayout
    }));

    legend.data.setAll(series.dataItems);
  }


  // Run the function only in the browser
  browserOnly(f: () => void) {
    if (isPlatformBrowser(this.platformId)) {
      this.zone.runOutsideAngular(() => {
        f();
      });
    }
  }

  ngOnDestroy() {
    // Clean up chart when the component is removed
    this.browserOnly(() => {
      if (this.root) {
        this.root.dispose();
      }
    });
  }


}
