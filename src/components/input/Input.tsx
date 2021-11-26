import React from 'react'

interface InputProps {
    name: string
    fieldName: string
    value?: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    type?: string
    disabled?: boolean
    alert?: string
}

export function Input(props: InputProps) {
    return (
        <div className='flex flex-col'>
            <label htmlFor={props.name}>{props.fieldName}</label>
            <input
                type={props.type ? props.type : 'text'}
                className='mt-1 bg-gray-200 h-8 rounded-sm border-2 border-gray-500 px-2'
                onChange={props.onChange}
                name={props.name}
                value={props.value}
                disabled={props.disabled || false}
            />
        </div>
    )
}
