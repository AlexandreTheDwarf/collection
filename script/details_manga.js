document.addEventListener('DOMContentLoaded', function() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');  // Récupère l'ID à partir de l'URL

    fetch('./json/manga.json')
        .then(response => response.json())
        .then(data => {
            const item = data.find(item => item.id.toString() === id);
            if (item) {
                const container = document.getElementById('detail-container');
                container.innerHTML = `<div class="detail-card">
                                        <h1 class="manga_title">${item.name}</h1>
                                            <div class="manga_detail">
                                                <img class="manga_img" src="${item.image_path}" alt="${item.name}">
                                                <div class="manga_info">
                                                    <p><span class="detail-label">Editeur :</span> ${item.editeur}</p>
                                                    <p><span class="detail-label">Nombres de tomes possédé :</span> ${item.tomes}</p>
                                                    <p><span class="detail-label">La série est rangée dans :</span> ${item.rangement} </p>
                                                    <p><span class="detail-label">Nombres de tomes sortis au japon :</span> ${item.tomes_jap}</p>
                                                    
                                                    <p><span class="detail-label">La série est-elle terminée ?</span> ${item.terminer === "V" ? "Oui" : "Non"}</p>
                                                    <p><span class="detail-label">La série est-elle terminée au Japon ?</span> ${item.terminer_jap === "V" ? "Oui" : "Non"}</p>
                                                    <p><span class="detail-label">La série est-elle une série prioritaire à l'achat ?</span> ${item.prioritaire === "V" ? "Oui" : "Non"}</p>
                                                    <p><span class="detail-label">La série a-t-elle été complètement lue ?</span> ${item.lu === "V" ? "Oui" : "Non"}</p>

                                                    <p><a href="${item.link}" target="_blank">Lien manga News</a></p>
                                                </div>
                                            </div>
                                       </div>`;
            }
        });
});

