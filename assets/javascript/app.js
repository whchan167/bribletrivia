var panel = $("#quiz-area");
var countStartNumber = 30;

// Question set
var questions = [{
  question: "In what city was Jesus born?",
  answers: ["Jeruselum", "Houston", "Neverland", "Rome"],
  correctAnswer: "Jeruselum",
  image: "assets/images/jesus.jpg"
}, {
  question: "How many apostles did Jesus have?",
  answers: ["10","11","12","13"],
  correctAnswer: "12",
  image: "assets/images/dis.gif"
}, {
  question: "What is the name of the disciple who betrayed Jesus?",
  answers: ["Peter", "John", "Matthew", "Judas"],
  correctAnswer: "Judas",
  image: "assets/images/dis.gif"
}, {
  question: "How did Jesus die?",
  answers: ["Die on the cross to save us", "Drowning", "By car accident", "Unknown cause"],
  correctAnswer: "Die on the cross to save us",
  image: "assets/images/res.jpg"
}, {
  question: "Who gave Jesus gifts when he was born?",
  answers: ["Three wise men", "Three nobles", "Three kings", "Three women"],
  correctAnswer: "Three wise men",
  image: "assets/images/jesus.jpg"
}, {
  question: "What is the common name given to the first four books of the New Testament?",
  answers: ["The intellegence", "The piece", "The gospel", "The book"],
  correctAnswer: "The gospel",
  image: "assets/images/books.jpg"
}, {
  question: "What is the name of Jesus’ mother? ",
  answers: ["meredith", "Mary", "Medellin", "Matha"],
  correctAnswer: "Mary",
  image: "assets/images/ae.jpg"
}, {
  question: "In what water was Jesus baptized?",
  answers: ["River columbia", "Yellow River", "River Jordon", "Red sea"],
  correctAnswer: "River Jordon",
  image: "assets/images/jesus.jpg"
}, {
  question: "What was Jesus’ first miracle?",
  answers: ["Turning water into wine", "Heal the blind", "Heal the leprosy", "Feed 5000 people"],
  correctAnswer: "Turning water into wine",
  image: "assets/images/fish.jpg"
}, {
  question: "What did Simon Peter do for a living? ",
  answers: ["Fisherman", "Carpenter", "Hunter", "Peacher"],
  correctAnswer: "Fisherman",
  image: "assets/images/.gif"
}, {
  question: "On Good Friday, Jesus was brought before Pontius Pilate for trial. Why did Pontius Pilate condemn Jesus to death?",
  answers: ["The chief priests had persuaded the crowd to demand his execution", "Because of his crime", "Because Pilate is cruel", "Because of no reason"],
  correctAnswer: "The chief priests had persuaded the crowd to demand his execution.",
  image: "assets/images/jesus.jpg"
}, {
  question: "n which Gospel did Jesus say and quote: “Everything is possible for one who believes.”?",
  answers: ["Mark", "John", "Matthew", "Luke"],
  correctAnswer: "Mark",
  image: "assets/images/ae.jpg"
}, {
  question: "For how many days did Jesus appear to his disciples after his resurrection?",
  answers: ["40", "30", "20", "10"],
  correctAnswer: "40",
  image: "assets/images/res.jpg"
}, {
  question: "Where was Paul when he went blind?",
  answers: ["On the road to Damascus", "On the road to Rome", "On the road to Jeruselum", "On the road to Gentiles"],
  correctAnswer: "On the road to Damascus",
  image: "assets/images/dis.gif"
}, {
  question: "Which apostle was a tax collector?",
  answers: ["Matthew", "John", "Simon", "Luke"],
  correctAnswer: "Matthew",
  image: "assets/images/dis.gif"
}, {
  question: "What is the last book of the New Testament? ",
  answers: ["Revelation", "3 Peter", "2 John", "John"],
  correctAnswer: "Revelation",
  image: "assets/images/books.jpg"
}];

// Variable to hold our setInterval
var timer;

var game = {

  questions: questions,
  currentQuestion: 0,
  counter: countStartNumber,
  correct: 0,
  incorrect: 0,

  countdown: function() {
    this.counter--;
    $("#counter-number").html(this.counter);
    if (this.counter === 0) {
      console.log("TIME UP");
      this.timeUp();
    }
  },

  loadQuestion: function() {

    timer = setInterval(this.countdown.bind(this), 1000);

    panel.html("<h2>" + questions[this.currentQuestion].question + "</h2>");

    for (var i = 0; i < questions[this.currentQuestion].answers.length; i++) {
      panel.append("<button class='answer-button' id='button' data-name='" + questions[this.currentQuestion].answers[i]
      + "'>" + questions[this.currentQuestion].answers[i] + "</button>");
    }
  },

  nextQuestion: function() {
    this.counter = window.countStartNumber;
    $("#counter-number").html(this.counter);
    this.currentQuestion++;
    this.loadQuestion.bind(this)();
  },

  timeUp: function() {

    clearInterval(window.timer);

    $("#counter-number").html(this.counter);

    panel.html("<h2>Out of Time!</h2>");
    panel.append("<h3>The Correct Answer was: " + questions[this.currentQuestion].correctAnswer);
    panel.append("<img src='" + questions[this.currentQuestion].image + "' />");

    if (this.currentQuestion === questions.length - 1) {
      setTimeout(this.results, 3 * 1000);
    }
    else {
      setTimeout(this.nextQuestion, 3 * 1000);
    }
  },

  results: function() {

    clearInterval(window.timer);

    panel.html("<h2>All done, heres how you did!</h2>");

    $("#counter-number").html(this.counter);

    panel.append("<h3>Correct Answers: " + this.correct + "</h3>");
    panel.append("<h3>Incorrect Answers: " + this.incorrect + "</h3>");
    panel.append("<h3>Unanswered: " + (questions.length - (this.incorrect + this.correct)) + "</h3>");
    panel.append("<br><button id='start-over'>Start Over?</button>");
  },

  clicked: function(e) {
    clearInterval(window.timer);
    if ($(e.target).data("name") === questions[this.currentQuestion].correctAnswer) {
      this.answeredCorrectly();
    }
    else {
      this.answeredIncorrectly();
    }
  },

  answeredIncorrectly: function() {

    this.incorrect++;

    clearInterval(window.timer);

    panel.html("<h2>Nope!</h2>");
    panel.append("<h3>The Correct Answer was: " + questions[this.currentQuestion].correctAnswer + "</h3>");
    panel.append("<img src='" + questions[this.currentQuestion].image + "' />");

    if (this.currentQuestion === questions.length - 1) {
      setTimeout(this.results.bind(this), 3 * 1000);
    }
    else {
      setTimeout(this.nextQuestion.bind(this), 3 * 1000);
    }
  },

  answeredCorrectly: function() {

    clearInterval(window.timer);

    this.correct++;

    panel.html("<h2>Correct!</h2>");
    panel.append("<img src='" + questions[this.currentQuestion].image + "' />");

    if (this.currentQuestion === questions.length - 1) {
      setTimeout(this.results.bind(this), 3 * 1000);
    }
    else {
      setTimeout(this.nextQuestion.bind(this), 3 * 1000);
    }
  },

  reset: function() {
    this.currentQuestion = 0;
    this.counter = countStartNumber;
    this.correct = 0;
    this.incorrect = 0;
    this.loadQuestion();
  }
};

// CLICK EVENTS

$(document).on("click", "#start-over", game.reset.bind(game));

$(document).on("click", ".answer-button", function(e) {
  game.clicked.bind(game, e)();
});

$(document).on("click", "#start", function() {
  $("#sub-wrapper").prepend("<h2>Time Remaining: <span id='counter-number'>30</span> Seconds</h2>");
  game.loadQuestion.bind(game)();
});