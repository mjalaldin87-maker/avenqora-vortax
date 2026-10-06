# EMAIL-SETUP.md — Zoho Mail setup

This file prepares the DNS checklist. Exact Zoho hostnames, DKIM selector/value and account-specific MX values must be copied from the Zoho Admin Console for the domain. Do not invent or reuse values from another account.

## 1. Add the domain
1. Open Zoho Mail Admin Console.
2. Add `avenqoravortax.com`.
3. Verify domain ownership using the TXT/CNAME record Zoho provides.
4. Keep the existing website DNS records intact.

## 2. MX records
Add the MX records shown by Zoho for the selected mail region/account.
- Type: MX
- Host/Name: @
- Value: [FILL IN — exact Zoho MX value]
- Priority: [FILL IN]
- Add every MX record Zoho requires.

Remove conflicting MX records only after confirming they are not needed for another mail service.

## 3. SPF
Add one SPF TXT record for the root domain.
- Type: TXT
- Host/Name: @
- Value: [FILL IN — exact Zoho SPF value]
Do not create multiple SPF TXT policies; merge authorized senders into one SPF record if another legitimate sender already exists.

## 4. DKIM
In Zoho Admin Console, generate DKIM for the domain.
- Type: TXT
- Host/Name: [FILL IN — Zoho DKIM selector]
- Value: [FILL IN — Zoho DKIM public key]
Publish the exact value Zoho provides, then verify DKIM in Zoho.

## 5. DMARC
Start with a monitoring policy.
- Type: TXT
- Host/Name: _dmarc
- Value: [FILL IN — DMARC policy approved for this domain]
After reviewing reports and confirming legitimate senders, the policy can be tightened.

## 6. Create the mailboxes
Create:
- contact@avenqoravortax.com
- editorial@avenqoravortax.com

The site currently keeps the existing Gmail addresses until you confirm the new mailboxes are working.

## 7. Site switch
When ready, update only `contact-config.js`:
- general → contact@avenqoravortax.com
- editorial → editorial@avenqoravortax.com

Then commit/deploy and test every Contact/Editorial mail link.
