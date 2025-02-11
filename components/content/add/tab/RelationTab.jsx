import { useState, useEffect, useRef, useCallback } from "react";
import styled from "styled-components";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import dragIcon from "statics/img/dragIcon.svg";
import unLinkIcon from "statics/img/unlinkIcon.svg";
import { endpoints } from "endpoints";
import { DELETE, get, post } from "services/httpService";
import { showSuccess, showError } from "utilize/toast";
import {
  CONST_EPISODE,
  CONST_MOUSE_DOWN,
  CONST_PRODUCT,
  CONST_SEASON,
  CONST_SERIES,
} from "utilize/constant/constants";

const ProductItem = styled.div`
  background: ${(props) => (props.isDragging ? "#3e8bff" : "#e6ebf0")};
  color: ${(props) => props.isDragging && "white"};
  margin: 10px 5px;
  border-radius: 20px;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  user-select: none;

  h3 {
    font-size: 14px;
    font-weight: 500;
    color: #111;
    color: ${(props) => props.isDragging && "white"};
  }
  h5 {
    font-size: 14px;
    font-weight: normal;
    color: #111;
    color: ${(props) => props.isDragging && "white"};
  }
  .yearHolder {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
  .closeHolder {
    display: flex;
    align-items: center;
    justify-content: space-evenly;

    .moveHolder {
      background: #919baa;
      padding: 5px;
      border-radius: 5px;
    }
    .unLinkHolder {
      background: #111;
      padding: 5px;
      border-radius: 5px;
      cursor: pointer;
    }
  }
`;

const ProductColumn = styled.div`
  height: 40vh;
  background: #f3f5f8;
  overflow-y: scroll;
  margin-bottom: 10px;
  border-radius: 10px;
  box-shadow: 2px 2px 5px #c8c8c8;
  display: flex;
  flex-direction: column;
`;

const SearchModal = styled.div`
  display: ${(props) => (props.show ? "block" : "none")};
  width: 100%;
  min-height: 50px;
  position: absolute;
  z-index: 1000;
  top: 98%;
  right: 0;
  background: #fdfdfd;
  box-shadow: 2px 2px 5px #c8c8c8;
  border-radius: 0 0 10px 10px;
  max-height: 150px;
  overflow-y: scroll;
  .productHolder {
    cursor: pointer;
    border: 1px solid #c8c8c8;
    padding: 15px;
    :hover {
      box-shadow: 0px 0px 10px #c8c8c8 inset;
    }
    span {
      margin-left: 30px;
    }
  }
  .placeHolder {
    display: block;
    text-align: center;
    margin: 15px;
    color: #8d8a8a;
    font-size: 16px;
    user-select: none;
  }
`;

const RelationTab = (props) => {
  const [inputValue, setInputValue] = useState("");
  const [products, setProducts] = useState();
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [loadingState, setLoadingState] = useState(false);
  let modalRef = useRef(null);

  const gettingData = useCallback(async () => {
    setLoadingState(true);
    await get(endpoints.RELATIONS(), {
      params: {
        endModel: CONST_PRODUCT,
        startModel: CONST_PRODUCT,
        startId: props.productId,
      },
    })
      .then(async ({ data }) => {
        const _data = data.data;
        const _products = [];
        _data.sort((a, b) => a.order - b.order);
        for (let i = 0; i < _data.length; i++) {
          await get(endpoints.PRODUCTS(_data[i].endId)).then(({ data }) => {
            const _product = { ...data.data };
            _product.RelationId = _data[i].id;
            _product.relationOrder = _data[i].order;
            _products.push(_product);
          });
        }
        setSelectedProducts(_products);
      })
      .finally(() => setLoadingState(false));
  }, [props.productId]);

  useEffect(() => {
    gettingData();
  }, [gettingData]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setProducts(null);
        setInputValue("");
      }
    };

    document.addEventListener(CONST_MOUSE_DOWN, handleClickOutside);
    return () => {
      document.removeEventListener(CONST_MOUSE_DOWN, handleClickOutside);
    };
  }, [modalRef]);

  const inputChangeHandler = async (e) => {
    setInputValue(e.target.value);
    if (e.target.value.length > 0) {
      await get(endpoints.PRODUCTS(), {
        params: {
          offset: 0,
          size: 100,
          name: e.target.value,
          ...(props.productType === CONST_SEASON && { category: "EPISODE" }),
        },
      })
        .then(({ data }) => {
          let _data = [...data.data.items];
          if (props.productType === CONST_SERIES) {
            _data = _data.filter(
              (product) =>
                product.category !== CONST_EPISODE ||
                product.category !== CONST_SERIES
            );
          }
          _data = _data.filter((item) => item.id !== props.productId);
          //** this method will remove items that are already in our selected area */
          _data = _data.filter((x) => {
            return !selectedProducts.some((t) => t.id === x.id);
          });
          setProducts(_data);
        })
        .catch((err) => console.log(err));
    } else {
      setProducts(null);
    }
  };

  const selectingProduct = (index) => {
    setSelectedProducts([...selectedProducts, products[index]]);
    const _selectedProducts = [...products];
    _selectedProducts.splice(index, 1);
    setProducts(_selectedProducts);
  };

  const deleteHandler = (index) => {
    const _products = [...selectedProducts];
    _products[index].deleted = true;
    setSelectedProducts(_products);
  };

  const dragEndHandler = (result) => {
    const { destination, source } = result;
    if (!destination) {
      return;
    }
    if (source.index === destination.index) {
      return;
    }

    let _products = [...selectedProducts];
    const _draggedProduct = _products[source.index];
    _products.splice(source.index, 1);
    _products.splice(destination.index, 0, _draggedProduct);
    setSelectedProducts(_products);
  };

  const relationHandler = async (i) => {
    const _product = selectedProducts[i];
    const requestBody = {
      endId: _product.id,
      endModel: CONST_PRODUCT,
      order: i + 1,
      startId: props.productId,
      startModel: CONST_PRODUCT,
    };
    if (_product.RelationId) {
      await DELETE(endpoints.RELATIONS(_product.RelationId)).then(async () => {
        if (!_product.deleted) {
          await post(endpoints.RELATIONS(), JSON.stringify(requestBody)).catch(
            () => {
              showError();
            }
          );
        }
      });
    } else {
      if (!_product.deleted) {
        await post(endpoints.RELATIONS(), JSON.stringify(requestBody)).catch(
          () => {
            showError();
          }
        );
      }
    }
  };

  const saveHandler = async () => {
    try {
      for (let i = 0; i < selectedProducts.length; i++) {
        await relationHandler(i);
      }

      showSuccess();
    } catch {
      showError();
    }
  };

  return (
    <section>
      <div className="d-flex position-relative  mb-2">
        <input
          value={inputValue}
          className="form-control  "
          onChange={inputChangeHandler}
          placeholder="جستجو در محتواها"
          type="text"
        />
        <SearchModal ref={modalRef} show={products?.length ? true : false}>
          {products || products?.length < 0 ? (
            products.map((product, index) => (
              <div
                className="productHolder"
                key={product.id}
                onClick={selectingProduct.bind(this, index)}
              >
                <span>{product.name}</span>
                <span>{product.translatedName}</span>
              </div>
            ))
          ) : (
            <span className="placeHolder">محصولی موجود نیست</span>
          )}
        </SearchModal>
      </div>
      <div className="position-relative">
        <DragDropContext onDragEnd={dragEndHandler}>
          <div>
            {loadingState && (
              <div
                className="spinner-border position-absolute top-50 left-50 itemListLoading"
                role="status"
              >
                <span className="sr-only"></span>
              </div>
            )}
            <Droppable droppableId="1">
              {(provided) => (
                <ProductColumn
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {selectedProducts &&
                    selectedProducts.map((item, index) => (
                      <Draggable
                        style={{ order: item?.relationOrder }}
                        key={item?.id}
                        draggableId={item?.id?.toString()}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <ProductItem
                            {...provided.draggableProps}
                            ref={provided.innerRef}
                            isDragging={snapshot.isDragging}
                            className={item.deleted ? "d-none" : ""}
                          >
                            <div className="col">
                              <h3>{item?.name}</h3>
                              <h5>{item?.translatedName}</h5>
                            </div>
                            <div className="yearHolder col">
                              <span>سال ساخت</span>
                              <span>{item?.productionYear}</span>
                            </div>
                            <div className="closeHolder col-1">
                              <div
                                {...provided.dragHandleProps}
                                className="moveHolder"
                              >
                                <img src={dragIcon} alt="nobino" />
                              </div>

                              <div
                                onClick={deleteHandler.bind(this, index)}
                                className="unLinkHolder"
                              >
                                <img src={unLinkIcon} alt="nobino" />
                              </div>
                            </div>
                          </ProductItem>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </ProductColumn>
              )}
            </Droppable>

            <button onClick={saveHandler} className="saveBtn">
              ذخیره
            </button>
          </div>
        </DragDropContext>
      </div>
    </section>
  );
};

export default RelationTab;
