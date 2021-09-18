import {
  Container,
  Grid,
} from '@material-ui/core';
import { React, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Country from 'src/components/statistic/Country';
import DoubleTrendLine from 'src/components/statistic/DoubleTrendLine';
import service from 'src/services/Server';

const clone = require('clone');

const VPCompareCovidStatistics = ({ defaultCountry }) => {
  const [dataset, setDataset] = useState([{ country: defaultCountry, line: [] },
    { country: defaultCountry, line: [] }]);
  const refreshLines = async (index, newLocation, isCopy = false) => {
    const resPast12Month = await service.getPastYearDataByLocation(newLocation);
    const datasetClone = clone(dataset);
    datasetClone[index].country = newLocation;
    datasetClone[index].line = resPast12Month;
    if (isCopy) {
      datasetClone[index + 1].country = newLocation;
      datasetClone[index + 1].line = resPast12Month;
    }
    setDataset(datasetClone);
  };

  const locationChanged1 = (newLocation) => {
    refreshLines(0, newLocation);
  };

  const locationChanged2 = (newLocation) => {
    refreshLines(1, newLocation);
  };

  useEffect(() => {
    refreshLines(0, defaultCountry, true);
  }, []);

  return (
    <Container maxWidth={false}>
      <Grid container spacing={2}>
        <Grid item lg={6} md={6} xl={6} xs={6}>
          <Country metricValue={dataset[0].country} valueChanged={locationChanged1} />
        </Grid>
        <Grid item lg={6} md={6} xl={6} xs={6}>
          <Country metricValue={dataset[1].country} valueChanged={locationChanged2} />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item lg={12} md={12} xl={12} xs={12}>
          <DoubleTrendLine array={dataset} confirmed />
        </Grid>
      </Grid>
    </Container>
  );
};

VPCompareCovidStatistics.propTypes = {
  defaultCountry: PropTypes.string,
};

export default VPCompareCovidStatistics;
