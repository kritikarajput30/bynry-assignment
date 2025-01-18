import { useSearchParams } from 'react-router-dom';
import MapComponent from '../components/MapComponent';

const Map = () => {
  const [searchParams] = useSearchParams();
  const lng = searchParams.get('lng');
  const lat = searchParams.get('lat');

  // Convert to numbers and handle potential errors
  const longitude = parseFloat(lng);
  const latitude = parseFloat(lat);

  if (isNaN(longitude) || isNaN(latitude)) {
    return <div>Please provide valid coordinates in the URL.</div>;
  }

  return (
    <div>
      <h1>Map Page</h1>
      <MapComponent coordinates={[longitude, latitude]} />
    </div>
  );
};

export default Map;
