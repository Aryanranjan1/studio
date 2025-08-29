import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function DashboardPage() {
    return (
        <div>
            <h1 className="text-3xl font-bold tracking-tight mb-4">Dashboard</h1>
            <Card>
                <CardHeader>
                    <CardTitle>Welcome to Your Admin Panel</CardTitle>
                    <CardDescription>This is your central hub for managing all the content on the AMpire Studio website.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>
                        From here, you can manage portfolio projects, write articles, view contact messages, update testimonials, and configure site settings.
                    </p>
                    <p className="mt-4 text-sm text-muted-foreground">
                        Select a section from the sidebar on the left to get started.
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}
