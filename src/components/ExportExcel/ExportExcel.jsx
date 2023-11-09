import React from "react";
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
  }, [rota]);

  const handleDownload = () => {
    if (dataExcel.length === 0) {
      console.error("Os dados do Excel estão vazios");
      return;
    }

    const headers = Object.keys(dataExcel[0]);

    const rows = dataExcel.map((item) => headers.map((header) => item[header]));

    rows.unshift(headers);

    const ws = XLSX.utils.aoa_to_sheet(rows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "WBS");

    // Faça o download do arquivo
    XLSX.writeFile(wb, "data.xlsx");
  };

  return <button className="btn btn-secondary me-3" onClick={handleDownload}>Baixar Excel</button>;

};

export default ExcelDownloadButton;
