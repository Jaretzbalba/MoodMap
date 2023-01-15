document.getElementById('checker').onchange = function () {
  if (this.checked === true) {
    document.getElementById('userInput').disabled = false;
    document.getElementById('userInput').focus();
  } else {
    document.getElementById('userInput').disabled = true;
  }
};
