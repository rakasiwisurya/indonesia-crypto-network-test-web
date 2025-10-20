export type TAuthState = {
  user: {
    name: string;
    email: string;
  } | null;
  isAppLoading: boolean;

  isLoginLoading: boolean;
  loginSuccess: any;
  loginError: any;

  isRegisterLoading: boolean;
  registerSuccess: any;
  registerError: any;
};

export type TFormLogin = {
  email: string;
  password: string;
};

export type TFormRegister = {
  name: string;
  email: string;
  password: string;
};
