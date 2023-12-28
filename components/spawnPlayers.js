// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getFirestore, doc, getDoc, getDocs, collection } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";

AFRAME.registerComponent("spawn-players",{
    init:function(){
        
        // TODO: Add SDKs for Firebase products that you want to use
        // https://firebase.google.com/docs/web/setup#available-libraries

        // Your web app's Firebase configuration
        const firebaseConfig = {
        apiKey: "AIzaSyD0YbYs3VN_7Mm_aiVLzerryHTPV6NyenY",
        authDomain: "shootinggame-99adc.firebaseapp.com",
        projectId: "shootinggame-99adc",
        storageBucket: "shootinggame-99adc.appspot.com",
        messagingSenderId: "636798466414",
        appId: "1:636798466414:web:f12ff0b98c55f1db55e97f"
        };

        var playerCoords = []

        // Initialize Firebase
        const app = initializeApp(firebaseConfig);
        const db = getFirestore(app);

        const usersCollectionRef = collection(db, "Users");
        getDocs(usersCollectionRef).then((querySnapshot) => {
            querySnapshot.forEach((docSnap) => {
                const userData = docSnap.data(); // Get the data of each document

                // Check if the document has the "x," "y," and "z" fields
                var newUserData = [userData["x"],userData["y"],userData["z"]]
                playerCoords.push(newUserData);
                console.log(playerCoords)
            });

            console.log("Finished logging user data.");
            this.update(playerCoords);
        }).catch((error) => {
            console.error("Error fetching documents:", error);
        });
    },

    update: function (coords) {

        var scene = document.querySelector("#scene");
        console.log(coords)

        //id="character" gltf-model="#character-asset" scale="0.03 0.03 0.03" position="-0.15 -1 0.6"
        //rotation="0 180 0" dynamic-body="mass:0" shadow = "cast:true; receive:false"
        for (var i=0;i<coords.length; i++){
            
            var player = document.createElement("a-entity")
            player.setAttribute("id",`player${i}`)
            player.setAttribute("gltf-model","#character-asset")
            player.setAttribute("scale",{x:0.03,y:0.03,z:0.03})
            player.setAttribute("rotation",{x:0,y:180,z:0})
            player.setAttribute("dynamic-body", {mass:0})
            player.setAttribute("shadow",{cast:true,receive:false})
            player.setAttribute("position",{x:coords[i][0],y:coords[i][1],z:coords[i][2]})

            scene.appendChild(player)
        }
    }
});