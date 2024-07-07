import { useEffect, useRef, useState } from "react";
import { loadImage } from "../utils/LoadResources";
import './Menu.css'
import DraggableBackground, { DragBGRef } from "../components/DraggableBackground";
import { useNavigate } from "react-router-dom";
import useGlobalContext from "../components/GlobalContext";

function ClockText() {
    const [time, setTime] = useState(() => new Date().toLocaleString())

    useEffect(() => {

        const intervalID = setInterval(() => {

            const dateObject = new Date()
            const year = dateObject.getFullYear();
            const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
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

    const globalContext = useGlobalContext();

    const navigate = useNavigate()
    const [assistantImg, setAssistantImg] = useState<string | undefined>(undefined);
    const [assistantH, setAssistantH] = useState<number>(100);
    const [assistantX, setAssistantX] = useState<number>(0);
    const [assistantY, setAssistantY] = useState<number>(0);

    let menu_pref: any;

    useEffect(() => {
        if (globalContext === undefined || globalContext.loading)
            return;

        menu_pref = globalContext.vars.prefs.menu_pref;

        setAssistantH(menu_pref.h);
        setAssistantX(menu_pref.x);
        setAssistantY(menu_pref.y);

        async function loadImg() {
            const src = await loadImage(`assets/skin/${menu_pref.skin_id}.webp`);
            setAssistantImg(src);
        }
        loadImg();

    }, [globalContext?.loading]);

    const DragBGFuncRef = useRef<DragBGRef>(null);

    // function openBGSetting() {
    //     DragBGFuncRef.current?.openSetting();
    // }

    function nagivateCharList() {
        navigate('/charlist');
    }

    return (
        <div className="menu">
            <DraggableBackground className='skin-bg'
                backgroundImage={assistantImg}
                ref={DragBGFuncRef}
                h={assistantH} x={assistantX} y={assistantY}
                setH={setAssistantH} setX={setAssistantX} setY={setAssistantY}
            >
                <div className="right-area">
                    <div className="right-plate">

                        <div className="top-line">
                            <ClockText></ClockText>
                        </div>

                        <div className="btns btn1s">
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
                            <button className="char-btn" onClick={nagivateCharList}>
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