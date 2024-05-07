
import React from "react"
import { CustomInputStyled } from "./custom-form-styled";

export const CustomInputGroup = ({children,}) => {
    return (
        <CustomInputStyled>
            {children}
        </CustomInputStyled>
    )
}
export const CustomInput = ({ label, value, onChange, type='text' }) => {
    return (
        <CustomInputStyled>
            <label>{label}</label>
            <input value={value} onChange={onChange} type={type}></input>
        </CustomInputStyled>
    )
}


export const CustomSelect = ({ label, value, onChange, options }) => {
    return (
        <CustomInputStyled>
            <label>{label}</label>
            <select value={value} onChange={onChange}>
                {
                    options.map((option, index) => (
                        <option key={index} value={option.value}>{option.label}</option>
                    ))
                }
            </select>
        </CustomInputStyled>
    )
}