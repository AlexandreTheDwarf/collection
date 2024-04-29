document.addEventListener('DOMContentLoaded', function() {
    fetch('./json/manga.json')
        .then(response => response.json())
        .then(data => {
            // Trie les données par ordre alphabétique ascendant sur la propriété "name"
            data.sort((a, b) => a.name.localeCompare(b.name));

            const container = document.getElementById('cards_container');
            let filteredData = data; // initialise les données filtrées avec toutes les données

            function applyFilters() {
                const editors = document.querySelectorAll('.editor-checkbox:checked');
                const shelves = document.querySelectorAll('.rangement-checkbox:checked');
                const finish = document.getElementById('terminer').checked;
                const finishJap = document.getElementById('terminer_japon').checked;
                const priority = document.getElementById('prioritaire').checked;
                const read = document.getElementById('lu').checked;

                filteredData = data.filter(item => {
                    let passesEditor = true;
                    let passesShelves = true;

                    if (editors.length > 0) {
                        passesEditor = Array.from(editors).some(editor => item.editeur === editor.value);
                    }

                    if (shelves.length > 0) {
                        passesShelves = Array.from(shelves).some(shelf => item.rangement === shelf.value);
                    }

                    return passesEditor && passesShelves && (!finish || item.terminer === "V") &&
                           (!finishJap || item.terminer_jap === "V") && (!priority || item.prioritaire === "V") &&
                           (!read || item.lu === "V");
                });

                renderCards();
            }

            function renderCards() {
                container.innerHTML = ''; // vide le conteneur
                filteredData.forEach(item => {
                    const card = document.createElement('div');
                    card.className = 'card_manga';
                    card.innerHTML = `<img src="${item.image_path}" alt="${item.name}">`;
                    card.addEventListener('click', () => {
                        window.location.href = '/details.html?id=' + item.id; 
                    });
                    container.appendChild(card);
                });
            }

            document.getElementById('apply_filters').addEventListener('click', applyFilters);
            renderCards(); // affiche toutes les cartes initialement
        });
});
