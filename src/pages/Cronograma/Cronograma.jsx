import BodyHeaderCronograma from "../../components/BodyHeaderCronograma/BodyHeaderCronograma";
import "./style.scss";



const Cronograma = () => {
  
  useEffect(() => {
    window.axios.get("");
  }, []);

  return (
  
  <BodyHeaderCronograma />  
 
  )
};

export default Cronograma;
