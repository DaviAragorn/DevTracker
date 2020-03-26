module.exports = function parseStringAsArray(string){
    return string.split(',').map(tech => tech.trim()) 
}