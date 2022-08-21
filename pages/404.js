import { IMGNotFound } from "assets";
import Image from "next/image";
import React from "react";

const NotFound = () => {
  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <div>
        <Image
          src={IMGNotFound}
          width={200}
          height={200}
          className="img-fluid"
        />
        <br />
        <p className="text-center pt-3">
          <b>404</b>
        </p>
        <p className="text-center ">Halaman tidak ditemukan</p>
      </div>
    </div>
  );
};

export default NotFound;
