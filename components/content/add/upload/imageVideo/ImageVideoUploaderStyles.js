import styled from "styled-components";

export const ImageVideoUploaderStyles = styled.div`
  position: relative;
  width: 100%;
  padding-top: ${({ previewHorizontalRatio, previewVerticalRatio }) =>
    ((previewVerticalRatio / previewHorizontalRatio) * 100).toFixed(
      2
    )}%; /* This creates a desired aspect ratio. */
  overflow: hidden;
  background-color: #6d76af22;
  border-radius: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2), 0 1px 3px rgba(0, 0, 0, 0.16);
  transition: all 0.3s;

  :hover {
    .upload-button {
      margin-top: -2rem;
    }
  }

  &.is-button {
    border: 1px dashed #46647d;
    cursor: pointer;
  }

  &.with-file {
    animation: flash-background 2s infinite;

    @keyframes flash-background {
      0% {
        background-color: #f0f0f0;
      }
      50% {
        background-color: #ffc229; /* Flash color */
      }
      100% {
        background-color: #f0f0f0;
      }
    }
  }

  &.has-error {
    border: 1px dashed #e21221;
    background-color: #af6d6d22;
  }

  .spinner-wrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    .spinner-border {
      border-color: #e21221;
      border-bottom-color: transparent;
      width: 3rem;
      height: 3rem;
    }
  }

  .progress {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: 0;
  }

  .upload-button {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 1rem;
    width: 8rem;
    transition: margin 0.5s;
  }

  .deleteButton {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25), 0 1px 2px rgba(0, 0, 0, 0.2);
  }

  .preview-image {
    position: absolute;
    inset: 0;
    object-fit: contain;
    width: 100%;
    height: 100%;
  }
`;
