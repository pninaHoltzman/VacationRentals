import {NavLink } from 'react-router-dom'
import '../style.css'
export const Nav = () => {

    return <>
        <div className='nav'>
        <div className='logo'></div>
            <div id='routing'>
            <NavLink to={'Advertiser'} className='link'>לפרסום</NavLink>
            <span className='line'>|</span>
            <NavLink to={'Login'} className='link'>התחברות</NavLink>
            <span className='line'>|</span>
            <NavLink to={'Signup'} className='link'>הרשמה</NavLink>
            <span className='line'>|</span>
            <NavLink to={'HomePage'} className='link'>דף הבית</NavLink>




            </div>
        </div>
    </>
}