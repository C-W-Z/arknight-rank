import './TopButtons.css'
import { ChevronLeft, HomeIcon, MeshSphere } from './SVGIcons';
import { useNavigate } from 'react-router-dom';

export interface Props {
    className?: string;
    backOnClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    homeOnClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    homeBtn?: boolean;
    thirdBtn?: any;
}

function TopButtons({
    className = "",
    backOnClick = undefined,
    homeOnClick = undefined,
    homeBtn = false,
    thirdBtn = undefined
}: Props) {
    const navigate = useNavigate();
    function goHome() {
        navigate('/');
    }

    return (
        <div className={'top-btns ' + className}>
            <button className='back-btn' onClick={backOnClick}>
                <ChevronLeft></ChevronLeft>
            </button>
            {homeBtn && <div className="vr"></div>}
            {homeBtn &&
                <button className='home-btn' onClick={homeOnClick !== undefined ? homeOnClick : goHome}>
                    <MeshSphere></MeshSphere>
                    <HomeIcon></HomeIcon>
                </button>
            }
            {thirdBtn}
        </div>
    )
}

export default TopButtons;