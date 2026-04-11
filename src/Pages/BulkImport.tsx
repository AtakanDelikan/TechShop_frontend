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
  const [productFiles, setProductFiles] = useState<FileList | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [importCategories] = useBulkImportCategoriesMutation();
  const [importCategoryAttributes] = useBulkImportCategoryAttributesMutation();
  const [importProducts] = useBulkImportProductsMutation();

  // --- Handler for single files (Categories, Attributes) ---
  const handleSingleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setFile: React.Dispatch<React.SetStateAction<File | null>>
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];

      if (file.type !== "text/csv" && !file.name.endsWith(".csv")) {
        toastNotify("Invalid file type. Please upload a CSV file.", "error");
        return;
      }
      if (file.size > 1024 * 1024) {
        toastNotify("File size exceeds 1MB. Please upload a smaller file.", "error");
        return;
      }
      setFile(file);
    }
  };

  // --- Handler for multiple files (Products) ---
  const handleMultipleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const files = Array.from(event.target.files);
      
      // Validate all selected files
      for (let i = 0; i < files.length; i++) {
        if (files[i].type !== "text/csv" && !files[i].name.endsWith(".csv")) {
          toastNotify(`Invalid file: ${files[i].name}. Must be CSV.`, "error");
          return;
        }
      }
      // Store the entire FileList in state
      setProductFiles(event.target.files);
    }
  };

  // --- Upload executor for single files ---
  const handleSingleUpload = async (file: File | null, endpoint: any) => {
    if (!file) {
      toastNotify("Please select a file first.", "error");
      return;
    }
    
    setIsLoading(true);
    toastNotify("Uploading file. Please wait.", "info");

    // Construct FormData for single file
    const formData = new FormData();
    formData.append("file", file);

    const response = await endpoint(formData);
    
    if (response.error) {
      toastNotify("Failed to upload file.", "error");
    } else {
      toastNotify("File uploaded successfully!", "success");
      setCategoryFile(null);
      setAttributeFile(null);
    }
    setIsLoading(false);
  };

  // --- Upload executor for multiple files ---
  const handleMultipleUpload = async () => {
    if (!productFiles || productFiles.length === 0) {
      toastNotify("Please select product files first.", "error");
      return;
    }

    setIsLoading(true);
    toastNotify("Uploading products. Please wait.", "info");

    const formData = new FormData();
    
    for (let i = 0; i < productFiles.length; i++) {
      formData.append("files", productFiles[i]);
    }

    const response = await importProducts(formData);
    
    if (response.error) {
      toastNotify("Failed to upload products.", "error");
    } else {
      toastNotify("All product files uploaded successfully!", "success");
      setProductFiles(null);
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
              accept=".csv"
              className="form-control"
              onChange={(e) => handleSingleFileChange(e, setCategoryFile)}
              disabled={isLoading}
            />
            <button
              className="btn btn-primary mt-2"
              onClick={() => handleSingleUpload(categoryFile, importCategories)}
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
              accept=".csv"
              className="form-control"
              onChange={(e) => handleSingleFileChange(e, setAttributeFile)}
              disabled={isLoading}
            />
            <button
              className="btn btn-primary mt-2"
              onClick={() => handleSingleUpload(attributeFile, importCategoryAttributes)}
              disabled={isLoading}
            >
              Upload Category Attributes
            </button>
          </div>

          {/* Products Upload*/}
          <div className="m-5">
            <label className="form-label">Upload Products CSV</label>
            <input
              type="file"
              accept=".csv"
              multiple
              className="form-control"
              onChange={handleMultipleFileChange}
              disabled={isLoading}
            />
            <button
              className="btn btn-primary mt-2"
              onClick={handleMultipleUpload}
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