export const Unauthorized = () => {
  return (
    <div className="flex flex-row gap-3 text-lg font-bold p-5 cursor-pointer hover:text-primary transition">
      <div>
        <div>
          <h1>Invalid Account!</h1>
        </div>
        <div>
          <a href="/login">Login</a>
          <a href="/register">register</a>
        </div>

      </div>

    </div>
  )
}