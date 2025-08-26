// Zod validation middleware

import { Request, Response, NextFunction } from 'express';
import { z, ZodError, ZodIssue } from 'zod';

// Generic validation middleware
export const validateSchema = (schema: z.ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      // Validate request body
      const validatedData = schema.parse(req.body);

      // Replace req.body with validated and transformed data
      req.body = validatedData;

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: error.issues.map((err: ZodIssue) => ({
            field: err.path.join('.'),
            message: err.message,
          })),
        });
        return;
      }

      res.status(500).json({
        success: false,
        message: 'Internal server error during validation',
      });
    }
  };
};

// Validate query parameters
export const validateQuery = (schema: z.ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      const validatedData = schema.parse(req.query);
      (req as any).query = validatedData;
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({
          success: false,
          message: 'Query validation failed',
          errors: error.issues.map((err: ZodIssue) => ({
            field: err.path.join('.'),
            message: err.message,
          })),
        });
        return;
      }

      res.status(500).json({
        success: false,
        message: 'Internal server error during query validation',
      });
    }
  };
};

// Validate URL parameters
export const validateParams = (schema: z.ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      const validatedData = schema.parse(req.params);
      (req as any).params = validatedData;
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({
          success: false,
          message: 'Parameter validation failed',
          errors: error.issues.map((err: ZodIssue) => ({
            field: err.path.join('.'),
            message: err.message,
          })),
        });
        return;
      }

      res.status(500).json({
        success: false,
        message: 'Internal server error during parameter validation',
      });
    }
  };
};

// Safe parsing function for manual validation
export const safeParse = <T>(
  schema: z.ZodSchema<T>,
  data: unknown,
): {
  success: boolean;
  data?: T;
  errors?: { field: string; message: string }[];
} => {
  try {
    const result = schema.safeParse(data);

    if (result.success) {
      return {
        success: true,
        data: result.data,
      };
    } else {
      return {
        success: false,
        errors: result.error.issues.map((err: ZodIssue) => ({
          field: err.path.join('.'),
          message: err.message,
        })),
      };
    }
  } catch (error) {
    return {
      success: false,
      errors: [{ field: 'unknown', message: 'Validation error occurred' }],
    };
  }
};
