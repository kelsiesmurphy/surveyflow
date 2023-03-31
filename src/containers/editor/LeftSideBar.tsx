import { Monitor, Smartphone } from "react-feather";

const LeftSideBar = ({questions, selectedQuestion, deviceSize, setDeviceSize, setSelectedQuestion}:any) => {

    let typeNodes: any;
  if (questions) {
    typeNodes = questions.map(
      (question: { [x: string]: any }, index: number) => {
        return (
          <li
            key={index}
            className={`mx-4 my-2 flex min-h-[151px] w-[206px] cursor-pointer flex-col rounded-2xl bg-[#F3F6F8] shadow-sm ${
              question.sort_order == selectedQuestion.sort_order
                ? "border-2 border-sky-700"
                : "border border-slate-200"
            } transition-all`}
            onClick={() => {
              setSelectedQuestion(question);
            }}
          >
            <div className="flex flex-1 items-center justify-center p-2">
              <img
                src={question.question_type_img}
                className="aspect-[72/155] w-[42px] rounded shadow-sm"
              />
            </div>
            <div className="flex justify-between rounded-b-2xl bg-white py-2 px-4 shadow-sm">
              <p className="text-sm font-medium text-slate-800">
                {question.question_type_title}
              </p>
              <p className="text-sm text-slate-500">
                {question.sort_order} of {questions.length}
              </p>
            </div>
          </li>
        );
      }
    );
  }
  return (
    <div className="flex flex-col bg-white">
        <ul className="flex flex-col overflow-y-auto pt-4 scrollbar-hide">
          {typeNodes}
        </ul>
        <div className="border-t border-slate-100 p-4 shadow-[-4px_1px_2px_-15px_rgba(0,0,0,0.8)]">
          <div className="flex flex-wrap gap-2 rounded-lg border border-slate-100 bg-slate-50 p-1">
            <button
              onClick={() => setDeviceSize("mobile")}
              className={`text-md flex h-11 flex-1 cursor-pointer items-center justify-center rounded-md ${
                deviceSize === "mobile"
                  ? "bg-white text-slate-700"
                  : "bg-transparent text-slate-500"
              } font-medium drop-shadow transition-colors duration-300`}
            >
              <Smartphone />
            </button>
            <button
              onClick={() => setDeviceSize("desktop")}
              className={`text-md flex h-11 flex-1 cursor-pointer items-center justify-center rounded-md ${
                deviceSize === "desktop"
                  ? "bg-white text-slate-700"
                  : "bg-transparent text-slate-500"
              } font-medium drop-shadow transition-colors duration-300`}
            >
              <Monitor />
            </button>
          </div>
        </div>
      </div>
  )
}

export default LeftSideBar