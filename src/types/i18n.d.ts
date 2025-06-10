import "react-i18next";

declare module "react-i18next" {
  interface CustomTypeOptions {
    translation: {
      login: string;
      username: string;
      password: string;
      input: string;
      forgotPasswordQ: string;
      resetPassword: string;
    };
    interpolation: {
      input: { field: string };
    };
    defaultNS: "translation";
  }

  interface;
}
