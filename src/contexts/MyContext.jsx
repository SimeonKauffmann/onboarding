import React, { createContext, useContext, useState } from "react"
import data from "../testData"

export const aContext = createContext()

export function useMyContext() {
  return useContext(aContext)
}

export const MyContext = ({ children }) => {
  const [Count, setCount] = useState(0)
  const [checkedArray, setCheckedArray] = useState([])
  const [currentUserId, setCurrentUserId] = useState("")
  const [contextUser, setContextUser] = useState()
  const [userObj, setUserObj] = useState()

  function increase() {
    return setCount(Count + 100 / data.length)
  }

  function decrease() {
    return setCount(Count - 100 / data.length)
  }
  function setChecked(componentName) {
    let copy = checkedArray
    copy.push(componentName)
    setCheckedArray(copy)
  }

  function setCtxUser(data) {
    setContextUser(data)
  }
  function setUserObjFunc(data) {
    setUserObj(data)
  }

  function unsetChecked(componentName) {
    let copy = checkedArray
    copy = copy.filter((item) => item !== componentName)
    setCheckedArray(copy)
  }

  let value = {
    increase,
    decrease,
    Count,
    checkedArray,
    setChecked,
    unsetChecked,
    currentUserId,
    setCurrentUserId,
    setCtxUser,
    contextUser,
    userObj,
    setUserObjFunc,
  }
  return <aContext.Provider value={value}>{children}</aContext.Provider>
}
