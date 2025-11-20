# AI Search Bar Design - Wireframe

## Proposed Layout: Multi-Functional AI Search in Top Bar

---

## Option A: Expanded Search Bar in Top Bar (Recommended)

### Default State (Collapsed)

```
┌────────────────────────────────────────────────────────────────────────┐
│ Sidebar  │  Macro Dashboard                          [🔔] [⚙] [👤]    │
├──────────┼────────────────────────────────────────────────────────────┤
│          │  [🔍 Ask AI about macro trends, data, or analysis... ]     │
│          │   ↑ Search bar (click to expand)                           │
│ ☰ Logo   ├────────────────────────────────────────────────────────────┤
│          │  Filters: [1M][3M][6M][1Y][3Y][5Y][ALL] Daily▼ Index▼     │
│ 📊 Macro │           [Stats] [Indicators (3)]                         │
│          ├────────────────────────────────────────────────────────────┤
│ 📄 10-K  │  ┌──────────────────────────────────────────────────────┐ │
│          │  │                                                      │ │
│ ✨       │  │                  CHART AREA                          │ │
│ Insights │  │                                                      │ │
│          │  └──────────────────────────────────────────────────────┘ │
└──────────┴────────────────────────────────────────────────────────────┘
```

### Expanded State (Active)

```
┌────────────────────────────────────────────────────────────────────────┐
│ Sidebar  │  Macro Dashboard                          [🔔] [⚙] [👤]    │
├──────────┼────────────────────────────────────────────────────────────┤
│          │  ┌────────────────────────────────────────────────────┐   │
│          │  │ 🔍 What's driving BTC price action?            [×] │   │
│ ☰ Logo   │  │                                                    │   │
│          │  │ Quick Actions:                                     │   │
│ 📊 Macro │  │ [✨ Generate Macro Analysis] [📊 Compare Assets]   │   │
│          │  │ [📈 Market Summary] [💡 Trend Insights]            │   │
│ 📄 10-K  │  └────────────────────────────────────────────────────┘   │
│          │                                                            │
│ ✨       │  Filters: [1M][3M][6M][1Y][3Y][5Y][ALL] Daily▼ Index▼     │
│ Insights │           [Stats] [Indicators (3)]                         │
│          ├────────────────────────────────────────────────────────────┤
│          │  ┌──────────────────────────────────────────────────────┐ │
│          │  │                  CHART AREA                          │ │
│          │  └──────────────────────────────────────────────────────┘ │
└──────────┴────────────────────────────────────────────────────────────┘
```

### With Response

```
┌────────────────────────────────────────────────────────────────────────┐
│ Sidebar  │  Macro Dashboard                          [🔔] [⚙] [👤]    │
├──────────┼────────────────────────────────────────────────────────────┤
│          │  ┌────────────────────────────────────────────────────┐   │
│          │  │ 🔍 What's driving BTC price action?            [×] │   │
│ ☰ Logo   │  │                                                    │   │
│          │  │ 🤖 AI Response:                                    │   │
│ 📊 Macro │  │ Based on current data, Bitcoin's price movement   │   │
│          │  │ is primarily driven by:                            │   │
│ 📄 10-K  │  │ 1. M2 money supply expansion (+8.1%)              │   │
│          │  │ 2. Dollar weakness (DXY -2.3%)                     │   │
│ ✨       │  │ 3. Correlation with S&P 500 tech sector...         │   │
│ Insights │  │                                    [Copy] [Share]  │   │
│          │  └────────────────────────────────────────────────────┘   │
│          │  Filters: [1M][3M][6M][1Y][3Y][5Y][ALL] Daily▼ Index▼     │
└──────────┴────────────────────────────────────────────────────────────┘
```

---

## Option B: Search Bar with Dropdown Panel

### Default State

```
┌────────────────────────────────────────────────────────────────────────┐
│ Sidebar  │  Macro Dashboard    [🔍 Ask AI... ⌘K]    [🔔] [⚙] [👤]     │
├──────────┼────────────────────────────────────────────────────────────┤
│          │  Filters: [1M][3M][6M][1Y][3Y][5Y][ALL] Daily▼ Index▼     │
│ ☰ Logo   │           [Stats] [Indicators (3)]                         │
│          ├────────────────────────────────────────────────────────────┤
│ 📊 Macro │  ┌──────────────────────────────────────────────────────┐ │
│          │  │                  CHART AREA                          │ │
│ 📄 10-K  │  └──────────────────────────────────────────────────────┘ │
└──────────┴────────────────────────────────────────────────────────────┘
```

### Dropdown Open

```
┌────────────────────────────────────────────────────────────────────────┐
│ Sidebar  │  Macro Dashboard    [🔍 Ask AI... ⌘K]    [🔔] [⚙] [👤]     │
│          │                      ┌────────────────────────────────────┐│
│          │                      │ 🔍 What's driving BTC?         [×]││
├──────────┤                      │                                    ││
│          │                      │ Suggestions:                       ││
│ ☰ Logo   │                      │ → Generate macro analysis          ││
│          │                      │ → Explain current market trends    ││
│ 📊 Macro │                      │ → Compare BTC vs SPX correlation   ││
│          │                      │ → What's affecting yields?         ││
│ 📄 10-K  │                      └────────────────────────────────────┘│
│          │  Filters: [1M][3M][6M][1Y][3Y][5Y][ALL] Daily▼ Index▼     │
│ ✨       │           [Stats] [Indicators (3)]                         │
│ Insights ├────────────────────────────────────────────────────────────┤
│          │  ┌──────────────────────────────────────────────────────┐ │
└──────────┴──┴──────────────────────────────────────────────────────┴─┘
```

---

## Option C: Modal/Dialog Style

### Trigger in Top Bar

```
┌────────────────────────────────────────────────────────────────────────┐
│ Sidebar  │  Macro Dashboard  [✨ Ask AI]            [🔔] [⚙] [👤]     │
├──────────┼────────────────────────────────────────────────────────────┤
│          │  Filters: [1M][3M][6M][1Y][3Y][5Y][ALL] Daily▼ Index▼     │
└──────────┴────────────────────────────────────────────────────────────┘
```

### Modal Open (Centered)

```
┌────────────────────────────────────────────────────────────────────────┐
│ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │
│ ░░░░░░░░┌──────────────────────────────────────────────┐░░░░░░░░░░░░ │
│ ░░░░░░░░│ 🤖 AI Assistant                          [×] │░░░░░░░░░░░░ │
│ ░░░░░░░░├──────────────────────────────────────────────┤░░░░░░░░░░░░ │
│ ░░░░░░░░│ 🔍 Ask me anything about macro data...       │░░░░░░░░░░░░ │
│ ░░░░░░░░│ ─────────────────────────────────────────── │░░░░░░░░░░░░ │
│ ░░░░░░░░│                                              │░░░░░░░░░░░░ │
│ ░░░░░░░░│ Quick Actions:                               │░░░░░░░░░░░░ │
│ ░░░░░░░░│ [✨ Generate Macro Analysis]                 │░░░░░░░░░░░░ │
│ ░░░░░░░░│ [📊 Compare Selected Indicators]             │░░░░░░░░░░░░ │
│ ░░░░░░░░│ [📈 Market Summary]                          │░░░░░░░░░░░░ │
│ ░░░░░░░░│ [💡 Identify Trends]                         │░░░░░░░░░░░░ │
│ ░░░░░░░░│                                              │░░░░░░░░░░░░ │
│ ░░░░░░░░│ Recent Questions:                            │░░░░░░░░░░░░ │
│ ░░░░░░░░│ • What's driving yields?                     │░░░░░░░░░░░░ │
│ ░░░░░░░░│ • BTC vs SPX correlation                     │░░░░░░░░░░░░ │
│ ░░░░░░░░└──────────────────────────────────────────────┘░░░░░░░░░░░░ │
│ ░░░░░░░░░░░░░░BACKDROP (Click to close)░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │
└────────────────────────────────────────────────────────────────────────┘
```

---

## Option D: Command Palette Style (⌘K)

### Trigger

```
┌────────────────────────────────────────────────────────────────────────┐
│ Sidebar  │  Macro Dashboard    [⌘K]                 [🔔] [⚙] [👤]     │
└──────────┴────────────────────────────────────────────────────────────┘
```

### Palette Open (Top-Center Overlay)

```
┌────────────────────────────────────────────────────────────────────────┐
│ Sidebar  │  ┌────────────────────────────────────────────┐            │
├──────────┤  │ 🔍 Type a command or question...      [esc]│            │
│          │  ├────────────────────────────────────────────┤            │
│ ☰ Logo   │  │ 🤖 AI Actions                              │            │
│          │  │ → ✨ Generate macro analysis               │            │
│ 📊 Macro │  │ → 💬 Ask about market trends               │            │
│          │  │ → 📊 Compare indicators                    │            │
│ 📄 10-K  │  │                                            │            │
│          │  │ 🎯 Quick Actions                           │            │
│ ✨       │  │ → Add indicator                            │            │
│ Insights │  │ → Change time range                        │            │
│          │  │ → Export chart                             │            │
│          │  └────────────────────────────────────────────┘            │
└──────────┴────────────────────────────────────────────────────────────┘
```

---

## Comparison: Pros & Cons

### Option A: Expanded Search Bar ⭐ Recommended

**✅ Pros:**
- Always visible - discoverable
- Natural flow from topbar to content
- Quick actions immediately accessible
- Response shows inline (no context switch)
- Clean, modern pattern
- Works well on desktop

**❌ Cons:**
- Takes vertical space when expanded
- Pushes content down
- May feel cramped on mobile

**Best for:** Primary AI interaction, frequent use

---

### Option B: Search Bar with Dropdown

**✅ Pros:**
- Compact in default state
- Familiar pattern (like search suggestions)
- Doesn't push content down as much
- Good for keyboard shortcuts (⌘K)

**❌ Cons:**
- Dropdown may cover content
- Less space for responses
- Need to scroll for long answers

**Best for:** Quick questions, suggestions

---

### Option C: Modal/Dialog Style

**✅ Pros:**
- Full focus on AI interaction
- Plenty of space for responses
- Can show history, examples
- Professional, deliberate feel
- Mobile-friendly

**❌ Cons:**
- Blocks view of chart
- Extra click to open/close
- Feels more "heavy"
- Takes user out of flow

**Best for:** Deep analysis, complex queries

---

### Option D: Command Palette (⌘K)

**✅ Pros:**
- Power user pattern
- Fast keyboard access
- Multi-purpose (AI + actions)
- Feels modern/premium
- Doesn't disrupt layout

**❌ Cons:**
- Less discoverable (hidden)
- Requires keyboard shortcut knowledge
- May be unfamiliar to some users

**Best for:** Power users, keyboard-first workflows

---

## Recommended Implementation: Option A + Elements of D

**Why Hybrid?**
- Option A for discoverability and primary access
- Add ⌘K shortcut for power users
- Quick action buttons for common tasks
- Inline responses keep context

### Key Features

#### 1. Search Bar Location
- **Desktop:** Full-width bar below topbar title
- **Mobile:** Collapses to icon, expands as overlay

#### 2. States

**Default (Collapsed):**
```
[🔍 Ask AI about macro trends, data, or analysis...]
```
- Placeholder text suggests use cases
- Click to expand
- ⌘K keyboard shortcut

**Focused (Expanded):**
```
┌────────────────────────────────────────────┐
│ 🔍 [Input field with typing...]        [×]│
│                                            │
│ Quick Actions:                             │
│ [✨ Macro Analysis] [📊 Compare] [💡 Trends]│
└────────────────────────────────────────────┘
```
- Shows quick action buttons
- Active input field
- Close button (X)

**Loading:**
```
┌────────────────────────────────────────────┐
│ 🔍 What's driving BTC?                  [×]│
│                                            │
│ 🤖 Analyzing... ⚪⚪⚪                       │
└────────────────────────────────────────────┘
```
- Loading spinner
- "Analyzing..." text

**Response:**
```
┌────────────────────────────────────────────┐
│ 🔍 What's driving BTC?                  [×]│
│                                            │
│ 🤖 AI Response:                            │
│ Based on current indicators (SPX, BTC, M2),│
│ Bitcoin's price action is primarily...     │
│                                            │
│ Key drivers:                               │
│ • M2 expansion (+8.1%)                     │
│ • Dollar weakness (DXY -2.3%)              │
│ • Risk-on sentiment correlation            │
│                                            │
│ [Copy] [Share] [Ask Follow-up]             │
└────────────────────────────────────────────┘
```
- Formatted response
- Action buttons
- Follow-up option

#### 3. Quick Actions

**Macro Analysis:**
- Uses current selected indicators
- Analyzes timeframe from filters
- Same as old "Generate Macro Analysis"

**Compare Assets:**
- Compares selected indicators
- Shows correlations, divergences

**Market Summary:**
- Overview of all available data
- Trend direction, volatility

**Custom Question:**
- Free-form text input
- General AI assistant

#### 4. Functionality

**Contextual Awareness:**
- Knows which indicators are selected
- Knows current time range
- Knows normalization mode
- Uses chart data in responses

**Multi-turn Conversation:**
- Can ask follow-up questions
- Maintains context
- Shows conversation history

**Example Queries:**
- "Why is BTC up 85%?"
- "How does M2 affect SPX?"
- "What's the correlation between selected indicators?"
- "Summarize current macro environment"
- "Is now a good time to buy?"

---

## Technical Implementation Notes

### Component Structure
```
AISearchBar/
├── AISearchBar.tsx          (Main component)
├── SearchInput.tsx           (Input field)
├── QuickActions.tsx          (Action buttons)
├── AIResponse.tsx            (Response display)
└── hooks/
    ├── useAIChat.ts          (Chat logic)
    └── useSearchShortcut.ts  (⌘K handler)
```

### State Management
```typescript
interface AISearchState {
  isOpen: boolean;
  query: string;
  isLoading: boolean;
  response: string | null;
  conversationHistory: Message[];

  toggleSearch: () => void;
  submitQuery: (query: string) => Promise<void>;
  clearResponse: () => void;
}
```

### API Integration
```typescript
POST /api/ai/chat
{
  query: "What's driving BTC?",
  context: {
    selectedIndicators: ["BTC", "SPX", "M2"],
    timeRange: "1Y",
    normalization: "index",
    chartData: [...] // Optional
  }
}
```

---

## Layout Measurements

### Collapsed State
- Height: `52px`
- Position: Below topbar
- Width: `calc(100% - 48px)` (padding)

### Expanded State
- Max Height: `400px`
- Scrollable if content exceeds
- Smooth transition: `300ms ease-in-out`

### Mobile Responsive
- **<768px:** Full-screen overlay
- **768px-1024px:** 80% width, centered
- **>1024px:** Full width in topbar

---

## Animation Flow

1. **Click search bar**
   - Expands vertically (52px → auto)
   - Quick actions fade in (200ms delay)
   - Input gets focus

2. **Submit query**
   - Quick actions fade out
   - Loading spinner appears
   - Response fades in when ready

3. **Close**
   - Response fades out
   - Bar contracts to default
   - Chart slides back up

---

## Keyboard Shortcuts

- `⌘K` / `Ctrl+K` - Open search
- `Esc` - Close search
- `Enter` - Submit query
- `↑↓` - Navigate quick actions
- `Tab` - Focus next action

---

## Accessibility

- ✅ `role="search"` on container
- ✅ `aria-expanded` state on bar
- ✅ Focus trap when open
- ✅ Screen reader announcements
- ✅ Keyboard navigation
- ✅ High contrast mode support

---

## Sample Quick Actions

### Macro Analysis (Primary)
```
Icon: ✨
Action: Generate comprehensive macro analysis
API: /api/ai/macro
Context: All selected indicators, timeframe
```

### Compare Indicators
```
Icon: 📊
Action: Compare 2+ selected indicators
API: /api/ai/compare
Context: Selected indicators only
```

### Market Summary
```
Icon: 📈
Action: Overview of all market data
API: /api/ai/summary
Context: All available indicators
```

### Trend Analysis
```
Icon: 💡
Action: Identify key trends and patterns
API: /api/ai/trends
Context: Chart data, selected indicators
```

---

## Recommendation Summary

**Go with: Option A (Expanded Search Bar) with ⌘K shortcut**

**Reasons:**
1. **Discoverable** - Always visible, hints at functionality
2. **Contextual** - Shows responses inline with chart
3. **Fast** - Quick actions for common tasks
4. **Flexible** - Custom questions + presets
5. **Modern** - Clean, familiar pattern
6. **Power user friendly** - ⌘K for keyboard access

**Implementation Priority:**
1. ✅ Create AISearchBar component
2. ✅ Add to topbar below title
3. ✅ Implement expand/collapse animation
4. ✅ Add quick action buttons
5. ✅ Connect to AI API endpoint
6. ✅ Add ⌘K keyboard shortcut
7. ✅ Remove old AIAnalysisCard from bottom

---

Would you like me to implement Option A with the ⌘K shortcut?
