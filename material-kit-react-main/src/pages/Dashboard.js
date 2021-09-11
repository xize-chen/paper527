/* eslint-disable no-unused-vars */
import { React, useState } from 'react';
import { Helmet } from 'react-helmet';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {
  Box,
} from '@material-ui/core';

// import Map from 'src/components/statistic/Map';
import LocalCovidStatistics from 'src/components/statistic/LocalCovidStatistics';
import WorldCovidStatistics from 'src/components/statistic/WorldCovidStatistics';
import CompareCovidStatistics from 'src/components/statistic/CompareCovidStatistics';

const DashboardTask = () => {
  const [value, setValue] = useState('one');

  const handleChange = (event, parValue) => {
    setValue(parValue);
  };
  return (
    <>
      <Helmet>
        <title>Dashboard | Task</title>
      </Helmet>
      <AppBar position="static" color="default">
        <Tabs value={value} onChange={handleChange}>
          <Tab value="one" label="Local statistic" />
          <Tab value="two" label="world statistics" />
          <Tab value="three" label="comparison" />
        </Tabs>
      </AppBar>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '50%',
          py: 1
        }}
      >
        {value === 'one' && <LocalCovidStatistics />}
        {value === 'two' && <WorldCovidStatistics />}
        {value === 'three' && <CompareCovidStatistics />}
      </Box>
    </>
  );
};

export default DashboardTask;
