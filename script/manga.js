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
                container.innerHTML = ''; // Clear the container
                const startIndex = (currentPage - 1) * itemsPerPage;
                const selectedData = filteredData.slice(startIndex, startIndex + itemsPerPage);
                
                selectedData.forEach(item => {
                    const card = document.createElement('div');
                    card.className = 'card_manga';
                    card.innerHTML = `<img src="${item.image_path}" alt="${item.name}">`;
                    card.addEventListener('click', () => {
                        window.location.href = '/details.html?id=' + item.id; 
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

