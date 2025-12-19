import Link from "next/link"

const Home = () => {
  return (
    <div>
      <h1>Hellow from index page</h1>
      <Link href="/abc">Go to abc</Link>
      <a href="/abc/hello"> Go to abc/hello</a>
      <a href="/test">Go to test</a>
    </div>
  )
}

export default Home