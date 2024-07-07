import { Ref, forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import './DraggableScroll.css'
import mergeRefs from "../utils/MergeRefs";

export type VScrollRef = {
    Align: () => void,
    setMouseDown: (value: boolean) => void,
    child: () => HTMLDivElement | null;
    placeHeight: () => number;
}

export type HScrollRef = {
    Align: () => void,
    setMouseDown: (value: boolean) => void,
    child: () => HTMLDivElement | null;
    placeWidth: () => number;
}

export interface Props {
    className?: string;
    children?: any;
    _ref?: Ref<HTMLDivElement>;
    alignDelay?: number;
}

export const VerticalScroll = forwardRef<VScrollRef, Props>(({
    className = "",
    children = undefined,
    alignDelay = 0,
    _ref
}: Props, ref) => {

    const slider = useRef<HTMLDivElement>(null);
    const child = useRef<HTMLDivElement>(null);
    const placeholder = useRef<HTMLDivElement>(null);
    // const [mouseDown, setMouseDown] = useState(false);
    // const [startY, setStartY] = useState(0);
    // const [scrollTop, setScrollTop] = useState(0);
    let mouseDown = false;
    let startY = 0;
    let scrollTop = 0;

    const setMouseDown = (value: boolean) => { mouseDown = value; };
    const setStartY = (value: number) => { startY = value; };
    const setScrollTop = (value: number) => { scrollTop = value };

    const startDragging = (e: React.MouseEvent<HTMLElement>) => {
        if (slider.current == null)
            return;
        setMouseDown(true);
        setStartY(e.pageY - slider.current.offsetTop);
        setScrollTop(slider.current.scrollTop);
    }

    const Align = () => {
        if (slider.current == null || placeholder.current == null || child.current == null)
            return;

        // const childH = Number(window.getComputedStyle(child.current).height.replace(/px$/, ''));
        // const placeH = Number(window.getComputedStyle(placeholder.current).height.replace(/px$/, ''));
        const childH = child.current.clientHeight;
        const placeH = placeholder.current.clientHeight;

        const scrollTop = Math.floor(slider.current.scrollTop);

        // console.log(placeH, childH, slider.current.clientHeight, scrollTop);

        let topAlign = placeH + 1;
        let bottomAlign = slider.current.scrollHeight - slider.current.clientHeight - placeH - 1;

        if (childH <= slider.current.clientHeight) {
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
        } else if (slider.current.scrollHeight - scrollTop - placeH <= slider.current.clientHeight) {
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
        /* Disable Mouse Wheel */
        const handleWheel = (e: WheelEvent) => {
            e.preventDefault();
        };
        slider.current?.addEventListener("wheel", handleWheel, { passive: false });

        setTimeout(Align, alignDelay);

        /* On window resize */
        const handleResize = () => {
            Align();
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            slider.current?.removeEventListener('wheel', handleWheel);
        };
    }, []);

    return (
        <div ref={mergeRefs(_ref, slider)} className={"v-scroll " + className}
            onMouseMove={move} onMouseDown={startDragging}
            onMouseUp={stopDragging} onMouseLeave={stopDragging}
        >
            <div ref={placeholder} className='placeholder'></div>
            <div ref={child} className="v-scroll-child">
                {children}
            </div>
            <div className='placeholder'></div>
        </div>
    );
});

export const HorizontalScroll = forwardRef<HScrollRef, Props>(({
    className = "",
    children = undefined,
    alignDelay = 0,
    _ref
}: Props, ref) => {

    const slider = useRef<HTMLDivElement>(null);
    const child = useRef<HTMLDivElement>(null);
    const placeholder = useRef<HTMLDivElement>(null);

    let mouseDown = false;
    let startX = 0;
    let scrollLeft = 0;

    const setMouseDown = (value: boolean) => { mouseDown = value; };
    const setStartX = (value: number) => { startX = value; };
    const setScrollLeft = (value: number) => { scrollLeft = value };

    const startDragging = (e: React.MouseEvent<HTMLElement>) => {
        if (slider.current == null)
            return;
        setMouseDown(true);
        setStartX(e.pageX - slider.current.offsetLeft);
        setScrollLeft(slider.current.scrollLeft);
    }

    const Align = () => {
        if (slider.current == null || placeholder.current == null || child.current == null)
            return;

        const childW = child.current.clientWidth;
        const placeW = placeholder.current.clientWidth;
        const scrollLeft = Math.floor(slider.current.scrollLeft);

        let leftAlign = placeW + 1;
        let rightAlign = slider.current.scrollWidth - slider.current.clientWidth - placeW - 1;

        if (childW <= slider.current.clientWidth) {
            leftAlign = rightAlign = placeW - (slider.current.clientWidth - childW) / 2;
            if (leftAlign == scrollLeft)
                return;
        }

        if (scrollLeft <= placeW) {
            // console.log("You Reach Top");
            slider.current.scrollTo({
                left: leftAlign,
                behavior: 'smooth'
            });
        } else if (slider.current.scrollWidth - scrollLeft - placeW <= slider.current.clientWidth) {
            // console.log("You Reach Bottom");
            slider.current.scrollTo({
                left: rightAlign,
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
        placeWidth() {
            if (placeholder.current)
                return placeholder.current.clientWidth;
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
        const x = e.pageX - slider.current.offsetLeft;
        const scroll = x - startX;
        slider.current.scrollLeft = scrollLeft - scroll;
    }

    /* On mounted (run only once) */
    useEffect(() => {
        /* Disable Mouse Wheel */
        const handleWheel = (e: WheelEvent) => {
            e.preventDefault();
        };
        slider.current?.addEventListener("wheel", handleWheel, { passive: false });

        setTimeout(Align, alignDelay);

        /* On window resize */
        const handleResize = () => {
            Align();
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            slider.current?.removeEventListener('wheel', handleWheel);
        };
    }, []);

    return (
        <div ref={mergeRefs(_ref, slider)} className={"h-scroll " + className}
            onMouseMove={move} onMouseDown={startDragging}
            onMouseUp={stopDragging} onMouseLeave={stopDragging}
        >
            <div ref={placeholder} className='placeholder'></div>
            <div ref={child} className="h-scroll-child">
                {children}
            </div>
            <div className='placeholder'></div>
        </div>
    );
});
