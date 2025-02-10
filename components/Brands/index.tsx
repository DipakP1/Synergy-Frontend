"use client";
import React from "react";
import SingleBrand from "./SingleBrand";
import brandData from "./brandData";

const Brands = () => {
  return (
    <>
      {/* <!-- ===== Clients Start ===== --> */}
      <div
        className="mt-1 border border-x-0 border-y-stroke bg-alabaster py-4 pb-4 dark:border-y-strokedark dark:bg-black"
        style={{}}
      >
        <h1
          className="color:white"
          style={{
            fontSize: "22px",
            fontWeight: "bold",
            color: "#6f717f",
            marginLeft: "260px",
          }}
        >
          Our Partner
        </h1>
      </div>
      <section className="border border-x-0 border-y-stroke bg-alabaster py-11 dark:border-y-strokedark dark:bg-black">
        <div className="mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0">
          <div className="grid grid-cols-3 items-center justify-center gap-7.5 md:grid-cols-6 lg:gap-12.5 xl:gap-29">
            {brandData.map((brand, key) => (
              <SingleBrand brand={brand} key={key} />
            ))}
          </div>
        </div>
      </section>
      {/* <!-- ===== Clients End ===== --> */}
    </>
  );
};

export default Brands;
