import { useState } from 'react';
import './Battle.css'
import { Star } from '../components/SVGIcons';

interface CandidateProps {
    className?: string;
    char_id: string;
    name: string;
    rarity: number;
    elite: number;
    portraitId: string;
    prof: string;
    onClick?: React.MouseEventHandler<HTMLDivElement>
}

function Candidate({
    className = "",
    char_id,
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
                <div className="prof-img SUPPORT"></div>
                <Star num={6} color={'#ffffff'}></Star>
                <div className="name">令</div>
                <div className={"elite " + "e" + elite}></div>
            </div>
            <div className="bottom-text">
                <div className="text">CURRENT   SELECTION</div>
            </div>
        </div>
    )
}

function Battle() {

    const [className, setClassName] = useState<string[]>(['', '', '', '', '']);
    function OnChoose(i: number) {
        return () => {
            let copy = Array.from(className);
            if (copy[i] == '') {
                copy[i] = 'choose';
                for (let j = 0; j < copy.length; j++)
                    if (i != j)
                        copy[j] = 'unchoose';
            }
            else if (copy[i] == 'unchoose') {
                copy[i] = 'choose';
            }
            else if (copy[i] == 'choose') {
                copy[i] = 'unchoose';
                let unchooseCount = 0;
                for (let j = 0; j < copy.length; j++)
                    if (copy[j] == 'unchoose')
                        unchooseCount++;
                if (unchooseCount == copy.length)
                    for (let j = 0; j < copy.length; j++)
                        copy[j] = '';
            }
            setClassName(copy);
        }

    }

    return (
        <div className='battle'>
            <div className="candidate-area">
                <Candidate className={className[0]} onClick={OnChoose(0)}
                    char_id={''}
                    name={''}
                    rarity={0}
                    elite={0}
                    portraitId={'char_2023_ling_2'}
                    prof={''}
                ></Candidate>
                <Candidate className={className[1]} onClick={OnChoose(1)}
                    char_id={''}
                    name={''}
                    rarity={0}
                    elite={2}
                    portraitId={'char_2023_ling_2'}
                    prof={''}
                ></Candidate>
                <Candidate className={className[2]} onClick={OnChoose(2)}
                    char_id={''}
                    name={''}
                    rarity={0}
                    elite={3}
                    portraitId={'char_2023_ling_2'}
                    prof={''}
                ></Candidate>
                <Candidate className={className[3]} onClick={OnChoose(3)}
                    char_id={''}
                    name={''}
                    rarity={0}
                    elite={1}
                    portraitId={'char_2023_ling_2'}
                    prof={''}
                ></Candidate>
                <Candidate className={className[4]} onClick={OnChoose(4)}
                    char_id={''}
                    name={''}
                    rarity={0}
                    elite={0}
                    portraitId={'char_2023_ling_2'}
                    prof={''}
                ></Candidate>
            </div>
        </div>
    )
}

export default Battle;