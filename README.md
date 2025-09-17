# Render - Public Images Gallery

A simple web application for managing and displaying public images.

## Features

- Upload and display public images
- Responsive image gallery
- Image preview and deletion
- Local storage persistence
- Clean, modern interface

## Usage

1. Open `index.html` in your web browser
2. Use the upload section to add images to the public gallery
3. View images in the responsive grid layout
4. Click on images to view them in full size
5. Hover over images to delete them

## File Structure

```
/
├── index.html          # Main HTML file
├── styles.css          # CSS styling
├── script.js           # JavaScript functionality
├── public/
│   └── images/         # Directory for public images
│       └── README.md   # Documentation for images directory
└── README.md           # This file
```

## Development

This is a client-side application using vanilla HTML, CSS, and JavaScript. No build process or server is required.

### Running Locally

Simply open `index.html` in any modern web browser to start using the application.

### Features

- **Image Upload**: Drag and drop or select multiple images
- **Gallery View**: Responsive grid layout with hover effects
- **Image Preview**: Click to view full-size images
- **Persistence**: Images are saved to browser localStorage
- **Management**: Delete individual images or clear entire gallery

## Browser Compatibility

Works with all modern browsers that support:
- HTML5 File API
- localStorage
- CSS Grid
- ES6 JavaScript
