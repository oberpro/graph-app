import { IfXAxis } from "app/data/if-x-axis";
import { IfYAxis } from "app/data/if-y-axis";
import { IfDataset } from "app/data/if-dataset";

export interface IfLineChartData {
    xaxis: IfXAxis;
    yaxis: IfYAxis;
    dataset: IfDataset[];
    drawLines?: boolean;
    drawDots?: boolean;
    itemWidth?: number;
    showLegend?: boolean;
}
