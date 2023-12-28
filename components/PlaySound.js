AFRAME.registerComponent("play-sounds", {
  init: function () {
    var gun = document.querySelector("#weapon")
    gunPos = gun.getAttribute("position")

    this.walk();
    this.shoot();
  },
  walk: function () {
    var gun = document.querySelector("#weapon")
    window.addEventListener("keydown", (e) => {
      tingColor = document.querySelector("#tingo").getAttribute("color")
      var footStepSound = document.querySelector("#sound2")

      footStepSound.setAttribute("loop", true)

      // Add the condition to play sound
      if (e.key === "w" || e.key === "a" || e.key === "s" || e.key === "d") {
        var gunPos = gun.getAttribute("position")
        footStepSound.components.sound.playSound()
        
      }
    });

    window.addEventListener("keyup", (e) => {
      var footStepSound = document.querySelector("#sound2")

      footStepSound.setAttribute("loop", false)

      if (e.key === "w" || e.key === "a" || e.key === "s" || e.key === "d") {
        footStepSound.components.sound.stopSound()
      }
    })
  },

  shoot: function () {
    window.addEventListener("mousedown", (e) => {
      if (e.button === 0) {
        //emptied
      }
    })
  }
});


