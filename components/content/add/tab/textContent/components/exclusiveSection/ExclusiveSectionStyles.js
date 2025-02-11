import styled from "styled-components";

export const ExclusiveSectionStyles = styled.div`
  .title {
    margin-top: 1.5rem;
    font-size: 1.25rem;
    font-weight: 600;
  }
  .description {
    line-height: 1.375rem;
    padding: 0.5rem 1rem;
    margin-bottom: unset;
    li {
      list-style: disc;
      font-weight: 400;
      font-size: 14px;

      &::marker {
        color: #e21221;
      }
    }
  }
  .radios {
    margin-top: 1.25rem;
  }
  .title-label {
    font-weight: 600;
    font-size: 1rem;
  }
  .form-check-input {
    float: right;
    margin-left: 1rem;
    -ms-transform: scale(1.5);
    -webkit-transform: scale(1.5);
    transform: scale(1.5);
    cursor: pointer;

    &:checked {
      background-color: #000;
      border-color: #000;
    }
    &:focus {
      border-color: rgba(0, 0, 0, 0.25);
      outline: 0;
      box-shadow: 0 0 0 0.15rem rgba(0, 0, 0, 0.25);
    }
  }
  .sub-input {
    label {
      font-weight: 400;
      font-size: 0.875rem;
      color: #0e0e10;
    }
    p {
      font-size: 0.75rem;
      color: #404046;
    }
    .green-label {
      color: #2a8100;
    }
    .discount {
      margin-right: 0.5rem;
      color: #2a8100;
    }
  }
  input {
    text-align: left;
    direction: ltr;

    &::placeholder {
      text-align: right;
      direction: rtl;
    }
  }
`;
