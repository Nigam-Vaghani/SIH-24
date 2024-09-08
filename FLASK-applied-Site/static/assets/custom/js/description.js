// Ensure the DOM is fully loaded before running the script
document.addEventListener('DOMContentLoaded', () => {
    let combinedArticles = [];

    // Fetch and combine JSON data
    fetchAndCombineJSON();

    // Add event listeners
    document.getElementById('articleSearch').addEventListener('input', handleSearchInput);
    document.getElementById('searchButton').addEventListener('click', searchArticle);

    /**
     * Fetches description and simplified JSON files and combines them.
     */
    function fetchAndCombineJSON() {
        Promise.all([
            fetch('/static/data/constitution_of_india.json').then(response => response.json()),
            fetch('/static/data/simplified_.json').then(response => response.json())
        ])
        .then(([descriptionData, simplifiedData]) => {
            combinedArticles = combineJSONData(descriptionData, simplifiedData);
            console.log('Combined Articles:', combinedArticles); // For debugging purposes
        })
        .catch(error => {
            console.error('Error fetching JSON files:', error);
            alert('Failed to load article data. Please try again later.');
        });
    }

    /**
     * Combines description and simplified JSON data based on the article number.
     * Uses the title from the description data only.
     * @param {Array} descriptionData 
     * @param {Array} simplifiedData 
     * @returns {Array} combinedData
     */
    function combineJSONData(descriptionData, simplifiedData) {
        return descriptionData.map(descItem => {
            const simplifiedItem = simplifiedData.find(simpItem => simpItem.article.toString() === descItem.article.toString());
            return {
                article: descItem.article,
                title: descItem.title,
                description: descItem.description,
                simplified: simplifiedItem ? simplifiedItem.simplfied || simplifiedItem.simplified : 'Simplified version not available.'
            };
        });
    }

    /**
     * Handles input in the search bar and provides dynamic suggestions.
     * @param {Event} event 
     */
    function handleSearchInput(event) {
        const query = event.target.value.toLowerCase().trim();
        const suggestionsContainer = document.getElementById('searchSuggestions');
        suggestionsContainer.innerHTML = '';

        if (query === '') {
            suggestionsContainer.classList.remove('show');
            return;
        }

        const suggestions = combinedArticles.filter(article => 
            article.title.toLowerCase().includes(query) ||
            article.article.toString().includes(query)
        );

        if (suggestions.length === 0) {
            suggestionsContainer.classList.remove('show');
            return;
        }

        suggestions.forEach(suggestion => {
            const suggestionItem = document.createElement('li');
            suggestionItem.classList.add('dropdown-item');
            suggestionItem.textContent = `Article ${suggestion.article}: ${suggestion.title}`;
            suggestionItem.addEventListener('click', () => {
                document.getElementById('articleSearch').value = `Article ${suggestion.article}`;
                suggestionsContainer.classList.remove('show');
                displayArticle(suggestion);
            });
            suggestionsContainer.appendChild(suggestionItem);
        });

        suggestionsContainer.classList.add('show');
    }

    /**
     * Searches for an article based on the input value and displays the result.
     */
    function searchArticle() {
        const query = document.getElementById('articleSearch').value.toLowerCase().trim();
        if (query === '') {
            alert('Please enter an article number or title to search.');
            return;
        }

        const result = combinedArticles.find(article => 
            `article ${article.article}`.toLowerCase() === query ||
            article.title.toLowerCase() === query
        );

        if (result) {
            displayArticle(result);
        } else {
            alert('No matching article found.');
            clearArticleDisplay();
        }
    }

    /**
     * Displays the article details in the respective HTML elements.
     * @param {Object} article 
     */
    function displayArticle(article) {
        document.getElementById('articleTitle').textContent = `Article ${article.article}: ${article.title}`;
        document.getElementById('articleDescription').textContent = article.description;
        document.getElementById('articleSimplified').textContent = article.simplified;
    }

    /**
     * Clears the article display sections.
     */
    function clearArticleDisplay() {
        document.getElementById('articleTitle').textContent = '';
        document.getElementById('articleDescription').textContent = '';
        document.getElementById('articleSimplified').textContent = '';
    }
});
