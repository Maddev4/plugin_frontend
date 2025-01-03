import React, { useEffect } from "react";

const SlideCard = ({ slide, setSelectSlides, selectSlides, mainSection, subSection }) => {
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
        },
      ]);
    } else {
      let newSelectSlides = selectSlides.filter((item) => item.slideId !== slide.slideId);
      console.log("my_log_else", newSelectSlides);
      setSelectSlides([...newSelectSlides]);
    }
    setIsChecked(state);
  };

  return (
    <div
      className="group flex flex-col justify-center items-center transform transition-transform duration-100 active:scale-95"
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
          <input
            type="checkbox"
            checked={isChecked}
            onChange={(e) => {
              console.log("my_log_e", e.target.checked, slide.slideId);
              handleCardClick(e.target.checked);
            }}
            className="w-4 h-4 rounded border-2 border-[#E6E6EA] 
              checked:bg-[#00BEC0] checked:border-[#00BEC0] 
              transition-colors duration-200 cursor-pointer"
          ></input>
          <label htmlFor="myInput" className="text-sm text-[#666666]">
            {slide.slideId}
          </label>
        </div>
      </div>
    </div>
  );
};

export default SlideCard;
