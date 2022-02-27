const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const courses = [
    {id:1, name:'Computer Science'},
    {id:2, name:'Biology'},
    {id:3, name:'Chemistry'},

];

// app.get()
// app.post()
// app.put()
// app.delete()

//a route
app.get('/', (req, res)=>{
    res.send('Hello World!!!');
});

//index route api/courses
app.get('/api/courses', (req, res)=>{
    res.send(courses);
});

app.post('/api/courses', (req, res)=>{
    const schema = Joi.object({
        name: Joi.string()
            .alphanum()
            .min(3)
            .max(30)
            .required(),
    });

    const result = schema.validate({});
        res.status(400).send('Name is required and should be minimum 3 characters')
        return;

    const course = {
        id:courses.length + 1,
        name: req.body.name
    };
    courses.push(course); //add new course to const courses array
    res.send(course); //send for client to view
});

//patch
app.put('/api/courses/:id', (req, res)=>{
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course)// 404 not found
    res.status(404).send('Course is not found');

   
    course.name = req.body.name;
    res.send(course);

})

function validateCourse(course){
    const schema = Joi.object({
        name: Joi.string()
            .alphanum()
            .min(3)
            .max(30)
            .required(),
    });

    const result = course.validate({});
        result.status(400).send('Name is required and should be minimum 3 characters')
        return;

}


//show route api/courses/1
app.get('/api/courses/:id', (req, res)=>{
    // res.send(req.params.id);
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course)// 404 not found
    res.status(404).send('Course is not found');
    res.send(course);
});

//multiple paramater in routes
app.get('/api/courses/:year/:month', (req, res)=>{
    res.send(req.query);
});

app.delete('/api/courses/:id', (req,res)=>{
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course)// 404 not found
    res.status(404).send('Course is not found');

    const index = courses.indexOf(course);
    courses.splice(index, 1);
    res.send(course);


})

const port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log(`Listening on port ${port}...`);
});