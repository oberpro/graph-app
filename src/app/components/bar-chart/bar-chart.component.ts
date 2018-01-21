import { Component, OnInit, Input } from '@angular/core';
import { IfBarChartData } from 'app/data/if-bar-chart-data';
import { IfData } from 'app/data/if-data';
import { IfDataset } from 'app/data/if-dataset';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {
  private value: IfBarChartData = null;
  height: number = 300;
  width: number = 500;
  left: number = 90;
  top: number = 10;
  barwidth: number = 50;

  yAxisData: { title: any, y: number }[] = [];
  xAxisData: { title: any, x: number }[] = [];

  yAxisStartHeight: number = 0;
  yAxisEndHeight: number = 0;

  @Input("value") set changeValue(value: IfBarChartData) {
    if (value != null) {
      this.value = value;
      this.init();
    }
  }
  constructor() { }

  ngOnInit() {
  }

  init() {
    this.yAxisData = [];
    this.yAxisStartHeight = this.height + this.top;
    this.yAxisEndHeight = this.top;
    let amount: number = Math.floor((this.value.yaxis.stop - this.value.yaxis.start) / this.value.yaxis.steps);
    for (let i = this.value.yaxis.start; i <= this.value.yaxis.stop; i += this.value.yaxis.steps) {
      let y: number = this.yAxisStartHeight - ((i / this.value.yaxis.steps) * (this.height / amount)) + 5;
      this.yAxisData.push({ title: i, y: y });
    }

    this.xAxisData = [];
    amount = this.value.xaxis.values.length;
    for (let i = 0; i < this.value.xaxis.values.length; i++) {
      let v = this.value.xaxis.values[i];
      let x = this.left + (this.width / (amount - 1) - this.barwidth) * (i) + this.barwidth;
      this.xAxisData.push({ title: v, x: x });
    }
  }

  getAmountOfSets(): number {
    return this.value.dataset.length;
  }

  getBarWidth(): number {
    return this.barwidth * this.value.dataset.length;
  }

  getXAxis(): { title: any, x: number }[] {
    return this.xAxisData;
  }

  getYAxis(): { title: any, y: number }[] {
    return this.yAxisData;
  }

  getXAxisTitle(): string {
    return this.value.xaxis.title;
  }

  getYAxisTitle(): string {
    return this.value.yaxis.title;
  }

  getDataY(data: IfData): number {
    let oneValue = this.height / this.value.yaxis.stop;
    return (this.height + this.top) - data.yvalue * oneValue - 2;
  }

  getDataX(data: IfData): number {
    let x = this.xAxisData.find(s => s.title == data.xvalue).x;
    if (x >= 0) {
      return x - (this.barwidth / 2) + (this.barwidth / this.getAmountOfSets()) * data.setIndex;
    }
    return 0;
  }

  getDataWidth(data: IfData): number {
    return this.barwidth / this.getAmountOfSets();
  }

  getDataHeight(data: IfData): number {
    return (this.height + this.top) - this.getDataY(data);
  }

  getData(set: IfDataset, setIndex: number): IfData[] {
    set.data.forEach(s => s.setIndex = setIndex);
    return set.data;
  }

  getDataSet(): IfDataset[] {
    return this.value.dataset;
  }

  hasData(): boolean {
    return this.value != null;
  }
}
