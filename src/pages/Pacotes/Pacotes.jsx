import { useEffect } from "react";
import "./style.scss";
import BodyHeaderPacotes from "../../components/BodyHeaderPacotes";


const Pacotes = () => {
  
  useEffect(() => {
    window.axios.get("");
  }, []);

  return (
  
  <BodyHeaderPacotes />  
 
  )
};

export default Pacotes;
