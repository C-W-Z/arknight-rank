import React, { RefObject, useEffect, useRef, useState } from 'react';
import './CharList.css'
import { Star } from '../components/SVGIcons';
import TopButtons from '../components/TopButtons';
import ProgressCircle from '../components/ProgressCircle';
import { HorizontalScroll, HScrollRef } from '../components/DraggableScroll';
import { JSX } from 'react/jsx-runtime';
import useGlobalContext from '../components/GlobalContext';
import { useLocation, useNavigate } from 'react-router-dom';

interface CharCardProps {
    char_id: string;
    name: string;
    rarity: number;
    rank: number;
    total_rank: number;
    sliderFuncRef: RefObject<HScrollRef>;
    portraitId: string;
    prof: string;
    filtProf: string;
}

function CharCard({
    char_id,
    name,
    rarity,
    rank,
    total_rank,
    sliderFuncRef,
    portraitId,
    prof,
    filtProf,
}: CharCardProps) {
    const navigate = useNavigate();

    const elite = 1;
    const potential = 2;

    let fontSize = "1.5em";
    if (rank <= 0)
        rank = 0;
    if (rank >= 100)
        fontSize = "1.25em";

    let moving = false;

    function onMouseDown() {
        moving = false;
    }

    function onMouseMove() {
        moving = true;
    }

    function onMouseUp(e: React.MouseEvent) {
        if (moving)
            return;
        e.stopPropagation();
        sliderFuncRef.current?.setMouseDown(false);
        navigate('/stat', {
            state: {
                char_id: char_id,
                filt_prof: filtProf
            }
        });
    }

    return (
        <div className={"charcard " + "r" + rarity}
            onMouseDown={onMouseDown} onMouseMove={onMouseMove} onMouseUp={onMouseUp}
        >
            <div className={"portrait " + portraitId}></div>
            <div className={"header " + "h" + rarity}></div>
            <div className={"class-icon " + prof}></div>
            <Star num={rarity} color={'#ffd900'}></Star>
            <div className={"glow " + "g" + rarity}></div>
            <div className="bottom-left"></div>
            <div className="bottom">
                <div className={"banner " + "b" + rarity}></div>
                {elite > 0 && <div className={"elite " + "e" + elite}></div>}
                {potential > 1 &&
                    <div className="potential-bg">
                        <div className="potential-square"></div>
                        <div className={"potential " + "p" + potential}></div>
                    </div>
                }
                <ProgressCircle value={1 - (rank - 1) / total_rank} size={"5.2em"}>
                    <div className='rank-title'>RANK</div>
                    <div className='rank-num' style={{ fontSize: fontSize }}>{rank}</div>
                </ProgressCircle>
                <div className="name">{name}</div>
            </div>
        </div>
    )
}

function CharList() {
    const globalContext = useGlobalContext();

    const navigate = useNavigate();
    function back() {
        navigate('/');
    }
    const { state } = useLocation();
    const { filt_prof } = state;

    const HScrollFuncRef = useRef<HScrollRef>(null);

    const [list, setList] = useState<JSX.Element[]>([]);

    let newClasses = Array(9).fill("filter");
    // newClasses[0] += " choose";
    function initNewClasses() {
        console.log("execute");
        switch (filt_prof) {
            case "ALL":
                newClasses[0] += " choose";
                break;
            case "PIONEER":
                newClasses[1] += " choose";
                break;
            case "WARRIOR":
                newClasses[2] += " choose";
                break;
            case "TANK":
                newClasses[3] += " choose";
                break;
            case "SNIPER":
                newClasses[4] += " choose";
                break;
            case "CASTER":
                newClasses[5] += " choose";
                break;
            case "MEDIC":
                newClasses[6] += " choose";
                break;
            case "SUPPORT":
                newClasses[7] += " choose";
                break;
            case "SPECIAL":
                newClasses[8] += " choose";
                break;

            default:
                newClasses[0] += " choose";
                break;
        }
    }
    initNewClasses();
    const [chooseClasses, setChooseClasses] = useState<string[]>(newClasses);
    const [filtProf, setFiltProf] = useState<string>(filt_prof);
    function filtTo(prof: string, i: number) {
        if (prof == "ALL")
        {
            return () => {
                if (filtProf == "ALL") {
                    setProfFilterClose(true);
                    globalContext?.setCharListPref(false);
                } else {
                    setFiltProf(prof);
                    newClasses = Array(9).fill("filter");
                    newClasses[i] += " choose";
                    setChooseClasses(newClasses);
                    HScrollFuncRef.current?.JumpToLeft();
                }
            }
        }
        return () => {
            setFiltProf(prof);
            newClasses = Array(9).fill("filter");
            newClasses[i] += " choose";
            setChooseClasses(newClasses);
            HScrollFuncRef.current?.JumpToLeft();
        };
    }

    useEffect(() => {
        if (globalContext === undefined || globalContext.loading)
            return;

        let filtChars;
        if (filtProf == "ALL")
            filtChars = globalContext.vars.ranked_chars;
        else
            filtChars = globalContext.vars.ranked_chars.filter((c: any) => globalContext.data.chars[c.id].prof == filtProf);

        let cards = [];
        for (let i = 0; i < filtChars.length; i++) {
            const char_id = filtChars[i].id;
            const rank = globalContext.vars.char2rank[char_id];
            const charInfo = globalContext.data.chars[char_id];
            const skin_id = globalContext.vars.prefs.stat_pref[char_id].skin_id;
            const portrait_id = globalContext.data.skins[skin_id].portrait_id;

            cards.push(
                <CharCard key={char_id}
                    sliderFuncRef={HScrollFuncRef}
                    char_id={char_id}
                    name={charInfo.name}
                    rarity={charInfo.rarity + 1}
                    prof={charInfo.prof}
                    portraitId={portrait_id}
                    rank={rank}
                    total_rank={filtChars.length}
                    filtProf={filtProf}
                ></CharCard>
            );
        }

        let columns = [];
        for (let i = 0; i < cards.length; i += 2) {
            columns.push(
                <div key={i} className="column">
                    {cards[i]}
                    {i + 1 < cards.length && cards[i + 1]}
                </div>
            );
        }
        setList(columns);
    }, [globalContext?.loading, filtProf]);

    const [profFilterClose, setProfFilterClose] = useState(true);

    useEffect(() => {
        if (globalContext === undefined || globalContext.loading)
            return;
        setProfFilterClose(!globalContext.vars.prefs.char_list_pref.prof_filter_open);
        console.log(globalContext.vars.prefs.char_list_pref.prof_filter_open);
    }, [globalContext?.loading]);

    function openProfFilter() {
        setProfFilterClose(false);
        globalContext?.setCharListPref(true);
    }
    const profFilterBtnClass = profFilterClose ? "btn-class-filter" : "btn-class-filter close";
    const profFilterClass = profFilterClose ? "class-filter close" : "class-filter";

    if (globalContext === undefined || globalContext.loading) {
        return (
            <div className='charlist'>
                <TopButtons backOnClick={back} homeBtn={true}></TopButtons>
            </div>
        )
    }

    return (
        <div className='charlist'>
            <button className={profFilterBtnClass} onClick={openProfFilter}>职业☰</button>
            <div className="in-shadow">
                <TopButtons backOnClick={back} homeBtn={true}></TopButtons>
                <div className="logo-rhodes"></div>
                <HorizontalScroll alignDelay={100} className="list-area" ref={HScrollFuncRef}>
                    <div className="list-grid">
                        {list}
                    </div>
                </HorizontalScroll>
                <div className={profFilterClass}>
                    <button className={"all " + chooseClasses[0]} onClick={filtTo("ALL", 0)}>
                        <div className="icon all">{chooseClasses[0].endsWith("choose") ? "收起" : "全部"}</div>
                    </button>
                    <button className={chooseClasses[1]} onClick={filtTo("PIONEER", 1)}>
                        <div className="icon PIONEER"></div>
                    </button>
                    <button className={chooseClasses[2]} onClick={filtTo("WARRIOR", 2)}>
                        <div className="icon WARRIOR"></div>
                    </button>
                    <button className={chooseClasses[3]} onClick={filtTo("TANK", 3)}>
                        <div className="icon TANK"></div>
                    </button>
                    <button className={chooseClasses[4]} onClick={filtTo("SNIPER", 4)}>
                        <div className="icon SNIPER"></div>
                    </button>
                    <button className={chooseClasses[5]} onClick={filtTo("CASTER", 5)}>
                        <div className="icon CASTER"></div>
                    </button>
                    <button className={chooseClasses[6]} onClick={filtTo("MEDIC", 6)}>
                        <div className="icon MEDIC"></div>
                    </button>
                    <button className={chooseClasses[7]} onClick={filtTo("SUPPORT", 7)}>
                        <div className="icon SUPPORT"></div>
                    </button>
                    <button className={chooseClasses[8]} onClick={filtTo("SPECIAL", 8)}>
                        <div className="icon SPECIAL"></div>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CharList;