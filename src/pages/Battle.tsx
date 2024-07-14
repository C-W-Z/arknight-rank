import { useEffect, useState } from 'react';
import './Battle.css'
import { CheckMark, OKSquare, Star } from '../components/SVGIcons';
import { invoke } from '@tauri-apps/api/tauri';
import useGlobalContext from '../components/GlobalContext';
import AutoSizeText from '../components/AutoSizeText';
import TopButtons from '../components/TopButtons';

interface CandidateProps {
    className?: string;
    name: string;
    rarity: number;
    elite: number;
    portraitId: string;
    prof: string;
    onClick?: React.MouseEventHandler<HTMLDivElement>
}

function Candidate({
    className = "",
    name,
    rarity,
    elite,
    portraitId,
    prof,
    onClick
}: CandidateProps) {

    return (
        <div className={"candidate " + className} onClick={onClick}>
            <div className='bg-text'>OPERATOR</div>
            <div className={"portrait " + portraitId}></div>
            <div className="in-shadow"></div>
            <div className="header">OPERATOR</div>
            <div className="info">
                <div className={"prof-img " + prof}></div>
                <Star num={rarity} color={'#ffffff'}></Star>
                <AutoSizeText className='name'>{name}</AutoSizeText>
                <div className={"elite " + "e" + elite}></div>
            </div>
            <div className="bottom-text">
                <div className="text">CURRENT   SELECTION</div>
            </div>
        </div>
    )
}

function Battle() {
    const playerCount = 5;
    const globalContext = useGlobalContext();

    const [className, setClassName] = useState<string[]>(['', '', '', '', '']);
    const [confirmShow, setConfirmShow] = useState(false);
    const [choosedDraw, setChoosedDraw] = useState(false);
    const [unchoosedDraw, setUnchoosedDraw] = useState(false);
    const [allDraw, setAllDraw] = useState(false);

    function clickChoosedDraw() {
        if (allDraw)
            return;
        setChoosedDraw(!choosedDraw);
    }

    function clickUnchoosedDraw() {
        setUnchoosedDraw(!unchoosedDraw);
    }

    function OnChoose(i: number) {
        return () => {
            let copy = Array.from(className);
            if (copy[i] == '') {
                copy[i] = 'choose';
                for (let j = 0; j < playerCount; j++)
                    if (i != j)
                        copy[j] = 'unchoose';
                setConfirmShow(true);
            }
            else if (copy[i] == 'unchoose') {
                copy[i] = 'choose';
                let chooseCount = 0;
                for (let j = 0; j < playerCount; j++)
                    if (copy[j] == 'choose')
                        chooseCount++;
                if (chooseCount == playerCount) {
                    setChoosedDraw(true);
                    setAllDraw(true);
                }
            }
            else if (copy[i] == 'choose') {
                copy[i] = 'unchoose';
                let unchooseCount = 0;
                for (let j = 0; j < playerCount; j++)
                    if (copy[j] == 'unchoose')
                        unchooseCount++;
                if (unchooseCount == playerCount) {
                    for (let j = 0; j < playerCount; j++)
                        copy[j] = '';
                    setConfirmShow(false);
                }
                if (allDraw)
                    setAllDraw(false);
            }
            setClassName(copy);
        }
    }

    let battleNum = 0;
    const [show, setShow] = useState<boolean>(true);
    const [char_ids, setCharIds] = useState<string[]>([]);
    function pickChars() {
        invoke('pick_chars', { n: playerCount })
            .then((chars: any) => {
                // console.log(chars);
                battleNum += 1;
                setCharIds(chars);
                setClassName(['', '', '', '', '']);
                // restart animation & set font size
                setShow(false);
                setTimeout(() => {
                    setShow(true);
                }, 0);
                // reset
                setConfirmShow(false);
                setAllDraw(false);
            })
            .catch((e) => { console.error(e) });
    }

    useEffect(() => {
        pickChars();
    }, []);

    const [candidates, setCandidates] = useState<JSX.Element[]>([]);
    useEffect(() => {
        if (globalContext === undefined || globalContext.loading || char_ids.length < playerCount)
            return;

        let list = [];
        for (let i = 0; i < playerCount; i++) {
            const charInfo = globalContext.data.chars[char_ids[i]];
            const skin_id = globalContext.vars.prefs.stat_pref[char_ids[i]].skin_id;
            const portrait_id = globalContext.data.skins[skin_id].portrait_id;

            list.push(
                <Candidate key={battleNum.toString() + i}
                    className={className[i]}
                    onClick={OnChoose(i)}
                    name={charInfo.name}
                    rarity={charInfo.rarity + 1}
                    elite={2}
                    portraitId={portrait_id}
                    prof={charInfo.prof}
                ></Candidate>
            );
        }
        setCandidates(list);
    }, [globalContext?.loading, char_ids, className]);

    const confirmClass = confirmShow ? 'confirm' : 'confirm close';
    const chooseDrawClass = allDraw ? 'checkbox alldraw' : 'checkbox';

    return (
        <div className='battle'>
            <TopButtons></TopButtons>
            <div className="title">请选择最喜欢的干员 (可复选)</div>
            <div className="candidate-area">
                {show && candidates}
            </div>
            <div className="checkboxes">
                <label className={chooseDrawClass}>
                    <input type="checkbox"
                        checked={choosedDraw}
                        onChange={clickChoosedDraw}
                    />
                    <span><CheckMark></CheckMark></span>
                    选中者之间视为平手
                </label>
                {playerCount > 2 &&
                    <label className="checkbox">
                        <input type="checkbox"
                            checked={unchoosedDraw}
                            onChange={clickUnchoosedDraw}
                        />
                        <span><CheckMark></CheckMark></span>
                        落选者之间视为平手
                    </label>
                }
            </div>
            <button className={confirmClass} onClick={pickChars}>
                <OKSquare></OKSquare>
                {allDraw ? '确认平手' : '确认选择'}
            </button>
        </div>
    )
}

export default Battle;