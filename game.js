const buttonColours = ["red", "blue", "green", "yellow"]
let gamePattern = []
let userClickedPattern = []
let level = 0

function initiateGame() {
	$(document).ready(function () {
		$(document).one("keydown", function () {
			nextSequence()
		})
	})
}

initiateGame()

function checkAnswer(currentLevel) {
	if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
		if (userClickedPattern.length === gamePattern.length) {
			setTimeout(function () {
				nextSequence()
			}, 1000)
		}
	} else {
		startOver()
	}
}

function nextSequence() {
	let randomNumber = Math.floor(Math.random() * 4)
	let randomChosenColour = buttonColours[randomNumber]
	gamePattern.push(randomChosenColour)
	$("#" + randomChosenColour)
		.fadeOut(200)
		.fadeIn(200)

	playColorSound(randomChosenColour)
	level++
	$("#level-title").text("Level " + level)
	userClickedPattern = []
}

function playColorSound(randomChosenColour) {
	let selectedSound = new Audio("./sounds/" + randomChosenColour + ".mp3")
	selectedSound.play()
}

$(".btn").on("click", function () {
	let userChosenColour = this.id
	userClickedPattern.push(userChosenColour)
	playColorSound(userChosenColour)
	animatePress(userChosenColour)
	checkAnswer(userClickedPattern.length - 1)
})

function animatePress(currentColour) {
	$("#" + currentColour).addClass("pressed")

	setTimeout(function () {
		$("#" + currentColour).removeClass("pressed")
	}, 100)
}

function startOver() {
	level = 0

	new Audio("./sounds/wrong.mp3").play()

	gamePattern.length = 0

	$("body").addClass("game-over")

	setTimeout(function () {
		$("body").removeClass("game-over")
	}, 200)

	$("#level-title").text("Game Over, Press Any Key to Restart")

	// $(document).ready(function () {
	// 	$(document).one("keydown", function () {
	// 		nextSequence()
	// 	})
	// })
	// window.location.reload(true)
	initiateGame()
}
