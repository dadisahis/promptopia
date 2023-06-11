import Feed from "@/components/Feed"

function Home() {
  return (
    <section className="home_container">
        <h1>
            Discover & Share
            <br />
            <span className="orange_gradient">AI Powered Prompts</span>
        </h1>
        <p className="subtitle">
            Promptopia is an open-source AI prompting tool for modern world to
            discover, create and share creative prompts
        </p>
        <Feed />
        
    </section>
  )
}

export default Home