import React, { useState } from 'react';
import _ from 'lodash';
export default function ActorSelect(props) {
    const {options:allOptions,value} = props;
    const [selected ,setSelected] = useState(value || []);
    const [options,setOptions] = useState(allOptions || []);
    const [listState,setListState] = useState(false);

    const onSelect = (opt)=>{
        const selectedItem = {value:opt.value,label:opt.label,active:false};
        const selectedItems = [...selected];
        selectedItems.push(selectedItem);
        setSelected(selectedItems);
        const opts = options.filter(opt=> opt.value !== selectedItem.value && opt.label !== selectedItem.label);
        setOptions(opts);
    }
    const onRemove =(selectedItem) =>{
        const selectedItems = selected.filter(sel=> sel.value !== selectedItem.value && sel.label !== selectedItem.label)
        setSelected(selectedItems);
        const opts = [...options];
        opts.push(selectedItem);
        const sortedOpts = _.sortBy(opts,[function(o){return o.label }])
        setOptions(sortedOpts);
    };
    const activeSelect =(selectedItem)=>{
        const selectedItems = selected.map(sel=>{
            if(sel.value === selectedItem.value && sel.label === selectedItem.label){
                if(selectedItem.active) return {value:sel.value,label:sel.label,active:false}
                else return {value:sel.value,label:sel.label,active:true}
            }
                
            else return sel;
        })
        setSelected(selectedItems);
    }


    const onChange = (e)=>{
        const filteredOptions = allOptions.filter(opt=> opt.label.includes(e.target.value));
        setOptions(filteredOptions);
    }
    const onBlur  = ()=>{
        setTimeout(()=>{
            setListState(false);
        },300)
    }
    return (
        <div className="form-group position-relative"  >
            <input type="text" className="form-control" onChange={onChange} onFocus={()=>setListState(true)} onBlur={onBlur} />
            <ul className={`list-group position-absolute top-100 start-0 w-100 overflow-auto ${listState ? 'd-block':'d-none'}`} style={{height:'40vh',zIndex:1}} dir="ltr" id="list">
                {options.map(opt=>(
                    <li className="list-group-item list-group-item-action" role="button" value={opt.value} onClick={()=>onSelect(opt)}>{opt.label}</li>
                ))}
            </ul>
            <div className="d-flex flex-wrap mt-2 position-absolute " style={{zIndex:0}}>
                {selected.length > 0 && 
                    selected.map(sel=>(
                        <div className={`d-flex selectedBox bg-light border m-1`}>
                            <div onClick={()=>activeSelect(sel)} role="button" className={`border ${sel.active ? 'bg-info':''}`}>{sel.label}</div>
                            <div className=" border" role="button"  onClick={()=>onRemove(sel)}>x</div>
                        </div>
                    ))                   
                }
            </div>
            
        </div>
    )
}
