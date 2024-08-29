const express = require('express')
const router = express.Router()

const { createProject, updateStatus, getProjectData } = require('../Controller/Project')

const {authorization} = require("../Middleware/auth")

router.post('/createProject',authorization, createProject)

router.patch('/updateStatus/:id',authorization, updateStatus)

router.get('/getData',authorization, getProjectData)

module.exports = router