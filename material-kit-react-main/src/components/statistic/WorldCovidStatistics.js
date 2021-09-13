import {
  Container,
  Grid,
} from '@material-ui/core';
import SummaryClusterTotal from 'src/components/statistic/SummaryClusterTotal';
import { useEffect, useState } from 'react';
import moment from 'moment';
import PieChart from 'src/components/statistic/PieChart';
import service from '../../services/Server';
import Map from './Map';

const WorldCovidStatistics = () => {
  // const [worldSummary, setWorldSummary] = useState(null);
  // const [topTenData, setTopTenData] = useState(null);
  const [initWorld, setInitWorld] = useState({
    worldSummary: null,
    topTenCases: null,
    topTenDeaths: null,
  });

  const todayDate = moment(new Date()).format('YYYY-MM-DD');
  useEffect(async () => {
    const resSummary = await service.getSummaryOfWorld(todayDate);
    const resTopTenCases = await service.getTopTenCases();
    const resTopTenDeaths = await service.getTopTenDeaths();
    setInitWorld({
      worldSummary: resSummary[0],
      topTenCases: resTopTenCases,
      topTenDeaths: resTopTenDeaths
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
