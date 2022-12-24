async function dates(){
    const requestURL = "/data.json";
    const request = new Request(requestURL)

    const response = await fetch(request);
    const dates = await response.json();
    
    /* Functions thath need value from the json data */
    values(dates)
}

function values(array){
    var j = 0;
    var total = 0;
    const div = document.querySelectorAll("div.expense-bar");
    const tip = document.querySelectorAll("small.tooltip");
    const day = document.querySelectorAll("p.day");
    
    //First grab de higher value
    for(var i = 0; i<array.length; i++){
        j > array[i]["amount"] ? j = j : j=array[i]["amount"];
        total += array[i]["amount"]
        div[i].dataset.amount = array[i]["amount"];
        tip[i].innerHTML = "$" + array[i]["amount"];
        day[i].innerHTML = array[i]["day"];
        console.log(array[i]["amount"])
    }

    var money = document.querySelector(".money h1");
    money.innerHTML = "$"+total.toFixed(2);

    //Defines the higher value as 100% and compare it to the other values
    for(var i = 0; i<array.length; i++){
        var per = (array[i]["amount"]/j);
        if(array[i]["amount"] == j) div[i].classList.add("high")
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

