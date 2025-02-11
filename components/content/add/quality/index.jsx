import React from 'react'

export default function Quality(props) {
    const {title,active,setActiveQuality} = props;
    return <button className='quality btn rounded fs-12' style={{backgroundColor:active ? '#3e8bff':'#919baa',color:"#fff"}} onClick={setActiveQuality}>{'Quality:'+ title}</button>
}
