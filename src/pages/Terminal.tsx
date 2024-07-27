import { useNavigate } from 'react-router-dom';
import './Terminal.css';
import TopButtons from '../components/TopButtons';

function Terminal() {
    const navigate = useNavigate();
    function back() {
        navigate('/');
    }

    function selectChar() {
        navigate('/terminal/charprepare');
        // navigate('/battle', { state: { playerCount: 2 } });
    }

    return (
        <div className="terminal">
            <div className="in-shadow"></div>
            <TopButtons backOnClick={back} homeBtn={true}></TopButtons>
            <div className="select-area">
                <button className="char" onClick={selectChar}></button>
                <button className="skin"></button>
            </div>
        </div>
    )
}

export default Terminal;