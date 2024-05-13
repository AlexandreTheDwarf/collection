document.addEventListener('DOMContentLoaded', function() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');  // Récupère l'ID à partir de l'URL

    fetch('./json/anime.json')
        .then(response => response.json())
        .then(data => {
            const item = data.find(item => item.id.toString() === id);
            if (item) {
                const container = document.getElementById('detail-container');
                container.innerHTML = `<div class="detail-card">
                                        <h1 class="anime_title">${item.name}</h1>
                                            <div class="anime_detail">
                                                <img class="anime_img" src="${item.image_path}" alt="${item.name}">
                                                <div class="anime_info">
                                                        <p>Nom VO : ${item.name_vo}</p>
                                                        <p>Nombre de saison : ${item.saison}</p>
                                                        <p>Nombre d'épisode total : ${item.nb_episode}</p>
                                                        <p>Genre : ${item.genre}</p>
                                                        <p>Synospsis : <br>${item.synopsis}</p>
                                                </div>
                                            </div>      
                                       </div>`;
            }
        });
});