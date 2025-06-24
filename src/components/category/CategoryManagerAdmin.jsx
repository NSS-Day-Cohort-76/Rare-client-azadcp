import { useEffect, useState } from "react";
import { getAllCategories } from "../../managers/CategoryManager";
import { CategoryTable } from "../shared/CategoryTable";
import { Navigate, useNavigate } from "react-router-dom";

export const CategoryManager = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate


  useEffect(() => {
    getAllCategories().then(setCategories);
  }, []);


  return (
    <CategoryTable
      categories={categories}
      onAdd={() => navigate("/categories/new")}
      // onEdit={}
      // onDelete={}
      // onSearch={}
    />
  );
};
