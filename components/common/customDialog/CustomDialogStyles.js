import styled from "styled-components";
import { Dialog } from "primereact/dialog";

export const CustomDialogStyles = styled(Dialog)`
  width: 450px;

  .confirmation-content {
    display: flex;
    align-items: center;

    i {
      font-size: 1.7rem;
    }
  }
`;
