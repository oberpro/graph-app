import { Component, OnInit, Input } from '@angular/core';
import { IfData } from 'app/data/if-data';
import { IfDataset } from 'app/data/if-dataset';
import { IfLineChartData } from 'app/data/if-line-chart-data';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit {
  private value: IfLineChartData = null;
  height: number = 300;
  width: number = 500;
  left: number = 90;
  top: number = 10;
  barwidth: number = 40;

  yAxisData: { title: any, y: number }[] = [];
  xAxisData: { title: any, x: number }[] = [];

  yAxisStartHeight: number = 0;
  yAxisEndHeight: number = 0;

  showLegend: boolean = true;

  drawLines: boolean = true;
  drawDots: boolean = true;

  @Input("value") set changeValue(value: IfLineChartData) {
    if (value != null) {
      this.value = value;
      this.loadOptions();
      this.init();
    }
  }
  constructor() { }

  ngOnInit() {
  }


  loadOptions() {
    this.drawDots = this.value.drawDots || true;
    this.drawLines = this.value.drawLines || true;
    this.barwidth = this.value.itemWidth || 10;
    this.showLegend = this.value.showLegend || true;
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
      return x;
    }
    return 0;
  }

  getDataXBefore(set: IfDataset, index: number): number {
    let data: IfData[] = set.data;
    if (index > 0) {
      let before = data[index - 1];
      return this.getDataX(before);
    }
    return this.left;
  }

  getDataYBefore(set: IfDataset, index: number): number {
    let data: IfData[] = set.data;
    if (index > 0) {
      let before = data[index - 1];
      return this.getDataY(before);
    }
    return this.height + this.top;
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

  getLegendY(set: IfDataset, index: number): number {
    let center: number = this.height / this.getAmountOfSets();
    return center + (50 * index);
  }
}
