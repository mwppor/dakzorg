document.addEventListener('DOMContentLoaded', function() {
    // WhatsApp popup functionaliteit
    const popup = document.getElementById('whatsapp-popup');
    const btn = document.getElementById('whatsapp-btn');

    if (popup && btn) {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            popup.classList.toggle('active');
        });

        document.addEventListener('click', function(e) {
            if (!popup.contains(e.target) && popup.classList.contains('active')) {
                popup.classList.remove('active');
            }
        });

        const chat = document.getElementById('whatsapp-chat');
        if (chat) {
            chat.addEventListener('click', function(e) {
                e.stopPropagation();
            });
        }
    }

    // Image modal functionality
    const modal = document.getElementById('image-modal');
    const modalImage = document.getElementById('modal-image');
    const modalClose = document.querySelector('.modal-close');

    if (modal && modalImage && modalClose) {
        document.querySelectorAll('.materiaal-card img').forEach(img => {
            img.addEventListener('click', function() {
                modal.classList.add('active');
                modalImage.src = this.src;
                modalImage.alt = this.alt;
                document.body.style.overflow = 'hidden';
            });
        });

        modalClose.addEventListener('click', function() {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });

        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Google Reviews rating system
    const starsContainer = document.querySelector('.rating-stars');
    if (starsContainer) {
        starsContainer.addEventListener('click', function(e) {
            if (e.target.classList.contains('star')) {
                const rating = e.target.dataset.rating;
                showGoogleReviewPopup(rating);
            }
        });
    }
});

// WhatsApp bericht versturen functie
function sendWhatsApp() {
    const naam = document.getElementById('wa-naam').value;
    const bericht = document.getElementById('wa-bericht').value;

    if (!naam || !bericht) {
        alert('Vul alstublieft uw naam en bericht in.');
        return;
    }

    const volledigBericht = `Hallo, mijn naam is ${naam}. ${bericht}`;
    const whatsappUrl = `https://wa.me/31657844682?text=${encodeURIComponent(volledigBericht)}`;

    window.open(whatsappUrl, '_blank');

    document.getElementById('wa-naam').value = '';
    document.getElementById('wa-bericht').value = '';
    document.getElementById('whatsapp-popup').classList.remove('active');
}

// Daktype selector functionality - Fixed
function showDakInfo(type) {
    const allInfos = document.querySelectorAll('.dak-info');
    allInfos.forEach(info => info.style.display = 'none');

    const allButtons = document.querySelectorAll('.daktype-btn');
    allButtons.forEach(btn => btn.classList.remove('active'));

    const selectedInfo = document.getElementById(type + '-info');
    if (selectedInfo) {
        selectedInfo.style.display = 'block';
    }

    const selectedButton = document.querySelector(`[data-type="${type}"]`);
    if (selectedButton) {
        selectedButton.classList.add('active');
    }
}

// Google Reviews integration
function showGoogleReviewPopup(rating) {
    const popup = document.createElement('div');
    popup.className = 'google-review-popup';
    popup.innerHTML = `
        <div class="review-popup-content">
            <h3>Bedankt voor uw ${rating}-sterren beoordeling!</h3>
            <p>Wilt u een review achterlaten op Google?</p>
            <div class="review-popup-buttons">
                <button onclick="openGoogleReviews()" class="review-btn primary">Ja, review schrijven</button>
                <button onclick="closeReviewPopup()" class="review-btn secondary">Nee, bedankt</button>
            </div>
        </div>
    `;
    document.body.appendChild(popup);
    setTimeout(() => popup.classList.add('active'), 100);
}

function openGoogleReviews() {
    // Replace with your actual Google Business profile URL
    window.open('https://g.page/r/YOUR_GOOGLE_BUSINESS_ID/review', '_blank');
    closeReviewPopup();
}

function closeReviewPopup() {
    const popup = document.querySelector('.google-review-popup');
    if (popup) {
        popup.classList.remove('active');
        setTimeout(() => popup.remove(), 300);
    }
}

// Form handling
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById("form");
    const result = document.getElementById("result");

    if (form && result) {
        form.addEventListener("submit", function (e) {
            const formData = new FormData(form);
            e.preventDefault();
            var object = {};
            formData.forEach((value, key) => {
                object[key] = value;
            });
            var json = JSON.stringify(object);
            result.innerHTML = "Bericht wordt verzonden...";

            fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
                body: json
            })
            .then(async (response) => {
                let json = await response.json();
                if (response.status == 200) {
                    result.innerHTML = "Bericht succesvol verzonden!";
                    result.style.color = "green";
                } else {
                    result.innerHTML = json.message;
                    result.style.color = "red";
                }
            })
            .catch((error) => {
                console.log(error);
                result.innerHTML = "Er is iets misgegaan!";
                result.style.color = "red";
            })
            .then(function () {
                form.reset();
                setTimeout(() => {
                    result.style.display = "none";
                }, 5000);
            });
        });
    }
});
document.addEventListener('DOMContentLoaded', function () {
    const navToggle = document.createElement('button');
    navToggle.innerHTML = '&#9776;';
    navToggle.className = 'nav-toggle';
    document.querySelector('header').appendChild(navToggle);

    const navMenu = document.querySelector('.nav-menu');
    navToggle.addEventListener('click', function () {
        navMenu.classList.toggle('active');
    });
});