

const boardElement = document.querySelector("#board");
const inputElement = document.querySelector("#inputRows");
const sliderElement = document.querySelector("#slider");
const optionsElement = document.querySelectorAll(".options input[type=radio]")
const colorPickerElement = document.querySelector("#colorPicker")
const buttonElement = document.querySelector("#button");

const options = {
    color: "black",
    modes:{
        erase: false,
        rainbow: false,
        shade: false
    }
        
}

const createDivs = (numberOfRows)=>{
    boardElement.innerHTML = "";
    let numberOfDivs = numberOfRows * numberOfRows; 
    boardElement.setAttribute("style", ` grid-template-columns: repeat(${numberOfRows}, 1fr);
                    grid-template-rows: repeat(${numberOfRows}, 1fr);`);
    for(let i=0; i<numberOfDivs; i++){
        
        const div = document.createElement("div");
        div.setAttribute("class", "board__square");
        boardElement.appendChild(div)
    }
    
}

const updateEventListeners = ()=>{
    let boardSquareElement = document.querySelectorAll("#board div");
    boardSquareElement.forEach(square => {
        square.addEventListener("click", (event)=>{
            checkColor()
            paintSquare(event.target, options.color)
        })
        square.addEventListener("mouseenter", (event)=>{
            checkColor()
            let hoveredSquare = event.target;
            console.log(randomColor());
            if(event.buttons===1){
                paintSquare(hoveredSquare, options.color)
            }            

        })
    });

}

const checkColor = ()=>{
    let {erase, rainbow, shade} = options.modes
    if(erase) options.color = "white";
    else if(rainbow) options.color = randomColor();
    else options.color = colorPickerElement.dataset.currentColor;
    console.log(options);

}

const paintSquare = (square, color)=>{
    square.setAttribute("style",  `background-color: ${color};`)
}

const randomColor = ()=>{
    let [n1, n2, n3] = Array.from({length: 3}, ()=> Math.floor(Math.random()*256))
    return `rgb(${n1}, ${n2}, ${n3})`
}

createDivs(50);
updateEventListeners();

buttonElement.addEventListener("click", ()=>{
    let numberOfRows = +sliderElement.value;
    createDivs(numberOfRows);
    updateEventListeners();
})

optionsElement.forEach(option=>{
    option.addEventListener("click", event=>{
        // Iterates through object options and turns every property to false.
        Object.keys(options.modes).forEach(property => options.modes[property] = false)
        console.log(event.target.id);
        options.modes[event.target.id] = true;

    })
})







