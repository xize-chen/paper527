/* eslint-disable no-unused-vars */
import { React, useState } from 'react';
import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  Grid,
  Typography,
} from '@material-ui/core';
// import Map from 'src/components/statistic/Map';
import SummaryCluster from 'src/components/statistic/SummaryCluster';
import ChartCluster from 'src/components/statistic/ChartCluster';
import SummaryClusterTotal from 'src/components/statistic/SummaryClusterTotal';
import CompareCountry from 'src/components/statistic/CompareCountry';
import CompareCharts from 'src/components/statistic/CompareCharts';
import Barchart from 'src/components/statistic/BarChart';
import Trendline from 'src/components/statistic/TrendLine';

const DashboardTask = () => {
  console.log('DashboardTask load...');

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

  const [countryA, setCountryA] = useState(null);
  const [countryB, setCountryB] = useState(null);

  const handleCountryAData = (obj) => {
    setCountryA(obj);
  };

  const handleCountryBData = (obj) => {
    setCountryB(obj);
  };

  const compareData = () => ({
    names: [countryA.name, countryB.name],
    case: [countryA.case, countryB.case],
    death: [countryA.death, countryB.death]
  });

  return (
    <>
      <Helmet>
        <title>Dashboard | Task</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth={false}>

          <Container maxWidth={false}>
            <Typography variant="h1" align="center">
              LOCAL COVID STATISTICS
            </Typography>
            <br />
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

          <br />
          <br />
          <br />
          <Typography variant="h1" align="center">
            {'total worldwide covid STATISTICS'.toUpperCase()}
          </Typography>
          <br />
          <Grid container spacing={2}>
            <Grid item lg={6} md={6} xl={6} xs={6}>
              <SummaryClusterTotal countryDatas={countryDatas} />
            </Grid>
            <Grid item lg={6} md={6} xl={6} xs={6}>
              <ChartCluster />
            </Grid>
          </Grid>

        </Container>

        <Container maxWidth={false}>

          <br />
          <br />
          <br />
          <br />

          <Grid container spacing={2}>

            <Grid item lg={6} md={6} xl={6} xs={6}>
              <CompareCountry getCountry={handleCountryAData} />
            </Grid>
            <Grid item lg={6} md={6} xl={6} xs={6}>
              <CompareCountry getCountry={handleCountryBData} />
            </Grid>
          </Grid>

          <br />

          {
                (countryA && countryB)
                  ? (
                    <Grid container spacing={2}>

                      <Grid item lg={6} md={6} xl={6} xs={6}>
                        <CompareCharts
                          chartLabel="Total Cases and Death Count per Country"
                          compareData={compareData()}
                        />
                      </Grid>

                      <Grid item lg={6} md={6} xl={6} xs={6}>
                        <CompareCharts
                          chartLabel="Total Cases and Death Count per 1000 per country"
                          compareData={compareData()}
                        />
                      </Grid>

                    </Grid>
                  )
                  : <h3>Please select two different countries to compare</h3>
              }

        </Container>
      </Box>
    </>
  );
};

export default DashboardTask;
