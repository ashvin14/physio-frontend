import React, { Component } from "react";
import FusionCharts from "fusioncharts";
import { chartConfigs } from "./index";
import Charts from "fusioncharts/fusioncharts.charts";
import ReactFC from "react-fusioncharts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

ReactFC.fcRoot(FusionCharts, Charts, FusionTheme);

export class MaxScoreGraph extends Component {
  render() {
    return <ReactFC {...chartConfigs} />;
  }
}
