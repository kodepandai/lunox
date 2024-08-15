let compareHash: (password: string, hash: string) => boolean
let hash: (password: string) => string
if (process.versions.bun) {
  // this code will only run when the file is run with Bun
  compareHash = Bun.password.verifySync;
  hash = Bun.password.hashSync
} else {
  const Bcrypt = await import('bcrypt');
  compareHash = Bcrypt.compareSync
  hash = (password: string) => Bcrypt.hashSync(password, 10)
}
export { compareHash, hash }
