AFRAME.registerComponent("bullets", {
    init: function () {
        var muzzleFlash = document.createElement("a-image")
        muzzleFlash.setAttribute("id", "mzl")
        muzzleFlash.setAttribute("visible", false)
        muzzleFlash.setAttribute("src", "../images/muzzleflash.png")
        muzzleFlash.setAttribute("position", { x: 0.1, y: -0.05, z: -0.5 })
        muzzleFlash.setAttribute("scale", { x: 0.3, y: 0.2, z: 0.3 })

        cam = document.querySelector("#camera")
        cam.appendChild(muzzleFlash)

        var isInspecting = document.createElement("a-entity")
        isInspecting.setAttribute("id", "isInspecting")
        isInspecting.setAttribute("color", "black")

        var inspecting = false
        var walking = false

        var mag = 30

        var magCount = document.createElement("a-entity")
        magCount.setAttribute("id",  "magCount")
        magCount.setAttribute("position", { x: 0.6, y: -0.6, z: -1 })
        magCount.setAttribute("text", { font: "mozillavr", value: mag, color: "black", width:4 })

        var grenadePack = 5

        var grenadeCount = document.createElement("a-entity")
        grenadeCount.setAttribute("id", "grenadeCount")
        grenadeCount.setAttribute("position", { x: 1.065, y: -0.6, z: -1 })
        grenadeCount.setAttribute("text", { font: "mozillavr", value: grenadePack, color: "black", width:4 })

        nadeCountDown = 4

        var grenadeCountDown = document.createElement("a-entity")
        grenadeCountDown.setAttribute("id", "grenadeCountDown")
        grenadeCountDown.setAttribute("position", { x: 0.4, y: -0.6, z: -1 })
        grenadeCountDown.setAttribute("text", { font: "mozillavr", value: nadeCountDown, color: "black", width:2.5 })

        cam.appendChild(magCount)
        cam.appendChild(grenadeCount)
        cam.appendChild(grenadeCountDown)

        var shooting = false

        var tingColor = document.querySelector("#tingo").getAttribute("color")
        var weapon = document.querySelector("#weapon")
        var reloading = false
        window.addEventListener("mousedown", (e) => {
            if (mag >= 1) {
                if (e.button === 0 && reloading === false && inspecting === false) {
                    this.shootBullet()
                    shooting = true

                    setTimeout(()=>{
                        shooting = false
                    },30)

                    var tingColor = document.querySelector("#tingo").getAttribute("color")
                    var weapon = document.querySelector("#weapon")
                    if (tingColor === "black") {
                        weapon.setAttribute("animation", { property: "position", from: "0.1 -0.1 -0.16", to: "0.1 -0.1 -0", dir: "alternate", loop: "false", dur: "100", easing: "linear" })
                        weapon.setAttribute("animation", { property: "position", from: "0.1 -0.1 -0", to: "0.1 -0.1 -0.16", dir: "alternate", loop: "false", dur: "120" })
                    }
                    else if (tingColor === "white") {
                        weapon.setAttribute("animation", { "property": "position", "from": { x: 0, y: -0.11, z: -0.16 }, "to": { x: 0, y: -0.11, z: 0 }, "dur": 100 })
                        weapon.setAttribute("animation", { "property": "position", "from": { x: 0, y: -0.11, z: -0 }, "to": { x: 0, y: -0.11, z: -0.16 }, "dur": 100 })
                    }
                    mag = mag - 1
                    magCount.setAttribute("text", { font: "mozillavr", value: mag, color: "black" })

                    var shootingSound = document.querySelector("#sound1")

                    shootingSound.components.sound.playSound()
                }
            }
            else if (mag === 0) {
                var emptyClick = document.querySelector("#sound3")
                emptyClick.components.sound.playSound()
                magCount.setAttribute("text", { font: "mozillavr", value: mag, color: "red" })
            }
        })
        grenadeThrown = false
        window.addEventListener("keydown", (e) => {
            var tingColor = document.querySelector("#tingo").getAttribute("color")
            if (e.key === "r" && mag <= 29 && tingColor === "black") {
                reloading = true
                weapon.setAttribute("animation", { property: "position", from: "0.1 -0.1 -0.16", to: "0.1 -0.3 -0.16", loop: "false", dur: "550", easing: "linear" })
                var reloadSound = document.querySelector("#sound4")
                reloadSound.components.sound.playSound()
                setTimeout(() => {
                    mag = 30
                    magCount.setAttribute("text", { font: "mozillavr", value: mag, color: "black" })
                    reloading = false
                }, 1100)
                setTimeout(() => {
                    weapon.setAttribute("animation", { property: "position", from: "0.1 -0.3 -0.16", to: "0.1 -0.1 -0.16", dir: "alternate", loop: "false", dur: "650", easing: "linear" })
                }, 550)
            }

            if (e.key === "g" && reloading === false && grenadeThrown === false && grenadePack >= 1) {
                grenadeThrown = true
                nadeCountDown = 4

                grenadeContainer = document.createElement("a-entity")
                var camera = document.querySelector("#camera")
                var grenPos = camera.getAttribute("position")

                var grenade = document.createElement("a-entity")
                grenade.setAttribute("id", "grenadeEl")
                grenade.setAttribute("class", "grenadePar")
                grenade.setAttribute("geometry", { primitive: "sphere", radius: 0.06 })
                grenade.setAttribute("material", { color: "green" })
                grenade.setAttribute("position", { x: 0, y: 0, z: 0 })
                grenade.setAttribute("dynamic-body", { mass: 0.1 })
                grenade.setAttribute("gltf-model", "url(../models/grenade/scene.gltf)")
                grenade.setAttribute("scale", { x: 0.001, y: 0.001, z: 0.001 })


                var camera = document.querySelector("#camera").object3D
                var direction = new THREE.Vector3()
                camera.getWorldDirection(direction)
                grenade.setAttribute("velocity", direction.multiplyScalar(-12))
                cam = document.querySelector("#camera")
                scene = document.querySelector("a-scene")

                var camEl = document.querySelector("#camera")

                var gre1 = document.createElement("a-sphere")
                gre1.setAttribute("id", "gre1")
                gre1.setAttribute("class", "grenadePar")
                gre1.setAttribute("position", { x: 0, y: -0.12, z: -0.5 })
                gre1.setAttribute("radius", 0.06)
                gre1.setAttribute("visible", false)
                var camera = document.querySelector("#camera").object3D
                var direction = new THREE.Vector3()

                camera.getWorldDirection(direction)
                gre1.setAttribute("velocity", direction.multiplyScalar(-12))
                gre1.setAttribute("dynamic-body", { mass: 0.1 })

                console.log(direction)

                var gre2 = document.createElement("a-sphere")
                gre2.setAttribute("id", "gre2")
                gre2.setAttribute("class", "grenadePar")
                gre2.setAttribute("position", { x: -0.12, y: -0.12, z: -0.5 })
                gre2.setAttribute("radius", 0.06)
                gre2.setAttribute("visible", false)

                camera.getWorldDirection(direction)
                gre2.setAttribute("velocity", direction.multiplyScalar(-12))
                gre2.setAttribute("dynamic-body", { mass: 0.1 })

                var gre3 = document.createElement("a-sphere")
                gre3.setAttribute("id", "gre3")
                gre3.setAttribute("class", "grenadePar")
                gre3.setAttribute("position", { x: -0.24, y: -0.12, z: -0.5 })
                gre3.setAttribute("radius", 0.06)
                gre3.setAttribute("visible", false)

                camera.getWorldDirection(direction)
                gre3.setAttribute("velocity", direction.multiplyScalar(-12))
                gre3.setAttribute("dynamic-body", { mass: 0.1 })

                var gre4 = document.createElement("a-sphere")
                gre4.setAttribute("id", "gre4")
                gre4.setAttribute("class", "grenadePar")
                gre4.setAttribute("position", { x: -0.36, y: -0.12, z: -0.5 })
                gre4.setAttribute("radius", 0.06)
                gre4.setAttribute("visible", false)

                camera.getWorldDirection(direction)
                gre4.setAttribute("velocity", direction.multiplyScalar(-12))
                gre4.setAttribute("dynamic-body", { mass: 0.1 })

                var gre5 = document.createElement("a-sphere")
                gre5.setAttribute("id", "gre5")
                gre5.setAttribute("class", "grenadePar")
                gre5.setAttribute("position", { x: -0.48, y: -0.12, z: -0.5 })
                gre5.setAttribute("radius", 0.06)
                gre5.setAttribute("visible", false)

                camera.getWorldDirection(direction)
                gre5.setAttribute("velocity", direction.multiplyScalar(-12))
                gre5.setAttribute("dynamic-body", { mass: 0.1 })

                var gre6 = document.createElement("a-sphere")
                gre6.setAttribute("id", "gre6")
                gre6.setAttribute("class", "grenadePar")
                gre6.setAttribute("position", { x: -0.60, y: -0.12, z: -0.5 })
                gre6.setAttribute("radius", 0.06)
                gre6.setAttribute("visible", false)

                camera.getWorldDirection(direction)
                gre6.setAttribute("velocity", direction.multiplyScalar(-12))
                gre6.setAttribute("dynamic-body", { mass: 0.1 })

                var gre7 = document.createElement("a-sphere")
                gre7.setAttribute("id", "gre7")
                gre7.setAttribute("class", "grenadePar")
                gre7.setAttribute("position", { x: -0.72, y: -0.12, z: -0.5 })
                gre7.setAttribute("radius", 0.06)
                gre7.setAttribute("visible", false)

                camera.getWorldDirection(direction)
                gre7.setAttribute("velocity", direction.multiplyScalar(-12))
                gre7.setAttribute("dynamic-body", { mass: 0.1 })

                var gre8 = document.createElement("a-sphere")
                gre8.setAttribute("id", "gre8")
                gre8.setAttribute("class", "grenadePar")
                gre8.setAttribute("position", { x: -0.84, y: -0.12, z: -0.5 })
                gre8.setAttribute("radius", 0.06)
                gre8.setAttribute("visible", false)

                camera.getWorldDirection(direction)
                gre8.setAttribute("velocity", direction.multiplyScalar(-12))
                gre8.setAttribute("dynamic-body", { mass: 0.1 })

                var gre9 = document.createElement("a-sphere")
                gre9.setAttribute("id", "gre9")
                gre9.setAttribute("class", "grenadePar")
                gre9.setAttribute("position", { x: -0.96, y: -0.12, z: -0.5 })
                gre9.setAttribute("radius", 0.06)
                gre9.setAttribute("visible", false)

                camera.getWorldDirection(direction)
                gre9.setAttribute("velocity", direction.multiplyScalar(-12))
                gre9.setAttribute("dynamic-body", { mass: 0.1 })

                var gre10 = document.createElement("a-sphere")
                gre10.setAttribute("id", "gre10")
                gre10.setAttribute("class", "grenadePar")
                gre10.setAttribute("position", { x: -1.08, y: -0.12, z: -0.5 })
                gre10.setAttribute("radius", 0.06)
                gre10.setAttribute("visible", false)

                camera.getWorldDirection(direction)
                gre10.setAttribute("velocity", direction.multiplyScalar(-12))
                gre10.setAttribute("dynamic-body", { mass: 0.1 })

                /*WEST*/

                var gre11 = document.createElement("a-sphere")
                gre11.setAttribute("id", "gre11")
                gre11.setAttribute("class", "grenadePar")
                gre11.setAttribute("position", { x: 0, y: -0.12, z: -0.5 })
                gre11.setAttribute("radius", 0.06)
                gre11.setAttribute("visible", false)
                var camera = document.querySelector("#camera").object3D
                var direction = new THREE.Vector3()

                camera.getWorldDirection(direction)
                gre11.setAttribute("velocity", direction.multiplyScalar(-12))
                gre11.setAttribute("dynamic-body", { mass: 0.1 })

                console.log(direction)

                var gre12 = document.createElement("a-sphere")
                gre12.setAttribute("id", "gre12")
                gre12.setAttribute("class", "grenadePar")
                gre12.setAttribute("position", { x: 0.12, y: -0.12, z: -0.5 })
                gre12.setAttribute("radius", 0.06)
                gre12.setAttribute("visible", false)

                camera.getWorldDirection(direction)
                gre12.setAttribute("velocity", direction.multiplyScalar(-12))
                gre12.setAttribute("dynamic-body", { mass: 0.1 })

                var gre13 = document.createElement("a-sphere")
                gre13.setAttribute("id", "gre13")
                gre13.setAttribute("class", "grenadePar")
                gre13.setAttribute("position", { x: 0.24, y: -0.12, z: -0.5 })
                gre13.setAttribute("radius", 0.06)
                gre13.setAttribute("visible", false)

                camera.getWorldDirection(direction)
                gre13.setAttribute("velocity", direction.multiplyScalar(-12))
                gre13.setAttribute("dynamic-body", { mass: 0.1 })

                var gre14 = document.createElement("a-sphere")
                gre14.setAttribute("id", "gre14")
                gre14.setAttribute("class", "grenadePar")
                gre14.setAttribute("position", { x: 0.36, y: -0.12, z: -0.5 })
                gre14.setAttribute("radius", 0.06)
                gre14.setAttribute("visible", false)

                camera.getWorldDirection(direction)
                gre14.setAttribute("velocity", direction.multiplyScalar(-12))
                gre14.setAttribute("dynamic-body", { mass: 0.1 })

                var gre15 = document.createElement("a-sphere")
                gre15.setAttribute("id", "gre15")
                gre15.setAttribute("class", "grenadePar")
                gre15.setAttribute("position", { x: 0.48, y: -0.12, z: -0.5 })
                gre15.setAttribute("radius", 0.06)
                gre15.setAttribute("visible", false)

                camera.getWorldDirection(direction)
                gre15.setAttribute("velocity", direction.multiplyScalar(-12))
                gre15.setAttribute("dynamic-body", { mass: 0.1 })

                var gre16 = document.createElement("a-sphere")
                gre16.setAttribute("id", "gre16")
                gre16.setAttribute("class", "grenadePar")
                gre16.setAttribute("position", { x: 0.60, y: -0.12, z: -0.5 })
                gre16.setAttribute("radius", 0.06)
                gre16.setAttribute("visible", false)

                camera.getWorldDirection(direction)
                gre16.setAttribute("velocity", direction.multiplyScalar(-12))
                gre16.setAttribute("dynamic-body", { mass: 0.1 })

                var gre17 = document.createElement("a-sphere")
                gre17.setAttribute("id", "gre17")
                gre17.setAttribute("class", "grenadePar")
                gre17.setAttribute("position", { x: 0.72, y: -0.12, z: -0.5 })
                gre17.setAttribute("radius", 0.06)
                gre17.setAttribute("visible", false)

                camera.getWorldDirection(direction)
                gre17.setAttribute("velocity", direction.multiplyScalar(-12))
                gre17.setAttribute("dynamic-body", { mass: 0.1 })

                var gre18 = document.createElement("a-sphere")
                gre18.setAttribute("id", "gre18")
                gre18.setAttribute("class", "grenadePar")
                gre18.setAttribute("position", { x: 0.96, y: -0.12, z: -0.5 })
                gre18.setAttribute("radius", 0.06)
                gre18.setAttribute("visible", false)

                camera.getWorldDirection(direction)
                gre18.setAttribute("velocity", direction.multiplyScalar(-12))
                gre18.setAttribute("dynamic-body", { mass: 0.1 })

                var gre19 = document.createElement("a-sphere")
                gre19.setAttribute("id", "gre19")
                gre19.setAttribute("class", "grenadePar")
                gre19.setAttribute("position", { x: 1.08, y: -0.12, z: -0.5 })
                gre19.setAttribute("radius", 0.06)
                gre19.setAttribute("visible", false)

                camera.getWorldDirection(direction)
                gre9.setAttribute("velocity", direction.multiplyScalar(-12))
                gre9.setAttribute("dynamic-body", { mass: 0.1 })

                var gre20 = document.createElement("a-sphere")
                gre20.setAttribute("id", "gre20")
                gre20.setAttribute("class", "grenadePar")
                gre20.setAttribute("position", { x: -0.84, y: -0.12, z: -0.5 })
                gre20.setAttribute("radius", 0.06)
                gre20.setAttribute("visible", false)

                camera.getWorldDirection(direction)
                gre20.setAttribute("velocity", direction.multiplyScalar(-12))
                gre20.setAttribute("dynamic-body", { mass: 0.1 })

                /*NORTH*/

                var gre21 = document.createElement("a-sphere")
                gre21.setAttribute("id", "gre21")
                gre21.setAttribute("class", "grenadePar")
                gre21.setAttribute("position", { x: 0, y: -0.12, z: -0.5 })
                gre21.setAttribute("radius", 0.06)
                gre21.setAttribute("visible", false)
                var camera = document.querySelector("#camera").object3D
                var direction = new THREE.Vector3()

                camera.getWorldDirection(direction)
                gre21.setAttribute("velocity", direction.multiplyScalar(-12))
                gre21.setAttribute("dynamic-body", { mass: 0.1 })

                console.log(direction)

                var gre22 = document.createElement("a-sphere")
                gre22.setAttribute("id", "gre22")
                gre22.setAttribute("class", "grenadePar")
                gre22.setAttribute("position", { x: 0, y: -0.12, z: -0.62 })
                gre22.setAttribute("radius", 0.06)
                gre22.setAttribute("visible", false)

                camera.getWorldDirection(direction)
                gre22.setAttribute("velocity", direction.multiplyScalar(-12))
                gre22.setAttribute("dynamic-body", { mass: 0.1 })

                var gre23 = document.createElement("a-sphere")
                gre23.setAttribute("id", "gre23")
                gre23.setAttribute("class", "grenadePar")
                gre23.setAttribute("position", { x: 0, y: -0.12, z: -0.74 })
                gre23.setAttribute("radius", 0.06)
                gre23.setAttribute("visible", false)

                camera.getWorldDirection(direction)
                gre23.setAttribute("velocity", direction.multiplyScalar(-12))
                gre23.setAttribute("dynamic-body", { mass: 0.1 })

                var gre24 = document.createElement("a-sphere")
                gre24.setAttribute("id", "gre24")
                gre24.setAttribute("class", "grenadePar")
                gre24.setAttribute("position", { x: 0, y: -0.12, z: -0.86 })
                gre24.setAttribute("radius", 0.06)
                gre24.setAttribute("visible", false)

                camera.getWorldDirection(direction)
                gre24.setAttribute("velocity", direction.multiplyScalar(-12))
                gre24.setAttribute("dynamic-body", { mass: 0.1 })

                var gre25 = document.createElement("a-sphere")
                gre25.setAttribute("id", "gre25")
                gre25.setAttribute("class", "grenadePar")
                gre25.setAttribute("position", { x: 0, y: -0.12, z: -0.98 })
                gre25.setAttribute("radius", 0.06)
                gre25.setAttribute("visible", false)

                camera.getWorldDirection(direction)
                gre25.setAttribute("velocity", direction.multiplyScalar(-12))
                gre25.setAttribute("dynamic-body", { mass: 0.1 })

                var gre26 = document.createElement("a-sphere")
                gre26.setAttribute("id", "gre26")
                gre26.setAttribute("class", "grenadePar")
                gre26.setAttribute("position", { x: 0, y: -0.12, z: -1.1 })
                gre26.setAttribute("radius", 0.06)
                gre26.setAttribute("visible", false)

                camera.getWorldDirection(direction)
                gre26.setAttribute("velocity", direction.multiplyScalar(-12))
                gre26.setAttribute("dynamic-body", { mass: 0.1 })

                var gre27 = document.createElement("a-sphere")
                gre27.setAttribute("id", "gre27")
                gre27.setAttribute("class", "grenadePar")
                gre27.setAttribute("position", { x: 0, y: -0.12, z: -1.22 })
                gre27.setAttribute("radius", 0.06)
                gre27.setAttribute("visible", false)

                camera.getWorldDirection(direction)
                gre27.setAttribute("velocity", direction.multiplyScalar(-12))
                gre27.setAttribute("dynamic-body", { mass: 0.1 })

                var gre28 = document.createElement("a-sphere")
                gre28.setAttribute("id", "gre28")
                gre28.setAttribute("class", "grenadePar")
                gre28.setAttribute("position", { x: 0, y: -0.12, z: -1.34 })
                gre28.setAttribute("radius", 0.06)
                gre28.setAttribute("visible", false)

                camera.getWorldDirection(direction)
                gre28.setAttribute("velocity", direction.multiplyScalar(-12))
                gre28.setAttribute("dynamic-body", { mass: 0.1 })

                var gre29 = document.createElement("a-sphere")
                gre29.setAttribute("id", "gre29")
                gre29.setAttribute("class", "grenadePar")
                gre29.setAttribute("position", { x: 0, y: -0.12, z: -1.46 })
                gre29.setAttribute("radius", 0.06)
                gre29.setAttribute("visible", false)

                camera.getWorldDirection(direction)
                gre29.setAttribute("velocity", direction.multiplyScalar(-12))
                gre29.setAttribute("dynamic-body", { mass: 0.1 })

                var gre30 = document.createElement("a-sphere")
                gre30.setAttribute("id", "gre30")
                gre30.setAttribute("class", "grenadePar")
                gre30.setAttribute("position", { x: 0, y: -0.12, z: -1.58 })
                gre30.setAttribute("radius", 0.06)
                gre30.setAttribute("visible", false)

                camera.getWorldDirection(direction)
                gre30.setAttribute("velocity", direction.multiplyScalar(-12))
                gre30.setAttribute("dynamic-body", { mass: 0.1 })

                console.log("this works")
                camEl.appendChild(gre1)
                camEl.appendChild(gre2)
                camEl.appendChild(gre3)
                camEl.appendChild(gre4)
                camEl.appendChild(gre5)
                camEl.appendChild(gre6)
                camEl.appendChild(gre7)
                camEl.appendChild(gre8)
                camEl.appendChild(gre9)
                camEl.appendChild(gre10)

                camEl.appendChild(gre11)
                camEl.appendChild(gre12)
                camEl.appendChild(gre13)
                camEl.appendChild(gre14)
                camEl.appendChild(gre15)
                camEl.appendChild(gre16)
                camEl.appendChild(gre17)
                camEl.appendChild(gre18)
                camEl.appendChild(gre19)
                camEl.appendChild(gre20)

                camEl.appendChild(gre21)
                camEl.appendChild(gre22)
                camEl.appendChild(gre23)
                camEl.appendChild(gre24)
                camEl.appendChild(gre25)
                camEl.appendChild(gre26)
                camEl.appendChild(gre27)
                camEl.appendChild(gre28)
                camEl.appendChild(gre29)
                camEl.appendChild(gre30)

                cam.appendChild(grenade)

                grenadePack -= 1
                grenadeCount.setAttribute("text", { font: "mozillavr", value: grenadePack, color: "black" })

                setTimeout(() => {
                    grenadeThrown = false
                }, 2400)

                setTimeout(() => {
                    nadeCountDown -= 1
                    grenadeCountDown.setAttribute("text", { font: "mozillavr", value: nadeCountDown, color: "red" })
                }, 600)
                setTimeout(() => {
                    nadeCountDown -= 1
                    grenadeCountDown.setAttribute("text", { font: "mozillavr", value: nadeCountDown, color: "orange" })
                }, 1200)
                setTimeout(() => {
                    nadeCountDown -= 1
                    grenadeCountDown.setAttribute("text", { font: "mozillavr", value: nadeCountDown, color: "yellow" })
                }, 1800)
                setTimeout(() => {
                    nadeCountDown -= 1
                    grenadeCountDown.setAttribute("text", { font: "mozillavr", value: nadeCountDown, color: "green" })
                }, 2200)
                setTimeout(() => {
                    nadeCountDown = 0
                    grenadeCountDown.setAttribute("text", { font: "mozillavr", value: nadeCountDown, color: "green" })
                }, 2400)

                /*setTimeout(() => {
                    currentPos = grenade.getAttribute("position")
                    grenade.setAttribute("position", { x: currentPos.x, y: 0, z: currentPos.z })
                    setTimeout(() => {
                        blastRadius = document.createElement("a-entity")
                        blastRadius.setAttribute("id", "blastRadius")
                        blastRadius.setAttribute("geometry", {primitive:"sphere", radius:2})
                        blastRadius.setAttribute("material", {color:"red", opacity:0.4})
                        blastRadius.setAttribute("position", currentPos)

                        scene.appendChild(blastRadius)
                    })
                    setTimeout(() => {
                        var explosion = document.querySelector("#sound5")
                        explosion.components.sound.playSound()
                    }, 0)
                    setTimeout(() => {
                        cam.appendChild(grenade)
                        grenade.remove()
                    }, 200)
                }, 1000)*/

                blastRadius = document.createElement("a-entity")

                var grenadePar = document.querySelectorAll(".grenadePar")

                for (var i = 0; i < grenadePar.length; i++) {
                    var tempGren = grenadePar[i]
                    tempGren.addEventListener("collide", (e) => {
                        if (e.detail.body.el.id !== "ground2" && e.detail.body.el.id !== "grenade" && e.detail.body.el.id !== "gre1" && e.detail.body.el.id !== "gre2" && e.detail.body.el.id !== "gre3" && e.detail.body.el.id !== "gre4" && e.detail.body.el.id !== "gre5" && e.detail.body.el.id !== "gre6" && e.detail.body.el.id !== "gre7" && e.detail.body.el.id !== "gre8" && e.detail.body.el.id !== "gre9" && e.detail.body.el.id !== "gre10" && e.detail.body.el.id !== "gre11" && e.detail.body.el.id !== "gre12" && e.detail.body.el.id !== "gre13" && e.detail.body.el.id !== "gre14" && e.detail.body.el.id !== "gre15" && e.detail.body.el.id !== "gre16" && e.detail.body.el.id !== "gre17" && e.detail.body.el.id !== "gre18" && e.detail.body.el.id !== "gre19" && e.detail.body.el.id !== "gre20" && e.detail.body.el.id !== "gre21" && e.detail.body.el.id !== "gre22" && e.detail.body.el.id !== "gre23" && e.detail.body.el.id !== "gre24" && e.detail.body.el.id !== "gre25" && e.detail.body.el.id !== "gre26" && e.detail.body.el.id !== "gre27" && e.detail.body.el.id !== "gre28" && e.detail.body.el.id !== "gre29" && e.detail.body.el.id !== "gre30") {
                            console.log(e.detail.body.id)
                            tempId = e.detail.body.el.id
                            tempEl = document.querySelector(`#${tempId}`)
                            console.log(tempId)

                            grenade.setAttribute("gltf-model", "../models/explosion.glb")
                            grenade.setAttribute("scale", { x: 3, y: 3, z: 3 })

                            setTimeout(() => {
                                scene.removeChild(tempEl)
                            })

                        } else if (e.detail.body.el.id === "ground2") {
                            setTimeout(() => {
                                var explosion = document.querySelector("#sound5")
                                explosion.components.sound.playSound()
                                grenade.setAttribute("gltf-model", "../models/explosion.glb")
                                grenade.setAttribute("scale", { x: 3, y: 3, z: 3 })
                            }, 0)
                            setTimeout(() => {
                                //west
                                cam.appendChild(grenade)
                                grenade.remove()
                                cam.appendChild(gre1)
                                gre1.remove()
                                cam.appendChild(gre2)
                                gre2.remove()
                                cam.appendChild(gre3)
                                gre3.remove()
                                cam.appendChild(gre4)
                                gre4.remove()
                                cam.appendChild(gre5)
                                gre5.remove()
                                cam.appendChild(gre6)
                                gre6.remove()
                                cam.appendChild(gre7)
                                gre7.remove()
                                cam.appendChild(gre8)
                                gre8.remove()
                                cam.appendChild(gre9)
                                gre9.remove()
                                cam.appendChild(gre10)
                                gre10.remove()

                                //east
                                cam.appendChild(gre11)
                                gre11.remove()
                                cam.appendChild(gre12)
                                gre12.remove()
                                cam.appendChild(gre13)
                                gre13.remove()
                                cam.appendChild(gre14)
                                gre14.remove()
                                cam.appendChild(gre15)
                                gre15.remove()
                                cam.appendChild(gre16)
                                gre16.remove()
                                cam.appendChild(gre17)
                                gre17.remove()
                                cam.appendChild(gre18)
                                gre18.remove()
                                cam.appendChild(gre19)
                                gre19.remove()
                                cam.appendChild(gre20)
                                gre20.remove()

                                //north
                                cam.appendChild(gre21)
                                gre21.remove()
                                cam.appendChild(gre22)
                                gre22.remove()
                                cam.appendChild(gre23)
                                gre23.remove()
                                cam.appendChild(gre24)
                                gre24.remove()
                                cam.appendChild(gre25)
                                gre25.remove()
                                cam.appendChild(gre26)
                                gre26.remove()
                                cam.appendChild(gre27)
                                gre27.remove()
                                cam.appendChild(gre28)
                                gre28.remove()
                                cam.appendChild(gre29)
                                gre29.remove()
                                cam.appendChild(gre30)
                                gre30.remove()
                            }, 100)
                        }
                    })
                }


            }
            if (e.key === "t" && reloading === false && grenadeThrown === false && grenadePack <= 4) {
                var grenadeReload = document.querySelector("#sound6")

                grenadeReload.components.sound.playSound()

                if (grenadePack === 0) {
                    setTimeout(() => {
                        grenadePack = 1
                        grenadeCount.setAttribute("text", { font: "mozillavr", value: grenadePack, color: "black" })
                    }, 1200)

                    setTimeout(() => {
                        grenadePack = 2
                        grenadeCount.setAttribute("text", { font: "mozillavr", value: grenadePack, color: "black" })
                    }, 2400)

                    setTimeout(() => {
                        grenadePack = 3
                        grenadeCount.setAttribute("text", { font: "mozillavr", value: grenadePack, color: "black" })
                    }, 3600)

                    setTimeout(() => {
                        grenadePack = 4
                        grenadeCount.setAttribute("text", { font: "mozillavr", value: grenadePack, color: "black" })
                    }, 4800)

                    setTimeout(() => {
                        grenadePack = 5
                        grenadeCount.setAttribute("text", { font: "mozillavr", value: grenadePack, color: "black" })
                    }, 6000)
                } else if (grenadePack === 1) {
                    setTimeout(() => {
                        grenadePack = 2
                        grenadeCount.setAttribute("text", { font: "mozillavr", value: grenadePack, color: "black" })
                    }, 1500)

                    setTimeout(() => {
                        grenadePack = 3
                        grenadeCount.setAttribute("text", { font: "mozillavr", value: grenadePack, color: "black" })
                    }, 3000)

                    setTimeout(() => {
                        grenadePack = 4
                        grenadeCount.setAttribute("text", { font: "mozillavr", value: grenadePack, color: "black" })
                    }, 4500)

                    setTimeout(() => {
                        grenadePack = 5
                        grenadeCount.setAttribute("text", { font: "mozillavr", value: grenadePack, color: "black" })
                    }, 6000)

                } else if (grenadePack === 2) {
                    setTimeout(() => {
                        grenadePack = 3
                        grenadeCount.setAttribute("text", { font: "mozillavr", value: grenadePack, color: "black" })
                    }, 2000)

                    setTimeout(() => {
                        grenadePack = 4
                        grenadeCount.setAttribute("text", { font: "mozillavr", value: grenadePack, color: "black" })
                    }, 4000)

                    setTimeout(() => {
                        grenadePack = 5
                        grenadeCount.setAttribute("text", { font: "mozillavr", value: grenadePack, color: "black" })
                    }, 6000)
                } else if (grenadePack === 3) {
                    setTimeout(() => {
                        grenadePack = 4
                        grenadeCount.setAttribute("text", { font: "mozillavr", value: grenadePack, color: "black" })
                    }, 3000)

                    setTimeout(() => {
                        grenadePack = 5
                        grenadeCount.setAttribute("text", { font: "mozillavr", value: grenadePack, color: "black" })
                    }, 6000)
                } else if (grenadePack === 4) {
                    setTimeout(() => {
                        grenadePack = 5
                        grenadeCount.setAttribute("text", { font: "mozillavr", value: grenadePack, color: "black" })
                    }, 6000)
                }
            }

            /*if (e.key === "h") {
                var camEl = document.querySelector("#camera")

                var gre1 = document.createElement("a-sphere")
                gre1.setAttribute("id", "gre1")
                gre1.setAttribute("class", "grenadePar")
                gre1.setAttribute("position", { x: 0, y: 0, z: -0.5 })
                gre1.setAttribute("radius", 0.06)
                var camera = document.querySelector("#camera").object3D
                var direction = new THREE.Vector3()

                camera.getWorldDirection(direction)
                gre1.setAttribute("velocity", direction.multiplyScalar(-12))
                gre1.setAttribute("dynamic-body", { mass: 0.1 })

                console.log(direction)

                var gre2 = document.createElement("a-sphere")
                gre2.setAttribute("id", "gre2")
                gre2.setAttribute("class", "grenadePar")
                gre2.setAttribute("position", { x: -0.12, y: 0, z: -0.5 })
                gre2.setAttribute("radius", 0.06)

                camera.getWorldDirection(direction)
                gre2.setAttribute("velocity", direction.multiplyScalar(-12))
                gre2.setAttribute("dynamic-body", { mass: 0.1 })

                var gre3 = document.createElement("a-sphere")
                gre3.setAttribute("id", "gre3")
                gre3.setAttribute("class", "grenadePar")
                gre3.setAttribute("position", { x: -0.24, y: 0, z: -0.5 })
                gre3.setAttribute("radius", 0.06)

                camera.getWorldDirection(direction)
                gre3.setAttribute("velocity", direction.multiplyScalar(-12))
                gre3.setAttribute("dynamic-body", { mass: 0.1 })

                console.log("this works")
                camEl.appendChild(gre1)
                camEl.appendChild(gre2)
                camEl.appendChild(gre3)
            }*/

            //  INSPECT  WEAPON

            ogWeaponPos = weapon.getAttribute("position")
            ogWeaponRot = weapon.getAttribute("rotation")

            var isInspecting = document.createElement("a-entity")
            isInspecting.setAttribute("id", "isInspecting")
            isInspecting.setAttribute("color", "black")

            scene = document.querySelector("#scene")
            scene.appendChild(isInspecting)

            

            if (e.key === "x" && tingColor === "black" && inspecting === false && e.key!=="w"&& e.key!=="a"&& e.key!=="s"&& e.key!=="d"&&walking===false) {
                isInspecting.setAttribute("color", "white")
                inspecting = true
                console.log(tingColor)
                weapon.setAttribute("animation", { property: "position", dur: 500, dir: "alternate", easing: "easeInOutQuad", from: ogWeaponPos, to: `0 ${ogWeaponPos.y} ${ogWeaponPos.z - 0.1}` })
                setTimeout(() => {
                    weapon.setAttribute("animation", { property: "rotation", dur: 1000, easing: "easeInOutQuad", from: "0 0 0", to: "0 -60 0" })
                }, 500)
                setTimeout(() => {
                    weapon.setAttribute("animation", { property: "rotation", dur: 800, easing: "easeInOutQuad", from: "0 -60 0", to: "0 60 30" })
                }, 1500)
                setTimeout(() => {
                    weapon.setAttribute("animation", { property: "rotation", dur: 800, easing: "easeInOutQuad", from: "0 60 30", to: "0 60 -30" })
                }, 2300)
                setTimeout(() => {
                    weapon.setAttribute("animation", { property: "rotation", dur: 400, easing: "easeInOutQuad", from: "0 60 -30", to: "0 180 0" })
                }, 3100)
                setTimeout(() => {
                    tingColor = document.querySelector("#tingo").getAttribute("color")
                    if(tingColor === "black"){
                        newWeaponPos = weapon.getAttribute("position")
                        weapon.setAttribute("animation", { property: "position", dur: 550, easing: "easeInOutQuad", from: newWeaponPos, to: "0.1 -0.1 -0.16" })
                    }else{
                        newWeaponPos = weapon.getAttribute("position")
                        weapon.setAttribute("animation", { property: "position", dur: 550, easing: "easeInOutQuad", from: newWeaponPos, to: "0 -0.11 -0.16" })
                    }
                }, 3500)
                setTimeout(()=>{
                    inspecting = false
                    isInspecting.setAttribute("color", "black")
                },4060)
            }
        })
        window.addEventListener("keyup", (e)=>{
            if(e.key === "w" || e.key === "a" || e.key === "s" || e.key === "d"){
                walking = false
            }
        })
    },

    shootBullet: function () {

        var scene = document.querySelector("#scene")
        var bullet = document.createElement("a-entity")
        bullet.setAttribute("id", "bulletEl")

        var muzzle = document.querySelector("#mzl")
        muzzle.setAttribute("visible", true)

        var ting = document.querySelector("#tingo")
        tingColor = ting.getAttribute("color")

        var cam = document.querySelector("#camera")
        var pos = cam.getAttribute("position")

        if (tingColor === "black") {
            muzzle.setAttribute("position", { x: 0.1, y: -0.05, z: -0.5 })
            muzzle.setAttribute("scale", { x: 0.5, y: 0.3, z: 0.3 })
            setTimeout(() => {
                muzzle.setAttribute("visible", false)
            }, 100)
        }

        if (tingColor === "white") {
            var crossPos = document.querySelector("#cross1").getAttribute("position")
            muzzle.setAttribute("position", { x: crossPos.x, y: crossPos.y - 0.26, z: crossPos.z })
            muzzle.setAttribute("scale", { x: 0.8, y: 0.6, z: 0.6 })
            setTimeout(() => {
                muzzle.setAttribute("visible", false)
            }, 100)

        }

        bullet.addEventListener("collide", (e) => {
            console.log(e.detail.body.el)
            if (e.detail.body.el.id === "ground2") {
                var currentBulPos = bullet.getAttribute("position")
                var mark = document.createElement("a-image")
                mark.setAttribute("rotation", { x: 90, y: 0, z: 0 })
                mark.setAttribute("src", "../images/bulletMark.png")
                mark.setAttribute("position", { x: currentBulPos.x, y: currentBulPos.y, z: currentBulPos.z })

                scene.appendChild(mark)
                scene.removeChild(bullet)
            }
        })

        var gun = document.querySelector("#weapon")
        var gunPos = gun.getAttribute("position")

        var pos = cam.getAttribute("position")
        console.log(gunPos)

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
    }
})