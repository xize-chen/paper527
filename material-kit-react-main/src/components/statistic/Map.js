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

const Map = () => {
  console.log('load...Map');
  const countries = [
    {
      name: 'India', color: '#ff0000', radius: 8, location: [18, 77]
    },
    {
      name: 'China', color: '#41ff01', radius: 1, location: [36, 113]
    },
    {
      name: 'United States', color: '#5f24a6', radius: 5, location: [55, 247]
    },
    {
      name: 'Australia', color: '#1f01ff', radius: 2, location: [-26, 132]
    }];
  return (
    <Box
      sx={{
        height: 300,
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
              {country}
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </Box>
  );
};

export default Map;
