import { SubCategoryStyle } from "./SubCategoryStyle";
import { useState, useEffect, useRef } from "react";
import SearchModal from "components/common/SearchModal";
import uploadApi from "utilize/apis/uploadApi";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Drag } from "@styled-icons/fluentui-system-filled/Drag";
import { Close } from "@styled-icons/remix-fill/Close";
import {
  IMAGES_ITEM_FIELD_TYPE_ENUMS,
  ITEM_TYPE_ENUMS,
} from "utilize/constant/constants";
import getCategories from "services/categoriesServices/getCategories";
import postCategories from "services/categoriesServices/postCategories";
import deleteCategories from "services/categoriesServices/deleteCategories";

const SubCategory = (props) => {
  const inputRef = useRef(null);
  const [title, setTitle] = useState();
  const [product, setProduct] = useState();
  const [fileState, setFileState] = useState();
  const [searchReset, setSearchReset] = useState(false);
  const [categoryItems, setCategoryItems] = useState([]);

  useEffect(() => {
    (async () => {
      const categoriesData = await getCategories(props.menuId);

      setCategoryItems(categoriesData);
    })();
  }, [props.menuId]);

  const resetHandler = () => {
    setTitle("");
    setProduct(null);
    setFileState(null);
    setSearchReset(false);
  };

  const previewHandler = () => {
    const _categories = [...categoryItems];
    _categories.push({
      file: fileState,
      order: categoryItems.length + 1,
      title,
      productId: product?.id,
      menuIdList: [props.menuId],
    });
    setSearchReset(true);
    resetHandler();
    setCategoryItems(_categories);
  };

  const saveCategoryHandler = async () => {
    const _categories = [...categoryItems];
    for (let i = 0; i < _categories.length; i++) {
      if (_categories[i]?.file) {
        await uploadApi({
          fileProp: _categories[i].file,
          itemType: ITEM_TYPE_ENUMS.IMAGES.label,
          field: IMAGES_ITEM_FIELD_TYPE_ENUMS.SUB_CATEGORY_ICON.label,
        }).then((data) => {
          _categories[i].imagePath = data.result[0].file;
          delete _categories[i].file;
        });
      }
      if (_categories[i].product) {
        _categories[i].productId = _categories[i].product.id;
      }
      _categories[i].order = i + 1;
      _categories[i].menuIdList = [props.menuId];
    }
    setCategoryItems(_categories);
    if (_categories.length < 1) {
      await deleteCategories(props.menuId);
    } else {
      await postCategories(JSON.stringify(_categories));
    }
  };

  const dragEndHandler = (result) => {
    const { destination, source } = result;
    if (!destination) {
      return;
    }
    if (source.index === destination.index) {
      return;
    }

    let _slides = [...categoryItems];
    const _draggedProduct = _slides[source.index];
    _slides.splice(source.index, 1);
    _slides.splice(destination.index, 0, _draggedProduct);
    setCategoryItems(_slides);
  };

  const getItemStyle = (isDragging, draggableStyle) => ({
    filter: isDragging
      ? "drop-shadow(0 0 10px #3e8bff)"
      : "drop-shadow(0 0 20px gray)",
    ...draggableStyle,
  });

  const deleteHandler = (index) => {
    let _slides = [...categoryItems];
    _slides.splice(index, 1);
    setCategoryItems(_slides);
  };

  return (
    <SubCategoryStyle>
      <div className="titleSection">مدیریت آرشیو برنامه ها</div>
      <div className="d-flex">
        <div className="createSection col ps-5">
          <div className="col-6 ps-5">
            <span>ساخت دسته بندی جدید</span>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              className="form-control my-2"
              placeholder="نوشتن عنوان دسته"
            />
            <SearchModal
              className={`col-12 ms-0 searchModal `}
              // searchApi={"series"}
              confirm={false}
              setProduct={setProduct}
              reset={searchReset}
            />
            <button onClick={previewHandler} className="saveBtn mt-3">
              پیش نمایش دسته بندی
            </button>
          </div>
          <div className="uploadField col">
            <div
              onClick={() => inputRef.current.click()}
              style={{
                background: `url(${
                  fileState && URL.createObjectURL(fileState)
                })`,
              }}
            >
              <img
                src="/icon/upload-cloud-fill.svg"
                className="uploadCloudIcon position-absolute start-50 top-50 translate-middle bg-white p-2"
                alt="nobino"
              />
              <input
                type="file"
                className="d-none"
                ref={inputRef}
                onClick={(e) => (e.target.value = "")}
                onChange={(e) => setFileState(e.target.files[0])}
              />
            </div>
          </div>
        </div>

        {categoryItems.length >= 0 && (
          <div className="previewSection col-3 mt-5 ">
            <div className="previewHead d-flex align-items-center justify-content-between">
              <span>لیست دسته بندی ها</span>
              <button onClick={saveCategoryHandler} className="submitBtn">
                ذخیره تغییرات
              </button>
            </div>
            <div className="categoriesHolder">
              <DragDropContext onDragEnd={dragEndHandler}>
                <Droppable droppableId="droppable">
                  {(provided, snapshot) => (
                    <div
                      className="sliderOrder"
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                    >
                      {categoryItems &&
                        categoryItems.map((item, index) => (
                          <Draggable
                            key={item.file ? item.file : item.imagePath}
                            draggableId={item.file ? item.file : item.imagePath}
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
                                <div className="orderBoxHolder">
                                  <img
                                    src={
                                      item.file
                                        ? URL.createObjectURL(item.file)
                                        : process.env.REACT_APP_API_URL_FILE +
                                          item.imagePath
                                    }
                                    alt="nobino"
                                  />
                                  <div
                                    {...provided.dragHandleProps}
                                    className="dragHolder"
                                  >
                                    <Drag />
                                  </div>
                                  <h3>{item.title}</h3>
                                  <div
                                    onClick={deleteHandler.bind(this, index)}
                                    className="closeHolder"
                                  >
                                    <Close />
                                  </div>
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
          </div>
        )}
      </div>
    </SubCategoryStyle>
  );
};

export default SubCategory;
