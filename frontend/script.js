document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("registerForm");

    form.addEventListener("submit", function (event) {
        event.preventDefault(); 
        let hasError = false;
        const inputs = form.querySelectorAll("input");

        inputs.forEach(input => {
            if (input.value.trim() === "") {
                input.classList.add("error");
                hasError = true;
            } else {
                input.classList.remove("error");
            }
        });

        if (!hasError) {
            form.submit();
        }
    });
});


document.addEventListener("DOMContentLoaded", function () {
    const resetForm = document.getElementById("resetPasswordForm");

    resetForm.addEventListener("submit", function (event) {
        event.preventDefault(); 
        const emailField = document.getElementById("email");

        if (emailField.value.trim() === "") {
            alert("Veuillez entrer une adresse email !");
            emailField.focus();
            return;
        }

        alert("Un e-mail de réinitialisation a été envoyé si cette adresse est enregistrée.");
        window.location.href = "connexion.html"; 
    });
});


document.addEventListener("DOMContentLoaded", function () {
    const offers = [
        { title: "Développeur Web Front-End", company: "TechCorp", location: "Paris", duration: "6 mois", competence: "Développement Web", date: "2025-02-23" },
        { title: "Data Analyst", company: "DataVision", location: "Lyon", duration: "4 mois", competence: "Data Analyst", date: "2025-02-20" },
        { title: "Ingénieur Réseau", company: "NetSolutions", location: "Marseille", duration: "5 mois", competence: "Réseaux", date: "2025-02-18" },
        { title: "Développeur Back-End", company: "CodeFactory", location: "Bordeaux", duration: "6 mois", competence: "Développement Web", date: "2025-02-15" }
    ];

    function getLatestOffers() {
        return offers.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 3);
    }

    function displayOffers(offers, container) {
        container.innerHTML = "";
        offers.forEach(offer => {
            const offerCard = document.createElement("div");
            offerCard.classList.add("offer-card");
            offerCard.innerHTML = `
                <h3>${offer.title}</h3>
                <p><strong>Entreprise:</strong> ${offer.company}</p>
                <p><strong>Localisation:</strong> ${offer.location}</p>
                <p><strong>Durée:</strong> ${offer.duration}</p>
                <p><strong>Date de publication:</strong> ${offer.date}</p>
                <div class="offer-actions">
                    <a href="#">Voir l'offre</a>
                    <span class="fav-icon"><i class="far fa-heart"></i></span>
                </div>
            `;
            container.appendChild(offerCard);
        });

        // Ajouter les gestionnaires d'événements pour les icônes de favoris
        const favIcons = document.querySelectorAll(".fav-icon");
        favIcons.forEach(icon => {
            icon.addEventListener("click", function () {
                this.classList.toggle("favorited");
                const offerTitle = this.closest(".offer-card").querySelector("h3").innerText;
                if (this.classList.contains("favorited")) {
                    addToFavorites(offerTitle);
                } else {
                    removeFromFavorites(offerTitle);
                }
            });
        });
    }

    function addToFavorites(offerTitle) {
        console.log(`Ajouté aux favoris: ${offerTitle}`);
    }

    function removeFromFavorites(offerTitle) {
        console.log(`Retiré des favoris: ${offerTitle}`);
    }

    // Afficher les dernières offres sur la page d'accueil
    const latestOffersContainer = document.getElementById("latest-offers-container");
    if (latestOffersContainer) {
        const latestOffers = getLatestOffers();
        displayOffers(latestOffers, latestOffersContainer);
    }

    // Afficher toutes les offres sur la page des offres
    const offersContainer = document.getElementById("offers-container");
    if (offersContainer) {
        displayOffers(offers, offersContainer);
    }
});


document.getElementById("search-btn").addEventListener("click", function () {
    const searchQuery = document.getElementById("search-input").value;
    const selectedLocation = document.getElementById("location-filter").value;
    const selectedDuration = document.getElementById("duration-filter").value;
    const selectedCompetence = document.getElementById("competence-filter").value;

    let url = `offres.html?search=${encodeURIComponent(searchQuery)}`;
    if (selectedLocation) url += `&location=${encodeURIComponent(selectedLocation)}`;
    if (selectedDuration) url += `&duration=${encodeURIComponent(selectedDuration)}`;
    if (selectedCompetence) url += `&competence=${encodeURIComponent(selectedCompetence)}`;

    window.location.href = url;
});

document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get("search");
    const selectedLocation = urlParams.get("location");
    const selectedDuration = urlParams.get("duration");
    const selectedCompetence = urlParams.get("competence");

    const offers = [
        { title: "Développeur Web Front-End", company: "TechCorp", location: "Paris", duration: "6 mois", competence: "Développement Web", date: "2025-02-23" },
        { title: "Data Analyst", company: "DataVision", location: "Lyon", duration: "4 mois", competence: "Data Analyst", date: "2025-02-20" },
        { title: "Ingénieur Réseau", company: "NetSolutions", location: "Marseille", duration: "5 mois", competence: "Réseaux", date: "2025-02-18" },
        { title: "Développeur Back-End", company: "CodeFactory", location: "Bordeaux", duration: "6 mois", competence: "Développement Web", date: "2025-02-15" }
    ];

    const offersContainer = document.getElementById("offers-container");

    function displayFilteredOffers() {
        offersContainer.innerHTML = "";
        const filteredOffers = offers.filter(offer => {
            return (
                (!searchQuery || offer.title.toLowerCase().includes(searchQuery.toLowerCase())) &&
                (!selectedLocation || offer.location === selectedLocation) &&
                (!selectedDuration || offer.duration === selectedDuration) &&
                (!selectedCompetence || offer.competence === selectedCompetence)
            );
        });

        if (filteredOffers.length === 0) {
            offersContainer.innerHTML = "<p>Aucune offre trouvée.</p>";
            return;
        }

        filteredOffers.forEach(offer => {
            const offerCard = document.createElement("div");
            offerCard.classList.add("offer-card");
            offerCard.innerHTML = `
                <h3>${offer.title}</h3>
                <p><strong>Entreprise:</strong> ${offer.company}</p>
                <p><strong>Localisation:</strong> ${offer.location}</p>
                <p><strong>Durée:</strong> ${offer.duration}</p>
                <p><strong>Date de publication:</strong> ${offer.date}</p>
                <a href="#">Voir l'offre</a>
            `;
            offersContainer.appendChild(offerCard);
        });
    }

    displayFilteredOffers();
});


document.addEventListener("DOMContentLoaded", function () {
    const favIcons = document.querySelectorAll(".fav-icon");

    favIcons.forEach(icon => {
        icon.addEventListener("click", function () {
            this.classList.toggle("favorited");
            const offerTitle = this.closest(".offer-card").querySelector("h3").innerText;
            if (this.classList.contains("favorited")) {
                addToFavorites(offerTitle);
            } else {
                removeFromFavorites(offerTitle);
            }
        });
    });

    function addToFavorites(offerTitle) {
        console.log(`Ajouté aux favoris: ${offerTitle}`);
    }

    function removeFromFavorites(offerTitle) {
        console.log(`Retiré des favoris: ${offerTitle}`);
    }
});