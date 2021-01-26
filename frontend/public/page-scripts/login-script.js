function pageLoad() {
    let loginButton = document.getElementById("submit-login");
    if (loginButton !== null) {
        loginButton.addEventListener("click", sendLoginRequest);
    }
}

function sendLoginRequest() {
    let loginButton = document.getElementById("submit-login");
    
    if (getCookie("JWT") !== "") {
        loginButton.disabled;
    } else {
        let username = document.getElementById("user").value;
        let password = document.getElementById("pass").value;
        
        let fetchParam = {
            method: "POST",
            body: `username=${username}&password=${password}`,
            headers: {
                "Content-type": "application/x-www-form-urlencoded"
            }
        }
        fetch("http://localhost:3030/users", fetchParam)
        .then((resp) => {
            return resp.json();
        })
        .then((resJSON) => {
            if (resJSON.success !== undefined) {
                setCookie("JWT", resJSON.success);
			}
			else if (resJSON.error !== undefined) {
				throw resJSON.error;
			}
        })
        .catch((err) => {
			console.log(err);
			let errorPara = document.getElementById("error");
			errorPara.innerHTML = err;
        })
    }
}

window.addEventListener("load", pageLoad);


function setCookie(name, value) {
    let date = new Date();
    date.setTime(date.getTime() + 3600000);
    let expires = "expires="+date.toUTCString();
    document.cookie = `${name}=${value};${expires};`;
}

function getCookie(name) {
    var name = name + "=";
    var cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        while (cookie.charAt(0) === ' ') {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(name) === 0) {
            return cookie.substring(name.length, cookie.length);
        }
    }
    return "";
}