const WIDTH = 100;
const HEIGHT = 80;

export const chartRomConfigs = (RomData, joints, chartType) => {
  let category = [];
  const dataMinElbow = [],
    dataMinWrist = [],
    dataMaxElbow = [],
    dataset = [],
    dataMaxWrist = [];

  console.log(chartType);

  RomData.map((dataItem, index) =>
    category.push({
      label: `Day ${index + 1}`,
      index,
    }),
  );

  category = Array.from(new Set(category.map(JSON.stringify))).map(JSON.parse);
  category.map(({ index }) => {
    joints.map(joint => {
      if (joint === "Elbow") {
        dataMinElbow.push({ value: 0 });
        dataMaxElbow.push({ value: 0 });
      } else {
        dataMaxWrist.push({ value: 0 });
        dataMinWrist.push({ value: 0 });
      }
    });
  });

  category.map(catIndex => {
    RomData.map(
      ({ joint, min_rom, max_rom, session_id, created_at }, index) => {
        if (catIndex.index === index) {
          if (joint === "Elbow") {
            dataMinElbow[catIndex.index].value = min_rom;
            dataMaxElbow[catIndex.index].value = max_rom;
          } else {
            dataMaxWrist[catIndex.index].value = max_rom;
            dataMinWrist[catIndex.index].value = min_rom;
          }
        }
      },
    );
  });

  joints.map(joint => {
    if (joint === "Wrist") {
      dataset.push({
        seriesname: `Flexion-${joint}`,
        data: dataMinWrist,
      });
      dataset.push({
        seriesname: `Extension-${joint}`,
        data: dataMaxWrist,
      });
    } else {
      dataset.push({
        seriesname: `Flexion-${joint}`,
        data: dataMinElbow,
      });
      dataset.push({
        seriesname: `Extension-${joint}`,
        data: dataMaxElbow,
      });
    }
  });

  const yaxisName = "Rom (Range of Motion)";

  return {
    type: chartType,
    width: `${WIDTH}%`,
    height: `${HEIGHT}%`,
    dataFormat: "json",
    dataSource: {
      chart: {
        caption: `Rom (Range of Motion) Analysis of Patient `,
        yaxisname: `${yaxisName}`,
        subcaption: "",
        showhovereffect: "1",
        numbersuffix: "",
        drawcrossline: "1",
        plottooltext: ` $seriesName ,value:<b>$value</b> in degrees.`,
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
