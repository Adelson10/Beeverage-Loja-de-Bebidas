const BarReviews = ({number, Scores, total} : {number: number, Scores: number[], total: number}) => {    
    
  function handleNumber(value: number, total: number) {
    switch (value) {
        case 5:
            if(total > 0)
            return (Scores.filter( (score) => score === 5 ? true : false ).length / total) * 100;
            else return 0;
        case 4:
            if(total > 0)
            return (Scores.filter( (score) => score >= 4 && score < 5 ? true : false ).length / total) * 100;
            else return 0;
        case 3:
            if(total > 0)
            return (Scores.filter( (score) => score >= 3 && score < 4 ? true : false ).length / total) * 100;
            else return 0;
        case 2:
            if(total > 0)
            return (Scores.filter( (score) => score >= 2 && score < 3 ? true : false ).length / total) * 100;
            else return 0;
        case 1:
            if(total > 0)
            return (Scores.filter( (score) => score >= 0 && score < 2 ? true : false ).length / total) * 100;
            else return 0;
        default:
            return 0;
    }
  }

  return (
    <div className="flex items-center gap-[1.2rem]">
        <p className="w-[15px] text-center font-light">{number.toString()}</p>
        <div className="w-[250px] h-3 flex items-center justify-start bg-[#D9D9D9] rounded-2xl overflow-hidden max-[750px]:w-full">
            <div className="h-full w-full block bg-brand-dark rounded-2xl" style={{maxWidth: `${handleNumber(number, total)}%`}}></div>
        </div>
    </div>
  )
}

export default BarReviews;