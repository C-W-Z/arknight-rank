import React, { RefObject, useEffect, useRef, useState } from 'react';
import './CharList.css'
import { Star } from '../components/SVGIcons';
import TopButtons from '../components/TopButtons';
import { loadImage } from '../utils/LoadResources';
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
}

function CharCard({
    char_id,
    name,
    rarity,
    rank,
    total_rank,
    sliderFuncRef,
    portraitId,
    prof
}: CharCardProps) {
    const navigate = useNavigate();

    const [portrait, setPortrait] = useState<string | undefined>(undefined);

    useEffect(() => {
        const loadImg = async () => {
            const src = await loadImage(`assets/portrait/${portraitId}.webp`);
            setPortrait(src);
        };
        loadImg();
    }, []);

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
                char_id: char_id
            }
        });
    }

    return (
        <div className={"charcard " + "r" + rarity}
            onMouseDown={onMouseDown} onMouseMove={onMouseMove} onMouseUp={onMouseUp}
        >
            <img src={portrait} alt="portrait" className='portrait' />
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

    const HScrollFuncRef = useRef<HScrollRef>(null);

    const [list, setList] = useState<JSX.Element[]>([]);

    useEffect(() => {
        if (globalContext === undefined || globalContext.loading)
            return;

        let cards = [];
        for (let i = 0; i < globalContext.vars.ranked_chars.length; i++) {
            const char_id = globalContext.vars.ranked_chars[i].id;
            const rank = globalContext.vars.char2rank[char_id];
            const charInfo = globalContext.data.chars[char_id];
            const skin_id = globalContext.data.char2skin[char_id].e0;
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
                    total_rank={globalContext.vars.ranked_chars.length}
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
    }, [globalContext?.loading]);

    if (globalContext === undefined || globalContext.loading) {
        return (
            <div className='charlist'>
                <div className='out-area'>
                    <TopButtons backOnClick={back} homeBtn={true}></TopButtons>
                </div>
            </div>
        )
    }

    return (
        <div className='charlist'>
            <div className='out-area'>
                <TopButtons backOnClick={back} homeBtn={true}></TopButtons>
            </div>
            <HorizontalScroll alignDelay={100} className="list-area" ref={HScrollFuncRef}>
                <div className="list-grid">
                    {list}
                </div>
            </HorizontalScroll>
        </div>
    )
}

export default CharList;