interface input extends Element {
    value:number
}

const bill:input = document.querySelector("#bill")
const peopleNumber:input = document.querySelector("#people-number");
const tips = document.querySelectorAll("div.tip-option");
const customTip = document.querySelector("input.tip-option");
const resetButton = document.querySelector("#reset-button");

const tipAmountElement = document.querySelector("#result-tip");
const totalElement = document.querySelector("#result-total");

let selectedTip:Element;

for (let tip of tips) {
    tip.addEventListener("click", (e) => {
        selectedTip = tip;
        console.log(selectedTip)
        if (!areAllInputsFilled()) { return }
        const [resultAmount, resultTotal] = computeResult(+bill.value, +peopleNumber.value, selectedTip.textContent)
        updateResult(resultAmount, resultTotal);
        console.log("Result Updated")
        console.log({resultAmount, resultTotal})
    })
}

function computeResult(totalBill:number, people:number, tipPercentage:string) {
    const calculatedTip = calculateTip(totalBill, tipPercentage, people);
    const calculatedBill = calculateBill(totalBill, people);
    const totalBillPerPerson = calculatedBill + calculatedTip;
    return [calculatedTip, totalBillPerPerson];
}

function areAllInputsFilled() {
    // return +bill.value && +peopleNumber.value && +selectedTip.split("%")[0];
    const billValue = +bill.value;
    const people = +peopleNumber.value;
    console.log({billValue, people, selectedTip})
    return billValue && people && selectedTip;
}

function calculateBill(totalBill:number, people:number):number {
    return totalBill/people;
}

function calculateTip(totalBill:number, tipPercentage:string, people:number):number {
    let _tipPercentage:number =  Number(tipPercentage.split("%")[0]) / 100;
    const totalTip = totalBill * _tipPercentage;
    console.log({totalTip, totalBill, _tipPercentage})
    const tipPerPerson = totalTip/people;
    return tipPerPerson;
}


function updateResult(tipAmount:number, total:number) {
    tipAmountElement.textContent = String(tipAmount);
    totalElement.textContent = String(total);
}
