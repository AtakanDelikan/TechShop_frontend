import React, { useState } from "react";
import { useGetCategoriesQuery } from "../../Apis/categoryApi";
import { MainLoader } from "../../Components/Page/Common";
import { categoryModel } from "../../Interfaces";
import { SimpleTreeView, TreeItem } from "@mui/x-tree-view";

//TODO put renderTree into seperate file
function renderTree(categories: categoryModel[]) {
  return (
    <>
      {categories.map((category) => (
        <TreeItem itemId={category.id.toString()} label={category.name}>
          {category.subCategories.length > 0 &&
            renderTree(category.subCategories)}
        </TreeItem>
      ))}
    </>
  );
}

function CategoryList() {
  const [expanded, setExpanded] = useState([]);
  const [selected, setSelected] = useState("");

  const handleItemSelectionToggle = (
    event: React.SyntheticEvent,
    itemId: string,
    isSelected: boolean
  ) => {
    if (isSelected) {
      console.log("selected item is: " + itemId);
    }
  };

  const handleExpansion = (event: React.SyntheticEvent, itemIds: string[]) => {
    // stop event propagation so when expanding/colapsing item won't be selected
    event.stopPropagation();
  };

  const { data, isLoading } = useGetCategoriesQuery(null);
  if (isLoading) {
    return <MainLoader />;
  }
  return (
    <>
      <SimpleTreeView
        // expandedItems={expanded}
        // selectedItems={selected}
        onItemSelectionToggle={handleItemSelectionToggle}
        expansionTrigger="iconContainer"
        onExpandedItemsChange={handleExpansion}
      >
        {renderTree(data.result)}
      </SimpleTreeView>
    </>
  );
}

export default CategoryList;
