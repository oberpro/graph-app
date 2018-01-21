import { IfXAxis } from "app/data/if-x-axis";
import { IfYAxis } from "app/data/if-y-axis";
import { IfData } from "app/data/if-data";

export interface IfBarChartData {
    xaxis: IfXAxis;
    yaxis: IfYAxis;
    data: IfData[];
}
