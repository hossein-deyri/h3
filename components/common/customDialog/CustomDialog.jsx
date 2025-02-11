import { Button } from "primereact/button";
import { CustomDialogStyles } from "./CustomDialogStyles";
import { DIALOG_TYPE } from "utilize/constant/DIALOG_TYPE";

const CustomDialog = ({ visible, onHide, onSubmit, itemTitle, dialogType }) => {
  const footer = (
    <>
      <Button
        label="بله"
        className="p-button-text text-danger"
        onClick={onSubmit}
      />
      <Button
        label="خیر"
        className="p-button-text text-success"
        onClick={onHide}
      />
    </>
  );

  return (
    <CustomDialogStyles
      header={DIALOG_TYPE[dialogType]?.label}
      modal
      {...{ visible, footer, onHide }}
    >
      <div className="confirmation-content">
        <i className="pi pi-exclamation-triangle ms-3 text-danger mt-1" />
        <span
          dangerouslySetInnerHTML={{
            __html:
              dialogType === DIALOG_TYPE.DELETE.id
                ? `آیا از پاک کردن <b>${itemTitle}</b> اطمینان دارید؟`
                : `آیا از تغییر وضعیت <b>${itemTitle}</b> اطمینان دارید؟`,
          }}
        />
      </div>
    </CustomDialogStyles>
  );
};

export default CustomDialog;
