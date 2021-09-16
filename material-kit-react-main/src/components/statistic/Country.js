import
{
  TextField,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useLocation } from 'react-router-dom';
import { React, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import service from 'src/services/Server';

const Country = ({
  metricValue, valueChanged
}) => {
  const location = useLocation();
  const [value, setValue] = useState({ title: metricValue, name: metricValue });
  const [countries, setCountries] = useState([{ title: 'New Zealand', name: 'New Zealand' }]);
  useEffect(async () => {
    const countryArr = await service.getCountries();
    if (countryArr !== undefined && countryArr.length > 0) {
      const array = [];
      countryArr.map((item) => array.push({ title: item.country, name: item.country }));
      setCountries(array);
    }
  }, [location.pathname]);

  return (
    <Autocomplete
      id="combo-box-demo"
      value={value}
      getOptionSelected={(option, optionValue) => option.name === optionValue.name}
      onChange={(event, newValue) => {
        if (newValue !== null && newValue.name !== value.name) {
          setValue(newValue);
          valueChanged(newValue.name);
        }
      }}
      options={countries}
      getOptionLabel={(option) => option.title}
      style={{ width: 400 }}
      renderInput={(params) => <TextField {...params} variant="outlined" />}
    />
  );
};

Country.propTypes = {
  metricValue: PropTypes.string.isRequired,
  valueChanged: PropTypes.func.isRequired,
};

export default Country;
