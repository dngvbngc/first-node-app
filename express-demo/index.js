const express = require('express');
const Joi = require('joi');
const app = express();

app.use(express.json());

const courses = [
    {id: 1, name: 'course1'},
    {id: 2, name: 'course2'},
    {id: 3, name: 'course3'},
];

app.get('/', (req, res) => {
    res.send('Hello world!!!');
})

app.get('/api/courses', (req, res) => {
    res.send(courses);
})

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('Course with this ID not found');
    res.send(course);
})

app.get('/api/posts/:year/:month', (req, res) => {
    res.send(req.params);
    res.send(req.query); // For ?value in the url
})

app.post('/api/courses', (req, res) => {

    const { error } = validateCourse(req.body); // getting result.error

    if (error) {
        // 400 Bad Request
        return res.status(400).send(error.details[0].message);
    }
    const course = {
        id: courses.length + 1,
        name: req.body.name
    }

    courses.push(course);
    res.send(course);
});

app.put('/api/courses/:id', (req, res) => {
    // Look up course
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) {
        return res.status(400).send(error.details[0].message);
    }

    const { error } = validateCourse(req.body); // getting result.error

    if (error) {
        // 400 Bad Request
        return res.status(400).send(error.details[0].message);
    }

    course.name = req.body.name;
    res.send(course);
})

app.delete('/api/courses/:id', (req, res) => {
    // Look up course
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) {
        return res.status(404).send('Course with this ID not found');
    }

    // Delete course
    const index = courses.indexOf(course);
    courses.splice(index, 1);

    // Send response
    res.send(course);
})

// PORT
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}...`));

function validateCourse(course) {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });

    return Validation = schema.validate(course);
}