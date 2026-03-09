import { randomBytes } from 'crypto';

export function generateRoomCode(length = 6) {
  // to make it easier for the user I'm stikcing to upper-case letters only
  // also I'm using randomBytes as I've read that math.Random is less secure (as it'd make it easy to guess what next room code is)

  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  return Array.from(randomBytes(length))
    .map((b) => chars[b % chars.length])
    .join('');
}

// console.log(generateRoomCode());
