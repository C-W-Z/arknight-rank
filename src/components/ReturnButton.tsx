import { forwardRef, useImperativeHandle, useState } from 'react';
import './ReturnButton.css'

export type ReturnBtnRef = {
    open: () => void;
    close: () => void;
}

export interface Props {
    className?: string;
    children?: any;
    confirmText?: string;
    cancelText?: string;
    confirmClick?: () => void;
    cancelClick?: () => void;
}

const ReturnButton = forwardRef<ReturnBtnRef, Props>(({
    className = "",
    children = undefined,
    confirmText = "",
    cancelText = "取消",
    confirmClick = undefined,
}: Props, ref) => {

    const [hide, setHide] = useState(true);

    function open() {
        setHide(false);
    }
    function close() {
        setHide(true);
    }

    useImperativeHandle(ref, () => ({
        open,
        close,
    }));

    return (
        <div className={(hide ? "return-panel close " : "return-panel ") + className}>
            <div className="return-btn">
                <div className="text">{children}</div>
                <button className='cancel-btn' onClick={close}>{cancelText}</button>
                <button className='confirm-btn' onClick={confirmClick}>{confirmText}</button>
            </div>
        </div>
    )
})

export default ReturnButton;