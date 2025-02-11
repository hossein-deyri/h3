import { ItemListStyle } from "./ItemListStyle";
import { useState, useEffect, useRef } from "react";
import { classNames } from "primereact/utils";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { InputTextarea } from "primereact/inputtextarea";
import { InputNumber } from "primereact/inputnumber";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import "./flags.css";
import {
  CONST_ACTIVE,
  CONST_BOOLEAN,
  CONST_CHANNELS,
  CONST_CODE,
  CONST_CUSTOMERS,
  CONST_DATE_FORMAT,
  CONST_DATE_TIME_PICKER,
  CONST_DEFAULT_DISCOUNT,
  CONST_DESCRIPTION,
  CONST_DROP_DOWN,
  CONST_ENTER,
  CONST_FEMALE,
  CONST_FIXED,
  CONST_ID,
  CONST_IMAGE,
  CONST_INVISIBLE,
  CONST_MALE,
  CONST_NUMBER,
  CONST_PLAN_PRICE,
  CONST_PRODUCTS,
  CONST_ROLES,
  CONST_ROLE_CLIENT,
  CONST_TEXT,
  CONST_TEXT_AREA,
  CONST_VALIDITY_PERIOD,
  IMAGES_ITEM_FIELD_TYPE_ENUMS,
  NAV_SIDE,
  CONST_DISCOUNT_CODE,
  CONST_DISCOUNT_TYPE,
  CONST_DISCOUNT_AMOUNT,
  CONST_DISCOUNT_ACTIVE_DATE_FROM,
  CONST_DISCOUNT_ACTIVE_DATE_TO,
  CONST_DISCOUNT_STATUS,
  CONST_EMAIL,
  CONST_FIRST_NAME,
  CONST_LAST_NAME,
  CONST_SIGNIN_DATE,
  CONST_USERS,
  CONST_CONTENT_NAME,
  CONST_SUBSCRIPTION_TYPE,
  CONST_SUBSCRIPTIONS,
  CONST_PAYMENT_STATUS,
  CONST_PRICE,
  CONST_PURCHASE_DATE,
  CONST_COMPLETION_DATE,
  CONST_PURCHASE_TIME,
  CONST_COMPLETION_TIME,
  CONST_MOBILE,
  CONST_EXCLUSIVE_NAME,
  SALES_STATUS,
  CONST_INSTAGRAM_LINK,
  CONST_TAGS,
  CONST_SCREENING_STATE,
  CONST_STATE,
  CONST_STATUS,
  CONST_PRICE_CUSTOMER_SUBSCRIPTION,
  CONST_CREDIT_START,
  CONST_CREDIT_END,
  CONST_PRICE_SUBSCRIPTION,
  CONST_DISCOUNT_NAME,
} from "utilize/constant/constants";
import UploadImage from "components/content/add/upload/image";
import { InputSwitch } from "primereact/inputswitch";
import { Lock } from "@styled-icons/remix-fill/Lock";
import Textarea from "components/content/add/form/textarea/index.jsx";
import manPlaceholder from "statics/img/manPlaceholder.jpg";
import womanPlaceholder from "statics/img/womanPlaceholder.jpg";
import { ChevronRight } from "@styled-icons/bootstrap/ChevronRight";
import { ChevronLeft } from "@styled-icons/bootstrap/ChevronLeft";
import { ChevronDoubleRight } from "@styled-icons/bootstrap/ChevronDoubleRight";
import { ChevronDoubleLeft } from "@styled-icons/bootstrap/ChevronDoubleLeft";
import { EyeOff } from "@styled-icons/remix-fill/EyeOff";
import DatePicker, { DateObject } from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { BookmarkCheckFill } from "@styled-icons/bootstrap/BookmarkCheckFill";
import { ContentPaste } from "@styled-icons/material/ContentPaste";
import {
  customerAPI,
  DELETE,
  get,
  patch,
  post,
  put,
} from "services/httpService";
import { endpoints } from "endpoints";
import { showSuccess, showError } from "utilize/toast";
import {
  timeStampChangeToJalaiDate,
  timeStampChangeToJalaiTime,
} from "utilize/date";
import { sepNum } from "utilize/separateNumber";
import { SUBSCRIPTION_TYPE } from "utilize/constant/subscriptionType";
import BadgeStatus from "components/common/badgeStatus/BadgeStatus";
import numberUtils from "utilize/numberUtils";
import { Divider } from "primereact/divider";
import { useSelector } from "react-redux";
import NewFeatureBadge from "components/common/NewFeatureBadge/NewFeatureBadge";
import PRODUCT_SCREENING_STATE from "utilize/constant/productScreeningState";
import PRODUCT_STATE from "utilize/constant/productState";
import * as qs from "qs";
import { formatToToman } from "utilize/currency/currency";

const ItemList = ({ setCreateUser, ...props }) => {
  const [editing, setEditing] = useState(false);
  const [productObj, setProductObj] = useState();
  const [products, setProducts] = useState([]);
  const [productDialog, setProductDialog] = useState(false);
  const [deleteProductDialog, setDeleteProductDialog] = useState(false);
  const [assignDialog, setAssignDialog] = useState(false);
  const [product, setProduct] = useState();
  const [selectedProducts, setSelectedProducts] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [editingProduct, setEditingProduct] = useState();
  const [loadingState, setLoadingState] = useState(false);
  const [totalItems, setTotalItems] = useState();
  const [totalPage, setTotalPage] = useState();
  const [currentPage, setCurrentPage] = useState(0);
  const [pageInput, setPageInput] = useState(currentPage + 1);
  const [userName, setUserName] = useState("");
  const dt = useRef(null);
  const tagsList = useSelector((state) => state.tags);

  const settingPagination = (total) => {
    setTotalPage(Math.ceil(total / 20));
  };

  useEffect(() => {
    setPageInput(currentPage === totalPage ? currentPage : currentPage + 1);
  }, [currentPage]);

  let creatingProduct = (itemProps) => {
    let temp = {};
    itemProps.forEach((item) => {
      if (item.type === CONST_DATE_TIME_PICKER) {
        temp[item.name] = new DateObject();
      } else if (item.type === CONST_ROLES) {
        temp.roles = item.roleList;
      } else {
        temp[item.name] = "";
      }
    });
    setProduct(temp);
    setProductObj(temp);
  };

  const findAllItems = async (search) => {
    setLoadingState(true);
    const remainingItems = totalItems - (currentPage - 1) * 20;
    if (props.api === CONST_CUSTOMERS) {
      await customerAPI
        .get(endpoints.CUSTOMERS)
        .then(({ data }) => {
          setTotalItems(data.data.total);
          setLoadingState(false);
          setProducts(data.data);
        })
        .catch((err) => setLoadingState(false));
    } else {
      const params =
        props.api === CONST_PRODUCTS
          ? {
              ...(props.notPublished && { isPublished: false }),
              onlyPublished: false,
              size:
                totalItems && remainingItems < 20
                  ? totalItems - (currentPage - 1) * 20
                  : "20",
              offset:
                currentPage === totalPage && currentPage !== 0
                  ? (currentPage - 1) * 20
                  : currentPage * 20,
              ...(!search && searchInput && { name: searchInput }),
            }
          : props.api === CONST_USERS
          ? // @ali: I know this is not a good query param, i just have to.
            // The corresponding API does not support pagination without bugs at the
            // time of implementing this query param
            {
              size: 99999999,
            }
          : null;

      const resDat = await get(
        props.api === CONST_PRODUCTS ? endpoints.PRODUCTS() : props.api,
        {
          params,
        }
      )
        .then(({ data }) => {
          setTotalItems(
            props.api === endpoints.USERS["/"] ? data.total : data.data.total
          );
          props.api === CONST_PRODUCTS && settingPagination(data.data.total);
          setLoadingState(false);
          if (props.api === endpoints.V2.SUBSUCRIPTION) {
            let _products = [];
            _products = data.data.items;

            const renderNewProducts = _products?.map((item) => {
              return {
                statusPrice: item?.status === "PAID" ? "موفق" : "ناموفق",
                username: item?.user?.username,
                mobile: item?.user?.mobile,
                createdAt: item?.activeDate?.from
                  ? timeStampChangeToJalaiDate(item?.activeDate?.from)
                  : "-",
                price: item?.price?.totalAmount,
                planName: item?.plan?.name,
              };
            });
            setProducts(renderNewProducts);
          } else if (props.api === endpoints.VIOLATIONS) {
            const finalData = data.data.content?.map((item) => ({
              contentId: item.contentId,
              firstName: item.user.firstName,
              mobile: item.user.mobile,
              contentName: item.contentName,
              reason: item.reason,
            }));
            setProducts(finalData);
          } else {
            let _products = [];
            _products =
              props.api === CONST_PRODUCTS ||
              props.api ===
                endpoints.PRODUCT_SALES_LIST({ productID: props.productID }) ||
              props.api.startsWith(
                endpoints.V2.USERS.SUBSCRIPTIONS(props.productID)
              )
                ? data.data.items
                : data.data;

            _products =
              props.api === endpoints.USERS["/"] ? data.items : _products;
            if (props.api === endpoints.LIVES) {
              _products.forEach((item) => {
                const _start = new DateObject({
                  date: item.startDateTime,
                  calendar: persian,
                  locale: persian_fa,
                });
                item.startDateTime = _start.format(CONST_DATE_FORMAT);
                const _end = new DateObject({
                  date: item.endDateTime,
                  calendar: persian,
                  locale: persian_fa,
                });
                item.endDateTime = _end.format(CONST_DATE_FORMAT);
              });
            }

            if (props.api === endpoints.USERS["/"]) {
              const options = {
                year: "numeric",
                month: "long",
                day: "numeric",
              };
              _products.forEach((item, index) => {
                _products[index].createdAt = new Date(
                  item?.createdAt
                ).toLocaleDateString("fa-IR", options);
              });
            }
            setProducts(_products);
          }
        })
        .catch((err) => setLoadingState(false));
    }
  };

  useEffect(() => {
    findAllItems();
  }, [currentPage]);

  useEffect(() => {
    creatingProduct(props.item);
    return () => {
      setProducts(null);
    };
  }, []);

  const searchEnterHandler = async (e) => {
    if (e.key === "Enter") {
      setCurrentPage(0);
      setGlobalFilter(searchInput);
      findAllItems();
    }
  };

  const searchHandler = async (value) => {
    if (value.length === 0) {
      findAllItems(true);
      setGlobalFilter(null);
      setCurrentPage(0);
    }
    setSearchInput(value);
  };

  const openNew = () => {
    if (props.api === endpoints.USERS["/"]) setCreateUser?.(true);
    setProduct(productObj);
    setSubmitted(false);
    setProductDialog(true);
  };

  const keyDownHandler = (event) => {
    if (event.key === CONST_ENTER) {
      setCurrentPage(pageInput - 1);
    }
  };

  const hideDialog = () => {
    setSubmitted(false);
    setProductDialog(false);
    if (props.api === endpoints.ROLES) {
      const _list = [...props.item[1].roleList];
      _list.forEach((item) => {
        item.list.forEach((role) => {
          role.checked = false;
        });
      });
      const _product = {
        name: "",
        roles: _list,
      };
      setProduct(_product);
      setProductObj(_product);
    }
  };

  const hideDeleteProductDialog = () => {
    setDeleteProductDialog(false);
    setAssignDialog(false);
  };

  const roleChangeHandler = (roleIndex, index) => {
    const _product = { ...product };
    _product.roles[index].list[roleIndex].checked =
      !_product.roles[index].list[roleIndex].checked;
    setProduct(_product);
  };

  const saveItem = async () => {
    const _product = { ...product };
    if (props.api === endpoints.ROLES) {
      const _list = [];
      _product.roles.forEach((item) => {
        item.list.forEach((role) => {
          role.checked && _list.push(role.value);
        });
      });
      _product.roles = _list;
    }
    if (_product.imagePath) {
      _product.imagePath = product.imagePath.src ? product.imagePath.src : "";
    }
    if (_product.images && _product.images.src) {
      _product.imagePath = _product.images.src ? product.imagePath.src : "";
    }
    if (props.checkBySearch) {
      await get(props.api, {
        params: {
          name: product.translatedName,
        },
      })
        .then(async ({ data }) => {
          if (
            data?.data?.[0] &&
            data.data[0].translatedName === product.translatedName
          ) {
            showError("عنوان تکراری میباشد لطفا عنوان را درست فرمایید");
          } else if (props.api === endpoints.USERS["/"]) {
            setLoadingState(true);
            if (_product.mobile.length < 10)
              return showError("لطفا شماره موبایل را درست وارد کنید.");
            if (_product.password.length < 8)
              return showError("گذرواژه باید حداقل 8 کاراکتر باشد");

            const payload = {
              email: _product.email,
              firstName: _product.firstName,
              lastName: _product.lastName,
              mobile: _product.mobile,
              password: _product.password,
              status: "ACTIVE",
              username: _product.username,
              access: _product.access,
            };

            await post(props.api, JSON.stringify(payload))
              .then(({ data }) => {
                setProductDialog(false);
                setProduct(productObj);
                findAllItems();
                showSuccess();
              })
              .catch((error) => {
                showError(error);
              })
              .finally(() => setLoadingState(false));
          } else {
            setLoadingState(true);
            await post(props.api, JSON.stringify(_product))
              .then(({ data }) => {
                setProductDialog(false);
                setProduct(productObj);
                findAllItems();
                showSuccess();
              })
              .catch((err) => {
                showError();
              })
              .finally(() => setLoadingState(false));
          }
        })
        .catch((error) => showError(error));
    } else {
      setLoadingState(true);
      if (props.api === CONST_CUSTOMERS) {
        const _customer = {
          mobile: _product.mobile,
          password: "fakePassword",
          roles: [CONST_ROLE_CLIENT],
        };
        await customerAPI
          .post(endpoints.USERS.SIGNUP, JSON.stringify(_customer))
          .then(async (data) => {
            _product.userId = data.data;
            await customerAPI
              .post(props.api, JSON.stringify(_product))
              .then(({ data }) => {
                setProductDialog(false);
                setProduct(productObj);
                findAllItems();
                showSuccess();
              })
              .catch((err) => {
                showError();
              })
              .finally(() => setLoadingState(false));
          })
          .catch((err) => {
            showError(
              err.response.data.data.errorCode === "15002"
                ? "حساب کاربری با شماره موردنظر موجود میباشد"
                : "خطا در ساخت کاربر جدید"
            );
          });
      } else if (props.api === endpoints.PLANS["/"]) {
        const payload = {
          name: _product?.name,
          logo: _product?.imagePath,
          badgeLogo: _product?.badgeLogo,
          duration: _product?.duration,
          description: _product?.description,
          status: _product?.status ? "ACTIVE" : "INACTIVE",
          price: {
            amount: _product?.amount,
            ...(_product.discountCode && {
              discount: {
                code: _product.discountCode,
              },
            }),
          },
        };

        await post(props.api, JSON.stringify(payload))
          .then(({ data }) => {
            setProductDialog(false);
            setProduct(productObj);
            findAllItems();
            showSuccess();
          })
          .catch((err) => {
            showError(err.message);
          })
          .finally(() => setLoadingState(false));
      } else if (props.api === endpoints.DISCOUNTS["/"]) {
        const payload = {
          name: _product.name,
          code: _product.discountCode,
          type: _product.discountType,
          value: _product.discountValue,
          status: _product.status,
          activeDate: {
            from: _product["activeDate.from"],
            to: _product["activeDate.to"],
          },
        };

        await post(props.api, JSON.stringify(payload))
          .then(({ data }) => {
            setProductDialog(false);
            setProduct(productObj);
            findAllItems();
            showSuccess();
          })
          .catch((err) => {
            showError();
          })
          .finally(() => setLoadingState(false));
      } else {
        await post(props.api, JSON.stringify(_product))
          .then(({ data }) => {
            setProductDialog(false);
            setProduct(productObj);
            findAllItems();
            showSuccess();
          })
          .catch((err) => {
            showError();
          })
          .finally(() => setLoadingState(false));
      }
    }
  };

  const assignRole = async () => {
    await put(
      endpoints.USERS.ASSIGN + userName,
      JSON.stringify({ roles: product.roles })
    )
      .then(() => {
        showSuccess();
        setAssignDialog(false);
        setUserName("");
      })
      .catch((err) => {
        showError();
      });
  };

  const updateItem = async () => {
    setCreateUser?.(false);
    let _product, roleList, status;

    if (props.api === endpoints.USERS["/"]) {
      ({ roleList, status, ..._product } = product);
    } else {
      ({ roleList, ..._product } = product);
    }

    if (props.api === endpoints.ROLES) {
      const _list = [];

      _product.roles.forEach((item) => {
        item.list.forEach((role) => {
          role.checked && _list.push(role.value);
        });
      });

      _product.roles = _list;
    }

    _product.imagePath =
      product.imagePath && product.imagePath.src ? product.imagePath.src : "";

    if (props.checkBySearch) {
      await get(props.api, { params: { name: product.translatedName } })
        .then(async ({ data }) => {
          if (
            data?.data?.length > 0 &&
            data?.data?.[0]?.translatedName === product?.translatedName &&
            data?.data?.[0]?.id !== product?.id
          ) {
            showError("عنوان تکراری میباشد لطفا عنوان را درست فرمایید");
          } else {
            setLoadingState(true);
            await patch(`${props.api}/${product.id}`, JSON.stringify(_product))
              .then(() => {
                setProductDialog(false);
                setProduct(productObj);
                findAllItems();
                showSuccess();
              })
              .catch((err) => {
                showError();
              })
              .finally(() => setLoadingState(false));
          }
        })
        .catch((err) => showError());
    } else {
      setLoadingState(true);
      if (props.api === CONST_CUSTOMERS) {
        await customerAPI
          .put(`${props.api}/${product.id}`, JSON.stringify(_product))
          .then(({ data }) => {
            setProductDialog(false);
            setProduct(productObj);
            findAllItems();
            showSuccess();
          })
          .catch((err) => {
            showError();
          })
          .finally(() => setLoadingState(false));
      } else if (props.api === endpoints.PLANS["/"]) {
        const payload = {
          name: _product?.name,
          logo: _product?.imagePath || _product?.logo,
          badgeLogo: _product?.badgeLogo,
          duration: _product?.duration,
          description: _product?.description,
          status: _product?.status ? "ACTIVE" : "INACTIVE",
          price: {
            amount: Number(_product?.amount),
            ...(_product?.discountCode && {
              discount: {
                code: _product?.discountCode,
              },
            }),
            ...(_product?.discountCode === null && {
              discount: null,
            }),
          },
        };

        await put(`${props.api}/${product.id}`, JSON.stringify(payload))
          .then(({ data }) => {
            setProductDialog(false);
            setProduct(productObj);
            findAllItems();
            showSuccess();
          })
          .catch((err) => {
            showError(
              "در فرایند آپدیت پلن مشکلی مواجه شده است. ممکن است بدلیل کد تخفیف اشتباه باشد."
            );
          })
          .finally(() => setLoadingState(false));
      } else if (props.api === endpoints.DISCOUNTS["/"]) {
        const payload = {
          name: _product.name,
          code: _product.discountCode,
          type: _product.discountType,
          value: _product.discountValue,
          status: _product.status,
          activeDate: {
            from: _product["activeDate.from"],
            to: _product["activeDate.to"],
          },
        };

        await put(`${props.api}/${product.id}`, JSON.stringify(payload))
          .then(({ data }) => {
            setProductDialog(false);
            setProduct(productObj);
            findAllItems();
            showSuccess();
          })
          .catch((err) => {
            showError(
              "در فرایند آپدیت تخفیف مشکلی مواجه شده است. ممکن است بدلیل کد تخفیف اشتباه باشد."
            );
          })
          .finally(() => setLoadingState(false));
      } else {
        await put(`${props.api}/${product.id}`, JSON.stringify(_product))
          .then(({ data }) => {
            setProductDialog(false);
            setProduct(data.data);
            findAllItems();
            showSuccess();
          })
          .catch((err) => {
            showError();
          })
          .finally(() => setLoadingState(false));
      }
    }
  };

  const saveProduct = async () => {
    setSubmitted(true);

    if (product.id) {
      updateItem();
    } else {
      saveItem();
    }
  };

  const editProduct = async (product) => {
    if (props.api === CONST_PRODUCTS) {
      props.productSetID(product.id);
      props.productNavSetter(NAV_SIDE.MENU.EDIT_CONTENT);
    } else if (props.api === CONST_CHANNELS) {
      props.productSetID(product.id);
      props.productNavSetter(NAV_SIDE.MENU.EDIT_CHANNEL);
    } else if (props.api === endpoints.SETTINGS.MAINPAGE.CATEGORIES()) {
      props.productSetID(product.id);
      props.productNavSetter(NAV_SIDE.MENU.EDIT_CATEGORY);
    } else {
      setProductDialog(true);
      setLoadingState(true);
      if (props.api === CONST_CUSTOMERS) {
        await customerAPI
          .get(`${props.api}/${product.id}`)
          .then(({ data }) => {
            findAllItems();
            const _product = data.data;
            _product.imagePath = { src: data.data.imagePath };
            setProduct(_product);
          })
          .catch((err) => showError())
          .finally(() => setLoadingState(false));
      } else if (props.api === endpoints.DISCOUNTS["/"]) {
        await get(`${props.api}/${product.id}`)
          .then(({ data }) => {
            findAllItems();
            const _product = data.data;

            const discountObj = {
              id: _product.id,
              name: _product.name,
              discountCode: _product.code,
              discountType: _product.type,
              discountValue: _product.value,
              status: _product.status,
              "activeDate.from": new Date(_product?.activeDate?.from).getTime(),
              "activeDate.to": new Date(_product?.activeDate?.to).getTime(),
            };

            setProduct(discountObj);
          })
          .catch((err) => showError())
          .finally(() => setLoadingState(false));
      } else {
        await get(`${props.api}/${product.id}`)
          .then(({ data }) => {
            findAllItems();

            const _product = data?.data || data;
            if (props.api === endpoints.ROLES) {
              const _roles = [...props?.item[1].roleList];

              _product?.roles?.forEach((role) => {
                _roles?.forEach((item) => {
                  item?.list?.forEach((singleRole) => {
                    if (singleRole.value === role) {
                      singleRole.checked = true;
                    }
                  });
                });
              });

              _product.roles = _roles;
            }

            const extra = {
              ...(_product.status && {
                status:
                  data?.data?.status === "ACTIVE" || data?.status === "ACTIVE"
                    ? true
                    : false,
              }),

              ...(_product.imagePath && {
                imagePath: { src: data?.data?.imagePath || data?.imagePath },
              }),

              ...(_product?.price?.amount && {
                amount:
                  data?.data?.price.amount.toString() ||
                  data?.price.amount.toString(),
              }),

              ...(_product?.price?.discount?.code && {
                discountCode:
                  data?.data?.price?.discount?.code?.toString() ||
                  data?.price?.discount?.code?.toString(),
              }),
            };

            const mergedObjs = {
              ...(props.api === endpoints.USERS["/"]
                ? {
                    ..._product,
                    access: _product.roleList?.[0]?.name || "",
                  }
                : _product),
              ...extra,
            };

            setProduct(mergedObjs);
          })
          .catch((err) => showError())
          .finally(() => setLoadingState(false));
      }
    }
  };

  const showDetail = async (product) => {
    if (props.api === endpoints.USERS["/"]) {
      props.productNavSetter(NAV_SIDE.MENU.USERS_DETAILS);
      props.productSetID(product.id);
    }
  };

  const confirmDeleteProduct = (product) => {
    setProduct(product);
    setDeleteProductDialog(true);
  };

  const deleteProduct = async () => {
    if (props.api === CONST_CUSTOMERS) {
      await customerAPI
        .delete(`${props.api}/${product.id}`)
        .then(({ data }) => {
          findAllItems();
          if (data.success) {
            showSuccess(
              `حذف کردن ${props.itemType} مورد نظر با موفقیت انجام شد`
            );
          } else {
            showError(`حذف کردن ${props.itemType} مورد نظر با با خطا روبرو شد`);
          }
        })
        .catch((err) => {
          showError(`حذف کردن ${props.itemType} مورد نظر با با خطا روبرو شد`);
        });
    } else if (
      props.api === endpoints.DISCOUNTS["/"] &&
      product.status === "ACTIVE"
    ) {
      return showError(
        "به دلیل فعال بودن کد تخفیف مورد نظر امکان حذف وجود ندارد."
      );
    } else {
      // TODO: @ali: remove the idToDelete and replace with `id` when the api is ready
      const idToDelete =
        props.api === endpoints.USERS["/"] ? product.username : product.id;
      await DELETE(`${props.api}/${idToDelete}`)
        .then(({ data }) => {
          findAllItems();
          if (data.success || props.api === endpoints.USERS["/"]) {
            showSuccess(
              `حذف کردن ${props.itemType} مورد نظر با موفقیت انجام شد`
            );
          } else {
            showError(`حذف کردن ${props.itemType} مورد نظر با با خطا روبرو شد`);
          }
        })
        .catch((err) => {
          showError(`حذف کردن ${props.itemType} مورد نظر با با خطا روبرو شد`);
        });
    }

    setDeleteProductDialog(false);
    setProduct(productObj);
  };

  const redirectingCreateMode = () => {
    if (props.api === CONST_PRODUCTS) {
      props.productNavSetter(NAV_SIDE.MENU.ADD_CONTENT);
    } else if (props.api === CONST_CHANNELS) {
      props.productNavSetter(NAV_SIDE.MENU.ADD_CHANNEL);
    } else {
      props.productNavSetter(
        props.rootDesired ? props.rootDesired : NAV_SIDE.MENU.ADD_CATEGORY
      );
    }
  };

  const onInputChange = (value, name) => {
    let _product = { ...product };
    _product[`${name}`] = value;
    setProduct(_product);
  };

  const editingRowInit = (event) => {
    if (!editing) {
      setEditing(true);
      setEditingProduct(event.data);
    }
  };

  const editingCleaning = (event) => {
    setEditing(false);
    setEditingProduct(null);
  };

  const editingRowSave = async () => {
    await put(props.api, JSON.stringify(editingProduct))
      .then(({ data }) => {
        findAllItems();
        if (data.success) {
          showSuccess();
        } else {
          showError();
        }
      })
      .catch((err) => {
        showError();
      });
    editingCleaning();
  };

  const rowEditingInputChange = (e, value, field) => {
    let tempProduct = { ...editingProduct };
    tempProduct[field] = value;
    setEditingProduct(tempProduct);
  };

  const editorModeInputs = (item, props) => {
    return (
      <>
        {item.type === CONST_TEXT && (
          <InputText
            value={editingProduct[item.name]}
            onChange={(e) =>
              rowEditingInputChange(props, e.target.value, item.name)
            }
            required
            autoFocus
            className={classNames({
              "p-invalid": submitted && !product[item.name],
            })}
          />
        )}
        {item.type === CONST_NUMBER && (
          <InputNumber
            value={product[item.name]}
            onChange={(e) => onInputChange(e.target.value, item.name)}
            required
            autoFocus
            className={classNames({
              "p-invalid": submitted && !product[item.name],
            })}
          />
        )}
        {item.type === CONST_TEXT_AREA && (
          <InputTextarea
            rows={5}
            value={product[item.name]}
            onChange={(e) => onInputChange(e.target.value, item.name)}
            required
            autoFocus
            className={classNames({
              "p-invalid": submitted && !product[item.name],
            })}
          />
        )}
        {item.type === CONST_DROP_DOWN && (
          <Dropdown
            options={item.options && item.options}
            value={product[item.name]}
            onChange={(e) => onInputChange(e.target.value, item.name)}
          />
        )}
      </>
    );
  };

  const leftToolbarTemplate = () => {
    return (
      <>
        <Button
          label={`ساخت ${props.itemType} جدید`}
          className="p-button-success p-mr-2"
          onClick={props.creatingMode ? openNew : redirectingCreateMode}
        />
      </>
    );
  };

  const countryBodyTemplate = (rowData) => {
    return (
      <>
        <img
          alt="nobino"
          src="showcase/demo/images/flag_placeholder.png"
          onError={(e) =>
            (e.target.src =
              "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
          }
          className={classNames("flag", "flag-" + rowData.code)}
        />
      </>
    );
  };

  const imageBodyTemplate = (rowData) => {
    const imageUrl = rowData.imagePath || rowData.logo || rowData.image;

    return (
      <img
        src={
          props.isChannel
            ? process.env.REACT_APP_API_URL_CHANNEL + imageUrl
            : process.env.REACT_APP_API_URL_FILE + imageUrl
        }
        onError={(e) => {
          if (rowData.gender) {
            e.target.src =
              rowData.gender === CONST_MALE
                ? manPlaceholder
                : rowData.gender === CONST_FEMALE && womanPlaceholder;
          } else {
            e.target.src =
              "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png";
          }
        }}
        alt={rowData.imagePath}
        className={
          "itemListImage" +
          (props.api === endpoints.SETTINGS.MAINPAGE.CATEGORIES()
            ? " new-style-image"
            : "")
        }
      />
    );
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <div className="d-flex justify-content-end">
        {props.api === endpoints.USERS["/"] && (
          <Button
            icon="pi-eye"
            className="p-button-rounded p-button-outlined mx-1"
            onClick={() => showDetail(rowData)}
          />
        )}
        {props.editRole && (
          <Button
            icon="pi pi-pencil"
            className="p-button-rounded p-button-outlined mx-1"
            onClick={() => editProduct(rowData)}
          />
        )}
        {props.api === endpoints.ROLES && props.assignRole && (
          <Button
            icon="pi pi-user-plus"
            className="p-button-rounded p-button-warning p-button-outlined mx-1"
            onClick={() => {
              setProduct(rowData);
              setAssignDialog(true);
            }}
          />
        )}
        {props.deleteRole && props.api !== CONST_CUSTOMERS && (
          <Button
            icon="pi pi-times"
            className="p-button-rounded p-button-danger p-button-outlined mx-1"
            onClick={() => confirmDeleteProduct(rowData)}
          />
        )}
      </div>
    );
  };

  const priceTemplate = (rowData) => {
    const price =
      rowData?.price?.amount?.toString().length > 3
        ? rowData.price.amount.toString().replace(/(\d)(?=(\d{3})+$)/g, "$1,")
        : rowData.price.amount;

    return <div className="text-center">{price}</div>;
  };

  const discountTemplate = (rowData) => {
    const price =
      rowData?.price?.discountDefault?.toString().length > 3
        ? rowData.price.discountDefault
            .toString()
            .replace(/(\d)(?=(\d{3})+$)/g, "$1,")
        : rowData.price.discountDefault;

    return <div className="text-center">{price}</div>;
  };

  const durationTemplate = (rowData) => {
    const durationObj = {
      ONE_MONTH: "یک ماهه",
      THREE_MONTH: "سه ماهه",
      SIX_MONTH: "شش ماهه",
    };

    return <div className="text-center">{durationObj[rowData?.duration]}</div>;
  };

  const statusTemplate = (rowData) => {
    const status = {
      ACTIVE: "فعال",
      INACTIVE: "غیر فعال",
      PAID: "پرداخت شده",
      SOON: "به زودی",
    };

    return <div className="text-center">{status[rowData?.status]}</div>;
  };

  const stateTemplate = (rowData) => (
    <BadgeStatus color={PRODUCT_STATE[rowData.state]?.variant?.toUpperCase()}>
      {PRODUCT_STATE[rowData.state]?.label}
    </BadgeStatus>
  );

  const screeningStateTemplate = (rowData) => (
    <div className="text-center">
      {PRODUCT_SCREENING_STATE[rowData.screeningState]?.label}
    </div>
  );

  const descriptionTemplate = (rowData) => {
    return (
      <div className="d-flex justify-content-start align-items-center">
        <p>
          {rowData && rowData.description
            ? `${rowData.description.slice(0, 50)}...`
            : ""}
        </p>
      </div>
    );
  };

  const fixedTemplate = (rowData) => <>{rowData.fixed && <Lock />}</>;

  const hiddenTemplate = (rowData) => <>{rowData.invisible && <EyeOff />}</>;

  const activeTemplate = (rowData) => (
    <>{rowData.active && <BookmarkCheckFill />}</>
  );

  const copyTemplate = (rowData) => (
    <>
      <button
        className="copyBtn"
        onClick={(e) => {
          navigator.clipboard.writeText(rowData.id);
          showSuccess(` ای دی${rowData.id} در کلیپ بورد شما ذخیره شد`);
        }}
      >
        <ContentPaste />
        کپی
      </button>
    </>
  );

  const discountCodeTemplate = (rowData) => {
    const code = rowData?.code || rowData?.price?.discount?.code;
    return <p>{code || "-"}</p>;
  };

  const discountTypeTemplate = (rowData) => {
    const typeObj = {
      PERCENTAGE: "درصد",
      FIX: "ثابت",
    };
    return <p>{typeObj[rowData.type]}</p>;
  };

  const discountAmountTemplate = (rowData) => {
    return (
      <p>
        {rowData.type === "PERCENTAGE"
          ? `${rowData.value} %`
          : `${sepNum(Math.ceil(rowData.value / 10))} تومان`}
      </p>
    );
  };

  const discountActiveDateFromTemplate = (rowData) => {
    const activeDateFromJalali = timeStampChangeToJalaiDate(
      new Date(rowData?.activeDate?.from).getTime()
    );
    return <p>{activeDateFromJalali}</p>;
  };

  const discountActiveDateToTemplate = (rowData) => {
    const activeDateToJalali = timeStampChangeToJalaiDate(
      new Date(rowData?.activeDate?.to).getTime()
    );
    return <p>{activeDateToJalali}</p>;
  };

  const discountStatusTemplate = (rowData) => {
    const statusObj = {
      ACTIVE: "فعال",
      INACTIVE: "غیر فعال",
    };

    return <p>{statusObj[rowData.status]}</p>;
  };

  const usersExclusiveNameTemplate = (rowData) => (
    <p>{rowData?.plan?.name ? rowData.plan.name : "-"}</p>
  );

  const usersFirstNameTemplate = (rowData) => (
    <p>{rowData?.firstName ? rowData.firstName : "-"}</p>
  );

  const usersLastNameTemplate = (rowData) => (
    <p>{rowData?.lastName ? rowData.lastName : "-"}</p>
  );

  const usersEmailTemplate = (rowData) => (
    <p>{rowData?.email ? rowData.email : "-"}</p>
  );

  const reportProduct = (rowData) => (
    <a href={`https://nobino.ir/vod/${rowData.contentId}`} target="_blank">
      {rowData?.contentName ? rowData.contentName : "-"}
    </a>
  );

  const productDetails = (product) => {
    props.productNavSetter(NAV_SIDE.MENU.PRODUCT_DETAILS);
    props.productSetID(product.id);
  };

  const paymentStatus = (rowData) => (
    <BadgeStatus color={SALES_STATUS[rowData?.status]?.variant}>
      {SALES_STATUS[rowData?.status]?.label || rowData?.status}
    </BadgeStatus>
  );

  const productPrice = (price) => (rowData) => {
    return <p>{formatToToman(rowData?.payment?.[price])}</p>;
  };

  const priceSubscription = (rowData) => {
    const { payment } = rowData || {};
    const { price, discount } = payment || {};
    const subscriptionFinalPrice = formatToToman(payment?.finalPrice, false);
    const finalAmount = discount
      ? formatToToman(price, false)
      : subscriptionFinalPrice;
    const discountAmount = discount?.value
      ? discount?.type === "PERCENTAGE"
        ? `%${discount.value}`
        : `${formatToToman(discount.value, false)}`
      : "-";

    return (
      <div className="subscription-price-wrapper">
        <p className={discount && "discounted"}>{finalAmount}</p>
        {discount && (
          <div className="discount-wrapper">
            <span className="paid-final-price">{subscriptionFinalPrice}</span>
            <span className="discount-amount">تخفیف: {discountAmount}</span>
          </div>
        )}
      </div>
    );
  };

  const formatDateAndTime =
    (dateKey = "", isCredit = false) =>
    (rowData) => {
      const dateParams = dateKey.split(".");

      let date = null;
      dateParams.forEach((item, index) => {
        if (index) {
          date = date?.[item];
        } else {
          date = rowData?.[item];
        }
      });

      if (!date) return <p>-</p>;

      const convertedDate = timeStampChangeToJalaiDate(
        new Date(date).getTime()
      );
      const convertedTime = timeStampChangeToJalaiTime(
        new Date(date).getTime()
      );

      if (isCredit) {
        return <p>{convertedTime + " " + convertedDate}</p>;
      }

      return <p>{convertedDate}</p>;
    };

  const discountNameTemplate = ({ payment }) => {
    const discountName = payment?.discount?.name || "-";
    return <p>{discountName}</p>;
  };

  const userPhoneNumber = (rowData) => {
    const hasPhoneNumber = rowData?.user?.mobile
      ? rowData.user.mobile
      : rowData?.mobile;
    return <p>{hasPhoneNumber || "-"}</p>;
  };

  const subscriptionType = (rowData) => {
    if (props.api === CONST_PRODUCTS) {
      const newSubscription = Object.values(SUBSCRIPTION_TYPE).find(
        (value) => value.id === rowData.subscriptionType
      );

      if (newSubscription) {
        const { label } = newSubscription;
        return (
          <span className="subscriptionTypeWrapper">
            {newSubscription.id === SUBSCRIPTION_TYPE.CUSTOM.id && (
              <Button
                icon="pi-eye"
                className="eyeButton"
                onClick={() => productDetails(rowData)}
              />
            )}
            {label}
          </span>
        );
      } else {
        return <span>نامشخص</span>;
      }
    } else if (
      props.api ===
      endpoints.V2.USERS.SUBSCRIPTIONS(props.productID) +
        qs.stringify(
          { subscriptionType: SUBSCRIPTION_TYPE.SYSTEM.id },
          { addQueryPrefix: true }
        )
    ) {
      const subscriptionDetail =
        rowData.plan.name && rowData.plan.description
          ? `${rowData.plan.name} / ${rowData.plan.description}`
          : "نامشخص";
      return <span>{subscriptionDetail}</span>;
    }
  };

  const header = (
    <div className="table-header">
      <h5 className="p-m-0">
        {props.title}
        {props.api === endpoints.SETTINGS.MAINPAGE.CATEGORIES() && (
          <NewFeatureBadge
            description={[
              "نام فارسی به نام جایگزین شد",
              "ستون نام انگلیسی حذف گردید",
              "ستون تصویر به جدول افزوده شد",
              "ستون تگ به جدول افزوده شد",
            ]}
          />
        )}
      </h5>
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          type="search"
          onKeyDown={searchEnterHandler}
          onInput={(e) => searchHandler(e.target.value)}
          placeholder="جستجو"
        />
      </span>
    </div>
  );

  const productDialogFooter = (
    <div className="d-flex align-items-center">
      <button className="modalBtn ms-2" onClick={saveProduct}>
        ذخیره
      </button>
      <button className="modalBtn" onClick={hideDialog}>
        انصراف
      </button>
    </div>
  );

  const generateTagBadges = (rowData) => {
    return (
      <div className="tags-wrapper">
        {rowData.tags.map((tagValue) => {
          const foundTag = tagsList.find((tag) => tag.value === tagValue);
          return (
            <BadgeStatus
              className="alignment"
              key={tagValue}
              minWidth="fit-content"
            >
              {foundTag ? foundTag.label : tagValue}
            </BadgeStatus>
          );
        })}
      </div>
    );
  };

  const deleteProductDialogFooter = (
    <>
      <Button
        label="بله"
        className="p-button-text text-danger"
        onClick={deleteProduct}
      />
      <Button
        label="خیر"
        className="p-button-text text-success"
        onClick={hideDeleteProductDialog}
      />
    </>
  );

  const onIndexTemplate = (data, props) => props.rowIndex + 1;

  /**
   * TODO: @ali: every single column of each table should be separatedly sortable
   * so this method should removed and replaced with a new functionality
   */
  const isSortable = () => {
    return !(
      props.api ===
        endpoints.PRODUCT_SALES_LIST({
          productID: props.productID,
        }) ||
      props.api.includes(endpoints.V2.USERS.SUBSCRIPTIONS(props.productID))
    );
  };

  return (
    <ItemListStyle editingMode={editing}>
      <div className="datatable-crud-demo">
        {product && (
          <>
            <div className="card position-relative">
              {props.createRole && (
                <Toolbar
                  className="p-mb-4"
                  left={leftToolbarTemplate}
                ></Toolbar>
              )}
              {loadingState && (
                <div
                  className="spinner-border position-absolute top-50 left-50 itemListLoading"
                  role="status"
                >
                  <span className="sr-only"></span>
                </div>
              )}
              <DataTable
                onRowEditInit={editingRowInit}
                onRowEditCancel={editingCleaning}
                onRowEditSave={editingRowSave}
                emptyMessage="اطلاعات یافت نشد"
                editMode="row"
                ref={dt}
                value={products}
                selection={selectedProducts}
                onSelectionChange={(e) => setSelectedProducts(e.value)}
                dataKey="id"
                paginator={props.api === CONST_PRODUCTS ? false : true}
                rows={props.api === CONST_PRODUCTS ? 20 : 10}
                paginatorTemplate="   NextPageLink  LastPageLink PageLinks FirstPageLink PrevPageLink CurrentPageReport RowsPerPageDropdown"
                currentPageReportTemplate={`نمایش ${props.itemType} {first} تا {last}  از {totalRecords} ${props.itemType}`}
                rowsPerPageOptions={[10, 25, 50]}
                globalFilter={globalFilter}
                header={
                  props.api === CONST_SUBSCRIPTIONS ||
                  props.api ===
                    endpoints.PRODUCT_SALES_LIST({
                      productID: props.productID,
                    }) ||
                  props.api.startsWith(
                    endpoints.V2.USERS.SUBSCRIPTIONS(props.productID)
                  )
                    ? null
                    : header
                }
              >
                <Column
                  field="Index"
                  style={{ width: "70px" }}
                  header="ردیف"
                  body={onIndexTemplate}
                />
                {props.item &&
                  props.item?.map((item, i) => (
                    <Column
                      className={item.className}
                      style={item.style}
                      key={i}
                      field={item.name}
                      header={item.persianName}
                      sortable={isSortable()}
                      body={
                        item.name === CONST_CODE
                          ? countryBodyTemplate
                          : item.type === CONST_IMAGE
                          ? imageBodyTemplate
                          : item.name === CONST_FIXED
                          ? fixedTemplate
                          : item.name === CONST_INVISIBLE
                          ? hiddenTemplate
                          : item.name === CONST_ACTIVE
                          ? activeTemplate
                          : item.name === CONST_ID
                          ? copyTemplate
                          : item.name === CONST_PLAN_PRICE
                          ? priceTemplate
                          : item.name === CONST_DEFAULT_DISCOUNT
                          ? discountTemplate
                          : item.name === CONST_VALIDITY_PERIOD
                          ? durationTemplate
                          : item.name === CONST_STATUS
                          ? statusTemplate
                          : item.name === CONST_STATE
                          ? stateTemplate
                          : item.name === CONST_DISCOUNT_CODE
                          ? discountCodeTemplate
                          : item.name === CONST_DISCOUNT_TYPE
                          ? discountTypeTemplate
                          : item.name === CONST_DISCOUNT_AMOUNT
                          ? discountAmountTemplate
                          : item.name === CONST_DISCOUNT_ACTIVE_DATE_FROM
                          ? discountActiveDateFromTemplate
                          : item.name === CONST_DISCOUNT_ACTIVE_DATE_TO
                          ? discountActiveDateToTemplate
                          : item.name === CONST_DISCOUNT_STATUS
                          ? discountStatusTemplate
                          : item.name === CONST_FIRST_NAME
                          ? usersFirstNameTemplate
                          : item.name === CONST_LAST_NAME
                          ? usersLastNameTemplate
                          : item.name === CONST_EMAIL
                          ? usersEmailTemplate
                          : item.name === CONST_CONTENT_NAME
                          ? reportProduct
                          : item.name === CONST_SUBSCRIPTION_TYPE
                          ? subscriptionType
                          : item.name === CONST_PAYMENT_STATUS
                          ? paymentStatus
                          : item.name === CONST_PRICE
                          ? productPrice("price")
                          : item.name === CONST_PRICE_SUBSCRIPTION
                          ? priceSubscription
                          : item.name === CONST_PURCHASE_DATE
                          ? formatDateAndTime("createdAt", true)
                          : item.name === CONST_PURCHASE_TIME
                          ? formatDateAndTime("createdAt", false)
                          : item.name === CONST_COMPLETION_DATE
                          ? formatDateAndTime("activeDate.to")
                          : item.name === CONST_COMPLETION_TIME
                          ? formatDateAndTime("activeDate.to", false)
                          : item.name === CONST_CREDIT_START
                          ? formatDateAndTime("activeDate.from", true)
                          : item.name === CONST_CREDIT_END
                          ? formatDateAndTime("activeDate.to", true)
                          : item.name === CONST_MOBILE
                          ? userPhoneNumber
                          : item.name === CONST_DESCRIPTION
                          ? descriptionTemplate
                          : item.name === CONST_EXCLUSIVE_NAME
                          ? usersExclusiveNameTemplate
                          : item.name === CONST_TAGS
                          ? generateTagBadges
                          : item.name === CONST_SCREENING_STATE
                          ? screeningStateTemplate
                          : item.name === CONST_PRICE_CUSTOMER_SUBSCRIPTION
                          ? productPrice("finalPrice")
                          : item.name === CONST_DISCOUNT_NAME
                          ? discountNameTemplate
                          : ""
                      }
                      editor={editorModeInputs.bind(this, item)}
                    />
                  ))}
                {!props.rowEditing &&
                  props.api !== CONST_SUBSCRIPTIONS &&
                  props.api !==
                    endpoints.PRODUCT_SALES_LIST({
                      productID: props.productID,
                    }) &&
                  !props.api.startsWith(
                    endpoints.V2.USERS.SUBSCRIPTIONS(props.productID)
                  ) && (
                    <Column
                      style={{
                        width:
                          props.api === endpoints.ROLES ||
                          props.api === endpoints.USERS["/"]
                            ? "225px"
                            : "125px",
                      }}
                      body={actionBodyTemplate}
                    ></Column>
                  )}
                {props.rowEditing && (
                  <Column
                    rowEditor
                    headerStyle={{ width: "7rem" }}
                    bodyStyle={{ textAlign: "center" }}
                  ></Column>
                )}
              </DataTable>
            </div>
            <Dialog
              visible={productDialog}
              style={
                props.api === CONST_ROLES
                  ? { width: "800px" }
                  : { width: "450px" }
              }
              header={
                product.id
                  ? `ویرایش ${props.itemType}`
                  : `ایجاد ${props.itemType} جدید`
              }
              modal
              className="p-fluid"
              footer={productDialogFooter}
              onHide={hideDialog}
            >
              {product.image && (
                <img
                  src={`showcase/demo/images/product/${product.image}`}
                  onError={(e) =>
                    (e.target.src = process.env.REACT_APP_PLACEHOLDER)
                  }
                  alt={product.image}
                  className="product-image"
                />
              )}
              {props.item &&
                props.item
                  .filter((item) => item.name !== CONST_SIGNIN_DATE)
                  ?.map((item, i) => (
                    <div key={i} className="p-field d-flex flex-column mb-3">
                      <label className="mb-2" htmlFor={item.name}>
                        {item.persianName}
                      </label>
                      {item.type === CONST_TEXT && (
                        <InputText
                          id={item.name}
                          value={product[item.name]}
                          onChange={(e) =>
                            onInputChange(e.target.value, item.name)
                          }
                          readOnly={item.readOnly}
                          required
                          pattern={
                            item.name === CONST_MOBILE
                              ? "^(\\+98|0)?9\\d{9}$"
                              : item.name === CONST_INSTAGRAM_LINK
                              ? "https://.*"
                              : undefined
                          }
                          maxLength={
                            item.name === CONST_MOBILE ? 11 : undefined
                          }
                          className={classNames({
                            "p-invalid":
                              submitted && !product[item.name] && item.required,
                            "ltr-field": item.name === CONST_INSTAGRAM_LINK,
                          })}
                          placeholder={
                            item.name === CONST_INSTAGRAM_LINK &&
                            "https://www.domain.ir"
                          }
                        />
                      )}
                      {item.type === CONST_NUMBER && (
                        <InputNumber
                          id={item.name}
                          value={product[item.name]}
                          onChange={(e) =>
                            onInputChange(e.target.value, item.name)
                          }
                          required
                          autoFocus
                          className={classNames({
                            "p-invalid":
                              submitted && !product[item.name] && item.required,
                          })}
                        />
                      )}
                      {item.type === CONST_TEXT_AREA && (
                        <Textarea
                          placeholder={item.persianName}
                          value={product[item.name]}
                          counter={props.api === "persons" ? 2000 : 500}
                          itemName={item.name}
                          onChange={onInputChange}
                          rows={3}
                        />
                      )}
                      <div className="roles-wrapper">
                        {item.type === CONST_ROLES &&
                          item.roleList?.map((role, index) => (
                            <>
                              <div key={role.header} className="role-container">
                                <Divider
                                  layout="horizontal"
                                  className={`divider-${index + 1}`}
                                >
                                  <h4 className="role-header">{role.header}</h4>
                                </Divider>
                                <div className="roles-holder">
                                  {role.list?.map((roles, roleIndex) => (
                                    <div
                                      key={roles.value}
                                      className="role-holder"
                                    >
                                      <label htmlFor={roles.value}>
                                        {roles.label}
                                      </label>
                                      <InputSwitch
                                        key={roles.value}
                                        id={roles.value}
                                        checked={roles.checked}
                                        onChange={(e) =>
                                          roleChangeHandler(
                                            roleIndex,
                                            index,
                                            e.value
                                          )
                                        }
                                      />
                                    </div>
                                  ))}
                                </div>
                              </div>
                              <Divider
                                layout="vertical"
                                className="vertical-divider"
                              />
                            </>
                          ))}
                      </div>
                      {item.type === CONST_DATE_TIME_PICKER && (
                        <DatePicker
                          format={CONST_DATE_FORMAT}
                          calendar={persian}
                          locale={persian_fa}
                          value={product[item.name]}
                          onChange={(e) => {
                            onInputChange(e.toDate().getTime(), item.name);
                          }}
                          plugins={[<TimePicker position="bottom" />]}
                        />
                      )}
                      {item.type === CONST_DROP_DOWN && (
                        <Dropdown
                          options={item.options && item.options}
                          value={product[item.name]}
                          onChange={(e) =>
                            onInputChange(e.target.value, item.name)
                          }
                          className={
                            submitted &&
                            !product[item.name] &&
                            item.required &&
                            "p-invalid"
                          }
                        />
                      )}
                      {item.type === CONST_BOOLEAN && (
                        <InputSwitch
                          checked={product[item.name]}
                          onChange={(e) => onInputChange(e.value, item.name)}
                          className={
                            submitted &&
                            !product[item.name] &&
                            item.required &&
                            "p-invalid"
                          }
                        />
                      )}
                      {item.type === CONST_IMAGE && (
                        <UploadImage
                          CSSClass="h150"
                          itemList={true}
                          values={product}
                          itemType={item.name}
                          minHeight={"150px"}
                          field={IMAGES_ITEM_FIELD_TYPE_ENUMS.POSTER.label}
                          value={
                            product[item.name]
                              ? {
                                  src: !product[item.name].src?.includes(
                                    process.env.REACT_APP_API_URL_FILE
                                  )
                                    ? process.env.REACT_APP_API_URL_FILE +
                                      product[item.name].src
                                    : product[item.name].src,
                                }
                              : product[item.name]
                          }
                          setFieldValue={setProduct}
                        />
                      )}
                      {item.required && submitted && !product[item.name] && (
                        <small className="p-error">
                          {item.persianName} ضروری میباشد{" "}
                        </small>
                      )}
                    </div>
                  ))}
            </Dialog>
            <Dialog
              visible={deleteProductDialog}
              style={{ width: "450px" }}
              header="حذف آیتم"
              modal
              footer={deleteProductDialogFooter}
              onHide={hideDeleteProductDialog}
            >
              <div className="confirmation-content d-flex align-items-center ">
                <i
                  className="pi pi-exclamation-triangle ms-3 text-danger mt-1"
                  style={{ fontSize: "1.7rem" }}
                />
                {product && (
                  <span>
                    آیا از پاک کردن <b>{product?.name}</b> بعنوان{" "}
                    {props.itemType} اطمینان دارید؟
                  </span>
                )}
              </div>
            </Dialog>
            <Dialog
              visible={assignDialog}
              style={{ width: "450px" }}
              header="نسبت دادن دسترسی به..."
              modal
              onHide={hideDeleteProductDialog}
            >
              <div className="confirmation-content d-flex flex-column align-items-center ">
                <div className="mb-3">
                  <label htmlFor="userInput">کاربر مورد نظر</label>
                  <input
                    className="form-control"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    type="text"
                    id="userInput"
                  />
                </div>
                <button onClick={assignRole} className="saveBtn">
                  ثبت
                </button>
              </div>
            </Dialog>
          </>
        )}
        {props.api === CONST_PRODUCTS && (
          <div className="w-100   paginator">
            <button onClick={() => setCurrentPage(totalPage)}>
              <ChevronDoubleRight />
            </button>
            <button onClick={() => setCurrentPage((e) => e + 1)}>
              <ChevronRight />
            </button>
            <div className="col-2">
              <input
                className={`form-control text-center`}
                type="number"
                min={"1"}
                max={totalPage?.toString()}
                value={pageInput}
                onChange={(e) => setPageInput(e.target.value)}
                onKeyDown={keyDownHandler}
              />
            </div>
            <button onClick={() => setCurrentPage((e) => e - 1)}>
              <ChevronLeft />
            </button>
            <button onClick={() => setCurrentPage(0)}>
              <ChevronDoubleLeft />
            </button>
            <span>تعداد صفحات کل {totalPage}</span>
          </div>
        )}
      </div>
    </ItemListStyle>
  );
};

ItemList.defaultProps = {
  creatingMode: true,
};

export default ItemList;
