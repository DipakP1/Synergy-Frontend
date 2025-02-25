import { enqueueSnackbar } from "notistack";
import {
  exportToPdf,
  exportdataExcel,
} from "../(admin)/admin/components/Export/exportData";

const GeneratePDF = async (headers: string[], fileName: string, rows: any) => {
  try {
    if (Array.isArray(rows) && rows.length > 0) {
      await exportToPdf(rows, "pdf", headers, fileName);
    } else {
      enqueueSnackbar("No data Available", {
        variant: "error",
      });
    }
  } catch (error) {
    console.log("error:", error);
  }
};

const ExportDataIntoExcel = async (
  title?: string,
  worksheetname?: string,
  rows?: any,
) => {
  try {
    if (Array.isArray(rows) && rows.length > 0) {
      exportdataExcel(rows, "excel", title, worksheetname);
    }
  } catch (error) {
    console.log("error:", error);
  }
};

export { ExportDataIntoExcel, GeneratePDF };
