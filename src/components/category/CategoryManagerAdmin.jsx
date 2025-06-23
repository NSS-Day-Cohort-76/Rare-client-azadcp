import { useEffect, useState } from "react";
import { getAllCategories } from "../../managers/CategoryManager";
import { CategoryTable } from "../shared/CategoryTable";

export const CategoryManager = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getAllCategories().then(setCategories);
  }, []);

  console.log(categories);

  return (
    <CategoryTable
      categories={categories}
      // onEdit={}
      // onDelete={}
      // onSearch={}
      // onAdd={}
    />
  );
};
