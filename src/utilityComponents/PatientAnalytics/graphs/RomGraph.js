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

  render() {
    return <ReactFC {...chartRomConfigs(this.props.data, this.props.joint)} />;
  }
}

export default inject("patientStore")(RomGraph);
