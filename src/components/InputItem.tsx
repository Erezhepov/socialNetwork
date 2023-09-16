import React, {useState} from 'react';

interface IInputItem {
    type: string
    placeholder: string
    getValue: (value: string) => void
    required: boolean
}

const InputItem = (props: IInputItem) => {
    const [error, setError] = useState<boolean>(false)
    const [value, setValue] = useState<string>('')
    const changeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        setError(false)
        setValue(e.target.value)
        props.getValue(e.target.value)
    }
    const setChangedValue = (e: React.FocusEvent<HTMLInputElement>) => {
        if (e.target.value.trim().length === 0) {
            setError(true)
        }
        props.getValue(value)
    }

    return (
        <div>
            <input onBlur={setChangedValue} value={value} onChange={changeValue} placeholder={props.placeholder}
                   type={props.type}/>
            {props.required && error && <div className='error-text'>This field must be required</div>}
        </div>
    );
};

export default InputItem;