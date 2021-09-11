import {
  Container,
  Grid,
} from '@material-ui/core';
import SummaryClusterTotal from 'src/components/statistic/SummaryClusterTotal';
import ChartCluster from 'src/components/statistic/ChartCluster';

const countryDatas = [
  {
    name: 'CHINA',
    cases: 123,
    death: 1231,
  },
  {
    name: 'NZ',
    cases: 12312,
    death: 23423,
  },
  {
    name: 'USA',
    cases: 1231,
    death: 6546456,
  },
  {
    name: 'AUS',
    cases: 24524,
    death: 11122,
  },
  {
    name: 'UK',
    cases: 187679,
    death: 17282,
  },
];

const WorldCovidStatistics = () => (
  <Container>
    <Grid container spacing={2}>
      <Grid item lg={6} md={6} xl={6} xs={6}>
        <SummaryClusterTotal countryDatas={countryDatas} />
      </Grid>
      <Grid item lg={6} md={6} xl={6} xs={6}>
        <ChartCluster />
      </Grid>
    </Grid>
  </Container>
);

export default WorldCovidStatistics;
