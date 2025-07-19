# Email Setup Guide for Contact Form

To make your contact form actually send emails to your mailbox, follow these steps to set up EmailJS:

## Step 1: Create EmailJS Account

1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Click "Sign Up" and create a free account
3. Verify your email address

## Step 2: Connect Your Email Service

1. After logging in, go to "Email Services" in the dashboard
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, Yahoo, etc.)
4. For Gmail:
   - Click "Gmail"
   - Click "Connect Account"
   - Sign in with your Google account (`test@gmail.com`)
   - Allow EmailJS to access your Gmail
5. Note down your **Service ID** (something like `service_abc123`)

## Step 3: Create Email Template

1. Go to "Email Templates" in the dashboard
2. Click "Create New Template"
3. Use this template content:

**Template Name:** `contact_form`

**Subject:** `New Contact Form Message: {{subject}}`

**Content:**

```
Hello Bilal,

You have received a new message from your portfolio contact form:

From: {{from_name}} ({{from_email}})
Subject: {{subject}}

Message:
{{message}}

---
This email was sent from your portfolio website contact form.
```

4. Click "Save" and note down your **Template ID** (something like `template_xyz789`)

## Step 4: Get Your Public Key

1. Go to "Account" > "General" in the dashboard
2. Copy your **Public Key** (something like `abcdef123456`)

## Step 5: Update Your Website Code

Replace the placeholder values in your code:

### In `index.html` (line 825):

```javascript
emailjs.init("YOUR_PUBLIC_KEY"); // Replace with your actual public key
```

### In `js/file.js` (lines 359-360):

```javascript
const serviceID = "YOUR_SERVICE_ID"; // Replace with your service ID
const templateID = "YOUR_TEMPLATE_ID"; // Replace with your template ID
```

## Step 6: Test Your Form

1. Deploy your website
2. Fill out the contact form with a test message
3. Check your email inbox (`test@gmail.com`)
4. You should receive the message within a few seconds

## Alternative Solutions

If you prefer other services, here are alternatives:

### 1. Formspree (Easy Setup)

- Go to [Formspree.io](https://formspree.io/)
- Create account and get form endpoint
- Replace EmailJS code with Formspree endpoint

### 2. Netlify Forms (If hosting on Netlify)

- Add `netlify` attribute to your form
- No additional setup needed

### 3. Your Own Backend

- Create a Node.js/PHP backend
- Use services like Nodemailer, SendGrid, or Mailgun

## Free Tier Limitations

EmailJS free tier includes:

- 200 emails per month
- Basic email templates
- Email service integrations

This should be sufficient for a portfolio contact form.

## Security Notes

- Never expose private keys in client-side code
- EmailJS public key is safe to use in frontend
- Consider adding CAPTCHA for spam protection
- Monitor usage to prevent abuse

## Troubleshooting

**Common Issues:**

1. **401 Unauthorized**: Check your public key
2. **404 Service/Template not found**: Verify service ID and template ID
3. **Emails not received**: Check spam folder, verify email service connection
4. **CORS errors**: Make sure you're testing on the actual domain, not `file://`

**Testing Tips:**

- Use browser developer tools to check for errors
- Test with different email addresses
- Check EmailJS dashboard for send logs

## Support

- EmailJS Documentation: https://www.emailjs.com/docs/
- EmailJS Support: support@emailjs.com

---

Once configured, your contact form will send real emails to your mailbox!
