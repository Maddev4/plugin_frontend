import React, { useContext } from "react";
import { DialogContext } from "../dialogs/dialogIndex";

const SlideCard = ({ slide, mainSection, subSection }) => {
  const { selectSlides, setSelectSlides } = useContext(DialogContext);
  const tmp = selectSlides.some((item) => item.slideId === slide.slideId);
  // console.log("my_log_tmp", tmp);
  const [isChecked, setIsChecked] = React.useState(tmp);

  const handleCardClick = (state) => {
    if (state) {
      setSelectSlides((prev) => [
        ...prev,
        {
          mainSection: mainSection,
          subSection: subSection,
          fileId: slide.fileId,
          slideId: slide.slideId,
          presignedUrl: slide.presignedUrl,
          deleted: 0,
        },
      ]);
    } else {
      let newSelectSlides = selectSlides.filter((item) => item.slideId !== slide.slideId);
      // console.log("my_log_else", newSelectSlides);
      setSelectSlides([...newSelectSlides]);
    }
    setIsChecked(state);
  };

  return (
    <div
      className="group flex flex-col justify-center items-center transform transition-transform duration-100 active:scale-95 cursor-pointer"
      onClick={() => handleCardClick(!isChecked)}
    >
      <div
        className="rounded-lg overflow-hidden bg-white border border-[#E6E6EA] 
          transition-all duration-200 hover:border-[#00BEC0] hover:shadow-md"
      >
        <div className="aspect-[16/9] w-full">
          <img src={slide.presignedUrl} alt={slide.fileId} className="w-full h-full object-cover" />
        </div>
        <div className="flex items-center gap-2 p-2">
          <div className="relative">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={(e) => {
                handleCardClick(e.target.checked);
              }}
              className="w-4 h-4 rounded border-2 border-[#E6E6EA] 
                appearance-none
                checked:bg-[#00BEC0] 
                checked:border-[#00BEC0]
                transition-colors duration-200"
            />
            {isChecked && (
              <svg
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 text-white pointer-events-none"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 12 12"
                stroke="currentColor"
              >
                <path d="M3 6l2 2 4-4" />
              </svg>
            )}
          </div>
          <label htmlFor="myInput" className="text-sm text-[#666666]">
            {slide.slideId}
          </label>
        </div>
      </div>
    </div>
  );
};

export default SlideCard;
