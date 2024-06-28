import './BackButton.css'
import { LessThan, HomeIcon, MeshSphere, CrossArrow } from './SVGIcons';
import CircleButton from './CircleButton';

export interface Props {
    className?: string;
    homeBtn?: boolean;
    squareBg?: boolean;
}

function TopButtons({ className = "", homeBtn = true, squareBg = true }: Props) {
    return (
        <div className={'top-btns ' + className}>
            <button className='back-btn'>
                <LessThan></LessThan>
            </button>
            {homeBtn && <div className="vr"></div>}
            {homeBtn &&
                <button className='home-btn'>
                    <MeshSphere></MeshSphere>
                    <HomeIcon></HomeIcon>
                </button>
            }
            <CircleButton className='skin-pos-btn' squareBg={squareBg}>
                <CrossArrow></CrossArrow>
            </CircleButton>
        </div>
    )
}

export default TopButtons;