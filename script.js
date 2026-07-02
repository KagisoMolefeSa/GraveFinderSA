const { createClient } = supabase;

sb_publishable_TWYTr1QwHu_mmYvzjfuW1w_pc4O7f6p

async function searchGrave() {
  const search = document.getElementById("searchInput").value.trim();
  const results = document.getElementById("results");

  if (search === "") {
    results.innerHTML = "<p>Please enter a name or grave number.</p>";
    return;
  }

  results.innerHTML = "<p>Searching...</p>";

  const { data, error } = await supabaseClient
    .from("graves")
    .select("*");

  if (error) {
    results.innerHTML =
      "<p>Error searching database: " + error.message + "</p>";
    console.error(error);
    return;
  }

  const filtered = data.filter(grave => {
    return (
      (grave.First || "").toLowerCase().includes(search.toLowerCase()) ||
      (grave.Last || "").toLowerCase().includes(search.toLowerCase()) ||
      (grave.Grave || "").toLowerCase().includes(search.toLowerCase())
    );
  });

  if (filtered.length === 0) {
    results.innerHTML = "<p>No graves found.</p>";
    return;
  }

  let html = "<h3>Search Results</h3>";

  filtered.forEach(grave => {
    html += `
      <div class="grave-card">
        <h3>${grave.First} ${grave.Last}</h3>
        <p><strong>Cemetery:</strong> ${grave.Cemetery}</p>
        <p><strong>Section:</strong> ${grave.Section}</p>
        <p><strong>Grave Number:</strong> ${grave.Grave}</p>
        <p><strong>Notes:</strong> ${grave.Notes || "None"}</p>
      </div>
    `;
  });

  results.innerHTML = html;
}

document
  .getElementById("searchButton")
  .addEventListener("click", searchGrave);
