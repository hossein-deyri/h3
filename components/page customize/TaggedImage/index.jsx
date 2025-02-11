import { TaggedImageStyle } from "./TaggedImageStyle";
import { useState, useEffect, useRef } from "react";
import Select from "react-select";
import { personsRole } from "utilize/data/data";
import { RadioButton } from "primereact/radiobutton";
import uploadApi from "utilize/apis/uploadApi";
import { endpoints } from "endpoints";
import { get, post } from "services/httpService";
import { showSuccess, showError } from "utilize/toast";
import {
  IMAGES_ITEM_FIELD_TYPE_ENUMS,
  ITEM_TYPE_ENUMS,
} from "utilize/constant/constants";
import getPicMenus from "services/picMenusServices/getPicMenus";
import postPicMenus from "services/picMenusServices/postPicMenus";

const TaggedImage = ({ tags, persons, id, menuId, ...props }) => {
  const [title, setTitle] = useState("");
  const [menuMode, setMenuMode] = useState("search");
  const [startYear, setStartYear] = useState("");
  const [endYear, setEndYear] = useState("");
  const [tagState, setTagState] = useState([]);
  const [personId, setPersonId] = useState("");
  const [role, setRole] = useState("");
  const [link, setLink] = useState("");
  const [picMenus, setPicMenus] = useState([]);
  const [file, setFile] = useState();
  const Ref = useRef();

  const inputChangeHandler = (setState, e) => {
    setState(e.target.value);
  };

  useEffect(() => {
    (async () => {
      const picMenusData = await getPicMenus();

      setPicMenus(picMenusData);
    })();
  }, [menuId]);

  const uploadingImageHandler = (e) => {
    setFile(e.target.files[0]);
  };

  const removeImage = (e) => {
    e.stopPropagation();
    setFile(null);
  };

  const resetHandler = () => {
    setTitle("");
    setStartYear("");
    setEndYear("");
    setTagState([]);
    setPersonId("");
    setRole("");
    setLink("");
    setFile(null);
  };
  const selectStyle = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "#f3f5f8",
    }),
    placeholder: (defaultStyles) => {
      return {
        ...defaultStyles,
        color: "#919baa",
        fontSize: "14px",
      };
    },
  };

  const creatingMenu = async () => {
    const queryBody = {
      title: title,
      id: picMenus.length + 1,
      personId: personId ? personId.value : null,
      role: role ? role.value : null,
      link: link ? link : null,
      tags: tagState ? tagState.map((tag) => tag?.value) : null,
      endYear: endYear ? endYear : null,
      startYear: startYear ? startYear : null,
      file: file,
      previewImage: URL.createObjectURL(file),
    };
    setPicMenus((e) => [queryBody, ...e]);
    resetHandler();
  };

  const submitMenu = async () => {
    const _menus = [...picMenus];
    for (let i = 0; i < _menus.length; i++) {
      if (_menus[i].previewImage) {
        await uploadApi({
          fileProp: _menus[i].file,
          itemType: ITEM_TYPE_ENUMS.IMAGES.label,
          field: IMAGES_ITEM_FIELD_TYPE_ENUMS.MENU_PIC.label,
        }).then((data) => {
          _menus[i].imagePath = data?.result[0]?.file;
          delete _menus[i].previewImage;
          delete _menus[i].file;
        });
      }
    }

    await postPicMenus(JSON.stringify(_menus));
  };

  const deleteMenu = (index) => {
    const _menus = [...picMenus];
    _menus.splice(index, 1);
    setPicMenus(_menus);
  };

  return (
    <TaggedImageStyle>
      <div className="sectionTitle">بنرهای ويژه کودکانه</div>
      <div className="creationHolder">
        <div className="row">
          <div className="col-6">
            <div className={` uploadField`}>
              <div
                className="position-relative start-0 top-0 h-100 bg-size-cover "
                style={{
                  borderRadius: 5,
                  background: `#e6ebf0 ${
                    file ? `url(${URL.createObjectURL(file)}) ` : ""
                  }  `,
                }}
                onClick={() => Ref.current.click()}
              >
                <input
                  type="file"
                  className="d-none"
                  ref={Ref}
                  onChange={uploadingImageHandler}
                  onClick={(e) => (e.target.value = "")}
                />
                {file ? (
                  <button
                    className="position-absolute start-50 bottom-0 translate-middle btn btn-danger w-0 px-3 py-2 rounded-circle"
                    onClick={removeImage}
                  >
                    x
                  </button>
                ) : (
                  <img
                    src="/icon/upload-cloud-fill.svg"
                    className="uploadCloudIcon position-absolute start-50 top-50 translate-middle bg-white p-2"
                    alt="nobino"
                  />
                )}
              </div>
            </div>
          </div>

          <div className="col-6 row">
            <div className="titleHolder d-flex align-items-center col-6">
              <span>عنوان</span>
              <input
                className="form-control"
                type="text"
                placeholder="نوشتن عنوان منو"
                value={title}
                onChange={inputChangeHandler.bind(this, setTitle)}
              />
            </div>
            <div className="col-6 d-flex">
              <div className="field-radiobutton">
                <RadioButton
                  inputId="searchPicMenu"
                  name="menuMode"
                  value="search"
                  onChange={(e) => setMenuMode(e.value)}
                  checked={menuMode === "search"}
                />
                <label htmlFor="searchPicMenu">جستجو</label>
              </div>
              <div className="field-radiobutton">
                <RadioButton
                  inputId="linkModePicMenu"
                  name="menuMode"
                  value="linkMode"
                  onChange={(e) => setMenuMode(e.value)}
                  checked={menuMode === "linkMode"}
                />
                <label htmlFor="linkModePicMenu">لینک</label>
              </div>
            </div>
            <div
              className={`col-6 mt-3 ps-3 d-flex align-items-center ${
                menuMode !== "search" && "disabled"
              }`}
            >
              <span>سال شروع </span>
              <input
                value={startYear}
                placeholder="سال شروع"
                type="number"
                className="form-control"
                onChange={inputChangeHandler.bind(this, setStartYear)}
              />
            </div>
            <div
              className={`col-6 px-3 d-flex align-items-center ${
                menuMode !== "search" && "disabled"
              }`}
            >
              <span>سال پایان </span>
              <input
                value={endYear}
                placeholder="سال پایان"
                type="number"
                className="form-control"
                onChange={inputChangeHandler.bind(this, setEndYear)}
              />
            </div>
            <div
              className={`tagHolder d-flex align-items-center my-3 col-12 ${
                menuMode !== "search" && "disabled"
              }`}
            >
              <span>تگ ها</span>
              <div className="col-11">
                <Select
                  styles={selectStyle}
                  options={tags}
                  isMulti
                  placeholder="حداکثر 3 تگ انتخاب نمایید"
                  value={tagState}
                  onChange={(value) => setTagState(value)}
                />
              </div>
            </div>
            <div
              className={`col-6 d-flex align-items-center ${
                menuMode !== "search" && "disabled"
              }`}
            >
              <span>شخص</span>
              <div className="col">
                <Select
                  styles={selectStyle}
                  value={personId}
                  onChange={(value) => setPersonId(value)}
                  options={persons}
                  placeholder="انتخاب شخص"
                />
              </div>
            </div>
            <div
              className={`col-6 d-flex align-items-center ${
                menuMode !== "search" && "disabled"
              }`}
            >
              <span>سمت</span>
              <div className="col">
                <Select
                  styles={selectStyle}
                  value={role}
                  onChange={(value) => setRole(value)}
                  options={personsRole}
                  placeholder="سمت مورد نظر"
                />
              </div>
            </div>
          </div>
        </div>

        <div
          className={`col-12 d-flex align-items-center ${
            menuMode !== "linkMode" && "disabled"
          }`}
        >
          <span className="mx-3">لینک</span>
          <input
            value={link}
            placeholder="لینک"
            type="text"
            className="form-control"
            onChange={inputChangeHandler.bind(this, setLink)}
          />
        </div>

        <div className="d-flex align-items-center justify-content-start mt-3">
          <button onClick={creatingMenu} className={`saveBtn ms-3`}>
            ذخیره
          </button>
        </div>
      </div>

      {picMenus.length > 0 && (
        <div className="menuPreview d-flex flex-wrap align-items-center justify-content-start">
          {picMenus.map((menu, index) => (
            <div key={index} className="menuHolder">
              <img
                src={
                  menu.imagePath
                    ? process.env.REACT_APP_API_URL_FILE + menu.imagePath
                    : menu.previewImage
                }
                alt={menu.title}
              />
              <button
                className="position-absolute start-50 bottom-0 translate-middle btn btn-danger w-0 px-3 py-2 rounded-circle"
                onClick={deleteMenu.bind(this, index)}
              >
                x
              </button>
            </div>
          ))}

          <button onClick={submitMenu} className="submitBtn">
            ثبت نهایی بنر ها
          </button>
        </div>
      )}
    </TaggedImageStyle>
  );
};

export default TaggedImage;
