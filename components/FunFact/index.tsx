// "use client";
// import React from "react";
// import Image from "next/image";
// import { motion } from "framer-motion";

// const FunFact = () => {
//   return (
//     <>
//       {/* <!-- ===== Funfact Start ===== --> */}
//       <section className="px-4 py-20 md:px-8 lg:py-22.5 2xl:px-0">
//         <div className="relative z-1 mx-auto max-w-c-1390 rounded-lg bg-gradient-to-t from-[#F8F9FF] to-[#DEE7FF] py-22.5 dark:bg-blacksection dark:bg-gradient-to-t dark:from-transparent dark:to-transparent dark:stroke-strokedark xl:py-27.5">
//           <Image
//             width={335}
//             height={384}
//             src="/images/shape/shape-04.png"
//             alt="Man"
//             className="absolute -left-15 -top-25 -z-1 lg:left-0"
//           />
//           <Image
//             width={132}
//             height={132}
//             src="/images/shape/shape-05.png"
//             alt="Doodle"
//             className="absolute bottom-0 right-0 -z-1"
//           />

//           <Image
//             fill
//             src="/images/shape/shape-dotted-light-02.svg"
//             alt="Dotted"
//             className="absolute left-0 top-0 -z-1 dark:hidden"
//           />
//           <Image
//             fill
//             src="/images/shape/shape-dotted-dark-02.svg"
//             alt="Dotted"
//             className="absolute left-0 top-0 -z-1 hidden dark:block"
//           />

//           <motion.div
//             variants={{
//               hidden: {
//                 opacity: 0,
//                 y: -20,
//               },

//               visible: {
//                 opacity: 1,
//                 y: 0,
//               },
//             }}
//             initial="hidden"
//             whileInView="visible"
//             transition={{ duration: 1, delay: 0.1 }}
//             viewport={{ once: true }}
//             className="animate_top mx-auto mb-12.5 px-4 text-center md:w-4/5 md:px-0 lg:mb-17.5 lg:w-2/3 xl:w-1/2"
//           >
//             <h2 className="mb-4 text-3xl font-bold text-black dark:text-white xl:text-sectiontitle3">
//               Trusted by Global Companies.
//             </h2>
//             <p className="mx-auto lg:w-11/12">
//               Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
//               convallis tortor eros. Donec vitae tortor lacus. Phasellus aliquam
//               ante in maximus.
//             </p>
//           </motion.div>

//           <div className="flex flex-wrap justify-center gap-8 lg:gap-42.5">
//             <motion.div
//               variants={{
//                 hidden: {
//                   opacity: 0,
//                   y: -20,
//                 },

//                 visible: {
//                   opacity: 1,
//                   y: 0,
//                 },
//               }}
//               initial="hidden"
//               whileInView="visible"
//               transition={{ duration: 1, delay: 0.5 }}
//               viewport={{ once: true }}
//               className="animate_top text-center"
//             >
//               <h3 className="mb-2.5 text-3xl font-bold text-black dark:text-white xl:text-sectiontitle3">
//                 500K
//               </h3>
//               <p className="text-lg lg:text-para2">World Wide Clients</p>
//             </motion.div>
//             <motion.div
//               variants={{
//                 hidden: {
//                   opacity: 0,
//                   y: -20,
//                 },

//                 visible: {
//                   opacity: 1,
//                   y: 0,
//                 },
//               }}
//               initial="hidden"
//               whileInView="visible"
//               transition={{ duration: 1, delay: 0.7 }}
//               viewport={{ once: true }}
//               className="animate_top text-center"
//             >
//               <h3 className="mb-2.5 text-3xl font-bold text-black dark:text-white xl:text-sectiontitle3">
//                 1M+
//               </h3>
//               <p className="text-lg lg:text-para2">Downloads</p>
//             </motion.div>
//             <motion.div
//               variants={{
//                 hidden: {
//                   opacity: 0,
//                   y: -20,
//                 },

//                 visible: {
//                   opacity: 1,
//                   y: 0,
//                 },
//               }}
//               initial="hidden"
//               whileInView="visible"
//               transition={{ duration: 1, delay: 0.8 }}
//               viewport={{ once: true }}
//               className="animate_top text-center"
//             >
//               <h3 className="mb-2.5 text-3xl font-bold text-black dark:text-white xl:text-sectiontitle3">
//                 865
//               </h3>
//               <p className="text-lg lg:text-para2">Winning Award</p>
//             </motion.div>
//           </div>
//         </div>
//       </section>
//       {/* <!-- ===== Funfact End ===== --> */}
//     </>
//   );
// };

// export default FunFact;

"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const FunFact = () => {
  return (
    <section className="relative mx-auto max-w-c-1390 px-4 py-20 md:px-8 lg:py-22.5 2xl:px-0">
      <div className="relative z-1 rounded-lg bg-gradient-to-t from-[#F8F9FF] to-[#DEE7FF] py-22.5 dark:bg-blacksection dark:bg-gradient-to-t dark:from-transparent dark:to-transparent dark:stroke-strokedark xl:py-27.5">
        <Image
          fill
          src="/images/shape/shape-dotted-light-02.svg"
          alt="Dotted"
          className="absolute left-0 top-0 -z-1 dark:hidden"
        />
        <Image
          fill
          src="/images/shape/shape-dotted-dark-02.svg"
          alt="Dotted"
          className="absolute left-0 top-0 -z-1 hidden dark:block"
        />

        <motion.div
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
          transition={{ duration: 1, delay: 0.1 }}
          viewport={{ once: true }}
          className="mx-auto mb-12.5 px-4 text-center md:w-2/3 md:px-0 lg:mb-17.5 lg:w-2/3 xl:w-2/3"
        >
          <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white xl:text-sectiontitle4">
            Trusted by Healthcare Providers Nationwide
          </h2>
        </motion.div>

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 sm:grid-cols-2 md:grid-cols-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1 }}
            className="rounded-lg bg-white p-6 text-center shadow-md dark:border-strokedark dark:bg-blacksection"
          >
            {/* <h3 className="text-3xl font-bold text-blue-600">95%</h3> */}
            <Image
              src="/images/2.png"
              alt="Bar Chart"
              width={190}
              height={50}
              className="mx-auto"
            />

            <p className="mt-2 text-gray-700 dark:text-gray-200">
              image use the point UP arrow
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="rounded-lg bg-white p-6 text-center shadow-md dark:border-strokedark dark:bg-blacksection"
          >
            <Image
              src="/images/3.png"
              alt="Bar Chart"
              width={190}
              height={30}
              className="mx-auto"
            />
            <p className="mt-2 text-gray-700 dark:text-gray-200">
              Average Owner income more than doubled after they engaged with Synergi
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="rounded-lg bg-white p-6 text-center shadow-md dark:border-strokedark dark:bg-blacksection"
          >
            <Image
              src="/images/4.png"
              alt="Bar Chart"
              width={190}
              height={30}
              className="mx-auto"
            />
            <p className="mt-2 text-gray-700 dark:text-gray-200 ">
              Income increased per owner
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="rounded-lg bg-white p-6 text-center shadow-md dark:border-strokedark dark:bg-blacksection"
          >
            {/* <h3 className="text-3xl font-bold text-blue-600">$240,000</h3> */}
            <Image
              src="/images/5.png"
              alt="Bar Chart"
              width={150}
              height={70}
              className="mx-auto pb-10 pt-15"
            />
            <p className="mt-2 text-gray-700 dark:text-gray-200">
              Owner income is higher than MGMA average earnings
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FunFact;
