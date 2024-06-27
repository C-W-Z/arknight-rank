import './ArrowButton.css'

export interface Props {
    className?: string;
    children?: any;
    height?: string;
}

function ArrowButton({ className = "", height = "2em", children = undefined }: Props) {
    return (
        <button className={"arrow-btn " + className} style={{ height: height }}>
            <svg viewBox="0 0 185 40" style={{ height: height }}>
                <polygon points="0,0 160,0 185,20 160,40 0,40" />
            </svg>
            <div className='child'>
                {children}
            </div>
        </button>
    );
}

export default ArrowButton;