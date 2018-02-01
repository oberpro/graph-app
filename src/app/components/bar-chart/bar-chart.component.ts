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
  yAxisPercentage: number = 0;
  yAxisStep: number = 1;
  private heightOffset: number = 5;
  heightOfText: number = 25;
  private yAxisFactor: number = 1;
  private yAxisLabels: { value: number, y: number, title: string }[] = [];
  private yAxisTicks: { y: number }[] = [];
  left: number = 25;//DEFAULT VALUE -> depends on the max length of the max. yAxisValue
  private widthOfCharacter: number = 6.5;

  //xAxis
  width: number = 100;//DEFAULT WIDTH
  widthOfXAxis: number = 100;
  widthOfItem: number = 0;
  xAxisTitle: string = "X TITLE";
  private xAxisLabels: { value: number, x: number, title: string }[] = [];
  private xAxisTicks: { x: number }[] = [];
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
        this.widthOfXAxis = this.width - 50;
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
      this.yAxisTicks = [];
      this.left = this.data.yAxisTitle.length * this.widthOfCharacter;
      let yAxisMaxLeftDisatance = this.left;
      this.yAxisStep = Math.max(Math.ceil(yAxisRange / yAxisFittingItems), 1);
      this.yAxisFactor = Math.round((this.heightOfYAxis - this.heightOffset) / Math.min(yAxisFittingItems, Math.ceil(yAxisRange / this.yAxisStep) + 1) / this.heightOfText * 10) / 10;
      let amountOfYAxisItems: number = Math.min(yAxisFittingItems, Math.ceil(yAxisRange / this.yAxisStep) + 1);
      let maxValue = (amountOfYAxisItems) * this.yAxisStep;
      this.yAxisPercentage = ((this.heightOfYAxis - this.heightOffset) / Math.max(maxValue, 1));
      for (let y = 0; y < amountOfYAxisItems; y++) {
        let value: number = Math.ceil(this.yAxisStep * y);
        let title: string = value + "";
        if (title.length * this.widthOfCharacter > yAxisMaxLeftDisatance) {
          yAxisMaxLeftDisatance = title.length * this.widthOfCharacter;
        }
        let pos: number = (this.heightOfYAxis - this.heightOffset) - (value * this.yAxisPercentage);
        this.yAxisLabels.push({ value: value, y: pos, title: title });
        this.yAxisTicks.push({ y: pos + 5 });
      }
      this.left += yAxisMaxLeftDisatance;
      //create x Axis Scala
      /*
        if type of x axis value = number then behaivior like the y Axis
        if type of x axis value = String then don't show values if overlapping
        if type of x axis value = Date then show only month and year if overlapping and if this is also overlapping show only year.
        
      */
      this.xAxisLabels = [];
      this.xAxisTicks = [];
      let xAxisfirstValue: any = null;
      let amountOfItems: number = 0;
      let maxWidthOfItem: number = 0;
      this.data.dataset.forEach(set => {
        if (set.values.length > 0) {
          let items: number = set.values.length;
          if (items > amountOfItems) {
            amountOfItems = items;
          }
          if (xAxisfirstValue == null) {
            xAxisfirstValue = set.values[0].x;
          }
          set.values.forEach(v => {
            let value = v.x;
            if (value instanceof Date) {
              value = value.getDate() + "." + (value.getMonth() + 1) + "." + value.getFullYear();
            }
            let lengthOfItem: number = (value + "").length * this.widthOfCharacter;
            if (lengthOfItem > maxWidthOfItem) {
              maxWidthOfItem = lengthOfItem;
            }
          });
        }
      });
      if (xAxisfirstValue != null) {
        //intial calculation of values
        this.widthOfItem = Math.ceil((this.widthOfXAxis - this.left) / amountOfItems);
        let maxWidthOfXAxisLabel: number = Math.max(Math.floor((this.widthOfXAxis - this.left) / maxWidthOfItem), this.widthOfItem);
        let xAxisStep: number = 1;
        if (maxWidthOfItem > maxWidthOfXAxisLabel) {
          xAxisStep = Math.max(Math.ceil(maxWidthOfItem / maxWidthOfXAxisLabel), 1);
        }
        for (let x = 0; x < amountOfItems; x++) {
          let item = this.data.dataset[0].values[x];
          let value: any = item.x;
          if (value instanceof Date) {
            value = value.getDate() + "." + (value.getMonth() + 1) + "." + value.getFullYear();
          }
          let title: string = value + "";
          let pos: number = (maxWidthOfXAxisLabel * x) + this.left + (this.widthOfItem / 2);
          if (x % xAxisStep == 0) {
            this.xAxisLabels.push({ title: title, value: value, x: pos });
          }
          this.xAxisTicks.push({ x: pos });
        }
        //specific types after default was calculated
        if (xAxisfirstValue instanceof Number) {

        }
        if (xAxisfirstValue instanceof Date) {

        }
      }
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

  getXAxisTicks(): { x: number }[] {
    if (this.chartGenerated) {
      return this.xAxisTicks;
    }
    return [];
  }

  getYAxisTicks(): { y: number }[] {
    if (this.chartGenerated) {
      return this.yAxisTicks;
    }
    return [];
  }

  amountOfDataSets(): number {
    return this.data.dataset.length;
  }

  getDataSets(): any[] {
    return this.data.dataset;
  }

  getDataSet(index: number): { x: any, y: number }[] {
    return this.data.dataset[index].values;
  }

  getPositionOfItem(setindex: number, index: number, item: { x: any, y: number }): { x: number, y: number, w: number, h: number } {
    if (this.data && this.chartGenerated) {
      let height: number = Math.max((this.yAxisPercentage * (item.y)), 1);
      let yPos: number = Math.max((this.heightOfYAxis) - height, 0);
      let widthPerSet: number = Math.max((this.widthOfItem) / this.amountOfDataSets(), 0);
      let width: number = widthPerSet;// TODO depends on setindex
      let xPos: number = Math.max(this.left + (this.widthOfItem) * index, 0) + (widthPerSet * setindex);
      return { x: xPos, y: yPos, w: width, h: height };
    }
    return { x: 0, y: 0, w: 0, h: 0 };
  }

  onBarClicked(setindex: number, index: number, item: { x: any, y: number }) {
    console.log(item, "clicked");
  }

}
