import React from "react";

const Details = ({ className }) => {
  return (
    <div className={`${className} h-[100%]`}>
      <div className="user px-7 py-4 flex flex-col items-center gap-1 border-b-[1px] border-[#dddddd35]">
        <img
          src="./avatar.png"
          alt=""
          className="h-[80px] w-[80px] ring-1 ring-gray-200 rounded-full"
        />
        <h2 className="text-xl font-semibold text-gray-300">Akshansh Singh</h2>
        <p className="text-gray-300 font-light text-sm ">
          In valor, there is hope.
        </p>
      </div>
      <div className="info p-4 flex flex-col gap-3">
        <div className="option">
          <div className="title flex items-center justify-between">
            <span className="text-sm text-gray-300 font-light">
              Chat Settings
            </span>
            <img
              src="./arrowUp.png"
              alt=""
              className="w-[27px] h-[27px] bg-[rgba(50,59,86,0.5)] p-2 rounded-full cursor-pointer"
            />
          </div>
        </div>
        <div className="option ">
          <div className="title flex items-center justify-between">
            <span className="text-sm text-gray-300 font-light">
              Privacy Settings
            </span>
            <img
              src="./arrowUp.png"
              alt=""
              className="w-[27px] h-[27px] bg-[rgba(50,59,86,0.5)] p-2 rounded-full cursor-pointer"
            />
          </div>
        </div>
        <div className="option ">
          <div className="title flex items-center justify-between mb-2">
            <span className="text-sm text-gray-300 font-light">
              Shared Photos
            </span>
            <img
              src="./arrowDown.png"
              alt=""
              className="w-[27px] h-[27px] bg-[rgba(50,59,86,0.5)] p-2 rounded-full cursor-pointer"
            />
          </div>
          <div className="photos flex flex-col gap-4">
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="photoItem flex items-center justify-between"
              >
                <div className="photoDetail flex items-center gap-2">
                  <img
                    className="w-9 h-9 rounded-md object-cover"
                    src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Mountains.jpg"
                  />
                  <span className="text-xs text-gray-400">
                    photo_2024_2.png
                  </span>
                </div>
                <img
                  src="download.png"
                  alt="Download.png"
                  className="w-3 h-3 cursor-pointer"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="option ">
          <div className="title flex items-center justify-between">
            <span className="text-sm text-gray-300 font-light">
              Shared Files
            </span>
            <img
              src="./arrowUp.png"
              alt=""
              className="w-[27px] h-[27px] bg-[rgba(50,59,86,0.5)] p-2 rounded-full cursor-pointer"
            />
          </div>
        </div>
        <button className="px-1 py-2 text-sm font-medium bg-red-600 text-white border-none rounded-full cursor-pointer hover:bg-red-700 active:scale-95 transition-all ease-in-out">
          Block user
        </button>
        <button className="px-1 py-2 text-sm font-medium bg-red-600 text-white border-none rounded-full cursor-pointer hover:bg-red-700 active:scale-95 transition-all ease-in-out ">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Details;
