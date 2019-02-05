const WIDTH = 600;
const HEIGHT = 400;

export const chartMaxConfigs = MaxScoreData => {
  console.log(MaxScoreData);
  const category = [];
  const joint = [];
  //clear values
  const dataElbow = [],
    dataWrist = [];

  const yaxisName = "Max Score";

  if (MaxScoreData) {
    MaxScoreData.map(dataItem =>
      category.push({
        label: `Day ${dataItem.day}`,
      }),
    );
    MaxScoreData.map(dataItem => {
      if (dataItem.joint === "Elbow") {
        dataElbow.push({
          value: dataItem.maxscore,
        });
        dataWrist.push({
          value: 0,
        });
      } else {
        dataElbow.push({
          value: 0,
        });
        dataWrist.push({
          value: dataItem.maxscore,
        });
      }
    });

    console.log(category, dataElbow, dataWrist);
  }

  return {
    type: "msline",
    width: `${WIDTH}`,
    height: `${HEIGHT}`,
    dataFormat: "json",
    dataSource: {
      chart: {
        caption: `Score Analysis of Patient `,
        yaxisname: `${yaxisName}`,
        subcaption: "",
        showhovereffect: "1",
        numbersuffix: "",
        drawcrossline: "1",
        plottooltext: `The Maximum Score of Patient was <b>$dataValue</b> for $seriesName .`,
        theme: "fusion",
      },
      categories: [
        {
          category,
        },
      ],
      dataset: [
        {
          seriesname: "Elbow",
          data: dataElbow,
        },
        {
          seriesname: "Wrist",
          data: dataWrist,
        },
      ],
    },
  };
};
