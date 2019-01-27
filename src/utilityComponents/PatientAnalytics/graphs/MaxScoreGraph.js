import React, { Component } from "react";
import FusionCharts from "fusioncharts";
import { chartMaxConfigs } from "./configMaxScore";
import Charts from "fusioncharts/fusioncharts.charts";
import ReactFC from "react-fusioncharts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import { inject } from "mobx-react";

ReactFC.fcRoot(FusionCharts, Charts, FusionTheme);

class MaxScoreGraph extends Component {
  state = { data: null };
  maxScoreData = data => this.setState({ data });

  componentDidMount() {
    const { patientStore } = this.props;

    patientStore.currentPatientMaxScoreDayWise(
      patientStore.getCurrentPatient.user_id,
      patientStore.getCurrentPatient.diagnosed[0],
      values => this.maxScoreData(values),
    );
  }
  render() {
    return <ReactFC {...chartMaxConfigs(this.state.data)} />;
  }
}

export default inject("patientStore")(MaxScoreGraph);
