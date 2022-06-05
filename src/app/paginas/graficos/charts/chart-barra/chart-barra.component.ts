import { AppService } from './../../../../app.service';
import { WaterUse } from 'src/app/models/water-use';
import { Component, Inject, Input, NgZone, OnInit, PLATFORM_ID } from '@angular/core';
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-chart-barra',
  templateUrl: './chart-barra.component.html',
  styleUrls: ['./chart-barra.component.scss']
})
export class ChartBarraComponent implements OnInit {

  @Input()data!: WaterUse[];

  private root!: am5.Root;
  constructor(
    @Inject(PLATFORM_ID) private platformId:any,
     private zone: NgZone,
     ) { }

  // Run the function only in the browser
  browserOnly(f: () => void) {
    if (isPlatformBrowser(this.platformId)) {
      this.zone.runOutsideAngular(() => {
        f();
      });
    }
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.browserOnly( ()=> {
        this.generateChart();
      })
    }, 1000);


  }

  generateChart() {
    // Create root and chart
    let root = am5.Root.new("chartdiv");
    let chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panY: false,
        layout: root.verticalLayout
      })
    );

    // Define data
    let data = this.data;

    // Create Y-axis
    let yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {})
      })
    );

    // Create X-Axis
    let xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        renderer: am5xy.AxisRendererX.new(root, {}),
        categoryField: "local"
      })
    );
    xAxis.data.setAll(data);

    // Create series
    let series1 = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: "Volume",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "volume",
        categoryXField: "local"
      })
    );

    series1.columns.template.setAll({
      tooltipText: "{categoryX} volume : {valueY}"
    });
    series1.data.setAll(data);

    let series2 = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: "Volume Total",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "volumeTotal",
        categoryXField: "local",
      })
    );
    series2.columns.template.setAll({
      tooltipText: "{categoryX} volume total: {valueY}"
    });
    series2.data.setAll(data);

    // Add legend
    let legend = chart.children.push(am5.Legend.new(root, {
      centerX: am5.percent(50),
      x: am5.percent(50),
      layout: root.horizontalLayout
    }));
    legend.data.setAll(chart.series.values);

    // Add cursor
    chart.set("cursor", am5xy.XYCursor.new(root, {
    }));
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
