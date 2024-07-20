        function submitForm() {
            const origin = document.getElementById('origin').value;
            const destination = document.getElementById('destination').value;
            const logoMapping = {
                'KLM': './static/images/KLM.png',
                'Qantas': './static/images/qantas.avif',
                'Air Canada': './static/images/Air-Canada-Logo.png',
                'United Airlines': './static/images/United_Airlines.png',
                'American Airlines': './static/images/American_Airlines.png',
                'Etihad Airways': './static/images/Etihad_Airways.jpeg',
                'Alaska Airlines': './static/images/Alaska_Airlines.png',
                'Qatar Airways': './static/images/Qatar_Airways.png',
                'LifeMiles': './static/images/lifemiles.png',
                
            };
            const form = document.getElementById('searchForm');
            const formData = new FormData(form);
            const data = {
                origin: formData.get('origin'),
                destination: formData.get('destination'),
                cabinSelection: formData.get('cabinSelection'),
                departureTimeFrom: '2024-07-09T00:00:00Z',
                departureTimeTo: '2024-10-07T00:00:00Z',
            };
    
            fetch('/search', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
            .then(response => response.json())
            .then(data => {
                const resultsDiv = document.getElementById('results');
                resultsDiv.innerHTML = '';
    
                if (data.data.length === 0) {
                    resultsDiv.innerHTML = '<p>Try another search route.</p>';
                } else {
                    data.data.forEach(flight => {
                        const flightDiv = document.createElement('div');
                        flightDiv.className = 'flight';
                        const logoUrl = logoMapping[flight.partner_program];
                        let firstMilesAndTax = '';

                        if (flight.min_first_miles !== null || flight.min_first_tax !== null) {
                            firstMilesAndTax = `<h3>${flight.min_first_miles || '0'}</h3><p>+$${flight.min_first_tax || '0'}</p>
                                                <p>Min First Miles </p>`;
                        } else {
                            firstMilesAndTax = '<h3>N/A</h3><p>Min First Miles</p>';
                        }
                        flightDiv.innerHTML = `
                            <div class="flight-header">
                            <img src="${logoUrl}" alt="${flight.partner_program} logo" class="flight-logo">
                            ${flight.partner_program}
                        </div>
                            <p>${origin} → ${destination}</p>
                            <p>2024-07-09 - 2024-10-07</p>
                            <h3> ${flight.min_economy_miles || '0'}</h3><p>+$${flight.min_economy_tax || '0'}</p>
                            <p>Min Economy Miles </p>
                            <h3>${flight.min_business_miles || '0'}</h3><p> +$${flight.min_business_tax || '0'}</p>
                            <p> Min Business Miles </p>
                            ${firstMilesAndTax}`;
                        resultsDiv.appendChild(flightDiv);
                    });
                }
            });
        }        
    