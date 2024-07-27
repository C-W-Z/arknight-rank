import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import './Menu.css'
import DraggableBackground, { DragBGRef } from "../components/DraggableBackground";
import { useNavigate } from "react-router-dom";
import useGlobalContext from "../components/GlobalContext";
import { Warning, Gear, InfoIcon, ChevronLeft, RankStar, VolumeHigh } from "../components/SVGIcons";
import { appCacheDir, appConfigDir, appDataDir, appLocalDataDir, appLogDir, resourceDir } from "@tauri-apps/api/path";
import { VerticalScroll, VScrollRef } from "../components/DraggableScroll";
import { getName, getVersion } from "@tauri-apps/api/app";
import { invoke } from "@tauri-apps/api/tauri";

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


function AppDirLine({ name, path }: { name: string, path: string }) {
    function openDir(path: string) {
        return (e: React.MouseEvent) => {
            e.preventDefault();
            e.stopPropagation();
            invoke('open_dir', { path: path })
                .catch((e) => console.error(e));
        }
    }

    function stopPropagation(e: React.MouseEvent) {
        e.stopPropagation();
    }

    return (
        <div className="line">
            <div className="line-title">
                <div className="text">{name}</div>
                <button className="btn"
                    onClick={openDir(path)}
                    onMouseDown={stopPropagation}
                >Open</button>
            </div>
            {path.length > 0 && <div className="line-subtitle">{path}</div>}
        </div>
    )
}

type SettingRef = {
    openSetting: () => void;
}

const Setting = forwardRef<SettingRef, {}>(({ }, ref) => {
    const [close, setClose] = useState(true);

    function closeSetting() {
        setClose(true);
    }

    useImperativeHandle(ref, () => ({
        openSetting() {
            setClose(false);
        }
    }));

    useEffect(() => {
        if (!close)
            VScrollFuncRef.current?.Align();
    }, [close])

    const VScrollFuncRef = useRef<VScrollRef>(null);

    const [resourcePath, setResourcePath] = useState('');
    const [appDataPath, setAppDataPath] = useState('');
    const [appLocalDataPath, setAppLocalDataPath] = useState('');
    const [appCachePath, setAppCachePath] = useState('');
    const [appConfigPath, setAppConfigPath] = useState('');
    const [appLogPath, setAppLogPath] = useState('');
    const [appName, setAppName] = useState('');
    const [appVersion, setAppVersion] = useState('');

    useEffect(() => {
        resourceDir().then((dir) => {
            setResourcePath(dir);
        }).catch((e) => console.error(e));

        appDataDir().then((dir) => {
            setAppDataPath(dir);
        }).catch((e) => console.error(e));

        appLocalDataDir().then((dir) => {
            setAppLocalDataPath(dir);
        }).catch((e) => console.error(e));

        appCacheDir().then((dir) => {
            setAppCachePath(dir);
        }).catch((e) => console.error(e));

        appConfigDir().then((dir) => {
            setAppConfigPath(dir);
        }).catch((e) => console.error(e));

        appLogDir().then((dir) => {
            setAppLogPath(dir);
        }).catch((e) => console.error(e));

        getName().then((name) => {
            setAppName(name);
        }).catch((e) => console.error(e));

        getVersion().then((version) => {
            setAppVersion(version);
        }).catch((e) => console.error(e));
    }, []);

    const className = close ? "panel setting close" : "panel setting";

    return (
        <div className={className}>
            <div className="header">
                <div className="back-btn-area">
                    <button className='back-btn' onClick={closeSetting}>
                        <ChevronLeft></ChevronLeft>
                    </button>
                </div>
                <div className="title">
                    <Gear></Gear>
                    <div className="text">设置</div>
                </div>
            </div>
            <div className="main-area">
                <div className="tabs">
                    <button className="tab active"><InfoIcon></InfoIcon>游戏</button>
                    <button className="tab"><RankStar></RankStar>排行</button>
                    <button className="tab"><VolumeHigh></VolumeHigh>声音</button>
                    <button className="tab"><Warning></Warning>报错</button>
                </div>
                <VerticalScroll className="context" ref={VScrollFuncRef}>
                    <div className="page">
                        <div className="title">Game Info</div>
                        <div className="line app-name-version">{appName} v{appVersion}</div>
                        <AppDirLine name="App Resource Dir" path={resourcePath}></AppDirLine>
                        <AppDirLine name="App Config Dir" path={appConfigPath}></AppDirLine>
                        <AppDirLine name="App Data Dir" path={appDataPath}></AppDirLine>
                        <AppDirLine name="App Local Data Dir" path={appLocalDataPath}></AppDirLine>
                        <AppDirLine name="App Cache Dir" path={appCachePath}></AppDirLine>
                        <AppDirLine name="App Log Dir" path={appLogPath}></AppDirLine>
                    </div>
                </VerticalScroll>
            </div>
        </div>
    )
});

function Menu() {

    const globalContext = useGlobalContext();

    const navigate = useNavigate()
    const [assistantImg, setAssistantImg] = useState<string>('');
    const [assistantH, setAssistantH] = useState<number>(100);
    const [assistantX, setAssistantX] = useState<number>(0);
    const [assistantY, setAssistantY] = useState<number>(0);

    useEffect(() => {
        if (globalContext === undefined || globalContext.loading)
            return;

        const menu_pref = globalContext.vars.prefs.menu_pref;

        setAssistantH(menu_pref.h);
        setAssistantX(menu_pref.x);
        setAssistantY(menu_pref.y);
        setAssistantImg(menu_pref.skin_id);
    }, [globalContext?.loading]);

    const DragBGFuncRef = useRef<DragBGRef>(null);

    // function openBGSetting() {
    //     DragBGFuncRef.current?.openSetting();
    // }

    function nagivateTerminal() {
        navigate('/terminal');
    }

    function nagivateCharList() {
        navigate('/charlist');
    }

    const SettingFuncRef = useRef<SettingRef>(null);
    function openSetting() {
        SettingFuncRef.current?.openSetting();
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
                            <button className="battle-btn" onClick={nagivateTerminal}>
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
                                <div className="btn-title">成就</div>
                            </button>
                            <button className="infra-btn" onClick={openSetting}>
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
            <Setting ref={SettingFuncRef}></Setting>
        </div>
    );
}

export default Menu;