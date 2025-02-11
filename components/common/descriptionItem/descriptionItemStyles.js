import styled from "styled-components";

export const DescriptionItemStyles = styled.div`
  border-radius: 16px;
  border: 1px solid #e0e0e0;
  margin-top: 16px;
  padding: 16px;
  display: grid;
  grid-template-columns: 120px repeat(4, 20%);
  gap: 8px;

  @media screen and (min-width: 1400px) {
    grid-template-columns: 200px repeat(4, 15%);
  }

  small {
    color: #9898a0;
  }

  strong {
    color: #000000;
  }

  .text {
    font-weight: 400;
    font-size: 16px;
  }

  .success-state {
    color: #2a8100;
  }

  .error-state {
    color: #c30000;
  }

  .pic {
    grid-row: span 3;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
