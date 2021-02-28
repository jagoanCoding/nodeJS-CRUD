
const axios = require('axios')
const { response, request } = require('express')

exports.homeRoutes = (req, res) => {

    axios.get('http://localhost:3000/api/users')
    .then(function(response){
       res.render('index', {users: response.data})
    })
    
    .catch(e => {
        res.send(e)
    })

}
exports.addUserRoute = (request, response) => {
    response.render('add_user')
}
exports.updateUserRoute = (req, res) => {

    axios.get('http://localhost:3000/api/users', {params: {id: req.query.id}})
    .then(function(userdata) {
        res.render("update_user", {user: userdata.data})
    })
    .catch(err => {
        res.send(err)
    })
}