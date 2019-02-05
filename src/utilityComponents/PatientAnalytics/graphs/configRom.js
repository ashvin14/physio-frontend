const WIDTH = 800;
const HEIGHT = 400;

export const chartRomConfigs = MaxScoreData => {
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
        caption: `Rom Analysis of Patient `,
        yaxisname: `${yaxisName}`,
        subcaption: "",
        showhovereffect: "1",
        numbersuffix: "",
        drawcrossline: "1",
        plottooltext: ` $seriesName ,value:<b>$dataValue</b>.`,
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
          seriesname: "Minimum Rom Allowed",
          data: [
            {
              value: "30",
            },
            {
              value: "30",
            },
            {
              value: "30",
            },
            {
              value: "30",
            },
            {
              value: "30",
            },
          ],
        },
        {
          seriesname: "The ROM of patient",
          data: [
            {
              value: "28",
            },
            {
              value: "42",
            },
            {
              value: "50",
            },
            {
              value: "55",
            },
            {
              value: "51",
            },
          ],
        },

        {
          seriesname: "Maximum ROM allowed for patient",
          data: [
            {
              value: "60",
            },
            {
              value: "60",
            },
            {
              value: "60",
            },
            {
              value: "60",
            },
            {
              value: "60",
            },
          ],
        },
      ],
    },
  };
};
