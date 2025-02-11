import styled from "styled-components"

export const ChannelContentStyle = styled.div`
background-color:#fff;
border-radius: 10px;
padding:25px;
margin-top: 15px;
.inputsHolder{
    span{
        font-size:14px;
        color:#111;
        display:block;
        margin-bottom:20px;
    }
    .form-control{
        border:1px solid #46647d;
        background:#f3f5f8;
        &::placeholder{
            font-size:14px;
            color:#919baa;
        }
    }
}

.submitBtn{
    display:flex;
    align-items:center;
    margin-top:20px;
    margin-right:auto;
    svg{
        width:22px;
        height:22px;
        margin-left:10px;
    }
}

.uploadField{
    height:170px;
    width:300px;
    background:#f3f5f8;
    border:1px dashed #46647d;
    border-radius:10px;
    span{
        color:#46647d;
        font-size:12px;
    }
    img{
        box-shadow: 0 0 20px 0 rgba(70, 100, 125, 0.1);
        width:52px;
        height:52px;
        border-radius:10px;
    }
}

`;

