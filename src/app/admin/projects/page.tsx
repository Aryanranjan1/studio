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
import { deleteProject, seedProjects } from "@/lib/firestore";
import { getProjects } from "@/lib/data";
import type { Project } from "@/lib/data";
import { useToast } from "@/hooks/use-toast";
import { ProjectForm } from "@/components/project-form";
import { PlusCircle, Edit, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projectToDelete, setProjectToDelete] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const init = async () => {
      await seedProjects();
      const unsubscribe = getProjects((fetchedProjects) => {
        setProjects(fetchedProjects);
        setLoading(false);
      });
      return () => unsubscribe && unsubscribe();
    };
    init();
  }, []);

  const handleAddClick = () => {
    setSelectedProject(null);
    setIsFormOpen(true);
  };

  const handleEditClick = (project: Project) => {
    setSelectedProject(project);
    setIsFormOpen(true);
  };
  
  const handleDeleteClick = (projectId: string) => {
    setProjectToDelete(projectId);
    setIsAlertOpen(true);
  };
  
  const confirmDelete = async () => {
    if (!projectToDelete) return;
    const originalProject = projects.find(p => p.id === projectToDelete);
    // Optimistic deletion
    setProjects(projects.filter(p => p.id !== projectToDelete));
    setIsAlertOpen(false);

    try {
        await deleteProject(projectToDelete);
        toast({
            title: "Success",
            description: "Project deleted successfully.",
        });
        setProjectToDelete(null);
    } catch (error) {
        toast({
            title: "Error",
            description: "Failed to delete project.",
            variant: "destructive",
        });
        // Revert if deletion fails
        if(originalProject) {
            setProjects(prev => [...prev, originalProject].sort((a,b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0)));
        }
        setProjectToDelete(null);
      }
    };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
          <p className="text-muted-foreground">
            Manage your portfolio projects here.
          </p>
        </div>
        <Button onClick={handleAddClick} disabled={loading}>
          <PlusCircle className="mr-2" />
          Add Project
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
                    <TableHead>Services</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {projects.map((project) => (
                    <TableRow key={project.id}>
                    <TableCell className="font-medium">{project.title}</TableCell>
                    <TableCell>
                        <div className="flex flex-wrap gap-1">
                            {project.services.map(s => <Badge key={s} variant="secondary">{s}</Badge>)}
                        </div>
                    </TableCell>
                     <TableCell>
                        <Badge variant={project.status === 'Completed' ? 'default' : 'secondary'}>
                            {project.status}
                        </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                        <Button variant="ghost" size="icon" onClick={() => handleEditClick(project)}>
                            <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDeleteClick(project.id)}>
                            <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                    </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </div>
      )}

      <ProjectForm
        isOpen={isFormOpen}
        setIsOpen={setIsFormOpen}
        project={selectedProject}
        onFinished={() => { /* Listener will handle update */ }}
      />

        <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete this project.
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
