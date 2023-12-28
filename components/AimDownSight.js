AFRAME.registerComponent("aimdownsight", {
    init: function () {
        this.aim()
    },
    aim: function () {
        var bullet = document.querySelector("#bulletEl")
        var cam = document.querySelector("#camera")
        var camPos = cam.getAttribute("position")

        var gunPosition = { x: 0, y: -0.11, z: -0.16 }
        var ogGunPosition = { x: 0.1, y: -0.1, z: -0.16 }
        var gun = document.querySelector("#weapon")
        var weapon = document.querySelector("#weapon")
        var muzzle = document.querySelector("#mzl")

        isaiming = 0

        var tingo = document.createElement("a-entity")
        tingo.setAttribute("id", "tingo")
        tingo.setAttribute("color", "black")
        var scene = document.querySelector("#scene")

        var tingColor = tingo.getAttribute("color")

        scene.appendChild(tingo)

        var inspecting = false
        window.addEventListener("keydown", (e) => {
            if (e.key === "x" && tingColor === "black" && inspecting === false) {
                inspecting = true

                setTimeout(()=>{
                    inspecting = false
                },4060)
            }
        })
        window.addEventListener("mousedown", (e) => {
            var magCount = document.querySelector("#magCount")
            var grenadeCount = document.querySelector("#grenadeCount")
            var grenadeCountDown = document.querySelector("#grenadeCountDown")
            if (e.button === 2 && inspecting === false) {
                if (isaiming === 0) {
                    cam.setAttribute("animation", { "property": "camera.zoom", "from": 1, "to": 3, "dur": 300, "easing": "easeInOutQuad" })
                    gun.setAttribute("animation", { "property": "position", "from": { x: 0.1, y: -0.1, z: -0.16 }, "to": { x: 0, y: -0.11, z: -0.16 }, "dur": 300 })
                    isaiming = 1

                    var crosshair = document.querySelector("#cross1")
                    crosshair.setAttribute("color", "red")
                    crosshair.setAttribute("width", 0.004)
                    crosshair.setAttribute("height", 0.600)
                    crosshair.setAttribute("depth", 0.001)

                    var crosshair2 = document.querySelector("#cross2")
                    crosshair2.setAttribute("color", "red")
                    crosshair2.setAttribute("width", 0.60000)
                    crosshair2.setAttribute("height", 0.004)
                    crosshair2.setAttribute("depth", 0.001)
                    tingo.setAttribute("color", "white")

                    // x: 0.6, y: -0.6, z: -1
                    magCount.setAttribute("position", { x: 0.3, y: 0, z: -1 })
                    magCount.setAttribute("text", {width:1})

                    //x: 1.065, y: -0.6, z: -1
                    grenadeCount.setAttribute("position", { x: 0.6, y: 0, z: -1 })
                    grenadeCount.setAttribute("text", {width:1})

                    //x: 0.4, y: -0.6, z: -1
                    grenadeCountDown.setAttribute("position", { x: 0.68, y: 0, z: -1 })
                    grenadeCountDown.setAttribute("text", {width:1})
                }
                else {
                    gun.setAttribute("animation", { "property": "position", "from": { x: 0, y: -0.11, z: -0.16 }, "to": { x: 0.1, y: -0.1, z: -0.16 }, "dur": 300 })
                    isaiming = 0
                    cam.setAttribute("animation", { "property": "camera.zoom", "from": 3, "to": 1, "dur": 300, "easing": "easeInOutQuad" })
                    var crosshair = document.querySelector("#cross1")
                    crosshair.setAttribute("color", "white")
                    crosshair.setAttribute("width", 0.005)
                    crosshair.setAttribute("height", 0.03)
                    crosshair.setAttribute("depth", 0.001)

                    //gun.setAttribute("position", { x: 0.1, y: -0.1, z: -0.16 })

                    var crosshair2 = document.querySelector("#cross2")
                    crosshair2.setAttribute("color", "white")
                    crosshair2.setAttribute("width", 0.03)
                    crosshair2.setAttribute("height", 0.005)
                    crosshair2.setAttribute("depth", 0.001)

                    tingo.setAttribute("color", "black")

                    magCount.setAttribute("position", { x: 0.6, y: -0.6, z: -1 })
                    magCount.setAttribute("text", {width:4})
                    grenadeCount.setAttribute("position", { x: 1.065, y: -0.6, z: -1 })
                    grenadeCount.setAttribute("text", {width:4})
                    grenadeCountDown.setAttribute("position", { x: 0.4, y: -0.6, z: -1 })
                    grenadeCountDown.setAttribute("text", {width:2.5})
                }
            }
        })
    }
})