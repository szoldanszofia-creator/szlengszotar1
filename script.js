// ================================
// Szlengszótár – működő verzió
// ================================

// 1️⃣ Változó a szavaknak
let words = [];

// 2️⃣ Szavak betöltése a JSON-ból
fetch("szlengszotar.json")
  .then(response => response.json())
  .then(data => {
    words = data;
    showDailyWord();
  });

// 3️⃣ "A nap szava" funkció
function showDailyWord() {
  if (words.length === 0) return;
  const dailyWord = words[Math.floor(Math.random() * words.length)];
  document.getElementById("daily-word").innerHTML =
    `<strong>${dailyWord.word}</strong>: ${dailyWord.definition}`;
}

// 4️⃣ Keresés gomb és Enter kezelés
document.getElementById("searchBtn").addEventListener("click", searchWord);
document.getElementById("searchInput").addEventListener("keypress", e => {
  if (e.key === "Enter") searchWord();
});

// 5️⃣ Keresés funkció
function searchWord() {
  const query = document.getElementById("searchInput").value.toLowerCase();
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "";

  const results = words.filter(w => w.word.toLowerCase().includes(query));

  if (results.length === 0) {
    resultsDiv.innerHTML = "<p>Nincs találat.</p>";
  } else {
    results.forEach(w => {
      const card = document.createElement("div");
      card.className = "result-card";
      card.innerHTML = `<h3>${w.word}</h3><p>${w.definition}</p>`;
      resultsDiv.appendChild(card);
    });
  }
}

// 6️⃣ Autocomplete (gépelés közben ajánlás)
const input = document.getElementById("searchInput");
const suggestionBox = document.createElement("div");
suggestionBox.classList.add("suggestions");
input.parentNode.appendChild(suggestionBox);

input.addEventListener("input", () => {
  const query = input.value.toLowerCase();
  suggestionBox.innerHTML = "";

  if (!query) return;

  const suggestions = words
    .filter(w => w.word.toLowerCase().startsWith(query))
    .slice(0, 5); // maximum 5 javaslat

  suggestions.forEach(s => {
    const item = document.createElement("div");
    item.classList.add("suggestion-item");
    item.textContent = s.word;
    item.addEventListener("click", () => {
      input.value = s.word;
      suggestionBox.innerHTML = "";
      searchWord();
    });
    suggestionBox.appendChild(item);
  });
});

// 7️⃣ Javaslatok eltüntetése kattintáskor
document.addEventListener("click", (e) => {
  if (!suggestionBox.contains(e.target) && e.target !== input) {
    suggestionBox.innerHTML = "";
  }
});
