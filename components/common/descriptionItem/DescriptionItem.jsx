import { Fragment } from "react";
import { DescriptionItemStyles } from "./descriptionItemStyles";
import CustomSkeleton from "../customSkeleton/CustomSkeleton";

/**
 * @typedef {Object} DescriptionItem
 * @property {string} label - The label for the item
 * @property {string} value - The value of the item
 * @property {boolean} [highlight] - Whether to highlight this item (optional)
 */

/**
 * A flexible component that displays a list of label-value pairs.
 *
 * @param {Object} props
 * @param {DescriptionItem[]} props.items - An array of items to display
 * @param {string} props.imgSrc - The image to be shown
 * @param {boolean} props.isLoading - Determines if the data is currently loading
 * @returns {JSX.Element}
 */
const DescriptionItem = ({ items, imgSrc, isLoading }) => {
  const highlightClassName = (highlight, isLoading) => {
    if (isLoading) return "";

    return highlight === undefined
      ? ""
      : highlight
      ? "success-state"
      : "error-state";
  };

  return (
    <DescriptionItemStyles>
      <div className="pic">
        <img src={imgSrc} alt="profile" />
      </div>
      {items.map((item, index) => (
        <Fragment key={index}>
          <small
            className={`text ${highlightClassName(item.highlight, isLoading)}`}
          >
            {item.label}:
          </small>
          <strong className={`text ${highlightClassName(item.highlight)}`}>
            {isLoading ? <CustomSkeleton /> : item.value}
          </strong>
        </Fragment>
      ))}
    </DescriptionItemStyles>
  );
};

export default DescriptionItem;
