import React, { RefObject, useEffect, useRef, useState } from 'react';
import './CharList.css'
import { AtkIcon, ChevronDown, ChevronUp, Star, Trophy, XMark } from '../components/SVGIcons';
import TopButtons from '../components/TopButtons';
import ProgressCircle from '../components/ProgressCircle';
import { HorizontalScroll, HScrollRef } from '../components/DraggableScroll';
import { JSX } from 'react/jsx-runtime';
import useGlobalContext from '../components/GlobalContext';
import { useNavigate } from 'react-router-dom';

interface CharCardProps {
    char_id: string;
    name: string;
    rarity: number;
    rank: number;
    total_rank: number;
    sliderFuncRef: RefObject<HScrollRef>;
    portraitId: string;
    prof: string;
    showAttrIcon?: any;
    showAttrText?: any;
    showAttrDiffColor?: boolean;
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
    showAttrIcon = undefined,
    showAttrText = undefined,
    showAttrDiffColor,
}: CharCardProps) {
    const globalContext = useGlobalContext();
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
        globalContext?.uploadCharListPref();
        navigate('/stat', { state: { char_id: char_id, } });
    }

    return (
        <button className={"charcard " + "r" + rarity}
            onMouseDown={onMouseDown} onMouseMove={onMouseMove} onMouseUp={onMouseUp}
        >
            <div className="bg"></div>
            <div className={"portrait " + portraitId}></div>
            <div className={"header " + "h" + rarity}></div>
            <div className={"class-icon " + prof}></div>
            <Star num={rarity} color={'#ffd900'}></Star>
            <div className={"glow " + "g" + rarity}></div>
            <div className="bottom-left"></div>
            <div className="bottom">
                <div className={"banner " + "b" + rarity}></div>
                {elite > 0 && <div className={"elite-icon " + "e" + elite}></div>}
                {potential > 1 &&
                    <div className="potential-bg">
                        <div className="potential-square"></div>
                        <div className={"potential-icon " + "p" + potential}></div>
                    </div>
                }
                <ProgressCircle value={1 - (rank - 1) / (total_rank - 1)} size={"5.2em"}>
                    <div className='rank-title'>RANK</div>
                    <div className='rank-num' style={{ fontSize: fontSize }}>{rank}</div>
                </ProgressCircle>
                <div className="name">{name}</div>
                {showAttrIcon !== undefined && showAttrText !== undefined &&
                    <div className={"show-attr" + (showAttrDiffColor ? ' diff-color': '')}>
                        <div className="icon">{showAttrIcon}</div>
                        <div className="text">{showAttrText}</div>
                    </div>
                }
            </div>
        </button>
    )
}

interface SortOptionProps {
    className?: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    icon?: any;
    text?: string;
}

function SortOption({
    className = '',
    onClick = undefined,
    icon = undefined,
    text = ''
}: SortOptionProps) {
    return (
        <button className={'option ' + className} onClick={onClick}>
            <div className="icon">{icon}</div>
            <div className="text">{text}</div>
            <div className="arrows">
                <ChevronDown></ChevronDown>
                <ChevronUp></ChevronUp>
            </div>
        </button>
    )
}

function CharList() {
    const globalContext = useGlobalContext();

    const navigate = useNavigate();
    function back() {
        globalContext?.uploadCharListPref();
        navigate('/');
    }

    const HScrollFuncRef = useRef<HScrollRef>(null);

    const [list, setList] = useState<JSX.Element[]>([]);

    let newClasses = Array(9).fill("filter");
    newClasses[0] += " choose";
    const [chooseClasses, setChooseClasses] = useState<string[]>(newClasses);
    const [filtProf, setFiltProf] = useState<string>("ALL");
    function filtTo(prof: string, i: number) {
        if (prof == "ALL") {
            return () => {
                if (filtProf == "ALL") {
                    setProfFilterClose(true);
                    globalContext?.setCharListPref("CLOSE");
                } else {
                    setFiltProf(prof);
                    newClasses = Array(9).fill("filter");
                    newClasses[i] += " choose";
                    setChooseClasses(newClasses);
                    HScrollFuncRef.current?.JumpToLeft();
                    globalContext?.setCharListPref(prof);
                }
            }
        }
        return () => {
            if (filtProf == prof)
                return;
            setFiltProf(prof);
            newClasses = Array(9).fill("filter");
            newClasses[i] += " choose";
            setChooseClasses(newClasses);
            HScrollFuncRef.current?.JumpToLeft();
            globalContext?.setCharListPref(prof);
        };
    }

    const [otherSort, setOtherSort] = useState('Rating');
    const [sortBy, setSortBy] = useState<string>('rank');
    const [chooseSort, setChooseSort] = useState<string[]>([' choose descend', '', '']);
    const [moreSortClose, setMoreSortClose] = useState(true);
    const [chooseSortOther, setChooseSortOther] = useState<string[]>(Array(8).fill(''));

    function sortTo(sortby: string, i: number) {
        return () => {
            if (sortBy == sortby) {
                newClasses = ['', '', ''];
                if (chooseSort[i].endsWith('ascend')) {
                    newClasses[i] = ' choose descend';
                    globalContext?.setCharListPref(undefined, i < 2 ? sortby : otherSort, false);
                } else {
                    newClasses[i] = ' choose ascend';
                    globalContext?.setCharListPref(undefined, i < 2 ? sortby : otherSort, true);
                }
                setChooseSort(newClasses);
            } else {
                setSortBy(sortby);
                newClasses = ['', '', ''];
                newClasses[i] = ' choose descend';
                setChooseSort(newClasses);
                globalContext?.setCharListPref(undefined, i < 2 ? sortby : otherSort, false);
                if (i < 2) {
                    chooseSortOther.forEach((s, i) => {
                        if (s.endsWith('end'))
                            chooseSortOther[i] = ' choose ascend';
                    });
                    setChooseSortOther(chooseSortOther);
                }
            }
        }
    }

    function SortToOther(sortby: string, i: number) {
        return () => {
            if (otherSort == sortby) {
                newClasses = Array(8).fill('');
                if (chooseSortOther[i].endsWith('ascend')) {
                    newClasses[i] = ' choose descend';
                    globalContext?.setCharListPref(undefined, sortby, false);
                } else {
                    newClasses[i] = ' choose ascend';
                    globalContext?.setCharListPref(undefined, sortby, true);
                }
                setChooseSortOther(newClasses);
                setSortBy('other');
                setChooseSort(['', '', newClasses[i]]);
            } else {
                setOtherSort(sortby);
                newClasses = Array(8).fill('');
                newClasses[i] = ' choose descend';
                setChooseSortOther(newClasses);
                setSortBy('other');
                setChooseSort(['', '', ' choose descend']);
                globalContext?.setCharListPref(undefined, sortby, false);
            }
        }
    }

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (loading || globalContext === undefined || globalContext.loading)
            return;

        const total_rank = globalContext.vars.char2rank[globalContext.vars.ranked_chars[globalContext.vars.ranked_chars.length - 1].id];

        const charData = globalContext.data.chars;

        let filtChars: any[];
        if (filtProf == "ALL")
            filtChars = Array.from(globalContext.vars.ranked_chars);
        else
            filtChars = globalContext.vars.ranked_chars.filter((c: any) => charData[c.id].prof == filtProf);

        if (sortBy == 'rank' && chooseSort[0].endsWith('ascend'))
            filtChars.reverse();
        else if (sortBy == 'rarity') {
            const ascend = chooseSort[1].endsWith('ascend') ? 1 : -1;
            filtChars.sort((a, b) => ascend * (charData[a.id].rarity - charData[b.id].rarity));
        }
        else if (sortBy == 'other') {
            const ascend = chooseSort[2].endsWith('ascend') ? 1 : -1;
            switch (otherSort) {
                case 'Rating':
                    if (ascend == 1)
                        filtChars.reverse();
                    break;
                case 'Deviation':
                    filtChars.sort((a, b) => ascend * (a.rank.devi - b.rank.devi));
                    break;
                case 'Volatility':
                    filtChars.sort((a, b) => ascend * (a.rank.vola - b.rank.vola));
                    break;
                case 'Wins':
                    filtChars.sort((a, b) => ascend * (a.hist.wins - b.hist.wins));
                    break;
                case 'Draws':
                    filtChars.sort((a, b) => ascend * (a.hist.draw - b.hist.draw));
                    break;
                case 'Losses':
                    filtChars.sort((a, b) => ascend * (a.hist.loss - b.hist.loss));
                    break;
                case 'Battles':
                    filtChars.sort((a, b) => ascend * (a.hist.wins + a.hist.draw + a.hist.loss - b.hist.wins - b.hist.draw - b.hist.loss));
                    break;
                case 'Winrate':
                    filtChars.sort((a, b) => ascend * (a.hist.wins / (a.hist.wins + a.hist.draw + a.hist.loss) - b.hist.wins / (b.hist.wins + b.hist.draw + b.hist.loss)));
                    break;
                default:
                    break;
            }
        }

        function roundDown(num: number, decimal: number) {
            return (Math.floor((num + Number.EPSILON) * Math.pow(10, decimal)) / Math.pow(10, decimal)).toFixed(decimal);
        }

        const showAttr = sortBy == 'other' ? otherSort : undefined;
        const cards = [];
        for (const c of filtChars) {
            const char_id = c.id;
            const rank = globalContext.vars.char2rank[char_id];
            const charInfo = charData[char_id];
            const skin_id = globalContext.vars.prefs.stat_pref[char_id].skin_id;
            const portrait_id = globalContext.data.skins[skin_id].portrait_id;

            let showAttrIcon: any = undefined;
            let showAttrText: any = undefined;
            let showAttrDiffColor: boolean = false;
            if (showAttr !== undefined)
                switch (showAttr) {
                    case 'Rating':
                        showAttrIcon = 'μ';
                        showAttrText = roundDown(c.rank.rati, 2);
                        break;
                    case 'Deviation':
                        showAttrIcon = 'φ';
                        showAttrText = roundDown(c.rank.devi, 2);
                        break;
                    case 'Volatility':
                        showAttrIcon = 'σ';
                        showAttrText = roundDown(c.rank.vola, 4);
                        break;
                    case 'Wins':
                        showAttrIcon = '▲';
                        showAttrText = c.hist.wins;
                        break;
                    case 'Draws':
                        showAttrIcon = '▶';
                        showAttrText = c.hist.draw;
                        break;
                    case 'Losses':
                        showAttrIcon = '▼';
                        showAttrText = c.hist.loss;
                        break;
                    case 'Battles':
                        showAttrIcon = <AtkIcon></AtkIcon>;
                        showAttrText = c.hist.wins + c.hist.draw + c.hist.loss;
                        break;
                    case 'Winrate':
                        showAttrIcon = <Trophy></Trophy>;
                        showAttrText = (100 * c.hist.wins / (c.hist.wins + c.hist.draw + c.hist.loss)).toFixed(0) + '%';
                        showAttrDiffColor = true;
                        break;
                    default:
                        break;
                }

            cards.push(
                <CharCard key={char_id}
                    sliderFuncRef={HScrollFuncRef}
                    char_id={char_id}
                    name={charInfo.name}
                    rarity={charInfo.rarity + 1}
                    prof={charInfo.prof}
                    portraitId={portrait_id}
                    rank={rank}
                    total_rank={total_rank}
                    showAttrIcon={showAttrIcon}
                    showAttrText={showAttrText}
                    showAttrDiffColor={showAttrDiffColor}
                ></CharCard>
            );
        }

        const columns = [];
        for (let i = 0; i < cards.length; i += 2) {
            columns.push(
                <div key={i} className="column">
                    {cards[i]}
                    {i + 1 < cards.length && cards[i + 1]}
                </div>
            );
        }
        setList(columns);
    }, [loading, filtProf, chooseSort]);

    const [profFilterClose, setProfFilterClose] = useState(true);

    useEffect(() => {
        if (globalContext === undefined || globalContext.loading)
            return;
        const pref = globalContext.vars.prefs.char_list_pref;
        console.log(pref);

        newClasses = Array(9).fill('filter');
        switch (pref.prof_filter) {
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
        setChooseClasses(newClasses);
        if (pref.prof_filter == "CLOSE") {
            setProfFilterClose(true);
            setFiltProf("ALL");
        } else {
            setProfFilterClose(false);
            setFiltProf(pref.prof_filter);
        }

        const selectClass = pref.ascend ? " choose ascend" : " choose descend";
        if (pref.sortby == 'rank') {
            setSortBy(pref.sortby);
            setChooseSort([selectClass, '', '']);
        } else if (pref.sortby == 'rarity') {
            setSortBy(pref.sortby);
            setChooseSort(['', selectClass, '']);
        } else {
            setSortBy('other');
            setChooseSort(['', '', selectClass]);
            setOtherSort(pref.sortby);
            newClasses = Array(8).fill('');
            switch (pref.sortby) {
                case 'Rating':
                    newClasses[0] = selectClass;
                    break;
                case 'Deviation':
                    newClasses[1] = selectClass;
                    break;
                case 'Volatility':
                    newClasses[2] = selectClass;
                    break;
                case 'Wins':
                    newClasses[3] = selectClass;
                    break;
                case 'Draws':
                    newClasses[4] = selectClass;
                    break;
                case 'Losses':
                    newClasses[5] = selectClass;
                    break;
                case 'Battles':
                    newClasses[6] = selectClass;
                    break;
                case 'Winrate':
                    newClasses[7] = selectClass;
                    break;
                default:
                    break;
            }
            setChooseSortOther(newClasses);
        }
        setLoading(false);
    }, [globalContext?.loading]);

    function openProfFilter() {
        setProfFilterClose(false);
        globalContext?.setCharListPref("ALL");
    }
    const profFilterBtnClass = profFilterClose ? "btn-class-filter" : "btn-class-filter close";
    const profFilterClass = profFilterClose ? "class-filter close" : "class-filter";

    const moreSortClass = moreSortClose ? " close" : "";

    if (globalContext === undefined || globalContext.loading) {
        return (
            <div className='charlist'>
                <div className="in-shadow"></div>
                <div className="logo-rhodes"></div>
                <TopButtons backOnClick={back} homeBtn={true} homeOnClick={back}></TopButtons>
            </div>
        )
    }

    return (
        <div className='charlist'>
            <button className={profFilterBtnClass} onClick={openProfFilter}>职业☰</button>
            <div className="sortby">
                <button className={"rank" + chooseSort[0]} onClick={sortTo('rank', 0)}>
                    <div className='text'>Rank</div>
                </button>
                <button className={"rarity" + chooseSort[1]} onClick={sortTo('rarity', 1)}>
                    <div className='text'>Rarity</div>
                </button>
                <button className={"other" + chooseSort[2]} onClick={sortTo('other', 2)}>
                    <div className='text'>{otherSort}</div>
                </button>
                <button className="more" onClick={() => setMoreSortClose(false)}>•••</button>
            </div>
            <div className="in-shadow"></div>
            <div className="logo-rhodes"></div>
            <HorizontalScroll alignDelay={100} className="list-area" ref={HScrollFuncRef}>
                <div className="list-grid">
                    {list}
                </div>
                <div className={"proffilt-padding" + (profFilterClose ? " close" : "")}></div>
            </HorizontalScroll>
            <div className={profFilterClass}>
                <button className={"all " + chooseClasses[0]} onClick={filtTo("ALL", 0)}>
                    <div className="class-img all">{chooseClasses[0].endsWith("choose") ? "收起" : "全部"}</div>
                </button>
                <button className={chooseClasses[1]} onClick={filtTo("PIONEER", 1)}>
                    <div className="class-img PIONEER"></div>
                </button>
                <button className={chooseClasses[2]} onClick={filtTo("WARRIOR", 2)}>
                    <div className="class-img WARRIOR"></div>
                </button>
                <button className={chooseClasses[3]} onClick={filtTo("TANK", 3)}>
                    <div className="class-img TANK"></div>
                </button>
                <button className={chooseClasses[4]} onClick={filtTo("SNIPER", 4)}>
                    <div className="class-img SNIPER"></div>
                </button>
                <button className={chooseClasses[5]} onClick={filtTo("CASTER", 5)}>
                    <div className="class-img CASTER"></div>
                </button>
                <button className={chooseClasses[6]} onClick={filtTo("MEDIC", 6)}>
                    <div className="class-img MEDIC"></div>
                </button>
                <button className={chooseClasses[7]} onClick={filtTo("SUPPORT", 7)}>
                    <div className="class-img SUPPORT"></div>
                </button>
                <button className={chooseClasses[8]} onClick={filtTo("SPECIAL", 8)}>
                    <div className="class-img SPECIAL"></div>
                </button>
            </div>
            <div className={"more-sort-panel" + moreSortClass} onClick={() => setMoreSortClose(true)}></div>
            <div className={"sortby-other" + moreSortClass}>
                <button className="header" onClick={() => setMoreSortClose(true)}>
                    <XMark></XMark>
                </button>
                <SortOption className={chooseSortOther[0]} onClick={SortToOther('Rating', 0)}
                    icon={'μ'} text={'Rating'}></SortOption>
                <SortOption className={chooseSortOther[1]} onClick={SortToOther('Deviation', 1)}
                    icon={'φ'} text={'Deviation'}></SortOption>
                <SortOption className={chooseSortOther[2]} onClick={SortToOther('Volatility', 2)}
                    icon={'σ'} text={'Volatility'}></SortOption>
                <SortOption className={chooseSortOther[3]} onClick={SortToOther('Wins', 3)}
                    icon={'▲'} text={'Wins'}></SortOption>
                <SortOption className={chooseSortOther[4]} onClick={SortToOther('Draws', 4)}
                    icon={'▶'} text={'Draws'}></SortOption>
                <SortOption className={chooseSortOther[5]} onClick={SortToOther('Losses', 5)}
                    icon={'▼'} text={'Losses'}></SortOption>
                <SortOption className={chooseSortOther[6]} onClick={SortToOther('Battles', 6)}
                    icon={<AtkIcon></AtkIcon>} text={'Battles'}></SortOption>
                <SortOption className={chooseSortOther[7]} onClick={SortToOther('Winrate', 7)}
                    icon={<Trophy></Trophy>} text={'Winrate'}></SortOption>
                <div className="placeholder"></div>
            </div>
            <TopButtons backOnClick={back} homeBtn={true} homeOnClick={back}></TopButtons>
        </div>
    )
}

export default CharList;