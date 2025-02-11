import styled from "styled-components"

export const CarouselItemStyle=styled.div`
margin: 30px 0;
background:white;
/* border:1px solid #e6ebf0; */
border-bottom:1px solid #919baa;
padding:20px 0;
position:relative;
/* 
.slick-slider{
    height:100%;
}
.slick-slide{
    height:230px;
}
.sliderHolder{
    height:300px;
} */

h2{
    font-size:18px;
    margin-top:20px;
    color:#111;
}
.creationHolder{
    margin:10px;
    padding:10px;
    /* border: 1px solid red; */
    display:flex; 
    flex-direction: column;
    align-items: center;
    /* background:rgb(245, 245, 245); */
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
}



.slick-dots{
    button:before{
        font-size:40px;
    }
}

.description-color{
    padding:5px 0 ;
}

.slick-dots li.slick-active button:before{
    color:#e21221;
}


.notFound{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items:center;
    img{
        width:260px;
        height:200px;
        margin-bottom:3px;
        filter:grayScale(1);
    }
    span{
        font-size:14px;
        color:#a0a0a0;
    }
}
.sliderArrow{
    width:20px;
    height:20px;
    background-color:rgba(17,17,17,0.5);
    display:flex;
    align-items:center;
    justify-content:center;
}
.slick-list{
    display:flex;
}
.slick-track{
    margin-right: unset !important;
}

`;



export const ProductHolder= styled.div`
    /* height:250px;
    width:150px !important; */
    /* padding: 15px; */
    width:80%;
    >div{
        position: relative;
        cursor:pointer;
        :hover .hoverElement{
        opacity:1;
        visibility:visible;
    }
    }
    img{
        width:100%;
        height:100%;
        object-fit:contain;
        border-radius:5px;
    }
    .hoverElement{
        width:100%;
        height:100%;
        font-size: 14px;
        background:rgba(0,0,0,0.5);
        position:absolute;
        top:0;
        left:0;
        transition: 0.3s;
        opacity:0;
        visibility: hidden;
        color:white;
        text-align: right;
        direction:rtl;
        border-radius: 5px;

        span{
            font-size:16px;
            display: inline-block;
            margin:15px;
        }
        p{
            margin:15px;
            direction:rtl;
        }   
    }
   
`;
