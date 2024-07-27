import { useNavigate } from 'react-router-dom';
import './CharPrepair.css';
import TopButtons from '../../components/TopButtons';
import { HorizontalScroll } from '../../components/DraggableScroll';
import { CCIcon, CheckMark } from '../../components/SVGIcons';
import { useState } from 'react';

interface OptionProps {
    className?: string;
    btnClass?: string;
}

function Option({ className = '', btnClass = '' }: OptionProps) {
    const [select, setSelect] = useState(true);

    if (select)
        className += ' select';

    return (
        <div className={"option " + className}>
            <div className="bg"></div>
            <button className={'btn ' + btnClass} onClick={() => setSelect(!select)}></button>
            <div className="circle-checkmark">
                <CheckMark></CheckMark>
            </div>
        </div>
    )
}

function CharPrepair() {
    const navigate = useNavigate();
    function back() {
        navigate('/terminal');
    }

    function nagivateCharBattle2() {
        navigate('/battle', { state: { playerCount: 2 } });
    }

    return (
        <div className="char-prepair">
            <div className="select-area">
                <div className="header"></div>
                <HorizontalScroll className='select-box'>
                    <div className="star-options">
                        <Option btnClass='r1'></Option>
                        <Option btnClass='r2'></Option>
                        <Option btnClass='r3'></Option>
                        <Option btnClass='r4'></Option>
                        <Option btnClass='r5'></Option>
                        <Option btnClass='r6'></Option>
                    </div>
                    <div className="prof-options">
                        <Option btnClass='class-img PIONEER'></Option>
                        <Option btnClass='class-img WARRIOR'></Option>
                        <Option btnClass='class-img TANK'></Option>
                        <Option btnClass='class-img SNIPER'></Option>
                        <Option btnClass='class-img CASTER'></Option>
                        <Option btnClass='class-img MEDIC'></Option>
                        <Option btnClass='class-img SUPPORT'></Option>
                        <Option btnClass='class-img SPECIAL'></Option>
                    </div>
                    <div className="camp-options">
                        <Option btnClass='logo rhodes' className='vline'></Option>
                        <Option btnClass='logo sweep' className='hline'></Option>
                        <div></div>
                        <Option btnClass='logo elite' className='hline'></Option>
                        <div></div>
                        <Option btnClass='logo action4' className='hline'></Option>
                        <div></div>
                        <Option btnClass='logo reserve1' className='hline'></Option>
                        <div></div>
                        <Option btnClass='logo reserve4' className='hline'></Option>
                        <div></div>
                        <Option btnClass='logo reserve6'></Option>

                        <div></div>
                        <Option btnClass='logo rainbow'></Option>

                        
                        <Option btnClass='logo egir' className='vline'></Option>
                        <Option btnClass='logo abyssal'></Option>

                        <div></div>
                        <Option btnClass='logo babel'></Option>

                        <Option btnClass='logo bolivar'></Option>
                        <div></div>

                        <Option btnClass='logo columbia' className='vline'></Option>
                        <Option btnClass='logo siesta' className='hline'></Option>
                        <div></div>
                        <Option btnClass='logo rhine' className='hline'></Option>
                        <div></div>
                        <Option btnClass='logo blacksteel'></Option>

                        <div></div>
                        <Option btnClass='logo followers'></Option>

                        <Option btnClass='logo higashi'></Option>
                        <div></div>

                        <Option btnClass='logo iberia'></Option>
                        <div></div>

                        <Option btnClass='logo kazimierz' className='vline'></Option>
                        <Option btnClass='logo pinus'></Option>

                        <Option btnClass='logo kjerag' className='vline'></Option>
                        <Option btnClass='logo karlan'></Option>

                        <Option btnClass='logo laterano'></Option>
                        <div></div>

                        <Option btnClass='logo leithanien'></Option>
                        <div></div>

                        <Option btnClass='logo yan' className='vline'></Option>
                        <Option btnClass='logo sui'></Option>

                        <Option btnClass='logo lungmen' className='vline'></Option>
                        <Option btnClass='logo lgd' className='hline'></Option>
                        <div></div>
                        <Option btnClass='logo lee' className='hline'></Option>
                        <div></div>
                        <Option btnClass='logo penguin' ></Option>

                        <Option btnClass='logo minos' ></Option>
                        <div></div>

                        <Option btnClass='logo rim' ></Option>
                        <div></div>

                        <Option btnClass='logo sami' ></Option>
                        <div></div>

                        <Option btnClass='logo sargon' ></Option>
                        <div></div>

                        <Option btnClass='logo siracusa' className='vline'></Option>
                        <Option btnClass='logo chiave'></Option>

                        <Option btnClass='logo ursus' className='vline'></Option>
                        <Option btnClass='logo student'></Option>

                        <Option btnClass='logo victoria' className='vline'></Option>
                        <Option btnClass='logo glasgow' className='hline'></Option>
                        <div></div>
                        <Option btnClass='logo dublinn'></Option>
                    </div>
                </HorizontalScroll>
            </div>
            <div className="bottom-area">
                <div className="footer">
                    <button className='start'>
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

export default CharPrepair;