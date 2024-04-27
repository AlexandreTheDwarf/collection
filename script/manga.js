document.addEventListener('DOMContentLoaded', function() {
    fetch('./json/manga.json')
        .then(response => response.json())
        .then(data => {
            // Trie les données par ordre alphabétique ascendant sur la propriété "name"
            data.sort((a, b) => a.name.localeCompare(b.name));
            
            const container = document.getElementById('cards_container');
            data.forEach(item => {
                const card = document.createElement('div');
                card.className = 'card_manga';
                card.innerHTML = `<img src="${item.image_path}" alt="${item.name}">`;
                card.addEventListener('click', () => {
                    window.location.href = '/details.html?id=' + item.id; 
                });
                container.appendChild(card);
            });
        });
});
