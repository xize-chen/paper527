/* eslint-disable react/prop-types */
import {
  Box,
  Grid,
} from '@material-ui/core';
import CardData from 'src/components/statistic/CardData';
import numberWithCommas from 'src/utils/numberWithCommas';
import CardComboData from 'src/components/statistic/CardComboData';

const CardCluster = ({ summary, locationChanged }) => {
  const dashInfo = {
    country: summary.location, // `User Location: ${summary.location}`,
    date: `Report Date: ${summary.date}`
  };

  const detailDatas = [
    {
      label: 'Total Confirmed Cases',
      value: numberWithCommas(summary.total_cases) || 'N/A'
    },
    {
      label: 'New Confirmed Cases',
      value: `${numberWithCommas(summary.new_cases)}` || 'N/A'
    },
    {
      label: 'Total Deaths',
      value: numberWithCommas(summary.total_deaths) || 'N/A'
    },
    {
      label: 'New Deaths',
      value: `${numberWithCommas(summary.new_deaths)}` || 'N/A'
    },
    {
      label: 'Total COVID-19 Tests',
      value: numberWithCommas(summary.total_tests) || 'N/A'
    },
    {
      label: 'New COVID-19 Tests',
      value: numberWithCommas(summary.new_tests) || 'N/A'
    },
    {
      label: 'Total COVID-19 Tests / Thousand ppl',
      value: numberWithCommas(summary.total_tests_per_thousand) || 'N/A'
    },
    {
      label: 'New COVID-19 Tests / Thousand ppl',
      value: numberWithCommas(summary.new_tests_per_thousand) || 'N/A'
    },
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
          <CardComboData metric="Location" metricValue={dashInfo.country} valueChanged={locationChanged} />
        </Grid>
        {/* <Grid item lg={12} sm={12} xl={12} xs={12}>
          <CardData metric="" metricValue={dashInfo.country} />
        </Grid> */}
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
