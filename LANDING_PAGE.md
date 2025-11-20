# Insight Terminal - Landing Page

## Overview
Modern, responsive landing page for Insight Terminal featuring:
- Dark theme matching the application design system
- Animated gradient background effects
- Interactive mockup terminal window
- Three feature cards highlighting core functionality
- Fully responsive (desktop & mobile)

## Features

### 1. **Navigation**
- Sticky header with logo and nav links
- Mobile hamburger menu
- "Launch App" CTA button

### 2. **Hero Section**
- Gradient animated blobs background
- Interactive statistics (50+ indicators, 1000+ filings, Real-time AI)
- Mock terminal window showing chart visualization
- Primary and secondary CTAs

### 3. **Features Grid**
- **Macro Dashboard**: Economic indicators with interactive charts
- **10-K Analyzer**: SEC filing analysis with financial ratios
- **AI-Powered Insights**: Intelligent analysis combining data

### 4. **How It Works**
Three-step process:
1. Select Your Data
2. Visualize & Analyze
3. Generate Insights

### 5. **CTA Section**
Call-to-action with gradient background

### 6. **Footer**
Simple footer with branding and copyright

## Routes
- `/` - Landing page
- `/macro` - Macro Dashboard (existing)

## Components Used
- shadcn/ui components (Button, Card)
- Lucide React icons
- React Router for navigation
- Tailwind CSS for styling

## Customization

### Colors
The landing page uses your existing color scheme:
- Primary gradient: `from-blue-500 to-purple-600`
- Background: `slate-900`
- Text: `slate-100` (primary), `slate-400` (secondary)
- Borders: `slate-700`

### Animations
- Blob animation (7s infinite loop)
- Smooth hover effects on feature cards
- Scale transform on feature icons

## Next Steps

To add more pages:

1. **10-K Analyzer Page** - Create `/10k-analyzer` route
2. **Combined Insights Page** - Create `/insights` route
3. **About Page** - Create `/about` route

## Testing

The dev server is running on: **http://localhost:5177/**

### Desktop View
- Full hero layout with side-by-side content and visual
- Three-column feature grid
- Horizontal "How It Works" flow

### Mobile View
- Stacked layout
- Hamburger menu
- Touch-friendly buttons
- Responsive typography

## Mock Data

The terminal window mockup shows:
- S&P 500 index: 4,783.45 (+2.34%)
- Simple line chart visualization
- Indicator pills (SPX, BTC, +2 more)

This is all static mock data for demonstration purposes.

## File Structure

```
src/
├── components/
│   └── LandingPage.tsx       # Main landing page component
├── pages/
│   └── MacroDashboard.tsx    # Existing macro dashboard
└── App.tsx                    # Updated routing
```

## Performance

- Uses React.lazy for code splitting on MacroDashboard
- Optimized images and SVG graphics
- Tailwind JIT for minimal CSS bundle
- No external image dependencies

---

**Ready to iterate!** Let me know if you'd like to:
- Adjust colors or styling
- Add more sections
- Create the other dashboard pages
- Add animations or interactions
