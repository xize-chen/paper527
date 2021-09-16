import {
  Container,
  Grid,
} from '@material-ui/core';
import { useLocation } from 'react-router-dom';
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
  const location = useLocation();

  const loadData = async (varLocation) => {
    const res = await service.getSummaryByLocation(varLocation);
    const resPast12Month = await service.getPastYearDataByLocation(varLocation);
    setInitLocal({
      summary: res[0],
      past12Month: resPast12Month,
      location: varLocation
    });
  };

  const locationChanged = (newLocation) => {
    setInitLocal({
      summary: '',
      past12Month: null,
      location: newLocation
    });
    if (newLocation !== undefined && newLocation !== '') {
      loadData(newLocation);
      const accountVar = session.getItem(sessionKey.ACCOUNT_KEY);
      if (accountVar != null) {
        const account = JSON.parse(accountVar);
        account.selectedCountry = newLocation;
        window.sessionStorage.setItem(sessionKey.ACCOUNT_KEY, JSON.stringify(account));
      }
    }
  };

  const loadDataByAccount = async () => {
    console.log(`location.pathname: ${location.pathname}`);
    let currentLocation = sessionKey.DEFAULT_COUNTRY;
    const accountVar = session.getItem(sessionKey.ACCOUNT_KEY);
    if (accountVar != null) {
      const account = JSON.parse(accountVar);
      currentLocation = account.selectedCountry !== undefined ? account.selectedCountry : sessionKey.DEFAULT_COUNTRY;
    }
    await loadData(currentLocation);
  };

  useEffect(() => {
    loadDataByAccount();
  }, [location.pathname]);

  return (
    <Container maxWidth={false}>
      <Grid container spacing={2}>
        <Grid item lg={6} md={6} xl={6} xs={6}>
          {initLocal.summary
            ? <SummaryCluster summary={initLocal.summary} locationChanged={locationChanged} />
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
