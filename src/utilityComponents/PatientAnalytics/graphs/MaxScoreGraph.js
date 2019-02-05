import React, { Component } from "react";
import FusionCharts from "fusioncharts";
import { chartMaxConfigs } from "./configMaxScore";
import Charts from "fusioncharts/fusioncharts.charts";
import ReactFC from "react-fusioncharts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import { inject, observer } from "mobx-react";

ReactFC.fcRoot(FusionCharts, Charts, FusionTheme);

class MaxScoreGraph extends Component {
  render() {
    return <ReactFC {...chartMaxConfigs(this.props.data)} />;
  }
}

export default inject("patientStore")(observer(MaxScoreGraph));
