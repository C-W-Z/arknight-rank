import React, { useEffect, useRef, useState } from 'react';
import './Stat.css';
import ProgressBar from '../components/ProgressBar';
import ProgressCircle from '../components/ProgressCircle';
import VerticalScroll, { VScrollRef } from '../components/DraggableScroll';
import ExtendCard from '../components/ExtendCard';
import TopButtons from '../components/TopButtons';
import { loadImage } from '../utils/LoadResources';
import ArrowButton from '../components/ArrowButton';
import DraggableBackground, { DragBGRef } from '../components/DraggableBackground';
import CircleButton from '../components/CircleButton';
import { CrossArrow, Star } from '../components/SVGIcons';
import { useLocation, useNavigate } from 'react-router-dom';

interface NameOverlayProps {
    name: string;
    name2: string;
}

function NameOverlay({ name, name2 }: NameOverlayProps) {

    // const classImg = require('../assets/class/class_medic.png');
    const [classImg, setClassImg] = useState<string | undefined>(undefined);

    useEffect(() => {
        const loadImg = async () => {
            const src2 = await loadImage('assets/class/class_medic.png');
            setClassImg(src2);
        };
        loadImg();
    }, []);

    let nameSize = '4em';
    if (name.length == 5)
        nameSize = '3.8em';
    else if (name.length == 6)
        nameSize = '3.15em';
    else if (name.length == 7)
        nameSize = '2.7em';
    else if (name.length == 8)
        nameSize = '2.35em';
    else if (name.length > 8)
        nameSize = '2em';

    let nameSize2 = '1.5em';
    if (name.length >= 32)
        nameSize2 = '1em';
    if (name.length >= 28)
        nameSize2 = '1.2em';

    return (
        <div className="name-overlay">
            <Star num={6} color={'#ffffff'}></Star>
            <div className='name2' style={{ fontSize: nameSize2 }}>{name2}</div>
            <div className='name' style={{ fontSize: nameSize }}>{name}</div>
            <div className='class-tags'>
                <img src={classImg} alt="class_medic" className='class-img' />
                <div className='class-name'>医师</div>
                <div className='position-type'>远程位</div>
                <div className='tags'>召唤 治疗</div>
            </div>
        </div>
    )
}

function StatisticDetail(className: string = "", icon_word: string, word: string, num: number, max: number, to_fixed: number = 0) {
    return (
        <div className={"detail-item " + className}>
            <div className='detail-icon'>{icon_word}</div>
            <div className='extend-word'>{word}</div>
            <ProgressBar className={'detail-number'} value={num} max={max}>
                {num.toFixed(to_fixed)}
            </ProgressBar>
        </div>
    )
}

function WinrateBar(percent: number) {
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

    return (
        <div className={className} onClick={toggleClose}>
            <div className='rank-title'>Statistic »</div>
            {StatisticDetail('rati', 'μ', 'Rating', s.rati, 5000, 2)}
            {StatisticDetail('devi', 'φ', 'Deviation', s.devi, 1000, 2)}
            {StatisticDetail('vola', 'σ', 'Volatility', s.vola, 0.1, 4)}
            {StatisticDetail('wins', '▲', 'Wins', s.wins, 100)}
            {StatisticDetail('draw', '▶', 'Draws', s.loss, 100)}
            {StatisticDetail('loss', '▼', 'Losses', s.draw, 100)}
            {WinrateBar(100 * s.wins / (s.wins + s.draw + s.loss))}
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
            <ProgressCircle value={1 - (rank - 1) / total} size={"5.2em"}>
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

    const navigate = useNavigate();
    const { state } = useLocation();

    const { name, name2 } = state;
    // const name = "凯尔希";
    // const name2 = "Kal'tsit";

    // const backgroundImage = require('../assets/skin/char_003_kalts_boc_6b.png');
    const [backgroundImage, setBackgroundImage] = useState<string | undefined>(undefined);

    useEffect(() => {
        const loadImg = async () => {
            const src = await loadImage('assets/skin/char_003_kalts_boc_6b.png');
            setBackgroundImage(src);
        };
        loadImg();
    }, []);

    const VScrollRef = useRef<HTMLDivElement>(null);
    const VScrollFuncRef = useRef<VScrollRef>(null);
    const DragBGFuncRef = useRef<DragBGRef>(null);

    function openBGSetting() {
        DragBGFuncRef.current?.openSetting();
    }

    return (
        <div className='stat'>
            <DraggableBackground className='skin-bg' backgroundImage={backgroundImage} ref={DragBGFuncRef}>
                <div className='main-area'>

                    <TopButtons homeBtn={true} homeOnClick={() => navigate('/')} thirdBtn={
                        <CircleButton className='skin-pos-btn' squareBg={true}
                            onClick={openBGSetting}
                        >
                            <CrossArrow></CrossArrow>
                        </CircleButton>
                    }></TopButtons>

                    <div className='bottom-left-area'>
                        <Statistic rati={1500} devi={350} vola={0.06} wins={7} draw={1} loss={2}></Statistic>
                        <NameOverlay name={name} name2={name2}></NameOverlay>
                    </div>

                </div>

                <VerticalScroll alignDelay={250} _ref={VScrollRef} ref={VScrollFuncRef} className='right-area'>
                    <div className='right-grid'>
                        <Ranking rank={108} total={331}></Ranking>
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
    );
}

export default Stat;