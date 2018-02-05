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
          { x: "01.01.2018", y: 0 },
          { x: "02.01.2018", y: 10 },
          { x: "03.01.2018", y: 11.5 },
          { x: "04.01.2018", y: 15 },
          { x: "05.01.2018", y: 5 },
          { x: "06.01.2018", y: 30 },
          { x: "07.01.2018", y: 38 },
          { x: "08.01.2018", y: 37 },
          { x: "09.01.2018", y: 15 },
          { x: "10.01.2018", y: 14 },
          { x: "11.01.2018", y: 11 },
          { x: "12.01.2018", y: 1 },
          { x: "13.01.2018", y: 99 },
          { x: "14.01.2018", y: 11 },
          { x: "15.01.2018", y: 33 },
          { x: "16.01.2018", y: 44 },
          { x: "17.01.2018", y: 53 },
          { x: "18.01.2018", y: 23 },
          { x: "19.01.2018", y: 13 }
        ]
      }
    ]
  };

}
