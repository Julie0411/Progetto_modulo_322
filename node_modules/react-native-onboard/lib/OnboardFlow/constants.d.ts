/// <reference types="react" />
export declare const PRIMARY_BUTTON_TEXT_DEFAULT = "Continue";
export declare const PRIMARY_BUTTON_TEXT_LAST_PAGE_DEFAULT = "Get started";
export declare const HORIZONTAL_PADDING_DEFAULT = 16;
export declare const HORIZONTAL_PADDING_SMALL_DEFAULT = 8;
export declare const VERTICAL_PADDING_DEFAULT = 16;
export declare const VERTICAL_PADDING_SMALL_DEFAULT = 8;
export declare const COLOR_TEXT_DEFAULT = "#000000";
export declare const COLOR_BUTTON_DEFAULT = "#000000";
export declare const COLOR_MUTED_TEXT_DEFAULT = "#6b6b6b";
export declare const COLOR_SECONDARY_DEFAULT = "#989898";
export declare const COLOR_PRIMARY_DEFAULT = "#000000";
export declare const TEXT_ALIGN_DEFAULT = "center";
export declare const DEFAULT_PAGE_TYPES: {
    phoneNumberEntry: import("react").FC<import(".").OnboardPageConfigParams<import("./pages/PhoneNumberEntryPage").PhoneNumberEntryPageProps>>;
    phoneNumberVerification: import("react").FC<import(".").OnboardPageConfigParams<import("./pages/PhoneNumberVerificationPage").PhoneNumberVerificationPageProps>>;
    formEntry: import("react").FC<import(".").OnboardPageConfigParams<import("./pages/FormEntryPage").FormEntryPageProps>>;
    multipleChoice: import("react").FC<import(".").OnboardPageConfigParams<import("./pages/MultipleChoicePage").MultipleChoicePageProps>>;
};
export declare const DEFAULT_FORM_ENTRY_TYPES: {
    text: import("react").FC<import("./components/InputField").FormEntryField & import("./types").TextStyles>;
    email: import("react").FC<import("./components/InputField").FormEntryField & import("./types").TextStyles>;
    password: import("react").FC<import("./components/InputField").FormEntryField & import("./types").TextStyles>;
};
