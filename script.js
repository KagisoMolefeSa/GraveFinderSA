const { createClient } = supabase;

const supabaseClient = createClient(
    "https://gmahnnpwrkmzsvmyhoxw.supabase.co",
    "sb_publishable_TWYTr1QwHu_mmYvzjfuW1w_pc4O7f6p"
);

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
        .select("*")
        .or(`name.ilike.%${search}%,grave_number.ilike.%${search}%`);

    if (error) {
        results.innerHTML =
            "<p>Error searching database: " + error.message + "</p>";
        return;
    }

    if (!data || data.length === 0) {
        results.innerHTML =
            "<p>No graves found matching your search.</p>";
        return;
    }

    let html = "<h3>Search Results</h3>";

    data.forEach(grave => {
        html += `
            <div class="grave-card">
                <h4>${grave.name}</h4>
                <p><strong>Grave Number:</strong> ${grave.grave_number}</p>
                <p><strong>Cemetery:</strong> ${grave.cemetery}</p>
            </div>
        `;
    });

    results.innerHTML = html;
}
