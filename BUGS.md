# Bugs found

Add one section per issue. Bug 1 is filled in to show the format — fix it, then write what you changed. Copy the blank template for the rest.

Keep this file in the repo and **commit it** with your fixes.

---

## Bug 1

**How to reproduce:** Open the app. The expense list says “Newest first”. The first row is Wine (7 Mar). Board game (15 Mar) is further down.

**What is wrong:** The list is showing oldest expenses first. Newest should be at the top.

**What I changed:** I fixed the expense sorting to order by date descending and normalized stored dates so reloads and filtering keep the same chronological order.

---

## Bug 2

**How to reproduce:** Add a bill where the payer is not on the split, or try a three-way equal split such as $100 between three people. You can also filter the list and then delete or edit an expense.

**What is wrong:** The balance logic was subtracting the payer’s portion even when they were not in the split, equal splits could lose a cent on rounding, and edits/deletes were being applied by filtered index instead of the actual expense id. That made the totals mismatch the real bill-sharing rules and the UI drift from the underlying record.

**What I changed:** I corrected the balance math so the full payment is counted for the payer and only the actual shares are deducted from the people in the split.

---
