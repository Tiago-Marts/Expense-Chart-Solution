/* Days array */
const week = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

/* Getting the JSON working */
async function dates(){
    const requestURL = "/data.json";
    const request = new Request(requestURL)

    const response = await fetch(request);
    const dates = await response.json();
    
    /* Functions that need value from the json data */
    values(dates)
}



function values(array){
    var j = 0;
    var total = 0;


    const date = new Date();
    
    const div = document.querySelectorAll("div.expense-bar");
    const tip = document.querySelectorAll("small.tooltip");
    const day = document.querySelectorAll("p.day");

    //Working around: 1- Grabing the higher value to define the height after and 2 - Getting the actual day highlighted
    for(var i = 0; i<array.length; i++){

        //1 - Grabing the higher value
        j > array[i]["amount"] ? j = j : j=array[i]["amount"];
        total += array[i]["amount"]
        div[i].dataset.amount = array[i]["amount"];
        tip[i].innerHTML = "$" + array[i]["amount"];

        //2 - Adding the today class to highlight the bar
        day[i].innerHTML = array[i]["day"];
        if(array[i]["day"] == week[date.getDay()]) {
            div[i].classList.add("today")
        };
    }


    var money = document.querySelector(".money h2");
    money.innerHTML = "$"+total.toFixed(2);

    //Defines the higher value as 100% and compare it to the other values
    for(var i = 0; i<array.length; i++){
        var per = (array[i]["amount"]/j);
        div[i].style.height = (5*per) + "em";
    }
}

function tooltip(boolean, index){
    const tooltip = document.querySelectorAll("small.tooltip")
    tooltip[index].dataset.visible = boolean;

}



//On load or Main
window.onload = function(){
    dates()
    const bars = Array.from(document.querySelectorAll("div.expense-bar"));

    bars.forEach((element, index) => (
        element.parentElement.addEventListener('mouseenter', (e)=>{
            tooltip("true", index)}),
        element.parentElement.addEventListener('mouseleave', ()=>{
            tooltip("false", index)
        })
    )

        )
}

