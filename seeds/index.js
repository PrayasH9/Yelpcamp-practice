const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected!");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '62bb2597496a942bfe056c1e',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Do ipsum voluptate magna incididunt nulla laboris eu exercitation eu.',
            price,
            images: [
                {
                    url: 'https://res.cloudinary.com/dtqkfox8c/image/upload/v1657133965/YelpCamp/z23tbngnng1qqorozhxf.jpg',
                    filename: 'YelpCamp/z23tbngnng1qqorozhxf',
                },
                {
                    url: 'https://res.cloudinary.com/dtqkfox8c/image/upload/v1657133966/YelpCamp/mnclnlphiaeprcbihbuo.jpg',
                    filename: 'YelpCamp/mnclnlphiaeprcbihbuo',
                }
            ]

        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});