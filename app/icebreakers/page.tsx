import DashboardPageLayout from "@/components/dashboard/layout"
import MicrophoneIcon from "@/components/icons/microphone"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

const icebreakerTypes = [
  {
    id: 1,
    title: "30 SECONDS PITCH",
    description: "Quick introduction for networking events",
    versions: 3,
    duration: "30s",
    category: "short",
  },
  {
    id: 2,
    title: "1 MINUTE ELEVATOR",
    description: "Standard elevator pitch for interviews",
    versions: 5,
    duration: "1min",
    category: "medium",
  },
  {
    id: 3,
    title: "2 MINUTES DEEP DIVE",
    description: "Detailed background and experience",
    versions: 2,
    duration: "2min",
    category: "long",
  },
  {
    id: 4,
    title: "TECHNICAL FOCUS",
    description: "Engineering-focused introduction",
    versions: 4,
    duration: "1-2min",
    category: "technical",
  },
  {
    id: 5,
    title: "LEADERSHIP FOCUS",
    description: "Management and leadership experience",
    versions: 3,
    duration: "1-2min",
    category: "leadership",
  },
]

export default function IcebreakersPage() {
  return (
    <DashboardPageLayout
      header={{
        title: "Icebreakers",
        description: "Your introduction arsenal",
        icon: MicrophoneIcon,
      }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {icebreakerTypes.map((icebreaker) => (
          <Card key={icebreaker.id} className="p-6 hover:bg-accent/50 transition-colors cursor-pointer group">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-display mb-2">{icebreaker.title}</h3>
                <p className="text-sm text-muted-foreground uppercase">{icebreaker.description}</p>
              </div>
              <MicrophoneIcon className="size-8 text-primary opacity-50 group-hover:opacity-100 transition-opacity" />
            </div>

            <div className="flex items-center gap-3 mb-4">
              <Badge variant="outline" className="uppercase">
                {icebreaker.versions} versions
              </Badge>
              <Badge variant="secondary" className="uppercase">
                {icebreaker.duration}
              </Badge>
              <Badge className="uppercase">{icebreaker.category}</Badge>
            </div>

            <div className="flex gap-2">
              <Button variant="default" size="sm" className="flex-1">
                VIEW VERSIONS
              </Button>
              <Button variant="outline" size="sm">
                PRACTICE
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-6">
        <Button variant="outline" className="w-full bg-transparent">
          + ADD NEW ICEBREAKER TYPE
        </Button>
      </div>
    </DashboardPageLayout>
  )
}
