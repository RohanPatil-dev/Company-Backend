const { setUser } = require("../services/service")

const user = require("../Model/user")

const bcrypt = require("bcryptjs")

async function signup(req, res) {
    try {
        const { username, email, password } = req.body

        const existingEmail = await user.findOne({email : email})

        if (!username && !email && !password) {
            return res.status(400).json({ msg: "Form is empty !" })
        } else if (!username) {
            return res.status(400).json({ msg: "Username is not defined !" })
        } else if (!email) {
            return res.status(400).json({ msg: "Email is not defined !" })
        }else if (existingEmail.email == email) {
            return res.status(400).json({ msg: "Email is already exist !" })
        }
        else if (!password) {
            return res.status(400).json({ msg: "Password is not defined !" })
        }
        else if (password.length > 8) {
            return res.status(400).json({ msg: "password is over the 8 characters !" })
        }
        else if (password.length < 8) {
            return res.status(400).json({ msg: "password is under the 8 characters !" })
        }
        else {
            console.log(req.body);

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const registerData = new user({ username: username, email: email, password: hashedPassword })

            await registerData.save()

            return res.status(201).json({ msg: "Data registered successfully !", data: registerData })
        }
    } catch (error) {
        return res.status(400).json({ msg: "server error", error: error })
    }
}


async function signin(req, res) {
    try {
        const { email, password } = req.body

        const findEmail = await user.findOne({ email: email })

        if (!email && !password) {
            return res.status(400).json({ msg: "Form is empty !" })
        } else if (!email) {
            return res.status(400).json({ msg: "Email is not defined !" })
        } else if (!password) {
            return res.status(400).json({ msg: "Password is not defined !" })
        }
        else if (password.length > 8) {
            return res.status(400).json({ msg: "password is over the 8 characters !" })
        }
        else if (password.length < 8) {
            return res.status(400).json({ msg: "password is under the 8 characters !" })
        }
        else if (!findEmail) {
            return res.status(400).json({ msg: "Invalid email and password !" })
        } else {

            const matchPassword = await bcrypt.compare(password, findEmail.password);
            if (!matchPassword) {
                return res.status(400).json({ msg: "Invalid email or password!" });
            }

            const token = setUser(findEmail)
            console.log("token", token);

            return res.status(201).json({ msg: `Your email is : ${email} and Password is ${password}`, role: findEmail.role, token })
        }
    } catch (error) {
        return res.status(400).json({ msg: "error found", error })
    }
}



module.exports = { signup, signin }