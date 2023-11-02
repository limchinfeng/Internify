export const Unauthorized = () => {
  return (
    <div className="flex flex-row gap-3 text-lg font-bold p-5 cursor-pointer hover:text-primary transition">
      <a href="/login">Login</a>
      <a href="/register">register</a>
  </div>
  )
}