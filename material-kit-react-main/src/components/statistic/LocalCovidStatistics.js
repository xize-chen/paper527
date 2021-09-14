import {
  Container,
  Grid,
} from '@material-ui/core';
import SummaryCluster from 'src/components/statistic/SummaryClusterLocal';
import Barchart from 'src/components/statistic/BarChart';
import Trendline from 'src/components/statistic/TrendLine';
import React, { useEffect, useState } from 'react';
import service from '../../services/Server';

// TODO depend on user's setting
const LOCATION = 'NZL';

const LocalCovidStatistics = () => {
  const [initLocal, setInitLocal] = useState({
    summary: null,
    past12Month: null,
  });
  useEffect(async () => {
    const res = await service.getSummaryByLocation(LOCATION);
    const resPast12Month = await service.getPastYearDataByLocation(LOCATION);
    setInitLocal({
      summary: res[0],
      past12Month: resPast12Month
    });
  }, []);

  return (
    <Container maxWidth={false}>
      <Grid container spacing={2}>
        <Grid item lg={6} md={6} xl={6} xs={6}>
          {initLocal.summary
            ? <SummaryCluster summary={initLocal.summary} />
            : 'loading....'}
        </Grid>
        <Grid item lg={6} md={6} xl={6} xs={6}>
          {initLocal.summary
            ? <Barchart data={initLocal.summary} />
            : 'loading.'}
          {initLocal.past12Month
            ? <Trendline past12Month={initLocal.past12Month} />
            : '' }
        </Grid>
      </Grid>
    </Container>
  );
};

export default LocalCovidStatistics;
