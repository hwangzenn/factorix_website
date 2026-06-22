import SolutionSubNav from "@/components/solutions/SolutionSubNav"

export default function SolutionsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SolutionSubNav />
      {children}
    </>
  )
}
