import { BadgeStatusStyles } from "./badgeStatusStyles";

/**
 *
 * @param {Object} props
 * @param {string} props.className
 * @param {React.ReactNode} props.value
 * @param {string} props.minWidth
 * @param {'SUCCESS'|'ERROR'|'WARNING'|'INFO'|'SECONDARY'} props.color
 */
const BadgeStatus = ({ className, children, color = "INFO", minWidth }) => {
  return (
    <BadgeStatusStyles
      className={((className && `${className} `) || "") + color?.toLowerCase()}
      minWidth={minWidth}
    >
      {children}
    </BadgeStatusStyles>
  );
};

export default BadgeStatus;
