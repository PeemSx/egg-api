const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const Blog = require('./models/PostSchemas');
const Users = require('./models/User');

const app = express();
const PORT = process.env.PORT || 10000;
const JWT_secret = process.env.JWT_secret || "eTLampHOaN";

app.use(cors());
app.use(express.json());


app.get("/",(req,res) => {
    res.send("Hello API");
})

app.get("/blogs", async (req,res) => {
    try {
        const blogs = await Blog.find();
        res.status(200).json(blogs);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: error.message });
    }
})

app.put("/blogs/:id", async (req, res) => {
    try {
        const postId = req.params.id;
        const updateData = {
            title: req.body.title,
            content: req.body.content,
        };

        // Update only the title and content fields while keeping others unchanged
        const updatedPost = await Blog.findByIdAndUpdate(postId, updateData, { new: true });

        res.status(200).json(updatedPost);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: error.message });
    }
});

app.delete("/blogs/:id", async (req, res) => {
    try {
        const postId = req.params.id;
        const result = await Blog.deleteOne({_id: postId});

        res.status(200).json(result);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: error.message });
    }
});

app.post("/blogs", async (req,res) => {
    try {
        const blog = await Blog.create(req.body);
        res.status(200).json(blog)
    }catch (error){
        console.log(error.message);
        res.status(500).json({message : error.message})
    }
})

app.get("/users", async (req,res) => {
    try {
        const users = await Users.find();
        res.status(200).json(users);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: error.message });
    }
})

app.post("/users/login", async (req,res) => {
    try {
        const {username,password} = req.body
        const user = await Users.findOne({username});
        if(user){
            if(password == user.password){
                console.log("password is correct!");
                const token = jwt.sign({userId : user._id}, JWT_secret, {expiresIn: '12h'});
                return res.status(200).json({ message: 'Login successful', user,token });
            }else{
                return res.status(401).json({ message: 'Invalid password' });
            }

        }else{
            return res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: error.message });
    }
})

app.post("/users", async (req,res) => {
    try{
        // const { fname, lname, username, email, password, passwordConfirmation } = req.body;
        // const hashed_password = await bcrypt.hash(password,10);

        // console.log(hashed_password);
        // const newUser = new Users({
        //     fname,
        //     lname,
        //     username,
        //     email,
        //     password: hashed_password,
        // });
        const newUser = new User(req.body)
        await newUser.save();
        res.status(201).json(newUser);
    }catch(error){
        console.log(error.message);
        res.status(500).json({message : error.message})
    }
})

app.get("/blogs/:id", async (req, res) => {
    try {
        const id = req.params.id;
        // Your logic to retrieve blogs based on userId
        const blogs = await Blog.find({ authorID: id });
        res.status(200).json(blogs);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});

app.listen(PORT, () => {console.log(`Server is running on port ${PORT}`)})

mongoose.connect('mongodb+srv://blogwebDB:rQvvSqqttb9YTmw0@blogweb.zuundad.mongodb.net/?retryWrites=true&w=majority')
.then(() => {
    console.log("Database Connected");
}).catch((error) => {
    console.log(error);
})
