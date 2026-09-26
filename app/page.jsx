import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="flex justify-center items-center h-[44vh] flex-col text-white gap-2 md:px-0 px-5 text-xs md:text-base">
        <div className="md:text-5xl text-2xl font-bold flex gap-2 md:gap-20 justify-center items-center">
          Get me a Chai{" "}
          <span>
            <img src="/tea.gif" alt="" width={44 * 2} />
          </span>
        </div>
        <p className="md:text-left text-center text-sm md:text-base">
          Fund your projects now!! Fund your projects now!! Fund your projects
          now!!
        </p>
        <div className="flex gap-3 my-1">
          <Link href="/login">
            <button
              type="button"
              className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-base text-sm px-4 py-2.5 text-center leading-5 rounded-lg"
            >
              Start Here
            </button>
          </Link>
          <Link href="about">
            <button
              type="button"
              className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-base text-sm px-4 py-2.5 text-center leading-5 rounded-lg"
            >
              Read More
            </button>
          </Link>
        </div>
      </div>
      <div className="h-1 bg-white opacity-15"></div>
      <div className="text-white text-2xl text-center  font-bold container mx-auto mb-32">
        <h2 className="my-14 text-3xl">Your fans can buy you a Chai</h2>
        <div className="flex gap-5 justify-around flex-col md:flex-row">
          <div className="item space-y-3">
            <img
              className="bg-slate-500 rounded-full p-2 mx-auto"
              src="/man.gif"
              alt=""
              width={44 * 2}
            />
            <p>Fund Yourself</p>
          </div>
          <div className="item space-y-3">
            <img
              className="bg-slate-500 rounded-full p-2 mx-auto"
              src="/coin.gif"
              alt=""
              width={44 * 2}
            />
            <p>Fund Yourself</p>
          </div>
          <div className="item space-y-3">
            <img
              className="bg-slate-500 rounded-full p-2 mx-auto"
              src="/group.gif"
              alt=""
              width={44 * 2}
            />
            <p>Fund Yourself</p>
          </div>
        </div>
        <div className="h-1 bg-white opacity-15 mt-20"></div>
        <div className="flex flex-col items-center text-white text-2xl text-center  font-bold container mx-auto mb-32">
          <h2 className="my-14 text-3xl">Learn More about us</h2>
          <iframe
            className="w-full max-w-[560px] aspect-video"
            src="https://www.youtube.com/embed/ZkISTNQNGb4?si=2hC9ZR2SXwTntgRH"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </>
  );
}
