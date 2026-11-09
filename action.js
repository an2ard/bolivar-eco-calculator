
/* LANGUAGE TRANSLATIONS */

const translations = {

    en: {
        subtitle: "Small habits, greener future. Calculate your weekly environmental impact.",
        formTitle: "🌿 Your Environmental Habits",
        transportLabel: "How do you get to school?",
        transportPlaceholder: "Select your transportation",
        bus: "Bus",
        private: "Private car",
        shared: "Shared car",
        active: "Bicycle / Walking",
        paperLabel: "How many sheets of paper do you use daily?",
        paperPlaceholder: "Enter number of sheets",
        recyclingLabel: "What is your recycling level?",
        recyclingPlaceholder: "Select your recycling level",
        low: "Low",
        medium: "Medium",
        high: "High",
        calculateButton: "Calculate my impact 🌎",
        resultsTitle: "🌍 Your Weekly Results",
        co2Label: "Weekly CO₂ Emissions",
        co2Description: "Estimated carbon footprint per week",
        pointsLabel: "Your Eco-Points",
        pointsDescription: "Based on your environmental habits",
        printButton: "🖨️ Print / Save PDF Report",
        certificateSubtitle: "Colegio Bolívar · Environmental Impact Report",
        certificateHeading: "Your Eco-Friendly Report",
        certificateText: "This report presents your estimated weekly environmental impact.",
        certificateMessage: "Every small action makes a difference. Keep making sustainable choices!",
        certificateFooter: "Estimated results based on your reported habits.",
        footer: "Bolívar Eco-Calculator · Colegio Bolívar · Every action counts 🌱",
        validation: "Please complete all fields correctly.",
        pointsUnit: " points"
    },

    es: {
        subtitle: "Pequeños hábitos, un futuro más verde. Calcula tu impacto ambiental semanal.",
        formTitle: "🌿 Tus hábitos ambientales",
        transportLabel: "¿Cómo llegas al colegio?",
        transportPlaceholder: "Selecciona tu medio de transporte",
        bus: "Bus",
        private: "Carro privado",
        shared: "Carro compartido",
        active: "Bicicleta / Caminando",
        paperLabel: "¿Cuántas hojas de papel utilizas al día?",
        paperPlaceholder: "Ingresa la cantidad de hojas",
        recyclingLabel: "¿Cuál es tu nivel de reciclaje?",
        recyclingPlaceholder: "Selecciona tu nivel de reciclaje",
        low: "Bajo",
        medium: "Medio",
        high: "Alto",
        calculateButton: "Calcular mi impacto 🌎",
        resultsTitle: "🌍 Tus resultados semanales",
        co2Label: "Emisiones semanales de CO₂",
        co2Description: "Huella de carbono estimada por semana",
        pointsLabel: "Tus Eco-Points",
        pointsDescription: "Según tus hábitos ambientales",
        printButton: "🖨️ Imprimir / Guardar Reporte PDF",
        certificateSubtitle: "Colegio Bolívar · Reporte de impacto ambiental",
        certificateHeading: "Tu reporte ecológico",
        certificateText: "Este reporte presenta tu impacto ambiental semanal estimado.",
        certificateMessage: "¡Cada pequeña acción hace la diferencia! Sigue tomando decisiones sostenibles.",
        certificateFooter: "Resultados estimados según los hábitos reportados.",
        footer: "Bolívar Eco-Calculator · Colegio Bolívar · Cada acción cuenta 🌱",
        validation: "Por favor, completa todos los campos correctamente.",
        pointsUnit: " puntos"
    }

};


/* APPLICATION LANGUAGE */

const languageSelector = document.getElementById("language");

let currentLanguage = "en";

function changeLanguage(language) {

    currentLanguage = language;

    document.documentElement.lang = language;

    // Translate all elements with data-i18n

    document.querySelectorAll("[data-i18n]").forEach(element => {

        const key = element.getAttribute("data-i18n");

        element.textContent = translations[language][key];

    });

    // Translate input placeholders

    document.querySelectorAll("[data-placeholder]").forEach(element => {

        const key = element.getAttribute("data-placeholder");

        element.placeholder = translations[language][key];

    });

    // Update existing results when changing language

    if (hasCalculated) {
        displayResults(latestCO2, latestPoints);
    }

}

languageSelector.addEventListener("change", function() {

    changeLanguage(this.value);

});


/* ENVIRONMENTAL CALCULATOR */

const ecoForm = document.getElementById("ecoForm");

let latestCO2 = 0;
let latestPoints = 0;
let hasCalculated = false;


/* CALCULATE BUTTON */

ecoForm.addEventListener("submit", function(event) {

    event.preventDefault();

    // Get form values

    const transport = document.getElementById("transport").value;

    const paperInput = document.getElementById("paper").value;

    const paper = Number(paperInput);

    const recycling = document.getElementById("recycling").value;


    // Validate form

    if (
        !transport ||
        !recycling ||
        paperInput.trim() === "" ||
        !Number.isInteger(paper) ||
        paper < 0
    ) {

        alert(translations[currentLanguage].validation);

        return;

    }


    // Estimated transportation emissions (kg CO2 per school day)

    const transportEmissions = {

        bus: 1.2,
        private: 3.5,
        shared: 1.8,
        active: 0

    };

    // Estimated paper emissions (kg CO2 per sheet)

    const paperEmission = 0.005;


    // Calculate weekly CO2 emissions (5 school days)

    const weeklyTransportCO2 = transportEmissions[transport] * 5;

    const weeklyPaperCO2 = paper * paperEmission * 5;

    const totalCO2 = weeklyTransportCO2 + weeklyPaperCO2;


    // Calculate Eco-Points

    let ecoPoints = 0;


    // Transportation points

    const transportPoints = {

        bus: 20,
        private: 5,
        shared: 15,
        active: 30

    };

    ecoPoints += transportPoints[transport];


    // Paper consumption points

    if (paper <= 5) {

        ecoPoints += 30;

    } else if (paper <= 10) {

        ecoPoints += 20;

    } else if (paper <= 20) {

        ecoPoints += 10;

    }


    // Recycling points

    const recyclingPoints = {

        low: 5,
        medium: 15,
        high: 30

    };

    ecoPoints += recyclingPoints[recycling];


    // Save results

    latestCO2 = totalCO2;

    latestPoints = ecoPoints;

    hasCalculated = true;


    // Display results

    displayResults(latestCO2, latestPoints);

});


/* DISPLAY RESULTS */

function displayResults(co2, points) {

    const pointsUnit = translations[currentLanguage].pointsUnit;

    // Update results card

    document.getElementById("co2Result").textContent =
        co2.toFixed(2) + " kg";

    document.getElementById("pointsResult").textContent =
        points + pointsUnit;


    // Update printable certificate

    document.getElementById("certificateCO2").textContent =
        co2.toFixed(2) + " kg";

    document.getElementById("certificatePoints").textContent =
        points + pointsUnit;


    // Show results section

    document.getElementById("results").style.display = "block";

}


/* PRINT / SAVE PDF REPORT */

document.getElementById("printButton").addEventListener("click", function() {

    if (!hasCalculated) {
        return;
    }

    window.print();

});


/* INITIALIZE APPLICATION */

changeLanguage("en");
