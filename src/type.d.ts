interface BtnProp {
  label: string;
  onClick: () => void;
}

type User = {
  email: string;
  password: string;
};

export interface InitialState {
  user: null | LoggedUser;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  err?: ErrType;
  counter: number;
}

export interface LoggedUser {
  user: {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
  };
  token: string;
}

export type ErrType = string[];
