const Dev = require('../models/dev');
const parseStringAsArray = require('../utils/ParseStringAsArray');

module.exports = {
    async index(request, response) {
        // Buscar todos dev num raio de 10Km
        // Filtra por tecnologia
        //http://localhost:3333/?latitude=-7.1879885&longitude=-48.2095057&tech=React,%20React-Native

        const { latitude, longitude, techs } = request.query;

        const techsArray = parseStringAsArray(techs);

        // console.log(techsArray);
        
        const devs = await Dev.find({
            techs: {
                $in: techsArray,
            },
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude],
                    },
                    $maxDistance: 10000,
                },
            },
        });

        return response.json({ devs });
    }
}