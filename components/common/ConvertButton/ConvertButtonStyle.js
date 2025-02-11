import styled from "styled-components";

export const ConvertButtonStyle = styled.div`
    &:not(:last-child) {
    margin-bottom: 5px;
    }
    >button {
    border: none;
    min-width: 120px;
    height:40px;
    position: relative;
    overflow: hidden;
    outline: none;
    color: white;
    padding: 8px 15px;
    border-radius: 5px;
    background: ${(props) => props.btnState === "ready" && "#3e8bff"};
    background: ${(props) => props.btnState === "progress" && "#c8c8c8"};
    background: ${(props) => props.btnState === "inQueue" && "#919baa"};
    background: ${(props) => props.btnState === "done" && "#22df6e"};
        pointer-events: ${props => props.btnState==='done'  || props.btnState==='progress'  || props.btnState==="inQueue" ? "none" : ""};
        span{
            z-index:55;
            position:absolute;
            display:block;
            top:50%;
            left:50%;
            transform:translate(-50%, -50%);
            white-space: nowrap;

            >div{
                vertical-align: -5px;
                margin-left: 5px;
            }
        }
    }
    .progressBar {
    height: 100%;
    width: 10%;
    position: absolute;
    top: 0;
    left: 0;
    background: #3e8bff;
    transition:0.3s linear;
    }
    .loading{
        opacity:0.7;
        pointer-events: none;
    }

    .closeHolderBtn{
        border: none;
        outline: none;
        background:transparent;
        color:#dc3545;
        /* width:5px;
        height:5px; */
        margin-right: 10px;
        border:1px solid red;
        opacity:0.9;
        border-radius:50%;
        svg{
            width:20px;
            height:20px;
        }
    }
`;
