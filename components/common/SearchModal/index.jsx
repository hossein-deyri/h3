import { useRef, useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { endpoints } from "endpoints";
import { get } from "services/httpService";
import { SearchModalStyle } from "./SearchModalStyle";
import { Check } from "@styled-icons/boxicons-regular/Check";
import {
  CONST_EPISODE,
  CONST_MOUSE_DOWN,
  CONST_PRODUCTS,
  CONST_SEASON,
  CONST_SERIES,
  CONST_SERIES_LOWERCASE,
} from "utilize/constant/constants";

const SearchModal = (props) => {
  const [inputValue, setInputValue] = useState("");
  const [products, setProducts] = useState();
  const [selectedProduct, setSelectedProduct] = useState();
  const [selectState, setSelectState] = useState(false);
  let modalRef = useRef(null);

  const [inputDebouncedValue] = useDebounce(inputValue, 1000);

  const productClickHandler = (product) => {
    setSelectedProduct(product);
    setInputValue(product?.name);
    setSelectState(false);
    props.setProduct && props.setProduct(product);
  };

  useEffect(() => {
    props.reset && setInputValue("");
  }, [props.reset]);

  useEffect(() => {
    (async () => {
      const size = 30;
      const offset = 0;

      props.onChange && props.onChange(inputDebouncedValue, props.itemName);

      if (inputDebouncedValue.length > 0) {
        setSelectState(true);

        if (selectedProduct?.name !== inputDebouncedValue) {
          if (props.searchApi === CONST_PRODUCTS) {
            await get(endpoints.PRODUCTS(), {
              params: {
                size,
                offset,
                name: inputDebouncedValue,
                ...(props.allowedCategories && {
                  category: props.allowedCategories.join(","),
                }),
              },
            }).then(({ data }) => {
              const newProducts = data.data?.items;

              setProducts(newProducts);
            });
          } else if (props.searchApi === CONST_SERIES_LOWERCASE) {
            await get(endpoints.PRODUCTS(), {
              params: {
                size,
                offset,
                category: CONST_SERIES,
                name: inputDebouncedValue,
              },
            })
              .then(({ data }) => {
                let _data = [...data.data.items];
                setProducts(_data);
              })
              .catch((err) => console.log(err));
          } else {
            await get(props.searchApi, {
              params: {
                size: 20,
                offset: 0,
                name: inputDebouncedValue,
              },
            })
              .then(({ data }) => {
                setProducts(data.data);
              })
              .catch((err) => console.log(err));
          }
        }
      } else {
        setProducts(null);
      }
    })();
  }, [inputDebouncedValue]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        if (!selectedProduct) {
          !props.justSearch && setInputValue("");
          setProducts(null);
          setSelectState(false);
        }
      }
    };
    document.addEventListener(CONST_MOUSE_DOWN, handleClickOutside);
    return () => {
      document.removeEventListener(CONST_MOUSE_DOWN, handleClickOutside);
    };
  }, [modalRef, selectedProduct]);

  const submitHandler = async () => {
    try {
      const id = selectedProduct?.id;
      if (id) {
        const { data, status } = await get(endpoints.PRODUCTS(id));

        if (status !== 200)
          throw Error("There was a problem in fetching products/id data");

        let _product = { ...data.data };
        delete _product?.category;
        delete _product?.status;
        props.onClick({
          ...props.values,
          ..._product,
          ownerId: _product?.owner?.id,
          fixedTags: _product?.tags
            ?.filter(({ fixed }) => fixed)
            .map((tag) => ({
              value: tag.id,
              label: tag.name,
            })),
          tags: _product?.tags
            ?.filter(({ fixed }) => !fixed)
            .map((tag) => ({
              value: tag.id,
              label: tag.name,
            })),
          countries: _product?.countries?.map((country) => ({
            value: country?.id,
            label: country?.name,
          })),
          actors: _product?.actors?.map((actor) => ({
            value: actor?.id,
            label: actor?.name,
          })),
          directors: _product?.directors?.map((d) => ({
            value: d.id,
            label: d.name,
          })),
          videos: [],
          sounds: [],
          subtitles: [],
        });
        props.closeHandler();
      }
    } catch (err) {
      return Promise.reject(err);
    }
  };

  return (
    <SearchModalStyle
      className={`col-10 ${props.className}`}
      show={products?.length ? true : false}
      ref={modalRef}
    >
      <div className="d-flex">
        <input
          value={inputValue}
          className="form-control"
          onChange={({ target }) => setInputValue(target.value)}
          placeholder={props.placeholder && props.placeholder}
          type="text"
        />
        {props.confirm && (
          <button className="confirmBtn me-2" onClick={submitHandler}>
            <Check />
          </button>
        )}
      </div>
      {selectState && (
        <div className="searchModal">
          {products || products?.length < 0 ? (
            products.map((product) => (
              <div
                onClick={productClickHandler.bind(this, product)}
                data-id={product.id}
                className="productHolder"
                key={product.id}
              >
                <span>{product.name}</span>
                <span>{product.translatedName}</span>
              </div>
            ))
          ) : (
            <span className="placeHolder">محصولی موجود نیست</span>
          )}
        </div>
      )}
    </SearchModalStyle>
  );
};

SearchModal.defaultProps = {
  confirm: true,
  searchApi: "products",
  placeholder: "جستجو در محتواها",
  justSearch: true,
};

export default SearchModal;
