import {
  Box,
} from '@material-ui/core';
import BarChart from 'src/components/statistic/BarChart';
import TrendLine from 'src/components/statistic/TrendLine';
import PropTypes from 'prop-types';
import Map from './Map';

const ChartCluster = ({ page }) => {
  switch (page) {
    case 'total':
      return (
        <Box
          sx={{
            height: '100%',
            position: 'relative'
          }}
        >
          <TrendLine />

          <br />

          <Map />
        </Box>
      );

    default:
      return (
        <Box
          sx={{
            height: '100%',
            position: 'relative'
          }}
        >
          <BarChart />

          <br />

          <TrendLine />
        </Box>
      );
  }
};

ChartCluster.propTypes = {
  page: PropTypes.string.isRequired,
};

export default ChartCluster;
