import { useEffect, useRef, useState } from "react";
import { loadImage } from "../utils/LoadResources";
import './Menu.css'
import DraggableBackground, { DragBGRef } from "../components/DraggableBackground";
import { useNavigate } from "react-router-dom";

function Menu() {

    const navigate = useNavigate()

    const [backgroundImage, setBackgroundImage] = useState<string | undefined>(undefined);

    useEffect(() => {
        const loadImg = async () => {
            const src = await loadImage('assets/skin/char_003_kalts_boc_6b.png');
            setBackgroundImage(src);
        };
        loadImg();
    }, []);

    const DragBGFuncRef = useRef<DragBGRef>(null);

    // function openBGSetting() {
    //     DragBGFuncRef.current?.openSetting();
    // }

    return (
        <div className="menu">
            <DraggableBackground className='skin-bg' backgroundImage={backgroundImage} ref={DragBGFuncRef}>
                <button type="button" onClick={() => {
                    navigate('/stat', {
                        state: {
                            name: "凯尔希",
                            name2: "Kal'tsit"
                        }
                    });
                }}
                    style={{ height: '2em', width: '4em', background: "white" }}
                ></button>
            </DraggableBackground>
        </div>
    );
}

export default Menu;