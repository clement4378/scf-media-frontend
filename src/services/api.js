const API_BASE_URL = "http://localhost:8080/api";

function getToken() {
    return localStorage.getItem("token");
}

function buildHeaders(extra = {}) {
    const headers = { ...extra };
    const token = getToken();
    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }
    return headers;
}

// ---------- STANDARD JSON REQUEST ----------
export async function apiRequest(endpoint, options = {}) {
    const headers = buildHeaders({
        "Content-Type": "application/json",
        ...options.headers,
    });

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers,
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
        throw new Error(data?.message || "Something went wrong");
    }

    return data;
}

// ---------- UPLOAD SINGLE FILE ----------
export async function uploadFile(endpoint, file, fieldName = "file") {
    const formData = new FormData();
    formData.append(fieldName, file);

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: "POST",
        headers: buildHeaders(),
        body: formData,
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
        throw new Error(data?.message || "Upload failed");
    }

    return data;
}

// ---------- UPLOAD MULTIPLE FILES ----------
export async function uploadFiles(endpoint, files, fieldName = "files") {
    const formData = new FormData();
    for (const file of files) {
        formData.append(fieldName, file);
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: "POST",
        headers: buildHeaders(),
        body: formData,
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
        throw new Error(data?.message || "Bulk upload failed");
    }

    return data;
}

// ---------- DOWNLOAD FILE ----------
export async function downloadFile(endpoint, suggestedName) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: buildHeaders(),
    });

    if (!response.ok) {
        if (response.status === 204) {
            throw new Error("No files available to download");
        }
        const error = await response.json().catch(() => null);
        throw new Error(error?.message || "Download failed");
    }

    const blob = await response.blob();

    let filename = suggestedName;
    if (!filename) {
        const disposition = response.headers.get("Content-Disposition");
        const match = disposition?.match(/filename="?([^"]+)"?/);
        filename = match ? match[1] : "download";
    }

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);

    return { filename, size: blob.size };
}

// ---------- FETCH IMAGE AS BLOB URL ----------
export async function fetchImageUrl(endpoint) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: buildHeaders(),
    });

    if (!response.ok) {
        throw new Error("Failed to load image");
    }

    const blob = await response.blob();
    return window.URL.createObjectURL(blob);
}