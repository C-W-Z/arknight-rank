import './CircleButton.css'

interface Props {
    className?: string;
    children?: any;
    onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    squareBg?: boolean;
}

export default function CircleButton({
    className = "",
    children = undefined,
    onClick = undefined,
    squareBg = false
}: Props) {
    const class_name = (squareBg ? 'circle-btn square-bg ' : 'circle-btn ') + className;
    return (
        <button className={class_name} onClick={onClick}>
            <div className='icon'>
                {children}
            </div>
        </button>
    )
}
