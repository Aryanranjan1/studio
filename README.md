# Firebase Studio Project

This is a NextJS starter project created in Firebase Studio.

## External Services Used

This project relies on several Google Cloud and Firebase services to function. Below is a summary of these services, their pricing, and how to manage them.

### 1. Firebase Firestore

*   **Purpose:** The primary database for the entire application. It stores all your content, including projects, services, articles, testimonials, settings, and contact form submissions.
*   **Pricing:** Firestore operates on a generous **free tier**. For a portfolio site, it's highly unlikely you will exceed the free limits. The free tier includes:
    *   1 GiB of storage.
    *   50,000 document reads per day.
    *   20,000 document writes per day.
    *   20,000 document deletes per day.
    *   You can see the full pricing details [here](https://firebase.google.com/docs/firestore/pricing).
*   **How to Change/Remove:** Since this is the core database, removing it would require replacing it with another database (like MySQL, PostgreSQL, or a headless CMS) and rewriting all the data-fetching logic in `src/lib/data.ts` and `src/lib/firestore.ts`.

### 2. Firebase Authentication

*   **Purpose:** Manages the email and password login for the admin panel (`/admin`).
*   **Pricing:** This service is also very generous. The free tier includes up to 50,000 monthly active users, which is more than enough for an admin panel.
*   **How to Change/Remove:** You would need to replace it with another authentication provider (like Auth0, NextAuth.js, or your own system) and update the logic in `src/app/login/page.tsx` and the `src/hooks/use-auth.tsx` file.

### 3. Google AI Platform (via Genkit and Gemini)

*   **Purpose:** Powers the AI features in the app, specifically the "Generate with AI" button for creating project summaries in the admin panel.
*   **Is the Gemini Key Paid?** Yes, the Gemini API is a "pay-as-you-go" service. However, like other Google Cloud services, it comes with a significant **free tier**. You get a certain number of free requests per minute. For a feature used occasionally in an admin panel, it is very unlikely you will incur any charges. You can monitor your usage in your Google Cloud Console.
*   **How to Change/Remove:** To remove this feature, you can:
    1.  Delete the AI flow file: `src/ai/flows/portfolio-project-summary.ts`.
    2.  Remove the "Generate with AI" button and its related `handleGenerateSummary` function from `src/components/project-form.tsx`.

### 4. Google Fonts

*   **Purpose:** Loads the 'Inter' and 'Space Grotesk' fonts for the website's typography.
*   **Pricing:** This service is **completely free**.
*   **How to Change/Remove:** You can change the fonts or remove the service by editing the `<link>` tags in `src/app/layout.tsx`.

---

## Deployment Instructions

### Vercel
Vercel is the recommended platform for deploying Next.js applications.

1.  **Push to Git:** Make sure your code is in a GitHub, GitLab, or Bitbucket repository.
2.  **Import to Vercel:** Sign up at Vercel, connect your Git provider, and import the project. Vercel will auto-detect the Next.js settings.
3.  **Add Environment Variables:** In the Vercel project settings, go to "Environment Variables" and add all the keys from your local `.env` file (especially your Firebase and Gemini API keys).
4.  **Deploy.**

### Hostinger
To run this on Hostinger or any other traditional web host, you would typically need a plan that supports Node.js hosting.

1.  **Build the Project:** Run `npm run build` locally on your machine. This creates an optimized production build in the `.next` folder.
2.  **Upload Files:** Upload your entire project folder (including `.next`, `node_modules`, `package.json`, etc.) to your Hostinger server.
3.  **Configure Server:** You would need to configure your Hostinger environment to run a Node.js application. This usually involves setting up a `server.js` file or using their control panel to point to the start command.
4.  **Run the App:** The command to run the production server is `npm run start`. You would configure your hosting service to execute this command.

**Recommendation:** For a Next.js project, Vercel is significantly easier and more optimized than a traditional host like Hostinger.
