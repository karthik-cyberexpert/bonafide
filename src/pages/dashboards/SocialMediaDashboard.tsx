import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar } from "@/components/ui/calendar";
import { ThumbsUp, MessageSquare, Share2, Users } from "lucide-react";
import { useState } from "react";

const SocialMediaDashboard = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Social Media Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Followers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">75.3K</div>
            <p className="text-xs text-muted-foreground">+1,200 this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Engagement Rate</CardTitle>
            <ThumbsUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.2%</div>
            <p className="text-xs text-muted-foreground">+0.2% from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Mentions</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45</div>
            <p className="text-xs text-muted-foreground">in the last 24 hours</p>
          </CardContent>
        </Card>
         <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Shares</CardTitle>
            <Share2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1.2K</div>
            <p className="text-xs text-muted-foreground">+300 this month</p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="md:col-span-2 space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">Your Company</p>
                <p className="text-sm text-muted-foreground">2 hours ago</p>
              </div>
            </CardHeader>
            <CardContent>
              <p>Excited to launch our new dashboard feature! It's designed to give you all the insights you need at a glance. #React #WebDev #UI</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="ghost" size="sm"><ThumbsUp className="mr-2 h-4 w-4" /> 1.2k Likes</Button>
              <Button variant="ghost" size="sm"><MessageSquare className="mr-2 h-4 w-4" /> 34 Comments</Button>
              <Button variant="ghost" size="sm"><Share2 className="mr-2 h-4 w-4" /> 112 Shares</Button>
            </CardFooter>
          </Card>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Content Calendar</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SocialMediaDashboard;