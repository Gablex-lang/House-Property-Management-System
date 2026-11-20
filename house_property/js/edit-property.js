document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    const errorMsg = document.getElementById('errorMsg');

    if (!id) {
        window.location.href = 'dashboard.html';
        return;
    }

    document.getElementById('property_id').value = id;
    loadProperty(id, errorMsg);

    document.getElementById('propertyForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        errorMsg.textContent = '';

        const payload = {
            id: parseInt(document.getElementById('property_id').value, 10),
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
            const res = await fetch('php/update_property.php', {
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
                errorMsg.textContent = result.message || 'Failed to update property.';
            }
        } catch (err) {
            errorMsg.textContent = 'Something went wrong. Please try again.';
        }
    });
});

async function loadProperty(id, errorMsg) {
    try {
        const res = await fetch(`php/get_property.php?id=${id}`);

        if (res.status === 401) {
            window.location.href = 'index.html';
            return;
        }

        const result = await res.json();

        if (!result.success) {
            errorMsg.textContent = result.message || 'Property not found.';
            return;
        }

        const p = result.data;
        document.getElementById('property_name').value = p.property_name;
        document.getElementById('property_type').value = p.property_type;
        document.getElementById('location').value = p.location;
        document.getElementById('price').value = p.price;
        document.getElementById('bedrooms').value = p.bedrooms;
        document.getElementById('bathrooms').value = p.bathrooms;
        document.getElementById('area').value = p.area;
        document.getElementById('status').value = p.status;
        document.getElementById('description').value = p.description;
        document.getElementById('date_listed').value = p.date_listed;
    } catch (err) {
        errorMsg.textContent = 'Failed to load property.';
    }
}
