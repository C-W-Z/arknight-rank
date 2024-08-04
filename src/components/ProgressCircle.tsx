import './ProgressCircle.css';

interface Props {
    className?: string;
    value: number;
    max?: number;
    children?: any;
    size?: string;
}

function ProgressCircle({ className = "", value, max = 1, size = "250px", children = undefined }: Props) {
    if (value < 0)
        value = 0;
    else if (value > max)
        value = max;
    if (max < 0)
        max = 1;

    return (
        <div className={"progress-circle " + className} style={{ "--size": size } as React.CSSProperties}>
            <svg
                width={size} height={size}
                className={"circular-progress"} style={{ "--progress": (value / max * 100) } as React.CSSProperties}
            >
                <circle className="back"></circle>
                <circle className="value"></circle>
            </svg>
            <div className={'child'}>{children}</div>
        </div>
    );
}

export default ProgressCircle;