import { getAllPost } from "@/app/(publicGroup)/_actions/getAllPost"
import { NewsCard } from "@/app/(publicGroup)/_components/NewsCard"

function getPostKey(post: unknown, index: number): string | number {
  if (typeof post === "object" && post !== null && "id" in post) {
    const id = post.id
    if (typeof id === "string" || typeof id === "number") {
      return id
    }
  }

  return index
}

export default async function NewsPage() {
  const result = await getAllPost()

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <header className="mb-10 space-y-3">
        <p className="text-sm font-semibold tracking-[0.2em] text-primary uppercase">
          Next Press
        </p>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Latest news</h1>
        <p className="max-w-2xl text-muted-foreground">
          Stories, updates, and perspectives from around the world.
        </p>
      </header>

      {!result.success ? (
        <p className="rounded-xl border border-destructive/30 bg-destructive/5 p-6 text-destructive">
          {result.message}
        </p>
      ) : result.data.length === 0 ? (
        <p className="rounded-xl border border-dashed p-10 text-center text-muted-foreground">
          No news articles are available right now. Please check back soon.
        </p>
      ) : (
        <>
          <p className="mb-5 text-sm text-muted-foreground">
            {result.meta.total} {result.meta.total === 1 ? "story" : "stories"}
          </p>
          <section
            aria-label="Latest news articles"
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {result.data.map((post, index) => (
              <NewsCard key={getPostKey(post, index)} post={post} />
            ))}
          </section>
        </>
      )}
    </main>
  )
}