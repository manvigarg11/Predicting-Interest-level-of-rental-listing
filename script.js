function predictRent() {
    var location = document.getElementById("location").value;
    var bedrooms = parseInt(document.getElementById("bedrooms").value);
    var bathrooms = parseInt(document.getElementById("bathrooms").value);
    var size = parseInt(document.getElementById("size").value);

    // Simple formula for prediction (you can replace this with your own logic)
    var estimatedCostINR = (bedrooms * 5000) + (bathrooms * 3000) + (size * 10);
    var estimatedCostUSD = estimatedCostINR / 75; // Assuming 1 USD = 75 INR

    var resultHtml = `
        <h4>Estimated Cost:</h4>
        <p>In Indian Rupees (INR): ₹${estimatedCostINR}</p>
        <p>In US Dollars (USD): $${estimatedCostUSD.toFixed(2)}</p>
    `;

    document.getElementById("result").innerHTML = resultHtml;
}
