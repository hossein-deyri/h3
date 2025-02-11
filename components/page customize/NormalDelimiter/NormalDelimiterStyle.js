import styled from "styled-components"

export const NormalDelimiterStyle = styled.div`
background-color: white;
padding:10px;
border-bottom: 1px solid #919baa;
.previewHolder{
    position:relative;
}
.imgHolder{
    padding: 5px;
}

img{
    width:100%;
    height:180px;
    object-fit:cover;
    border-radius:10px;
}
>div{
    padding:10px;
    .uploadHolder{
        width:50%;
        .uploadField{
            height:250px;
            width:90%;
            img{
                width:auto;
                height:55px;
            }
        }
        input{
            width:90%;
        }
    }
}
`;