import City from './models/city.js'
import Category from './models/category.js'
import Adverteiser from './models/adverteiser.js'
import jwt from 'jsonwebtoken';

export const checkEmail = (req, res, next) => {
    const { email } = req.body
    if (email && email.contains('@')) {
        return next()
    }
    res.status(400).send({ error: 'your email is invalid!' })
}

export const checkAuthorization = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        // Authorization - הרשאה
        return res.status(401).send('Authorization failed!')
    }
    console.log(authHeader)
    const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : authHeader;
    
    if (!token) {
        return res.status(401).send('Authorization failed!')
    }
    jwt.verify(token,'HT2yg75FXgfvy', (error, decoded) => {
        if (error || !decoded) {
            return res.status(401).send('Authentication failed!');
        }
        next();
    });
}
// export const checkAuthorization = (req, res, next) => {

//     if (!req.headers.authorization) {
//         return res.status(401).send('Authorization failed3!')
//     }

//     const token = req.headers.authorization.split(' ')[1]

//     if (!token) {
//         return res.status(401).send('Authorization failed2!')
//     }
//     jwt.verify(token, 'Htgfsvzdsax', (error, decoded) => {
//         if (error || !decoded) {
//             return res.status(401).send('Authentication failed1!')
//         }
//         if (decoded) {
//             next()
//         }
//     })
// }

// const authHeader = req.headers.authorization;
// if (!authHeader) {
//     // Authorization - הרשאה
//     return res.status(401).send('Authorization failed!')
// }
// console.log(authHeader)
// const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : authHeader;

// if (!token) {
//     return res.status(401).send('Authorization failed!')
// }
// jwt.verify(token,'HT2yg75FXgfvy', (error, decoded) => {
//     if (error || !decoded) {
//         return res.status(401).send('Authentication failed!');
//     }
//     next();
// });
// //בודק האם העיר קיימת
// export const cityExists = (req, res, next) => {
//     const {c} = req.body

//     if (!c && req.method == 'PATCH') {
//         return next()
//     }

//     City.findById(c)
//         .then(city => {
//             if (!city) {
//                 return res.status(404).send({ error: `city not found!` })
//             }
//             next()
//         })
//         .catch(error => {
//             return res.status(500).send({ error: error.message })
//         })
// }
// //בודק האם הקטגוריה קיימת
// export const categoryExists = (req,res,next) =>{
//     const{category} =req.body 

//     if(!category && req.method == 'PATCH')
//         return next()

//     Category.findById(category)
//         .then(cat=>{
//             if(!cat){
//                 return res.status(404).send({error: error.message})
//             }
//             next()
//         })
//         .catch(error=>{
//             return res.status(500).send({error: error.message})
//         })
// }
//בודק האם יש כזה מפרסם
export const adverteiserExists = (req,res,next)=>{
    const {adver}=req.body
    if(!adver && req.method== 'PATCH')
        return next()
    Adverteiser.findById(adver)
         .than(a=>{
            if(a){
                res.status(200).send({error:err.message})
            }
            next()
         })
         .catch(error=>{
            return res.status(500).send({error: error.message})
         })
}

