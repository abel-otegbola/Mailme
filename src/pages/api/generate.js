// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import connectMongo from "@/database/connection";
import Users, { Endpoints } from "@/model/Schema";

export default async function handler(req, res) {
    await connectMongo().catch(error => res.json({ error: "Connection Failed"}))
    const { user, title, address } = req.body
    
    const checkexisting = await Users.findOne({ email: user });
    if(checkexisting) {
        Endpoints.create({ user, title, address }, function(err, data){
            if(err) return res.status(404).json({ error: err });
            res.status(200).json({ msg: "Endpoint created successfully", data })
        })
    }
    else {
        res.status(400).json({error: "User does not exist"})
    }
}