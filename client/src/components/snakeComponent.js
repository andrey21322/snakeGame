function SnakeComponent({defaultCellsValue, snake, availableFood, food}) {
    return (
      <>
        <div>
            {defaultCellsValue.map((row, indexR) => (
                <div key={indexR} className="row">
                    {row.map((cell, indexC) => {
                        let type = snake.some(elem => elem[0] === indexR && elem[1] === indexC) && 'snake'
                        if (type !== 'snake') {
                        let nameFd = availableFood.find(el => el.scoreCount === food[2])
                        type = (food[0] === indexR && food[1] === indexC) && nameFd.foodName
                    }
                    return (<div key={indexC} className={`cell ${type}`}></div>)
                    })}
                </div>))
            }
        </div>
      </>
    )
  }
  
  export default SnakeComponent;



