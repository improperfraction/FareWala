import { useEffect, useRef, useState } from 'react'

function App() {

  const [darkMode, setdarkMode] = useState(false);
  const [dist, setDist] = useState('');
  const [nt, setNt] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [bdown, setBdown] = useState(false);
  const [fare, setFare] = useState(0);


  const sliderRef= useRef(null);

  const handleReset = () => {
    setDist('');
    setFare(0);
  }
  useEffect(() => {
    const clickOutside = (e) => {
        if (sliderRef.current && !sliderRef.current.contains(e.target)) {
          setIsOpen(false);
          setBdown(false);
        }
    }
    document.addEventListener("mousedown", clickOutside);
    return () => {
        document.removeEventListener("mousedown", clickOutside);
    }
}, [setIsOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let fare = 26 + (dist - 1.5) * 17.14;
    if (nt) {
      fare = fare * 1.25; // add night charge
    }
    console.log("Fare is ", Math.round(fare));
    setFare(Math.round(fare));
    setIsOpen(true); // Open the sliding pop screen
  };

  useEffect(() => {
    function isNightTime() {
      const hour = new Date().getHours();
      console.log("current hour is ", hour);
      return hour >= 0 && hour <= 5;
    }
    setNt(isNightTime());

  }, [])

  return (
    <>
      <div className={`${darkMode ? "dark" : ""}`}>
        <button className="absolute top-4 right-4 p-2 bg-gray-300 dark:bg-gray-600 rounded-full transform transition duration-200 ease-in-out hover:scale-110" onClick={() => setdarkMode(!darkMode)}>
          {darkMode ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
          </svg>
            : <svg xmlns="http://www.w3.org/2000/svg" fill="" viewBox="0 0 24 24" strokeWidth={1.5} stroke="gray" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
            </svg>}
        </button>
        <div className='flex flex-col w-screen min-h-screen bg-white dark:bg-gray-900'>
          <div className='mt-40 md:mt-50 lg:mt-60 flex flex-row justify-center items-center'>
            <h1 className="text-4xl font-extrabold md:text-6xl lg:text-7xl text-slate-700 dark:text-slate-200">Fare</h1>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-yellow-500">Wala</h1>
          </div>

          <div className="flex items-center justify-center mt-4 p-4">
            <form
              onSubmit={handleSubmit} className="w-full lg:w-1/3 border border-black/30 dark:border-white/30 rounded-xl p-6 space-y-3">
              <div>
                <h2 className="text-xl lg:text-2xl text-black dark:text-white font-bold">Auto Fare Calculator</h2>
                <p className="text-sm lg:text-base text-gray-600 dark:text-gray-400 mt-1">
                  To know Govt approved meter fare for your auto, insert the distance shown on meter. This service is for verification purposes only.
                </p>
              </div>
              <div className='text-base lg:text-lg text-black dark:text-white font-semibold'>For Pune/PCMC region { }</div>
              <div>
                <label className="block  text-black dark:text-white text-sm lg:text-base mb-1">Distance of the trip</label>
                <input type="number" placeholder="Enter distance" value={dist} onChange={(e) => setDist(e.target.value)}
                  className="w-full text-black bg-white text-sm lg:text-base dark:bg-black dark:text-white border border-black/30 dark:border-white/20 rounded-lg p-2" />
              </div>
              <div className="flex gap-3 justify-start pt-2">
                <button type="submit" className="text-base lg:text-lg bg-slate-200 dark:bg-slate-500 text-black dark:text-white rounded-md px-4 py-2 dark:hover:bg-gray-600 hover:bg-gray-300"> Calculate Fare</button>
                <button type="button" onClick={handleReset} className=" text-base lg:text-lg bg-gray-700 text-white rounded-md px-4 py-2 hover:bg-gray-600">Reset</button>
              </div>
            </form>
            <div ref={sliderRef} className={`flex flex-row justify-center rounded-t-lg  fixed bottom-0 left-0 right-0 bg-slate-100 dark:bg-slate-700 p-6 transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-y-0" : "translate-y-full"}`}>
              <div className="w-full p-2 lg:w-1/3 flex flex-col justify-between items-center ">
                <h2 className="text-lg text-black dark:text-white font-semibold">Estimated Fare</h2>
                {fare === 0 && dist == '' && <p className="text-red-400 mt-2 text-sm lg:text-base text-center">Please enter a valid distance greater than 1.5 km</p>}
               {fare !=0 && dist != '' &&
               <div className='w-full'>
                <p className='text-sm lg:text-base text-black text-center dark:text-white'>We estimate that your fare would be </p>
                <p className="text-4xl text-black dark:text-white my-2 text-center lg:text-6xl font-extrabold">₹ {fare}</p>
                {bdown && <div className="border border-gray-300 dark:border-gray-400 p-4 w-full mt-4">
                  <div className="grid grid-cols-2 gap-y-2 text-black dark:text-white text-sm sm:text-base">
                    <div className="font-medium text-black dark:text-white">Region:</div>
                    <div className='text-black pl-2 dark:text-white'>Pune & PCMC</div>
                    <div className="font-medium text-black dark:text-white">Base Fare for first 1.5 km:</div>
                    <div className='text-black dark:text-white pl-2'>26</div>
                    <div className="font-medium text-black dark:text-white">Remaining Distance:</div>
                    <div className='text-black dark:text-white pl-2'>{dist - 1.5}</div>
                    <div className="font-medium text-black dark:text-white">Rate per km:</div>
                    <div className='pl-2'>17.14</div>
                    <div className="font-medium">Remaining fare:</div>
                    <div className='pl-2'>{fare-26}</div>
                    <div className="font-medium">Night charges:</div>
                    <div className='pl-2'>{nt? "Yes": "No"}</div>
                    <div className="font-semibold mt-2">Total:</div>
                    <div className="font-semibold mt-2 pl-2">{fare}</div>
                  </div>
                </div>}
                <button onClick={() => {
                  setBdown(!bdown); // Toggle the break down view
                }} className="bg-black text-white w-full py-2 my-1 rounded-lg">{bdown ? "Hide break down" : "Show break down"} </button>
                </div>}
                <button onClick={() => {
                  setIsOpen(!isOpen); // Close the sliding pop screen
                  setBdown(false); // Reset breakdown view
                }} className="bg-white text-black w-full py-2 my-1 rounded-lg">Cancel </button> 
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
