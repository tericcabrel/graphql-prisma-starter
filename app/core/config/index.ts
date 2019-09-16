const e: any = process.env;

const PRISMA_ENDPOINT: string = e.PRISMA_ENDPOINT || '';
const PRISMA_SECRET: string = e.PRISMA_SECRET || '';
const JWT_SECRET: string = e.JWT_SECRET || 'hdufdigxzbvkclvlafd';
const LOG_DIR: string = e.LOG_DIR || '';

export { PRISMA_ENDPOINT, PRISMA_SECRET, JWT_SECRET, LOG_DIR };
