import { useSearchParams } from 'react-router-dom';
import MapComponent from '../components/MapComponent';

const Map = () => {
  const [searchParams] = useSearchParams();
  const lng = searchParams.get('lng');
  const lat = searchParams.get('lat');

  if (!lng || !lat) {
    return <div>Please provide valid coordinates in the URL.</div>;
  }

  return (
    <div>
      <h1>Map Page</h1>
      <MapComponent coordinates={[lng,lat]}  />
    </div>
  );
};

export default Map;
