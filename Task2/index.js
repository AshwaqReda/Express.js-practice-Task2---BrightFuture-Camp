const express = require("express");
const morgan = require("morgan");
const app = express();
app.use(express.json());
app.use(morgan("dev"));

// mock data
const users = [
  { id: 1, name: "John Doe", email: "john@example.com" },
  { id: 2, name: "Jane Smith", email: "jane@example.com" },
  { id: 3, name: "Alice Johnson", email: "alice@example.com" }
];

// welcome message
app.get("/welcome", (req, res) => {
    res.send("welcome to my server");
});


// get all users
app.get("/users", (req, res) => {
    res.status(200).json(users);
});

// submit name
app.post("/submit", (req, res) => {
    const data = req.body;
    console.log(data);
    res.status(200).send("Data received successfully");
});

// add new user into array
app.post("/create" , (req , res)=>{
    const newUser = {
        id : users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1, 
        name : req.body.name,
        email : req.body.email

    };
    if(!newUser.name || !newUser.email){
        return res.status(400).json({message:"error : name and email are required"})
    }

    users.push(newUser);
    console.log(newUser);
    res.status(201).json(users);
    }

)
// listen server
const port = 3000 ;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});