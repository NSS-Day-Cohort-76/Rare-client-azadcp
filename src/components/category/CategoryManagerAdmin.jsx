// import { getAllCategories } from "../../managers/CategoryManager.js";
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { CategoryTable } from "../shared/CategoryTable.jsx";
// import { ConfirmDeleteModal } from "../shared/ConfirmDeleteModal";

// export const CategoryManager = () => {
//   const [categories, setCategories] = useState([]);
//   const [showModal, setShowModal] = useState(false); //
//   const navigate = useNavigate();
//   const [selectedCategoryId, setSelectedCategoryId] = useState(null); //

//   const sortedCategories = [...categories].sort((a, b) => a.label.localeCompare(b.label));
//   useEffect(() => {
//     getAllCategories().then((data) => {
//       setCategories(data);

//     });
//   }, []);

//   // console.log(sortedCategories);
//   const handleRowClick = (postId) => {
//     navigate(`/posts/${postId}`);
//   };

//   const handleEdit = (categoryId) => {
//     navigate(`/category/${categoryId}/edit`);
//   };

//   const handleDelete = (categoryId) => {
//     setSelectedCategoryId(categoryId);
//     setShowModal(true);
//   };

//   const confirmDelete = () => {
//     console.log("🧨 Delete confirmed for category:", selectedCategoryId);
//     setShowModal(false);
//     // TODO: Add fetch DELETE logic here if needed
//   };

//   const cancelDelete = () => {
//     setSelectedCategoryId(null);
//     setShowModal(false);
//   };

//   return (
//     <>
//       <CategoryTable
//         rows={sortedCategories}
//         key={categories}
//         columns={[{ key: "label", label: "Category" }]}
//         onRowClick={handleRowClick}
//         onEdit={handleEdit}
//         onDelete={handleDelete}
//       />

//       <ConfirmDeleteModal show={showModal} onCancel={cancelDelete} onConfirm={confirmDelete} />
//     </>
//   );
// import { EditDeleteIconButtons } from "./EditDeleteIconButtons";

// export const CategoryManager = ({
//   rows,
//   columns,
//   onEdit,
//   onDelete,
//   onRowClick,
//   isPostTable = false,
// }) => {
//   return (
//     <section className="section">
//       <div className="container">
//         <table className="table is-fullwidth is-striped is-hoverable">
//           <thead>
//             <tr>
//               <th></th>
//               {columns.map((col) => (
//                 <th key={col.key}>{col.label}</th>
//               ))}
//             </tr>
//           </thead>

//           <tbody>
//             {Array.isArray(rows) &&
//               rows.map((row) => (
//                 <tr
//                   key={row.id}
//                   onClick={() => onRowClick && onRowClick(row.id)}
//                   style={{ cursor: "pointer" }}>
//                   <td>
//                     <div className="is-flex">
//                       <EditDeleteIconButtons
//                         iconSrc="/images/edit-icon.svg"
//                         altText="Edit"
//                         tooltipContent="Edit"
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           onEdit(row.id);
//                         }}
//                       />
//                       <EditDeleteIconButtons
//                         iconSrc="/images/delete-icon.svg"
//                         altText="Delete"
//                         tooltipContent="Delete"
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           onDelete(row.id);
//                         }}
//                       />
//                     </div>
//                   </td>
//                   {columns.map((col) => (
//                     <td key={col.key}>
//                       : Array.isArray(row[col.key]) ? ( row[col.key].join(", ") ) : row[col.key]
//                     </td>
//                   ))}
//                 </tr>
//               ))}
//           </tbody>
//         </table>
//       </div>
//     </section>
//   );
// };

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
