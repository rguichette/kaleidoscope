import { createPortal } from "react-dom";

let Info = () => {
  return (
    <div
      className="inline-block bg-slate-100 h-5/6 w-64 ml-auto mr-12 mt-12 "
      onPointerMove={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <div className="flex flex-col justify-between h-full pt-10 pb-10 pl-5">
        <div id="info">
          <h1
            className="italic font-semi-bold text-3xl pb-3"
            onClick={() => {
              console.log("hello world!");
            }}
          >
            Lauren Cate Smith
          </h1>

          <p className="text-lg">
            Photographer of <br />
            Kaleidoscopie images
          </p>
        </div>

        <div className="flex flex-col text-blue-500">
          <a>Instagram</a>
          <a>Unsplash</a>
          <a>500px</a>
        </div>
      </div>
    </div>
  );
};

export default Info;
