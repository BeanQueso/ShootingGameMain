AFRAME.registerComponent("handle-orbs", {
    init: function () {
        this.spawnOrb()
        box2 = document.querySelector("#box")
        
        window.addEventListener("click", ()=>{

            var scene = document.querySelector("#scene")

            var gun = document.querySelector("#weapon")
            var cam = document.querySelector("#camera")

            var pos = cam.getAttribute("position")

            var bullet = document.createElement("a-entity")

            bullet.setAttribute("position", pos)

            bullet.setAttribute("geometry", { primitive: "sphere", radius: 0.05 })

            bullet.setAttribute("material", { color: "black" })


            //0.1 -0.1 -0.16

            var camera = document.querySelector("#camera").object3D
            var direction = new THREE.Vector3()
            camera.getWorldDirection(direction)
            bullet.setAttribute("velocity", direction.multiplyScalar(-30))
            bullet.setAttribute("dynamic-body", { mass: 0 })

            scene.appendChild(bullet)

            bullet.addEventListener("collide",(e)=>{
                //var box2 = document.querySelector("#box")
                //console.log(box2.getAttribute("id"))
                console.log(e.detail.body.id)
            })
        })

        
        
        
    },

    spawnOrb: function () {
        var xvalue = Math.floor(Math.random() * 7)
        var yvalue = Math.floor(Math.random() * 3)

        var box2 = document.createElement("a-sphere")
        box2.setAttribute("position", { x: xvalue - 3, y: yvalue + 1, z: -5.6 })
        box2.setAttribute("geometry", { radius: 0.3 })
        box2.setAttribute("id", "box")
        box2.setAttribute("color", "black")
        box2.setAttribute("class", "other")

        var sceneEl = document.querySelector("#scene")
        sceneEl.appendChild(box2)
    },

    killOrb: function(){
        box2 = document.querySelector("#box")
        box2.remove()

        var xvalue = Math.floor(Math.random() * 7)
        var yvalue = Math.floor(Math.random() * 3)

        var box3 = document.createElement("a-sphere")
        box3.setAttribute("position", { x: xvalue - 3, y: yvalue + 1, z: -5.6 })
        box3.setAttribute("geometry", { radius: 0.3 })
        box3.setAttribute("id", "box")
        box3.setAttribute("color", "black")
        box3.setAttribute("class", "other")

        var sceneEl = document.querySelector("#scene")
        sceneEl.appendChild(box3)
    }

})