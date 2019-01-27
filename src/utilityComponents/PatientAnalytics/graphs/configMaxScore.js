const WIDTH = 800;
const HEIGHT = 400;

export const chartMaxConfigs = MaxScoreData => {
  const category = [];
  const joint = [];
  //clear values
  const dataElbow = [],
    dataWrist = [];

  const yaxisName = "Max Score";

  if (MaxScoreData) {
    console.log(MaxScoreData);
    MaxScoreData.map(dataItem =>
      category.push({
        label: `Day ${dataItem.day}`,
      }),
    );

    MaxScoreData.map(dataItem => {
      if (dataItem.joint === "Elbow")
        return dataElbow.push({
          value: dataItem.score,
        });
      else
        return dataWrist.push({
          value: dataItem.score,
        });
    });
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
          category: [
            {
              label: "Day 1",
            },
            {
              label: "Day 2",
            },
            {
              label: "Day 3",
            },
            {
              label: "Day 4",
            },
            {
              label: "Day 5",
            },
          ],
        },
      ],
      dataset: [
        {
          seriesname: "Elbow",
          data: [
            {
              value: "62",
            },
            {
              value: "64",
            },
            {
              value: "64",
            },
            {
              value: "66",
            },
            {
              value: "78",
            },
          ],
        },
        {
          seriesname: "Wrist",
          data: [
            {
              value: "16",
            },
            {
              value: "28",
            },
            {
              value: "34",
            },
            {
              value: "42",
            },
            {
              value: "54",
            },
          ],
        },
      ],
    },
  };
};
