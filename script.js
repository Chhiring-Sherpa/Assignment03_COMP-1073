// Smoothie Class
class Smoothie {
    constructor(name, fruits = [], greens = [], milk = null, sweeteners = []) { //constructor with default values
        this.name = name;
        this.fruits = fruits;
        this.greens = greens;
        this.milk = milk;
        this.sweeteners = sweeteners;
    }

    // Method to generate a summary for the smoothie
    generateSummary() {
        return `
            <h2>Your ${this.name} smoothie is ready now!</h2>
            ${this.greens.length ? `<p><strong>Greens:</strong> ${this.greens.join(", ")}</p>` : ""}
            ${this.fruits.length ? `<p><strong>Fruits:</strong> ${this.fruits.join(", ")}</p>` : ""}
            <p><strong>Milk:</strong> ${this.milk || "No milk selected"}</p>
            <p><strong>Sweetener:</strong> ${this.sweeteners.join(", ") || "No sweetener selected"}</p>
            <p><strong>Total Cost:</strong> $${this.calculateCost()}</p>
        `;
    }
    calculateCost() {
        const prices = { //an object with prices for each ingredient
            fruits: { Banana: 1.0, Strawberry: 1.5, Mango: 2.0, Blueberry: 2.5, Apple: 1.2, Pineapple: 1.8, Kiwi: 2.0, Pear: 1.5 },
            greens: { Spinach: 1.0, Kale: 1.2, Celery: 0.8, Cucumber: 0.9 },
            milk: { "Regular Milk": 0.5, "Almond Milk": 1.0, "Coconut Milk": 1.2, "Soy Milk": 0.8, "Oat Milk": 0.9 },
            sweeteners: { Honey: 0.5, Sugar: 0.2, "Maple Syrup": 0.7 }
        };

        let totalCost = 0; // initialize total cost to 0

        // Calculate the cost of each category
        this.fruits.forEach(fruit => totalCost += prices.fruits[fruit] || 0); // add the price of the fruit in the total cost or if fruit is not found in the prices object, add 0 to totalCost
        this.greens.forEach(green => totalCost += prices.greens[green] || 0); // add the price of the greens in the total cost or if green is not found in the prices object, add 0 to totalCost
        if (this.milk) totalCost += prices.milk[this.milk] || 0; // add the price of milk in the prices object to totalCost, or 0 if milk is not found
        this.sweeteners.forEach(sweetener => totalCost += prices.sweeteners[sweetener] || 0); // add the price of the sweetener in the total cost or if sweetener is not found in

        return totalCost.toFixed(2); // Return cost formatted to 2 decimal places
    }
}
let isClassicVisible = false;  // making the visibility of the classic Smoothy false
let isGreenVisible = false; //also of green Smoothy
function showClassicFruit() {  //funciotn to generate the classic fruit smoothy content
    const classicFruit = document.getElementById("Classic-fruit");  //getting the classic fruit element and storing it in the variable
    if (isClassicVisible) { //if the classic fruit is visible
        classicFruit.innerHTML = `<h2>Classic-fruit smoothie</h2>`;  //show h2
        isClassicVisible = false; //making the visibility of the classic Smoothy false
    } else { //else insert the html in classicFruit
        classicFruit.innerHTML = ` 
        <div class="section">
            <label>Choose your fruits:</label>
            <input type="checkbox" id="banana" name="fruits" value="Banana"> Banana<br>
            <input type="checkbox" id="strawberry" name="fruits" value="Strawberry"> Strawberry<br>
            <input type="checkbox" id="mango" name="fruits" value="Mango"> Mango<br>
            <input type="checkbox" id="blueberry" name="fruits" value="Blueberry"> Blueberry<br>
        </div>

        <!-- Milk Section -->
        <div class="section">
            <label>Choose your milk:</label>
            <input type="radio" id="regular" name="milk" value="Regular Milk" required> Regular Milk<br>
            <input type="radio" id="almond" name="milk" value="Almond Milk"> Almond Milk<br>
            <input type="radio" id="coconut" name="milk" value="Coconut Milk"> Coconut Milk<br>
        </div>

        <!-- Sweetener Section -->
        <div class="section">
            <label>Sweetener:</label>
            <input type="checkbox" id="honey" name="sweetener" value="Honey"> Honey<br>
            <input type="checkbox" id="sugar" name="sweetener" value="Sugar"> Sugar<br>
        </div>

        <!-- Smoothie Name -->
        <div class="section">
            <label>Give your smoothie a name:</label>
            <input type="text" id="classicSmoothieName" name="smoothieName" placeholder="E.g., Tropical Paradise" required>
        </div>

        <!-- Submit Button -->
        <button type="button" class="btn" onclick="submitClassicSmoothie()">Create Smoothie</button>`; // a submit button that activates the submitClassicSmoothie function when clicked
        isClassicVisible =true; //and making the visibility of the classic Smoothy true
    }
    
}


//function to submit the classic smoothie
function submitClassicSmoothie() {
    //making an array of checked fruits value with the help of array, .from and map methods.
    const selectedFruits = Array.from(document.querySelectorAll('input[name="fruits"]:checked')).map(fruit => fruit.value); 
    //making an array of checked milk value with the help of array, .from and map methods.
    const selectedMilk = document.querySelector('input[name="milk"]:checked')?.value;
    //making an array of checked sweetener value with the help of array, .from and map methods.
    const selectedSweeteners = Array.from(document.querySelectorAll('input[name="sweetener"]:checked')).map(sweetener => sweetener.value);
    //Storing the trimmed value of inserted in the element classicSmoothieName.
    const smoothieName = document.getElementById("classicSmoothieName").value.trim();
    //printing all the array in console
    console.log(selectedFruits)
    console.log(selectedMilk)
    console.log(selectedSweeteners)
    console.log(smoothieName)
// if condition to show warning if the user has not selected any fruit and name is empty
    if (!selectedFruits.length) {
        alert("Please select at least one fruit.");
        return;
    }
    if (!smoothieName) {
        alert("Please provide a name for your smoothie.");
        return;
    }


    //storing all the value user selected into a variable summary
    const smoothie = new Smoothie(smoothieName, selectedFruits, [], selectedMilk, selectedSweeteners);
    document.getElementById('summary').innerHTML = smoothie.generateSummary();
    //adding this summary in the summary div
}

//similar fucntion to generate the content for the green smoothy
function showGreenSmoothie() { 
    const greenSmoothie = document.getElementById("Classic-fruit");

    if (isGreenVisible) {
        greenSmoothie.innerHTML= `<h2>Green-smoothie</h2>`;
        isGreenVisible = false;
    } else {
    greenSmoothie.innerHTML= `
        <div class="section">
            <label>Choose your greens:</label>
            <input type="checkbox" id="spinach" name="greens" value="Spinach"> Spinach<br>
            <input type="checkbox" id="kale" name="greens" value="Kale"> Kale<br>
            <input type="checkbox" id="celery" name="greens" value="Celery"> Celery<br>
            <input type="checkbox" id="cucumber" name="greens" value="Cucumber"> Cucumber<br>
        </div>

        <div class="section">
            <label>Choose your fruits:</label>
            <input type="checkbox" id="apple" name="fruits" value="Apple"> Apple<br>
            <input type="checkbox" id="pineapple" name="fruits" value="Pineapple"> Pineapple<br>
            <input type="checkbox" id="kiwi" name="fruits" value="Kiwi"> Kiwi<br>
            <input type="checkbox" id="pear" name="fruits" value="Pear"> Pear<br>
        </div>

        <!-- Milk Section -->
        <div class="section">
            <label>Choose your milk:</label>
            <input type="radio" id="regular" name="milk" value="Regular Milk" required> Regular Milk<br>
            <input type="radio" id="soy" name="milk" value="Soy Milk"> Soy Milk<br>
            <input type="radio" id="oat" name="milk" value="Oat Milk"> Oat Milk<br>
        </div>

        <!-- Sweetener Section -->
        <div class="section">
            <label>Sweetener:</label>
            <input type="checkbox" id="honey" name="sweetener" value="Honey"> Honey<br>
            <input type="checkbox" id="sugar" name="sweetener" value="Sugar"> Sugar<br>
            <input type="checkbox" id="maple" name="sweetener" value="Maple Syrup"> Maple Syrup<br>
        </div>

        <!-- Smoothie Name -->
        <div class="section">
            <label>Give your smoothie a name:</label>
            <input type="text" id="greenSmoothieName" name="smoothieName" placeholder="E.g., Green Goodness" required>
        </div>

        <!-- Submit Button -->
        <button type="button" class="btn" onclick="submitGreenSmoothie()">Create Green Smoothie</button>`; //a submit button that activate the submitGreenSmoothie function when clicked
        isGreenVisible = true;
    }
    
}

//another submit function to retrieve the value and show it as summary.
function submitGreenSmoothie() {
    const selectedGreens = Array.from(document.querySelectorAll('input[name="greens"]:checked')).map(green => green.value);
    const selectedFruits = Array.from(document.querySelectorAll('input[name="fruits"]:checked')).map(fruit => fruit.value);
    const selectedMilk = document.querySelector('input[name="milk"]:checked')?.value;
    const selectedSweeteners = Array.from(document.querySelectorAll('input[name="sweetener"]:checked')).map(sweetener => sweetener.value);
    const smoothieName = document.getElementById("greenSmoothieName").value.trim();
    console.log(selectedFruits)
    console.log(selectedGreens)
    console.log(selectedMilk)
    console.log(selectedSweeteners)
    console.log(smoothieName)
    if (!selectedGreens.length && !selectedFruits.length) {
        alert("Please select at least one green or fruit.");
        return;
    }
    if (!smoothieName) {
        alert("Please provide a name for your smoothie.");
        return;
    }

    const smoothie = new Smoothie(smoothieName, selectedFruits, selectedGreens, selectedMilk, selectedSweeteners);
    document.getElementById('summary').innerHTML = smoothie.generateSummary();
}
