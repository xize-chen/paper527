import {
  Container,
  Grid,
} from '@material-ui/core';
import SummaryCluster from 'src/components/statistic/SummaryCluster';
import Barchart from 'src/components/statistic/BarChart';
import Trendline from 'src/components/statistic/TrendLine';

const LocalCovidStatistics = () => (
  <Container maxWidth={false}>
    <Grid container spacing={2}>
      <Grid item lg={6} md={6} xl={6} xs={6}>
        <SummaryCluster />
      </Grid>
      <Grid item lg={6} md={6} xl={6} xs={6}>
        <Barchart />
        <Trendline />
      </Grid>
    </Grid>
  </Container>
);

export default LocalCovidStatistics;
