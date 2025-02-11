import { Skeleton } from "primereact/skeleton";

/**
 * A customizable skeleton loader component.
 *
 * @param {Object} props - The properties for the skeleton.
 * @param {string} props.width - The width of the skeleton.
 * @param {string} props.height - The height of the skeleton.
 * @param {string} props.radius - The border radius of the skeleton, which can be specified in pixels (px) or percentage (%).
 * @param {string} props.className - Additional CSS classes to apply to the skeleton.
 * @returns {JSX.Element} The rendered skeleton component.
 */

const CustomSkeleton = ({
  width = "80px",
  height = "15px",
  radius = "15px",
  className = "",
}) => {
  return (
    <Skeleton
      width={width}
      height={height}
      borderRadius={radius}
      className={className}
    />
  );
};

export default CustomSkeleton;
