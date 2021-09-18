import {
  Container,
  Grid,
} from '@material-ui/core';
import SummaryClusterTotal from 'src/components/statistic/SummaryClusterTotal';
import { useEffect, useState } from 'react';
// import moment from 'moment';
import PieChart from 'src/components/statistic/PieChart';
import service from '../../services/Server';
import Map from './Map';

const WorldCovidStatistics = () => {
  const [initWorld, setInitWorld] = useState({
    worldSummary: '',
    topTenCases: 0,
    topTenDeaths: 0,
  });

  // const todayDate = moment(new Date()).format('YYYY-MM-DD');
  useEffect(async () => {
    const resSummary = await service.getSummaryOfWorld();
    const resTopTenCases = await service.getTopTenCases();
    const resTopTenTests = await service.getTopTenTests();
    setInitWorld({
      worldSummary: resSummary[0],
      topTenCases: resTopTenCases,
      topTenTests: resTopTenTests,
    });
  }, []);

  return (
    <Container maxWidth={false}>
      <Grid container spacing={2}>
        <Grid item lg={6} md={6} xl={6} xs={6}>
          <SummaryClusterTotal initWorld={initWorld} />
        </Grid>
        <Grid item lg={6} md={6} xl={6} xs={6}>
          {initWorld.topTenCases
            ? (
              <Grid container spacing={3}>
                <Grid item lg={12} sm={12} xl={12} xs={12}>
                  <Map topTenCases={initWorld.topTenCases} />
                </Grid>
                <Grid item lg={12} sm={12} xl={12} xs={12}>
                  <PieChart topTenCases={initWorld.topTenCases} />
                </Grid>
              </Grid>
            )
            : 'loading...'}
        </Grid>
      </Grid>
    </Container>
  );
};

export default WorldCovidStatistics;
