
const projects = require("../Model/project")

const jwt = require("jsonwebtoken")

const secret = "Rohan123504"

async function createProject(req, res) {
    try {
        const { projectTheme, Reason, Type, Division, Category, Priority, Department, start_Date, End_Date, Location } = req.body

        if (!projectTheme) {
            return res.status(400).json({ err: "Project Theme required !" })
        } else if (!start_Date) {
            return res.status(400).json({ err: "Start_Date required !" })
        } else if (!End_Date) {
            return res.status(400).json({ err: "End_Date required !" })
        } else if (End_Date < start_Date) {
            return res.status(400).json({ err: "End date is smaller than Start date !" })
        } else {

            jwt.verify(req.token, secret, async (err, result) => {

                const existingProjectTheme = await projects.findOne({ projectTheme: projectTheme })

                if (existingProjectTheme) {
                    return res.status(400).json({ err: "Project Theme is already exist !" })
                }
                const project = new projects({userId : result._id,projectTheme: projectTheme, Reason: Reason, Type: Type, Division: Division, Category: Category, Priority: Priority, Department: Department, start_Date: start_Date, End_Date: End_Date, Location: Location })

                await project.save()

                return res.status(201).json({ data: project })

            })
        }
    } catch (error) {
        return res.status(500).json({ err: error.message })
    }
}

async function updateStatus(req, res) {
    try {
        jwt.verify(req.token, secret, async (err, result) => {
            const id = req.params.id

            const {Status} = req.body

            const project = await projects.findByIdAndUpdate(id,{Status}, { new: true })

            return res.json({ data: project })

        })
    } catch (error) {
        return res.json({ error: error })
    }
}

async function getProjectData(req, res) {
    try {

        jwt.verify(req.token, secret, async (err, result) => {
            console.log(result);


            const totalProjects = await projects.find()
            const totalRunning = await projects.find({ Status: "Running" })
            const totalCancelled = await projects.find({ Status: "Cancelled" })
            const totalClosed = await projects.find({ Status: "Closed" })

            // listen closure delay is remaining so please do it during frontend
            const currentDate = new Date()
            const closureDelay = await projects.find({ Status: "Running", End_Date: { $lt: currentDate } })

            return res.status(200).json({ totalProjects: totalProjects.length, totalRunning: totalRunning.length, totalCancelled: totalCancelled.length, totalClosed: totalClosed.length, closureDelay: closureDelay.length })
        })

    } catch (error) {
        return res.status(400).json("Invalid data !")
    }
}

module.exports = { createProject, updateStatus, getProjectData }