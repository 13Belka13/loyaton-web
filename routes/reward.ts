import { Router } from "express";
import { v4 as uuidv4 } from "uuid";
import { rewards, companies } from "../storage.js";

export const rewardRouter = Router();

rewardRouter.post('/reward', async (req, res, next) => {
    const id = uuidv4();
    const { companyID, name, description } = req.body;

    const companyExists = companies[companyID];

    if (!companyExists) {
        res.status(404).json({
            status: 'success',
            response: {
                message: "Company with the given id does not exist"
            }
        });

        return;
    }

    const companyHasRewards = !!rewards[companyID];

    if (companyHasRewards) {
        rewards[companyID].push({
            rewardID: id,
            name,
            description,
            companyID,
        });
    } else {
        rewards[companyID] = [{
            rewardID: id,
            name,
            description,
            companyID,
        }];
    }

    res.status(200).json({
        status: 'success',
        response: {
            id,
            name,
            description,
        }
    });

    next();
});

rewardRouter.get('/reward', (req, res, next) => {
    const companyID = req.query.companyID as string;

    const companyRewards = rewards[companyID];


    if (companyRewards) {
        if (companyRewards.length > 0) {
            res.status(200).json({
                status: 'success',
                response: companyRewards.map((r) => ({
                    id: r.rewardID,
                    name: r.name,
                    description: r.description
                }))
            });
        } else {
            res.status(200).json({
                status: 'success',
                response: {
                    message: 'This company has no rewards'
                }
            });
        }
    } else {
        res.status(404).json({
            status: 'failed',
            response: {
                message: "Not found",
            }
        });
    }

    next();
});