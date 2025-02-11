import styled from "styled-components";

export const BadgeStatusStyles = styled.div`
  width: fit-content;
  min-width: ${({ minWidth }) => (minWidth ? minWidth : "100px")};
  height: 32px;
  border-radius: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #404046;
  padding: 4px 10px;
  color: #404046;
  background-color: #40404622;
  margin: auto;
  font-size: 0.7rem;
  font-weight: 600;

  @media screen and (min-width: 1400px) {
    min-width: ${({ minWidth }) => (minWidth ? minWidth : "128px")};
  }

  &.success {
    border-color: #2a8100;
    background-color: #50b61e33;
    color: #2a8100;
  }

  &.error {
    border-color: #c30000;
    background-color: #ed2e2e33;
    color: #c30000;
  }

  &.info {
    border-color: #05478a;
    background-color: #3e8bff33;
    color: #05478a;
  }

  &.warning {
    border-color: #e87f00;
    background-color: #ff8c0033;
    color: #e87f00;
  }

  &.secondary {
    border-color: #495057;
    background-color: #dee2e6;
    color: #495057;
  }
`;
