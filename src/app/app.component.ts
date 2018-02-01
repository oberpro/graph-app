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
          { x: 1, y: 0 },
          { x: 2, y: 10 },
          { x: 3, y: 11.5 },
          { x: 4, y: 15 },
          { x: 5, y: 5 },
          { x: 6, y: 30 },
          { x: 7, y: 38 },
          { x: 8, y: 37 },
          { x: 9, y: 15 },
          { x: 10, y: 14 },
          { x: 11, y: 11 },
          { x: 12, y: 1 },
          { x: 13, y: 33 }
        ]
      },
      {
        color: "#f44336",
        title: "Missing",
        name: "missing",
        values: [
          { x: 1, y: 12 },
          { x: 2, y: 11 },
          { x: 3, y: 11.5 },
          { x: 4, y: 15 },
          { x: 5, y: 5 },
          { x: 6, y: 11 },
          { x: 7, y: 42 },
          { x: 8, y: 37 },
          { x: 9, y: 15 },
          { x: 10, y: 3 },
          { x: 11, y: 11 },
          { x: 12, y: 4 },
          { x: 13, y: 24 }
        ]
      }
    ]
  };

}
