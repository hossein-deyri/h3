import styled from "styled-components";

export const CustomDatePickerStyles = styled.div`
  .rmdp-container {
    width: 100%;

    .datepicker-input {
      height: 38px;
      direction: ltr;
      text-align: left;
      color: #495057;
      background: #ffffff;
      padding: 0.375rem 0.75rem;
      border: 1px solid #ced4da;
      transition: background-color 0.2s, color 0.2s, border-color 0.2s,
        box-shadow 0.2s;
      appearance: none;
      border-radius: 3px;
      width: 100%;

      &::placeholder {
        direction: rtl;
        text-align: right;
      }

      &:enabled:hover {
        border-color: #2196f3;
      }
      &:enabled:focus {
        outline: 0 none;
        outline-offset: 0;
        box-shadow: 0 0 0 0.2rem #a6d5fa;
        border-color: #2196f3;
      }
      &:disabled {
        background-color: #b8b8bd;
      }
    }
  }
`;
