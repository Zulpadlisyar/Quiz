# TODO: Fix generate-questions API Handler

## Steps to Complete:

1. **Add Input Validation**

   - Validate required fields: `materi`, `level`, `jumlahSoal`.
   - Return 400 error if missing or invalid (e.g., `jumlahSoal` not a number or >20).
   - Optionally handle `waktu` if needed.

2. **Improve Prompt for AI**

   - Update system prompt to be dynamic and general.
   - Enhance user prompt: Include `level` for difficulty, request 4 options (A/B/C/D), pure JSON output, add explanation if possible.

3. **Robust API Call**

   - Add AbortController for 30s timeout on fetch.
   - Check `response.ok` and throw specific errors (e.g., rate limit, auth failure).

4. **Improve Error Handling**

   - Specific error messages for parsing failures, API errors.
   - Log more context.

5. **General Fixes**

   - Update comment path to match actual file.
   - Ensure options are properly formatted.

6. **Testing and Verification**
   - Run dev server if needed.
   - Test API with curl or Postman.
   - Verify JSON response, no errors.
   - Mark steps as complete in this TODO.md.

## Progress:

- [x] Step 1: Add Input Validation
- [x] Step 2: Improve Prompt for AI
- [x] Step 3: Robust API Call
- [x] Step 4: Improve Error Handling
- [x] Step 5: General Fixes
- [x] Step 6: Testing and Verification

Last Updated: All steps completed, including testing and verification of the API handler. The implementation is ready for deployment.
