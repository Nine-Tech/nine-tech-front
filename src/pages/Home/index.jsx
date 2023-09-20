import { useEffect } from "react";
import BodyHeaderHome from "../../components/BodyHeaderHome";
import CardsProjeto from "../../components/CardsProjeto";

const Home = () => {
  
  useEffect(() => {
    window.axios.get("");
  }, []);

  return (
    <>
      <BodyHeaderHome />
      <CardsProjeto />
    </>
  )
  
  
};

export default Home;
