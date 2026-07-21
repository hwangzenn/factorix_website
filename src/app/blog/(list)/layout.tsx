import BlogHero from "@/components/blog/BlogHero"

export default function BlogListLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <BlogHero />
      {children}
    </div>
  )
}
