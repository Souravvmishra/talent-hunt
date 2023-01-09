const btn = document.getElementById("btn")
const main = document.getElementById("main")
const question = document.getElementById("question")
const option = document.getElementsByClassName("option")
const optionDiv = document.getElementsByClassName("option-div")
const tags = document.getElementsByClassName("tag")
let numQues = 0;
let CorrQues = 0;

let url = "https://quizapi.io/api/v1/questions?apiKey=EDLK0p4OfvUmy3SNTAh0p7aO9j0AHnE64abFtJs2&limit=1"



const show = () => {
    main.classList.remove("hidden")
    main.classList.add("flex")
    btn.classList.add("hidden")
    $("footer").toggleClass("hidden");
    getQuiz()
    $(".lightthisup").addClass("blazingStar");
    $(".progres").removeClass("hidden")



}
btn.addEventListener("click", show)

let winPercent = 0
async function getQuiz() {
    $(".result").hide();
    $("#main").removeClass("blur-out-expand");
    numQues += 1;

    for (let k = 0; k < optionDiv.length; k++) {
        optionDiv[k].innerHTML = `<button
        class="option py-2 bg-transparent text-red-600 font-semibold border-2 border-red-600 rounded hover:bg-red-600 hover:text-white hover:border-transparent transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0 m-2 px-8 overflow-hidden break-words" >
        Loading...
    </button>`
    }
    question.innerText = "Loading..."


    const response = await fetch(url)

    const data = await response.json()
    try {

        $("#tag").text(data[0].tags[0].name);
    } catch (error) {
        $("#tag").text("Unknown");

    }


    question.innerText = data[0].question


    let i = 0;
    for (const key in data[0].answers) {
        if (data[0].answers[key] !== null) {


            if (data[0].correct_answers[`${key}_correct`] === 'true') {
                option[i].classList.add("correct")
            } else {
                option[i].classList.add("incorrect")

            }

            option[i].innerText = data[0].answers[key]
        } else {
            option[i].classList.add("hidden")
        }
        i++;
    }


}


function showResult() {
    $(".result").fadeIn(400)
    $(".option-div").off("click")

    if (this.classList.contains("correct")) {
        $(".resultHere").text("Correct! Check Next");
        CorrQues += 1;
    } else {
        $(".resultHere").text("Incorrect! Check Next");
    }


    $(".progress").removeClass(`h-[${100 - winPercent}%]`);
    winPercent = Math.ceil((CorrQues / numQues) * 100)
    $(".progress").addClass(`h-[${100 - winPercent}%]`);
    $(".progress-num").text(`${winPercent}%`);


    for (let j = 0; j < option.length; j++) {

        if (option[j].classList.contains("correct")) {
            option[j].classList.remove("hover:bg-red-600")
            option[j].classList.remove("border-red-600")
            option[j].classList.remove("text-red-600")
            option[j].classList.add("bg-green-500")
            option[j].classList.add("border-green-900")
            option[j].classList.add("text-white")

        } else {
            option[j].classList.remove("hover:bg-red-600")
            option[j].classList.remove("border-red-600")
            option[j].classList.remove("text-red-600")
            option[j].classList.add("bg-red-500")
            option[j].classList.add("border-red-900")
            option[j].classList.add("text-white")
        }
    }

}


$(".option-div").on("click", ".option", showResult
);


$(".result").click(function (e) {
    e.preventDefault();
    $(".option-div").on("click", ".option", showResult)
    getQuiz()
});



for (let i = 0; i < tags.length; i++) {

    tags[i].addEventListener("click", () => {

        $(".activeTag").removeClass("border-pink-600");
        $(".activeTag").removeClass("text-pink-700");
        $(".activeTag").removeClass("activeTag");
        tags[i].classList.add("border-pink-600")
        tags[i].classList.add("text-pink-700")
        tags[i].classList.add("activeTag")
        url = `https://quizapi.io/api/v1/questions?apiKey=EDLK0p4OfvUmy3SNTAh0p7aO9j0AHnE64abFtJs2&limit=1&tags=${tags[i].innerText}`
        getQuiz()
    })
}


$(".random").click(function (e) {
    e.preventDefault();
    $(".activeTag").removeClass("border-pink-600");
    $(".activeTag").removeClass("text-pink-700");
    $(".activeTag").removeClass("activeTag");
    $(".random").addClass("border-pink-600");
    $(".random").addClass("text-pink-700");
    $(".random").addClass("activeTag");
    let url = "https://quizapi.io/api/v1/questions?apiKey=EDLK0p4OfvUmy3SNTAh0p7aO9j0AHnE64abFtJs2&limit=1"
    getQuiz()



});



