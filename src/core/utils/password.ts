import bcrypt from "bcryptjs";

export function saltAndHashPassword(password: string): string {
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
}

export function compareSync(password: string, hash: string): boolean {
  return bcrypt.compareSync(password, hash);
}
