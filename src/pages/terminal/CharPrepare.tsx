import { useNavigate } from 'react-router-dom';
import './CharPrepare.css';
import TopButtons from '../../components/TopButtons';
import { HorizontalScroll } from '../../components/DraggableScroll';
import { CCIcon, CheckMark } from '../../components/SVGIcons';
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';

interface OptionProps {
    className?: string;
    btnClass?: string;
    onClick?: () => void;
    defaultSelect?: boolean;
}

function Option({
    className = '',
    btnClass = '',
    onClick = undefined,
    defaultSelect = true
}: OptionProps) {
    const [select, setSelect] = useState(defaultSelect);

    function click() {
        if (onClick !== undefined)
            onClick();
        setSelect(!select);
    }

    if (select)
        className += ' select';

    return (
        <button className={"option " + className} onClick={click}>
            <div className="bg"></div>
            <div className={'btn ' + btnClass}></div>
            <div className="circle-checkmark">
                <CheckMark></CheckMark>
            </div>
        </button>
    )
}

interface UniqueOptionsProps {
    n: number;
    unlockIdx: number;
    optionClass?: string[];
    btnClass?: string[];
    onClicks?: (() => void)[];
}

type UniqueOptionsRef = {
    unlockIdx: () => number;
}

const UniqueOptions = forwardRef<UniqueOptionsRef, UniqueOptionsProps>(({
    n,
    unlockIdx,
    optionClass = [],
    btnClass = [],
    onClicks = []
}: UniqueOptionsProps, ref) => {
    const [list, setList] = useState<JSX.Element[]>([]);
    const [unlock, setUnlock] = useState<number>(unlockIdx);

    function click(i: number) {
        return () => {
            if (unlock == i)
                return;
            if (onClicks.length > i)
                onClicks[i]();
            setUnlock(i);
        }
    }

    useImperativeHandle(ref, () => ({
        unlockIdx() { return unlock; }
    }));

    useEffect(() => {
        const arr: JSX.Element[] = [];
        for (let i = 0; i < n; i++) {
            const cname1 = optionClass.length > i ? optionClass[i] : '';
            const cname2 = unlock == i ? 'unlock select' : 'lock';
            const cname3 = (i == n - 1) ? '' : ' hline';
            const bname = btnClass.length > i ? btnClass[i] : '';
            arr.push(
                <button key={i} className={cname2 + cname3 + " option " + cname1} onClick={click(i)}>
                    <div className="bg"></div>
                    <div className={'btn ' + bname}></div>
                    <div className="circle-checkmark">
                        <CheckMark></CheckMark>
                    </div>
                </button>
            )
        }
        setList(arr);
    }, [unlock]);

    return <>{list}</>;
});

interface ArrayOptionsProps {
    n: number;
    optionClass?: string[];
    btnClass?: string[];
    onClicks?: (() => void)[];
}

type ArrayOptionsRef = {
    select: () => boolean[];
}

const ArrayOptions = forwardRef<ArrayOptionsRef, ArrayOptionsProps>(({
    n,
    optionClass = [],
    btnClass = [],
    onClicks = []
}: ArrayOptionsProps, ref) => {
    const [list, setList] = useState<JSX.Element[]>([]);
    const [select, setSelect] = useState<boolean[]>(Array(n).fill(true));

    function click(i: number) {
        return () => {
            if (onClicks.length > i)
                onClicks[i]();
            const newSelect = Array.from(select);
            newSelect[i] = !select[i];
            setSelect(newSelect);
        }
    }

    useImperativeHandle(ref, () => ({
        select() { return select; }
    }));

    useEffect(() => {
        const arr: JSX.Element[] = [];
        for (let i = 0; i < n; i++) {
            const cname1 = optionClass.length > i ? optionClass[i] : '';
            const cname2 = select[i] ? 'select' : '';
            const bname = btnClass.length > i ? btnClass[i] : '';
            arr.push(
                <button key={i} className={cname2 + " option " + cname1} onClick={click(i)}>
                    <div className="bg"></div>
                    <div className={'btn ' + bname}></div>
                    <div className="circle-checkmark">
                        <CheckMark></CheckMark>
                    </div>
                </button>
            )
        }
        setList(arr);
    }, [select]);

    return <>{list}</>;
});

interface ChainOptionsProps {
    n: number;
    optionClass?: string[];
    btnClass?: string[];
    onClicks?: (() => void)[];
}

const ChainOptions = ({
    n,
    optionClass = [],
    btnClass = [],
    onClicks = []
}: ChainOptionsProps) => {
    const [list, setList] = useState<JSX.Element[]>([]);
    const [select, setSelect] = useState<boolean[]>(Array(n).fill(true));

    function click(i: number) {
        return () => {
            console.log("click");
            if (onClicks.length > i)
                onClicks[i]();
            let newSelect: boolean[];
            if (i == 0 && !select[0])
                newSelect = Array(n).fill(true);
            else {
                newSelect = Array.from(select);
                newSelect[i] = !select[i];
            }
            setSelect(newSelect);
        }
    }

    useEffect(() => {
        const arr: JSX.Element[] = [];
        for (let i = 0; i < n; i++) {
            if (i >= 2)
                arr.push(<div key={n + i}></div>);
            const cname1 = optionClass.length > i ? optionClass[i] : '';
            const cname2 = select[i] ? 'select' : '';
            const cname3 = i == 0 ? ' vline' : '';
            const cname4 = i > 0 && i < n - 1 ? ' hline' : '';
            const bname = btnClass.length > i ? btnClass[i] : '';
            arr.push(
                <button key={i} className={cname2 + cname3 + cname4 + " option " + cname1} onClick={click(i)}>
                    <div className="bg"></div>
                    <div className={'btn ' + bname}></div>
                    <div className="circle-checkmark">
                        <CheckMark></CheckMark>
                    </div>
                </button>
            )
        }
        setList(arr);
    }, [select]);

    return <>{list}</>;
}

interface BindingOptionsProps {
    optionClass1?: string;
    optionClass2?: string;
    btnClass1?: string;
    btnClass2?: string;
    onClick1?: () => void;
    onClick2?: () => void;
}

const BindingOptions = ({
    optionClass1 = '',
    optionClass2 = '',
    btnClass1 = '',
    btnClass2 = '',
    onClick1 = undefined,
    onClick2 = undefined,
}: BindingOptionsProps) => {
    const [select, setSelect] = useState<boolean>(true);

    function click1() {
        if (onClick1 !== undefined)
            onClick1();
        setSelect(!select);
    }

    function click2() {
        if (onClick2 !== undefined)
            onClick2();
        setSelect(!select);
    }

    if (select) {
        optionClass1 += ' select';
        optionClass2 += ' select';
    }

    return (
        <>
            <button className={"option vline " + optionClass1} onClick={click1}>
                <div className="bg"></div>
                <div className={'btn ' + btnClass1}></div>
                <div className="circle-checkmark">
                    <CheckMark></CheckMark>
                </div>
            </button>
            <button className={"option " + optionClass2} onClick={click2}>
                <div className="bg"></div>
                <div className={'btn ' + btnClass2}></div>
                <div className="circle-checkmark">
                    <CheckMark></CheckMark>
                </div>
            </button>
        </>
    )
}

function CharPrepare() {
    const navigate = useNavigate();
    function back() {
        navigate('/terminal');
    }

    const playerCountRef = useRef<UniqueOptionsRef>(null);
    const rarityRef = useRef<ArrayOptionsRef>(null);
    const profRef = useRef<ArrayOptionsRef>(null);

    function startBattle() {
        let playerCount = 2, rarity: boolean[], prof: boolean[];
        if (playerCountRef.current)
            playerCount += playerCountRef.current?.unlockIdx();
        if (rarityRef.current)
            rarity = rarityRef.current.select();
        else
            rarity = Array(6).fill(true);
        if (profRef.current)
            prof = profRef.current.select();
        else
            prof = Array(8).fill(true);

        console.log(playerCount, rarity, prof);

        navigate('/battle', {
            state: {
                playerCount: playerCount,
                rarity: rarity,
            }
        });
    }

    return (
        <div className="char-prepare">
            <div className="select-area">
                <div className="header">
                    <div>
                        <div className="box text">人数</div>
                        <div className="box">
                            <div className="text">稀有度</div>
                            <button className='select-all'></button>
                        </div>
                        <div className="box">
                            <div className="text">职业</div>
                            <button className='select-all'></button>
                        </div>
                        <div className="box">
                            <div className="text">国家/组织</div>
                            <button className='select-all'></button>
                        </div>
                    </div>
                </div>
                <HorizontalScroll className='select-box'>
                    <div className='options num-options'>
                        <UniqueOptions n={4} unlockIdx={0} ref={playerCountRef}
                            optionClass={['hex', 'hex', 'hex', 'hex']}
                            btnClass={['num n2', 'num n3', 'num n4', 'num n5']}
                        ></UniqueOptions>
                    </div>
                    <div className="options star-options">
                        <ArrayOptions n={6} ref={rarityRef} btnClass={[
                            'rarity r1',
                            'rarity r2',
                            'rarity r3',
                            'rarity r4',
                            'rarity r5',
                            'rarity r6',
                        ]}></ArrayOptions>
                    </div>
                    <div className="options prof-options">
                        <ArrayOptions n={8} ref={profRef} btnClass={[
                            'class-img PIONEER',
                            'class-img WARRIOR',
                            'class-img TANK',
                            'class-img SNIPER',
                            'class-img CASTER',
                            'class-img MEDIC',
                            'class-img SUPPORT',
                            'class-img SPECIAL',
                        ]}></ArrayOptions>
                    </div>
                    <div className="options camp-options">
                        <ChainOptions n={7} btnClass={[
                            'logo rhodes',
                            'logo sweep',
                            'logo elite',
                            'logo action4',
                            'logo reserve1',
                            'logo reserve4',
                            'logo reserve6',
                        ]}></ChainOptions>
                        <div></div>
                        <Option btnClass='logo rainbow'></Option>
                        <ChainOptions n={2} btnClass={['logo egir', 'logo abyssal']}></ChainOptions>
                        <div></div>
                        <Option btnClass='logo babel'></Option>
                        <Option btnClass='logo bolivar'></Option>
                        <div></div>
                        <ChainOptions n={4} btnClass={[
                            'logo columbia',
                            'logo siesta',
                            'logo rhine',
                            'logo blacksteel',
                        ]}></ChainOptions>
                        <div></div>
                        <Option btnClass='logo followers'></Option>
                        <Option btnClass='logo higashi'></Option>
                        <div></div>
                        <Option btnClass='logo iberia'></Option>
                        <div></div>
                        <ChainOptions n={2} btnClass={['logo kazimierz', 'logo pinus']}></ChainOptions>
                        <BindingOptions btnClass1='logo kjerag' btnClass2='logo karlan'></BindingOptions>
                        <Option btnClass='logo laterano'></Option>
                        <div></div>
                        <Option btnClass='logo leithanien'></Option>
                        <div></div>
                        <ChainOptions n={2} btnClass={['logo yan', 'logo sui']}></ChainOptions>
                        <ChainOptions n={4} btnClass={[
                            'logo lungmen',
                            'logo lgd',
                            'logo lee',
                            'logo penguin',
                        ]}></ChainOptions>
                        <Option btnClass='logo minos' ></Option>
                        <div></div>
                        <Option btnClass='logo rim' ></Option>
                        <div></div>
                        <Option btnClass='logo sami' ></Option>
                        <div></div>
                        <Option btnClass='logo sargon' ></Option>
                        <div></div>
                        <ChainOptions n={2} btnClass={['logo siracusa', 'logo chiave']}></ChainOptions>
                        <ChainOptions n={2} btnClass={['logo ursus', 'logo student']}></ChainOptions>
                        <ChainOptions n={3} btnClass={[
                            'logo victoria',
                            'logo glasgow',
                            'logo dublinn',
                        ]}></ChainOptions>
                    </div>
                </HorizontalScroll>
            </div>
            <div className="bottom-area">
                <div className="footer">
                    <button className='start' onClick={startBattle}>
                        <CCIcon></CCIcon>
                        <div className="text">比赛开始</div>
                    </button>
                </div>
            </div>
            <div className="in-shadow"></div>
            <div className="left-bar">
                <div className="rate-area">
                    <CCIcon></CCIcon>
                    <div className="clip"></div>
                    <div className="rating"></div>
                </div>
            </div>
            <TopButtons backOnClick={back} homeBtn={true}></TopButtons>
        </div>
    )
}

export default CharPrepare;