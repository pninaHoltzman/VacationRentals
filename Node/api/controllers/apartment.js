import Apartment from '../models/apartment.js'
import City from '../models/city.js'
import Category from '../models/category.js'
import Adverteiser from '../models/adverteiser.js';
import adverteiser from '../models/adverteiser.js';
export const addApartment = async (req, res) => {
    console.log(req.body)
    const { 
        apartamaentName,
        descripting,
        picture,
        category,
        city,
        address,
        bedsNumber,
        moreThings,
        price,
        adverteiser
    } = req.body;

    try {
        // יצירת דירה חדשה
        const newApartment = new Apartment({
            apartamaentName,
            descripting,
            picture,
            category,
            city,
            address,
            bedsNumber,
            moreThings,
            price,
            adverteiser
    });

        const savedApartment = await newApartment.save();

        // עדכון קטגוריה
        await Category.findByIdAndUpdate(
            category,
            { $push: { arrApartments: savedApartment._id } }, 
        );
        // עדכון עיר
        await City.findByIdAndUpdate(
            city,
            { $push: { arrApartments: savedApartment._id } },
        );
        // עדכון משווק
        await Adverteiser.findByIdAndUpdate(
            adverteiser, 
            { $push: { arrApartments: savedApartment._id } },
        );
        console.log(savedApartment)
        res.status(201).json(savedApartment);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};
export const updateApartment = async (req, res) => {
    const { id, idA } = req.params;
 
    console.log(req.body);
    try {
        // עדכון הדירה
        const apart = await Apartment.findByIdAndUpdate(id, req.body, { new: true });

        if (!apart) {
            return res.status(404).send({ message: "Apartment not found" });
        }

        // בדוק אם ה-adverteiser תואם
        if (apart.adverteiser.toString() === idA) {
            console.log(apart);
            return res.status(200).send({ message: `Update apartment ${apart._id} succeeded!`, apart });
        } else {
            return res.status(400).send({ message: "You can't update an apartment that doesn't belong to you" });
        }
    } catch (err) {
        return res.status(500).send({ error: err.message });
    }
}

export const deleteApartment = async (req, res) => {
    const { id ,idA} = req.params; 
       
    try {
        // שליפת הדירה למחיקת המידע הקשור אליה
        const MYapartment = await Apartment.findById(id);
        
        if (!MYapartment) {
            return res.status(404).json({ error: 'Apartment not found!' });
        }
        console.log(MYapartment);
        if(MYapartment.adverteiser !=idA)
            return res.status(404).json({ error: 'you cant delete an apartment that dont belongs to you' });
    

        // מחיקת מזהה הדירה מהרשימה בקטגוריה
        await Category.findByIdAndUpdate(
            MYapartment.category,
            { $pull: { arrApartments: MYapartment._id } } 
        );

        // מחיקת מזהה הדירה מהרשימה בעיר
        await City.findByIdAndUpdate(
            MYapartment.city,
            { $pull: { arrApartments: MYapartment._id } }
        );

        // מחיקת מזהה הדירה מהרשימה במשווק
        await Adverteiser.findByIdAndUpdate(
            MYapartment.adverteiser,
            { $pull: { arrApartments: MYapartment._id } }
        );

        // מחיקת הדירה ממאגר הדירות
        await Apartment.findByIdAndDelete(id);

        res.status(200).json({ message: 'Apartment deleted successfully!' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

export const getAllApartments = (req, res) => {
    Apartment.find()
        .populate({ path: 'category', select: {categoryName:1, _id:0}  })
        .populate({ path: 'city', select:{cityName:1, _id:0}  })
        .populate({ path: 'adverteiser', select: { email: 1, phone: 1, morePhone: 1, _id: 0 } })
        .then(all => {
            res.status(200).send(all)
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}
export const getApartmentById = (req, res) => {
    const { id } = req.params;
    
    Apartment.findById(id)
    .populate({ path: 'category', select: {categoryName:1, _id:0}  })
    .populate({ path: 'city', select:{cityName:1, _id:0}  })
    .populate({ path: 'adverteiser', select: { email: 1, phone: 1, morePhone: 1, _id: 0 } })
        .then(apartment => {
            if (!apartment) {
                return res.status(404).send({ error: 'Apartment not found' });
            }
            res.status(200).send(apartment);
        })
        .catch(err => {
            res.status(500).send({ error: err.message });
        });
}
export const getApartmentByCategory = (req, res) => {
    const { id } = req.params;
    Category.findById(id)
        .then(cat => {
            if (!cat) {
                return res.status(404).send({ error: 'Category not found' });
            }
            
            const apartmentPromises = cat.arrApartments.map(i => {
                console.log(i);
                return Apartment.findById(i)
                        .populate({ path: 'category', select: {categoryName:1, _id:0}  })
                        .populate({ path: 'city', select:{cityName:1, _id:0}  })
                        .populate({ path: 'adverteiser', select: { email: 1, phone: 1, morePhone: 1, _id: 0 } })
                .then(apartment => {
                    if (!apartment) {
                        throw new Error('Apartment not found');
                    }
                    return apartment;
                });
            });

            return Promise.all(apartmentPromises);
        })
        .then(apartments => {
            res.status(200).send(apartments);
        })
        .catch(err => {
            res.status(500).send({ error: err.message });
        });
}
export const getApartmentByCity = (req, res) => {
    const { id } = req.params;

    City.findById(id)
        .then(city => {
            if (!city) {
                return res.status(404).send({ error: 'city not found' });
            }
            const apartmentPromises = city.arrApartments.map(i => {
                return Apartment.findById(i)
                .populate({ path: 'category', select: {categoryName:1, _id:0}  })
                .populate({ path: 'city', select:{cityName:1, _id:0}  })
                .populate({ path: 'adverteiser', select: { email: 1, phone: 1, morePhone: 1, _id: 0 } })
                .then(apartment => {
                    if (!apartment) {
                        throw new Error('Apartment not found');
                    }
                    return apartment;
                });
            });
            return Promise.all(apartmentPromises);
        })
        .then(apartments => {
            res.status(200).send(apartments);
        })
        .catch(err => {
            res.status(500).send({ error: err.message });
        })           
}
export const getApartmentByAdverteiser = (req, res) => {
    const { id } = req.params;
    Adverteiser.findById(id)
        .then(adverteiser => {
            if (!adverteiser) {
                return res.status(404).send({ error: 'adverteiser not found' });
            }
            const apartmentPromises = adverteiser.arrApartments.map(i=> {
                return Apartment.findById(i)
                .populate({ path: 'category', select: {categoryName:1, _id:0}  })
                .populate({ path: 'city', select:{cityName:1, _id:0}  })
                .populate({ path: 'adverteiser', select: { email: 1, phone: 1, morePhone: 1, _id: 0 } })
                .then(apartment => {
                    if (!apartment) {
                        throw new Error('Apartment not found');
                    }
                    return apartment;
                });
            });
            return Promise.all(apartmentPromises);
        })
        .then(apartments => {
            res.status(200).send(apartments);
        })
        .catch(err => {
            res.status(500).send({ error: err.message });
        })           
}

export const getApartmentByRangeBed = (req, res) => {
    const {min, max} = req.params;
    Apartment.find({ bedsNumber: { $gte: min, $lte: max } })
    .populate({ path: 'category', select: {categoryName:1, _id:0}  })
    .populate({ path: 'city', select:{cityName:1, _id:0}  })
    .populate({ path: 'adverteiser', select: { email: 1, phone: 1, morePhone: 1, _id: 0 } })
    .then(apartment => {
        res.status(200).send(apartment)
    })
    .catch(err=>{
        res.status(500).send({ error: err.message })
    })
}
export const getApartmentByRangePrice = (req, res) => {
    const {min, max} = req.params;
    Apartment.find({ price: { $gte: min, $lte: max } })
    .populate({ path: 'category', select: {categoryName:1, _id:0}  })
    .populate({ path: 'city', select:{cityName:1, _id:0}  })
    .populate({ path: 'adverteiser', select: { email: 1, phone: 1, morePhone: 1, _id: 0 } })
    .then(apartment => {
        res.status(200).send(apartment)
    })
    .catch(err=>{
        res.status(500).send({ error: err.message })
    })
}
