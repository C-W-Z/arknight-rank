import React, { useEffect, useRef, useState } from 'react';
import './Stat.css';
import ProgressBar from '../components/ProgressBar';
import ProgressCircle from '../components/ProgressCircle';
import VerticalScroll, { VScrollRef } from '../components/DraggableScroll';
import ExtendCard from '../components/ExtendCard';
import BackButton from '../components/BackButton';
import { loadImage } from '../utils/LoadResources';
import ArrowButton from '../components/ArrowButton';

interface NameOverlayProps {
    name: string;
    name2: string;
}

function NameOverlay({ name, name2 }: NameOverlayProps) {

    // const starImg = require('../assets/star/star_6.png');
    // const classImg = require('../assets/class/class_medic.png');

    const [starImg, setStarImg] = useState<string | undefined>(undefined);
    const [classImg, setClassImg] = useState<string | undefined>(undefined);

    useEffect(() => {
        const loadImg = async () => {
            const src1 = await loadImage('assets/star/star_6.png');
            const src2 = await loadImage('assets/class/class_medic.png');
            setStarImg(src1);
            setClassImg(src2);
        };
        loadImg();
    }, []);

    return (
        <div className="name-overlay">
            <img src={starImg} alt='star_6' className='star' />
            <div className='name2'>{name2}</div>
            <div className='name'>{name}</div>
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
    const name = "凯尔希";
    const name2 = "Kal'tsit";

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
    const VScrollRef2 = useRef<VScrollRef>(null);

    return (
        <div className='stat'>
            <div className='skin-bg' style={{ backgroundImage: `url(${backgroundImage})` }}>

                <div className='main-area'>
                    <BackButton></BackButton>

                    <div className='bottom-left-area'>
                        <Statistic rati={1500} devi={350} vola={0.06} wins={7} draw={1} loss={2}></Statistic>
                        <NameOverlay name={name} name2={name2}></NameOverlay>
                    </div>

                </div>

                <VerticalScroll _ref={VScrollRef} ref={VScrollRef2} className='right-area'>
                    <div className='right-grid'>
                        <Ranking rank={108} total={331}></Ranking>
                        <ExtendCard
                            sliderRef={VScrollRef} sliderFuncRef={VScrollRef2}
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
                        <ExtendCard sliderRef={VScrollRef} sliderFuncRef={VScrollRef2}
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

            </div>
        </div>
    );
}

export default Stat;