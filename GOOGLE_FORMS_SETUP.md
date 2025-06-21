# Google Forms Integration Setup Guide

This guide will help you set up Google Forms integration for the Planet Holiday Tourism website's booking system.

## Overview

The website now includes:

- **Admin Panel**: Accessible at `/admin` with login credentials `admin/admin123`
- **Google Forms Integration**: Automatically submits booking data to your Google Form
- **Local Storage**: Stores bookings locally for admin panel management

## Step 1: Create a Google Form

1. Go to [Google Forms](https://forms.google.com)
2. Create a new form with the following fields:

   - **Full Name** (Short answer)
   - **Email Address** (Short answer)
   - **Phone Number** (Short answer)
   - **Tour Interest** (Multiple choice or dropdown)
   - **Travel Dates** (Short answer)
   - **Group Size** (Multiple choice or dropdown)
   - **Message** (Paragraph)

3. **Important**: After creating the form, click "Send" and copy the form URL

## Step 2: Get Form Entry IDs

1. Open your Google Form in a web browser
2. Right-click and "View Page Source"
3. Search for `entry.` to find the entry IDs for each field
4. Note down the entry IDs for each field (e.g., `entry.1234567890`)

## Step 3: Configure the Admin Panel

1. Navigate to your website's admin panel: `https://yourdomain.com/admin`
2. Login with credentials: `admin` / `admin123`
3. Go to the "Settings" tab
4. Enter your Google Form configuration:
   - **Google Form URL**: The URL you copied from Step 1
   - **Form ID**: Extract from the URL (the part after `/d/e/` and before `/formResponse`)
   - **Entry IDs**: Enter the entry IDs for each field

## Step 4: Test the Integration

1. In the admin panel, click "Send Test Booking"
2. Check your Google Form responses to confirm the test data was received
3. If successful, the integration is working correctly

## Step 5: Update the Service Configuration

If you need to update the entry IDs in the code, edit `src/services/googleFormsService.ts`:

```typescript
private config: GoogleFormsConfig = {
  formUrl: 'YOUR_GOOGLE_FORM_URL',
  formId: 'YOUR_FORM_ID',
  entryIds: {
    name: 'entry.YOUR_NAME_FIELD_ID',
    email: 'entry.YOUR_EMAIL_FIELD_ID',
    phone: 'entry.YOUR_PHONE_FIELD_ID',
    tourInterest: 'entry.YOUR_TOUR_FIELD_ID',
    travelDates: 'entry.YOUR_DATES_FIELD_ID',
    groupSize: 'entry.YOUR_GROUP_FIELD_ID',
    message: 'entry.YOUR_MESSAGE_FIELD_ID'
  }
};
```

## Admin Panel Features

### Dashboard

- View total bookings, pending bookings, confirmed bookings
- Revenue tracking (mock data)
- Recent booking activity

### Bookings Management

- View all submitted bookings
- Update booking status (pending/confirmed/cancelled)
- Delete bookings
- Add new bookings manually

### Settings

- Configure Google Forms integration
- Test the integration
- Save configuration settings

## Security Notes

⚠️ **Important Security Considerations:**

1. **Change Default Credentials**: The default admin credentials (`admin/admin123`) should be changed in production
2. **HTTPS Required**: Google Forms integration requires HTTPS in production
3. **CORS Limitations**: The integration uses `no-cors` mode, which limits error handling
4. **Local Storage**: Bookings are stored in browser localStorage (not secure for sensitive data)

## Troubleshooting

### Common Issues:

1. **Form not submitting**: Check that your Google Form URL is correct and the form is published
2. **Entry IDs not working**: Verify the entry IDs by inspecting the form source code
3. **CORS errors**: Ensure you're using HTTPS in production
4. **Admin panel not loading**: Check that the route is properly configured

### Testing:

1. Use the "Send Test Booking" feature in the admin panel
2. Check browser console for any error messages
3. Verify that bookings appear in the admin panel after submission
4. Check your Google Form responses for received data

## Production Deployment

Before deploying to production:

1. Change admin credentials
2. Set up proper authentication
3. Configure HTTPS
4. Test the complete booking flow
5. Set up monitoring for form submissions
6. Consider implementing a backend API for better security

## Support

If you encounter issues:

1. Check the browser console for error messages
2. Verify your Google Form configuration
3. Test with the provided test functionality
4. Ensure all entry IDs are correctly mapped

---

**Note**: This integration uses client-side JavaScript and localStorage. For production use with sensitive data, consider implementing a secure backend API.
