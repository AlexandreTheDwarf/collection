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
                                                    <p>Editeur : ${item.editeur}</p>
                                                    <p>Nombres de tomes possédé : ${item.tomes}</p>
                                                    <p>${item.terminer === "V" ? "La série est terminée" : "La série n'est pas terminée"}</p>
                                                    <p>La série est rangée dans : ${item.rangement} </p>

                                                    <p>Nombres de tomes sortis au japon : ${item.tomes_jap}</p>
                                                    <p>${item.terminer_jap === "V" ? "La série est terminée" : "La série n'est pas terminée"} au Japon </p>
                                                    <p>${item.prioritaire === "V" ? "La série est une série prioritaire à l'achat" : "La série n'est pas une série prioritaire à l'achat"}</p>
                                                    <p>${item.lu === "V" ? "La série a été complètement lue" : "La série n'a pas été complètement lue"}</p>

                                                    <a href="${item.link}" target="_blank">Lien manga News</a>
                                                </div>
                                            </div>
                                       </div>`;
            }
        });
});

