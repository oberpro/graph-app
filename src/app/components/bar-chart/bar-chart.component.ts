import { Component, OnInit, Input, ElementRef, AfterContentInit, ViewChild } from '@angular/core';
import { IfBarChartData } from 'app/data/if-bar-chart-data';
import { IfData } from 'app/data/if-data';
import { IfDataset } from 'app/data/if-dataset';
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit, AfterViewInit {
  private data: IfBarChartData = null;
  chartGenerated: boolean = false;

  //yAXIS
  yAxisTitle: string = "Y TITLE";
  height: number = 100;//DEFAULT HEIGHT
  heightOfYAxis: number = 0;
  private heightOffset: number = 5;
  heightOfText: number = 25;
  private yAxisFactor: number = 1;
  private yAxisLabels: { value: number, y: number, title: string }[] = [];
  left: number = 25;//DEFAULT VALUE -> depends on the max length of the max. yAxisValue
  private widthOfCharacter: number = 6.5;

  //xAxis
  width: number = 100;//DEFAULT WIDTH
  xAxisTitle: string = "X TITLE";
  private xAxisLabels: { value: number, x: number, title: string }[] = [];

  //CHART BOX for height and width calculation
  @ViewChild("chart") chart: ElementRef;

  @Input("value") set changeValue(value: IfBarChartData) {
    if (value != null) {
      this.data = value;
      this.generateChart();
    }
  }
  constructor() {
  }

  ngOnInit() {
  }


  ngAfterViewInit(): void {
    setTimeout(() => {
      if (this.chart) {
        let node: HTMLElement = this.chart.nativeElement;
        let boundaryRect: any = node.getBoundingClientRect();
        this.height = boundaryRect.height;
        this.heightOfYAxis = this.height - 50;
        this.width = boundaryRect.width;
        this.generateChart();
      }
    }, 1);
  }

  generateChart() {
    this.chartGenerated = false;
    let yMinValue: number = 0;
    let yMaxValue: number = 0;
    if (this.data) {
      //Get max y Value
      this.data.dataset.forEach(set => {
        set.values.forEach(v => {
          if (v.y > yMaxValue) {
            yMaxValue = v.y;
          }
        });
      });
      //Define y Axis scala
      let yAxisRange: number = yMaxValue - yMinValue;
      let yAxisFittingItems: number = Math.ceil((this.heightOfYAxis - this.heightOffset) / this.heightOfText);
      //create y Axis Scala
      this.yAxisLabels = [];
      this.left = this.data.yAxisTitle.length * this.widthOfCharacter;
      let yAxisMaxLeftDisatance = this.left;
      let yAxisStep: number = Math.max(Math.ceil(yAxisRange / yAxisFittingItems), 1);
      this.yAxisFactor = Math.round((this.heightOfYAxis - this.heightOffset) / Math.min(yAxisFittingItems, Math.ceil(yAxisRange / yAxisStep) + 1) / this.heightOfText * 10) / 10;
      for (let y = 0; y < Math.min(yAxisFittingItems, Math.ceil(yAxisRange / yAxisStep) + 1); y++) {
        let value: number = Math.ceil(yAxisStep * y);
        let title: string = value + "";
        if (title.length * this.widthOfCharacter > yAxisMaxLeftDisatance) {
          yAxisMaxLeftDisatance = title.length * this.widthOfCharacter;
        }
        this.yAxisLabels.push({ value: value, y: (this.heightOfYAxis - this.heightOffset) - (y * this.heightOfText * this.yAxisFactor), title: title });
      }
      this.left += yAxisMaxLeftDisatance;
      //DONE
      this.chartGenerated = true;
    }
  }

  getYAxisLabels(): { value: number, y: number, title: string }[] {
    if (this.chartGenerated) {
      return this.yAxisLabels;
    }
    return [];
  }

  getXAxisLabels(): { value: number, x: number, title: string }[] {
    if (this.chartGenerated) {
      return this.xAxisLabels;
    }
    return [];
  }

  amountOfDataSets(): number {
    return this.data.dataset.length;
  }

}
