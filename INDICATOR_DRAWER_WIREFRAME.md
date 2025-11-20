# Indicator Drawer Design - Wireframe

## Proposed Layout: Drawer with Filter Button

---

## Default State (Drawer Closed)

```
┌────────────────────────────────────────────────────────────────────────┐
│ Sidebar  │  Topbar: Macro Dashboard              [🔔] [⚙] [👤]        │
├──────────┼────────────────────────────────────────────────────────────┤
│          │  Stats Ticker: SPX 4,783 +12% | BTC 43.5K +85% | ...       │
│          ├────────────────────────────────────────────────────────────┤
│ ☰ Logo   │  Filters: [1M][3M][6M][1Y][3Y][5Y][ALL] Daily▼ Index▼     │
│          │           [📊 Indicators (3)]                              │
│ 📊 Macro ├────────────────────────────────────────────────────────────┤
│          │  ┌──────────────────────────────────────────────────────┐ │
│ 📄 10-K  │  │                                                      │ │
│          │  │                                                      │ │
│ ✨       │  │                  CHART AREA                          │ │
│ Insights │  │              (Full Width - Larger)                   │ │
│          │  │                                                      │ │
│          │  │                                                      │ │
│          │  └──────────────────────────────────────────────────────┘ │
│          │                                                            │
│          │  [🤖 AI Analysis]                                          │
└──────────┴────────────────────────────────────────────────────────────┘
```

---

## Drawer Open State

```
┌────────────────────────────────────────────────────────────────────────┐
│ Sidebar  │  Topbar: Macro Dashboard              [🔔] [⚙] [👤]        │
├──────────┼────────────────────────────────────────────────────────────┤
│          │  Stats Ticker: SPX 4,783 +12% | BTC 43.5K +85% | ...       │
│          ├────────────────────────────────────────────────────────────┤
│ ☰ Logo   │  Filters: [1M][3M][6M][1Y][3Y][5Y][ALL] Daily▼ Index▼     │
│          │           [📊 Indicators (3)]    ← Button still visible    │
│ 📊 Macro ├───────────────────────────────────┬────────────────────────┤
│          │  ┌─────────────────────────────┐ │ ┌──────────────────┐ │
│ 📄 10-K  │  │                             │ │ │ Indicators    [×]│ │
│          │  │                             │ │ ├──────────────────┤ │
│ ✨       │  │        CHART AREA           │ │ │ 🔍 Search...     │ │
│ Insights │  │     (Slides Left 320px)     │ │ │                  │ │
│          │  │                             │ │ │ Markets:         │ │
│          │  │                             │ │ │ ☑ SPX            │ │
│          │  │                             │ │ │ ☐ NASDAQ         │ │
│          │  └─────────────────────────────┘ │ │                  │ │
│          │                                  │ │ Crypto:          │ │
│          │  [🤖 AI Analysis]                │ │ ☑ BTC            │ │
│          │                                  │ │ ☑ ETH            │ │
│          │                                  │ │                  │ │
│          │    ◄─── Chart slides left ───    │ │ ← Drawer (320px) │ │
│          │                                  │ │                  │ │
└──────────┴──────────────────────────────────┴─┴──────────────────┴─┘
                                               └─────────────────────┘
                                                     Slides in →
```

---

## Alternative: Drawer with Backdrop Overlay

```
┌────────────────────────────────────────────────────────────────────────┐
│ Sidebar  │  Topbar: Macro Dashboard              [🔔] [⚙] [👤]        │
├──────────┼────────────────────────────────────────────────────────────┤
│          │  Stats Ticker: SPX 4,783 +12% | BTC 43.5K +85% | ...       │
│          ├────────────────────────────────────────────────────────────┤
│ ☰ Logo   │  Filters: [1M][3M][6M][1Y][3Y][5Y][ALL] Daily▼ Index▼     │
│          │           [📊 Indicators (3)]                              │
│ 📊 Macro ├────────────────────────────────────────────────────────────┤
│          │ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░┌──────────────────────────┐│
│ 📄 10-K  │ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│ Indicators          [×] ││
│          │ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░├──────────────────────────┤│
│ ✨       │ ░░░░BACKDROP (DARKENED)░░░░░░░│ 🔍 Search indicators...  ││
│ Insights │ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│                          ││
│          │ ░░░░(Click to close)░░░░░░░░░░│ Markets:                 ││
│          │ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│ ☑ S&P 500                ││
│          │ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│ ☐ NASDAQ                 ││
│          │ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│ ☐ Russell 2000           ││
│          │ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│                          ││
│          │ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│ Crypto:                  ││
│          │ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│ ☑ Bitcoin                ││
│          │ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│ ☑ Ethereum               ││
│          │ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│                          ││
│          │ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│ [Select All] [Clear All] ││
└──────────┴───────────────────────────────┴┴──────────────────────────┴┘
                                             └──────────────────────────┘
                                                  Drawer (360px wide)
                                                  Slides from right →
```

---

## Button Design Options

### Option A: Compact Button (Recommended)
```
Filters: [1M][3M][6M][1Y][3Y][5Y][ALL] Daily▼ Index▼  [📊 Indicators (3)]
         ─────────────────────────────────────────────  ──────────────────
         Time Range & Settings                          Indicator Button
```

### Option B: Separated with Divider
```
Filters: [1M][3M][6M][1Y][3Y][5Y][ALL] Daily▼ Index▼  │  [📊 Indicators (3)]
         ─────────────────────────────────────────────     ──────────────────
         Time Range & Settings                             Indicator Button
```

### Option C: Pill Badge Style
```
Filters: [1M][3M][6M][1Y][3Y][5Y][ALL] Daily▼ Index▼  [📊 Indicators ③]
         ─────────────────────────────────────────────  ─────────────────
         Time Range & Settings                          Badge count
```

---

## Drawer Behavior

### Opening Animation
1. User clicks "Indicators" button
2. Backdrop fades in (200ms) - optional
3. Drawer slides in from right (300ms)
4. Chart content shifts left OR backdrop covers it
5. Focus traps in drawer for accessibility

### Closing Methods
1. Click X button in drawer header
2. Click backdrop (if using overlay version)
3. Press ESC key
4. Click "Indicators" button again (toggle)

### States
- **Closed**: Full-width chart, button shows count
- **Opening**: Slide-in animation
- **Open**: Drawer visible, chart narrower or covered
- **Closing**: Slide-out animation

---

## Comparison: Push vs Overlay

### Option 1: Push (Chart Slides Left) ⭐ Recommended for Desktop

**✅ Benefits:**
- Chart still visible while selecting
- See changes in real-time
- No backdrop needed
- Professional feel

**❌ Drawbacks:**
- Chart gets narrower (may be cramped)
- More complex animation
- Less mobile-friendly

**Best for:** Desktop users who want to see chart while selecting

---

### Option 2: Overlay (Drawer Covers Chart)

**✅ Benefits:**
- Simple implementation
- Chart stays full-width underneath
- Mobile-friendly pattern
- Clear focus on task

**❌ Drawbacks:**
- Can't see chart while selecting
- Backdrop darkens content
- Feels more "modal-like"

**Best for:** Mobile users or quick selections

---

## Recommended Implementation: Hybrid Approach

### Desktop (>1024px): Push
- Chart slides left
- Drawer pushes content
- No backdrop
- Smooth transition

### Tablet/Mobile (<1024px): Overlay
- Drawer covers chart
- Dark backdrop
- Swipe to close
- Full-height drawer

---

## Technical Details

### Drawer Specifications
- **Width**: 360px (desktop), 85% screen (mobile)
- **Animation**: 300ms cubic-bezier(0.4, 0, 0.2, 1)
- **Z-index**: 40 (drawer), 30 (backdrop)
- **Shadow**: Large shadow for depth
- **Backdrop**: rgba(0, 0, 0, 0.5) if overlay

### Button Specifications
- **Height**: Same as filter buttons (h-9 or h-10)
- **Style**: Outline or ghost variant
- **Icon**: 📊 or filter icon
- **Badge**: Circle with count (1-9+)
- **Hover**: Highlight with accent color

---

## Interaction Flow

### User Journey
1. **Default state**: Chart full-width, drawer closed
2. **Want to change indicators?** → Click "Indicators (3)" button
3. **Drawer slides in** from right
4. **Search or browse** categories
5. **Select/deselect** indicators → Chart updates live
6. **Done?** → Click X or click backdrop
7. **Drawer slides out** → Chart returns to full-width

---

## Accessibility

- ✅ `role="dialog"` on drawer
- ✅ `aria-labelledby="drawer-title"`
- ✅ Focus trap when open
- ✅ ESC key closes drawer
- ✅ Focus returns to button on close
- ✅ Backdrop has `aria-hidden="true"`

---

## Mobile Considerations

### Phone (<640px)
- Drawer is 90% screen width
- Slides from bottom (easier thumb access)
- Swipe down to close
- No backdrop (feels native)

### Tablet (640px - 1024px)
- Drawer is 400px or 60% width
- Slides from right
- Light backdrop
- Tap outside to close

---

## Animation Pseudo-Code

```typescript
// Open drawer
drawerOpen = true
  → backdrop opacity: 0 → 0.5 (200ms)
  → drawer translateX: 100% → 0% (300ms)
  → content marginRight: 0 → 360px (300ms) // if push mode

// Close drawer
drawerOpen = false
  → drawer translateX: 0% → 100% (300ms)
  → backdrop opacity: 0.5 → 0 (200ms)
  → content marginRight: 360px → 0 (300ms) // if push mode
```

---

## Recommendation

**Go with: Hybrid Approach**
- Desktop: Push mode (chart slides left)
- Mobile: Overlay mode (drawer covers chart)

**Button Style: Option A (Compact)**
- Simple, clean, shows count
- Consistent with filter button styling

**Reasons:**
1. Best of both worlds (desktop + mobile)
2. Familiar pattern (many apps use this)
3. Chart visible on desktop while selecting
4. Mobile gets native-feeling overlay
5. Easy to implement with CSS/Tailwind

---

## Next Steps

1. Add `indicatorDrawerOpen` to dashboard store
2. Create `IndicatorDrawer` component
3. Update `FilterBar` to include Indicators button
4. Add slide animation with Tailwind transitions
5. Test on mobile, tablet, desktop

---

Would you like me to implement this design?
