document.addEventListener('DOMContentLoaded', function() {
    fetch('./json/manga.json')
        .then(response => response.json())
        .then(data => {
            data.sort((a, b) => a.name.localeCompare(b.name));

            const itemsPerPage = 12;
            let currentPage = 1;
            let filteredData = data;

            const container = document.getElementById('cards_container');
            const pageInfo = document.getElementById('current_page_info');

            function applyFilters() {
                const editors = document.querySelectorAll('.editor-checkbox:checked');
                const shelves = document.querySelectorAll('.rangement-checkbox:checked');
                const finishYes = document.getElementById('terminer_yes').checked;
                const finishNo = document.getElementById('terminer_no').checked;
                const finishJapYes = document.getElementById('terminer_japon_yes').checked;
                const finishJapNo = document.getElementById('terminer_japon_no').checked;
                const priorityYes = document.getElementById('prioritaire_yes').checked;
                const priorityNo = document.getElementById('prioritaire_no').checked;
                const readYes = document.getElementById('lu_yes').checked;
                const readNo = document.getElementById('lu_no').checked;

                filteredData = data.filter(item => {
                    let passesEditor = true;
                    let passesShelves = true;

                    if (editors.length > 0) {
                        passesEditor = Array.from(editors).some(editor => item.editeur === editor.value);
                    }

                    if (shelves.length > 0) {
                        passesShelves = Array.from(shelves).some(shelf => item.rangement === shelf.value);
                    }

                    return passesEditor && passesShelves &&
                           ((finishYes && item.terminer === "V") || (finishNo && item.terminer !== "V") || (!finishYes && !finishNo)) &&
                           ((finishJapYes && item.terminer_jap === "V") || (finishJapNo && item.terminer_jap !== "V") || (!finishJapYes && !finishJapNo)) &&
                           ((priorityYes && item.prioritaire === "V") || (priorityNo && item.prioritaire !== "V") || (!priorityYes && !priorityNo)) &&
                           ((readYes && item.lu === "V") || (readNo && item.lu !== "V") || (!readYes && !readNo));
                });

                renderCards();
            }

            function renderCards() {
                container.innerHTML = ''; // Clear the container
                const startIndex = (currentPage - 1) * itemsPerPage;
                const selectedData = filteredData.slice(startIndex, startIndex + itemsPerPage);
                
                selectedData.forEach(item => {
                    const card = document.createElement('div');
                    card.className = 'card_manga';
                    card.innerHTML = `<img src="${item.image_path}" alt="${item.name}">`;
                    card.addEventListener('click', () => {
                        window.location.href = '/details_manga.html?id=' + item.id; 
                    });
                    container.appendChild(card);
                });

                pageInfo.textContent = `Page ${currentPage} sur ${Math.ceil(filteredData.length / itemsPerPage)}`;
            }

            function nextPage() {
                if (currentPage * itemsPerPage < filteredData.length) {
                    currentPage++;
                    renderCards();
                }
            }

            function prevPage() {
                if (currentPage > 1) {
                    currentPage--;
                    renderCards();
                }
            }

            document.getElementById('apply_filters').addEventListener('click', applyFilters);
            document.getElementById('next_page').addEventListener('click', nextPage);
            document.getElementById('prev_page').addEventListener('click', prevPage);

            renderCards(); // Initial render
        });
});
