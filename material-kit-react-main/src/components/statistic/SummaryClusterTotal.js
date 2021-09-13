import {
  Box,
  Grid,
} from '@material-ui/core';
import CardData from 'src/components/statistic/CardData';
import PropTypes from 'prop-types';
import numberWithCommas from 'src/utils/numberWithCommas';
import CasesRank from './CasesRank';
import DeathRank from './DeathRank';

const SummaryClusterTotal = ({ initWorld }) => {
  const { worldSummary, topTenCases, topTenDeaths } = initWorld;

  return (
    <Box
      sx={{
        height: '100%',
        position: 'relative'
      }}
    >
      <Grid container spacing={2}>

        <Grid item lg={12} sm={12} xl={12} xs={12}>
          <CardData metric="Today date" metricValue={worldSummary ? worldSummary.date : 'loading....'} />
        </Grid>

        <Grid item lg={6} sm={6} xl={6} xs={6}>
          <CardData metric=" New Cases Count " metricValue={worldSummary ? numberWithCommas(worldSummary.new_cases) : 'loading....'} />
        </Grid>

        <Grid item lg={6} sm={6} xl={6} xs={6}>
          <CardData metric=" New Deaths Count" metricValue={worldSummary ? numberWithCommas(worldSummary.new_deaths) : 'loading....'} />
        </Grid>

        <Grid item lg={6} sm={6} xl={6} xs={6}>
          <CardData metric=" Total Cases Count" metricValue={worldSummary ? numberWithCommas(worldSummary.total_cases) : 'loading...'} />
        </Grid>

        <Grid item lg={6} sm={6} xl={6} xs={6}>
          <CardData metric=" Total Death Count" metricValue={worldSummary ? numberWithCommas(worldSummary.total_deaths) : 'loading...'} />
        </Grid>

        <Grid item lg={6} sm={6} xl={6} xs={6} key={1}>
          <CardData metric="" metricValue="Total Case Tank" />
          {topTenCases
            ? <CasesRank topTenCases={topTenCases} />
            : <CardData metric="loading..." metricValue="" />}
        </Grid>
        <Grid item lg={6} sm={6} xl={6} xs={6} key={2}>
          <CardData metric="" metricValue="Total Death Tank" />
          {topTenDeaths
            ? <DeathRank topTenDeaths={topTenDeaths} />
            : <CardData metric="loading..." metricValue="" />}
        </Grid>
      </Grid>

    </Box>
  );
};

SummaryClusterTotal.propTypes = {
  initWorld: PropTypes.array.isRequired,
};

export default SummaryClusterTotal;
