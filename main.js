$('.start-game').click(function() {
  $('#menu').slideUp(1000, function() {
    $('h1').text(`Level 1`);
    $('#game').fadeTo(500, 1, function() {
      newGame();
    });
  });

});


let soundVolume = 0.1;
let sequenceGame = [];
let userGame = [];
let level = 0;
let currentLevel = 0;
const btnColors = ['green', 'red', 'yellow', 'blue'];

$(document).keypress((e) => {
  if (e.key === "a") {
    //  alert('Game Started');
    newGame();
  } else nextSequnce();
});


$('button').click(function(event) {
  userBtnClick($(this).attr('id'));
});

function newGame() {
  level = 0;
  sequenceGame = [];
  userGame = [];

  $('h1').text(`Level 1`);
  setTimeout(nextSequnce, 500);
}


// Next computer turn
function nextSequnce() {
  //Clear User's curret stage of Sequence
  currentLevel = 0;
  //Clear User's Sequence
  userGame = [];

  // Generate random color and push to Sequence Array
  sequenceGame.push(btnColors[Math.floor(Math.random() * 4)]);

  //Animation of Sequence button to be pressed
  for (let i = 0; i < sequenceGame.length; i++) {
    setTimeout(highlightButton, (i + 1) * 500, sequenceGame[i]);
  }
  //Change title level
  $('h1').text(`Level ${++level}`);
  console.log('Sequence game: ' + sequenceGame);

}



//User click on button
function userBtnClick(color) {

  //Push in the User Array of pressed button last one
  userGame.push(color);

  console.log('User Game: ' + userGame);
  //Animation of pressed button from User Side
  highlightUserClick(color);


  if (checkUserAnswer(currentLevel)) {
    console.log('correct');
    //User clicks correct button, increase curret stage of Sequence
    currentLevel++;
    if (currentLevel === sequenceGame.length) {
      //User answers correct on all Sequence, next level.

      setTimeout(correctAnswer, 500);
      setTimeout(nextSequnce, '1000');
    }

  } else {
    //Game Over
    console.log('not correct');
    gameOver();
  }


  //console.log(userGame);
}
//Returns if User answer correct
function checkUserAnswer(currentLevel) {
  if (sequenceGame[currentLevel] === userGame[currentLevel])
    return true;
  return false;
}



// highlight choosen button
function highlightButton(btnName) {
  const sound = new Audio(`sounds/${btnName}.mp3`);
  sound.volume = soundVolume;
  sound.play();
  $(`#${btnName}`).fadeOut(100).fadeIn(100);
}

//Highlight button which user clicked
function highlightUserClick(color) {
  const sound = new Audio(`sounds/${color}.mp3`);
  sound.volume = soundVolume;
  sound.play();
  $(`#${color}`).addClass('pressed');
  setTimeout(() => $(`#${color}`).removeClass('pressed'), '200');
}

//Animation GameOver
function gameOver() {
  const sound = new Audio(`sounds/wrong.mp3`);
  sound.volume = soundVolume;
  sound.play();

  $('body').addClass('fault');
  $('h1').text('Game Over');
  setTimeout(() => $('body').removeClass('fault'), 100);
  $('#game').fadeTo(2000, 0, function() {
    $('h1').text('Simon Game');
    $('#menu').slideDown(1000, function() {});

  });
}

//Animation GoToNextLevel
function correctAnswer() {
  $('body').addClass('correct');
  setTimeout(() => $('body').removeClass('correct'), 100);
}
