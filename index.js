const retrieveUserInputEntries = () => {
    let entry = localStorage.getItem("user-Entries");
    if (entry) {
        entry = JSON.parse(entry);
    } else {
        entry = [];
    }
    return entry;
}

let userInputEntries = retrieveUserInputEntries();

const displayUserEntries = () => {
    const entries = retrieveUserInputEntries();
    const tableEntries = entries.map((entry) => {
        const nameElement = `<td class='border-2 border-white px-3 py-2'>${entry.name}</td>`;
        const emailElement = `<td class='border-2 border-white px-3 py-2'>${entry.email}</td>`;
        const passwordElement = `<td class='border-2 border-white px-3 py-2'>${entry.password}</td>`;
        const dobElement = `<td class='border-2 border-white px-3 py-2'>${entry.dob}</td>`;
        const acceptTermsElement = `<td class='border-2 border-white px-3 py-2'>${entry.acc_Terms_Conditions}</td>`;

        return `<tr>${nameElement} ${emailElement} ${passwordElement} ${dobElement} ${acceptTermsElement}</tr>`;
    }).join("\n");

    const table = `<table class="table-auto w-full">
        <tr>
            <th class="border-2 border-white px-4 py-2 ">Name</th>
            <th class="border-2 border-white px-4 py-2 ">Email</th>
            <th class="border-2 border-white px-4 py-2">Password</th>
            <th class="border-2 border-white px-4 py-2">Dob</th>
            <th class=" border-2 border-white px-4 py-2">Accepted terms?</th>
        </tr>
        ${tableEntries}
    </table>`;

    let details = document.getElementById("user-Entries");
    details.innerHTML = table;
}

function validateDob(element) {
    const dobValue = element.value;
    const toDate = new Date();
    const dobDate = new Date(dobValue);
    const age = toDate.getFullYear() - dobDate.getFullYear();
    const ageDiff = age >= 18 && age <= 55;

    if (!ageDiff) {
        element.setCustomValidity("Age must be between 18 and 55 years!");
        element.reportValidity();
    } else {
        element.setCustomValidity('');
    }
}

const saveUserInput = (event) => {
    event.preventDefault();
    const form = document.getElementById("user-input");
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const dobInput = document.getElementById("dob");
    validateDob(dobInput);
    if (form.checkValidity()) {
        const name = nameInput.value;
        const email = emailInput.value;
        const password = passwordInput.value;
        const dob = dobInput.value;
        const acc_Terms_Conditions = document.getElementById("acceptTerms").checked;
        const obj = {
            name,
            email,
            password,
            dob,
            acc_Terms_Conditions
        };

        userInputEntries.push(obj);
        localStorage.setItem("user-Entries", JSON.stringify(userInputEntries));
        displayUserEntries();
        form.reset();
    }
};

document.getElementById("user-input").addEventListener("submit", saveUserInput);
displayUserEntries();
//localStorage.clear()
