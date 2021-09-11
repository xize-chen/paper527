import {
  Box,
  Grid,
} from '@material-ui/core';
import PieChart from 'src/components/statistic/PieChart';
import Map from './Map';

const ChartCluster = () => (
  <Box
    sx={{
      height: '100%',
      position: 'relative'
    }}
  >
    <Grid container spacing={2}>
      <Grid item lg={12} sm={12} xl={12} xs={12}>
        <Map />
      </Grid>
      <Grid item lg={12} sm={12} xl={12} xs={12}>
        <PieChart />
      </Grid>
    </Grid>
  </Box>
);

export default ChartCluster;
