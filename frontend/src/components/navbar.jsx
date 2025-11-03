import React from 'react'

const Navbar = () => {
    return (
        <nav className='bg-slate-800 flex justify-between items-center px-4 h-16 text-white'>
            <div className="logo font-bold text-2xl text-white">

                <span className='text-green-700'>  &lt;</span>
                Pass
                <span className='text-green-700'>OP/&gt; </span>

            </div>
           
            <button className='bg-green-600 flex gap-1 rounded-full p-1 hover:bg-green-700 ring-white ring-1'>
                <img src="/github.svg" alt="github" />
             <span className='font-bold' >github</span>
            </button>
        </nav>
    )
}

export default Navbar