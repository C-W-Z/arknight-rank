import { useEffect, useRef, useState } from "react";
import { loadImage } from "../utils/LoadResources";
import './Menu.css'
import DraggableBackground, { DragBGRef } from "../components/DraggableBackground";
import { useNavigate } from "react-router-dom";
import { invoke } from '@tauri-apps/api/tauri'

function ClockText() {
    const [time, setTime] = useState(() => new Date().toLocaleString())

    useEffect(() => {

        const intervalID = setInterval(() => {

            const dateObject = new Date()
            const year = dateObject.getFullYear();
            const month = dateObject.getMonth().toString().padStart(2, '0');
            const date = dateObject.getDate().toString().padStart(2, '0');;
            const hour = dateObject.getHours().toString().padStart(2, '0');;
            const minute = dateObject.getMinutes().toString().padStart(2, '0');;
            const second = dateObject.getSeconds().toString().padStart(2, '0');;
            setTime(`${year}/${month}/${date} ${hour}:${minute}:${second}`);

        }, 1000)

        return () => {
            clearInterval(intervalID);
        }

    }, [])

    return <span className="clock">{time}</span>
}

function Menu() {

    const navigate = useNavigate()

    const [backgroundImage, setBackgroundImage] = useState<string | undefined>(undefined);

    useEffect(() => {
        const loadImg = async () => {
            const src = await loadImage('assets/skin/char_003_kalts_1b.png');
            setBackgroundImage(src);
        };
        loadImg();

        invoke('get_char')
        .then((v) => console.log(v))
        .catch((e) => console.error(e));

    }, []);

    const DragBGFuncRef = useRef<DragBGRef>(null);

    // function openBGSetting() {
    //     DragBGFuncRef.current?.openSetting();
    // }

    function nagivateStat() {
        navigate('/stat', {
            state: {
                name: "纯烬艾雅法拉",
                name2: "Eyjafjalla the Hvít Aska"
            }
        });
    }

    return (
        <div className="menu">
            <DraggableBackground className='skin-bg'
                backgroundImage={backgroundImage}
                ref={DragBGFuncRef}
                h={75} x={-20} y={-14}
            >
                <div className="right-area">
                    <div className="right-plate">

                        <div className="top-line">
                            <ClockText></ClockText>
                        </div>

                        <div className="btns btn1s" onClick={nagivateStat}>
                            <button className="battle-btn">
                                <div className="battle-icon"></div>
                                <div className="battle-icon2"></div>
                                <div className="btn-title">终端</div>
                            </button>
                        </div>

                        <div className="btns btn2s">
                            <button className="team-btn">
                                <div className="icon"></div>
                                <div className="btn-title">时装</div>
                            </button>
                            <button className="char-btn">
                                <div className="icon"></div>
                                <div className="btn-title">干员</div>
                            </button>
                            <div className="placeholder"></div>
                        </div>

                        <div className="btns btn3s">
                        </div>

                        <div className="btns btn4s">
                            <button className="task-btn">
                                <div className="icon"></div>
                                <div className="btn-title">任务</div>
                            </button>
                            <button className="infra-btn">
                                <div className="icon"></div>
                                <div className="btn-title">设置</div>
                            </button>
                            <button className="store-btn">
                                <div className="icon"></div>
                                <div className="btn-title">其他</div>
                            </button>
                        </div>

                    </div>
                </div>
            </DraggableBackground>
        </div>
    );
}

export default Menu;