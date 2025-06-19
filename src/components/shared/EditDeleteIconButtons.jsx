import { useState } from "react";
import "./EditDeleteIconButton.css"


export const EditDeleteIconButtons = ({
  iconSrc,
  altText,
  tooltipContent,
  onClick,
  className = "",
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleMouseEnter = () => {
    setShowTooltip(true);
  };
  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  return (
    <div className="icon-tooltip-container">
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
        className={`edit-delete-icon-buttons ${className}`}>
        <img src={iconSrc} className={`icon-button-image ${className}`} alt={altText} />
      </div>

      {showTooltip && <div className="tooltip-content">{tooltipContent}</div>}
    </div>
  );
};