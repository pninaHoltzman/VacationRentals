import City from '../models/city.js'
export const addCity = async(req, res) => {
    const {cityName } = req.body
    const existingCity = await City.find().where({ cityName: { $eq: cityName } });
        if (existingCity.length > 0) {
            return res.status(400).send({ error: `העיר קיימת` });
        }
    const newCity = new City({
        cityName: cityName
        
    })

    newCity.save()
        .then(city => {
            res.status(200).send({ message: `create city ${city} succeed!` })
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}

export const getAllCities = (req, res) => {

    City.find()
        .then(cities => {
            res.status(200).send(cities)
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}