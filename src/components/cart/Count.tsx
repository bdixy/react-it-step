import React, { FC, useState } from 'react'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'

interface Btn {
  name: string
}

const Count: FC<Btn> = ({name}) => {
  const [count, setCount] = useState<number>(1)

  const onChange = () => {
  }

  const handleClickPlus = () => setCount(count + 1)

  const handleClickMinus = () => setCount(count <= 1 ? 1 : count - 1)

  return (
    <>
      <button className="btn btn-link px-2" onClick={handleClickMinus}>
        <AiOutlineMinus/>
      </button>

      <input
        id={name}
        min="1"
        name={name}
        value={count}
        type="number"
        className="form-control form-control-sm"
        onChange={onChange}
      />

      <button className="btn btn-link px-2" onClick={handleClickPlus}>
        <AiOutlinePlus/>
      </button>
    </>
  )
}

export default Count