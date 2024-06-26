document.addEventListener('DOMContentLoaded', function() {
    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get('id'));

    fetch('./json/anime.json')
        .then(response => response.json())
        .then(data => {
            const filteredIds = JSON.parse(localStorage.getItem('filteredAnimeIds')) || [];
            const item = data.find(item => item.id === id);
            if (item) {
                displayAnimeDetails(item, filteredIds);

                const prevButton = document.getElementById('prev-button');
                const nextButton = document.getElementById('next-button');

                prevButton.addEventListener('click', () => navigateToAdjacentAnime(id, -1, filteredIds));
                nextButton.addEventListener('click', () => navigateToAdjacentAnime(id, 1, filteredIds));
            }
        });

    function displayAnimeDetails(item, filteredIds) {
        const container = document.getElementById('detail-container');
        const genres = Array.isArray(item.genre) ? item.genre.join(', ') : item.genre;

        container.innerHTML = `<div class="detail-card">
                                <h1 class="anime_title">${sanitizeHTML(item.name)}</h1>
                                    <div class="anime_detail">
                                        <img class="anime_img" src="${sanitizeHTML(item.image_path)}" alt="${sanitizeHTML(item.name)}">
                                        <div class="anime_info">
                                                <p><span class="detail-label">Nom VO :</span> ${sanitizeHTML(item.name_vo)}</p>
                                                <p><span class="detail-label">Nombre de saison :</span> ${sanitizeHTML(item.nb_saison)}</p>
                                                <p><span class="detail-label">Nombre d'épisode total :</span> ${sanitizeHTML(item.nb_episode)}</p>
                                                <p><span class="detail-label">Genre :</span> ${sanitizeHTML(genres)}</p>
                                                <p><span class="detail-label">Synopsis :</span> <br>${sanitizeHTML(item.synopsis)}</p>
                                        </div>
                                    </div>
                                    <div class="navigation-buttons">
                                        <button id="prev-button">Précédent</button>
                                        <span id="current_index_info"></span>
                                        <button id="next-button">Suivant</button>
                                    </div>      
                               </div>`;

        updateCurrentIndexInfo(filteredIds.indexOf(item.id), filteredIds.length);
    }

    function navigateToAdjacentAnime(currentId, offset, filteredIds) {
        const currentIndex = filteredIds.indexOf(currentId);
        const newIndex = (currentIndex + offset + filteredIds.length) % filteredIds.length;
        const newId = filteredIds[newIndex];
        window.location.href = '/details_anime.html?id=' + newId;
    }

    function sanitizeHTML(str) {
        const temp = document.createElement('div');
        temp.textContent = str;
        return temp.innerHTML;
    }

    function updateCurrentIndexInfo(currentIndex, totalItems) {
        const indexInfo = document.getElementById('current_index_info');
        indexInfo.textContent = `Anime ${currentIndex + 1} sur ${totalItems}`;
    }
});


