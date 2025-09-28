export default function SurveyPagination({
  index,
  total,
}: Readonly<{
  index: number;
  total: number;
}>) {
  return (
    <div className="mt-6 flex justify-center gap-4">
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          className={`inline-block w-2.5 h-2.5 rounded-full ${
            i === index ? "bg-primary" : "bg-gray-300"
          }`}
        ></span>
      ))}
    </div>
  );
}
