const express = require("express");
const { Users } = require("./database/db")
const { createUser } = require("./validation/types")
const { userMiddleware } = require("./middlewares/user")

const app = express();
app.use(express.json());

app.get("/user/kidneydata",userMiddleware,async function(req,res){
    const user = await Users.findOne({
        username:req.headers.username
    })

    const totalKidneys = user.kidneys.length
    const username = user.username;
    const healthyKidney = user.kidneys.filter((kidney)=>kidney.healthy).length;
    const unhealthyKidney = user.kidneys.length - healthyKidney;
    res.json({
        username,
        totalKidneys,
        healthyKidney,
        unhealthyKidney
    })
})

// Endpoint to inserting new user in the database with their kidney health.

app.post("/user/signup",async function(req,res){
    const createPayload = req.body;
    const parsePayload  = createUser.safeParse(createPayload);
    if(!parsePayload.success){
        return res.status(400).json({
            message: "Invalid inputs"
        })
    }
    
    const response = await Users.create({
        username:createPayload.username,
        password:createPayload.password,
        kidneys:createPayload.kidneys,
    })

    res.json({
        response
    })

})

// Endpoint to update all the false kidneys of user to true

app.put("/user/updatekidney", userMiddleware, async function(req, res) {
    const username = req.headers.username;

    try {
        const user = await Users.findOne({ username: username });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const unhealthyKidneyCount = user.kidneys.filter(kidney => !kidney.healthy).length;

        if (unhealthyKidneyCount > 0) {
            await Users.updateMany(
                { username: username, "kidneys.healthy": false },
                { $set: { "kidneys.$[elem].healthy": true } },
                { arrayFilters: [{ "elem.healthy": false }] }
            );
        }
        // Users.updateMany({ Username: "sarthak", "Kidneys.Healthy": false },
        //     { $set: { "Kidneys.$[elem].Healthy": true } },
        //     { arrayFilters: [{ "elem.Healthy": false }] });

        res.json({ message: "Unhealthy kidney(s) replaced with healthy one(s)" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Deleting all the false kidneys.

app.put("/user/deletekidney",userMiddleware,function(req,res){
    const username = req.headers.username;

    Users.updateOne({
        username:username
    },{
        $pull: {
            kidneys: { healthy: false }
        }
    })
    .then(()=>{
        res.json({
            message:"kidney is been donated"
        })
    })
})

//deleting the whole collection from the database.

app.delete("/user/deletecollection",userMiddleware,function(req,res){
    const username = req.headers.username;
    Users.deleteOne({
        username:username
    })
    .then(()=>{
        res.json({
            message:"Collection is been deleted"
        })
    })
})


const PORT = 3000;

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})


