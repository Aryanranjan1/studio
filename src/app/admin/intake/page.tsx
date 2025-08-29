"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { deleteIntake } from "@/lib/firestore";
import { getIntakes } from "@/lib/data";
import type { Intake } from "@/lib/data";
import { useToast } from "@/hooks/use-toast";
import { Trash2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

const DetailItem = ({ label, value }: { label: string; value: string | string[] | undefined }) => {
    if (!value || (Array.isArray(value) && value.length === 0)) return null;
    const displayValue = Array.isArray(value) ? value.join(', ') : value;
    return (
        <div className="grid grid-cols-3 gap-2 py-2">
            <p className="font-semibold text-muted-foreground">{label}</p>
            <p className="col-span-2">{displayValue}</p>
        </div>
    )
}

export default function IntakePage() {
  const [intakes, setIntakes] = useState<Intake[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [intakeToDelete, setIntakeToDelete] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const unsubscribe = getIntakes((fetchedIntakes) => {
      setIntakes(fetchedIntakes);
      setLoading(false);
    });
    return () => unsubscribe && unsubscribe();
  }, []);

  const handleDeleteClick = (intakeId: string) => {
    setIntakeToDelete(intakeId);
    setIsAlertOpen(true);
  };
  
  const confirmDelete = async () => {
    if (!intakeToDelete) return;
    try {
      await deleteIntake(intakeToDelete);
      toast({
        title: "Success",
        description: "Intake submission deleted successfully.",
      });
      // UI will update automatically via listener
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete submission.",
        variant: "destructive",
      });
    } finally {
      setIsAlertOpen(false);
      setIntakeToDelete(null);
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Project Intake Submissions</h1>
        <p className="text-muted-foreground">Review new client project inquiries here.</p>
      </div>

      {loading ? (
        <div className="space-y-4">
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-full" />
        </div>
      ) : intakes.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 border rounded-lg">
            <p className="text-lg font-semibold text-muted-foreground">No submissions yet.</p>
            <p className="text-sm text-muted-foreground">New project inquiries will appear here.</p>
        </div>
      ) : (
        <div className="border rounded-lg">
          <Accordion type="multiple" className="w-full">
            {intakes.map((intake) => (
              <AccordionItem value={intake.id} key={intake.id}>
                <AccordionTrigger className="px-4 py-2 hover:no-underline">
                    <div className="flex justify-between w-full items-center pr-4">
                        <div className="flex-1 text-left">
                            <p className="font-bold">{intake.fullName}</p>
                            <p className="text-sm text-muted-foreground">{intake.companyName}</p>
                        </div>
                        <Badge variant="secondary" className="mr-4 capitalize">{intake.budget}</Badge>
                        <p className="text-sm text-muted-foreground">{intake.submittedAt?.toLocaleDateString()}</p>
                    </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 py-2 bg-muted/50">
                    <div className="flex justify-between items-start">
                        <div className="flex-1 divide-y">
                            <DetailItem label="Email" value={intake.email} />
                            <DetailItem label="Phone" value={intake.phone} />
                            <DetailItem label="Current Website" value={intake.currentWebsite} />
                            <DetailItem label="Company Description" value={intake.companyDescription} />
                            <DetailItem label="Primary Purpose" value={intake.primaryPurpose} />
                            <DetailItem label="Target Audience" value={intake.targetAudience} />
                            <DetailItem label="Visitor Actions" value={intake.visitorActions} />
                            <DetailItem label="Success Metrics" value={intake.successMetrics} />
                            <DetailItem label="Design Adjectives" value={intake.designAdjectives} />
                            <DetailItem label="Liked Websites" value={intake.likedWebsites} />
                            <DetailItem label="Disliked Websites" value={intake.dislikedWebsites} />
                            <DetailItem label="Logo & Branding" value={intake.logoAndBranding} />
                            <DetailItem label="Needed Pages" value={intake.neededPages} />
                            <DetailItem label="Content Provider" value={intake.contentProvider} />
                            <DetailItem label="Needed Features" value={intake.neededFeatures} />
                            <DetailItem label="Other Features" value={intake.otherFeatures} />
                            <DetailItem label="Domain & Hosting" value={intake.domainAndHosting} />
                            <DetailItem label="Budget" value={intake.budget} />
                            <DetailItem label="Deadline" value={intake.deadline} />
                            <DetailItem label="Final Thoughts" value={intake.finalThoughts} />
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => handleDeleteClick(intake.id)}>
                            <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                    </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      )}

      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this submission.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
