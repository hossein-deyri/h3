import { Close } from "@styled-icons/evil/Close";
import { DeleteButtonStyle } from "./DeleteButtonStyle";

const DeleteButton = (props) => {
  return (
    <DeleteButtonStyle
      className={`deleteButton ${props.className || ""}`}
      onClick={props.onClick}
    >
      <Close />
    </DeleteButtonStyle>
  );
};

export default DeleteButton;
