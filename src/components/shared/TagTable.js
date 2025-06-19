import { EditDeleteIconButtons } from "../shared/EditDeleteIconButtons"

export const TagTable = ({ tags, onEdit, onDelete }) => (
  <section className="section">
    <div className="container">
      <table className="table is-fullwidth is-striped is-hoverable">
        <thead>
          <tr>
            <th></th> {/* Icon column */}
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(tags) && tags.map((tag) => (
            <tr key={tag.id}>
              <td>
                <div className="is-flex">
                  <EditDeleteIconButtons
                    iconSrc="/images/edit-icon.svg"
                    altText="Edit"
                    tooltipContent="Edit Tag"
                    onClick={() => onEdit(tag.id)}
                  />
                  <EditDeleteIconButtons
                    iconSrc="/images/delete-icon.svg"
                    altText="Delete"
                    tooltipContent="Delete Tag"
                    onClick={() => onDelete(tag.id)}
                  />
                </div>
              </td>
              <td>{tag.label}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </section>
)