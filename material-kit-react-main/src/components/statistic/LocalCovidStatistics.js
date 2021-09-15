import {
  Container,
  Grid,
} from '@material-ui/core';
import SummaryCluster from 'src/components/statistic/SummaryClusterLocal';
// import Barchart from 'src/components/statistic/BarChart';
import Trendline from 'src/components/statistic/TrendLine';
import React, { useEffect, useState } from 'react';
import sessionKey from 'src/constants/sessionKey';
import service from '../../services/Server';

// TODO depend on user's setting
// const LOCATION = 'NZL';
const session = window.sessionStorage;

const LocalCovidStatistics = () => {
  const [initLocal, setInitLocal] = useState({
    summary: '',
    past12Month: null,
    location: sessionKey.DEFAULT_COUNTRY
  });
  useEffect(async () => {
    console.log('LocalCovidStatistics');
    let currentLocation = sessionKey.DEFAULT_COUNTRY;
    const accountVar = session.getItem(sessionKey.ACCOUNT_KEY);
    if (accountVar != null) {
      const account = JSON.parse(accountVar);
      currentLocation = account.country !== undefined ? account.country : sessionKey.DEFAULT_COUNTRY;
    }
    const res = await service.getSummaryByLocation(currentLocation);
    const resPast12Month = await service.getPastYearDataByLocation(currentLocation);
    setInitLocal({
      summary: res[0],
      past12Month: resPast12Month,
      location: currentLocation
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
          {initLocal.past12Month
            ? <Trendline past12Month={initLocal.past12Month} confirmed />
            : '' }
          {initLocal.past12Month
            ? <Trendline past12Month={initLocal.past12Month} confirmed={false} />
            : '' }
        </Grid>
      </Grid>
    </Container>
  );
};

export default LocalCovidStatistics;
