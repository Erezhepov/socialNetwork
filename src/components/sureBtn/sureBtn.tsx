import Button from '@mui/material/Button';
import React from 'react';
import s from './sureBtn.module.css'

interface ISureBtn {
    do: () => void
    setSureBtn: (isTrue: boolean) => void
    title: string
}

const SureBtn: React.FC<ISureBtn> = (props) => {
    const yesFn = () => {
        props.do()
    }
    const cancelFn = () => props.setSureBtn(false)
    return (
        <div>
            <div>
                <h3>{props.title}</h3>
                <div className={s.btns}>
                    <Button onClick={yesFn} variant={'outlined'}>Yes</Button>
                    <Button onClick={cancelFn} variant={'contained'} >Cancel</Button>
                </div>
            </div>
        </div>
    );
};

export default SureBtn;