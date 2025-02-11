import styled from "styled-components"

export const ActorSectionStyle = styled.div`
margin:20px 0;
padding:20px 0;
border-bottom:1px solid #46647d;


.actorSelector{
    direction:rtl;
    background:#f3f5f8;
    border:1px solid #46647d;
    height: 150px;
    padding:15px;
    margin : 0 15px;
    span{
        display: inline-block;
        margin-bottom:10px;
    }
}
.actorHolder{
        display:flex !important;
        align-items: center;
        justify-content:center;
        flex-direction:column;
        margin: 0 15px ;
        direction:rtl;
        position:relative;
        p{
            text-align:center;
        }
    img{
        width:150px;
        height:150px;
        border-radius:50%;
    }
    .deleteButton{
        position:absolute;
        right: 50%;
        top: 105px;
        transform:translateX(50%)
    }
}
.addHolder{
    width:150px !important;
    height:150px;
    border-radius:50%;
    border:1px solid #46647d;
    outline:none;
    background:#f3f5f8;
    color:#46647d;
    font-size: 16px;
    margin: 0 30px ;
    >div{
        display:flex;
        align-items:center;
        justify-content:center;
        flex-direction:column;
    }
    svg{
        width:30px;
    }
}

.slick-dots{
    button:before{
        font-size:40px;
    }
}


.slick-dots li.slick-active button:before{
    color:#e21221;
}
.slick-list{
    height:252px;
}

`;