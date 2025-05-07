import jwt from "jsonwebtoken";
import Advertiser from '../models/adverteiser.js'
import bcrypt from 'bcrypt';


export const signup = async (req, res) => {
    const { email, password, phone, morePhone } = req.body;

    try {
        const existingAdvertiser = await Advertiser.find().where({ email: { $eq: email } });
        if (existingAdvertiser.length > 0) {
            return res.status(400).send({ error: `אימייל קיים!  עליך להתחבר` });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newAdvertiser = new Advertiser({
            email,
            password: hashedPassword, 
            phone,
            morePhone
        });

        const advertiser = await newAdvertiser.save();

        const token = await jwt.sign(
            { email: advertiser.email },
            process.env.SECRET,
            {
                expiresIn: '1h'
            }
        );
        res.status(200).send({ newAdvertiser, token });
    } catch (err) {

        res.status(500).send({ error: err.message });
    }
};
export const login = (req, res) => {
    const { email, password } = req.body;

    Advertiser.findOne({ email })
        .then(ad => {
            if (!ad) {
                return res.status(404).send({ error: `אימייל לא קיים!  .` });
            }
            bcrypt.compare(password, ad.password, (err, isMatch) => {
                if (err) {
                    return res.status(500).send({ error: 'Server error' });
                }
                if (!isMatch) {
                    return res.status(400).send({ error: 'סיסמא לא קיימת!' });
                }
                const token = jwt.sign(
                    { email: ad.email },
                     process.env.SECRET,
                    { expiresIn: '1h' }
                );
                res.status(200).send({ ad, token });
            });
        })
        .catch(err => {
            res.status(500).send({ error: err.message });
        });
};


export const getAll = (req, res) => {

    Advertiser.find()
        .then(Advertiser => {
            res.status(200).send(Advertiser)
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}
