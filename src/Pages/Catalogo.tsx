import { useParams } from "react-router-dom";
import { useCurrentPage } from "../utils/context/CurrentPage";
import React from "react";

const Catalogo = () => {
  const {setCurrentPage}: ValueProps = useCurrentPage();
  const params = useParams();

  React.useEffect(() => {
    setCurrentPage(Object.keys(params)[0]);
  },[]);
  
  return (
    <div>Catalogo</div>
  )
}

export default Catalogo;