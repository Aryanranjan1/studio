import { Shell } from '@/components/shells/shell';
import { PageHeader, PageHeaderDescription, PageHeaderHeading } from '@/components/page-header';

interface AdminDashboardShellProps {
    children: React.ReactNode;
    title: string;
    description?: string;
}

export function AdminDashboardShell({ children, title, description }: AdminDashboardShellProps) {
    return (
        <Shell variant="sidebar" className="p-4">
            <PageHeader>
                <PageHeaderHeading>{title}</PageHeaderHeading>
                {description && <PageHeaderDescription>{description}</PageHeaderDescription>}
            </PageHeader>
            <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
                {children}
            </main>
        </Shell>
    );
}