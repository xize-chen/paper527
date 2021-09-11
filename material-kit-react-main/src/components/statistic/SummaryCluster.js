import {
  Box,
  Grid,
} from '@material-ui/core';
import CardData from 'src/components/statistic/CardData';

const LOCATION = 'New Zealand';

const CardCluster = () => {
  const nowTime = new Date();
  const dashInfo = {
    country: `User Location: ${LOCATION}`,
    date: `Report Date: ${nowTime.toString()}`
  };

  const detailDatas = [
    {
      label: `${LOCATION}: New Cases Count `,
      value: 23
    },
    {
      label: 'New Cases Trend:',
      value: '50%'
    },
    {
      label: `${LOCATION}: New Deaths Count`,
      value: 3
    },
    {
      label: 'New Deaths Rate:',
      value: '1%'
    },
  ];

  const proportion = { label: `${LOCATION}: Total Cases`, value: '100' };
  return (
    <Box
      sx={{
        height: '100%',
        position: 'relative'
      }}
    >
      <Grid container spacing={1}>

        <Grid item lg={12} sm={12} xl={12} xs={12}>
          <CardData metric="" metricValue={dashInfo.country} />
        </Grid>

        <Grid item lg={12} sm={12} xl={12} xs={12}>
          <CardData metric="" metricValue={dashInfo.date} />
        </Grid>
      </Grid>

      <br />

      <Grid container spacing={1}>
        {detailDatas.map((data) => (
          <Grid item lg={6} sm={6} xl={6} xs={6} key={data.label}>
            <CardData metric={data.label} metricValue={data.value} />
          </Grid>
        ))}
        <Grid item lg={12} sm={12} xl={12} xs={12} key={proportion.label}>
          <CardData metric={proportion.label} metricValue={proportion.value} />
        </Grid>

      </Grid>
    </Box>
  );
};

export default CardCluster;
