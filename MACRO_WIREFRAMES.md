# Macro Dashboard - Wireframe Mockups

## Current State Analysis

**Existing Components:**
- DashboardLayout (Sidebar navigation)
- FilterBar (Time range, Frequency, Normalization)
- SummaryCards (4 stat cards)
- MacroChart (Main chart - 2/3 width)
- IndicatorSelector (Sidebar - 1/3 width)
- AIAnalysisCard (Bottom section)

---

## Option A: "Financial Terminal" (Recommended)
**Dense, data-rich layout inspired by Bloomberg Terminal**

```
┌────────────────────────────────────────────────────────────────────────────┐
│ ☰  Insight Terminal              Macro Dashboard           [Profile] [⚙]  │
├───┬────────────────────────────────────────────────────────────────────────┤
│   │ ┌──────────────────────────────────────────────────────────────────┐  │
│ 📊│ │  📅 1M 3M 6M [1Y] 3Y 5Y ALL  📊 Daily ▼  📈 Index (100=start) ▼ │  │
│ M │ └──────────────────────────────────────────────────────────────────┘  │
│ a │                                                                         │
│ c │ ┌──────┬──────┬──────┬──────┬──────┬──────┐                          │
│ r │ │ SPX  │ BTC  │ ETH  │ M2   │ DXY  │ 10Y  │  Quick Stats             │
│ o │ │4,783 │43.5K │2,450 │21.2T │101.2 │4.2%  │                          │
│   │ │+12%↑ │+85%↑ │+45%↑ │+8%↑  │-2%↓  │-5%↓  │                          │
│ 📄│ └──────┴──────┴──────┴──────┴──────┴──────┘                          │
│ 1 │                                                                         │
│ 0 │ ┌────────────────────────────────────────────┬──────────────────────┐ │
│ - │ │  Main Chart Area                           │  Indicator Panel     │ │
│ K │ │                                            │                      │ │
│   │ │  ┌────────────────────────────────┐       │  Search: [______]    │ │
│ ✨│ │  │         LINE CHART             │       │                      │ │
│ I │ │  │                                │       │  Categories:         │ │
│ n │ │  │    ╱──╲    ╱──╲               │       │  ▼ Markets (3)       │ │
│ s │ │  │   ╱    ╲  ╱    ╲              │       │    ☑ SPX            │ │
│ i │ │  │  ╱      ╲╱      ╲             │       │    ☑ NASDAQ         │ │
│ g │ │  │                                │       │    ☐ Russell        │ │
│ h │ │  │  [SPX] [BTC] [ETH]            │       │  ▼ Crypto (6)        │ │
│ t │ │  │                                │       │    ☑ BTC            │ │
│ s │ │  └────────────────────────────────┘       │    ☐ ETH            │ │
│   │ │                                            │    ☐ SOL            │ │
│   │ │  View: [Line] Area Candle Volume          │  ▼ Rates (4)        │ │
│   │ │  Tools: [Crosshair] Compare Forecast      │    ☐ 10Y            │ │
│   │ │                                            │    ☐ FFR            │ │
│   │ ├────────────────────────────────────────────┤                      │ │
│   │ │  📊 Technical Indicators                   │  [Add Custom +]      │ │
│   │ │  ┌──────────┬──────────┬──────────┐       │                      │ │
│   │ │  │ SMA(50)  │ RSI      │ MACD     │       │  Watchlists:         │ │
│   │ │  │ 4,650    │ 68.2     │ +15.3    │       │  • Tech Sector       │ │
│   │ │  │ Bullish  │ Neutral  │ Buy      │       │  • Macro Overview    │ │
│   │ │  └──────────┴──────────┴──────────┘       │  • Crypto Markets    │ │
│   │ └────────────────────────────────────────────┴──────────────────────┘ │
│   │                                                                         │
│   │ ┌──────────────────────────────────────────────────────────────────┐  │
│   │ │ 🤖 AI Analysis                                [Generate] [Export] │  │
│   │ │                                                                    │  │
│   │ │ "Current market conditions show strong upward momentum..."        │  │
│   │ └──────────────────────────────────────────────────────────────────┘  │
└───┴────────────────────────────────────────────────────────────────────────┘
```

**Features:**
- Horizontal stat ticker at top (all indicators visible)
- Larger chart area with technical tools
- Collapsible categories in indicator panel
- Search functionality
- Watchlist presets
- Technical indicators section below chart

---

## Option B: "Clean & Minimal"
**Card-based, spacious layout with focus on clarity**

```
┌────────────────────────────────────────────────────────────────────────────┐
│ ☰  Insight Terminal                                        [Profile] [⚙]  │
├───┬────────────────────────────────────────────────────────────────────────┤
│   │                                                                         │
│ 📊│  Macro Dashboard                                                       │
│ M │  Track and analyze macroeconomic indicators                           │
│ a │                                                                         │
│ c │  ┌──────────────────────────────────────────────────────────────────┐ │
│ r │  │  Time: [1Y]  Frequency: [Daily ▼]  View: [Index (100) ▼]        │ │
│ o │  └──────────────────────────────────────────────────────────────────┘ │
│   │                                                                         │
│ 📄│  ┌─────────────┬─────────────┬─────────────┬─────────────┐          │
│ 1 │  │ S&P 500     │ Bitcoin     │ M2 Supply   │ Dollar Idx  │          │
│ 0 │  │ 4,783.45    │ $43,521     │ $21.2T      │ 101.23      │          │
│ - │  │ +12.4% ↑    │ +85.2% ↑    │ +8.1% ↑     │ -2.3% ↓     │          │
│ K │  └─────────────┴─────────────┴─────────────┴─────────────┘          │
│   │                                                                         │
│ ✨│  ┌──────────────────────────────────────────────────────────────────┐ │
│ I │  │                       Chart View                                 │ │
│ n │  │                                                                  │ │
│ s │  │    ┌────────────────────────────────────────────────┐           │ │
│ i │  │    │                                                │           │ │
│ g │  │    │          Chart visualization here              │           │ │
│ h │  │    │                                                │           │ │
│ t │  │    │                                                │           │ │
│ s │  │    └────────────────────────────────────────────────┘           │ │
│   │  │                                                                  │ │
│   │  │    Selected: [SPX] [BTC] [x]  [Add Indicator +]                │ │
│   │  └──────────────────────────────────────────────────────────────────┘ │
│   │                                                                         │
│   │  ┌────────────────────────┬────────────────────────┐                  │
│   │  │  Available Indicators  │  🤖 AI Insights       │                  │
│   │  │                        │                        │                  │
│   │  │  Markets               │  [Generate Analysis]   │                  │
│   │  │  • SPX ✓               │                        │                  │
│   │  │  • NASDAQ              │  Latest insight:       │                  │
│   │  │  • Russell 2000        │  "Market momentum..."  │                  │
│   │  │                        │                        │                  │
│   │  │  Crypto                │                        │                  │
│   │  │  • BTC ✓               │                        │                  │
│   │  │  • ETH                 │                        │                  │
│   │  └────────────────────────┴────────────────────────┘                  │
└───┴────────────────────────────────────────────────────────────────────────┘
```

**Features:**
- Large hero header with subtitle
- Prominent stat cards
- Full-width chart
- Pill-style selected indicators
- Side-by-side indicators/AI sections
- More whitespace, cleaner design

---

## Option C: "Split View Dashboard"
**Dual-pane layout for comparing multiple charts**

```
┌────────────────────────────────────────────────────────────────────────────┐
│ ☰  Insight Terminal              Macro Dashboard           [Profile] [⚙]  │
├───┬────────────────────────────────────────────────────────────────────────┤
│   │ ┌──────────────────────────────────────────────────────────────────┐  │
│ 📊│ │ 📅 [1Y]  📊 [Daily▼]  📈 [Index▼]     Views: [Single] Split Grid │  │
│ M │ └──────────────────────────────────────────────────────────────────┘  │
│ a │                                                                         │
│ c │ ┌────────────┬────────────┬────────────┬────────────┐                 │
│ r │ │ SPX 4,783  │ BTC 43.5K  │ M2 21.2T   │ DXY 101.2  │                 │
│ o │ │ +12% ↑     │ +85% ↑     │ +8% ↑      │ -2% ↓      │                 │
│   │ └────────────┴────────────┴────────────┴────────────┘                 │
│ 📄│                                                                         │
│ 1 │ ┌───────────────────────────────┬───────────────────────────────────┐ │
│ 0 │ │  Primary Chart                │  Secondary Chart                  │ │
│ - │ │  SPX + BTC                    │  M2 + DXY                        │ │
│ K │ │  ┌─────────────────────────┐  │  ┌─────────────────────────┐    │ │
│   │ │  │                         │  │  │                         │    │ │
│ ✨│ │  │    Chart Area           │  │  │    Chart Area           │    │ │
│ I │ │  │                         │  │  │                         │    │ │
│ n │ │  └─────────────────────────┘  │  └─────────────────────────┘    │ │
│ s │ │  [SPX] [BTC]                  │  [M2] [DXY]                      │ │
│ i │ └───────────────────────────────┴───────────────────────────────────┘ │
│ g │                                                                         │
│ h │ ┌────────────────────────────────────────────────────────────────────┐│
│ t │ │  Correlation Matrix         │  AI Analysis                        ││
│ s │ │                              │                                     ││
│   │ │       SPX   BTC   M2   DXY  │  [Generate Comparative Analysis]   ││
│   │ │  SPX  1.00  0.65 -0.20 -0.45│                                     ││
│   │ │  BTC  0.65  1.00 -0.10 -0.30│  "Comparing indicators shows..."   ││
│   │ │  M2  -0.20 -0.10  1.00  0.60│                                     ││
│   │ │  DXY -0.45 -0.30  0.60  1.00│                                     ││
│   │ └────────────────────────────────────────────────────────────────────┘│
└───┴────────────────────────────────────────────────────────────────────────┘
```

**Features:**
- Side-by-side chart comparison
- Correlation matrix for selected indicators
- View switcher (Single/Split/Grid)
- Comparative AI analysis
- Perfect for analyzing relationships

---

## Option D: "Tabbed Interface"
**Organized by analysis type with tabbed navigation**

```
┌────────────────────────────────────────────────────────────────────────────┐
│ ☰  Insight Terminal              Macro Dashboard           [Profile] [⚙]  │
├───┬────────────────────────────────────────────────────────────────────────┤
│   │                                                                         │
│ 📊│  [Overview] [Charts] [Technical] [Correlations] [AI Analysis]         │
│ M │  ══════════                                                            │
│ a │                                                                         │
│ c │  ┌──────────────────────────────────────────────────────────────────┐ │
│ r │  │ Quick Stats                                                       │ │
│ o │  │ ┌──────────┬──────────┬──────────┬──────────┬──────────┐        │ │
│   │  │ │ SPX      │ BTC      │ ETH      │ M2       │ DXY      │        │ │
│ 📄│  │ │ 4,783    │ 43.5K    │ 2,450    │ 21.2T    │ 101.2    │        │ │
│ 1 │  │ │ +12% ↑   │ +85% ↑   │ +45% ↑   │ +8% ↑    │ -2% ↓    │        │ │
│ 0 │  │ └──────────┴──────────┴──────────┴──────────┴──────────┘        │ │
│ - │  └──────────────────────────────────────────────────────────────────┘ │
│ K │                                                                         │
│   │  ┌──────────────────────────────────────────────────────────────────┐ │
│ ✨│  │ Market Overview                                                  │ │
│ I │  │                                                                  │ │
│ n │  │  Top Gainers            Top Losers           Market Breadth     │ │
│ s │  │  • BTC  +85.2%          • DXY -2.3%          Advance/Decline    │ │
│ i │  │  • ETH  +45.1%          • 10Y -5.1%          ▓▓▓▓▓▓░░░░ 60/40  │ │
│ g │  │  • SPX  +12.4%                               Bull/Bear Ratio    │ │
│ h │  │                                              ▓▓▓▓▓▓▓░░░ 70/30   │ │
│ t │  └──────────────────────────────────────────────────────────────────┘ │
│ s │                                                                         │
│   │  ┌─────────────────────────────┬──────────────────────────────────┐  │
│   │  │ Recent Updates              │  Quick Actions                   │  │
│   │  │ • SPX hit new high          │  • Create Watchlist              │  │
│   │  │ • BTC volatility increased  │  • Set Price Alerts              │  │
│   │  │ • M2 data updated           │  • Export Data                   │  │
│   │  └─────────────────────────────┴──────────────────────────────────┘  │
└───┴────────────────────────────────────────────────────────────────────────┘
```

**Features:**
- Tab-based navigation (Overview, Charts, Technical, etc.)
- Dashboard-style overview tab
- Top gainers/losers
- Market breadth indicators
- Activity feed
- Quick actions panel

---

## Recommended Features to Add

### High Priority
1. **Search Bar** - Quick indicator search
2. **Presets/Watchlists** - Save favorite indicator combinations
3. **Export** - CSV/PNG export functionality
4. **Date Range Picker** - Custom date selection
5. **Comparison Mode** - Side-by-side indicator comparison

### Medium Priority
6. **Technical Indicators** - RSI, MACD, SMA overlays
7. **Annotations** - Draw on charts, add notes
8. **Alerts** - Price/threshold notifications
9. **Correlation Matrix** - Visual correlation heatmap
10. **News Feed** - Related economic news

### Nice to Have
11. **Dark/Light Mode Toggle**
12. **Chart Templates** - Pre-configured views
13. **Keyboard Shortcuts**
14. **Collaborative Features** - Share views
15. **Mobile App** - Companion mobile view

---

## My Recommendation

**Go with Option A: "Financial Terminal"**

**Why:**
1. Most data-dense without feeling cluttered
2. Professional/terminal aesthetic matches your brand
3. Horizontal stats ticker is more efficient than cards
4. Better use of screen real estate
5. Easily add technical analysis features later
6. Familiar to financial professionals

**Key Improvements over Current:**
- Move stats to horizontal ticker (saves vertical space)
- Add search to indicator panel
- Group indicators by category with expand/collapse
- Add technical indicators section
- Add watchlist/preset functionality
- Keep chart as primary focus

Would you like me to implement Option A, or would you prefer a different option?
