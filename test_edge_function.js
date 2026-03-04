const url = "https://yyhutvpcvpachpspgmbe.supabase.co/functions/v1/notify-lead";

const body = {
    email: "test@example.com",
    agency_name: "Test Agency"
};

fetch(url, {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
})
    .then(response => response.json().then(data => ({ status: response.status, body: data })))
    .then(({ status, body }) => {
        console.log(`Status: ${status}`);
        console.log("Response:", body);
    })
    .catch(error => {
        console.error("Fetch Error:", error);
    });
