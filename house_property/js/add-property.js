document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('propertyForm');
    const errorMsg = document.getElementById('errorMsg');

    const dateListed = document.getElementById('date_listed');
    if (dateListed && !dateListed.value) {
        dateListed.value = new Date().toISOString().split('T')[0];
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        errorMsg.textContent = '';

        const payload = {
            property_name: document.getElementById('property_name').value.trim(),
            property_type: document.getElementById('property_type').value,
            location: document.getElementById('location').value.trim(),
            price: parseFloat(document.getElementById('price').value),
            bedrooms: parseInt(document.getElementById('bedrooms').value, 10),
            bathrooms: parseInt(document.getElementById('bathrooms').value, 10),
            area: parseFloat(document.getElementById('area').value),
            status: document.getElementById('status').value,
            description: document.getElementById('description').value.trim(),
            date_listed: document.getElementById('date_listed').value
        };

        try {
            const res = await fetch('php/add_property.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (res.status === 401) {
                window.location.href = 'index.html';
                return;
            }

            const result = await res.json();

            if (result.success) {
                window.location.href = 'dashboard.html';
            } else {
                errorMsg.textContent = result.message || 'Failed to add property.';
            }
        } catch (err) {
            errorMsg.textContent = 'Something went wrong. Please try again.';
        }
    });
});
