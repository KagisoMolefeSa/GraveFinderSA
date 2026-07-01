function searchGrave() {

    const search = document.getElementById("searchInput").value;
    const results = document.getElementById("results");

    if (search === "") {
        results.innerHTML =
            "<p>Please enter a name or grave number.</p>";
        return;
    }

    results.innerHTML =
        "<h3>Searching for: " + search + "</h3>" +
        "<p>This will soon search the GraveFinder SA database.</p>";

}
