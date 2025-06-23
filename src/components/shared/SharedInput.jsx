export const SharedInput = ({ type, placeholder, value, onChange, style, className }) => {
  return (
    <>
      <div className="input-custom">
        <input
          className={className}
          type={type}
          placeholder={placeholder}
          onChange={onChange}
          value={value}
          style={style}
        />
      </div>

      {/* combine the button div for modules with input on left side of page and button on the right */}
      {/* <div className="button-custom">
        <button className="button is-small is-primary">
          <span className="icon">
            <i className="fas fa-plus"></i>
          </span>
          <span>Add Post</span>
        </button>
      </div> */}
    </>
  );
};

//* bull small input
// className="input is-small"

//* optional style for input
//  style={{ maxWidth: "300px" }}

//* input filter event handler
// onChange={(e) => onSearch(e.target.value)}
