import { Router } from "express";
import { v4 as uuidv4 } from "uuid";
import { companies, Company } from "../storage.js";
import { genSalt, hash } from "bcrypt";

export const companyRouter = Router();

companyRouter.post('/company', async (req, res, next) => {
    const id = uuidv4();
    const { email, name } = req.body;

    const companyExists = Object.values(companies).some((company) => {
        return company.email === email || company.name === name
    });

    if (companyExists) {
        res.status(409).json({
            status: 'failed',
            response: {
                message: "The given data was invalid",
            }
        });
    }

    const salt = await genSalt(10);
    const password = await hash(req.body.password, salt);

    const company: Company = {
        id,
        email,
        name,
        password,
    }

    companies[id] = company;

    res.status(200).json({
        status: 'success',
        response: {
            id: company.id,
            name: company.name,
            email: company.email,
        }
    });

    next();
});

companyRouter.get('/company', (req, res, next) => {
    const id = req.query.companyID as string;

    const company = companies[id];

    if (company) {
        res.status(200).json({
            status: 'success',
            response: {
                id: company.id,
                name: company.name,
                email: company.email,
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