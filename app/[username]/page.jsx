import React from "react";

const Username = async ({ params }) => {
  const allparams = await params;
  return (
    <>
      <div className="cover w-full bg-red-50 relative">
        <img
          className="object-cover w-full h-[350] "
          src="https://c10.patreonusercontent.com/4/patreon-media/p/campaign/4842667/452146dcfeb04f38853368f554aadde1/eyJ3Ijo5NjAsIndlIjoxfQ%3D%3D/20.gif?token-hash=Sshj8rN2dF7NBlQi-5wscALqV5vNm4HP3wPesjbFKVI%3D&token-time=1791072000"
          alt=""
        />
        <div className="absolute -bottom-20 border border-white rounded-full right-[46%]">
          <img
            width={150}
            height={150}
            className="rounded-full"
            src="https://c10.patreonusercontent.com/4/patreon-media/p/campaign/4842667/aa52624d1cef47ba91c357da4a7859cf/eyJoIjozNjAsInciOjM2MH0%3D/4.gif?token-hash=p3ovfN6cfhARlq8rgSetitbR7lXN-doChDq6r5UDvpk%3D&token-time=1790121600"
            alt=""
          />
        </div>
        </div>
        <div className="info flex justify-center items-center my-24 w-full flex-col gap-2">
          <div className="text-lg font-bold"> 
            @{allparams.username}
          </div>
          <div className="text-slate-400">
            Creating animated art for VTTs
          </div>
          <div className="text-slate-400">
            9719 members . 82 posts . 1.2k followers . $15,450/releases
          </div>
          <div className="payments flex gap-3 w-[80%] mt-11">
            <div className="supporters w-1/2 bg-slate-900 rounded-lg p-10 text-white">
            <h2 className="text-2xl font-bold my-5">Supporters</h2>
              <ul className=" mx-5 text-sm">
                <li className="my-2 flex gap-2 items-center">
                  <img width={33} src="avatar.gif" alt="" />
                  <span>
                  Saurav donated <span className="font-bold">$30</span>. with a message "I support your bro. Lots of ❤️"
                  </span>
                </li>
                <li className="my-2 flex gap-2 items-center">
                  <img width={33} src="avatar.gif" alt="" />
                  <span>
                  Saurav donated <span className="font-bold">$30</span>. with a message "I support your bro. Lots of ❤️"
                  </span>
                </li>
                <li className="my-2 flex gap-2 items-center">
                  <img width={33} src="avatar.gif" alt="" />
                  <span>
                  Saurav donated <span className="font-bold">$30</span>. with a message "I support your bro. Lots of ❤️"
                  </span>
                </li>
              </ul>
            </div>
            <div className="makePayments w-1/2 bg-slate-900 rounded-lg p-10 text-white">
              <h2 className="text-2xl my-5 font-bold">Make a payment</h2>
              <div className="flex gap-2 flex-col">
                <input type="text" className="w-full p-3 rounded-lg bg-slate-800" placeholder="Enter Name" />
                <input type="text" className="w-full p-3 rounded-lg bg-slate-800" placeholder="Enter Message" />
                <input type="text" className="w-full p-3 rounded-lg bg-slate-800" placeholder="Enter Amount" />
                <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-4 py-2.5 text-center leading-5">Pay</button>
              </div>
              <div className="flex gap-2 mt-5">
                <button type="button" className="bg-slate-800 p-3 rounded-lg">Pay $10</button>
                <button type="button" className="bg-slate-800 p-3 rounded-lg">Pay $20</button>
                <button type="button" className="bg-slate-800 p-3 rounded-lg">Pay $30</button>
              </div>
            </div>
          </div>
        </div>
    </>
  );
};

export default Username;
