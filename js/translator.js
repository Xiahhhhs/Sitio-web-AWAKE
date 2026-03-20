async function setLanguage(lang) {
    const response = await fetch(`/languages/${lang}.json`);
    const translations = await response.json();

    document.querySelectorAll("[data-translate]").forEach(element => {
        const key = element.getAttribute("data-translate");
        if (translations[key]) {
            element.innerHTML = translations[key];
        }
    });

    localStorage.setItem("lang", lang);
}

window.onload = () => {
    const savedLang = localStorage.getItem("lang") || "es";
    setLanguage(savedLang);
};
