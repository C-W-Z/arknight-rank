import { useNavigate } from 'react-router-dom';
import './CharPrepare.css';
import TopButtons from '../../components/TopButtons';
import { HorizontalScroll } from '../../components/DraggableScroll';
import { CCIcon, CheckMark } from '../../components/SVGIcons';
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import useGlobalContext from '../../components/GlobalContext';

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
    initUnlockIdx: number;
    optionClass?: string[];
    btnClass?: string[];
    onClicks?: (() => void)[];
}

type UniqueOptionsRef = {
    unlockIdx: () => number;
}

const UniqueOptions = forwardRef<UniqueOptionsRef, UniqueOptionsProps>(({
    n,
    initUnlockIdx,
    optionClass = [],
    btnClass = [],
    onClicks = []
}: UniqueOptionsProps, ref) => {
    const [list, setList] = useState<JSX.Element[]>([]);
    const [unlock, setUnlock] = useState<number>(initUnlockIdx);

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
    initArray?: boolean[];
}

type ArrayOptionsRef = {
    select: () => boolean[];
}

const ArrayOptions = forwardRef<ArrayOptionsRef, ArrayOptionsProps>(({
    n,
    optionClass = [],
    btnClass = [],
    onClicks = [],
    initArray = []
}: ArrayOptionsProps, ref) => {
    if (initArray.length == 0)
        initArray = Array(n).fill(false);

    const [list, setList] = useState<JSX.Element[]>([]);
    const [select, setSelect] = useState<boolean[]>(initArray);

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
    initArray?: boolean[];
}

const ChainOptions = ({
    n,
    optionClass = [],
    btnClass = [],
    onClicks = [],
    initArray = []
}: ChainOptionsProps) => {
    if (initArray.length == 0)
        initArray = Array(n).fill(false);

    const [list, setList] = useState<JSX.Element[]>([]);
    const [select, setSelect] = useState<boolean[]>(initArray);

    function click(i: number) {
        return () => {
            let newSelect: boolean[];
            if (i == 0 && !select[0]) {
                for (let j = 0; j < Math.min(onClicks.length, n); j++)
                    onClicks[j]();
                newSelect = Array(n).fill(true);
            } else {
                if (onClicks.length > i)
                    onClicks[i]();
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
    defaultSelect?: boolean;
}

const BindingOptions = ({
    optionClass1 = '',
    optionClass2 = '',
    btnClass1 = '',
    btnClass2 = '',
    onClick1 = undefined,
    onClick2 = undefined,
    defaultSelect = true
}: BindingOptionsProps) => {
    const [select, setSelect] = useState<boolean>(defaultSelect);

    function click() {
        if (onClick1 !== undefined)
            onClick1();
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
            <button className={"option vline " + optionClass1} onClick={click}>
                <div className="bg"></div>
                <div className={'btn ' + btnClass1}></div>
                <div className="circle-checkmark">
                    <CheckMark></CheckMark>
                </div>
            </button>
            <button className={"option " + optionClass2} onClick={click}>
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
    const globalContext = useGlobalContext();
    const navigate = useNavigate();
    function back() {
        navigate('/terminal');
    }

    const playerCountRef = useRef<UniqueOptionsRef>(null);
    const rarityRef = useRef<ArrayOptionsRef>(null);
    const profRef = useRef<ArrayOptionsRef>(null);

    const [canBattle, setCanBattle] = useState(true);

    const [loading, setLoading] = useState(true);
    const [initPlayerCount, setInitPlayerCount] = useState(2);
    const [initRarity, setInitRarity] = useState<boolean[]>([]);
    const [initProf, setInitProf] = useState<boolean[]>([]);
    const [nationMap, setNationMap] = useState<any>(undefined);

    useEffect(() => {
        if (globalContext === undefined || globalContext.loading)
            return;

        const prepare = globalContext.vars.prefs.char_prepare_pref;
        setInitPlayerCount(prepare.player_count);
        setInitRarity(prepare.rarity);
        setInitProf(prepare.prof);
        setNationMap(prepare.nation_map);

        if (prepare.nation_map["kjerag"] || prepare.nation_map["karlan"])
            prepare.nation_map["kjerag"] = prepare.nation_map["karlan"] = true;
        else
            prepare.nation_map["kjerag"] = prepare.nation_map["karlan"] = false;

        setLoading(false);
    }, [globalContext?.loading]);

    function tryResetCanBattle() {
        setCanBattle(true);
    }

    function nationMapClick(nation: string) {
        return () => {
            nationMap[nation] = !nationMap[nation];
            tryResetCanBattle();
        };
    }

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

        globalContext?.prepareBattleChar(playerCount, rarity, prof, nationMap,
            () => navigate('/battle', { state: { playerCount: playerCount, } }),
            () => setCanBattle(false)
        );
    }

    if (loading)
        return (
            <div className="char-prepare">
                <div className="bottom-area">
                    <div className="footer">
                    </div>
                </div>
                <div className="in-shadow"></div>
                <div className="left-bar">
                </div>
                <TopButtons backOnClick={back} homeBtn={true}></TopButtons>
            </div>
        )

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
                        <UniqueOptions n={4} initUnlockIdx={initPlayerCount - 2} ref={playerCountRef}
                            optionClass={['hex', 'hex', 'hex', 'hex']}
                            btnClass={['num n2', 'num n3', 'num n4', 'num n5']}
                            onClicks={Array(4).fill(tryResetCanBattle)}
                        ></UniqueOptions>
                    </div>
                    <div className="options star-options">
                        <ArrayOptions n={6} initArray={initRarity} ref={rarityRef} btnClass={[
                            'rarity r1',
                            'rarity r2',
                            'rarity r3',
                            'rarity r4',
                            'rarity r5',
                            'rarity r6',
                        ]} onClicks={Array(6).fill(tryResetCanBattle)}></ArrayOptions>
                    </div>
                    <div className="options prof-options">
                        <ArrayOptions n={8} initArray={initProf} ref={profRef} btnClass={[
                            'class-img PIONEER',
                            'class-img WARRIOR',
                            'class-img TANK',
                            'class-img SNIPER',
                            'class-img CASTER',
                            'class-img MEDIC',
                            'class-img SUPPORT',
                            'class-img SPECIAL',
                        ]} onClicks={Array(8).fill(tryResetCanBattle)}></ArrayOptions>
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
                        ]} initArray={[
                            nationMap["rhodes"],
                            nationMap["sweep"],
                            nationMap["elite"],
                            nationMap["action4"],
                            nationMap["reserve1"],
                            nationMap["reserve4"],
                            nationMap["reserve6"],
                        ]} onClicks={[
                            nationMapClick("rhodes"),
                            nationMapClick("sweep"),
                            nationMapClick("elite"),
                            nationMapClick("action4"),
                            nationMapClick("reserve1"),
                            nationMapClick("reserve4"),
                            nationMapClick("reserve6"),
                        ]}></ChainOptions>
                        <div></div>
                        <Option btnClass='logo rainbow'
                            defaultSelect={nationMap["rainbow"]}
                            onClick={nationMapClick("rainbow")}
                        ></Option>
                        <ChainOptions n={2} btnClass={['logo egir', 'logo abyssal']}
                            initArray={[nationMap["egir"], nationMap["abyssal"]]}
                            onClicks={[nationMapClick("egir"), nationMapClick("abyssal")]}
                        ></ChainOptions>
                        <div></div>
                        <Option btnClass='logo babel'
                            defaultSelect={nationMap["babel"]}
                            onClick={nationMapClick("babel")}
                        ></Option>
                        <Option btnClass='logo bolivar'
                            defaultSelect={nationMap["bolivar"]}
                            onClick={nationMapClick("bolivar")}
                        ></Option>
                        <div></div>
                        <ChainOptions n={4} btnClass={[
                            'logo columbia',
                            'logo siesta',
                            'logo rhine',
                            'logo blacksteel',
                        ]} initArray={[
                            nationMap["columbia"],
                            nationMap["siesta"],
                            nationMap["rhine"],
                            nationMap["blacksteel"],
                        ]} onClicks={[
                            nationMapClick("columbia"),
                            nationMapClick("siesta"),
                            nationMapClick("rhine"),
                            nationMapClick("blacksteel"),
                        ]}></ChainOptions>
                        <div></div>
                        <Option btnClass='logo followers'
                            defaultSelect={nationMap["followers"]}
                            onClick={nationMapClick("followers")}
                        ></Option>
                        <Option btnClass='logo higashi'
                            defaultSelect={nationMap["higashi"]}
                            onClick={nationMapClick("higashi")}
                        ></Option>
                        <div></div>
                        <Option btnClass='logo iberia'
                            defaultSelect={nationMap["iberia"]}
                            onClick={nationMapClick("iberia")}
                        ></Option>
                        <div></div>
                        <ChainOptions n={2} btnClass={['logo kazimierz', 'logo pinus']}
                            initArray={[nationMap["kazimierz"], nationMap["pinus"]]}
                            onClicks={[nationMapClick("kazimierz"), nationMapClick("pinus")]}
                        ></ChainOptions>
                        <BindingOptions btnClass1='logo kjerag' btnClass2='logo karlan'
                            onClick1={nationMapClick("kjerag")} onClick2={nationMapClick("karlan")}
                            defaultSelect={nationMap["kjerag"] || nationMap["karlan"]}
                        ></BindingOptions>
                        <Option btnClass='logo laterano'
                            defaultSelect={nationMap["laterano"]}
                            onClick={nationMapClick("laterano")}
                        ></Option>
                        <div></div>
                        <Option btnClass='logo leithanien'
                            defaultSelect={nationMap["leithanien"]}
                            onClick={nationMapClick("leithanien")}
                        ></Option>
                        <div></div>
                        <ChainOptions n={2} btnClass={['logo yan', 'logo sui']}
                            initArray={[nationMap["yan"], nationMap["sui"]]}
                            onClicks={[nationMapClick("yan"), nationMapClick("sui")]}
                        ></ChainOptions>
                        <ChainOptions n={4} btnClass={[
                            'logo lungmen',
                            'logo lgd',
                            'logo lee',
                            'logo penguin',
                        ]} initArray={[
                            nationMap["lungmen"],
                            nationMap["lgd"],
                            nationMap["lee"],
                            nationMap["penguin"],
                        ]} onClicks={[
                            nationMapClick("lungmen"),
                            nationMapClick("lgd"),
                            nationMapClick("lee"),
                            nationMapClick("penguin"),
                        ]}></ChainOptions>
                        <Option btnClass='logo minos'
                            defaultSelect={nationMap["minos"]}
                            onClick={nationMapClick("minos")}
                        ></Option>
                        <div></div>
                        <Option btnClass='logo rim'
                            defaultSelect={nationMap["rim"]}
                            onClick={nationMapClick("rim")}
                        ></Option>
                        <div></div>
                        <Option btnClass='logo sami'
                            defaultSelect={nationMap["sami"]}
                            onClick={nationMapClick("sami")}
                        ></Option>
                        <div></div>
                        <Option btnClass='logo sargon'
                            defaultSelect={nationMap["sargon"]}
                            onClick={nationMapClick("sargon")}
                        ></Option>
                        <div></div>
                        <ChainOptions n={2} btnClass={['logo siracusa', 'logo chiave']}
                            initArray={[nationMap["siracusa"], nationMap["chiave"]]}
                            onClicks={[nationMapClick("siracusa"), nationMapClick("chiave")]}
                        ></ChainOptions>
                        <ChainOptions n={2} btnClass={['logo ursus', 'logo student']}
                            initArray={[nationMap["ursus"], nationMap["student"]]}
                            onClicks={[nationMapClick("ursus"), nationMapClick("student")]}
                        ></ChainOptions>
                        <ChainOptions n={3} btnClass={[
                            'logo victoria',
                            'logo glasgow',
                            'logo dublinn',
                        ]} initArray={[
                            nationMap["victoria"],
                            nationMap["glasgow"],
                            nationMap["dublinn"],
                        ]} onClicks={[
                            nationMapClick("victoria"),
                            nationMapClick("glasgow"),
                            nationMapClick("dublinn"),
                        ]}></ChainOptions>
                        <Option className='hex' btnClass='logo other'
                            defaultSelect={nationMap["other"]}
                            onClick={nationMapClick("other")}
                        ></Option>
                    </div>
                </HorizontalScroll>
            </div>
            <div className="bottom-area">
                <div className="footer">
                    <button className='start' disabled={!canBattle}
                        onClick={canBattle ? startBattle : undefined}
                    >
                        <CCIcon></CCIcon>
                        <div className="text">{canBattle ? "比赛开始" : "干员数量不足"}</div>
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