import {
  Container,
  Grid,
} from '@material-ui/core';
import { React, useState } from 'react';
import CompareCountry from 'src/components/statistic/CompareCountry';
import CompareCharts from 'src/components/statistic/CompareCharts';

const CompareCovidStatistics = () => {
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
    <Container maxWidth={false}>
      <Grid container spacing={2}>
        <Grid item lg={6} md={6} xl={6} xs={6}>
          <CompareCountry getCountry={handleCountryAData} />
        </Grid>
        <Grid item lg={6} md={6} xl={6} xs={6}>
          <CompareCountry getCountry={handleCountryBData} />
        </Grid>
      </Grid>
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
  );
};

export default CompareCovidStatistics;
