# Security deployment checklist

The contact and support forms are intentionally unavailable until their
server-side services are configured. Keep all recipient addresses and secrets
in Vercel environment variables; never add them to source control or a client
bundle.

## Required environment variables

Configure these for Production and any Preview environment used for end-to-end
testing:

| Variable | Scope | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Browser-visible | Cloudflare Turnstile widget key |
| `TURNSTILE_SECRET_KEY` | Server only | Cloudflare Siteverify secret |
| `RESEND_API_KEY` | Server only | Resend API authentication |
| `CONTACT_TO_EMAIL` | Server only | Private general-contact destination |
| `SUPPORT_TO_EMAIL` | Server only | Private support destination |
| `CONTACT_FROM_EMAIL` | Server only | Verified Resend sender, such as `Studio KRiX <forms@send.studiokrix.com.au>` |

Use `.env.example` only as a names-and-shape reference. Do not place real
values in that file.

## Cloudflare Turnstile

1. Create a Turnstile widget in **Managed** mode.
2. Add only the production hostname and the specific preview hostnames used for
   testing.
3. Add the site key and secret to Vercel with the scopes above.
4. Confirm both forms render the widget, and confirm Siteverify returns the
   expected action (`contact` or `support`) and request hostname.
5. Submit each form once in production. A successful build alone does not prove
   delivery or bot protection works.

Tokens are checked only on the server, are single-use, and are reset in the UI
after each submission attempt.

## Resend and DNS

Use a dedicated sending subdomain such as `send.studiokrix.com.au`. In Resend:

1. Add the sending subdomain, not the root domain.
2. Copy the exact SPF records Resend generates for that subdomain. Resend may
   provide both an MX record for its return path and a TXT record for SPF.
3. Copy the exact DKIM TXT record Resend generates.
4. Verify the subdomain in Resend before setting `CONTACT_FROM_EMAIL`.
5. Send test messages to both server-only destinations and confirm Reply-To is
   the visitor's validated address.

Do not replace or edit the root-domain iCloud MX records. Do not guess DNS
values: use the records shown for this domain in the Resend dashboard.

## Vercel Firewall rate limit

Create this rule manually in **Vercel project → Firewall → Configure → New
Rule**:

- Name: `Studio KRiX form submissions`
- Conditions:
  - `Request Path` → `Is any of` → `/api/contact`, `/api/support`
  - AND `Method` → `Equals` → `POST`
- Action: `Rate Limit`
- Strategy: `Fixed Window`
- Time window: `10 minutes`
- Request limit: `5`
- Counting key: `IP`
- Limit response: default `429`

Review the rule, publish it, and confirm matches in the Firewall overview. The
application also has a conservative in-memory fallback. That fallback is
process-local and is not a substitute for Vercel's distributed edge limit.

## Apple custom-domain email checklist

Make no Apple or registrar DNS changes as part of the website deployment.
Manually verify:

1. iCloud Custom Email Domain **Allow All** or catch-all is off unless it is
   genuinely required.
2. Root-domain MX records remain Apple's required values.
3. Existing SPF and DKIM records remain valid.
4. A suitable DMARC record exists.
5. There is only one SPF TXT record for each hostname.
6. Two-factor authentication remains enabled for the account.

## Production acceptance

After credentials and DNS are configured:

1. Deploy the branch to a protected preview and test both forms.
2. Inspect the browser console and CSP reports for blocked legitimate resources.
3. Confirm invalid, expired and reused Turnstile tokens are rejected.
4. Confirm GET requests to both endpoints return `405` and oversized requests
   return `413`.
5. Confirm both destination inboxes receive plain-text messages and that the
   validated visitor address is used only as Reply-To.
6. Search the deployed HTML and browser JavaScript for private destination
   values.
7. Only then promote to production and repeat one real submission per form.
