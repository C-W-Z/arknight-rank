import React, { useEffect, useRef, useState } from 'react';
import './Stat.css';
import ProgressBar from '../components/ProgressBar';
import ProgressCircle from '../components/ProgressCircle';
import { VerticalScroll, VScrollRef } from '../components/DraggableScroll';
import ExtendCard from '../components/ExtendCard';
import TopButtons from '../components/TopButtons';
import ArrowButton from '../components/ArrowButton';
import DraggableBackground, { DragBGRef } from '../components/DraggableBackground';
import CircleButton from '../components/CircleButton';
import { CrossArrow, Star } from '../components/SVGIcons';
import { useLocation, useNavigate } from 'react-router-dom';
import useGlobalContext from '../components/GlobalContext';
import AutoSizeText from '../components/AutoSizeText';

interface NameOverlayProps {
    name: string;
    name2: string;
    prof: string;
    subProf: string;
    position: string;
    tags: string[];
}

function NameOverlay({
    name,
    name2,
    prof,
    subProf,
    position,
    tags
}: NameOverlayProps) {
    let tagStr = '';
    for (const t of tags) {
        tagStr += ' ' + t;
    }
    tagStr = tagStr.trim();

    if (position == 'MELEE')
        position = '近战位';
    else
        position = '远程位';

    return (
        <div className="name-overlay">
            <Star num={6} color={'#ffffff'}></Star>
            <AutoSizeText className='name2' maxSize={'1.5em'}>{name2}</AutoSizeText>
            <AutoSizeText className='name' maxSize={'4em'}>{name}</AutoSizeText>
            <div className='class-tags'>
                <div className={'class-img ' + prof}></div>
                <div className='class-name'>{subProf}</div>
                <div className='position-type'>{position}</div>
                <div className='tags'>{tagStr}</div>
            </div>
        </div>
    )
}

interface StatisticDetailProps {
    className?: string;
    icon_word: string;
    word: string;
    num: number;
    max: number;
    to_fixed?: number;
}

function StatisticDetail({
    className = "",
    icon_word,
    word,
    num,
    max,
    to_fixed = 0
}: StatisticDetailProps) {

    const roundDown = function (num: number, decimal: number) {
        return Math.floor((num + Number.EPSILON) * Math.pow(10, decimal)) / Math.pow(10, decimal);
    }

    return (
        <div className={"detail-item " + className}>
            <div className='detail-icon'>{icon_word}</div>
            <div className='extend-word'>{word}</div>
            <ProgressBar className={'detail-number'} value={num} max={max}>
                {roundDown(num, to_fixed).toFixed(to_fixed)}
            </ProgressBar>
        </div>
    )
}

function WinrateBar({ percent }: { percent: number }) {
    return (
        <div className='winrate'>
            <label className='winrate-title'>
                <span>Win Rate »</span>
                <span>{percent.toFixed(0)}%</span>
            </label>
            <ProgressBar className='winrate-bar' value={percent} max={100}></ProgressBar>
        </div>
    )
}

interface StatisticProps {
    rati: number;
    devi: number;
    vola: number;
    wins: number;
    draw: number;
    loss: number;
}

function Statistic(s: StatisticProps) {
    const [close, setClose] = useState(true);

    function toggleClose() {
        setClose(!close);
    }

    const className = close ? 'statistic close' : 'statistic';

    let winrate = 0;
    if (s.wins + s.draw + s.loss > 0)
        winrate = 100 * s.wins / (s.wins + s.draw + s.loss);

    return (
        <div className={className} onClick={toggleClose}>
            <div className='rank-title'>Statistic »</div>
            <StatisticDetail className={'rati'} icon_word={'μ'} word={'Rating'}
                num={s.rati} max={5000} to_fixed={2}></StatisticDetail>
            <StatisticDetail className={'devi'} icon_word={'φ'} word={'Deviation'}
                num={s.devi} max={350} to_fixed={2}></StatisticDetail>
            <StatisticDetail className={'vola'} icon_word={'σ'} word={'Volatility'}
                num={s.vola} max={0.1} to_fixed={4}></StatisticDetail>
            <StatisticDetail className={'wins'} icon_word={'▲'} word={'Wins'}
                num={s.wins} max={100}></StatisticDetail>
            <StatisticDetail className={'draw'} icon_word={'▶'} word={'Draws'}
                num={s.draw} max={100}></StatisticDetail>
            <StatisticDetail className={'loss'} icon_word={'▼'} word={'Losses'}
                num={s.loss} max={100}></StatisticDetail>
            <WinrateBar percent={winrate}></WinrateBar>
        </div>
    )
}

interface RankingProps {
    rank: number;
    total: number;
}

function Ranking({ rank, total }: RankingProps) {
    let fontSize = "1.5em";
    if (rank <= 0)
        rank = 0;
    if (rank >= 100)
        fontSize = "1.25em";

    return (
        <button className='ranking'>
            <ProgressCircle value={1 - (rank - 1) / (total - 1)} size={"5.2em"}>
                <div className='rank-title'>RANK</div>
                <div className='rank-num' style={{ fontSize: fontSize }}>{rank}</div>
            </ProgressCircle>
            <div className='rank-bar' style={{ "--total": total } as React.CSSProperties}>
                <div className='rank-bar-title'>In Last 5 Sessions</div>
                <div className='rank-bar-detail'>
                    1 place gained
                </div>
                <div className='rank-bar-more'>+</div>
            </div>
        </button>
    )
}

function Stat() {
    const globalContext = useGlobalContext();

    const navigate = useNavigate();
    const { state } = useLocation();
    const { char_id } = state;

    function back() {
        navigate('/charlist');
    }

    const [skinImg, setSkinImg] = useState<string | undefined>(undefined);
    const [skinH, setSkinH] = useState<number>(100);
    const [skinX, setSkinX] = useState<number>(0);
    const [skinY, setSkinY] = useState<number>(0);

    useEffect(() => {
        if (globalContext === undefined || globalContext.loading)
            return;

        const statPref = globalContext.vars.prefs.stat_pref[char_id];
        setSkinH(statPref.h);
        setSkinX(statPref.x);
        setSkinY(statPref.y);
        setSkinImg(statPref.skin_id);
    }, [globalContext?.loading]);

    function closeDragBgSetting() {
        if (globalContext === undefined || globalContext.loading)
            return;
        globalContext.setStatPref(char_id, '', skinH, skinX, skinY);
    }

    const VScrollRef = useRef<HTMLDivElement>(null);
    const VScrollFuncRef = useRef<VScrollRef>(null);
    const DragBGFuncRef = useRef<DragBGRef>(null);

    function openBGSetting() {
        DragBGFuncRef.current?.openSetting();
    }

    if (globalContext == undefined || globalContext.loading) {
        return (
            <div className='stat'>
                <TopButtons backOnClick={back} homeBtn={true}></TopButtons>
            </div>
        )
    }

    const charInfo = globalContext.data.chars[char_id];
    const rank = globalContext.vars.char2rank[char_id];
    const totalRank = globalContext.vars.char2rank[globalContext.vars.ranked_chars[globalContext.vars.ranked_chars.length - 1].id];
    const charRankInfo = globalContext.vars.ranked_chars.find((obj: any) => obj.id == char_id);
    const rati = charRankInfo ? charRankInfo.rank.rati : 1500;
    const devi = charRankInfo ? charRankInfo.rank.devi : 350;
    const vola = charRankInfo ? charRankInfo.rank.vola : 0.06;
    const wins = charRankInfo ? charRankInfo.hist.wins : 0;
    const draw = charRankInfo ? charRankInfo.hist.draw : 0;
    const loss = charRankInfo ? charRankInfo.hist.loss : 0;

    const subProf = globalContext.data.sub_prof[charInfo.sub_prof];

    let logo: string = charInfo.nation;
    if (charInfo.team.length > 0)
        logo = charInfo.team;
    else if (charInfo.group.length > 0)
        logo = charInfo.group;

    return (
        <div className='stat'>
            {logo.length > 0 && <div className={"logo " + logo}></div>}
            <div className="in-shadow">
                <DraggableBackground className='skin-bg'
                    ref={DragBGFuncRef}
                    backgroundImage={skinImg}
                    h={skinH} x={skinX} y={skinY}
                    setH={setSkinH} setX={setSkinX} setY={setSkinY}
                    closeFunc={closeDragBgSetting}
                >
                    <TopButtons backOnClick={back} homeBtn={true} thirdBtn={
                        <CircleButton className='skin-pos-btn' squareBg={true}
                            onClick={openBGSetting}
                        >
                            <CrossArrow></CrossArrow>
                        </CircleButton>
                    }></TopButtons>

                    <div className='bottom-left-area'>
                        <Statistic rati={rati} devi={devi} vola={vola} wins={wins} draw={draw} loss={loss}></Statistic>
                        <NameOverlay
                            name={charInfo.name}
                            name2={charInfo.name2}
                            prof={charInfo.prof}
                            subProf={subProf}
                            position={charInfo.position}
                            tags={charInfo.tags}
                        ></NameOverlay>
                    </div>

                    <VerticalScroll alignDelay={250} _ref={VScrollRef} ref={VScrollFuncRef} className='right-area'>
                        <div className='right-grid'>
                            <Ranking rank={rank} total={totalRank}></Ranking>
                            <ExtendCard
                                trainsition={200}
                                sliderRef={VScrollRef} sliderFuncRef={VScrollFuncRef}
                                className='overall-ranking'
                                title={"Title Here 這是標題"}
                                infoContent={
                                    <>
                                        <p>Content Here 這是內容</p>
                                        <p>Content Here 這是內容</p>
                                        <p>Content Here 這是內容</p>
                                    </>
                                }
                                detailContent={
                                    <>
                                        <p>Content Here 這是內容</p>
                                        <p>Content Here 這是內容</p>
                                        <p>Content Here 這是內容</p>
                                        <p>Content Here 這是內容</p>
                                        <p>Content Here 這是內容</p>
                                        <ArrowButton>More</ArrowButton>
                                    </>
                                }
                            ></ExtendCard>
                            <ExtendCard sliderRef={VScrollRef} sliderFuncRef={VScrollFuncRef}
                                trainsition={200}
                                className='recent-battle'
                                title={<p>Title Here 這是標題</p>}
                                infoContent={
                                    <>
                                        <p>Content Here 這是內容</p>
                                        <p>Content Here 這是內容</p>
                                        <p>Content Here 這是內容</p>
                                    </>
                                }
                                detailContent={
                                    <>
                                        <p>Content Here 這是內容</p>
                                        <p>Content Here 這是內容</p>
                                        <p>Content Here 這是內容</p>
                                        <p>Content Here 這是內容</p>
                                        <p>Content Here 這是內容</p>
                                        <p>Content Here 這是內容</p>
                                        <p>Content Here 這是內容</p>
                                        <p>Content Here 這是內容</p>
                                        <p>Content Here 這是內容</p>
                                        <p>Content Here 這是內容</p>
                                    </>
                                }
                            ></ExtendCard>
                        </div>
                    </VerticalScroll>
                </DraggableBackground>
            </div>
        </div>
    );
}

export default Stat;