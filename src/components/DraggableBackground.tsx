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
    x?: number;
    y?: number;
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
    x = 0,
    y = 0
}: Props, ref) => {

    const [imageHeight, setImageHeight] = useState(h);
    const [imagePosX, setImagePosX] = useState(x);
    const [imagePosY, setImagePosY] = useState(y);

    const [dragging, setDragging] = useState(false);

    useImperativeHandle(ref, () => ({
        openSetting() {
            setDragging(true);
        },
        closeSetting() {
            setDragging(false);
        }
    }));

    const class_name = (dragging ? 'drag-bg dragging ' : 'drag-bg ') + className;

    return (
        <div className={class_name} style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: `auto ${imageHeight}%`,
            backgroundPositionX: `calc(50% + ${imagePosX}vw)`,
            backgroundPositionY: `calc(50% - ${imagePosY}vh)`,
        }}>
            <div className="setting">
                <TopButtons backOnClick={() => setDragging(false)}></TopButtons>

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