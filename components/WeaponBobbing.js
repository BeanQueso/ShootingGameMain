AFRAME.registerComponent("weapon-bobbing", {
    init:function(){
        this.gunBob()
    },

    gunBob:function(){
        var gun = document.getElementById("shooter")
        var scene = document.querySelector("#scene")
        window.addEventListener("keydown", (e) => {
    
            // Add the condition to play sound
            if (e.key === "w" || e.key === "a" || e.key === "s" || e.key === "d"){
              const animation = document.createElement('a-animation');
              animation.setAttribute('attribute', 'position');
              animation.setAttribute('from', "0.1 -0.1 -0.16");
              animation.setAttribute('to', "0.1 0.3 -0.16");
              animation.setAttribute('dur',"500");
              animation.setAttribute('direction', 'alternate');

              console.log(animation.getAttribute("from"))

              // Append the animation to the bobbing entity
              gun.appendChild(animation);
              scene.appendChild(gun)
            }
    
          });
    }
})