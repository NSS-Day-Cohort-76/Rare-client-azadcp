export const ConfirmDeleteModal = ({ show, onCancel, onConfirm }) => {
  if (!show) return null;

  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={onCancel}></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Confirm Deletion</p>
          <button className="delete" aria-label="close" onClick={onCancel}></button>
        </header>
        <section className="modal-card-body">Are you sure you want to delete this post?</section>
        <footer className="modal-card-foot is-justify-content-flex-end">
          <button className="button is-danger" onClick={onConfirm}>
            Delete
          </button>
          <button className="button" onClick={onCancel}>
            Cancel
          </button>
        </footer>
      </div>
    </div>
  );
};
