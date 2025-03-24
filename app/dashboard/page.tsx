import { DashboardContent } from "@/components/dashboard/dashboard-content"
import { getDashboardInfo } from "@/app/actions/dashboard-info"

export default async function DashboardPage() {
  const {info, error} = await getDashboardInfo()
  if (error !== null) {
    throw new Error(error)
  }
  // console.log(data)
  const files_analyzed = info.files_analyzed;
  const file_details = info.file_details;
  const total_messages_count = info.total_messages_count;
  return (
      <DashboardContent
        files_analyzed={files_analyzed}
        recentFiles={file_details}
        totalMessagesCount={total_messages_count} />
  )
}

export const runtime = 'edge';
