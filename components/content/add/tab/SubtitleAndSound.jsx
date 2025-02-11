import SubtitleSoundUploader from "components/content/add/upload/file/SubtitleSoundUploader";
import { ITEM_TYPE_ENUMS, LANGUAGE_ENUMS } from "utilize/constant/constants";

export default function SubtitleAndSound({ values, setFieldValue, productID }) {
  return (
    <div className="d-flex justify-content-between flex-lg-row flex-column rounded w-100">
      <SubtitleSoundUploader
        CSSClass="bg-dark w-100 mb-lg-0 mb-4 pb-4"
        title="فایل زیرنویس"
        accept=".srt"
        selectOptions={LANGUAGE_ENUMS}
        selectPlaceholder="انتخاب زبان"
        value={values.subtitles}
        buttonText="افزودن زیرنویس"
        setFieldValue={setFieldValue}
        itemType={ITEM_TYPE_ENUMS.SUBTITLES.label}
        productID={productID}
        radioName="subtitleRadio"
      />
      <SubtitleSoundUploader
        CSSClass="bg-dark w-100 me-2"
        title="فایل صوت"
        accept="audio/*"
        selectOptions={LANGUAGE_ENUMS}
        selectPlaceholder="انتخاب صوت"
        value={values.sounds}
        buttonText="افزودن صوت"
        setFieldValue={setFieldValue}
        itemType={ITEM_TYPE_ENUMS.SOUNDS.label}
        productID={productID}
        radioName="soundRadio"
      />
    </div>
  );
}
