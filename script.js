const bidInput = document.getElementById("startingbid");
const skillCheckboxes = document.getElementsByClassName("skills");
const ageRadios = document.getElementsByName("age");
const educationSelect = document.getElementById("education");
const networthSelect = document.getElementById("networth");
const casteSelect = document.getElementById("caste");
const reputationCheckboxes = document.getElementsByClassName("reputation");

const calculatePrice = () => {
    let brideName = document.getElementById("name").value.trim();
    let basePrice = Number(bidInput.value);
    let loveNote = document.getElementById("loveLetter").value.trim();

    if (!brideName || isNaN(basePrice) || basePrice <= 0) {
        alert('Please enter valid inputs.');
        return;
    }

    basePrice = applyCoefficient(educationSelect, basePrice);
    basePrice = applyCoefficient(networthSelect, basePrice);
    basePrice = applyBonus(casteSelect, basePrice);
    basePrice = addCheckedValues(skillCheckboxes, basePrice);
    basePrice = applyRadioMultiplier(ageRadios, basePrice);
    basePrice = adjustForReputation(reputationCheckboxes, basePrice);

    const brideInfo = {
        name: brideName,
        price: basePrice,
        note: loveNote
    };

    document.getElementById("result").innerHTML = `The price for ${brideInfo.name} is $${brideInfo.price.toFixed(2)}. Your note: ${brideInfo.note}`;
};

const applyCoefficient = (selectElem, price) => {
    const factor = Number(selectElem.value) || 1;
    return price * factor;
};

const applyBonus = (selectElem, price) => {
    const bonus = Number(selectElem.value) || 0;
    return price + bonus;
};

const addCheckedValues = (checkboxes, price) => {
    return Array.from(checkboxes)
                .filter(item => item.checked)
                .reduce((total, item) => total + Number(item.value), price);
};

const applyRadioMultiplier = (radios, price) => {
    radios.forEach(item => {
        if (item.checked) price *= Number(item.value);
    });
    return price;
};

const adjustForReputation = (checkboxes, price) => {
    for (const item of checkboxes) {
        if (item.checked) {
            const value = Number(item.value);
            price = Number.isInteger(value) ? price + value : price * value;
        }
    }
    return price;
};

document.getElementById("submit").addEventListener("click", calculatePrice);
