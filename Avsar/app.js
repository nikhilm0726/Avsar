let globalData = []; // Store data so we can filter it

    async function initApp() {
        try {
            const response = await fetch('./data/localities.json');
            globalData = await response.json();
            
            const selector = document.getElementById('locality-selector');
            
            // Populate the dropdown with the 20 localities
            globalData.forEach((locality, index) => {
                const option = document.createElement('option');
                option.value = index; // Use the array index as the value
                option.text = `${locality.locality_name_en} (${locality.locality_name_hi})`;
                selector.appendChild(option);
            });

            // Listen for when the user changes the dropdown
            selector.addEventListener('change', (event) => {
                const selectedIndex = event.target.value;
                if (selectedIndex !== "") {
                    displayServices(globalData[selectedIndex]);
                } else {
                    document.getElementById('app-content').innerHTML = "<p style='text-align:center;'>Please select a locality.</p>";
                }
            });

        } catch (error) {
            console.error(error);
            document.getElementById('app-content').innerHTML = "Failed to load data. Are you using Live Server?";
        }
    }

    initApp();