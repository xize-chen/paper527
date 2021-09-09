import {
  Box,
  Grid,
} from '@material-ui/core';
import CardData from 'src/components/statistic/CardData';
import PropTypes from 'prop-types';
import CardDataRank from './CardDataRank';

const SummaryClusterTotal = ({ countryDatas }) => {
  const dashInfo = {
    label: 'Total Dashboard',
    totalcases: 9451215,
    totalDeath: 15644
  };

  const detailDatas = [
    {
      label: 'monthly highest cases:',
      value: 23
    },
    {
      label: 'monthly highest deaths:',
      value: 263
    },
  ];

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
          <CardData metric="total cases" metricValue={dashInfo.totalcases} />
        </Grid>

        <Grid item lg={12} sm={12} xl={12} xs={12}>
          <CardData metric="Total Death" metricValue={dashInfo.totalDeath} />
        </Grid>
      </Grid>

      <br />

      <Grid container spacing={1}>
        {detailDatas.map((data) => (
          <Grid item lg={6} sm={6} xl={6} xs={6} key={data.label}>
            <CardData metric={data.label} metricValue={data.value} />
          </Grid>
        ))}
      </Grid>

      <br />

      {countryDatas ? (
        <Grid container spacing={2}>
          <Grid item lg={6} sm={6} xl={6} xs={6} key={countryDatas.name}>
            <CardDataRank title="Top 5 Cases rank" datas={countryDatas} />
          </Grid>
          <Grid item lg={6} sm={6} xl={6} xs={6} key={countryDatas.name}>
            <CardDataRank title="Top 5 Death rank" datas={countryDatas} />
          </Grid>

        </Grid>
      ) : null}

    </Box>
  );
};

SummaryClusterTotal.propTypes = {
  countryDatas: PropTypes.array.isRequired,
};

export default SummaryClusterTotal;
