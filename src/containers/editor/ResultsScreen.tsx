const ResultsScreen = ({ survey }: any) => {
  return (
    <div className="flex flex-1 justify-center px-2 py-12">
      <div className="mt-4 flex max-w-5xl flex-1 flex-col border-y border-slate-300 bg-white pb-12 shadow-sm md:mx-4 md:rounded-xl md:border-x">
        <div className="flex flex-col flex-wrap justify-between gap-6 py-6 px-6  md:flex-row">
          <div>
            <h3 className="text-lg font-medium text-slate-900">
              Survey results
            </h3>
            <p className="text-sm text-slate-500">
              View your survey results here.
            </p>
          </div>
        </div>
        <table>
          <thead className="text-left">
            <tr className="flex flex-1 justify-between gap-1 border-y py-3">
              <th className="flex-1 px-6">
                <h4 className="text-xs font-medium text-slate-500">Rating</h4>
              </th>
              <th className="hidden max-w-[120px] flex-1 px-6 md:block">
                <h4 className="text-xs font-medium text-slate-500">
                  Purchase again?
                </h4>
              </th>
              <th className="hidden flex-1 px-6 md:block">
                <h4 className="text-xs font-medium text-slate-500">Details</h4>
              </th>
              <th className="hidden flex-1 px-6 md:block">
                <h4 className="text-xs font-medium text-slate-500">Values</h4>
              </th>
              <th className="hidden max-w-[120px] flex-1 px-6 md:block">
                <h4 className="text-xs font-medium text-slate-500">Date</h4>
              </th>
            </tr>
          </thead>
          <tbody>test</tbody>
        </table>
      </div>
    </div>
  );
};

export default ResultsScreen;
