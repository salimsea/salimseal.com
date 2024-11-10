import { URLCV } from "helpers/common";
import React from "react";
import { FaPodcast } from "react-icons/fa";

const Ballon = () => {
  return (
    <div className="ballon d-none d-sm-block">
      <div
        className="card-ballon px-3 py-2"
        onClick={() => (window.location = URLCV)}
      >
        <FaPodcast color="white" size={20} />
        <span className="text-white ps-2">HIRE ME!</span>
      </div>
    </div>
  );
};

export default Ballon;
