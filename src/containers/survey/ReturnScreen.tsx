
const ReturnScreen = ({
  selectedQuestion,
  survey,
  returnBack,
  setReturnBack,
}: {
  [x: string]: any;
}) => {
  return (
    <div className="flex h-full flex-col justify-around gap-4">
      <div className="flex justify-center">
        <img
          src={survey.buy_again_img}
          className="rounded-lg object-cover w-full md:w-[70%]"
        />
      </div>
      <h1 className="text-center text-lg font-semibold text-slate-900 md:text-2xl">
        {selectedQuestion.title}
      </h1>
      <div className="flex flex-wrap gap-2 rounded-lg border border-slate-100 bg-slate-50 p-2">
        <button
          onClick={() => setReturnBack(false)}
          className={
            returnBack === false
              ? "text-md h-11 flex-1 cursor-pointer rounded-md bg-white font-medium text-slate-700 drop-shadow transition-all"
              : "text-md h-11 flex-1 cursor-pointer rounded-md bg-transparent font-medium text-slate-500 transition-all"
          }
        >
          No
        </button>
        <button
          onClick={() => setReturnBack(true)}
          className={
            returnBack === true
              ? "text-md h-11 flex-1 cursor-pointer rounded-md bg-white font-medium text-slate-700 drop-shadow transition-all"
              : "text-md h-11 flex-1 cursor-pointer rounded-md bg-transparent font-medium text-slate-500 transition-all"
          }
        >
          Yes
        </button>
      </div>
    </div>
  );
};

export default ReturnScreen;
