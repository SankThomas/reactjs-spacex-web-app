import { Link } from "react-router-dom"

export default function Error() {
  return (
    <>
      <section className="flex items-center justify-center flex-col h-screen px-5">
        <h1 className="text-white text-lg mb-5">
          Sorry, the requested resource could not be found
        </h1>
        <Link to="/" className="btn">
          &larr; Back to Homepage
        </Link>
      </section>
    </>
  )
}
