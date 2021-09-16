/* eslint-disable react/prop-types */
import
{
  MapContainer,
  MapConsumer,
  TileLayer,
  CircleMarker,
  Popup,
} from 'react-leaflet';
import
{
  Box,
} from '@material-ui/core';
import 'leaflet/dist/leaflet.css';
import numberWithCommas from 'src/utils/numberWithCommas';

const Map = ({ topTenCases }) => {
  const totalSumCases = topTenCases.reduce((a, b) => a + b.total_cases, 0);
  const colorFunc = (props) => {
    if (props <= 0.1) return '#FF8000';
    if (props > 0.1 && props < 0.2) {
      return '#0000FF';
    }
    return '#ff0000';
  };

  const countries = topTenCases.map((i) => ({
    name: i.location,
    color: colorFunc(i.total_cases / totalSumCases),
    radius: (i.total_cases / totalSumCases) * 12,
    location: [Number(i.latitude), Number(i.longitude)],
    cases: i.total_cases,
    deaths: i.total_deaths
  }));
  return (
    <Box
      sx={{
        height: 350,
        position: 'relative'
      }}
    >
      <MapContainer
        center={[49, 72]}
        zoom={1}
        scrollWheelZoom={false}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapConsumer>
          {(map) => {
            console.log('map center:', map.getCenter());
            map.on('click', (e) => {
              const { lat, lng } = e.latlng;
              console.log(`MapConsumer, ${map.getZoom()},${map.getCenter()}, ${lat}, ${lng}`);
            });
            return null;
          }}
        </MapConsumer>
        {countries.map((country, index) => (
          <CircleMarker
            center={country.location}
            key={index.toString()}
            fillColor={country.color}
            color={country.color}
            radius={5 * country.radius}
            fillOpacity={1}
          >
            <Popup>
              <b>{country.name}</b>
              <br />

              Total cases :
              {numberWithCommas(country.cases)}
              <br />
              Total deaths :
              {numberWithCommas(country.deaths)}
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </Box>
  );
};

export default Map;
