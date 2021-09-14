/* eslint-disable react/prop-types */
import {
  Box,
  Grid,
} from '@material-ui/core';
import CardData from 'src/components/statistic/CardData';

const CardCluster = ({ summary }) => {
  const dashInfo = {
    country: `User Location: ${summary.location}`,
    date: `Report Date: ${summary.date}`
  };

  const detailDatas = [
    {
      label: 'Total Cases',
      value: summary.total_cases || 'N/A'
    },
    {
      label: 'Total Deaths',
      value: summary.total_deaths || 'N/A'
    },
    {
      label: 'Percent Death',
      value: `${summary.percent_death_confirm * 100} %` || 'N/A'
    },
    {
      label: 'New Tests Per Thousand',
      value: summary.new_tests_per_thousand || 'N/A'
    },
    {
      label: 'Total Cases Million',
      value: summary.total_cases_per_million || 'N/A'
    },
    {
      label: 'New Cases per Million',
      value: summary.new_cases_per_million || 'N/A'
    },
    {
      label: 'total_tests',
      value: summary.total_tests || 'N/A'
    },
    {
      label: 'new_tests',
      value: summary.new_tests || 'N/A'
    }
  ];

  // const proportion = { label: `${summary.location}: Total Cases`, value: summary.total_cases };
  return (
    <Box
      sx={{
        height: '100%',
        position: 'relative'
      }}
    >
      <Grid container spacing={2}>
        <Grid item lg={12} sm={12} xl={12} xs={12}>
          <CardData metric="" metricValue={dashInfo.country} />
        </Grid>
        <Grid item lg={12} sm={12} xl={12} xs={12}>
          <CardData metric="" metricValue={dashInfo.date} />
        </Grid>
        {detailDatas.map((data) => (
          <Grid item lg={6} sm={6} xl={6} xs={6} key={data.label}>
            <CardData metric={data.label} metricValue={data.value} />
          </Grid>
        ))}
        {/* <Grid item lg={12} sm={12} xl={12} xs={12} key={proportion.label}>
          <CardData metric={proportion.label} metricValue={proportion.value} />
        </Grid> */}

      </Grid>
    </Box>
  );
};

export default CardCluster;
