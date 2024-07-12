import { forwardRef, useImperativeHandle, useState } from "react";
import './DraggableBackground.css'
import TopButtons from "./TopButtons";

export type DragBGRef = {
    openSetting: () => void;
    closeSetting: () => void;
}

export interface Props {
    backgroundImage?: string;
    className?: string;
    children?: any;
    h?: number;
    setH?: React.Dispatch<React.SetStateAction<number>>;
    x?: number;
    setX?: React.Dispatch<React.SetStateAction<number>>;
    y?: number;
    setY?: React.Dispatch<React.SetStateAction<number>>;
    closeFunc?: () => void;
}

interface SliderProps {
    title: string;
    min: number;
    max: number;
    value: number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function Slider({ title, min, max, value, onChange }: SliderProps) {
    return (
        <div className="slider-box">
            <div className="slider-title">{title}</div>
            <input className="slider" type="range"
                min={min} max={max} value={value}
                onChange={onChange}
            ></input>
            <div className="slider-value">{value}</div>
        </div>
    )
}

const DraggableBackground = forwardRef<DragBGRef, Props>(({
    backgroundImage,
    className = "",
    children = undefined,
    h = 100,
    setH = undefined,
    x = 0,
    setX = undefined,
    y = 0,
    setY = undefined,
    closeFunc = undefined
}: Props, ref) => {

    function init() {
        let states = [];
        let setStates = [];
        if (setH === undefined) {
            const [imageHeight, setImageHeight] = useState(h);
            states.push(imageHeight);
            setStates.push(setImageHeight);
        } else {
            states.push(h);
            setStates.push(setH)
        }
        if (setX === undefined) {
            const [imagePosX, setImagePosX] = useState(x);
            states.push(imagePosX);
            setStates.push(setImagePosX);
        } else {
            states.push(x);
            setStates.push(setX);
        }
        if (setY === undefined) {
            const [imagePosY, setImagePosY] = useState(y);
            states.push(imagePosY);
            setStates.push(setImagePosY);
        } else {
            states.push(y);
            setStates.push(setY);
        }
        return { states, setStates };
    }

    const { states, setStates } = init();
    const [imageHeight, imagePosX, imagePosY] = states;
    const [setImageHeight, setImagePosX, setImagePosY] = setStates;

    const [dragging, setDragging] = useState(false);

    function openSetting() {
        setDragging(true);
    }

    function closeSetting() {
        setDragging(false);
        if (closeFunc !== undefined)
            closeFunc();
    }

    useImperativeHandle(ref, () => ({
        openSetting,
        closeSetting,
    }));

    const class_name = (dragging ? 'drag-bg dragging ' : 'drag-bg ') + className;

    return (
        <div className={class_name + ' skin ' + backgroundImage} style={{
            // backgroundImage: `url(${backgroundImage})`,
            backgroundSize: `auto ${imageHeight}%`,
            backgroundPositionX: `calc(50% + ${imagePosX}vw)`,
            backgroundPositionY: `calc(50% - ${imagePosY}vh)`,
        }}>
            <div className="setting">
                <TopButtons backOnClick={closeSetting}></TopButtons>

                <div className="sliders">
                    <Slider title="H" min={50} max={300} value={imageHeight}
                        onChange={(e) => setImageHeight(parseInt(e.target.value))}
                    ></Slider>
                    <Slider title="X" min={-100} max={100} value={imagePosX}
                        onChange={(e) => setImagePosX(parseInt(e.target.value))}
                    ></Slider>
                    <Slider title="Y" min={-100} max={100} value={imagePosY}
                        onChange={(e) => setImagePosY(parseInt(e.target.value))}
                    ></Slider>
                </div>
            </div>
            {children}
        </div>
    )
});

export default DraggableBackground;