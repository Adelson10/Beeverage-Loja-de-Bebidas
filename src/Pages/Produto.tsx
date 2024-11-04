import { useLocation } from 'react-router-dom';
import useFetch from '../hooks/useFetch';

const Produto = () => {
  const url = useLocation();  
  const {json} = useFetch<productModal[]>(url.pathname);
  console.log(json);
  
  return (
    <div>
        
    </div>
  )
}

export default Produto;