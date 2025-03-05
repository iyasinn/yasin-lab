# Minimalist Academic Website

A clean, typography-focused personal academic website inspired by Andrej Karpathy's minimalist approach.

## Design Philosophy

This website follows a research-focused, minimalist approach that prioritizes:

- **Speed & Performance**: No unnecessary animations, bloated JS frameworks, or heavy assets
- **Typography-First Design**: Clean, readable text with serif for body and sans-serif for headers
- **High Information Density**: Well-structured content optimized for research presentation
- **Academic "Lab" Aesthetic**: Simple, clean styling reminiscent of academic papers
- **Content Over Style**: Focus on communicating ideas rather than flashy design

## Key Features

- **Typography-driven**: Georgia serif for body text, system sans-serif for headers
- **Automatic Table of Contents**: For long-form content like papers and articles
- **Code Block Formatting**: With line numbers and simple syntax highlighting
- **Citation and Blockquote Styling**: Academic paper-like references
- **Print-Optimized CSS**: Papers and research content print beautifully
- **Extremely Fast**: Minimal JavaScript, no external dependencies
- **Fully Responsive**: Works well on all device sizes

## Structure

- `index.html` - Main HTML file
- `styles.css` - Main stylesheet (minimalist academic styling)
- `colors.css` - Color variables and theme definitions
- `print.css` - Print-specific styles for optimal paper printing
- `script.js` - Minimal JavaScript with academic features (TOC, code formatting)
- `assets/` - Directory for images and other media files

## Setup

1. Clone this repository
2. Open `index.html` in your web browser
3. Start customizing the content to match your personal information

## Customization

- Edit `index.html` to update your personal information, research, and publications
- Modify `styles.css` and `colors.css` if you need to adjust the styling
- Use the `toc-enabled` class on article elements to automatically generate a table of contents
- Add code blocks with `<pre><code>` tags for automatic code formatting

## Example Usage

For long-form content with a table of contents:

```html
<article class="toc-enabled">
  <div class="toc-container"></div>
  <h2>Introduction</h2>
  <p>Content here...</p>
  <h2>Methodology</h2>
  <p>Content here...</p>
  <!-- More sections -->
</article>
```

## Credits

Design inspired by academic websites like Andrej Karpathy's minimalist approach. 