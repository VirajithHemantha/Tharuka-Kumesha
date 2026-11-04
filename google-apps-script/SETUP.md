RSVP → Google Sheet setup
==========================

Sheet: https://docs.google.com/spreadsheets/d/1EnwTu2QtJueDcq9W67TWe9jhaYfed7vmbi7F3TmiqHU/edit
(The sheet ID is already set in code.gs. The "RSVP" tab and its header row are created automatically on the first response.)

1. Open the Google Sheet above (signed in as its owner).
2. Extensions > Apps Script.
3. Delete everything in Code.gs and paste the full contents of google-apps-script/code.gs. Save.
4. Deploy > New deployment > gear icon > Web app.
   - Execute as: Me
   - Who has access: Anyone
5. Click Deploy, allow the permissions, and copy the Web App URL (ends with /exec).
6. In src/components/RSVPSection.tsx, replace PASTE_YOUR_WEB_APP_URL_HERE with that URL.
   (Or set VITE_GOOGLE_APPS_SCRIPT_URL in a .env file or in Vercel's environment variables.)
7. Rebuild / redeploy the site.

Columns written: Timestamp | Name | Guests | Attendance | Message

Notes:
- If you edit code.gs later: Deploy > Manage deployments > Edit > Version: New version > Deploy (keeps the same URL).
- Opening the /exec URL in a browser should show: {"ok":true,"message":"Wedding form endpoint is running."}
