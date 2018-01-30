import { Component } from '@angular/core';
import { IfBarChartData } from 'app/data/if-bar-chart-data';
import { IfLineChartData } from 'app/data/if-line-chart-data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  bardata: IfBarChartData = {
    xAxisTitle: "Tag",
    yAxisTitle: "Zugriffe",

    dataset: [
      {
        color: "#2196f3",
        title: "Income",
        name: "income",
        values: [
          { x: new Date(2018, 0, 1), y: 0 },
          { x: new Date(2018, 0, 2), y: 10 },
          { x: new Date(2018, 0, 3), y: 11.5 },
          { x: new Date(2018, 0, 4), y: 15 },
          { x: new Date(2018, 0, 5), y: 5 },
          { x: new Date(2018, 0, 7), y: 30 },
          { x: new Date(2018, 0, 7), y: 38 }
        ]
      }
    ]
  };

}
