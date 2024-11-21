import React, {useEffect} from 'react';

const CircleIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" stroke="black" strokeWidth="2"/>
    </svg>
);
const CrossIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="1" y1="1" x2="23" y2="23" stroke="black" strokeWidth="2"/>
        <line x1="1" y1="23" x2="23" y2="1" stroke="black" strokeWidth="2"/>
    </svg>
);

const Cell = ({cell, onCellClick, sumOfEl, isWinningCell}) => {
    const [sumOfAllElements, setSumOfAllElements] = React.useState(0);
    const [isFlipped, setIsFlipped] = React.useState(false);
    const [showContent, setShowContent] = React.useState(false);

    useEffect(() => {
        setSumOfAllElements(sumOfEl.reduce((acc, el) => acc + el, 0));
    }, [cell]);

    const handleClick = () => {
        setIsFlipped(true);
        setTimeout(() => {
            setShowContent(true);
        }, 500);
        onCellClick();
    };

    return (
        <div onClick={handleClick} className={`cell ${isWinningCell ? 'winning-cell' : 'lose-cell'} ${isFlipped ? 'flipped' : ''}`}>
            {showContent && cell !== 0 &&
                <span>
                    {sumOfAllElements % 2 === 0 ? <CrossIcon /> : <CircleIcon />}
                </span>
            }
        </div>
    );
};

export default Cell;