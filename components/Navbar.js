import React from 'react'
import { useRef } from 'react';
import Image from 'next/image'
import Link from 'next/link'
import { AiOutlineShoppingCart, AiFillCloseCircle, AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai';
import { BsFillBagCheckFill } from 'react-icons/bs';
import { MdAccountCircle } from 'react-icons/md';
import { useState } from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
//can apply min-h-screen class on every page
const Navbar = ({ logout, user, cart, addToCart, removeFromCart, clearCart, subTotal }) => {
  const [dropdown, setDropdown] = useState(false)
  const [sidebar, setSidebar] = useState(false)
  const router=useRouter()
  useEffect(() => {
    Object.keys(cart).length !== 0 && setSidebar(true)
    let exempted=['/checkout','/order','/orders','/myaccount','/forgot','/signup','/login']
    if(exempted.includes(router.pathname)){
      setSidebar(false)
    }
  }, [])
  const ref = useRef()
  const toggleCart = () => {
    setSidebar(!sidebar)
    /*if (ref.current.classList.contains('translate-x-full')) {
      ref.current.classList.remove('translate-x-full');
      ref.current.classList.add('translate-x-0');

    }
    else if (!ref.current.classList.contains('translate-x-full')) {
      ref.current.classList.remove('translate-x-0');
      ref.current.classList.add('translate-x-full');

    }*/
  }
  return (

    <div className='flex flex-col md:flex-row md:justify-start justify-center items-center shadow-md sticky top-0 bg-white z-10 '>
      <div className="logo mr-auto md:mx-5 mt-2">
        <Link href={'/'}><a><Image width={200} height={45} src="/Ari.png" alt="" /></a></Link>
      </div>
      <div className="nav">
        <ul className='flex items-center space-x-6 font-bold'>
          <Link href={'/tshirts'}><a><li className='hover:text-cyan-600'>Jerseys</li></a></Link>
          <Link href={'/hoodies'}><a><li className='hover:text-cyan-600'>Hoodies</li></a></Link>
          <Link href={'/stickers'}><a><li className='hover:text-cyan-600'>Stickers</li></a></Link>
          <Link href={'/mugs'}><a><li className='hover:text-cyan-600'>Mugs</li></a></Link>
        </ul>
      </div>
      <div className="cart absolute right-0 top-5 mx-5 cursor-pointer flex items-center">
        <span onMouseOver={() => { setDropdown(true) }} onMouseLeave={() => {setDropdown(false)  }}>
          {dropdown && <div onMouseOver={() => { setDropdown(true) }} onMouseLeave={() => { setDropdown(false) }} className="absolute right-8 bg-cyan-300 shadow-lg  top-6 rounded-md px-5 w-32 py-4">
            <ul>
              <Link href={'/myaccount'}><a><li className='py-1 hover:text-cyan-600 text-sm font-bold'>My Account</li></a></Link>
              <Link href={'/orders'}><a><li className='py-1 hover:text-cyan-600 text-sm font-bold'>My Orders</li></a></Link>
              <li onClick={logout} className='py-1 hover:text-cyan-600 text-sm font-bold'>Logout</li>
            </ul>
          </div>}
          {user.value && <MdAccountCircle className='text-xl md:text-2xl mx-2' />}
        </span>
        {!user.value && <Link href={'/login'}><a>
          <button className='bg-cyan-500 px-2 py-1 rounded-md text-sm text-white mx-2'>Login</button>
        </a></Link>}
        <AiOutlineShoppingCart onClick={toggleCart} className='text-xl md:text-2xl' />
      </div>

      <div ref={ref} className={`z-10 w-72 h-full sideCart {//overflow-y-scroll} fixed top-0 bg-cyan-100 px-8 py-10 transition-all ${sidebar ? 'right-0' : '-right-96'}`}>
        <h2 className='font-bold text-lg text-center'>Shopping Cart</h2>
        <span onClick={toggleCart} className="absolute top-5 right-2 cursor-pointer text-2xl text-cyan-500"><AiFillCloseCircle /></span>
        <ol className='list-decimal font-semibold'>
          {Object.keys(cart).length == 0 && <div className='my-4 font-semibold'>Your cart is empty!</div>}
          {Object.keys(cart).map((k) => {
            return <li key={k}>
              <div className="item flex my-5">
                <div className='w-2/3 font-semibold'>{cart[k].name}({cart[k].size}/{cart[k].variant})</div>
                <div className=' flex font-semibold items-center justify-center w-1/3 text-lg'><AiFillMinusCircle onClick={() => { removeFromCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant) }} className='cursor-pointer text-cyan-500' /><span className='mx-2 text-sm'>{cart[k].qty}</span><AiFillPlusCircle onClick={() => { addToCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant) }} className='cursor-pointer text-cyan-500' /></div>
              </div>
            </li>
          })}
        </ol>
        <div className="font-bold my-2">Subtotal: ₹{subTotal}</div>
        <div className='flex'>

          <Link  href={'/checkout'}><button disabled={Object.keys(cart).length===0} className=" disabled:bg-cyan-300 flex mr-2 text-white bg-cyan-500 border-0 py-2 px-2 focus:outline-none hover:bg-cyan-600 rounded text-sm"><BsFillBagCheckFill className='m-1' />CheckOut</button></Link>
          <button disabled={Object.keys(cart).length===0} onClick={clearCart} className="disabled:bg-cyan-300 flex mr-2 text-white bg-cyan-500 border-0 py-2 px-2 focus:outline-none hover:bg-cyan-600 rounded text-sm">Clear Cart</button>
        </div>
      </div>
    </div>

  )
}

export default Navbar