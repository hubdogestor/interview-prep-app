import DashboardPageLayout from "@/components/dashboard/layout"
import MessageIcon from "@/components/icons/message"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

const speeches = [
  {
    id: 1,
    title: "FULL CV SPEECH - TECHNICAL ROLE",
    jobType: "Senior Engineer",
    version: "v3.2",
    duration: "3-4 min",
    focus: ["Technical Leadership", "Architecture", "Team Building"],
    lastEdited: "2 days ago",
    language: "PT/EN",
  },
  {
    id: 2,
    title: "PRODUCT-FOCUSED SPEECH",
    jobType: "Product Engineer",
    version: "v2.1",
    duration: "2-3 min",
    focus: ["Product Thinking", "User Impact", "Cross-functional"],
    lastEdited: "1 week ago",
    language: "PT/EN",
  },
  {
    id: 3,
    title: "STARTUP PITCH",
    jobType: "Founding Engineer",
    version: "v1.5",
    duration: "2 min",
    focus: ["Versatility", "Fast Learning", "Ownership"],
    lastEdited: "3 weeks ago",
    language: "EN",
  },
  {
    id: 4,
    title: "LEADERSHIP SPEECH",
    jobType: "Engineering Manager",
    version: "v2.0",
    duration: "3-4 min",
    focus: ["People Management", "Strategy", "Mentoring"],
    lastEdited: "1 month ago",
    language: "PT/EN",
  },
]

export default function SpeechesPage() {
  return (
    <DashboardPageLayout
      header={{
        title: "Speeches",
        description: "Your complete narratives",
        icon: MessageIcon,
      }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {speeches.map((speech) => (
          <Card key={speech.id} className="p-6 hover:bg-accent/50 transition-colors cursor-pointer group">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-display mb-2">{speech.title}</h3>
                <p className="text-sm text-muted-foreground uppercase mb-2">{speech.jobType}</p>
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="outline" className="uppercase">
                    {speech.version}
                  </Badge>
                  <Badge variant="secondary" className="uppercase">
                    {speech.duration}
                  </Badge>
                  <Badge className="uppercase">{speech.language}</Badge>
                </div>
              </div>
              <MessageIcon className="size-8 text-primary opacity-50 group-hover:opacity-100 transition-opacity" />
            </div>

            <div className="mb-4">
              <p className="text-xs text-muted-foreground uppercase mb-2">Focus Areas:</p>
              <div className="flex flex-wrap gap-2">
                {speech.focus.map((item) => (
                  <Badge key={item} variant="secondary" className="text-xs">
                    {item}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="text-xs text-muted-foreground uppercase mb-4">Last edited: {speech.lastEdited}</div>

            <div className="flex gap-2">
              <Button variant="default" size="sm" className="flex-1">
                VIEW
              </Button>
              <Button variant="outline" size="sm">
                TELEPROMPTER
              </Button>
              <Button variant="ghost" size="sm">
                EDIT
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <button className="p-4 border border-dashed border-border hover:border-primary hover:bg-accent/50 rounded-lg transition-colors uppercase text-sm font-display">
          + CREATE NEW SPEECH
        </button>
        <button className="p-4 border border-dashed border-border hover:border-chart-1 hover:bg-chart-1/10 rounded-lg transition-colors uppercase text-sm font-display text-chart-1">
          ✨ GENERATE WITH AI
        </button>
      </div>
    </DashboardPageLayout>
  )
}
