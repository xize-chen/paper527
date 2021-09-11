import {
  Box,
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
    <PieChart />
    <br />
    <Map />
  </Box>
);

export default ChartCluster;
