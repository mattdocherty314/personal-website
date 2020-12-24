function pageLoad() {
    let contactButton = document.getElementById("submit-contact");
    if (contactButton !== null) {
        contactButton.addEventListener("click", sendContactRequest);
    }
}

function sendContactRequest() {
	let topicElement = document.getElementById("topic");
	let nameElement = document.getElementById("name");
	let prefConElement = document.getElementById("pref-con");
	let queryElement = document.getElementById("query");

	let topicValue = topicElement.options[topicElement.selectedIndex].text;
	let nameValue = nameElement.value;
	let prefConValue = prefConElement.value;
	let queryValue = queryElement.value;
	
	let formDetails = `topic=${topicValue}&name=${nameValue}&prefCon=${prefConValue}&query=${queryValue}`;
    
	fetch(`http://localhost:3030/contact?${formDetails}`);
}

window.addEventListener("load", pageLoad);