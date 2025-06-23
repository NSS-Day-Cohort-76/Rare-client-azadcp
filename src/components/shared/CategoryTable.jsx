import { EditDeleteIconButtons } from "./EditDeleteIconButtons";

export const CategoryTable = ({ onEdit, onDelete, rows, columns, onRowClick }) => {
  return (
    <section className="section">
      <div className="container">
        <table className="table is-hoverable table is-bordered">
          <thead>
            <tr>
              <th></th>
              {columns.map((col) => (
                <th key={col.key}>{col.label}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {Array.isArray(rows) &&
              rows.map((row) => (
                <tr
                  key={row.id}
                  onClick={() => onRowClick && onRowClick(row.id)}
                  style={{ cursor: "pointer" }}>
                  <td>
                    <div className="is-flex">
                      <EditDeleteIconButtons
                        iconSrc="/images/edit-icon.svg"
                        altText="Edit"
                        tooltipContent="Edit Category"
                        onClick={(e) => {
                          e.stopPropagation();
                          onEdit(row.id);
                        }}
                      />
                      <EditDeleteIconButtons
                        iconSrc="/images/delete-icon.svg"
                        altText="Delete"
                        tooltipContent="Delete Category"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDelete(row.id);
                        }}
                      />
                    </div>
                  </td>
                  {columns.map((col) => (
                    <td key={col.key}>{row[col.key]}</td>
                  ))}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};
