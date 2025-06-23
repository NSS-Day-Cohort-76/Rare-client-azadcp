export const SharedPostButton = ({ className, onClick, children }) => {
  return (
    <div>
      <button className={className} onClick={onClick}>
        {children}
      </button>{" "}
    </div>
  );
};

//* full div for bulma primary button w/ + incon
// {/* <div>
//   <button className="button is-small is-primary">
//     <span className="icon">
//       <i className="fas fa-plus"></i>
//     </span>
//     <span>Add Post</span>
//   </button>
// </div>; */}
