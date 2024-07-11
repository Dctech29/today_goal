const inputContainer = document.querySelector(".app-container");
const checkbox = document.querySelectorAll(".checkbox");
const input = document.querySelectorAll(".input input");
const warning = document.querySelector(".warning p");
const progress = document.querySelector(".progress");
const pera_progress = document.querySelector(".progress p");
const span_progress = document.querySelector(".progress p span");
const cleargoals = document.querySelector(".cleargoals");
let completedGoals = 0;

Goals_completed(completedGoals)
allGoals = localStorage.allGoals ? JSON.parse(localStorage.allGoals) : {};


cleargoals.addEventListener("click", () => {
    localStorage.clear()
    setTimeout(() => {
        cleargoals.style.display = "none";
    }, 500);
    completedGoals = 0;
    progress.style.maxWidth = 0;
    pera_progress.style.display = "none"
    Array.from(input).forEach((e) => {
        e.previousElementSibling.classList.remove("checked");
        e.value = ""
        e.removeAttribute("disabled");
    })
})

checkbox.forEach((box) => {
    box.addEventListener("click", (e) => {
        if (checkEmpty() && completedGoals < 3) {
            e.currentTarget.classList.toggle("checked")
            box.nextElementSibling.setAttribute("disabled", "true")
            completedGoals++
            Goals_completed(completedGoals)
            allGoals[box.nextElementSibling.id] = {
                ...allGoals[box.nextElementSibling.id],
                completed: true
            }
            localStorage.setItem("allGoals", JSON.stringify(allGoals));
        } else if (!checkEmpty()) {
            warning.style.visibility = "visible"
        }
        if (completedGoals === 3) {
            cleargoals.style.display = "block"
            console.log("all completed")
        }
    })

})

input.forEach((items) => {
    items.addEventListener("focus", () => {
        warning.style.visibility = "hidden"
    })
    items.addEventListener("input", (e) => {
        allGoals[items.id] = {
            name: e.target.value,
            completed: false
        }
        localStorage.setItem("allGoals", JSON.stringify(allGoals));
    })

    items.value = localStorage.allGoals ? JSON.parse(localStorage.allGoals)[items.id].name : "";
    if (allGoals[items.id] ? allGoals[items.id].completed : false) {
        items.previousElementSibling.classList.add("checked");
        completedGoals++
        Goals_completed(completedGoals)
    }
    if (completedGoals === 3) {
        cleargoals.style.display = "block"
        console.log("all completed")
    }

})

function checkEmpty() {
    let data = [...input].every((item) => {
        return item.value
    })
    return data
}

function Goals_completed(val) {
    if (val === 0) {
        progress.style.maxWidth = val;
        pera_progress.style.display = "none"
    } else if (val > 0 && val <= 3) {
        progress.style.maxWidth = `${33.33*val}%`;
        setTimeout(() => {
            pera_progress.style.display = "block";
        }, 500);
        span_progress.textContent = val
    }
}