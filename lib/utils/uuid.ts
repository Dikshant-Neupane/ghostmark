import { v4 as uuidv4 } from 'uuid'

export function generateWatermarkId(): string {
  return uuidv4()
}
