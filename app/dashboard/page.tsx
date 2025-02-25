import { DashboardContent } from "@/components/dashboard/dashboard-content"
import { getDashboardInfo } from "@/app/actions"

export default async function DashboardPage() {
  const data = await getDashboardInfo()
  // console.log(data)
  const files_analyzed = data.files_analyzed;
  const file_details = data.file_details;
  return (
      <DashboardContent files_analyzed={files_analyzed} recentFiles={file_details}/>
  )
}
