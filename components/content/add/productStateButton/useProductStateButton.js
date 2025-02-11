import { endpoints } from "endpoints";
import { useContext, useEffect, useState } from "react";
import { patch } from "services/httpService";
import { RoleContext } from "utilize/contexts/roleContext";
import { showError, showSuccess } from "utilize/toast";

const useProductStateButton = ({ onStateUpdate }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasPublishAccess, setHasPublishAccess] = useState(false);
  const roles = useContext(RoleContext);

  useEffect(() => {
    roles?.includes("ROLE_CAN_PUBLISH_PRODUCT") && setHasPublishAccess(true);
  }, [roles]);

  const handleProductState = (productId, state) => {
    setIsLoading(true);

    patch(endpoints.V2.PRODUCTS(productId), JSON.stringify({ state }))
      .then((response) => {
        onStateUpdate?.(response.data.data.state);
        showSuccess();
      })
      .catch((error) => {
        showError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return {
    hasPublishAccess,
    handleProductState,
    isLoading,
  };
};

export default useProductStateButton;
