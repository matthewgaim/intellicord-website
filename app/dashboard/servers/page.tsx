import { PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// This would typically come from your API or database
const servers = [
  { id: 1, name: "Coding Community", memberCount: 1234, icon: "/placeholder.svg?height=100&width=100" },
  { id: 2, name: "Gaming Hub", memberCount: 5678, icon: "/placeholder.svg?height=100&width=100" },
  { id: 3, name: "Book Club", memberCount: 345, icon: "/placeholder.svg?height=100&width=100" },
  { id: 4, name: "Music Lovers", memberCount: 2468, icon: "/placeholder.svg?height=100&width=100" },
]

export default function ServersPage(){
    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
        <h2 className="text-3xl font-bold tracking-tight">Servers</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {servers.map((server) => (
            <ServerCard key={server.id} server={server} />
          ))}
          <AddServerCard />
        </div>
      </div>
    )
}

function ServerCard({ server }: { server: { name: string; memberCount: number; icon: string } }) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{server.name}</CardTitle>
          <Avatar className="h-8 w-8 rounded-full">
            <AvatarImage src={server.icon} alt={server.name}/>
            <AvatarFallback>{server.name[0]}</AvatarFallback>
          </Avatar>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{server.memberCount.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">members</p>
        </CardContent>
        <CardFooter>
          <Button variant="outline" size="sm" className="w-full">
            Manage
          </Button>
        </CardFooter>
      </Card>
    )
  }
  
  function AddServerCard() {
    return (
      <Card className="flex flex-col items-center justify-center">
        <CardHeader>
          <CardTitle className="text-center">Add New Server</CardTitle>
        </CardHeader>
        <CardContent>
          <Button variant="outline" size="lg" className="aspect-square h-20 w-20">
            <PlusCircle className="h-10 w-10" />
            <span className="sr-only">Add Server</span>
          </Button>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-muted-foreground">Invite Intellicord to a new server</p>
        </CardFooter>
      </Card>
    )
  }  