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

## Bug 3

**How to reproduce:** Open the app and choose a payer from the “Paid by” filter. The list does not narrow to that person even though the filter control is active.

**What is wrong:** The filter value from the dropdown was stored as a string, but the expense data stores payer IDs as numbers. Since the comparison was `string !== number`, every payer filter looked like it matched nothing.

**What I changed:** I normalized the filter value to a numeric ID before comparing it against each expense’s `paidBy` value so the payer filter works correctly again.

---

## Bug 4

**How to reproduce:** Add an expense, choose `Custom %`, and enter `120%` for one person and `-20%` for another.

**What is wrong:** The form only checked that percentages added up to 100, so negative percentages created invalid shares and corrupted balances and settlements.

**What I changed:** I rejected negative custom percentages before saving an expense.

---

## Bug 5

**How to reproduce:** Add a new member and check the “Paid so far” list in the Summary panel.

**What is wrong:** The new member appears in the member count and balances, but is missing from “Paid so far” because the memoized list was not recalculated when `members` changed.

**What I changed:** I added `members` to the memo dependency list so the summary refreshes when a member is added.

---

## Bug 6

**How to reproduce:** Open the app and inspect a member with a positive balance, then inspect a member with a negative balance.

**What is wrong:** Positive balances mean the group owes that person, but the Balances panel labeled them as owing money. Negative balances were labeled the opposite way.

**What I changed:** I corrected the balance labels and CSS classes so positive balances show as owed and negative balances show as owing.
