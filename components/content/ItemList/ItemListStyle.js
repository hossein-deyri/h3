import styled from "styled-components";

export const ItemListStyle = styled.div`
  height: 100%;

  .paginator {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;

    button {
      background: transparent;
      border: none;
      outline: none;
      margin: 0 10px;
      svg {
        color: black;
        width: 20px;
        height: 20px;
      }
    }
  }

  .copyBtn {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: none;
    color: #111;
    svg {
      width: 20px;
      height: 20px;
    }
  }

  .p-row-editor-init {
    display: ${(props) => (props.editingMode ? "none" : "block")};
  }

  .p-toast-message {
    direction: rtl;

    .p-toast-message-icon {
      display: none;
    }

    .p-toast-message-content {
      display: flex;
      direction: ltr;
      text-align: right;
      .p-toast-icon-close {
        margin-left: 5px;
      }
    }
  }

  .p-datatable-wrapper {
    height: 62.5vh;
    overflow-y: scroll;
    position: relative;
  }

  .p-editable-column {
    > a {
      text-decoration: underline;
    }
  }

  .p-datatable-thead {
    position: sticky;
    right: 0;
    top: 0;
    width: 100%;
    background: white;
    z-index: 10;
  }

  .datatable-crud-demo .table-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .datatable-crud-demo .product-image {
    width: 100px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  }

  .datatable-crud-demo .p-dialog .product-image {
    width: 150px;
    margin: 0 auto 2rem auto;
    display: block;
  }

  .datatable-crud-demo .confirmation-content {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .p-datatable .p-datatable-thead > tr > th {
    text-align: center !important;
    padding: 1rem 0.25rem;
  }

  .p-datatable .p-datatable-thead > tr > th .p-column-header-content {
    justify-content: center;
  }

  .p-datatable .p-sortable-column .p-sortable-column-icon {
    margin-left: unset;
    margin-right: 0.5rem;
  }

  .p-datatable .p-datatable-tbody > tr > td {
    text-align: center !important;
    transition: all 0.2s;
  }
  .p-datatable .p-datatable-tbody > tr:hover {
    > td {
      background-color: #f5f5f5;
    }
  }
  .p-datatable-tbody svg {
    width: 35px;
  }

  .itemListLoading {
    position: absolute;
    top: 50%;
    z-index: 50;
    left: 50%;
    width: 50px;
    height: 50px;
    color: #e21221;
  }

  .itemListImage {
    width: 120px;
    height: 120px;
    border-radius: 50%;

    &.new-style-image {
      border-radius: 0px;
      height: 100px;
      width: 150px;
      object-fit: contain;
    }
  }

  .subscriptionTypeWrapper {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    .eyeButton {
      width: 1.6rem;
      height: 1.6rem;
      border-radius: 50%;
      background: transparent;
      color: #2196f3;
    }
  }

  .subscription-price-wrapper {
    display: flex;
    justify-content: center;
    position: relative;
  }

  .discounted {
    min-width: 40px !important;
    position: relative;
    text-decoration: line-through;
  }

  .discount-wrapper {
    position: relative;
  }

  .paid-final-price {
    position: absolute;
    bottom: 90%;
    left: 90%;
    color: #2a8100;
  }

  .discount-amount {
    margin-right: 20px;
    color: #a39e9e;
  }

  .tags-wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    height: 100px;
    overflow-y: auto;
    gap: 10px;

    .alignment {
      margin: unset;
    }
  }
`;
