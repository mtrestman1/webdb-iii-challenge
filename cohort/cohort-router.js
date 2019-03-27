const express = require('express');
const knex = require('knex');
const router = express.Router()

const knexConfig = {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
        filename: './data/lambda.sqlite3'
    }
}

const db = knex(knexConfig);

router.get('/', (req, res) => {
    db('cohorts')
    .then(cohorts => {
        res.status(200).json(cohorts)
    })
    .catch(error => {
        res.status(500).json(error)
    })
})

router.post('/', (req, res) => {
    const { name } = req.body;
    if(!name) {
        return res.status(400).json({ message: 'Please provide a name'})
    } else {
        return db('cohorts').insert(req.body)
        .then(ids => {
            const id = ids[0];
            db('cohorts')
            .where({id})
            .then(cohorts => {
                res.status(201).json(cohorts)
            })
        })
        .catch(error => {
            res.status(500).json({ message: 'there was an error adding this to the db'})
        })
    }
})

router.get('/:id', (req, res) => {
    const {id} = req.params;
    db('cohorts')
    .where({id})
    .first()
    .then(cohort => {
        res.status(200).json(cohort)
    })
    .catch(error => {
        res.status(500).json({ messsage: 'there was an error retrieving the data'})
    })
})

router.get('/:id/students', (req, res) => {
    db('students')
    .where({ cohort_id: req.params.id })
    .then(cohort => {
        res.status(200).json(cohort)
    })
    .catch(error => {
        res.status(500).json(error)
    })
})

router.put('/:id', (req, res) => {
    db('cohorts')
    .where({ id: req.params.id})
    .update(req.body)
    .then(count => {
        if(count > 0) {
            res.status(200).json(count)
        } else {
            res.status(404).json({ message: 'record not found'})
        }
        
    })
    .catch(error => {
        res.status(500).json({ message: 'there was an error updating'})
    })
})

router.delete('/:id', (req, res) => {
    db('cohorts')
    .where({ id: req.params.id })
    .del()
    .then(count => {
        if(count > 0) {
            res.status(200).json(count)
        } else {
            res.status(404).json({ message: 'there was an error deleting'})
        }
    })
    .catch(error => {
        res.status(500).json({ message: 'there was an error deleting'})
    })
})



module.exports = router;