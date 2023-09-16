import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    window.axios.get("");
  }, []);

  return <div>Home</div>;
};

export default Home;
