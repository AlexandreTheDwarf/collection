document.addEventListener('DOMContentLoaded', function() {
    fetch('./json/anime.json')
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('cards_container');
            data.forEach(item => {
                const card = document.createElement('div');
                card.className = 'card_anime';
                card.innerHTML = `<img src="${item.image_path}" alt="${item.name}">`;
                /*
                card.addEventListener('click', () => {
                    window.location.href = '/details.html?id=' + item.id; 
                });
                */
                container.appendChild(card);
            });
        });
});
