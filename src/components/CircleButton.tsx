import './CircleButton.css'

export interface Props {
    className?: string;
    children?: any;
    squareBg?: boolean;
}

export default function CircleButton({ className = "", children = undefined, squareBg = false }: Props) {
    const class_name = (squareBg ? 'circle-btn square-bg ' : 'circle-btn ') + className;
    return (
        <button className={class_name}>
            <div className='icon'>
                {children}
            </div>
        </button>
    )
}
