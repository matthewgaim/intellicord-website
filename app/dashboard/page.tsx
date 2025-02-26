import { DashboardContent } from "@/components/dashboard/dashboard-content"
import { getDashboardInfo } from "@/app/actions/dashboard-info"

export default async function DashboardPage() {
  const data = await getDashboardInfo()
  // console.log(data)
  const files_analyzed = data.files_analyzed;
  const file_details = data.file_details;
  const total_messages_count = data.total_messages_count;
  return (
      <DashboardContent files_analyzed={files_analyzed} recentFiles={file_details} totalMessagesCount={total_messages_count}/>
  )
}

export const runtime = 'edge';
