import { Prisma } from '@prisma/client';

const [
  KnownError,
  UnknownError,
  RustPanicError,
  InitializationError,
  ValidationError,
] = [
  Prisma.PrismaClientKnownRequestError,
  Prisma.PrismaClientUnknownRequestError,
  Prisma.PrismaClientRustPanicError,
  Prisma.PrismaClientInitializationError,
  Prisma.PrismaClientValidationError,
];

type typeKnown = Prisma.PrismaClientKnownRequestError;
type typeUnknown = Prisma.PrismaClientUnknownRequestError;
type typeRustPanic = Prisma.PrismaClientRustPanicError;
type typeInitialization = Prisma.PrismaClientInitializationError;
type typeValidation = Prisma.PrismaClientValidationError;

export function handlePrismaError(error: unknown): Error {
  if (error instanceof KnownError) {
    const knownError = error as typeKnown;
    switch (knownError.code) {
      case 'P2002':
        return new Error(`Unique constraint error: ${knownError.message}`);
      case 'P2025':
        return new Error(`Foreign key constraint error: ${knownError.message}`);
      case 'P2034':
        return new Error(`Data integrity error: ${knownError.message}`);
      // Add more cases for other known request errors
      default:
        return new Error(`Known request error: ${knownError.message}`);
    }
  } else if (error instanceof UnknownError) {
    const unknownError = error as typeUnknown;
    return new Error(`Unknown request error: ${unknownError.message}`);
  } else if (error instanceof RustPanicError) {
    const rustPanicError = error as typeRustPanic;
    return new Error(`Rust panic error: ${rustPanicError.message}`);
  } else if (error instanceof InitializationError) {
    const initializationError = error as typeInitialization;
    return new Error(`Initialization error: ${initializationError.message}`);
  } else if (error instanceof ValidationError) {
    const validationError = error as typeValidation;
    return new Error(`Validation error: ${validationError.message}`);
  } else {
    return new Error(`An unexpected error occurred: ${error as string}`);
  }
}