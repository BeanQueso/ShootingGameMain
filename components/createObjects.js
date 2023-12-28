AFRAME.registerComponent("createobjects", {
    init:function(){
        this.createBoxes()
    },

    createBoxes:function(){
        window.addEventListener("keydown", (e)=>{
            if (e.key === "y"){
                var box1 = document.createElement("a-box")
                box1.setAttribute("position", {x:0, y:1, z:-5})
                box1.setAttribute("src", "../images/crate.png")
                box1.setAttribute("geometry", {height:1, width:1, depth:1})
                box1.setAttribute("dynamic-body", {mass:1})
                box1.setAttribute("id", "box")
                box1.setAttribute("class", "other")

                var sceneEl = document.querySelector("#scene")
                sceneEl.appendChild(box1)
            }
        }) 
    }
})