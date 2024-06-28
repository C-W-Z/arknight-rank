import { useState } from "react";
import './DraggableBackground.css'

export interface Props {
    backgroundImage?: string;
    className?: string;
    children?: any;
}

function DraggableBackground({ backgroundImage, className = "", children = undefined }: Props) {

    const [imageHeight, setImageHeight] = useState(100);
    const [imagePosX, setImagePosX] = useState(0);
    const [imagePosY, setImagePosY] = useState(0);

    // const [dragging, setdragging] = useState(true);

    const class_name = (true ? 'drag-bg dragging ' : 'drag-bg ') + className;

    return (
        <div className={class_name} style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: `auto ${imageHeight}%`,
            backgroundPositionX: `calc(50% + ${imagePosX}vw)`,
            backgroundPositionY: `calc(50% - ${imagePosY}vh)`,
        }}>
            <div className="setting">
                <div className="sliders">
                    <div className="slider-box">
                        <div className="slider-title">H</div>
                        <input className="slider" type="range"
                            min="50" max="300" value={imageHeight}
                            onChange={(e) => setImageHeight(parseInt(e.target.value))}
                        ></input>
                        <div className="slider-value">{imageHeight}</div>
                    </div>
                    <div className="slider-box">
                        <div className="slider-title">X</div>
                        <input className="slider" type="range"
                            min="-100" max="100" value={imagePosX}
                            onChange={(e) => setImagePosX(parseInt(e.target.value))}
                        ></input>
                        <div className="slider-value">{imagePosX}</div>
                    </div>
                    <div className="slider-box">
                        <div className="slider-title">Y</div>
                        <input className="slider" type="range"
                            min="-100" max="100" value={imagePosY}
                            onChange={(e) => setImagePosY(parseInt(e.target.value))}
                        ></input>
                        <div className="slider-value">{imagePosY}</div>
                    </div>

                </div>
            </div>
            {children}
        </div>
    )
}

export default DraggableBackground;