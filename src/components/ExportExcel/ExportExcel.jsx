import { useEffect, useState } from "react";
import * as XLSX from "xlsx";

const ExcelDownloadButton = (props) => {
  const { rota } = props;
  const [dataExcel, setDataExcel] = useState([]);

  useEffect(() => {
    window.axios
      .get(`${rota}`)
      .then((response) => {
        setDataExcel(response.data);
      })
      .catch((error) => {
        console.error("Erro ao obter os dados do Excel:", error);
      });
  }, [caminho]); // Use uma lista de dependências vazia para que o useEffect seja executado apenas uma vez

  const handleDownload = () => {
    const ws = XLSX.utils.aoa_to_sheet(dataExcel);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, "exemplo.xlsx");
  };

  return <button onClick={handleDownload}>Baixar Excel</button>;
};

export default ExcelDownloadButton;
