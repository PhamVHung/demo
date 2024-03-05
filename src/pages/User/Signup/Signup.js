const passwordInput = document.querySelector(".pass-field input");
const requirementList = document.querySelectorAll(".requirement-list li");
const eyeIcon = document.querySelector(".pass-field c");
const eyeIcon1 = document.querySelector(".password-check b");
const passwordCheck = document.querySelector(".password-check input");

const requirements = [
    { regex: /.{8,}/, index: 0 },
    { regex: /[0-9]/, index: 1 },
    { regex: /[a-z]/, index: 2 },
    { regex: /[^A-Za-z0-9]/, index: 4 },
    { regex: /[A-Z]/, index: 3 }
]

eyeIcon.addEventListener("click", () => {
    passwordInput.type = passwordInput.type === "password" ? "text" : "password";

    eyeIcon.className = `fa-solid fa-eye${passwordInput.type === "password" ? "" : "-slash"}`;
});

eyeIcon1.addEventListener("click", () => {
    passwordCheck.type = passwordCheck.type === "password" ? "text" : "password";

    eyeIcon1.className = `fa-solid fa-eye${passwordCheck.type === "password" ? "" : "-slash"}`;
});

passwordInput.addEventListener("keyup", (e) => {
    requirements.forEach(item => {
        const isValid = item.regex.test(e.target.value);
        const requirementItem = requirementList[item.index];

        if (isValid) {
            requirementItem.firstElementChild.className = "fa-solid fa-check";
        } else {
            requirementItem.firstElementChild.className = "fa-solid fa-circle";
        }
    });
});

function checkPassword() {
    var password = passwordInput;
    var chckPassword = passwordCheck;
    var message = document.getElementById("message");

    if (password.value != 0) {
        if (password.value == chckPassword.value) {
            message.textContent = "Mật khẩu giống nhau";
            message.style.backgroundColor = "#3ae374";
            return true;
        } else {
            message.textContent = "Mật khẩu không giống nhau";
            message.style.backgroundColor = "#ff4d4d";
            return false
        }
    } else {
        alert("Mật khẩu trống!");
        message.textContent = "";
    }
}

function noti() {

}