// Theme Toggle Logic
const themeToggleBtn = document.getElementById('theme-toggle');
themeToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('darkmode');
});

// Mobile Navigation Toggle
const mobileMenuBtn = document.getElementById('mobile-menu');
const navbar = document.getElementById('navbar');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    navbar.classList.toggle('active');
});

// Modal Popover Functions
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// Close modal on outside click
window.addEventListener('click', (e) => {
    const modals = document.querySelectorAll('.modal-overlay');
    modals.forEach(modal => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
});

// Buy Handler
function handleBuy() {
    const selectedLicense = document.querySelector('input[name="cafeLicense"]:checked').value;
    const priceText = selectedLicense === 'personal' ? '₦5,000' : '₦12,000';
    alert(`Proceeding to checkout for CAFÉ Template (${selectedLicense.toUpperCase()} License) — Total: ${priceText}`);
}