import BodyHeaderCronograma from "@/components/BodyHeaderCronograma/BodyHeaderCronograma";
import { useEffect } from "react";
import "./style.scss";

const Cronograma = () => {
  useEffect(() => {
    window.axios.get("");
  }, []);

  return <BodyHeaderCronograma />;
};

export default Cronograma;
