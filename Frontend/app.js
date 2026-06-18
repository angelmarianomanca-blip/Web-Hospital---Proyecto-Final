document.addEventListener('DOMContentLoaded', function() {
    const openModalBtn = document.getElementById('open-login');
    const closeModalBtn = document.getElementById('close-login');
    const modalOverlay = document.getElementById('login-modal');

    openModalBtn.addEventListener('click', function() {
        modalOverlay.classList.add('active');
    });

    closeModalBtn.addEventListener('click', function() {
        modalOverlay.classList.remove('active');
    });

    modalOverlay.addEventListener('click', function(event) {
        if (event.target === modalOverlay) {
            modalOverlay.classList.remove('active');
        }
    });
});