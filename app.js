const express = require('express');
const app = express();
const db = require('./Config/db');
const User = require('./Model/User');

db.authenticate().then( () => {
    console.log('Database terkoneksi!');
});

app.use( express.urlencoded( { extended: true } ) );

app.get("/", (req, res) => {
    res.send("Response berhasil!");
});

app.post('/add_data', async (req, res) => {
    try{
        const { username, email, password } = req.body;
        const user = new User({
            username, 
            email, 
            password
        });
        await user.save();
        res.json(user);
    } catch(err){
        console.error(err.message);
        res.status(500).send('Server Error!');
    }
});

app.get('/show_data', async (req, res) => {
    try{
        const getAlluser = await User.findAll( {} ); //https://sequelize.org/master/manual/model-querying-basics.html
        res.json(getAlluser);
    } catch(err){ 
        console.error(err.message);
        res.status(500).send('Server Error!');
    }
});

app.get('/get_user/:username', async (req, res) => {
    try{
        const username = req.params.username;
        const getUserbyUsername = await User.findOne({
            where: { username: username }
        });

        res.json(getUserbyUsername);
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error!');
    }
});

app.put('/update/:username', async (req, res) => {
    try{
        const username = req.params.username;
        const { email, password } = req.body;
        const updateUser = await User.update(
        {
            email,
            password
        },{
            where: { username: username }
        });
        await updateUser;

        res.json('Update berhasil!');
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error!');
    }
});

app.delete('/delete/:username', async (req, res) => {
    try{
        const username = req.params.username;
        const deleteUser = await User.destroy({
            where: { username: username }
        });
        await deleteUser;

        res.json(deleteUser);
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error!');
    }
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});