import { EditDeleteIconButtons } from "./EditDeleteIconButtons";

export const PostTable = ({
  rows,
  columns,
  onEdit,
  onDelete,
  onSearch,
  onRowClick,
  isPostTable = false,
}) => {
  return (
    <section className="section">
      <div className="container">
        {/* Top: search + add button for post views only */}
        {isPostTable && (
          <div className="is-flex is-justify-content-space-between mb-3">
            <input
              className="input is-small"
              type="text"
              placeholder="Search"
              onChange={(e) => onSearch(e.target.value)}
              style={{ maxWidth: "300px" }}
            />
            <button className="button is-small is-primary">
              <span className="icon">
                <i className="fas fa-plus"></i>
              </span>
              <span>Add Post</span>
            </button>
          </div>
        )}

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
      </div>
    </section>
  );
};
