import {
  Box,
  Grid,
} from '@material-ui/core';
import CardData from 'src/components/statistic/CardData';

const CardCluster = () => {
  const nowTime = new Date();
  const dashInfo = {
    label: 'Local Weekly Dashboard',
    country: 'New zealand',
    date: nowTime.toString()
  };

  const detailDatas = [
    {
      label: 'country cases lw:',
      value: 23
    },
    {
      label: 'cases trend:',
      value: '50%'
    },
    {
      label: 'country death lw:',
      value: 3
    },
    {
      label: 'death trend:',
      value: 23
    },
    {
      label: 'death rate:',
      value: 23
    },
    {
      label: 'death rate trend:',
      value: 23
    },
  ];

  const proportion = { label: 'Deaths/Confirmed', value: '5%' };
  return (
    <Box
      sx={{
        height: '100%',
        position: 'relative'
      }}
    >
      <Grid container spacing={1}>
        <Grid item lg={12} sm={12} xl={12} xs={12}>
          <CardData metric="" metricValue={dashInfo.label} />
        </Grid>

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
