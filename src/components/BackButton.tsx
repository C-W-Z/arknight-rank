import './BackButton.css'

export interface Props {
    className?: string;
    children?: any;

}

function BackButton({ className = "", children = undefined }: Props) {
    return (
        <button className={'back-btn ' + className}>
            {children}
        </button>
    )
}

export default BackButton;