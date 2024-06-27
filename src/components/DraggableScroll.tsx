import { Ref, forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import './DraggableScroll.css'
import mergeRefs from "../utils/MergeRefs";

export type VScrollRef = {
    Align: (childH_add?: number) => void,
    setMouseDown: (value: React.SetStateAction<boolean>) => void,
    child: () => HTMLDivElement | null;
    placeHeight: () => number;
}

export interface Props {
    className?: string;
    children?: any;
    _ref?: Ref<HTMLDivElement>;
}

const VerticalScroll = forwardRef<VScrollRef, Props>(({ className = "", children = undefined, _ref }: Props, ref) => {

    const slider = useRef<HTMLDivElement>(null);
    const child = useRef<HTMLDivElement>(null);
    const placeholder = useRef<HTMLDivElement>(null);
    const [mouseDown, setMouseDown] = useState(false);
    const [startY, setStartY] = useState(0);
    const [scrollTop, setScrollTop] = useState(0);

    const startDragging = (e: React.MouseEvent<HTMLElement>) => {
        if (slider.current == null)
            return;
        setMouseDown(true);
        setStartY(e.pageY - slider.current.offsetTop);
        setScrollTop(slider.current.scrollTop);
    }

    const Align = (childH_add: number = 0) => {
        if (slider.current == null || placeholder.current == null || child.current == null)
            return;

        // const childH = Number(window.getComputedStyle(child.current).height.replace(/px$/, ''));
        // const placeH = Number(window.getComputedStyle(placeholder.current).height.replace(/px$/, ''));
        const childH = child.current.clientHeight + childH_add;
        const placeH = placeholder.current.clientHeight;

        const scrollTop = Math.floor(slider.current.scrollTop);

        // console.log(placeH, childH, slider.current.clientHeight, scrollTop);

        let topAlign = placeH + 1;
        let bottomAlign = slider.current.scrollHeight - slider.current.clientHeight - placeH - 1;

        if (childH <= slider.current.clientHeight + childH_add) {
            // console.log(slider.current.clientHeight, childH);
            topAlign = bottomAlign = placeH - (slider.current.clientHeight - childH) / 2;
            if (topAlign == scrollTop)
                return;
        }

        if (scrollTop <= placeH) {
            // console.log("You Reach Top");
            slider.current.scrollTo({
                top: topAlign,
                behavior: 'smooth'
            });
        } else if (slider.current.scrollHeight - scrollTop - placeH <= slider.current.clientHeight + childH_add) {
            // console.log("You Reach Bottom");
            slider.current.scrollTo({
                top: bottomAlign,
                behavior: 'smooth'
            });
        }
    }

    useImperativeHandle(ref, () => ({
        Align,
        setMouseDown,
        child() {
            return child.current;
        },
        placeHeight() {
            if (placeholder.current)
                return placeholder.current.clientHeight;
            return 0;
        }
    }));

    const stopDragging = () => {
        if (!mouseDown)
            return;
        setMouseDown(false);
        Align();
    }

    const move = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        if (slider.current == null)
            return;
        if (!mouseDown) { return; }
        const y = e.pageY - slider.current.offsetTop;
        const scroll = y - startY;
        slider.current.scrollTop = scrollTop - scroll;
    }

    /* On mounted (run only once) */
    useEffect(() => {
        // Align();
        /* Disable Mouse Wheel */
        slider.current?.addEventListener("wheel", (e) => {
            e.preventDefault()
        }, { passive: false })
        setTimeout(Align, 250);
    }, []);

    /* On window resize */
    useEffect(() => {
        const handleResize = () => {
            // console.log("Resize");
            /* Disable Mouse Wheel */
            slider.current?.addEventListener("wheel", (e) => {
                e.preventDefault()
            }, { passive: false })
            Align();
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div ref={mergeRefs(_ref, slider)} className={"vertical-scroll " + className}
            onMouseMove={move} onMouseDown={startDragging}
            onMouseUp={stopDragging} onMouseLeave={stopDragging}
        >
            <div ref={placeholder} className='placeholder'></div>
            <div ref={child} className="vertical-scroll-child">
                {children}
            </div>
            <div className='placeholder'></div>
        </div>
    );
});

export default VerticalScroll;