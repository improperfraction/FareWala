import React, { useState } from "react";

const SlidingPopScreen = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [bdown, setBdown] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault(); // prevent form reload
        setIsOpen(true);
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white p-6 flex items-center justify-center">
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    placeholder="Enter something"
                    className="px-4 py-2 rounded bg-gray-800 border border-gray-700"
                />
                <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded"
                >
                    Submit
                </button>
            </form>

            {/* Sliding Pop Screen */}
            <div className={`flex flex-row justify-center rounded-t-lg  fixed bottom-0 left-0 right-0 bg-slate-400 dark:bg-slate-600 p-6 transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-y-0" : "translate-y-full"} `}>
                <div className="w-full p-2 lg:w-1/3 flex flex-col justify-between items-center mb-2">

                    <h2 className="text-lg font-semibold">Estimated Fare</h2>
                    <p>We Estimate that your fare would be </p>
                    <p className="text-4xl lg:text-6xl font-extrabold">₹ 100</p>
                   {bdown && <div className="border border-gray-300 p-4 w-full  mx mt-4">
                        <div className="grid grid-cols-2 gap-y-2 text-sm sm:text-base">
                            <div className="font-medium">Region</div>
                            <div>Pune</div>

                            <div className="font-medium">Base Fare</div>
                            <div>26</div>

                            <div className="font-medium">Extra Distance</div>
                            <div></div>

                            <div className="font-medium">Rate per KM</div>
                            <div></div>

                            <div className="font-medium">Remaining Fare</div>
                            <div></div>

                            <div className="font-medium">Night Charges</div>
                            <div></div>

                            <div className="font-semibold mt-2">Total</div>
                            <div className="font-semibold mt-2"></div>
                        </div>
                    </div>  }                 
                     <button onClick={() => {
                        setBdown(!bdown); // Toggle the break down view
                    }} className="bg-black w-full py-2 mt-2 rounded-lg">{bdown ? "Hide break down" : "Show break down"} </button>
                    <button onClick={() => {
                        setIsOpen(!isOpen); // Close the sliding pop screen
                    }} className="bg-white text-black w-full py-2 mt-2 rounded-lg">Cancel </button>

                </div>
            </div>
        </div>
    );
};

export default SlidingPopScreen;
