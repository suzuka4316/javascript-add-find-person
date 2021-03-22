/**
 * @file This JavaScript file is linked with TaskThree.html file to add and find athletes info.
 * @author Suzuka Fukami
 */

/** Class representing an athlete. */
class Athlete {
    /**
     * Create an athlete.
     * @param {string} name - The name value.
     * @param {number} height - The height value.
     */
    constructor(name, height) {
        this.name = name;
        this.height = height;
    }
    /**
     * Get the name value.
     * @returns {string} The name value.
     */
    get name() {
        return this._name;
    }
    /**
     * Set the name value.
     * @param {string} x - The name value.
     */
    set name(x) {
        this._name = x;
    }
    /**
     * Get the height value.
     * @returns {number} The height value.
     */
    get height() {
        return this._height;
    }
    /**
     * Set the height value.
     * @param {number} x - The height value.
     */
    set height(x) {
        this._height = x;
    }
    /**
     * Show the information of an athlete.
     * @returns {string} - The name and the height of an athlete.
     */
    showDetails() {
        return this.name + " " + this.height + "cm";
    }
}

let athleteInfo = [];
const maxLength = 5;

/**
 * @function addAthlete
 * This function will be called when user clicks the Save button.
 * Create an object with the two input values and add the object to athleteInfo array.
 * Certain values won't be added and shows an error message.
 * @param {Athlete} a
 */
function addAthlete(a) {
    name = document.getElementById('nameInput').value;
    height = document.getElementById('heightInput').value;

    try {
        if (name === "") throw "Missing name";
        else if (name.length < 2) throw "Name must contain at least 2 characters";
        else if (height === "") throw "Missing height";
        else if (athleteInfo.length < maxLength) {
            a = new Athlete(name, height);
            athleteInfo.push(a);
            document.getElementById("message").innerHTML = a.showDetails() + "<br />" + "Values added successfully";
        }
        else {
            document.getElementById("message").innerHTML = "Array is full";
        }
    }
    catch (err) {
        document.getElementById("message").innerHTML = err;
    }
}

/**
 * @function findAthlete
 * This function will be called when user clicks the Find button.
 * Sort 5 items in the array alphabetically and display the position of the item that is same as the input name.
 */
function findAthlete() {
    function compare(a, b) {
        const athleteA = a.name.toUpperCase();
        const athleteB = b.name.toUpperCase();

        let comparison = 0;
        if (athleteA > athleteB) {
            comparison = 1;
        }
        else if (athleteA < athleteB) {
            comparison = -1;
        }
        return comparison;
    }
    athleteInfo.sort(compare);

    document.getElementById("message").innerHTML = "";
    let displayDetails = (item) => document.getElementById("message").innerHTML += item.showDetails() + "<br />";
    athleteInfo.forEach(displayDetails);

    function binarySearch(value, list) {
        let first = 0;
        let last = list.length - 1;
        let position = -1;
        let found = false;
        let middle;

        while (found === false && first <= last) {
            middle = Math.floor((first + last) / 2);
            if (list[middle].name.toUpperCase() == value.toUpperCase()) {
                found = true;
                position = middle;
            } else if (list[middle].name.toUpperCase() > value.toUpperCase()) {
                last = middle - 1;
            } else {
                first = middle + 1;
            }
        }
        return position;
    }
    let nameInput = document.getElementById('nameInput').value;
    let posFound = binarySearch(nameInput, athleteInfo);
    if (posFound != -1){
        document.getElementById("message").innerHTML += `Athlete name ${nameInput} is found in position ${posFound}`;
    }
    else{
        document.getElementById("message").innerHTML += `Athlete name ${nameInput} was not found in the list`;
    }
}