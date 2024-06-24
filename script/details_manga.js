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
                                                    <p><strong>Editeur :</strong> ${item.editeur}</p>
                                                    <p><strong>Nombres de tomes possédé :</strong> ${item.tomes}</p>
                                                    <p><strong>La série est rangée dans :</strong> ${item.rangement} </p>
                                                    <p><strong>Nombres de tomes sortis au japon :</strong> ${item.tomes_jap}</p>
                                                    
                                                    <p><strong>La série est-elle terminée ?</strong> ${item.terminer === "V" ? "Oui" : "Non"}</p>
                                                    <p><strong>La série est-elle terminée au Japon ?</strong> ${item.terminer_jap === "V" ? "Oui" : "Non"}</p>
                                                    <p><strong>La série est-elle une série prioritaire à l'achat ?</strong> ${item.prioritaire === "V" ? "Oui" : "Non"}</p>
                                                    <p><strong>La série a-t-elle été complètement lue ?</strong> ${item.lu === "V" ? "Oui" : "Non"}</p>

                                                    <a href="${item.link}" target="_blank">Lien manga News</a>
                                                </div>
                                            </div>
                                       </div>`;
            }
        });
});

