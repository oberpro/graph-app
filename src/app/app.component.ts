import { Component } from '@angular/core';
import { IfBarChartData } from 'app/data/if-bar-chart-data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  data: IfBarChartData = {
    xaxis: { values: [2011, 2012, 2013, 2014, 2015], title: "Jahr" },
    yaxis: { start: 0, stop: 20, steps: 5, title: "Preis" },
    data: [
      { xvalue: 2011, yvalue: 0 },
      { xvalue: 2012, yvalue: 10 },
      { xvalue: 2013, yvalue: 11.5 },
      { xvalue: 2014, yvalue: 15 },
      { xvalue: 2015, yvalue: 5 }
    ]
  };
}
