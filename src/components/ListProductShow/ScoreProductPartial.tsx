import React from 'react';
import { StarEmpty, StarFill, StarLastEmpty, StarHalf, StarLastFill } from '../../assets/imagens/Product/star/Star';

const ScoreProductPartial = ({score, className, style}: {score: number, className?: string, style?: React.CSSProperties}) => {
    const inteiro = Math.floor(score);
    const temMeiaEstrela = score % 1 >= 0.5;

  return (
    <div style={style ?? {transform: 'scale(1.5)'}} className={`flex items-center justify-center gap-[0.1rem] text-brand-dark font-semibold text-[0.9rem] ${className ?? ''}`}>
      {score.toFixed(1)}
      <div className="flex items-center gap-[0.1rem]">
        {[...Array(5)].map((_, index) => {
            const isLastStar = index === 4;
            const starFill = (score === 5 && isLastStar) ? <StarLastFill /> : <StarFill />;
            const startLastHalf = (index === 4 && temMeiaEstrela) ? <StarLastEmpty /> : <StarHalf />;
            const startLastEmpty = (index === 4) ? <StarLastEmpty /> : <StarEmpty />;

            if (index < inteiro) {
                return <span key={index} className='flex items-center'>{starFill}</span>;
            } else if (index === inteiro && temMeiaEstrela) {
                return <span key={index} className='flex items-center'>{startLastHalf}</span>;
            } else {
                return <span key={index} className='flex items-center'>{startLastEmpty}</span>;
            }
        })}
      </div>
    </div>
  )
}

export default ScoreProductPartial;
