# Indicator Layout Redesign - Wireframe

## Proposed Layout: Horizontal Indicators with Toggle

---

## Option A: Collapsible Indicator Bar (Recommended)

```
┌────────────────────────────────────────────────────────────────────────┐
│ Sidebar  │  Topbar: Macro Dashboard              [🔔] [⚙] [👤]        │
├──────────┼────────────────────────────────────────────────────────────┤
│          │  Stats Ticker: SPX 4,783 +12% | BTC 43.5K +85% | ...       │
│          ├────────────────────────────────────────────────────────────┤
│          │  Filters: [1M][3M][6M][1Y][3Y][5Y][ALL] Daily▼ Index▼     │
│ ☰ Logo   │  Indicators: [▼ Show Indicators]                           │
│          ├────────────────────────────────────────────────────────────┤
│ 📊 Macro │  ┌──────────────────────────────────────────────────────┐ │
│          │  │                                                      │ │
│ 📄 10-K  │  │                  CHART AREA                          │ │
│          │  │              (Full Width - Larger)                   │ │
│ ✨       │  │                                                      │ │
│ Insights │  │                                                      │ │
│          │  └──────────────────────────────────────────────────────┘ │
│          │                                                            │
│          │  [🤖 AI Analysis]                                          │
└──────────┴────────────────────────────────────────────────────────────┘
```

**When Expanded:**

```
┌────────────────────────────────────────────────────────────────────────┐
│ Sidebar  │  Topbar: Macro Dashboard              [🔔] [⚙] [👤]        │
├──────────┼────────────────────────────────────────────────────────────┤
│          │  Stats Ticker: SPX 4,783 +12% | BTC 43.5K +85% | ...       │
│          ├────────────────────────────────────────────────────────────┤
│          │  Filters: [1M][3M][6M][1Y][3Y][5Y][ALL] Daily▼ Index▼     │
│ ☰ Logo   │  Indicators: [▲ Hide Indicators]                           │
│          │  ┌──────────────────────────────────────────────────────┐ │
│ 📊 Macro │  │ 🔍 [Search indicators...]                [Select All]│ │
│          │  │                                          [Clear All] │ │
│ 📄 10-K  │  │ Markets:  [☑ SPX]  [☐ NASDAQ]  [☐ Russell]          │ │
│          │  │ Crypto:   [☑ BTC]  [☐ ETH]  [☐ SOL]                 │ │
│ ✨       │  │ Rates:    [☐ 10Y]  [☐ FFR]  [☐ 2Y]                  │ │
│ Insights │  │ Monetary: [☑ M2]  [☐ M1]  [☐ CPI]                    │ │
│          │  │ Forex:    [☐ DXY]  [☐ EUR]  [☐ JPY]                 │ │
│          │  └──────────────────────────────────────────────────────┘ │
│          ├────────────────────────────────────────────────────────────┤
│          │  ┌──────────────────────────────────────────────────────┐ │
│          │  │                                                      │ │
│          │  │                  CHART AREA                          │ │
│          │  │              (Full Width - Larger)                   │ │
│          │  │                                                      │ │
│          │  └──────────────────────────────────────────────────────┘ │
│          │                                                            │
│          │  [🤖 AI Analysis]                                          │
└──────────┴────────────────────────────────────────────────────────────┘
```

---

## Option B: Compact Chip Style

**Collapsed:**
```
┌────────────────────────────────────────────────────────────────────────┐
│  Filters: [1M][3M][6M][1Y][3Y][5Y][ALL] Daily▼ Index▼                 │
│  Selected: [SPX ×] [BTC ×] [M2 ×]  [+ Add Indicators]                 │
├────────────────────────────────────────────────────────────────────────┤
```

**Expanded (Dropdown):**
```
┌────────────────────────────────────────────────────────────────────────┐
│  Filters: [1M][3M][6M][1Y][3Y][5Y][ALL] Daily▼ Index▼                 │
│  Selected: [SPX ×] [BTC ×] [M2 ×]  [+ Add Indicators ▼]               │
│  ┌──────────────────────────────────────────────────────────────────┐ │
│  │ 🔍 Search...                                                     │ │
│  │ Markets:  [ ] SPX  [ ] NASDAQ  [ ] Russell                       │ │
│  │ Crypto:   [ ] BTC  [ ] ETH  [ ] SOL                              │ │
│  │ Rates:    [ ] 10Y  [ ] FFR  [ ] 2Y                               │ │
│  └──────────────────────────────────────────────────────────────────┘ │
├────────────────────────────────────────────────────────────────────────┤
```

---

## Option C: Tabs + Categories

```
┌────────────────────────────────────────────────────────────────────────┐
│  Filters: [1M][3M][6M][1Y][3Y][5Y][ALL] Daily▼ Index▼ [🔧 Indicators]│
├────────────────────────────────────────────────────────────────────────┤
```

**When clicking [🔧 Indicators]:**

```
┌────────────────────────────────────────────────────────────────────────┐
│  Filters: [1M][3M][6M][1Y][3Y][5Y][ALL] Daily▼ Index▼ [🔧 Indicators ▲]│
│  ┌──────────────────────────────────────────────────────────────────┐ │
│  │ [Markets] [Crypto] [Rates] [Monetary] [Forex]   [Search...] [×] │ │
│  │ ─────────                                                        │ │
│  │ ☑ SPX (S&P 500)           • 4,783.45  +12.4%                    │ │
│  │ ☐ NASDAQ (Nasdaq 100)     • 16,234.12 +18.2%                    │ │
│  │ ☐ Russell (Russell 2000)  • 2,045.67  +8.7%                     │ │
│  └──────────────────────────────────────────────────────────────────┘ │
├────────────────────────────────────────────────────────────────────────┤
```

---

## Comparison: Benefits & Drawbacks

### **Option A: Collapsible Indicator Bar** ⭐ Recommended

**✅ Benefits:**
- Simple toggle button
- Clean when collapsed (minimal height)
- Easy to scan when expanded
- Maintains category organization
- Quick search functionality
- Familiar pattern (like VS Code sidebars)

**❌ Drawbacks:**
- Takes vertical space when open
- Pushes chart down

**Best for:** Power users who frequently change indicators

---

### **Option B: Compact Chip Style**

**✅ Benefits:**
- Very compact in both states
- Shows selected indicators as pills
- Easy to remove (click X on chip)
- Dropdown feels lightweight
- Modern UI pattern

**❌ Drawbacks:**
- Selected chips can wrap and take space
- Less room for indicator details
- Harder to see categories

**Best for:** Users who set indicators once and forget

---

### **Option C: Tabs + Categories**

**✅ Benefits:**
- Most organized
- Can show live values in selector
- Professional financial terminal look
- Familiar tab navigation

**❌ Drawbacks:**
- More complex
- Requires clicking through tabs
- Takes most vertical space

**Best for:** Large number of indicators (50+)

---

## Recommended Implementation: Option A

### **Why Option A?**
1. **Balance** - Good UX without complexity
2. **Familiar** - Common pattern users understand
3. **Flexible** - Works for 6 or 60 indicators
4. **Clean** - Minimal when collapsed
5. **Fast** - No tab switching needed

### **Visual Hierarchy:**
```
Topbar (Darkest - Most Prominent)
  ↓
Stats Ticker (Medium Dark)
  ↓
Filter Bar (Medium)
  ↓
Indicator Bar (Collapsible - Same as Filter)
  ↓
Chart (Largest Area - Focus)
  ↓
AI Analysis
```

---

## Layout Measurements

### **Collapsed State:**
- Topbar: `64px`
- Stats Ticker: `52px`
- Filter Bar: `52px`
- Indicator Toggle: `44px` (just button)
- **Total header:** `212px`
- **Chart gets:** `calc(100vh - 212px)`

### **Expanded State:**
- Topbar: `64px`
- Stats Ticker: `52px`
- Filter Bar: `52px`
- Indicator Panel: `180px` (expanded)
- **Total header:** `348px`
- **Chart gets:** `calc(100vh - 348px)`

---

## Interaction Flow

### **User Journey:**
1. **Land on page** → Indicators collapsed (clean view)
2. **See chart** with 3 default indicators
3. **Want to change?** → Click "Show Indicators"
4. **Panel expands** → Search or browse categories
5. **Select/deselect** → Chart updates immediately
6. **Done?** → Click "Hide Indicators" or just scroll down
7. **Panel collapses** → More room for chart

---

## Mobile Responsive

### **Desktop (>1024px):**
- Horizontal layout as shown
- All indicators visible when expanded

### **Tablet (768px - 1024px):**
- Same layout, slightly tighter spacing
- Indicators wrap to 2 rows if needed

### **Mobile (<768px):**
- Filter bar wraps vertically
- Indicator panel becomes full-width drawer
- Slides up from bottom
- Overlay with backdrop

---

## Implementation Notes

### **Components Needed:**
1. `IndicatorToggleBar.tsx` - The collapsible section
2. `IndicatorPicker.tsx` - The selection interface (reuse enhanced selector)
3. Update `MacroDashboard.tsx` - New layout structure

### **State Management:**
- Add `indicatorPanelOpen` to dashboard store
- Keep existing `selectedIndicators` in macro store

### **Animation:**
- Smooth expand/collapse (300ms ease)
- Chart resize transition
- Height animation on panel

---

## Keyboard Shortcuts (Future)

- `Ctrl/Cmd + I` - Toggle indicator panel
- `Ctrl/Cmd + F` - Focus search when open
- `Esc` - Close panel
- `Space` - Toggle selected indicator
- `Arrow Keys` - Navigate indicators

---

## Accessibility

- ✅ Button has `aria-expanded` state
- ✅ Panel has `aria-hidden` when collapsed
- ✅ Focus management (trap focus in panel when open)
- ✅ Screen reader announcements
- ✅ Keyboard navigable

---

## Recommendation Summary

**Go with Option A: Collapsible Indicator Bar**

**Reasons:**
1. Best balance of functionality and simplicity
2. Familiar UX pattern
3. Works well with current layout
4. Easy to implement (reuse existing components)
5. Scales from 6 to 100+ indicators
6. Keeps chart as the focus

**Next Steps:**
1. Create `IndicatorToggleBar` component
2. Move `EnhancedIndicatorSelector` logic inside
3. Update `MacroDashboard` layout
4. Add collapse/expand animation
5. Test on different screen sizes

Would you like me to implement Option A?
