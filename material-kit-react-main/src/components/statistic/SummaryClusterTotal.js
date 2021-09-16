import {
  Box,
  Grid,
} from '@material-ui/core';
import CardData from 'src/components/statistic/CardData';
import PropTypes from 'prop-types';
import numberWithCommas from 'src/utils/numberWithCommas';
import CasesRank from './CasesRank';
import TestsRank from './TestsRank';

const SummaryClusterTotal = ({ initWorld }) => {
  const { worldSummary, topTenCases, topTenTests } = initWorld;

  return (
    <Box
      sx={{
        height: '100%',
        position: 'relative'
      }}
    >
      <Grid container spacing={2}>

        <Grid item lg={12} sm={12} xl={12} xs={12}>
          <CardData metric="Report date" metricValue={worldSummary ? worldSummary.date : 'loading....'} />
        </Grid>

        <Grid item lg={6} sm={6} xl={6} xs={6}>
          <CardData metric=" Total Confirmed Cases" metricValue={worldSummary ? numberWithCommas(worldSummary.total_cases) : 'loading...'} />
        </Grid>

        <Grid item lg={6} sm={6} xl={6} xs={6}>
          <CardData metric=" New Confirmed Cases " metricValue={worldSummary ? numberWithCommas(worldSummary.new_cases) : 'loading....'} />
        </Grid>

        <Grid item lg={6} sm={6} xl={6} xs={6}>
          <CardData metric=" Total Deaths" metricValue={worldSummary ? numberWithCommas(worldSummary.total_deaths) : 'loading...'} />
        </Grid>

        <Grid item lg={6} sm={6} xl={6} xs={6}>
          <CardData metric=" New Deaths" metricValue={worldSummary ? numberWithCommas(worldSummary.new_deaths) : 'loading....'} />
        </Grid>

        <Grid item lg={6} sm={6} xl={6} xs={6} key={1}>
          <CardData metric="" metricValue="Total cases" />
          {topTenCases
            ? <CasesRank topTenCases={topTenCases} />
            : <CardData metric="loading..." metricValue="" />}
        </Grid>
        <Grid item lg={6} sm={6} xl={6} xs={6} key={2}>
          <CardData metric="" metricValue="Total COVID-19 Tests" />
          {topTenTests
            ? <TestsRank topTenTests={topTenTests} />
            : <CardData metric="loading..." metricValue="" />}
        </Grid>
      </Grid>

    </Box>
  );
};

SummaryClusterTotal.propTypes = {
  initWorld: PropTypes.shape({
    worldSummary: PropTypes.string,
    topTenCases: PropTypes.number,
    topTenTests: PropTypes.number,
  }),
};

export default SummaryClusterTotal;
