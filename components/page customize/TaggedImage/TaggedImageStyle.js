import styled from "styled-components"

export const TaggedImageStyle=styled.div`
.creationHolder{
    margin:10px;
    padding:10px;
    /* border: 1px solid red; */
    display:flex; 
    flex-direction: column;
    align-items: center;
    /* background:rgb(245, 245, 245); */
    .disabled{
        opacity:0.45;
        pointer-events: none;
    }
    
    .field-radiobutton{
        display:flex;
        align-items:center;
        label{
            padding: 0 1rem;
            cursor:pointer;
        }
    }
    >div{
        display:flex;
        align-items: center;
        justify-content:start;
        width:100%;
    }
    >div>div{
        display:flex;
        align-items: center;
        /* width:100%; */
        margin-bottom: 15px;
        span{
            display: block;
            font-size: 14px;
            white-space: nowrap;
            margin-left: 10px;
        }
    }
    input{
        background-color: #f3f5f8;
        ::placeholder{
            color:#919baa;
            font-size: 14px;
        }
    }
    /* .titleHolder{
        input{
            width:50%;
        }
    } */
    .uploadField{
        width:100%;
        height:200px;
        img{
            border-radius:10px;
        }
    }
}
.menuHolder{
    position:relative;
    width:300px;
    height:250px;
    margin:1rem;
    img{
        width:300px;
        height:250px;
        object-fit: contain;
    }
}
`;