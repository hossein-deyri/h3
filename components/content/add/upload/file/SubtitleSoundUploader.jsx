import { useState, useRef, useEffect } from "react";
import uploadApi from "utilize/apis/uploadApi";
import { deleteSoundsApi, deleteSubtitlesApi } from "utilize/apis/deleteApi";
import { ProgressBar } from "primereact/progressbar";
import { endpoints } from "endpoints";
import { patch } from "services/httpService";
import { ITEM_TYPE_ENUMS } from "utilize/constant/constants";
import { RadioButton } from "primereact/radiobutton";
import { Dropdown } from "primereact/dropdown";
import { ProgressSpinner } from "primereact/progressspinner";
import { updateDefaultSubtitle } from "services/subtitleServices/subtitleServices";
import { updateDefaultSound } from "services/soundServices/soundServices";
import { showError } from "utilize/toast";
import { SubtitleSoundUploaderStyles } from "./SubtitleSoundUploaderStyles";

export default function SubtitleSoundUploader({
  CSSClass,
  title,
  accept,
  selectOptions,
  selectPlaceholder,
  value,
  buttonText,
  setFieldValue,
  productID,
  itemType,
  radioName,
}) {
  const Reff = useRef();
  const [file, setFile] = useState("");
  const [progress, setProgress] = useState();
  const [options, setOptions] = useState([]);
  const [language, setLanguage] = useState("");
  const [radioValue, setRadioValue] = useState("");
  const [, setLanguageSelectError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleRadioChange = (newId) => {
    const updatedValues = value.map((item) => ({
      ...item,
      defaulted: item.id === newId,
    }));

    // detects if the subtitle/sound is in edit state(not in create state)
    if (productID) {
      const prevRadioValue = radioValue;
      setRadioValue(newId);
      setIsLoading(true);
      const api =
        itemType === ITEM_TYPE_ENUMS.SUBTITLES.label
          ? updateDefaultSubtitle
          : updateDefaultSound;

      api(newId)
        .then(() => {
          setFieldValue(itemType.toLowerCase(), updatedValues);
        })
        .catch((error) => {
          showError(error.data.userMessage);
          setRadioValue(prevRadioValue);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setRadioValue(newId);
      setFieldValue(itemType.toLowerCase(), updatedValues);
    }
  };

  const submitFile = async () => {
    if (!file) return Reff.current.click();
    if (file && !language) return setLanguageSelectError(true);

    const values = [...value];
    await uploadApi({
      fileProp: file,
      productID,
      itemType,
      field: language.values,
      setFieldValue,
      setProgress,
      values,
    });

    setFile("");
    setLanguage("");
    setLanguageSelectError(false);
  };

  const removeUploadedFile = () => {
    setFile("");
    setLanguage("");
    setLanguageSelectError(false);
    Reff.current.value = "";
  };

  const removeAddedFile = (index) => {
    const tempList = value.filter((l, i) => (i === index ? null : l));
    setFieldValue(itemType.toLowerCase(), tempList);
  };

  const deleteHandler = async (index) => {
    try {
      removeAddedFile(index);

      if (productID) await patchProduct(productID);

      if (itemType === ITEM_TYPE_ENUMS.SOUNDS.label)
        await deleteSoundsApi(value[index].id);
      if (itemType === ITEM_TYPE_ENUMS.SUBTITLES.label)
        await deleteSubtitlesApi(value[index].id);
    } catch (err) {
      return Promise.reject(err);
    }
  };

  const patchProduct = async (id) => {
    try {
      const { status } = await patch(
        endpoints.PRODUCTS(id),
        JSON.stringify({ published: false })
      );

      if (status !== 200) throw Error("There was a problem in patching data.");
    } catch (err) {
      return Promise.reject(err);
    }
  };

  useEffect(() => {
    const objectValues = Object.values(selectOptions).map((item) => item);
    setOptions(objectValues);
  }, [selectOptions]);

  useEffect(() => {
    if (value) {
      const defaultValue = value.find((item) => item.defaulted)?.id;
      setRadioValue(defaultValue);
    }
  }, [value]);

  return (
    <SubtitleSoundUploaderStyles className={CSSClass}>
      <div className="file-wrapper user-select-none">
        <div className="border-bottom border-light pb-2">
          <label className="text-white mb-2 fs-14">{title}</label>
          <div className="d-flex justify-content-between align-items-center">
            <Dropdown
              className="col-3"
              options={options}
              value={language}
              onChange={(e) => setLanguage(e.value)}
              placeholder={selectPlaceholder || "انتخاب"}
              optionLabel="label"
            />
            <div className="col-8 d-flex rounded bg-white border border-success light-blue-bg">
              <button
                className="upload-btn col-4 btn btn-danger text-nowrap m-1"
                type="button"
                onClick={submitFile}
              >
                {!file ? buttonText : "تایید"}
              </button>
              <input
                type="file"
                className="d-none"
                accept={accept}
                onChange={({ target }) =>
                  target.files[0] ? setFile(target.files[0]) : setFile("")
                }
                ref={Reff}
              />
              <div className="upload-content ms-0">
                {file.name ? (
                  <div className="d-flex flex-wrap align-items-center">
                    <div>
                      {file.name}
                      <button
                        className="btn p-0 px-2 text-danger"
                        onClick={removeUploadedFile}
                      >
                        x
                      </button>
                    </div>
                  </div>
                ) : (
                  <span className="ps-3">فایل مورد نظر را انتخاب کنید</span>
                )}
              </div>
            </div>
          </div>
          {file && progress < 100 && (
            <ProgressBar value={progress} style={{ direction: "ltr" }} />
          )}
        </div>
        {value && (
          <div className="file-items">
            {value.map((li, index) => (
              <div className="file-item" key={li.id}>
                <div className="radio-item">
                  <label>
                    {!(radioValue === li.id && isLoading) && (
                      <RadioButton
                        inputId={li.id}
                        value={li.id}
                        name={radioName}
                        onChange={(e) =>
                          e.checked && handleRadioChange(e.value)
                        }
                        checked={radioValue === li.id}
                      />
                    )}
                    {radioValue === li.id && isLoading && (
                      <ProgressSpinner strokeWidth="8" animationDuration="1s" />
                    )}
                    <div className="text-white me-2">
                      {index + 1 + "." + li.language}
                    </div>
                  </label>
                </div>
                <div className="file-address">{li.src.split("/").pop()}</div>
                <button
                  className="btn text-danger p-0 lh-sm delete-file"
                  onClick={() => deleteHandler(index)}
                >
                  x
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </SubtitleSoundUploaderStyles>
  );
}
