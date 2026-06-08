# 📊 Power BI Dashboard Guide — Upper Management Reports

> [!NOTE]
> `work_reports` table is empty — all daily KPI tracking is done using `calls`, `meetings`, `leads`, and `attendance` tables directly.

---

## 🔗 STEP 1: Data Relationships (Already Done ✅)

Your model view already has these correct relationships:

| From Table | Field | To Table | Field | Status |
|---|---|---|---|---|
| `users` | `id` | `leads` | `user_id` | ✅ Done |
| `users` | `id` | `expenses` | `user_id` | ✅ Done |
| `users` | `id` | `calls` | `user_id` | ✅ Done |
| `users` | `id` | `attendance` | `user_id` | ✅ Done |
| `users` | `id` | `cases` | `user_id` | ✅ Done |
| `users` | `id` | `meetings` | `user_id` | ⚠️ Check if connected |

> [!IMPORTANT]
> Check if `meetings` is connected. If not, add `users.id → meetings.user_id` relationship.

---

## 📊 REPORT 1: Daily Activity Summary (Most Important for Management)

**What it shows**: How many calls and meetings happened each day, and new leads created

### Page Setup:
Right-click **Page 1** tab at bottom → Rename → `Daily Activity`

#### KPI Cards (Big Numbers at Top — Add 4 Cards)
**Card 1 — Total Calls:**
1. Visualizations → **"Card"** icon
2. Drag `calls → id` → **Fields** → right-click → select **Count**
3. Format → Title → `📞 Total Calls`

**Card 2 — Total Meetings:**
1. Visualizations → **"Card"**
2. Drag `meetings → id` → **Fields** → Count
3. Title: `🤝 Total Meetings`

**Card 3 — Total Leads:**
1. Visualizations → **"Card"**
2. Drag `leads → id` → **Fields** → Count
3. Title: `🎯 Total Leads`

**Card 4 — Total Cases:**
1. Visualizations → **"Card"**
2. Drag `cases → id` → **Fields** → Count
3. Title: `📁 Total Cases`

#### Chart A — Daily Calls Over Time
1. Visualizations → **"Line Chart"**
2. Fields:
   - `calls → call_date` → **X-axis**
   - `calls → id` → **Y-axis** → Count
3. Title: `Daily Calls Trend`

#### Chart B — Daily Meetings Over Time
1. Visualizations → **"Line Chart"**
2. Fields:
   - `meetings → meeting_date` → **X-axis**
   - `meetings → id` → **Y-axis** → Count
3. Title: `Daily Meetings Trend`

#### Chart C — New Leads Per Day
1. Visualizations → **"Area Chart"**
2. Fields:
   - `leads → created_at` → **X-axis** (Power BI will group by date automatically)
   - `leads → id` → **Y-axis** → Count
3. Title: `New Leads Created Per Day`

---

## 📊 REPORT 2: Team Performance Leaderboard

**What it shows**: Who is performing best — ranked by calls, meetings, leads

### Page Setup:
Click **"+"** at the bottom to add a new page → rename it `Team Performance`

#### Chart A — Calls Per Person (Horizontal Bar)
1. Visualizations → **"Clustered Bar Chart"**
2. Fields:
   - `users → name` → **Y-axis**
   - `calls → id` → **X-axis** → right-click → **Count**
3. Click `...` on chart → **Sort by Count of id → Descending**
4. Title: `🏆 Calls Leaderboard`

#### Chart B — Meetings Per Person
1. Visualizations → **"Clustered Bar Chart"**
2. Fields:
   - `users → name` → **Y-axis**
   - `meetings → id` → **X-axis** → Count
3. Sort Descending
4. Title: `🤝 Meetings Leaderboard`

#### Chart C — Leads Per Person
1. Visualizations → **"Clustered Bar Chart"**
2. Fields:
   - `users → name` → **Y-axis**
   - `leads → id` → **X-axis** → Count
3. Sort Descending
4. Title: `🎯 Leads Per Person`

#### Table — Full Team Summary
1. Visualizations → **"Table"** icon
2. Drag these fields:
   - `users → name`
   - `users → designation`
   - `calls → id` (Count) — rename column to `Calls`
   - `meetings → id` (Count) — rename to `Meetings`
   - `leads → id` (Count) — rename to `Leads`
   - `cases → id` (Count) — rename to `Cases`
3. Title: `Full Team Performance Summary`

---

## 📊 REPORT 3: Lead Pipeline Analysis

**What it shows**: Current status of all leads, where they are in the pipeline

#### Chart A — Lead Status Donut Chart
1. New page → name it `Lead Pipeline`
2. Visualizations → **"Donut Chart"**
3. Fields:
   - `leads → status` → **Legend**
   - `leads → id` → **Values** → right-click → **Count**
4. Title: `Lead Status Breakdown`

#### Chart B — Leads by Source (Bar Chart)
1. Visualizations → **"Clustered Column Chart"**
2. Fields:
   - `leads → lead_source` → **X-axis**
   - `leads → id` → **Y-axis** → Count
3. Title: `Leads by Source`

#### Chart C — Leads by Owner (Who owns most leads)
1. Visualizations → **"Treemap"**
2. Fields:
   - `leads → owner` → **Category**
   - `leads → id` → **Values** → Count
3. Title: `Leads by Owner`

#### Chart D — Expected Close Timeline
1. Visualizations → **"Line Chart"**
2. Fields:
   - `leads → expected_close` → **X-axis**
   - `leads → id` → **Y-axis** → Count
3. Title: `Expected Closings by Month`

---

## 📊 REPORT 4: Attendance Overview

**What it shows**: Who is showing up, how many hours worked

#### Chart A — Hours Worked Per Person
1. New page → `Attendance`
2. Visualizations → **"Clustered Bar Chart"**
3. Fields:
   - `users → name` → **Y-axis**
   - `attendance → hours_worked` → **X-axis** (sum)
4. Title: `Total Hours Worked`

#### Chart B — Attendance by Day (Heatmap style)
1. Visualizations → **"Matrix"**
2. Fields:
   - `attendance → date` → **Rows**
   - `users → name` → **Columns**
   - `attendance → hours_worked` → **Values**
3. Title: `Attendance Calendar`

---

## 📊 REPORT 5: Expense Report

**What it shows**: How much each person/team is spending

#### Chart A — Expenses Per Person
1. New page → `Expenses`
2. Visualizations → **"Pie Chart"**
3. Fields:
   - `users → name` → **Legend**
   - `expenses → amount` → **Values** (sum)
4. Title: `Expense Distribution by Person`

---

## 📊 REPORT 6: Management Executive Summary (First Page)

**What it shows**: One-page overview — everything at a glance

Make this **Page 1** — the first thing management sees:

| Visual | Data | Position |
|---|---|---|
| 4 KPI Cards | Count of Calls, Meetings, Leads, Cases | Top row |
| Bar Chart | Calls per person (calls → id Count by users → name) | Left |
| Donut | Lead status breakdown (leads → status) | Center |
| Table | Team summary: name, calls count, meetings count, leads count | Right |
| Line | Daily calls trend (calls → call_date vs Count) | Bottom |

---

## 🎨 STEP: Add a Date Slicer (Filter by Date Range)

Add this to **every page** so management can filter by date:

1. Visualizations → **"Slicer"** icon
2. Drag `work_reports → report_date` → **Field**
3. Click the slicer → Format → Slicer Settings → Style → **"Between"**
4. Now management can select any date range!

---

## 💾 FINAL STEP: Save & Share

1. **Save**: `File → Save As → Sales_Management_Dashboard.pbix`
2. **To share with management**:
   - If you have **Power BI Pro**: Click **"Publish"** → publish to Power BI Service online
   - Management visits `app.powerbi.com` to view live reports
   - **Without Pro**: Share the `.pbix` file directly — they open it in free Power BI Desktop

---

## 📅 Keeping Data Fresh

- Click **"Refresh"** button in Power BI Desktop anytime to pull latest data
- With Power BI Service (Pro): Set **Scheduled Refresh** → runs automatically daily

