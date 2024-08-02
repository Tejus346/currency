
import { countryList } from './codes.js';
        const drop = document.querySelectorAll(".dropdown select");
        for (let select of drop) {
            for (let code in countryList) {
                let option = document.createElement("option");
                option.innerText = code;
                option.value = code;
                if (select.name === "from" && code === "USD") {
                    option.selected = "selected";
                } else if (select.name === "to" && code === "INR") {
                    option.selected = "selected";
                }
                select.append(option);
            }
        }

        const btn = document.querySelector('button');
        if (btn) {
            btn.addEventListener('click', () => {
                const amount = document.querySelector("form input").value;
                const fromCurrency = document.querySelector(".from").value;
                const toCurrency = document.querySelector(".to").value;
                const apiKey = "5216764724108c8616ff5321";  // Replace with your API key
                const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurrency}`;

                fetch(apiUrl)
                    .then(response => response.json())
                    .then(data => {
                        if (data.result === 'success') {
                            const rate = data.conversion_rates[toCurrency];
                            const convertedAmount = (amount * rate).toFixed(2);
                            document.getElementById('result').innerText = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
                        } else {
                            document.getElementById('result').innerText = 'Error fetching exchange rate';
                        }
                    })
                    .catch(error => {
                        document.getElementById('result').innerText = 'Error: ' + error;
                    });
            });
        }