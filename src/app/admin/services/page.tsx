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
import { deleteService, seedServices } from "@/lib/firestore";
import { getServices } from "@/lib/data";
import type { Service } from "@/lib/data";
import { useToast } from "@/hooks/use-toast";
import { ServiceForm } from "@/components/service-form";
import { PlusCircle, Edit, Trash2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [serviceToDelete, setServiceToDelete] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const init = async () => {
      await seedServices();
      const unsubscribe = getServices((fetchedServices) => {
        setServices(fetchedServices);
        setLoading(false);
      });
      return () => unsubscribe && unsubscribe();
    };
    init();
  }, []);

  const handleAddClick = () => {
    setSelectedService(null);
    setIsFormOpen(true);
  };

  const handleEditClick = (service: Service) => {
    setSelectedService(service);
    setIsFormOpen(true);
  };
  
  const handleDeleteClick = (serviceId: string) => {
    setServiceToDelete(serviceId);
    setIsAlertOpen(true);
  };
  
  const confirmDelete = async () => {
      if (!serviceToDelete) return;
      try {
          await deleteService(serviceToDelete);
          toast({
              title: "Success",
              description: "Service deleted successfully.",
          });
          // onSnapshot will handle the UI update automatically
      } catch (error) {
          toast({
              title: "Error",
              description: "Failed to delete service.",
              variant: "destructive",
            });
        } finally {
            setIsAlertOpen(false);
            setServiceToDelete(null);
        }
    };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Services</h1>
          <p className="text-muted-foreground">
            Manage the services your studio offers.
          </p>
        </div>
        <Button onClick={handleAddClick} disabled={loading}>
          <PlusCircle className="mr-2" />
          Add Service
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
                    <TableHead>Title</TableHead>
                    <TableHead>Slug</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {services.map((service) => (
                    <TableRow key={service.id}>
                    <TableCell className="font-medium">{service.title}</TableCell>
                    <TableCell className="text-muted-foreground">/services/{service.slug}</TableCell>
                    <TableCell className="text-right">
                        <Button variant="ghost" size="icon" onClick={() => handleEditClick(service)}>
                            <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDeleteClick(service.id)}>
                            <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                    </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </div>
      )}

      <ServiceForm
        isOpen={isFormOpen}
        setIsOpen={setIsFormOpen}
        service={selectedService}
        onFinished={() => { /* Listener will handle update */ }}
      />

        <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete this service.
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
