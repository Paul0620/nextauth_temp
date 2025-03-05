import bcrypt from 'bcryptjs'

const SALT_ROUNDS = 10

// 비밀번호 해싱
export async function saltAndHashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(SALT_ROUNDS)
  return bcrypt.hash(password, salt)
}

// 입력한 비밀번호와 해시된 비밀번호 비교
export async function verifyPassword(
  plainPassword: string,
  hashedPassword: string,
): Promise<boolean> {
  return bcrypt.compare(plainPassword, hashedPassword)
}
