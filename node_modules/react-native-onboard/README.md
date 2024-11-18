[![npm version](https://img.shields.io/npm/v/react-native-onboard)](https://www.npmjs.com/package/react-native-onboard)
[![npm version](https://github.com/FrigadeHQ/react-native-onboard/actions/workflows/tests.yml/badge.svg)](https://github.com/FrigadeHQ/react-native-onboard/actions/workflows/tests.yml)
[![npm license](https://img.shields.io/npm/l/react-native-onboard)](https://www.npmjs.com/package/react-native-onboard)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

![React Native Onboard cover](https://frigade.com/img/frigade.png)

<H3 align="center"><strong>React Native Onboard</strong></H3>
<div align="center">Build better product onboarding in your app.<br />High-quality components for swipers, tours, and more.</div>
<br />
<div align="center">
<a href="https://frigade.com">Website</a> 
<span> · </span>
<a href="https://github.com/FrigadeHQ/react-native-onboard">GitHub</a> 
<span> · </span>
<a href="https://snack.expo.dev/@christian-frigade/react-native-onboard-simple-demo">Swiper Demo</a>
<span> · </span>
<a href="https://snack.expo.dev/@christian-frigade/react-native-onboard-form-demo">Form Demo</a>
<span> · </span>
<a href="https://snack.expo.dev/@christian-frigade/react-native-onboard-simple-demo">Demo</a>

</div>

## Introduction

A library of high-quality components for creating beautiful onboarding and product education in your React Native apps.
React Native Onboard helps developers build better onboarding experiences faster so they can focus on what matters most: building great products.

## Why
Product onboarding is one of the most important experiences in your app. It's usually the first thing your users see, and it's the first impression they have of your product.
But it's difficult to get right and slow to build. We believe there needs to be a better way to build and iterate on high-quality onboarding experiences.

## Features

- 🎨 Fully customizable components and config
- 🔧 Load images and content from your backend
- 🚀 Works with Expo
- 📦 Lightweight (~40 kB)
- ✨ Beautiful default UI

## Install

Install the package from your command line.

#### With yarn

```bash
yarn add react-native-onboard
```

#### With npm

```bash
npm install react-native-onboard
```

## Quick start

Place the `OnboardFlow` component anywhere in your app. It will automatically take up the entire screen. Three default
behaviors are offered (`fullscreen`, `bottom-sheet`, and `inline`) and can be changed by through the `type` property.

```jsx
import { OnboardFlow } from 'react-native-onboard';

const App = () => {
  return (
    <OnboardFlow
      pages={[
        {
          title: 'Welcome to my app',
          subtitle: 'This is page 1',
          imageUri: 'https://frigade.com/img/example1.png',
        },
        {
          title: 'Page 2 header',
          subtitle: 'This is page 2',
          imageUri: 'https://frigade.com/img/example2.png',
        }
      ]}
      type={'fullscreen'}
    />
  );
};
```

### Using local images
If you wish to load your image assets from your local project rather than server side, you can use the `require`
function.

```jsx
imageUri: Image.resolveAssetSource(require('image.png')).uri
```


## Customization
`react-native-onboard` is designed to be headless and customizable. You can use the default UI or create your own by implementing a series of provided interfaces [see available props here](https://github.com/FrigadeHQ/react-native-onboard/blob/main/src/OnboardFlow/types/index.ts)

## Docs
The official docs are available at [docs.frigade.com](https://docs.frigade.com/)

## Supercharge your onboarding flows
While the above examples contain hard-coded strings and images for illustrative purposes, we highly recommend loading your strings and presentation
layer logic from your API rather than as plain strings in your app.

We built [Frigade](https://frigade.com/) to work seamlessly with `react-native-onboard` and make it easier for developers to build and scale onboarding. 
With Frigade, you can update your flows without releasing to the App Store, integrate 3rd party analytics (Segment, Mixpanel, etc.) to power user targeting, and integrate our API/webhooks to make data input easy.

## Get in touch
Questions? Suggestions? Feel free to [open an issue](https://github.com/FrigadeHQ/react-native-onboard/issues), [submit a PR](https://github.com/FrigadeHQ/react-native-onboard/pulls), or [contact us](https://frigade.com).

## Authors

- Christian Mathiesen ([LinkedIn](https://www.linkedin.com/in/cmathies/))
- Eric Brownrout ([LinkedIn](https://www.linkedin.com/in/ericbrownrout/))

## License

MIT License
