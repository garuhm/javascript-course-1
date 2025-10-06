let roundData;

function getChoice() {
    return Math.trunc(Math.random() * 3);
}

function getResult(win, draw, lose, computer){
    switch(computer){
        case win:
            return "win";
        case draw:
            return "draw";
        case lose:
            return "lose";        
    }
}

const choices = document.querySelectorAll(".choices .choice");
choices.forEach((choice) => {
    choice.addEventListener("click", function(e) {
        let moves = ["", "", ""];
        let userChoice;
        let userHandText;
        switch(choice.id){
            case "rock":
                userChoice = "rock";
                userHandText = "✊";
                moves = ["scissors", "rock", "paper"];
                break;
            case "paper":
                userChoice = "paper";
                userHandText = "✋";
                moves = ["rock", "paper", "scissors"];
                break;    
            case "scissors":
                userChoice = "scissors";
                userHandText = "✌️";
                moves = ["paper", "scissors", "rock"];
                break;    
        };

        const index = getChoice()
        const computerChoice = moves[index];
        
        let computerHandText;
        switch(computerChoice){
            case "rock":
                computerHandText = "✊";
                break;
            case "paper":
                computerHandText = "✋";
                break;
            case "scissors":
                computerHandText = "✌️";
                break;        
        }

        result = getResult(moves[0], moves[1], moves[2], computerChoice);

        let accent;
        let color;
        let message;

        switch(result){
            case "win":
                accent = "#B2F198";
                color = "#7CDE51";
                message = "You won!"
                break;
            case "draw":
                accent = "#F8F07B";
                color = "#F7F01C";
                message = "Draw!"
                break;
            case "lose":
                accent = "#E6A6A6";
                color = "#DE5151";
                message = "PC won!"
                break;    
        }

        let htmlData = {
            accent: accent,
            color: color,
            message: message,
            userHandText: userHandText,
            computerHandText: computerHandText,
        };
        roundData = {
            userChoice: userChoice,
            computerChoice: computerChoice,
            result: result,
            htmlData: htmlData
        };

        choice.setAttribute("clicked", true);

        const text = document.querySelector(".result");
        text.setAttribute("playing", "true");
        setTimeout(() => {
            text.style.transform = "scaleX(1)";
            text.setAttribute("playing", "false");
            text.style.opacity = "0";
            text.innerHTML = "ㅤ"
        }, 600)

        setTimeout(() => {
            const hands = document.querySelectorAll(".hand .hand-emojis");
                hands.forEach((hand) => {
                hand.setAttribute("animating", "true")
            });

            choices.forEach((innerChoice) => {
                if(innerChoice.id !== choice.id){
                    innerChoice.setAttribute("not-clicked", "true");
                }
                innerChoice.disabled=true;
            })

            setTimeout(() => {
                const leftFist = document.querySelector("#left .hand-emojis .fist");
                const rightFist = document.querySelector("#right .hand-emojis .fist");

                leftFist.innerHTML = userHandText;
                rightFist.innerHTML = computerHandText;
            }, 1250)

            setTimeout(() => {
                let baseBGColor = getComputedStyle(choice).backgroundColor;
                const choiceKeyframes = [
                    {backgroundColor: baseBGColor, offset: 0.0},
                    {backgroundColor: roundData.htmlData.accent, offset: 1.0}
                ];
                const choiceAnimation = {
                    duration: 900,
                    iterations: 1,
                    easing: "ease",
                    fill: "forwards"
                }
                choice.animate(choiceKeyframes, choiceAnimation)
            }, 1600)
        }, 200)

        

        const nextBtn = document.querySelector(".next");
        setTimeout(() => {
            
            const announcerKeyframes = [
                {opacity: 0, offset: 0.0},
                {opacity: 1, offset: 1.0}
            ];
            const announcerAnimation = {
                duration: 1200,
                iterations: 1,
                easing: "ease",
                fill: "forwards"
            }
            
            nextBtn.style.opacity = "0";
            nextBtn.style.display = "inline";
            const nextKeyframes = [
                {opacity: 0, offset: 0.0},
                {opacity: 1, offset: 1.0}
            ];
            const nextAnimation = {
                duration: 1200,
                iterations: 1,
                easing: "ease",
                fill: "forwards"
            };

            const choiceKeyframes = [

            ];

            text.style.color = color;
            text.innerHTML = message;
            text.animate(announcerKeyframes, announcerAnimation);
            nextBtn.animate(nextKeyframes, nextAnimation);
            nextBtn.style.opacity = "1";
            text.style.opacity = "1";
        }, 2600);

    });
});

const reset = document.querySelector(".next");
reset.addEventListener("click", function(e) {
    let style = window.getComputedStyle(document.documentElement);

    const hands = document.querySelectorAll(".hand .hand-emojis");
        hands.forEach((hand) => {
        hand.setAttribute("animating", "false")
    });

    choices.forEach((choice) => {
        choice.setAttribute("not-clicked", "false");
        choice.getAnimations().forEach(anim => anim.cancel())
        if(choice.getAttribute("clicked") === "true"){
            choice.style.backgroundColor = style.getPropertyValue("--clr-primary-600");
        }
        choice.setAttribute("clicked", false);
        choice.disabled=false;
    });

    const leftFist = document.querySelector("#left .hand-emojis .fist");
    
    const rightFist = document.querySelector("#right .hand-emojis .fist");
    rightFist.innerHTML = "✊";    
    leftFist.innerHTML = "✊";

    const text = document.querySelector(".result");
    text.innerHTML = "Pick a move."
    text.style.color = style.getPropertyValue("--clr-neutral-100")

    const nextBtn = document.querySelector(".next");
    nextBtn.style.display = "none";
})