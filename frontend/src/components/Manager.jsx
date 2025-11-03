import React, { useEffect, useState } from 'react'
import { useRef, } from 'react'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';


const Manager = () => {
  const ref = useRef()
  const passwordRef = useRef()
  const [form, setform] = useState({ site: "", username: "", password: "" })


  const [passwordArray, setPasswordArray] = useState([])

  const getPasswords = async() => {
    let ref = await fetch("http://localhost:3000")
    let passwords = await ref.json()
    console.log(passwords);
    setPasswordArray(passwords);
   }
    useEffect(() => {
    getPasswords()


  }, [])
  const copyText = (text) => {
    toast('Copied to clipboard!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,

    });
    navigator.clipboard.writeText(text)
  }


  const showPassword = () => {
    passwordRef.current.type = "text"
    console.log(ref.current.src);
    if (ref.current.src.includes("/visibility_off.png")) {

      ref.current.src = "/visibility.png"
      passwordRef.current.type = "password"
}
    else {
      ref.current.src = "/visibility_off.png"
      passwordRef.current.type = "text"
    }
  }


  const savePassword = async () => {
    if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
// if any such id exists in the database delete it
     await fetch("http://localhost:3000",{method: "DELETE",headers: {"Content-Type": "application/json"}, body: JSON.stringify({id:form.id})} )

      setPasswordArray([...passwordArray, { ...form, id: uuidv4() }])
      await fetch("http://localhost:3000",{method: "POST",headers: {"Content-Type": "application/json"}, body: JSON.stringify({ ...form, id: uuidv4() })} )
        
      
      //localStorage.setItem("password", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
      //console.log([...passwordArray, form]);
      setform({ site: "", username: "", password: "" })
      toast('Password to be saved!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,

      });
    }
    else {
      toast("Error: Password not save!");
    }

  }

  const deletePassword = async(id) => {

    let c = confirm("Do you really want to delete this password!")
    if (c) {
      console.log("Deleting password with id", id);
      setPasswordArray(passwordArray.filter(item => item.id !== id))
     // localStorage.setItem("password", JSON.stringify(passwordArray.filter(item => item.id !== id)))
      let res = await fetch("http://localhost:3000",{method: "DELETE",headers: {"Content-Type": "application/json"}, body: JSON.stringify({id})} )
    }
    toast('Password was deleted!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,

    });

  }

// Edit password function kya kar raha hai ki jo password edit karna hai uska password ki id set karde rha hai form mein aur us id ko password array se hata rha hai taki wo dobara na aaye
  const editPassword = (id) => {
  console.log("Editing password with id", id);
    setform({...passwordArray.filter(i => i.id === id)[0],id: id})
    setPasswordArray(passwordArray.filter(item => item.id !== id))

}
const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value })
  }
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />

      <div className="absolute top-0 z-[-2] h-screen w-screen rotate-180 transform bg-white bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(252,205,238,.5)_100%)]"></div>
      <div className=" md:mycontainer mx-auto bg-white-200 max-w-4xl ">
        <h1 className='text-4xl font-bold text-center border-white py-2 '>
          <span className='text-green-700'>&lt;</span>
          <span>Pass</span>
          <span className='text-green-700'>OP/&gt;</span>

        </h1>
        <p className='text-green-900 text-center border-white py-2 text-lg'> Your own Password Manager</p>

        <div className=" flex  flex-col p-4 text-black gap-5">
          <input className='rounded-full border border-green-500   w-full p-4 py-1' type="text" name="site" id="" placeholder='Enter website URL' value={form.site} onChange={handleChange} />
          <div className="flex w-full  gap-8 justify-between">
            <input className='rounded-full border  border-green-500 w-full p-4 py-1' type="text" name="username" id="" placeholder='Enter username' value={form.username} onChange={handleChange} />
            <div className=" relative">

              <input ref={passwordRef} className='rounded-full border border-green-500 px-4  w-full p-4 py-1 ' type="password" name="password" id="" placeholder='Enter Password' value={form.password} onChange={handleChange} />

              <span className='absolute right-0 top-1 cursor-pointer ' onClick={showPassword}>

                <img ref={ref} className='p-1' src="/visibility.png" alt="eye" />

              </span>

            </div>


          </div>
          <div className="flex justify-center border-white py-2">
            <button onClick={savePassword}
              className="flex  justify-center border-white  items-center gap-1 bg-green-600 hover:bg-green-700 text-white font-medium rounded-full px-4 py-2 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 w-fit"
              aria-label="Add Password"
            >
              <lord-icon
                src="https://cdn.lordicon.com/vjgknpfx.json"
                trigger="hover"
                style={{ width: "24px", height: "24px", }}
              ></lord-icon>
              <span>Save Password</span>
            </button>
          </div>
        </div>
        <div className="passwords">
          <h2 className='font-bold test-xl py-4'>Your Passwords</h2>
          {passwordArray.length  === 0 && <div className='bg-green-800 text-white px-2 py-2'>If password is empty then store password first then show it!</div>}
          {passwordArray.length  != 0 &&
            <table className="table-auto w-full rounded-md overflow-hidden ">
              <thead className='bg-green-800 text-white   '>
                <tr>
                  <th className='py-2'>Site</th>
                  <th className='py-2'>User name</th>
                  <th className='py-2'>Password</th>
                  <th className='py-2'>Action</th>
                </tr>
              </thead>
              <tbody className='bg-green-100'>
                {passwordArray.map((item, index) => {
                  return <tr key={index}>

                    <td className=' border-white py-2 text-center'>
                      <div className=' flex items-center justify-center'>
                        <a href={item.site} target='_Blank'>{item.site}</a>
                        <div className='size-7  cursor-pointer' onClick={() => copyText(item.site)}>
                          <lord-icon
                            src="https://cdn.lordicon.com/exymduqj.json"
                            trigger="hover"
                            style={{ width: "25px", height: "25px" }}
                          ></lord-icon>
                        </div>
                      </div>

                    </td>
                    <td className='text-center  border-white py-2 w-32'>
                      <div className='flex items-center justify-center'>
                        <span>{item.username}</span>
                        <div className='size-7 cursor-pointer' onClick={() => copyText(item.username)}>
                          <lord-icon
                            src="https://cdn.lordicon.com/exymduqj.json"
                            trigger="hover"
                            style={{ width: "25px", height: "25px" }}
                          ></lord-icon>

                        </div>
                      </div>

                    </td>
                    <td className='text-center border-white py-2  w-32'>
                      <div className='flex items-center justify-center'>
                        <span>{"*".repeat(item.password.length)}</span>
                        <div className='size-7 cursor-pointer' onClick={() => copyText(item.password)}>
                          <lord-icon
                            src="https://cdn.lordicon.com/exymduqj.json"
                            trigger="hover"
                            style={{ width: "25px", height: "25px" }}
                          ></lord-icon>

                        </div>
                      </div>

                    </td>
                    <td className='  text-center  border-white py-2 w-32'>
                      <span className='cursor-pointer mx-1' onClick={() => { editPassword(item.id) }}>
                        <lord-icon
                          src="https://cdn.lordicon.com/fikcyfpp.json"
                          trigger="hover"
                          style={{ width: "25px", height: "25px", paddingTop: "5px" }}
                        ></lord-icon>
                      </span>
                      <span className='cursor-pointer mx-1' onClick={() => { deletePassword(item.id) }}>
                        <lord-icon
                          src="https://cdn.lordicon.com/jzinekkv.json"
                          trigger="hover"
                          style={{ width: "25px", height: "25px", paddingTop: "5px" }}
                        ></lord-icon>
                      </span>

                    </td>

                  </tr>
                })}


              </tbody>
            </table>}
        </div>
      </div>
    </>
  )
}

export default Manager 