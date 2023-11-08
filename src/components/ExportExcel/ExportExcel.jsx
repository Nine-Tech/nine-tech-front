import React from "react";
import * as XLSX from "xlsx";
import * as XlsxPopulate from "xlsx-populate/browser/xlsx-populate";

const ExcelExportButton = ({ data }) => {
  const createDownloadData = () => {
    handleExport().then((url) => {
      const downloadAnchorNode = document.createElement("a");
      downloadAnchorNode.setAttribute("href", url);
      downloadAnchorNode.setAttribute("download", "data.xlsx");
      downloadAnchorNode.click();
      downloadAnchorNode.remove();
    });
  };

  const workbookToBlob = (workbook) => {
    const wopts = {
      bookType: "xlsx",
      bookSST: false,
      type: "buffer", // Use "buffer" instead of "blob"
    };

    const wbout = XLSX.write(workbook, wopts);

    const buffer = wbout.buffer;

    const blob = new Blob([buffer], { type: "application/octet-stream" });

    return blob;
  };
//   const s2ab = (s) => {
//     const buf = new ArrayBuffer(s.length);
//     const view = new Uint8Array(buf);
//     for (let i = 0; i !== s.length; ++i) {
//       view[i] = s.charCodeAt(i);
//     }
//     return buf;
//   };

  const handleExport = () => {
    let table = [
      {
        Nome: "Nome",
        Idade: "Idade",
        Cidade: "Cidade",
        Profissão: "Profissão",
      },
    ];

    data.forEach((row) => {
      table.push({
        Nome: row.Nome,
        Idade: row.Idade,
        Cidade: row.Cidade,
        Profissão: row.Profissão,
      });
    });

    const finalData = [...table];

    const wb = XLSX.utils.book_new();

    const sheet = XLSX.utils.json_to_sheet(finalData, {
      skipHeader: true,
    });

    XLSX.utils.book_append_sheet(wb, sheet, "data");

    const workbookBlob = workbookToBlob(wb);

    const dataInfo = {
      titleCell: "A2",
      titleRange: "A1:D2",
      tbodyRange: `A3:D${finalData.length}`,
      theadRange: "A3:D3",
    };

    return addStyle(workbookBlob, dataInfo);
  };

  const addStyle = (workbookBlob, dataInfo) => {
    return XlsxPopulate.fromDataAsync(workbookBlob).then((workbook) => {
      workbook.sheets().forEach((sheet) => {
        sheet.usedRange().style({
          fontFamily: "Arial",
          verticalAlignment: "center",
        });

        sheet.range(dataInfo.titleRange).merged(true).style({
          bold: true,
          horizontalAlignment: "center",
          verticalAlignment: "center",
        });

        sheet.range(dataInfo.tbodyRange).style({
          horizontalAlignment: "center",
        });

        sheet.range(dataInfo.theadRange).style({
          fill: "FFFD04",
          bold: true,
          horizontalAlignment: "center",
        });
      });

      return workbook
        .outputAsync()
        .then((workbookBlob) => URL.createObjectURL(workbookBlob));
    });
  };

  return (
    <button
      className="btn btn-secondary"
      onClick={() => {
        createDownloadData();
      }}
    >
      Exportar para Excel
    </button>
  );
};

export default ExcelExportButton;
