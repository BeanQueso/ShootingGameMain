AFRAME.registerComponent("return-to-main-menu", {
    init:function(){
        this.returnToMainMenu()
    },

    returnToMainMenu:function(){
        window.addEventListener("keydown", (e)=>{
            if (e.key === "m"){
                window.location.replace("../index.html");
            }
        })
    }
})