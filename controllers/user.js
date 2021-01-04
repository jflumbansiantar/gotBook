const { users } = require("../models");
const { decryptPwd } = require('../helpers/bcrypt')
const { tokenGenerator } = require('../helpers/jwt')

class usersController {
	static async register(req, res) {
		const { name, email, password} = req.body;
		try {
			const found = await users.findOne({
				where: {
					email
				}
			})
			if (found) {
				res.status(409).json({
					status: false,
					msg: "Thats email already registered! Input another email account, thanks!"
				})
			} else {
				const user = await users.create({
					name,
					email,
					password,
					role
				});
				const access_token = tokenGenerator(user);
				res.status(201).json({
					status: true,
					msg: 'User created successfully',
					data: access_token
				});
			}
		} catch (error) {
			next(error);
		}
	}
	static async login(req, res, next) {
		const { email, password } = req.body;
		console.log(req.body);
		try {
			const user = await users.findOne({
				where: { email }
			});
			if (user) {
				if (decryptPwd(password, user.password)) {
					const access_token = tokenGenerator(user);
					res.status(200).json({
						status: true,
						msg: 'Login successful.',
						token: access_token
					});
				} else {
					res.status(409).json({
						status: false,
						msg: "Incorrect password!"
					})
				}
			} else {
				res.status(404).json({
					status: false,
					msg: "User not found!"
				})
			}
		} catch (error) {
			next(error);
		}
	}

	static async findById(req, res, next) {
		const id = req.params.id;
		try {
			const user = await users.findOne({
				where: { id }
			});
			if (user) {
				res.status(200).json({
					status: true,
					msg: 'Here is the user.',
					data: user
				})
			}
			else {
				res.status(404).json({
					status: false,
					msg: 'User not found.'
				})
			}
		}
		catch (error) {
			next(error)
		}
	}
	static async editUsers(req, res, next) {
		const id = req.params.id;
		const { name, email, password } = req.body;
		const image = req.file.path
		try {
			const found = await users.findOne({
				where: { id }
			})
			if (found) {
				const update = await users.update({
					name,
					image,
					email,
					password
				}, {
					where: { id },
				}
				);
				res.status(202).json({
					status: true,
					msg: "Profile has been updated!",
					data: update
				});
			} else {
				res.status(404).json({
					status: false,
					msg: "Cannot find user."
				});
			}

		} catch (error) {
			next(error)
		}
	}
	static async getAllUsers(req, res, next) {
		console.log("See all the Users");
		try {
			const users = await users.findAll({})

			res.status(200).json({
				status: true,
				msg: 'Here are all the Users.',
				data: users
			});
		} catch (err) {
			next(error)
		}
	}
}
module.exports = usersController;