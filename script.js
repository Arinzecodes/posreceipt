document.addEventListener("DOMContentLoaded", async () => {
    const apiUrl = "https://performance-report.staging.redpay.africa/api/v1/Reports/transaction/terminal/receipt?deviceSerial=98210627990007&virtualTerminalId=RP83NMAAFK&transactionRRN=250319111219";

    try {
        const response = await fetch(apiUrl, { headers: { 'Accept': 'application/json' } });
        const data = await response.json();

        if (data.status && data.data) {
            const transaction = data.data;
            const paymentType = transaction.paymentType ? transaction.paymentType.toLowerCase() : "unknown";

            document.getElementById("merchant-name").textContent = transaction.merchantName || "N/A";
            document.getElementById("merchant-id").textContent = transaction.merchantID || "N/A";
            document.getElementById("date-time").textContent = new Date(transaction.transactionDate).toLocaleString();
            document.getElementById("stan").textContent = transaction.stan || "N/A";
            document.getElementById("rrn").textContent = transaction.retrievalReferenceNumber || "N/A";
            document.getElementById("amount").textContent = transaction.amount.toFixed(2) || "0.00";
            document.getElementById("payment-type").textContent = transaction.paymentType || "N/A";

            // Card-related fields - only show if the payment type is card-based
            if (paymentType.includes("card")) {
                setTextOrHide("card-name", transaction.cardName);
                setTextOrHide("card-pan", transaction.cardPan);
                setTextOrHide("issuer-name", transaction.issuerName);
                setTextOrHide("exp-date", transaction.expDate);
                setTextOrHide("card-scheme", transaction.cardScheme);
            } else {
                hideElement("card-name");
                hideElement("card-pan");
                hideElement("issuer-name");
                hideElement("exp-date");
                hideElement("card-scheme");
            }

            // Generate QR Code
            new QRCode(document.getElementById("qrcode"), transaction.retrievalReferenceNumber || "N/A");
        } else {
            console.error("Invalid API Response");
        }
    } catch (error) {
        console.error("Error fetching transaction:", error);
    }
});

// Function to set text or hide element if null/empty
function setTextOrHide(elementId, value) {
    const element = document.getElementById(elementId);
    if (value && value.trim() !== "") {
        element.textContent = value;
        element.style.display = "block"; // Ensure it's visible if data exists
    } else {
        element.style.display = "none"; // Hide if value is null/empty
    }
}

// Function to completely hide an element
function hideElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.style.display = "none";
    }
}

// Function to download the receipt as a PDF
function downloadPDF() {
    const { jsPDF } = window.jspdf;

    html2canvas(document.getElementById("receipt")).then((canvas) => {
        const pdf = new jsPDF({
            orientation: "portrait",
            unit: "px",
            format: [canvas.width, canvas.height],
        });

        const imgData = canvas.toDataURL("image/png");
        pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
        pdf.save("receipt.pdf");
    });
}