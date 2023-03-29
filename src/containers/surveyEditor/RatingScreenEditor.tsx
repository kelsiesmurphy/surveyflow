import { useState, useEffect } from "react";

const RatingScreen = ({
  selectedQuestion,
  survey,
  rating,
  setRating,
  review,
  setReview,
  handleReviewChange,
}: {
  [x: string]: any;
}) => {
  const stars = [1, 2, 3, 4, 5];
  const [duplicateReview, setDuplicateReview] = useState<string>("");

  const handleReview = (event: any) => {
    setDuplicateReview(event.target.value);
  };

  const handleRating = (star: number) => {
    setRating(star);
  };

  const starsNode = stars.map((star, index) => {
    return (
      <button key={index} onClick={() => handleRating(star)}>
        <svg
          aria-hidden="true"
          className={`h-12 w-12 transition-colors hover:text-yellow-300 ${
            star <= rating ? "text-yellow-400" : "text-slate-100"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Star {index}</title>
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
        </svg>
      </button>
    );
  });

  return (
    <div className="flex h-full flex-col gap-4">
      <div className="flex justify-between gap-4">
        <h1 className="text-lg font-semibold text-slate-900">
          {selectedQuestion.title}
        </h1>
        <img src={survey.company_logo_img} className="h-16 w-16 rounded-lg" />
      </div>
      <div className="flex justify-center">{starsNode}</div>
      <textarea
        value={duplicateReview}
        onChange={handleReview}
        className="flex-1 resize-none rounded-lg border border-slate-300 bg-white px-4 py-2 shadow-sm"
        placeholder="Type here..."
      ></textarea>
    </div>
  );
};

export default RatingScreen;
