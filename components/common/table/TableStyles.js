import styled from "styled-components";

export const TableStyles = styled.div`
  .p-datatable-wrapper {
    border-radius: 16px;
    border: 1px solid #e0e0e0;
    overflow: hidden;
    transition: filter 0.2s;

    tr > th,
    tr > td {
      text-align: center;
      background-color: #fff;
    }

    th {
      padding: 16px 10px;

      .p-column-header-content {
        justify-content: center;
      }
    }

    td {
      padding: 18px 10px;
      transition: background-color 0.3s;
    }

    .p-datatable-tbody {
      tr:hover > td {
        background-color: #f5f5f5;
      }

      .p-datatable-emptymessage [role="cell"] {
        width: 100%;
        text-align: center;
      }

      .badge {
        margin: auto;
      }
    }
  }

  .p-paginator {
    direction: ltr;
    flex-direction: row-reverse;
    border: none;
    padding-top: 24px;
    transition: filter 0.2s;

    .p-paginator-current {
      pointer-events: none;
    }

    .p-paginator-element {
      border-radius: 3rem;
    }
  }

  .p-datatable-loading-overlay {
    border-radius: 16px;
    background-color: #0001;

    & + .p-datatable-wrapper,
    & + .p-datatable-wrapper + .p-paginator {
      filter: blur(2px);
    }

    .p-datatable-loading-icon {
      animation-duration: 1s;
      font-size: 10px;
      color: #e21221;
      width: 50px;
      height: 50px;
    }
  }
`;
