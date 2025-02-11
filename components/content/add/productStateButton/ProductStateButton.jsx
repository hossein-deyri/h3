import useProductStateButton from "./useProductStateButton";
import { ProductStateButtonStyles } from "./ProductStateButtonStyles";
import PRODUCT_STATE from "utilize/constant/productState";

/**
 * @param {Object} props
 * @param {number} props.productId
 * @param {import("utilize/constant/productState").ProductStateType} props.state
 * @param {Function} props.onStateUpdate
 */
const ProductStateButton = ({ productId, state, onStateUpdate }) => {
  const { hasPublishAccess, handleProductState, isLoading } =
    useProductStateButton({
      onStateUpdate,
    });

  return (
    (state.id !== PRODUCT_STATE.PUBLISHED.id || hasPublishAccess) && (
      <ProductStateButtonStyles
        onClick={() => handleProductState(productId, state.id)}
        variant={`${state.id !== PRODUCT_STATE.PUBLISHED.id ? "outline-" : ""}${
          state.variant
        }`}
        size="sm"
        disabled={isLoading}
      >
        {isLoading ? (
          <div className="spinner-border" role="status">
            <span className="sr-only"></span>
          </div>
        ) : (
          <state.icon className="icon" />
        )}
        <span className="button-title">{state.actionLabel}</span>
      </ProductStateButtonStyles>
    )
  );
};

export default ProductStateButton;
