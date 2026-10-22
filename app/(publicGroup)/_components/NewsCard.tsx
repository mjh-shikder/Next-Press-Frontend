import { CalendarDays, UserRound } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

type PostRecord = Record<string, unknown>

function isRecord(value: unknown): value is PostRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value)
}

function getText(record: PostRecord, ...keys: string[]): string | undefined {
  for (const key of keys) {
    const value = record[key]
    if (typeof value === "string" && value.trim()) {
      return value.trim()
    }
  }
}

function getRelatedName(value: unknown): string | undefined {
  if (typeof value === "string" && value.trim()) {
    return value.trim()
  }

  if (isRecord(value)) {
    return getText(value, "name", "title")
  }
}

function formatDate(value: string | undefined): string | undefined {
  if (!value) {
    return undefined
  }

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) {
    return value
  }

  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
  }).format(date)
}

export function NewsCard({ post }: { post: unknown }) {
  const record = isRecord(post) ? post : {}
  const title = getText(record, "title", "headline") ?? "Untitled story"
  const description =
    getText(record, "excerpt", "summary", "description", "content") ??
    "Read the latest story from Next Press."
  const category = getRelatedName(record.category)
  const author = getRelatedName(record.author)
  const date = formatDate(
    getText(record, "publishedAt", "createdAt", "createdAT"),
  )

  return (
    <Card className="h-full gap-0 transition-shadow hover:shadow-lg">
      <CardHeader className="gap-4">
        <div className="flex min-h-6 flex-wrap items-center gap-3 text-xs text-muted-foreground">
          {category && (
            <span className="rounded-full bg-primary/10 px-3 py-1 font-semibold text-primary">
              {category}
            </span>
          )}
          {date && (
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays aria-hidden="true" className="size-3.5" />
              <time>{date}</time>
            </span>
          )}
        </div>
        <CardTitle className="text-xl leading-snug font-semibold tracking-tight">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-5 pt-3">
        <CardDescription className="line-clamp-3 text-sm leading-6">
          {description}
        </CardDescription>
        {author && (
          <div className="mt-auto flex items-center gap-2 border-t pt-4 text-sm font-medium text-muted-foreground">
            <UserRound aria-hidden="true" className="size-4" />
            <span>{author}</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
