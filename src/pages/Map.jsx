import { useSearchParams } from 'react-router-dom';
import MapComponent from '../components/MapComponent';
import { IoArrowBack } from 'react-icons/io5';

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
      <button onClick={()=>{}} className=' bg-white shadow-md border border-b-2 p-2 flex items-center text-2xl'>
      <IoArrowBack className=' text-2xl'/>
<p>back</p>
      </button>
      <MapComponent coordinates={[longitude, latitude]} />
    </div>
  );
};

export default Map;
