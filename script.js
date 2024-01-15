const searchBar = document.getElementById('search-bar');
const suggestionsUl = document.getElementById('suggestions-ul');

const fruits = ['Apple', 'Apricot', 'Avocado 🥑', 'Banana', 'Bilberry', 'Blackberry', 'Blackcurrant', 'Blueberry', 'Boysenberry', 'Currant', 'Cherry', 'Coconut', 'Cranberry', 'Cucumber', 'Custard apple', 'Damson', 'Date', 'Dragonfruit', 'Durian', 'Elderberry', 'Feijoa', 'Fig', 'Gooseberry', 'Grape', 'Raisin', 'Grapefruit', 'Guava', 'Honeyberry', 'Huckleberry', 'Jabuticaba', 'Jackfruit', 'Jambul', 'Juniper berry', 'Kiwifruit', 'Kumquat', 'Lemon', 'Lime', 'Loquat', 'Longan', 'Lychee', 'Mango', 'Mangosteen', 'Marionberry', 'Melon', 'Cantaloupe', 'Honeydew', 'Watermelon', 'Miracle fruit', 'Mulberry', 'Nectarine', 'Nance', 'Olive', 'Orange', 'Clementine', 'Mandarine', 'Tangerine', 'Papaya', 'Passionfruit', 'Peach', 'Pear', 'Persimmon', 'Plantain', 'Plum', 'Pineapple', 'Pomegranate', 'Pomelo', 'Quince', 'Raspberry', 'Salmonberry', 'Rambutan', 'Redcurrant', 'Salak', 'Satsuma', 'Soursop', 'Star fruit', 'Strawberry', 'Tamarillo', 'Tamarind', 'Yuzu'];

searchBar.addEventListener('input', function(event) {
    event.preventDefault();

    suggestionsUl.innerHTML = '';

    const inputValue = event.target.value;

    const results = searchFruit(inputValue); // Declare 'results' here

    // Create a new "li" for each fruit suggestion (results)
    results.forEach((result) => {
        const suggestion = document.createElement('li');
        suggestion.innerText = result;
        suggestionsUl.appendChild(suggestion);

        // Add an event listener to 'suggestion' (the li) of "mouseover"
        suggestion.addEventListener('mouseover', function(event) {
            // Remove the 'hovered-suggestion class' from all suggestions
            document.querySelectorAll('#suggestions-ul li').forEach(item => {
                item.classList.remove('hovered-suggestion');
            });

            // Highlight the 'hovered suggestion' by adding a new class "hovered-suggestion"
            suggestion.classList.add('hovered-suggestion');
        });

        // Add event listener for "clicks" to "suggestion" (the lis) to be able to select the one we want
        suggestion.addEventListener('click', function(event) {
            searchBar.value = suggestion.innerText;
            suggestionsUl.innerHTML = '';
        });
    });
});

// Add event listener for 'keydown' on the "search bar" to be able to delete the fruit entry
searchBar.addEventListener('keydown', function(event) {
    if (event.key === 'Delete') {
        const hoveredSuggestion = document.querySelector('.hovered-suggestion');
        if (hoveredSuggestion) {
            hoveredSuggestion.remove();
        }
    }

    // Clear suggestions if the "searchBar" is empty after deleting the selected item
    setTimeout(() => {
        if (searchBar.value === '') {
            suggestionsUl.innerHTML = '';
        }
    });
});

// Create a function to search
function searchFruit(string) {
    let stringInput = string.toLowerCase();

    // Filter each element of the array "fruits" to find the fruits that match the string
    const results = fruits.filter((fruit) => fruit.toLowerCase().includes(stringInput));
    return results;
}