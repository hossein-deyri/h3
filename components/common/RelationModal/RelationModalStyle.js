import styled from "styled-components"


export const RelationModalStyle = styled.div`
width:100%;
height:100%;
position: absolute;
z-index:20;

.modalContent{
    width:84%;
    height:30%;
    background:red;
    z-index:99999;
    position:absolute;
    display:block;
    top:20%;
    left: 50%;
    transform:translateX(-50%);
    border-radius:5px;
    background:white;
    overflow-y:initial !important;
}

.closeHolder{
    position:absolute;
    cursor:pointer;
    top:5px;
    right:5px;
    color:red;
    width:35px; 
    height:35px;

}
.blackShadow {
    width: 100%;
    height: 100%;
    background:black;
    opacity:0.6;
}

`;