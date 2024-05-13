document.addEventListener('DOMContentLoaded', function() {
    let animeData = []; // Variable pour stocker les données des animes
    const itemsPerPage = 12;
    let currentPage = 1;

    fetch('./json/anime.json')
        .then(response => response.json())
        .then(data => {
            animeData = data; // Stocke les données des animes

            // Appelle la fonction pour initialiser les filtres et afficher les animes
            renderAnimeCards();
        });

    function renderAnimeCards() {
        const container = document.getElementById('cards_container');
        container.innerHTML = ''; // Vide le conteneur

        // Filtres
        const nameFilter = document.getElementById('name_filter').value.toLowerCase();
        const selectedGenres = Array.from(document.querySelectorAll('.genre-checkbox:checked')).map(checkbox => checkbox.value.toLowerCase());

        // Filtrer les données des animes en fonction des filtres choisis
        let filteredData = animeData.filter(item => {
            const nameMatch = (item.name && item.name.toLowerCase().includes(nameFilter)) || (item.name_vo && item.name_vo.toLowerCase().includes(nameFilter)); // Vérifie d'abord si les propriétés existent
            return nameMatch;
        });        

        if (selectedGenres.length > 0) {
            filteredData = filteredData.filter(item => selectedGenres.some(genre => item.genre.map(g => g.toLowerCase()).includes(genre)));
        }

        // Trier les données filtrées par nom
        filteredData.sort((a, b) => a.name.localeCompare(b.name));

        // Pagination
        const startIndex = (currentPage - 1) * itemsPerPage;
        const selectedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

        // Afficher les cartes d'animes
        selectedData.forEach(item => {
            const card = document.createElement('div');
            card.className = 'card_anime';
            card.innerHTML = `<img src="${item.image_path}" alt="${item.name}">`;

            card.addEventListener('click', () => {
                window.location.href = '/details_anime.html?id=' + item.id;
            });

            container.appendChild(card);
        });

        // Mettre à jour les informations de pagination
        updatePaginationInfo(filteredData.length);
    }

    // Mettre à jour les informations de pagination
    function updatePaginationInfo(totalItems) {
        const pageInfo = document.getElementById('current_page_info');
        const totalPages = Math.ceil(totalItems / itemsPerPage);
        pageInfo.textContent = `Page ${currentPage} sur ${totalPages}`;
    }

    // Fonction pour passer à la page suivante
    function nextPage() {
        const totalPages = Math.ceil(animeData.length / itemsPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            renderAnimeCards();
        }
    }

    // Fonction pour passer à la page précédente
    function prevPage() {
        if (currentPage > 1) {
            currentPage--;
            renderAnimeCards();
        }
    }

    // Écouteurs d'événements pour les boutons de pagination
    document.getElementById('next_page').addEventListener('click', nextPage);
    document.getElementById('prev_page').addEventListener('click', prevPage);

    // Écouteur d'événement pour les filtres
    document.getElementById('name_filter').addEventListener('input', renderAnimeCards);
    document.querySelectorAll('.genre-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', renderAnimeCards);
    });
});
