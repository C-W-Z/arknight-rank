import './ProgressBar.css';

export interface Props {
    className?: string;
    value: number;
    max?: number;
    children?: any;
}

function ProgressBar({ className="", value, max = 1, children=undefined }: Props) {
    if (value < 0)
        value = 0;
    else if (value > max)
        value = max;
    if (max < 0)
        max = 1;

    return (
        <div className={"progress " + className}>
            <div className="progress-value" style={{ width: (value / max * 100) + "%" } }>
                {children}
            </div>
        </div>
    );
}

export default ProgressBar;