import styled from "styled-components"

export const BigDelimiterStyle = styled.div`
background:white;
padding:20px;
border-bottom:1px solid #919baa;
.backgroundImage{
    height:150px;
}
.imageHolder{
    display:flex;
    gap:10px;
    justify-content: center;
    margin-bottom:20px;
    margin-top:40px;
    // >div{
    //     width:50%;
    //     padding:25px;
    // }
    .smallImages{
        height:150px;
    
    }
    .smallWidth{
        width: 200px;
    }
    .bigWidth {
        width: 500px;
    }
}
`;

export const BigDelimiterPreview = styled.div`
    background: url(${props => props.backgroundImage});
    position: relative;
    >*{
        z-index: 2;
    }
    .darkBtn{
        color:white;
        border-radius:10px;
        background:#111;    
        border:none;
        outline:none;

    }
    h4 {
    font-size: 20px;
    font-weight: bold;
    }
    span {
    font-size: 14px;
    font-weight: 300;
    }
    .imgHolder {
    margin-top: 20px;
    display:flex;
    align-items: center;
    justify-content: space-around;
    }

    ::before {
    content: "";
    position: absolute;
    width: ${props => props.withoutImage ?"100%" :"0" };
    height: 100%;
    top: 0;
    left: 0;
    background: linear-gradient(to right, #111 30%, #e11220);
    opacity: 0.9;
    }
    


    img{
        width: 30%;
        height:180px;
        object-fit:contain;
    }
    button.closePreview{
        border-color: black!important;
        color: black;
        svg{
            filter: drop-shadow(0 0 10px black);
            border:1px solid black;
        }
    }
`;