# FAQ Generator Prompt

Use this prompt to generate relevant FAQs for a specific niche.

## Prompt

```markdown
Act as a customer service expert for a [Niche] in [City].
Generate 5 frequently asked questions and answers that address common customer anxieties.

**Rules:**
- Tone: Helpful, professional, reassuring.
- Format: HTML <details> and <summary> tags.
- Content:
  1. Pricing/Cost transparency.
  2. Timeline/Availability.
  3. Guarantee/Warranty.
  4. Process (What to expect).
  5. Qualifications/Insurance.

**Example Output:**
<details class="faq-item">
  <summary class="faq-question">Do you offer free estimates? <span class="icon">+</span></summary>
  <div class="faq-answer">Yes, we provide free, no-obligation quotes for all our services.</div>
</details>
```
