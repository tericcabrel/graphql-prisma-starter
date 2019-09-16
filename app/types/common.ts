export type GraphContext = {
  [key: string]: any;
};

export type LoginResult = {
  user: any,
  token: string,
};

export interface IAppConfig {
  PRISMA_ENDPOINT: string;
  PRISMA_SECRET: string;
  JWT_SECRET: string;
  LOG_DIR: string;
}

export interface ITokenProps {
  userId: string;
}

export type Timestamp = {
  created_at: Date;
  updated_at: Date;
};
