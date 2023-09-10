function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

function create_parent(){
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var username = document.getElementById('username').value;
    var fullname = document.getElementById('fullname').value;

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
        // User created successfully
        var user = userCredential.user;
        console.log("User created:", user.uid);

        // Add user data to Firestore
        var db = firebase.firestore();
        db.collection("parents").doc(user.uid).set({
            username: username,
            email: email,
            fullname: fullname,
        })
        .then(() => {
            console.log("User data added to Firestore");
            alert('User data added');
            // Redirect to another page
            window.location.href = "login.html";
        })
        .catch((error) => {
            console.error("Error adding user data to Firestore:", error);
            alert('Error adding user data');
        });
    })
        .catch((error) => {
    // Error occurred while creating user
        var errorCode = error.code;
        var errorMessage = error.message;
        console.error("Error creating user:", errorMessage);
        alert(errorMessage);
    });

}


function create_teacher(){
    var email = document.getElementById('temail').value;
    var password = document.getElementById('tpassword').value;
    var username = document.getElementById('tusername').value;
    var fullname = document.getElementById('tfullname').value;
    console.log(email);

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
        // User created successfully
        var user = userCredential.user;
        console.log("User created:", user.uid);

        // Add user data to Firestore
        var db = firebase.firestore();
        db.collection("teachers").doc(user.uid).set({
            username: username,
            email: email,
            fullname: fullname
            
        })
        .then(() => {
            console.log("User data added to Firestore");
            alert('User data added');
            // Redirect to another page
            window.location.href = "login.html";
        })
        .catch((error) => {
            console.error("Error adding user data to Firestore:", error);
            alert('Error adding user data');
        });
    })
        .catch((error) => {
    // Error occurred while creating user
        var errorCode = error.code;
        var errorMessage = error.message;
        console.error("Error creating user:", errorMessage);
        alert(errorMessage);
    });

}

