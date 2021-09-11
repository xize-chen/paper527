import {
  Box,
  Grid,
} from '@material-ui/core';
import CardData from 'src/components/statistic/CardData';
import PropTypes from 'prop-types';
import CardDataRank from './CardDataRank';

const SummaryClusterTotal = ({ countryDatas }) => {
  const dashInfo = {
    newCount: '1,000,000',
    newDeath: '15,644',
    totalcases: '9,451,215'
  };

  return (
    <Box
      sx={{
        height: '100%',
        position: 'relative'
      }}
    >
      <Grid container spacing={2}>

        <Grid item lg={12} sm={12} xl={12} xs={12}>
          <CardData metric="" metricValue={new Date().toLocaleDateString().concat('(NZST)')} />
        </Grid>

        <Grid item lg={6} sm={6} xl={6} xs={6}>
          <CardData metric=" New Cases Count " metricValue={dashInfo.newCount} />
        </Grid>

        <Grid item lg={6} sm={6} xl={6} xs={6}>
          <CardData metric=" New Deaths Count" metricValue={dashInfo.newDeath} />
        </Grid>

        <Grid item lg={12} sm={12} xl={12} xs={12}>
          <CardData metric=" Total Cases Count" metricValue={dashInfo.totalcases} />
        </Grid>
        <Grid item lg={6} sm={6} xl={6} xs={6} key={countryDatas.name}>
          <CardDataRank title="Top 5 New Cases Count by Country" datas={countryDatas} />
        </Grid>
        <Grid item lg={6} sm={6} xl={6} xs={6} key={countryDatas.name}>
          <CardDataRank title="Top 5 New Deaths Count by Country" datas={countryDatas} />
        </Grid>
      </Grid>

    </Box>
  );
};

SummaryClusterTotal.propTypes = {
  countryDatas: PropTypes.array.isRequired,
};

export default SummaryClusterTotal;
