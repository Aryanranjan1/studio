"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { deleteTestimonial, seedTestimonials } from "@/lib/firestore";
import { getTestimonials } from "@/lib/data";
import type { Testimonial } from "@/lib/data";
import { useToast } from "@/hooks/use-toast";
import { PlusCircle, Edit, Trash2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { TestimonialForm } from "@/components/testimonial-form";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null);
  const [testimonialToDelete, setTestimonialToDelete] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const init = async () => {
      await seedTestimonials();
      const unsubscribe = getTestimonials((fetchedTestimonials) => {
        setTestimonials(fetchedTestimonials);
        setLoading(false);
      });
      return () => unsubscribe && unsubscribe();
    };
    init();
  }, []);

  const handleAddClick = () => {
    setSelectedTestimonial(null);
    setIsFormOpen(true);
  };

  const handleEditClick = (testimonial: Testimonial) => {
    setSelectedTestimonial(testimonial);
    setIsFormOpen(true);
  };
  
  const handleDeleteClick = (testimonialId: string) => {
    setTestimonialToDelete(testimonialId);
    setIsAlertOpen(true);
  };
  
  const confirmDelete = async () => {
      if (!testimonialToDelete) return;
      try {
          await deleteTestimonial(testimonialToDelete);
          toast({
              title: "Success",
              description: "Testimonial deleted successfully.",
          });
          // onSnapshot will handle the UI update automatically
      } catch (error) {
          toast({
              title: "Error",
              description: "Failed to delete testimonial.",
              variant: "destructive",
            });
        } finally {
            setIsAlertOpen(false);
            setTestimonialToDelete(null);
        }
    };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Testimonials</h1>
          <p className="text-muted-foreground">
            Manage client testimonials here.
          </p>
        </div>
        <Button onClick={handleAddClick}>
          <PlusCircle className="mr-2" />
          Add Testimonial
        </Button>
      </div>

      {loading ? (
        <div className="space-y-2">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
        </div>
      ) : (
        <div className="border rounded-lg">
            <Table>
                <TableHeader>
                <TableRow>
                    <TableHead>Author</TableHead>
                    <TableHead>Quote</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {testimonials.map((testimonial) => (
                    <TableRow key={testimonial.id}>
                    <TableCell className="font-medium">
                        <div className="flex items-center gap-3">
                            <Avatar>
                                <AvatarImage src={testimonial.avatarUrl} />
                                <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-bold">{testimonial.name}</p>
                                <p className="text-sm text-muted-foreground">{testimonial.title}, {testimonial.company}</p>
                            </div>
                        </div>
                    </TableCell>
                    <TableCell className="max-w-md">
                       <p className="truncate italic">"{testimonial.quote}"</p>
                    </TableCell>
                    <TableCell className="text-right">
                        <Button variant="ghost" size="icon" onClick={() => handleEditClick(testimonial)}>
                            <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDeleteClick(testimonial.id)}>
                            <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                    </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </div>
      )}

      <TestimonialForm
        isOpen={isFormOpen}
        setIsOpen={setIsFormOpen}
        testimonial={selectedTestimonial}
        onFinished={() => { /* Listener will handle update */ }}
      />

        <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete this testimonial.
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
