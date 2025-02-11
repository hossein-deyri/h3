import { Button } from "react-bootstrap";
import styled from "styled-components";

export const ProductStateButtonStyles = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  margin: 0 3px;
  min-width: 110px;
  position: relative;

  .spinner-border,
  .icon {
    width: 20px;
    height: 20px;
    border-width: 2px;
    margin-left: 10px;
  }
`;
