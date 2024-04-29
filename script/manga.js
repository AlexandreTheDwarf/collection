document.addEventListener('DOMContentLoaded', function() {
    fetch('./json/manga.json')
        .then(response => response.json())
        .then(data => {
            // Trie les données par ordre alphabétique ascendant sur la propriété "name"
            data.sort((a, b) => a.name.localeCompare(b.name));
            displayManga(data);
        });

    document.getElementById('apply_filters').addEventListener('click', () => {
        const editors = Array.from(document.querySelectorAll('.editor-checkbox:checked')).map(checkbox => checkbox.value);
        const rangements = Array.from(document.querySelectorAll('.rangement-checkbox:checked')).map(checkbox => checkbox.value);
        const terminer = document.getElementById('terminer').checked ? 'V' : 'X';
        const terminerJapon = document.getElementById('terminer_japon').checked ? 'V' : 'X';
        const prioritaire = document.getElementById('prioritaire').checked ? 'V' : 'X';
        const lu = document.getElementById('lu').checked ? 'V' : 'X';

        fetch('./json/manga.json')
            .then(response => response.json())
            .then(data => {
                let filteredData = data.filter(manga => {
                    return (editors.length === 0 || editors.includes(manga.editeur)) &&
                           (rangements.length === 0 || rangements.includes(manga.rangement))  &&
                           (terminer === 'X' || manga.terminer === terminer) &&
                           (terminerJapon === 'X' || manga.terminer_jap === terminerJapon) &&
                           (prioritaire === 'X' || manga.prioritaire === prioritaire) &&
                           (lu === 'X' || manga.lu === lu);
                });
                displayManga(filteredData);
            });
    });

    function displayManga(data) {
        const container = document.getElementById('cards_container');
        container.innerHTML = ''; // Clear existing manga cards
        data.forEach(item => {
            const card = document.createElement('div');
            card.className = 'card_manga';
            card.innerHTML = `<img src="${item.image_path}" alt="${item.name}">`;
            container.appendChild(card);
        });
    }
});


