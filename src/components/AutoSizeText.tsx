import { useCallback, useState } from "react";
import './AutoSizeText.css'

export interface Props {
    maxSize?: string;
    className?: string;
    children?: any;
}

function AutoSizeText({maxSize = '1em', className = '', children = undefined}: Props) {

    const [fontSize, setFontSize] = useState<string>(maxSize);
    const [w, setW] = useState<number>(0);

    const textContainerRef = useCallback((node: HTMLDivElement | null) => {
        if (node !== null) {
            setW(parseFloat(getComputedStyle(node).width));
        }
    }, []);

    const nameRef = useCallback((node: HTMLDivElement | null) => {
        if (w === 0)
            return;
        if (node !== null) {
            const style = getComputedStyle(node);
            let fs = parseFloat(style.fontSize);
            const width = parseFloat(style.width);
            // console.log(w, fs, style.width);
            if (width > w) {
                fs *= w / width;
                setFontSize(fs + 'px');
            }
        }
    }, [w, fontSize]);

    return (
        <div className={"auto-size-text-container " + className} ref={textContainerRef}>
            <div className="auto-size-text" ref={nameRef} style={{ fontSize: fontSize }}>{children}</div>
        </div>
    )
}

export default AutoSizeText;