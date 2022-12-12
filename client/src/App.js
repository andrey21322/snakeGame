/* eslint-disable default-case */
import { useEffect, useState } from 'react'
import GameOver from './components/gameOver'
import ArrowBtns from './components/arrowBtns'
import Pause from './components/pause'
import SnakeComponent from './components/snakeComponent'
import Login from './components/login'
import './App.css'

const boardSize = 10;
const defaultCellsValue = Array(boardSize).fill(Array(boardSize).fill(0))
const availableMoves = ['ArrowDown', 'ArrowUp', 'ArrowRight', 'ArrowLeft', 'Escape']
const availableFood = [{foodName:'apple', scoreCount: 1}, {foodName:'cherry', scoreCount: 5}, {foodName:'pear', scoreCount: 10}]

function App() {
  const [game, setGame] = useState(true)
  const [pause, setPause] = useState(false)
  const [direction, setDirection] = useState(availableMoves[0])
  const [snake, setSnake] = useState([[1, 1]])
  const [food, setFood] = useState([0, 0, 1])
  const [score, setScore] = useState(0)
  const [speed, setSpeed] = useState(500)
  const [lastUp, setLastUp] = useState(0)
  const [login, setLogin] = useState(true)
  const [users, setUsers] = useState([{id:1, name: 'A', score: 100}])

  function decimalAdjust(type, value, exp) {
    value = +value;
    exp = +exp;
    if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
      return NaN;
    }
    value = value.toString().split('e');
    value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
    value = value.toString().split('e');
    return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
  }
  Math.floor10 = function(value, exp) {
    return decimalAdjust('floor', value, exp);
  }
  // проверка кнопки
  const handleKeydown = (e) => {
    const index = availableMoves.indexOf(e.key)
    if(index === 4) {
      if(pause === true) {
        return setPause(false)
      } else if(game === true) {
        setPause(true)
      } 
    }
    if(index > -1 && index !== 4) {
      setDirection(availableMoves[index])
    }
  }
  //получение кнопки и проверка
  useEffect(() => {
    document.addEventListener('keydown', handleKeydown)
  })
  // запуск игры
  useEffect(() => {
    if(game === true && pause === false) {
      const interval = gameLoop()
      return () => clearInterval(interval)
    } 
  }, [snake, pause])
  // проверка не выходит ли змейка за границу
  const checkAvailableSlot = (pos) => {
    switch (true) {
      case pos >= boardSize:
        return 0
      case pos < 0:
        return boardSize - 1
      default:
        return pos
    }
  }
  // генерация еды
  const generateFood = () => {
    if(Math.floor10(score, 1) % 50 === true && score !== 0 && 1) {
      let count = Math.floor10(score, 1) 
      if(lastUp !== count) {
        setSpeed(prev => prev - 100)
        setLastUp(count)
      }
    }
    let newFood 
    do {
      newFood = [
        Math.floor(Math.random() * boardSize),
        Math.floor(Math.random() * boardSize),
        availableFood[Math.floor(0.5+Math.random() * 2)].scoreCount
      ]
    } while (snake.some(el=> el[0] === newFood[0] && el[1] === newFood[1]))
    setFood(newFood)
  }
  // перезапуск игры
  const startGame = () => {
    setGame(true)
    setSnake([[1, 1]])
    setScore(0)
    setDirection(availableMoves[0])
  }
  // игровая логика
  const gameLoop = () => {
    const timerId = setTimeout(() => {
      const newSnake = snake
      let move = []
      // логика возможных направление
      switch (direction) {
        case availableMoves[0]:
          move = [1, 0]
          break;
        case availableMoves[1]:
          move = [-1, 0]
          break;
        case availableMoves[2]:
          move = [0, 1]
          break;
        case availableMoves[3]:
          move = [0, -1]
          break;
      }
      // голова змеи(след клетка)
      const head = [
        checkAvailableSlot(newSnake[newSnake.length - 1][0] + move[0]), 
        checkAvailableSlot(newSnake[newSnake.length - 1][1] + move[1])
      ]

      newSnake.push(head)

      let spliceIndex = 1
      
      // логика еды
      if(head[0] === food[0] && head[1] === food[1]) {
        spliceIndex = 0
        setScore(p=> p += food[2])
        generateFood()
      }
      // логика победы
      if(snake.length === boardSize * boardSize + 1) {
        return setGame(false)
      }
      // логика контакта змеи с телом
      if(snake.length > 2) {
        for(let i = 1; i <= snake.length - 2; i++){ 
          if(head[0] === snake[i][0] && head[1] === snake[i][1]) {
            setGame(false)
          }
        }
      }

      setSnake(newSnake.slice(spliceIndex))

    }, speed)
    return timerId
  }
  return (
    <div>
    {login === false ? 
     <Login />
    :
    <>
      <Pause pause={pause}/>  
      <div className='score'>{score}</div>
      {game ? 
      <div className='row'>
      <SnakeComponent defaultCellsValue={defaultCellsValue} snake={snake} availableFood={availableFood} food={food}/>
      <ArrowBtns direction={direction}/>
      </div> 
      : 
      <GameOver startGame={startGame}/>}
    </>}
    </div>
  )
}

export default App
