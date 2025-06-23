import { EditDeleteIconButtons } from "./EditDeleteIconButtons";

export const PostTable = ({ rows, columns, onEdit, onDelete, onRowClick }) => {
  return (
    <>
      <table className="table is-fullwidth is-striped is-hoverable">
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
                      tooltipContent="Edit"
                      onClick={(e) => {
                        e.stopPropagation();
                        onEdit(row.id);
                      }}
                    />
                    <EditDeleteIconButtons
                      iconSrc="/images/delete-icon.svg"
                      altText="Delete"
                      tooltipContent="Delete"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete(row.id);
                      }}
                    />
                  </div>
                </td>
                {columns.map((col) => (
                  <td key={col.key}>
                    {col.key === "approved" ? (
                      <input type="checkbox" checked={row[col.key] === 1} disabled />
                    ) : Array.isArray(row[col.key]) ? (
                      row[col.key].join(", ")
                    ) : (
                      row[col.key]
                    )}
                  </td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};
