import { Route, Routes } from "react-router-dom"
import {HomePage} from './HomePage.jsx'
import {Login} from './Login.jsx'
import { Signup } from './Signup.jsx'
import {Advertiser} from  './advertiser.jsx'
import { MoreDetails } from "./moreDetails.jsx"
import { Card } from "./Card.jsx"
import { Edit } from "./Edit.jsx"
import { Add1 } from "./Add1.jsx"






export const Routing = () => {

    return <>
     
        <Routes>
            <Route path="HomePage" element={<HomePage></HomePage>}></Route>
            <Route path="Login" element={<Login></Login>}></Route>
            <Route path="Signup" element={<Signup></Signup>}></Route>
            <Route path="Advertiser" element={<Advertiser></Advertiser>}></Route>
            <Route path="" element={<HomePage></HomePage>}></Route>
            <Route path="Card" element={<Card></Card>}></Route>


            <Route path="HomePage/MoreDetails/:it" element={<MoreDetails></MoreDetails>}></Route>
            <Route path="Advertiser/Edit/:it" element={<Edit></Edit>}></Route>
            <Route path="Advertiser/Add1" element={<Add1></Add1>}></Route>

        </Routes>
    </>
}