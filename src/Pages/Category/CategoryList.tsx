import React, { useState } from "react";
import {
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
} from "../../Apis/categoryApi";
import { MainLoader } from "../../Components/Page/Common";
import { apiResponse, categoryModel } from "../../Interfaces";
import { SimpleTreeView, TreeItem } from "@mui/x-tree-view";
import { toastNotify } from "../../Helper";
import { useNavigate } from "react-router-dom";

function CategoryList() {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState<string[]>([]);
  // const [selected, setSelected] = useState("");

  const [deleteCategory] = useDeleteCategoryMutation();

  // const handleItemSelectionToggle = (
  //   event: React.SyntheticEvent,
  //   itemId: string,
  //   isSelected: boolean
  // ) => {
  //   if (isSelected) {
  //     console.log("selected item is: " + itemId);
  //   }
  // };

  const handleDelete = async (id: number) => {
    const response: apiResponse = await deleteCategory(id);

    if (!response.data || !response.data?.isSuccess) {
      toastNotify(
        "Category could't be deleted! Make sure the category doesn't have any sub-categories or product in it!",
        "error"
      );
    } else if (response.data) {
      toastNotify("Category deleted successfully!");
    }
  };

  function renderTree(categories: categoryModel[]) {
    return (
      <>
        {categories.map((category) => (
          <TreeItem
            itemId={category.id.toString()}
            label={
              <div>
                {category.name}
                <button
                  type="button"
                  className="btn btn-danger btn-sm m-1"
                  style={{ padding: "0rem 0.2rem" }}
                  onClick={() => handleDelete(category.id)}
                >
                  <i className="bi bi-x"></i>
                </button>
                <button
                  type="button"
                  className="btn btn-success btn-sm"
                  style={{ padding: "0rem 0.2rem" }}
                  onClick={() => console.log("Not implemented yet!")}
                >
                  <i className="bi bi-pencil-fill"></i>
                </button>
              </div>
            }
          >
            {category.subCategories.length > 0 &&
              renderTree(category.subCategories)}
          </TreeItem>
        ))}
      </>
    );
  }

  const handleExpansion = (event: React.SyntheticEvent, itemIds: string[]) => {
    // stop event propagation so when expanding/colapsing item won't be selected
    event.stopPropagation();
    setExpanded(itemIds);
  };

  const extractCategoryIds = (treeData: categoryModel[]): string[] => {
    const ids: string[] = [];
    const traverse = (items: categoryModel[]) => {
      for (const item of items) {
        ids.push(item.id.toString());
        if (item.subCategories) {
          traverse(item.subCategories);
        }
      }
    };
    traverse(treeData);
    return ids;
  };

  const handleExpandClick = () => {
    setExpanded((oldExpanded) =>
      oldExpanded.length === 0 && allCategoryIds ? allCategoryIds : []
    );
  };

  const { data, isLoading } = useGetCategoriesQuery(null);
  const allCategoryIds = data?.result?.length
    ? extractCategoryIds(data.result)
    : [];

  if (isLoading) {
    return <MainLoader />;
  }
  return (
    <>
      <h1 className="mt-5 text-center">Categories</h1>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-2"></div> {/* 20% empty space */}
          <div className="col-8 m-2 p-2 position-relative">
            <div className="m-3">
              <span
                style={{
                  cursor: "pointer",
                  color: "blue",
                }}
                onClick={handleExpandClick}
              >
                {expanded.length === 0 ? "Expand all" : "Collapse all"}
              </span>
              <button
                className="btn btn-success position-absolute top-0 end-0"
                onClick={() => navigate("/category/categoryCreate")}
              >
                Add New
              </button>
            </div>
            <SimpleTreeView
              expandedItems={expanded}
              // selectedItems={selected}
              // onItemSelectionToggle={handleItemSelectionToggle}
              expansionTrigger="iconContainer"
              onExpandedItemsChange={handleExpansion}
            >
              {renderTree(data.result)}
            </SimpleTreeView>
          </div>
          <div className="col-2"></div> {/* 20% empty space */}
        </div>
      </div>
    </>
  );
}

export default CategoryList;
