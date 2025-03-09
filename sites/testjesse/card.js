class CardComponent extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
    <div class="search-container">
        <input type="text" id="searchInput" placeholder="Enter your search query">
        <button onclick="performSearch()">Search</button>
    </div>
        `;
    }
}

customElements.define("search-box", CardComponent);