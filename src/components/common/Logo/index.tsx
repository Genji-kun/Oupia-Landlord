"use client"

import { Link } from "react-router-dom";

const Logo = () => {

    return (
        <Link to="/">
            <div className="flex gap-x-2 items-center text-lg font-bold font-montserrat">
                <svg className="fill-primary-500 w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 342 396.81"><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path className="cls-1" d="M4.87,316.94,69,381.06c35.8,35.89,93,6,76-45h0s-21.14-53.93-27-114c-8-82,35.64-120.23,85-112,42,7,58.95,49,57,75-3,40-47,59-46,87,1.07,30,24.79,40,34.89,40h76.43A16.68,16.68,0,0,0,342,295.38V143.93a16.69,16.69,0,0,0-6.07-12.87L181.61,3.81a16.68,16.68,0,0,0-21.22,0L6.07,131.06A16.69,16.69,0,0,0,0,143.93V305.16A16.66,16.66,0,0,0,4.87,316.94Z" /></g></g></svg>
                <h1 className="uppercase font-bold ">Oupia</h1>
            </div>
        </Link>

    );
};

export default Logo;