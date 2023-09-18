import { useEffect } from "react";
import BodyHeaderHome from "../../components/BodyHeaderHome";

const Home = () => {
  
  useEffect(() => {
    window.axios.get("");
  }, []);

  return (
    <BodyHeaderHome />
  
  )
  
  
};

export default Home;
