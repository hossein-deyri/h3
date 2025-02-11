import React, { useState } from 'react'
import { TextareaStyle } from "./TextareaStyle"
import { Field, ErrorMessage } from "formik";


const Index = ({ value, placeholder, name, className, counter, setFieldValue, error, rows, ...props }) => {

    const [counterState, setCounterState] = useState(0)

    const changeHandler = (e) => {
        if (props.itemName) {
            props.onChange(e.target.value, props.itemName)
        } else {
            setFieldValue(name, e.target.value)
        }
        setCounterState(e.target.value.length)
    }

    return (
        <TextareaStyle>
            <div className="has-validation">


                {props.itemName ? (
                    <textarea
                        className={"form-control"}
                        rows={rows}
                        name={name}
                        value={value}
                        placeholder={placeholder}
                        onChange={changeHandler}
                    />
                ) : (
                    <>
                        <Field
                            component="textarea"
                            className={className}
                            rows={rows}
                            name={name}
                            value={value}
                            placeholder={placeholder}
                            onChange={changeHandler}
                        />
                        <ErrorMessage className='redText' component="div" name={name} />
                    </>
                )}
            </div>

            <div className={` counter ${error ? "redTxt" : "greyText"}`}>
                {counter} / {value?.length ? value.length : counterState}
            </div>
        </TextareaStyle >
    )
}

export default Index
