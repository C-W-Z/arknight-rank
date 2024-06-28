import './TopButtons.css'
import { LessThan, HomeIcon, MeshSphere } from './SVGIcons';

export interface Props {
    className?: string;
    backOnClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    homeBtn?: boolean;
    homeOnClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    thirdBtn?: any;
}

function TopButtons({
    className = "",
    backOnClick = undefined,
    homeBtn = false,
    homeOnClick = undefined,
    thirdBtn = undefined
}: Props) {
    return (
        <div className={'top-btns ' + className}>
            <button className='back-btn' onClick={backOnClick}>
                <LessThan></LessThan>
            </button>
            {homeBtn && <div className="vr"></div>}
            {homeBtn &&
                <button className='home-btn'  onClick={homeOnClick}>
                    <MeshSphere></MeshSphere>
                    <HomeIcon></HomeIcon>
                </button>
            }
            {thirdBtn}
        </div>
    )
}

export default TopButtons;