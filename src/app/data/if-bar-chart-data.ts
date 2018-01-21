import { IfXAxis } from "app/data/if-x-axis";
import { IfYAxis } from "app/data/if-y-axis";
import { IfData } from "app/data/if-data";
import { IfDataset } from "app/data/if-dataset";

export interface IfBarChartData {
    xaxis: IfXAxis;
    yaxis: IfYAxis;
    dataset: IfDataset[];
}
