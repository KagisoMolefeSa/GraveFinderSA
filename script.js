const SUPABASE_URL = "https://gmahnnpwrkmzsvmyhoxw.supabase.co";
const SUPABASE_KEY = "sb_publishable_TWYTr1QwHu_mmYvzjfuW1w_pc4O7f6p";

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

async function searchGrave() {

    const search = document.getElementById("searchInput").value.trim().toLowerCase();
    const results = document.getElementById("results");

    if (!search) {
        results.innerHTML = "<p>Please enter a name.</p>";
        return;
    }

    results.innerHTML = "<p>Searching...</p>";

    const { data, error } = await supabaseClient
    .from("graves_v2")
    .select("*");

console.log("DATA:", data);
console.log("ERROR:", error);

if (error) {
    results.innerHTML = "<p>Error: " + error.message + "</p>";
    return;
}

results.innerHTML = "<pre>" + JSON.stringify(data, null, 2) + "</pre>";
return;

    if (error) {
        results.innerHTML = "<p>" + error.message + "</p>";
        console.log(error);
        return;
    }

    const filtered = data.filter(grave =>
        (grave.first_name || "").toLowerCase().includes(search) ||
        (grave.last_name || "").toLowerCase().includes(search) ||
        (grave.grave_number || "").toLowerCase().includes(search)
    );

    if (filtered.length === 0) {
        results.innerHTML = "<p>No graves found.</p>";
        return;
    }

    let html = "";

    filtered.forEach(grave => {

        html += `
        <div class="grave-card">
            <h2>${grave.first_name} ${grave.last_name}</h2>

            <p><strong>Cemetery:</strong> ${grave.cemetery}</p>

            <p><strong>Section:</strong> ${grave.section}</p>

            <p><strong>Grave Number:</strong> ${grave.grave_number}</p>

            <p><strong>Notes:</strong> ${grave.notes || "None"}</p>

        </div>
        `;

    });

    results.innerHTML = html;

}
