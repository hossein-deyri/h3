import styled from "styled-components";

export const SubtitleSoundUploaderStyles = styled.div`
  border-radius: 10px;

  .file-wrapper {
    width: 90%;
    font-size: 12px;
    margin: auto;
    padding: 16px 0;
  }

  .upload-btn {
    font-size: 12px;
  }

  .upload-content {
    direction: ltr;
    display: flex;
    margin: auto;
  }

  .file-items {
    display: flex;
    flex-direction: column;

    .file-item {
      display: flex;
      margin-top: 5px;

      .radio-item {
        display: flex;
        width: 20%;

        label {
          display: flex;
          align-items: center;
        }
      }

      .file-address {
        color: #fff;
        direction: ltr;
        width: 77%;
      }

      .delete-file {
        width: 3%;
      }
    }
  }

  .p-progress-spinner {
    width: 20px;
    height: fit-content;

    .p-progress-spinner-circle {
      animation: unset;
    }
  }
`;
