
const express = require("express");
const app = express();
const userModal = require("./Models/user.js")


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/register", async (req, res) => {
    const {name,email,password} = req.body;
    const existUser = await userModal.findOne({email:email})

    if(existUser){
        return res.send("already Exists");
    }
    else{
       
        bcrypt.hash(password, 10, async function(err, hash) {
            if(!err){
              const createdUser = await userModal.create({
                    name,
                    email,
                    password:hash
                })
                res.send(createdUser)
            }
            else{
                return res.send("password hashing error")
            }
        });
        
    }

    
})

app.listen(3000, () => {
    console.log("localhost:3000");
})