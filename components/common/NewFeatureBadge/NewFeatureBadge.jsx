import { NewFeatureBadgeStyles } from "./NewFeatureBadgeStyles";
import { InformationCircle } from "styled-icons/heroicons-solid";
import { Tooltip } from "primereact/tooltip";

/**
 * - When using this component, try to implement it in a way to make it
 * deletable without making other changes to the code except for the `NewFeatureBadge`
 * itself
 *
 * - Try to **search** throughout the project to **delete** existing/old
 * ones in every new version you provide
 *
 * @param {Object} props
 * @param {Array} [props.description]
 * @returns A simple badge with bright backgroundcolor to show new features
 */
const NewFeatureBadge = ({ description }) => {
  const hasDescription = Array.isArray(description);

  return (
    <>
      {hasDescription && (
        <Tooltip target=".description-tooltip" position="top" hideDelay={300}>
          <ul>
            {description.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </Tooltip>
      )}
      <NewFeatureBadgeStyles
        className={hasDescription ? "description-tooltip" : ""}
      >
        {hasDescription && <InformationCircle />}
        جدید
      </NewFeatureBadgeStyles>
    </>
  );
};

export default NewFeatureBadge;
