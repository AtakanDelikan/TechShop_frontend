import React, { useState } from "react";
import { toastNotify } from "../Helper";
import {
  useBulkImportCategoriesMutation,
  useBulkImportCategoryAttributesMutation,
  useBulkImportProductsMutation,
} from "../Apis/bulkImportApi";

function BulkImport() {
  const [categoryFile, setCategoryFile] = useState<File | null>(null);
  const [attributeFile, setAttributeFile] = useState<File | null>(null);
  const [productFile, setProductFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [importCategories] = useBulkImportCategoriesMutation();
  const [importCategoryAttributes] = useBulkImportCategoryAttributesMutation();
  const [importProducts] = useBulkImportProductsMutation();

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setFile: React.Dispatch<React.SetStateAction<File | null>>
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];

      // Validate file type (must be CSV)
      if (file.type !== "text/csv" && !file.name.endsWith(".csv")) {
        toastNotify("Invalid file type. Please upload a CSV file.", "error");
        return;
      }

      // Validate file size (max 1MB)
      if (file.size > 1024 * 1024) {
        toastNotify(
          "File size exceeds 1MB. Please upload a smaller file.",
          "error"
        );
        return;
      }

      setFile(file);
    }
  };

  const handleUpload = async (file: File | null, endpoint: any) => {
    if (!file) {
      toastNotify("Please select a file first.", "error");
      return;
    }
    toastNotify("Uploading file. Please wait.", "info");
    setIsLoading(true);
    setCategoryFile(null);
    setAttributeFile(null);
    setProductFile(null);

    const response = await endpoint(file);
    console.log(response);
    if (response.error) {
      toastNotify("Failed to upload file.", "error");
    } else {
      toastNotify("File uploaded successfully!", "success");
    }

    setIsLoading(false);
  };

  return (
    <div className="container border mt-5 p-5 bg-light">
      <h2>Upload CSV Files</h2>
      <h5>
        Here you can populate the database with csv files. Visit github
        documentation for format of csv files.
      </h5>
      <div className="justify-content-center row mt-3">
        <div className="col-8">
          {/* Categories Upload */}
          <div className="m-5">
            <label className="form-label">Upload Categories CSV</label>
            <input
              type="file"
              className="form-control"
              onChange={(e) => handleFileChange(e, setCategoryFile)}
              disabled={isLoading}
            />
            <button
              className="btn btn-primary mt-2"
              onClick={() => handleUpload(categoryFile, importCategories)}
              disabled={isLoading}
            >
              Upload Categories
            </button>
          </div>

          {/* Category Attributes Upload */}
          <div className="m-5">
            <label className="form-label">Upload Category Attributes CSV</label>
            <input
              type="file"
              className="form-control"
              onChange={(e) => handleFileChange(e, setAttributeFile)}
              disabled={isLoading}
            />
            <button
              className="btn btn-primary mt-2"
              onClick={() =>
                handleUpload(attributeFile, importCategoryAttributes)
              }
              disabled={isLoading}
            >
              Upload Category Attributes
            </button>
          </div>

          {/* Products Upload */}
          <div className="m-5">
            <label className="form-label">Upload Products CSV</label>
            <input
              type="file"
              className="form-control"
              onChange={(e) => handleFileChange(e, setProductFile)}
              disabled={isLoading}
            />
            <button
              className="btn btn-primary mt-2"
              onClick={() => handleUpload(productFile, importProducts)}
              disabled={isLoading}
            >
              Upload Products
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BulkImport;
