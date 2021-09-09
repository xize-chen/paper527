import { React, useState } from 'react';
import { Helmet } from 'react-helmet';
import
{
  Box,
  Container,
  Grid,
  Typography,
} from '@material-ui/core';
// import Map from 'src/components/statistic/Map';
import SummaryCluster from 'src/components/statistic/SummaryCluster';
import ChartCluster from 'src/components/statistic/ChartCluster';
import SummaryClusterTotal from 'src/components/statistic/SummaryClusterTotal';
import PropTypes from 'prop-types';
import CompareCountry from 'src/components/statistic/CompareCountry';
import CompareCharts from 'src/components/statistic/CompareCharts';

const DashboardTask = ({ page }) => {
  console.log('DashboardTask load...');

  const countryDatas = [
    {
      name: 'china',
      cases: 123,
      death: 1231,
    },
    {
      name: 'nz',
      cases: 12312,
      death: 23423,
    },
    {
      name: 'usa',
      cases: 1231,
      death: 6546456,
    },
    {
      name: 'mas',
      cases: 24524,
      death: 11122,
    },
    {
      name: 'maori',
      cases: 187679,
      death: 17282,
    },
    {
      name: 'vasd',
      cases: 2519,
      death: 56456,
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

  switch (page) {
    case 'total':
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
              <Grid container spacing={2}>
                <Grid item lg={6} md={6} xl={6} xs={6}>
                  <SummaryClusterTotal countryDatas={countryDatas} />
                </Grid>
                <Grid item lg={6} md={6} xl={6} xs={6}>
                  <ChartCluster page={page} />
                </Grid>
              </Grid>
            </Container>
          </Box>
        </>
      );

    case 'compare':
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
              <Typography variant="h2" align="center">
                Compare coyuntry dashbaord
              </Typography>

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
                        chartLabel="Bar graph total cases and death numbers per country"
                        compareData={compareData()}
                      />
                    </Grid>

                    <Grid item lg={6} md={6} xl={6} xs={6}>
                      <CompareCharts
                        chartLabel="Bar graph cases and death number per 1000 per country"
                        compareData={compareData()}
                      />
                    </Grid>

                  </Grid>
                )
                : <h3>You have to select both country</h3>
            }

            </Container>
          </Box>
        </>
      );

    default:
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
              <Grid container spacing={2}>
                <Grid item lg={6} md={6} xl={6} xs={6}>
                  <SummaryCluster />
                </Grid>
                <Grid item lg={6} md={6} xl={6} xs={6}>
                  <ChartCluster />
                </Grid>

              </Grid>
            </Container>
          </Box>
        </>
      );
  }
};

DashboardTask.propTypes = {
  page: PropTypes.string.isRequired,
};

export default DashboardTask;
