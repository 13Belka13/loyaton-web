import e, { Router } from "express";
import { v4 as uuidv4 } from "uuid";
import { User, users } from "../storage.js";
import { genSalt, hash } from "bcrypt";

export const userRouter = Router();

userRouter.get('/user', (req, res, next) => {
    const id = req.query.userID as string;

    const user = users[id];

    if (user) {
        res.status(200).json({
            status: 'success',
            response: {
                id: user.id,
                name: user.name,
                email: user.email,
            }
        });
    } else {
        res.status(404).json({
            status: 'failed',
            response: {
                message: "User does not exist",
            }
        });
    }

    next();
});

userRouter.post('/user', async (req, res, next) => {
    console.log('logging req body', req.body);

    const id = uuidv4();
    const { email, name } = req.body;

    const userExists = Object.values(users).some((user) => {
        return user.email === email || user.name === name
    });

    if (userExists) {
        res.status(409).json({
            status: 'failed',
            response: {
                message: "The given data was invalid",
            }
        });
    }

    const salt = await genSalt(10);
    const password = await hash(req.body.password, salt);

    const user: User = {
        id,
        email,
        name,
        password,
    }

    users[id] = user;

    res.status(200).json({
        status: 'success',
        response: {
            id: user.id,
            name: user.name,
            email: user.email,
        }
    });
    
    next();
});