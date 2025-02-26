import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { Brand } from "@/types/brand";
import { motion } from "framer-motion";

const SingleBrand = ({ brand }: { brand: Brand }) => {
  const { image, href, name, imageLight, id } = brand;

  return (
    <>
      <motion.a
        variants={{
          hidden: {
            opacity: 0,
            y: -20,
          },
          visible: {
            opacity: 1,
            y: 0,
          },
        }}
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 1, delay: id }}
        viewport={{ once: true }}
        href={href}
        className="relative block flex h-[80px] w-[140px] items-center justify-center"
      >
        <Image
          className="opacity-69 object-contain transition-all duration-300 hover:opacity-100 dark:hidden"
          src={image}
          alt={name}
          width={140}
          height={80}
        />
        <Image
          className="opacity-69 hidden object-contain transition-all duration-300 hover:opacity-100 dark:block"
          src={imageLight}
          alt={name}
          width={140}
          height={80}
        />
      </motion.a>
    </>
  );
};

export default SingleBrand;
