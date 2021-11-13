const Joi = require('joi');
const express = require('express')
const app = express();

const users = [
    {
        id: 1,
        name: 'Leandro',
        user: 'Qololoco',
        email: 'qolo@correo.com',
        year: 25,
    },
    {
        id: 2,
        name: 'Martin',
        user: 'TinchoNordelta00',
        email: 'tin21@correo.com',
        year: 21,
    },
    {
        id: 3,
        name: 'Marcelo',
        user: 'Marce2821',
        email: 'marce58@correo.com',
        year: 30,
    }
]


/* Function */
const existUser = (id) => users.find(user => user.id === Number(id))

const validateUser = (_name, _user, _email, _year) => {
    /* Esquema de verificacion con JOI */
    const schema = Joi.object({
        name: Joi.string().min(3).max(30).required(),
        user: Joi.string().min(4).max(16).required(),
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net']}}),
        year: Joi.number().integer().min(18).max(99)
    })

    return schema.validate({
        name: _name,
        user: _user,
        email: _email,
        year: _year
    });
}

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hola mundo desde express..');
});

app.get('/api/users', (req, res) => {
    res.send(users)
})

/* Peticiones HTTP GET */
app.get('/api/users/:id', (req, res) => {
    let user = existUser(req.params.id);
    if (!user) {
        res.status(404).send('El usuario no existe');
        return
    };
    res.send(user)
})

/* Peticiones HTTP POST */
app.post('/api/users', (req, res) => {
    /* Return true or false in case the error */
    const {error, value} = validateUser(req.body.name, req.body.user, req.body.email, req.body.year)

    if (!error) {
        const user = {
            id: users.length + 1,
            name: value.name,
            user: value.user,
            email: value.email,
            year: value.year
        }
        users.push(user)
        res.send(user)
        return
    };

    res.status(400).send(error.message)

})

/* Peticiones HTTP PUT */
app.put('/api/users/:id', (req, res) => {
    // verifica si existe el id
    let user = existUser(req.params.id)
    if (!user) {
        res.status(404).send('Usuario no disponible');
        return;
    }
    const { error, value } = validateUser(req.body.name, req.body.user, req.body.email, req.body.year)

    if (error) {
        res.status(404).send(error.message);
        return
    }

    user.name = value.name;
    user.email = value.email;
    user.user = value.user;
    user.year = value.year;
    
    res.send(user)
});

/* Peticiones HTTP DELETE */
app.delete('/api/users/:id', (req, res) => {
    let user = existUser(req.params.id);
    if (!user) {
        res.status(404).send('El usuario no fue encotrado');
        return
    }

    const index = users.indexOf(user);
    users.splice(index, 1)

    res.send(users)
});
const port = process.env.PORT || 3000;

app.listen(port , () => {
    console.log(`Escuchando el puerto ${port}`);
})