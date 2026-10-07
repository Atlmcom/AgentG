# GroundAgent India V1

> **Your Independent Representative in India.**  
> *Someone on the ground. Working for you.*

A premium, responsive B2B web application built for international buyers (UK, US, Europe, Middle East, Australia) sourcing, verifying, inspecting, or working with manufacturers and suppliers in India.

---

## Core Positioning & Promise

* **Positioning**: Your Independent Representative in India.
* **Fundamental Promise**: We work for the buyer, not the supplier.
* **Primary Call-to-Action**: Book an Agent.
* **Philosophy**: GroundAgent is an independent buyer-side representative service — never a traditional trading company, marketplace, or commission broker.

---

## Key Features & Highlights

1. **Split-Screen Hero**: Clear value proposition, buyer-advocacy messaging, and interactive India industrial corridor map visual.
2. **Trust Strip**: Real, verified experience metrics:
   * **50+** Indian suppliers worked with
   * **40+** Manufacturing plant visits
   * **10+** Industries experienced
   * **India** On-the-ground presence
3. **Problem & Solution Breakdown**: Comparison between the high-friction traditional approach vs. working with an independent GroundAgent representative.
4. **Services (What We Do)**: 8 distinct service cards (Supplier Verification, Factory & Plant Visits, Supplier Meetings, Product & Capability Checks, Local Coordination, On-Ground Reporting, Sourcing Assistance, Ongoing Representation) with pre-fill triggers for the booking form.
5. **"Not A Broker" Section**: Contrast between supplier-side intermediaries and GroundAgent’s buyer-aligned incentives.
6. **How It Works Timeline**: 5-step operational workflow from initial request to finalized field report.
7. **Field Experience Gallery**: Modular gallery with placeholders ready for real plant-visit photographs.
8. **Interactive Sample Report**: Realistic mock inspection dossier with tabs for Executive Overview, Plant Observations, and Findings/Advice.
9. **Interactive Travel Cost Calculator**: *"Should you travel yourself?"* dynamic calculator comparing direct flights, hotels, and time away from the business.
10. **Structured Pricing Models**: Single Assignment, Multi-Step Assignment, and Ongoing Representation.
11. **Booking Form with Validation**: Clean, accessible enquiry form with instant feedback state.
12. **FAQ Accordion**: 9 essential questions regarding representation, visits, verification scope, and coverage across India.

---

## File Structure

```
AgentG/
├── index.html                 # Semantic HTML5, SEO meta tags, JSON-LD Schema
├── css/
│   ├── variables.css          # Design tokens (colors, typography, spacing, shadows)
│   ├── base.css               # Modern reset, typography, accessible utilities
│   ├── components.css         # Buttons, badges, cards, navigation, forms, modals
│   ├── sections.css           # Section-specific layouts (Hero, Problem, Solution, etc.)
│   └── responsive.css         # Breakpoint rules (390px, 768px, 1024px, 1440px+)
├── js/
│   ├── main.js                # App coordinator, scroll spy, animated counters
│   ├── calculator.js          # Travel cost calculator with currency switcher
│   ├── report-modal.js        # Sample report modal with tab switcher
│   ├── faq.js                 # Accessible FAQ accordion with keyboard support
│   └── booking-form.js        # Form validation, pre-selection, and feedback alerts
└── assets/
    └── images/
        ├── india-industrial-map.svg    # Vector map of India industrial corridors
        ├── gallery-placeholder-1.svg   # Manufacturing (CNC Machining & Tooling)
        ├── gallery-placeholder-2.svg   # Plant Visit (Assembly Line & Safety)
        ├── gallery-placeholder-3.svg   # Supplier Meeting (Commercial & Specs)
        └── gallery-placeholder-4.svg   # On-Ground Assessment (Warehouse & Logistics)
```

---

## How to Run & Preview

You can open `index.html` directly in any modern browser, or run a local static server:

```bash
# Using Python
python3 -m http.server 3000

# Open in browser:
http://localhost:3000
```
