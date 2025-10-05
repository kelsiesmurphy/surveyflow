import Image from "next/image";

export default function SidebarPreview({
  index,
  question,
  questions,
}: {
  index: number;
  question: any;
  questions: any[];
}) {
  let path = "/survey-preview";
  let title = "";
  switch (question.type) {
    case "thank_you":
      path += "/ThankYou.svg";
      title = "Thank You";
      break;
    case "multiple_choice":
      path += "/MultipleChoice.svg";
      title = "Multiple Choice";
      break;
    case "text":
      path += "/TextArea.svg";
      title = "Text Area";
      break;
    case "rating":
      path += "/Rating.svg";
      title = "Rating";
      break;
    default:
      path += "/Default.svg";
      title = "Other";
  }

  return (
    <>
      <div className="bg-muted flex items-center p-2 justify-center text-xs text-muted-foreground">
        <Image src={path} alt="Preview" width={52} height={100} className="rounded-sm shadow-sm" />
      </div>
      <div className="py-2 px-3 flex justify-between items-center">
        <p className="text-sm font-medium">{title}</p>
        <p className="text-xs text-muted-foreground">
          {index + 1} of {questions.length}
        </p>
      </div>
    </>
  );
}
