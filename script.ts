interface input extends Element {
    value:string
}

const bill:input = document.querySelector("#bill")
const peopleNumber:input = document.querySelector("#people-number");
const tips = document.querySelectorAll("button.tip-option");
const customTip:input = document.querySelector("input.tip-option");
const resetButton = document.querySelector("#reset-button");

const tipAmountElement = document.querySelector("#result-tip");
const totalElement = document.querySelector("#result-total");

let selectedTip:string;
let currentSelectedTip:Element;
let lastSelectedTip:Element;

for (let tip of tips) {
    tip.addEventListener("click", (e) => {
        selectedTip = tip.textContent;
        lastSelectedTip = currentSelectedTip;
        currentSelectedTip = tip;
        console.log(selectedTip)
    })
    tip.addEventListener("click", resultUpdater);
    tip.addEventListener("click", (e) => {
        changeState(tip);
        if (lastSelectedTip) changeState(lastSelectedTip);
    });
}
customTip.addEventListener("change", (e) => {
    selectedTip = customTip.value
});

[bill, peopleNumber, customTip].forEach(input => input.addEventListener("change", resultUpdater));

function resultUpdater() {
    if (!areAllInputsFilled()) { return }
    const [resultAmount, resultTotal] = computeResult(+bill.value, +peopleNumber.value, selectedTip)
    updateResult(resultAmount, resultTotal);
    console.log("Result Updated")
    console.log({resultAmount, resultTotal})
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
    tipAmountElement.textContent = "$" + String(tipAmount.toFixed(2));
    totalElement.textContent = "$" + String(total.toFixed(2));
}

function resetSplitter() {
    bill.value = "";
    selectedTip = null;
    customTip.value = "";
    peopleNumber.value = "";
    updateResult(0, 0);
}

resetButton.addEventListener("click", resetSplitter);

function changeState(element:any) {
    element.classList.toggle("unselected");
    element.classList.toggle("selected");
}

const inputNumberAll = document.querySelectorAll(".input-number-all");
for (let i = 0; i < inputNumberAll.length; i++) {
    let input = inputNumberAll[i] as input;
    input.addEventListener("keyup", (e) => {
        if (/0+/.test(input.value)) {
            applyError(input, "Can't be zero");
        } else if (/[^\d.]/.test(input.value) || input.value === "") {
            applyError(input, "Only accept numbers")
        } else {
            applyApproval(input);
        }
        console.log(e)
        console.log(input.value)
    })
}

function applyError(input:input, message:string) {
    input.classList.remove("correct-input");
    input.classList.add("incorrect-input");
}

function applyApproval(input:input) {
    input.classList.remove("incorrect-input");
    input.classList.add("correct-input");
}