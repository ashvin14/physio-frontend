import React, { Component } from "react";
import FusionCharts from "fusioncharts";
import { chartRomConfigs } from "./configRom";
import Charts from "fusioncharts/fusioncharts.charts";
import ReactFC from "react-fusioncharts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import { inject } from "mobx-react";

ReactFC.fcRoot(FusionCharts, Charts, FusionTheme);

class RomGraph extends Component {
  state = { data: null };
  maxScoreData = data => this.setState({ data });

  render() {
    return <ReactFC {...chartRomConfigs(this.state.data)} />;
  }
}

export default inject("patientStore")(RomGraph);
