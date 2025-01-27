const apiUrl = 'https://playerdb.co/api/player/steam/';

const avatarValue = document.querySelector(".avatar-value");
const usernameValue = document.querySelector(".username-value");
const profileUrl = document.querySelector(".profile-url");

const messageBox = document.querySelector(".message-box");
const searchButton = document.querySelector(".search-button");

let steamId = "";

searchButton.addEventListener("click", () => {
    try {
        let userInput = document.getElementById("steamId").value;

        if (steamId != "" && steamId === userInput) throw new Error("User is already loaded");
        else if (steamId === "" && steamId === userInput) throw new Error("The field is empty")

        steamId = userInput;
        GETData(steamId);
        document.getElementById("steamId").value = "";

    } catch (error) {
        console.error(error);
        messageBox.innerHTML = error.message;
    }
})

document.getElementById("steamId").addEventListener("keypress", (event) => {
    if (event.key === "Enter") searchButton.click();
})

async function GETData (steamId) {
    try {
        avatarValue.innerHTML = "";
        usernameValue.innerHTML = "";
        profileUrl.innerHTML = "";

        const response = await fetch(`${apiUrl}${steamId}`);

        if (!response.ok) throw new Error("User is invalid");

        const user = await response.json();

        console.log(user)
        messageBox.innerHTML = user.message;

        avatarValue.innerHTML = `<img src="${user.data.player.avatar}" alt="">`;

        usernameValue.innerHTML = user.data.player.username;

        profileUrl.innerHTML = `<a href="${user.data.player.meta.profileurl}">Link to profile</a>`

    } catch (error) {
        console.error(error);
        messageBox.innerHTML = error.message;
    }

}