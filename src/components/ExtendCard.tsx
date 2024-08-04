import React, { RefObject, useCallback, useRef, useState } from "react";
import './ExtendCard.css'
import { VScrollRef } from './DraggableScroll';

interface Props {
    className?: string;
    sliderRef: RefObject<HTMLDivElement>;
    sliderFuncRef: RefObject<VScrollRef>;
    title?: any;
    infoContent?: any;
    detailContent?: any;
    trainsition?: number;
}

function ExtendCard({
    className = "",
    sliderRef,
    sliderFuncRef,
    title = undefined,
    infoContent = undefined,
    detailContent = undefined,
    trainsition = 200
}: Props) {

    const [close, setClose] = useState(true);
    const card = useRef<HTMLDivElement>(null);
    // const [infoRef, closeH] = useCustom();
    // const [detailRef, extendH] = useCustom();

    const [closeH, setCloseH] = useState(0);
    const [extendH, setExtendH] = useState(0);

    const handleResize = (entries: ResizeObserverEntry[]) => {
        for (let entry of entries) {
            if (entry.target.classList.contains('card-info') && closeH != entry.contentRect.height)
                setCloseH(entry.contentRect.height);
            else if (entry.target.classList.contains('card-detail') && extendH != entry.contentRect.height)
                setExtendH(entry.contentRect.height);
        }
    };

    const observer = new ResizeObserver(handleResize);

    const infoRef = useCallback((node: HTMLDivElement | null) => {
        // console.log("infoRef", node);
        if (node !== null) {
            observer.observe(node);
            setCloseH(node.clientHeight);
        }
    }, []);
    const detailRef = useCallback((node: HTMLDivElement | null) => {
        // console.log("detailRef", node);
        if (node !== null) {
            observer.observe(node);
            setExtendH(node.clientHeight);
        }
    }, []);

    function openCard() {
        if (!close) return;
        setClose(false);
        // e.stopPropagation();

        if (!sliderRef.current || !card.current || !sliderFuncRef.current)
            return;

        const slderChild = sliderFuncRef.current.child();
        const childHeight = slderChild ? slderChild.clientHeight : 0;

        const rect = card.current.getBoundingClientRect();
        const style = window.getComputedStyle(card.current);
        // const marginTop = parseInt(style.marginTop);
        const marginBottom = parseInt(style.marginBottom);
        // console.log(rect.top, sliderRef.current.clientTop, rect.bottom + extendH - closeH, sliderRef.current.clientHeight)

        if (childHeight + extendH - closeH >= sliderRef.current.clientHeight &&
            rect.bottom + marginBottom + extendH - closeH > sliderRef.current.clientHeight) {
            sliderRef.current.scrollBy({
                behavior: "smooth",
                top: rect.bottom + marginBottom + extendH - closeH - sliderRef.current.clientHeight,
            });
        } else if (childHeight >= sliderRef.current.clientHeight) {
            if (extendH + marginBottom <= sliderRef.current.clientHeight) {
                if (rect.top < sliderRef.current.clientTop) {
                    card.current.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                        inline: "nearest",
                    });
                } // else do nothing
            } else {
                card.current.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                    inline: "nearest",
                });
            }
        } else {
            sliderRef.current.scrollBy({
                behavior: "smooth",
                top: (extendH - closeH) / 2,
            });
        }

        setTimeout(() => {
            sliderFuncRef.current?.Align();
        }, trainsition);
    }

    function closeCard() {
        if (close) return;
        setClose(true);
        // e.stopPropagation();

        if (!sliderRef.current || !sliderFuncRef.current)
            return;

        const slderChild = sliderFuncRef.current.child();
        const childHeight = slderChild ? slderChild.clientHeight : 0;

        if (childHeight + closeH - extendH <= sliderRef.current.clientHeight) {
            // console.log("A");
            const topAlign = sliderFuncRef.current.placeHeight() - (sliderRef.current.clientHeight - (childHeight + closeH - extendH)) / 2;
            // sliderRef.current.scrollBy({
            //     behavior: "smooth",
            //     top: (closeH - extendH) / 2,
            // });
            sliderRef.current.scrollTo({
                behavior: "smooth",
                top: topAlign,
            });
        } else if (slderChild) {
            const rect = slderChild.getBoundingClientRect();
            if (rect.bottom + closeH - extendH < sliderRef.current.clientHeight) {
                // console.log("B");

                sliderRef.current.scrollBy({
                    behavior: "smooth",
                    top: rect.bottom + closeH - extendH - sliderRef.current.clientHeight,
                });
            }
        }

        setTimeout(() => {
            sliderFuncRef.current?.Align();
        }, trainsition);
    }

    let moving = false;

    function onMouseDown() {
        moving = false;
    }

    function onMouseMove() {
        moving = true;
    }

    function infoOnMouseUp(e: React.MouseEvent) {
        if (moving)
            return;
        e.stopPropagation();
        sliderFuncRef.current?.setMouseDown(false);
        openCard();
    }

    function detailOnMouseUp(e: React.MouseEvent) {
        if (moving)
            return;
        e.stopPropagation();
        sliderFuncRef.current?.setMouseDown(false);
        closeCard();
    }

    const class_name = (close ? 'extend-card close ' : 'extend-card ') + className;

    return (
        <div className={class_name} ref={card}
            style={{
                "--close-h": closeH + 'px',
                "--extend-h": extendH + 'px',
                "--trainsition": trainsition + 'ms'
            } as React.CSSProperties}
        >
            <div className='card-info' ref={infoRef}
                onMouseDown={onMouseDown} onMouseMove={onMouseMove} onMouseUp={infoOnMouseUp}
            >
                <div className="card-title">
                    {title}
                </div>
                <hr className="hr-1" />
                <hr className="hr-2" />
                <div className="card-content">
                    {infoContent}
                </div>
            </div>

            <div className='card-detail' ref={detailRef}
                onMouseDown={onMouseDown} onMouseMove={onMouseMove} onMouseUp={infoOnMouseUp}
            >
                <button className="card-title" onMouseUp={detailOnMouseUp}>
                    {title}
                </button>
                <div className='card-content'>
                    {detailContent}
                </div>
            </div>
        </div>
    )
}

export default ExtendCard;