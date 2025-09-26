# TODO: Implement Feedback Page and Dashboard Enhancements

## Steps to Complete:

1. **Create Feedback.jsx**

   - Path: `src/page/Feedback.jsx`
   - Implement dark-themed form: Title "Feedback", Email input, Message textarea, Submit button, Back button.
   - Use shadcn/ui components (Button, Input, Label) and Tailwind for styling (bg-black, text-white, centered).
   - Basic form submission (e.g., console.log).
   - Accept onBack prop to navigate back to dashboard.

2. **Update App.jsx**

   - Path: `src/App.jsx`
   - Add import for Feedback.
   - Add handleViewFeedback function to set currentView to "feedback".
   - Pass onViewFeedback prop to Dashboard.
   - Add conditional render for "feedback" view: `<Feedback onBack={handleBackToHome} />`.

3. **Update Dashboard.jsx**

   - Path: `src/page/Dashboard.jsx`
   - Destructure onViewFeedback prop.
   - Add "Feedback" button next to History button (absolute positioning, same styling).
   - onClick calls onViewFeedback.

4. **Testing and Verification**
   - Run `npm run dev` (if not already running).
   - Navigate to Dashboard, click History (verify goes to History).
   - Click new Feedback button (verify goes to Feedback page).
   - Test form submission and back button.
   - Mark steps as complete in this TODO.md.

## Progress:

- [x] Step 1: Create Feedback.jsx
- [x] Step 2: Update App.jsx
- [ ] Step 3: Update Dashboard.jsx
- [ ] Step 4: Testing and Verification

Last Updated: App.jsx updated. Proceed with Step 3.
