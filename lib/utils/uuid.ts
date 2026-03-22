import { v4 as uuidv4 } from 'uuid';

// Generates a random unique ID like: "550e8400-e29b-41d4-a716-446655440000"
export function generateWatermarkId(): string {
  return uuidv4();
}
