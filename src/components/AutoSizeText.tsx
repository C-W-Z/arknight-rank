import { useCallback, useEffect, useRef, useState } from "react";
import './AutoSizeText.css'
// import mergeRefs from "../utils/MergeRefs";

interface Props {
    maxSize?: string;
    className?: string;
    children?: any;
}

function AutoSizeText({ maxSize = '1em', className = '', children = undefined }: Props) {

    const [fontSize, setFontSize] = useState<string>(maxSize);
    const nameRef = useRef<HTMLDivElement>(null);
    const [w, setW] = useState<number>(0);
    const [h, setH] = useState<number>(0);

    const textContainerRef = useCallback((node: HTMLDivElement | null) => {
        if (node !== null) {
            setW(parseFloat(getComputedStyle(node).width));
            setH(parseFloat(getComputedStyle(node).height));
        }
    }, []);

    // const nameCallbackRef = useCallback((node: HTMLDivElement | null) => {
    //     if (w == 0)
    //         return;
    //     if (node !== null) {
    //         setTimeout(() => {
    //             const style = getComputedStyle(node);
    //             let fs = parseFloat(style.fontSize);
    //             const width = parseFloat(style.width);
    //             if (width > w) {
    //                 setFontSize((fs * w / width) + 'px');
    //             }
    //             console.log(w, width, fs, (fs * w / width));
    //         }, 50);
    //     }
    // }, [w]);

    useEffect(() => {
        if (!nameRef.current || w == 0 || h == 0)
            return;
        const style = getComputedStyle(nameRef.current);
        let fs = parseFloat(style.fontSize);
        const width = parseFloat(style.width);
        const height = parseFloat(style.height);
        if (width > w) {
            setFontSize((fs * w / width) + 'px');
        } else if (height < h - 1 && width < w - 1) {
            setFontSize((fs + 1) + 'px');
        }
        // console.log(w, width, h, height, fs, (fs * w / width));
    });

    return (
        <div className={"auto-size-text-container " + className} ref={textContainerRef}>
            <div className="auto-size-text"
                // ref={mergeRefs(nameRef, nameCallbackRef)}
                ref={nameRef}
                style={{ fontSize: fontSize }}>
                {children}
            </div>
        </div>
    )
}

export default AutoSizeText;