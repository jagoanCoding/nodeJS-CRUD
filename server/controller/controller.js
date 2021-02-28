const { request } = require('express');
var Userdb =require('../model/model');

//crete and save new user
exports.create = (request, response) => {
if(!request.body) {
    response.status(400).send({message: "Content can not be empty"})
    return;
}

const user = new Userdb({
    name: request.body.name,
    email: request.body.email,
    gender: request.body.gender,
    age: request.body.age,
    status: request.body.status

})
//save user to database
user
    .save(user)
    .then(data => {
            // response.send(data )
        
            setTimeout(() => {
                response.redirect('/')
            }, 3000)
        
    })

    .catch(err => {
        response.status(500).send({
            message: [
                _err = err.message,
                _coment = 'Back and try again'
            ]
            
        })
    })

}
exports.find = (request, response) => {

    if(request.query.id) {
        const id = request.query.id

        Userdb.findById(id)
            .then(data => {
                
                if(!data) {
                    request.status(404).send({
                        message: `Error : Id not found`
                    })
                } else {
                    response.send(data)
                }   
            })
            .catch(err => {
                response.status(500).send({
                    message: `Error : error retriving user with id : ${id}`
                })
            })
    } else {
        Userdb.find()
        .then(user => {
            response.send(user)
        })
        .catch(err => {
            response.status(500).send({
                message: err.message || "Error occurred while find a user"
            })
        })
    }
    }



exports.update = (request, response) => {
    if(!request.body) {
        return response
            .status(400)
            .send({
                message: "Data to update can not be null"
            })
    }

    const id =request.params.id;
    Userdb.findByIdAndUpdate(id, request.body, {useFindAndModify:false})
    .then(data => {
        if(!data) {
            response.status(400).send({
                message: `Cannot be update user by id : ${id} maybe id not found`
            })
        } else {
            response.send(data)
        }
    })
    .catch(err => {
        response.status(500).send({
            message: "Error update user information"
        })
    })
}

exports.delete = (request, response) => {
    const id = request.params.id;

    Userdb.findByIdAndDelete(id)
        .then(data => {
            if(!data) {
                response.status(404).send({
                    message: `Cannot delete where id : ${id}, maybe id not found`
                })
            } else {
                response.send({
                    message: `User was delete succesfully an name : ${data.name} `
                })
            }
        })

        .catch(err => {
            response.status(500).send({
                message: `Could delete user where id : ${id}, maybe id not found`
            })
        })
}