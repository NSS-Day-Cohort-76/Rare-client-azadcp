import { useEffect, useState } from "react";
import { deleteCategory, getAllCategories } from "../../managers/CategoryManager";
import { CategoryTable } from "../shared/CategoryTable";
import { useNavigate } from "react-router-dom";

export const CategoryManager = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate()


  useEffect(() => {
    getAllCategories().then(setCategories);
  }, []);

  const handleDelete = (id) => {
    deleteCategory(id).then(() => {
      setCategories(prev => prev.filter(cat => cat.id !== id))
    })
  }

  return (
    <CategoryTable
      categories={categories}
      onAdd={() => navigate("/categories/new")}
      onDelete={handleDelete}
      onEdit={(id) => navigate(`/categories/edit/${id}`)}
      onCategoryClick={(id) => navigate(`/categories/${id}/posts`)}
      // onSearch={}
    />
  );
};
