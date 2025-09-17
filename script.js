// Public Images Gallery JavaScript

// Array to store public images
let publicImages = [];

// Load saved images from localStorage on page load
document.addEventListener('DOMContentLoaded', function() {
    loadSavedImages();
    renderGallery();
});

// Function to add images to the public gallery
function addImages() {
    const imageInput = document.getElementById('imageInput');
    const files = imageInput.files;
    
    if (files.length === 0) {
        alert('Please select at least one image file.');
        return;
    }
    
    Array.from(files).forEach(file => {
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const imageData = {
                    id: Date.now() + Math.random(),
                    name: file.name,
                    size: formatFileSize(file.size),
                    dataUrl: e.target.result,
                    dateAdded: new Date().toISOString()
                };
                
                publicImages.push(imageData);
                saveImages();
                renderGallery();
            };
            reader.readAsDataURL(file);
        }
    });
    
    // Clear the input
    imageInput.value = '';
}

// Function to render the image gallery
function renderGallery() {
    const imageGrid = document.getElementById('imageGrid');
    
    if (publicImages.length === 0) {
        imageGrid.innerHTML = '<div class="empty-gallery">No public images yet. Add some images to get started!</div>';
        return;
    }
    
    imageGrid.innerHTML = publicImages.map(image => `
        <div class="image-item" data-id="${image.id}">
            <img src="${image.dataUrl}" alt="${image.name}" onclick="viewImage('${image.id}')">
            <button class="delete-btn" onclick="deleteImage('${image.id}')" title="Delete image">×</button>
            <div class="image-info">
                <div class="image-name">${image.name}</div>
                <div class="image-size">${image.size}</div>
            </div>
        </div>
    `).join('');
}

// Function to delete an image
function deleteImage(imageId) {
    if (confirm('Are you sure you want to delete this image?')) {
        publicImages = publicImages.filter(image => image.id !== imageId);
        saveImages();
        renderGallery();
    }
}

// Function to view image in full size
function viewImage(imageId) {
    const image = publicImages.find(img => img.id === imageId);
    if (image) {
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.9);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
            cursor: pointer;
        `;
        
        const img = document.createElement('img');
        img.src = image.dataUrl;
        img.style.cssText = `
            max-width: 90%;
            max-height: 90%;
            object-fit: contain;
        `;
        
        modal.appendChild(img);
        document.body.appendChild(modal);
        
        modal.onclick = function() {
            document.body.removeChild(modal);
        };
    }
}

// Function to format file size
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Function to save images to localStorage
function saveImages() {
    try {
        localStorage.setItem('publicImages', JSON.stringify(publicImages));
    } catch (e) {
        console.warn('Could not save images to localStorage:', e);
    }
}

// Function to load saved images from localStorage
function loadSavedImages() {
    try {
        const saved = localStorage.getItem('publicImages');
        if (saved) {
            publicImages = JSON.parse(saved);
        }
    } catch (e) {
        console.warn('Could not load images from localStorage:', e);
        publicImages = [];
    }
}

// Function to export gallery as JSON
function exportGallery() {
    const dataStr = JSON.stringify(publicImages, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'public-images-gallery.json';
    link.click();
    URL.revokeObjectURL(url);
}

// Function to clear all images
function clearGallery() {
    if (confirm('Are you sure you want to clear all images? This action cannot be undone.')) {
        publicImages = [];
        saveImages();
        renderGallery();
    }
}