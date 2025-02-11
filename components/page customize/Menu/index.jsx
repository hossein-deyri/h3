import { MenuStyle } from "./MenuStyle";
import React, { useState, useEffect } from "react";
import Select from "react-select";
import { personsRole } from "utilize/data/data";
import { RadioButton } from "primereact/radiobutton";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { CloseOutline } from "@styled-icons/evaicons-outline/CloseOutline";
import { Drag } from "@styled-icons/fluentui-system-filled/Drag";
import { endpoints } from "endpoints";
import { get, post } from "services/httpService";
import { showSuccess, showError } from "utilize/toast";

const Menu = ({ tags, persons, id, ...props }) => {
  const [title, setTitle] = useState("");
  const [enTitle, setEnTitle] = useState("");
  const [menuMode, setMenuMode] = useState("search");
  const [startYear, setStartYear] = useState("");
  const [endYear, setEndYear] = useState("");
  const [tagState, setTagState] = useState([]);
  const [personId, setPersonId] = useState("");
  const [role, setRole] = useState("");
  const [link, setLink] = useState("");
  const [menus, setMenus] = useState([]);
  const [, setPreviewMode] = useState(false);

  const inputChangeHandler = (setState, e) => {
    setState(e.target.value);
  };

  const gettingMenus = async () => {
    await get(endpoints.SETTINGS.MAINPAGE.MENUS).then(({ data }) =>
      setMenus(data.data)
    );
  };

  useEffect(() => {
    gettingMenus();
  }, []);

  const dragEndHandler = (result) => {
    const { destination, source } = result;
    if (!destination) {
      return;
    }
    if (source.index === destination.index) {
      return;
    }

    let _menus = [...menus];
    const _draggedProduct = _menus[source.index];
    _menus.splice(source.index, 1);
    _menus.splice(destination.index, 0, _draggedProduct);
    setMenus(_menus);
  };

  const getItemStyle = (isDragging, draggableStyle) => ({
    background: !isDragging ? "white" : "#3e8bff",
    color: !isDragging ? "#3e8bff" : "white",
    ...draggableStyle,
  });

  const resetHandler = () => {
    setPreviewMode(false);
    setTitle("");
    setEnTitle("");
    setStartYear("");
    setEndYear("");
    setTagState([]);
    setPersonId("");
    setRole("");
    setLink("");
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

  const creatingMenu = () => {
    const re = new RegExp(/^[A-Za-z][A-Za-z0-9]*$/);

    if (!re.test(enTitle))
      return showError("لطفا فیلد انگلیسی را درست وارد کنید");

    const englishTitle = enTitle.toLocaleLowerCase().replaceAll(' ', '-');

    const queryBody = {
      title: title,
      englishTitle: englishTitle,
      id: menus.length + 1,
      personId: personId ? personId.value : null,
      role: role ? role.value : null,
      link: link ? link : null,
      tags: tagState ? tagState.map((tag) => tag?.value) : null,
      endYear: endYear ? endYear : null,
      startYear: startYear ? startYear : null,
    };
    setMenus((e) => [...e, queryBody]);
    resetHandler();
  };

  const submitMenu = async () => {
    const _menus = [...menus];
    await post(endpoints.SETTINGS.MAINPAGE.MENUS, JSON.stringify(_menus))
      .then(() => {
        showSuccess("منو ها با موفقیت ذخیره شد");
      })
      .catch(() => {
        showError();
      })
      .finally(() => gettingMenus());
  };

  const deleteMenu = (index) => {
    const _menus = [...menus];
    _menus.splice(index, 1);
    setMenus(_menus);
  };

  return (
    <MenuStyle>
      <div className="sectionTitle">مدیریت منو</div>
      <div className="creationHolder">
        <div className="row">
          <div className="titleHolder col-3">
            <span>عنوان</span>
            <input
              className="form-control"
              type="text"
              placeholder="نوشتن عنوان منو"
              value={title}
              onChange={inputChangeHandler.bind(this, setTitle)}
            />
          </div>
          <div className="titleHolder col-3">
            <span>عنوان انگلیسی</span>
            <input
              className="form-control"
              type="text"
              placeholder="نوشتن عنوان انگلیسی منو"
              value={enTitle}
              onChange={inputChangeHandler.bind(this, setEnTitle)}
            />
          </div>
          <div className="col-3">
            <div className="field-radiobutton">
              <RadioButton
                inputId="search"
                name="menuMode"
                value="search"
                onChange={(e) => setMenuMode(e.value)}
                checked={menuMode === "search"}
              />
              <label htmlFor="search">جستجو</label>
            </div>
            <div className="field-radiobutton">
              <RadioButton
                inputId="linkMode"
                name="menuMode"
                value="linkMode"
                onChange={(e) => setMenuMode(e.value)}
                checked={menuMode === "linkMode"}
              />
              <label htmlFor="linkMode">لینک</label>
            </div>
          </div>
          <div
            className={`tagHolder col-6 ${menuMode !== "search" && "disabled"}`}
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
        </div>

        <div className={`row ${menuMode !== "search" && "disabled"}`}>
          <div className="col-3 ps-3 d-flex align-items-center ">
            <span>سال شروع </span>
            <input
              value={startYear}
              placeholder="سال شروع"
              type="number"
              className="form-control"
              onChange={inputChangeHandler.bind(this, setStartYear)}
            />
          </div>
          <div className="col-3 px-3 d-flex align-items-center ">
            <span>سال پایان </span>
            <input
              value={endYear}
              placeholder="سال پایان"
              type="number"
              className="form-control"
              onChange={inputChangeHandler.bind(this, setEndYear)}
            />
          </div>
          <div className="col-3 d-flex align-items-center">
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
          <div className="col-3  d-flex align-items-center">
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
            ثبت منو
          </button>
        </div>
      </div>

      {menus.length > 0 && (
        <div>
          <DragDropContext onDragEnd={dragEndHandler}>
            <Droppable droppableId="droppable">
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="menu-wrapper"
                >
                  {menus.map((menu, index) => (
                    <Draggable
                      key={menu.title}
                      draggableId={menu.title}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                          )}
                          className="menuHolder"
                        >
                          <div
                            className="closeHolder"
                            onClick={deleteMenu.bind(this, index)}
                          >
                            <CloseOutline />
                          </div>
                          <span>{menu.title}</span>
                          <div
                            {...provided.dragHandleProps}
                            className="dragHolder"
                          >
                            <Drag />
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      )}
      <button onClick={submitMenu} className="my-3 submitBtn">
        ثبت نهایی منو
      </button>
    </MenuStyle>
  );
};

export default Menu;
