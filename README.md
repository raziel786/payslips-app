
# Deel.com Payslips Tech Test

### Platform Scope
- [ ] Use React Native CLI (or Expo if preferred)
- [ ] TypeScript for type safety
- [ ] Target platforms: iOS and Android

### Native File Handling (Download)
- [ ] Implement download by copying bundled file to:
  - iOS: app-specific directory (`DocumentDirectoryPath`) or share/save to Files
  - Android: app-specific cache or `DownloadDirectoryPath` (handle permissions)
- [ ] Inform user of saved file location (Toast, Alert, or similar)
- [ ] Use a well-supported library for filesystem operations (e.g., `react-native-fs`)
- [ ] Handle Android runtime permissions where required

### Thought Process

I really enjoyed working on the Payslips task. Each payslip typically has an ID, a date range (from/to), and optionally a PDF file attached. We need to display this information clearly, allow users to download the PDF, and optionally preview it.

We’ll have buttons to perform actions for each payslip, e.g., Preview and Download. Since this will be a list of payslips, we’ll use a FlatList instead of .map(), as FlatList is optimised for mobile performance and only renders items currently on screen (plus a small buffer).

We’ll create some components in isolation:

Header component – displays the title for the screen. I’m making a custom header so it can match the app’s theme and optionally show a back button.

Payslip Card component – displays the payslip information, including:

- Payslip ID

- Date range (from/to)

When the user taps on the card, it navigates to the Payslip Details screen, where the user can download the PDF. This keeps the main list clean and offloads all PDF-related actions to the details page. Each card is lightweight and only renders the necessary information for the list view. Navigation is handled via React Navigation (Stack.Navigator) so that each payslip has its own dedicated detail screen.

Button component – enhanced to accept a loading state, so users get visual feedback while the PDF is being downloaded or previewed.

We’ll also include:

State management – Redux to store the payslips list and allow easy access to individual payslip details.

Utilities – date formatting helper to display human-readable dates for each payslip.

All components and utility functions will be unit tested to ensure they work correctly, handle errors gracefully, and provide a stable user experience.

## Areas for Improvement / Points of Concern

- Implement a Preview/Open option so users can view the PDF after downloading it.

- Display more detailed information in the Payslip Details screen, such as the employee's name, address, and a full breakdown of figures, when the user selects a payslip.

- Create unit tests for the Screens created.

### Preview

![Sep-28-2025 22-33-04](https://github.com/user-attachments/assets/172d4f8a-6785-4e8f-85d0-08bf2792ed0c)


## Installation
run `yarn install` on the root of the directory.

## To Run

1. Start your iOS and/or Android simulator.
2. Run `yarn run ios` or `yarn run android` in your terminal, depending on the device you are targetting

### Run unit tests

In the terminal, run ```yarn run test```

<img width="391" height="114" alt="Screenshot 2025-09-28 at 22 52 15" src="https://github.com/user-attachments/assets/c7c2b077-183b-4431-bcd4-332b2ef91db8" />

