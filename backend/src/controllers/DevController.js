const axios = require('axios')
const Dev = require('../Models/Dev')
const parseStringAsArray = require('../utils/parseStringAsArray')
const { findConnections, sendMessage } = require('../websocket')
module.exports = {
    async index(req, res){
        const devs = await Dev.find()

        return res.json(devs)
    },
    
    async update(req, res){
        const devs = await Dev.find()

        return res.json(devs)
    },
    
    async destroy(req, res){
        const devs = await Dev.find()

        return res.json(devs)
    },
    
    async store(req, res) {
        const {github_username, techs, latitude, longitude} = req.body

        let dev = await Dev.findOne({ github_username })

        if(!dev){
            const response = await axios.get(`https://api.github.com/users/${github_username}`)
    
            const {name = login, avatar_url, bio} = response.data
        
            techArray = parseStringAsArray(techs)
        
            const location = {
                type: "Point",
                coordinates: [longitude, latitude]
            }
            
            const dev = await Dev.create({
                name,
                github_username,
                bio, 
                avatar_url,
                techs: techArray,
                location
            })
            
            const sendSocketMessageTo = findConnections(
                { latitude, longitude },
                techArray,
            )

            sendMessage(sendSocketMessageTo, 'new-dev', dev)
        }
    
        return res.json(dev)
    }
}