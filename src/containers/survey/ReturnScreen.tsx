import { useState } from "react"

const ReturnScreen = ({ selectedQuestion, survey }:{ [x: string]: any }) => {
  const [boolean, setBoolean] = useState(true)
 
  return (
    <div className="flex h-full flex-col gap-4 justify-around">
      <img src={survey.starter_img} width={288} className="flex-1 rounded-lg object-cover"/>
      <h1 className="text-center font-semibold text-lg text-slate-900">{selectedQuestion.title}</h1>
      <div className="flex flex-wrap gap-2 rounded-lg border border-slate-100 bg-slate-50 p-2">
            <button
              onClick={() => setBoolean(false)}
              className={
                boolean === false
                  ? "text-md h-11 flex-1 cursor-pointer rounded-md bg-white font-medium text-slate-700 drop-shadow transition-all"
                  : "text-md h-11 flex-1 cursor-pointer rounded-md bg-transparent font-medium text-slate-500 transition-all"
              }
            >
              No
            </button>
            <button
              onClick={() => setBoolean(true)}
              className={
                boolean === true
                  ? "text-md h-11 flex-1 cursor-pointer rounded-md bg-white font-medium text-slate-700 drop-shadow transition-all"
                  : "text-md h-11 flex-1 cursor-pointer rounded-md bg-transparent font-medium text-slate-500 transition-all"
              }
            >
              Yes
            </button>
          </div>
    </div>
  )
}

export default ReturnScreen