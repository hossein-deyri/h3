import styled from "styled-components";

export const SearchModalStyle = styled.div`
position:relative;
.searchModal{
    display:${props => props.show ? "block" :"none"};
    width:100%;
    min-height:50px;
    position:absolute;
    z-index:1000;
    top:98%;
    right:0;
    background:#fdfdfd;
    /* box-shadow:2px 2px 5px #c8c8c8; */
    border-radius: 0 0 10px 10px;
    max-height:150px;
    overflow-y:scroll;
    

    input{
        width:80%;
    }

    .productHolder{
        cursor:pointer;
        border:1px solid #c8c8c8;
        padding:15px;
        transition:0.3s;
        font-size:1rem;
        :hover{
            box-shadow:0 0 10px #c8c8c8 inset;
        }
        span{
            margin-left:30px;
        }
    }

    .placeHolder{
        display:block;
        text-align:center;
        margin:15px;
        color:#8d8a8a;
        font-size:16px;
        user-select: none;
    }
}


.confirmBtn{
    background:#22df6e;
    color:white;
    display:flex;
    align-items: center;
    justify-content: center;
    border:none;
    border-radius:5px;
    svg{
        width:35px;
        height:35px;
    }
}
    
`;