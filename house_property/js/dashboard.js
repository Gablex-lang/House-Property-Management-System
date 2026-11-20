document.addEventListener('DOMContentLoaded', () => {
    loadProperties();

    document.getElementById('logoutBtn').addEventListener('click', async () => {
        await fetch('php/logout.php');
        window.location.href = 'index.html';
    });
});

async function loadProperties() {
    const tbody = document.getElementById('propertiesBody');
    tbody.innerHTML = '<tr><td colspan="9" class="loading">Loading properties...</td></tr>';

    try {
        const res = await fetch('php/get_properties.php');

        if (res.status === 401) {
            window.location.href = 'index.html';
            return;
        }

        const result = await res.json();

        if (!result.success) {
            tbody.innerHTML = `<tr><td colspan="9" class="error">${escapeHtml(result.message)}</td></tr>`;
            return;
        }

        const properties = result.data;

        if (properties.length === 0) {
            tbody.innerHTML = '<tr><td colspan="9" class="empty">No properties found.</td></tr>';
            return;
        }

        tbody.innerHTML = properties.map(p => `
            <tr>
                <td>${p.id}</td>
                <td>${escapeHtml(p.property_name)}</td>
                <td>${escapeHtml(p.property_type)}</td>
                <td>${escapeHtml(p.location)}</td>
                <td>₱${Number(p.price).toLocaleString('en-PH', { minimumFractionDigits: 2 })}</td>
                <td>${p.bedrooms} bd / ${p.bathrooms} ba</td>
                <td>${Number(p.area).toLocaleString()} sqm</td>
                <td><span class="status status-${p.status.toLowerCase()}">${escapeHtml(p.status)}</span></td>
                <td class="actions">
                    <a href="edit-property.html?id=${p.id}" class="btn btn-small btn-edit">Edit</a>
                    <button class="btn btn-small btn-delete" data-id="${p.id}">Delete</button>
                </td>
            </tr>
        `).join('');

        document.querySelectorAll('.btn-delete').forEach(btn => {
            btn.addEventListener('click', () => deleteProperty(btn.dataset.id));
        });

    } catch (err) {
        tbody.innerHTML = '<tr><td colspan="9" class="error">Failed to load properties.</td></tr>';
    }
}

async function deleteProperty(id) {
    if (!confirm('Are you sure you want to delete this property?')) return;

    try {
        const res = await fetch('php/delete_property.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id })
        });
        const result = await res.json();

        if (result.success) {
            loadProperties();
        } else {
            alert(result.message || 'Failed to delete property.');
        }
    } catch (err) {
        alert('Something went wrong. Please try again.');
    }
}

function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str ?? '';
    return div.innerHTML;
}
