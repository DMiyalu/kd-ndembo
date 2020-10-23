const express = require('express')
const router = express.Router()
const verifyToken = require('../../middlewares/verifyToken')
const modelUser = require('./user.model')



router.get('/', verifyToken, async(request, response) => {
    modelUser.find()
    .then((data) => {
        if(data) {
            response.status(202).json({
                data: data
            })
        } else {
            response.status(404).json({
                message: "Données non trouvées."
            })
        }
    })
    .catch((error) => console.log(error))
})


router.post('/', async(request, response) => {
    const { email } = request.body
    let user = new modelUser({email: email, secondDevice: rawHeaders})
    await user.save()
    .then(data => {
        if(data) {
            response.status(202).json({
                message: "Message envoyé avec succes.",
                data: data
            })
        } else {
            response.status(401).json({
                message: "Message lors du sauvegarde"
            })
        }
    })
    .catch((error) => console.log(error))
})

router.get('/about', (request, response) => {
    response.render('about')
})

router.get('/download', (request, response) => {
    const { rawHeaders } = request.header
    let user = new modelUser({firstDevice: rawHeaders})
    await user.save()
    .then(data => {
        if(data) {
            response.status(202).json({
                message: "Message envoyé avec succes.",
                data: data
            })
        } else {
            response.status(401).json({
                message: "Message lors du sauvegarde"
            })
        }
    })
    .catch((error) => console.log(error))
    response.redirect('about')
})

module.exports = router