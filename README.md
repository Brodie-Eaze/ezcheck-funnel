# EZ Check funnel

The EZ Check landing page, demo booking page, thank-you page and legal pages. Built in the Door to Digital site style and used as the base for partner snapshots.

Live: https://ezcheck-funnel-production.up.railway.app

## Pages

| Route | File | What it is |
|---|---|---|
| `/` | `index.html` | Landing page. Hero dashboard demo, four scroll scenes (opt-in form, soft-pull read, routing, qualified pixel), old way vs EZ Check tabs, the full loop diagram, trust cards, who it's for, FAQ. |
| `/book` | `book.html` | Demo booking. Live times from the GoHighLevel calendar, contact form, books straight into GHL. |
| `/thank-you` | `thank-you.html` | Booking confirmation. Shows the booked time from the `?slot=` query string. |
| `/privacy` | `privacy.html` | Privacy Policy. Copied word for word from aifundingsolutions.com/privacy (last updated June 18, 2026). |
| `/terms` | `terms.html` | Terms of Service. Copied word for word from aifundingsolutions.com/terms (last updated June 18, 2026). |

Shared files:

- `styles.css` holds every style for every page.
- `logo.svg` is the EZ Check mark. It is also the favicon.
- `server.js` is a zero-dependency Node static server. It maps the clean routes above to their files and sends `noindex, nofollow` on every response.

There is no build step and no framework. Each page is plain HTML with its own inline script.

## Run it locally

```bash
npm start
```

Then open http://localhost:3000. Set `PORT` to use a different port.

## How booking works

`book.html` talks to GoHighLevel directly from the browser. Both endpoints allow cross-origin requests.

1. It loads open times from `https://backend.leadconnectorhq.com/calendars/{calendarId}/free-slots` for the next 31 days, in the visitor's own timezone.
2. On submit it posts the booking to `https://backend.leadconnectorhq.com/vibe-ai/booking/submit` with name, email, phone, the chosen slot, the business type and any notes.
3. On success it sends the visitor to `/thank-you?slot=<chosen time>`.

The IDs sit in one place, the `GHL` object at the top of the script in `book.html`:

| Key | Value | What it is |
|---|---|---|
| `locationId` | `61bBcrk5Fi4BuTWwvW0P` | GHL sub-account |
| `calendarId` | `UwaFZL6dpplglPea5QH6` | Demo calendar |
| `businessTypeFieldId` | `jUk3ATqW9im6g6Em0dBM` | Custom field for business type |

Submitting the form creates a real appointment on that calendar.

## Setting it up for a partner

1. Swap the three IDs in the `GHL` object in `book.html` for the partner's sub-account, calendar and business-type field.
2. Change the business name in the consent line under the booking form. It currently says AI Funding Solutions.
3. Replace `privacy.html` and `terms.html` with the partner's own policies. They currently name AI Funding Solutions, its old Railway web address and admin@amala.agency.

## Deploy

The site runs as the `ezcheck-funnel` service inside the `aifs-offer` Railway project. From this folder:

```bash
railway up --service ezcheck-funnel --detach
```

Railway runs `npm start`. No environment variables are needed.

## Content rules

- Product details come from aifundingsolutions.com and the original EZ Check site. Nothing on the page is invented.
- No pricing on the page.
- No lender names.
- Every figure in a demo is labelled as sample data or illustrative.
- No em or en dashes in copy.
