# Admin Dashboard Setup

This document explains how to set up the admin dashboard for viewing contact form submissions.

## Environment Variables

Create a `.env.local` file in your project root with the following variables:

```env
# Admin Credentials
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your_secure_password_here

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

## Supabase Setup

1. **Create a Supabase Project:**

   - Go to [supabase.com](https://supabase.com)
   - Create a new project
   - Get your project URL and API keys from the project settings

2. **Run the SQL Setup:**

   - Go to your Supabase project dashboard
   - Navigate to the SQL Editor
   - Run the SQL commands from `supabase-setup.sql`

3. **Configure RLS Policies:**
   - The SQL file includes Row Level Security policies
   - Adjust the policies based on your security requirements

## Admin Dashboard Access

1. **Access the Admin Panel:**

   - Navigate to `/admin` on your website
   - Use the credentials from your `.env.local` file

2. **Features:**
   - View all contact form submissions
   - See submission details (name, email, message, date)
   - Click on email addresses to send emails
   - Secure authentication with session management

## Security Notes

- Change the default admin credentials in production
- Use strong passwords
- Consider implementing additional security measures like 2FA
- The admin session expires after 24 hours
- All admin routes are protected with authentication

## File Structure

```
app/
├── admin/
│   └── page.tsx              # Admin dashboard UI
├── api/
│   ├── admin/
│   │   ├── login/route.ts    # Admin login endpoint
│   │   ├── logout/route.ts   # Admin logout endpoint
│   │   └── check-auth/route.ts # Auth verification
│   └── contact/route.ts      # Contact form submission endpoint
lib/
├── auth.ts                   # Authentication utilities
└── supabase.ts              # Supabase client configuration
```

## Troubleshooting

1. **Database Connection Issues:**

   - Verify your Supabase URL and keys
   - Check if the table was created successfully
   - Ensure RLS policies are configured correctly

2. **Authentication Issues:**

   - Verify admin credentials in `.env.local`
   - Check if cookies are enabled
   - Clear browser cookies and try again

3. **Form Submission Issues:**
   - Check browser console for errors
   - Verify API routes are working
   - Check Supabase logs for database errors
