const WIDTH = 100;
const HEIGHT = 80;

export const chartMaxConfigs = (MaxScoreData, joints, type) => {
  const dataElbow = [],
    dataset = [],
    dataWrist = [];
  let category = [];

  const yaxisName = "Max Score";

  if (MaxScoreData) {
    MaxScoreData.map(dataItem =>
      category.push({
        label: `Day ${dataItem.day}`,
        index: dataItem.day,
      }),
    );
  }

  category = Array.from(new Set(category.map(JSON.stringify))).map(JSON.parse);
  category.map(({ index }) => {
    joints.map(joint => {
      if (joint === "Elbow") {
        dataElbow.push({ value: 0 });
      } else {
        dataWrist.push({ value: 0 });
      }
    });
  });

  category.map(({ index }) => {
    //check index with maxScoreData day
    MaxScoreData.map(dataItem => {
      if (index === dataItem.day) {
        if (dataItem.joint === "Elbow") {
          dataElbow[index - 1].value = dataItem.maxscore;
        } else dataWrist[index - 1].value = dataItem.maxscore;
      }
    });

    //if matches check joint and append data to that data array
  });

  //generating dataset
  joints.map(seriesname => {
    if (seriesname === "Elbow")
      dataset.push({
        seriesname,
        data: dataElbow,
      });
    else
      dataset.push({
        seriesname,
        data: dataWrist,
      });
  });

  return {
    type,
    width: `${WIDTH}%`,
    height: `${HEIGHT}%`,
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
      dataset,
    },
  };
};
