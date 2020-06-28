# form-test

https://expo.io/@nethan/test-form

## To Start

1. go into project: `cd form-test`

2. install dependencies: `yarn install`

3. start expo `yarn start`

## file structure
```
├── App.tsx                    # App root contains routes
├── app.json
├── babel.config.js
├── constants.ts               # constants for colors
├── package.json               # packages and CL commands
├── screens                    # screens are layout for components
│   ├── Account
│   │   ├── components
│   │   │   ├── AccountItem.tsx     # component for handling account item
│   │   │   ├── EditButton.tsx      # component for right header button
│   │   │   ├── Resume.tsx          # component to open resume in PDF Viewer
│   │   │   └── UploadResume.tsx    # component to open local directory to pick PDF files
│   │   ├── index.tsx          # My Account screen
│   │   └── styles.tsx
│   ├── EditAccount
│   │   ├── __tests__
│   │   │   └── schema.ts      # Unit tests for form schema validation
│   │   ├── components
│   │   │   ├── FormInput.tsx             # component for form input
│   │   │   ├── FormInputWithMask.tsx     # same as above but can apply mask
│   │   │   ├── SaveButton.tsx            # component for right header button
│   │   │   └── StatePicker.tsx           # component for picking "State/Territories"
│   │   ├── index.tsx           # Edit My Account screen
│   │   ├── schema.ts           # constains validation schema for forms
│   │   └── styles.tsx
│   └── PDFViewer.tsx         # PDF View screen
├── tsconfig.json
├── types
│   ├── FormValues.ts                       # Shared interface
│   └── react-native-dropdown-picker.d.ts   # place-holder module for drop down component
├── web-build
│   └── register-service-worker.js
└── yarn.lock
```
