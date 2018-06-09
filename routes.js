const express = require('express')
const router = express.Router()
const fileFunctions = require('/.fileFunctions')

let questions
let score
let category
let total

router.get('/', (req, res) => {
  res.redirect('/home')
})

router.get('/home', (req, res) => {
  resetScore()
  fileFunctions.readJSON('./questions.json', obj => {
    questions = obj
    res.render('home')
  })
})

router.get('/quiz', (req, res) => {
  if (questions) {
    let question = questions.pop()
    res.render('quiz', question)
  }
  else res.redirect('/home')
})

router.post('/quiz', (req, res) => {
  let answer = req.body.id
  addScore(answer)
  if (questions.length < 1){
    res.redirect('profile')
  }
  else {
    res.redirect('quiz')
  }
})

router.get('/profile', (req, res) => {
  if (score) {
  fileFun.readJSON('./results.json', obj => {
    let thing = getResult()
    res.render('profile', thing)
  })
  }
  else res.redirect('/home')
})

router.post('/home', (req, res) => {
  res.redirect('quiz')
})

function getTotal(){
  total = score[0].score
}

function getCategory(){
  if (total === 10) {
    category = "perfectScore"
  }
  else if (total < 10 && total > 6) {
    category = "prettyGood"
  }
  else if (total < 7 && total > 3) {
    category = "average"
  }
  else if (total < 4 && total > 0) {
    category = "notGreat"
  }
  else category = "dunce"
}

function getResult(results) {
  let category = getCategory()
  return results.find(obj => obj.id.toLowerCase() == category)
}


function resetScore() {
  score = [
    {id: true, score: 0},
    {id: false, score: 0}
  ]
}

function addScore(answer) {
  let scorer = score.find(obj => obj.id == answer)
  scorer.score++
}



module.exports = router