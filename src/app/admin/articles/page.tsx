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
import { deleteArticle, seedArticles } from "@/lib/firestore";
import { getArticles } from "@/lib/data";
import type { Article } from "@/lib/data";
import { useToast } from "@/hooks/use-toast";
import { ArticleForm } from "@/components/article-form";
import { PlusCircle, Edit, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [articleToDelete, setArticleToDelete] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const init = async () => {
      await seedArticles();
      const unsubscribe = getArticles((fetchedArticles) => {
        setArticles(fetchedArticles);
        setLoading(false);
      });
      return () => unsubscribe && unsubscribe();
    };
    init();
  }, []);

  const handleAddClick = () => {
    setSelectedArticle(null);
    setIsFormOpen(true);
  };

  const handleEditClick = (article: Article) => {
    setSelectedArticle(article);
    setIsFormOpen(true);
  };
  
  const handleDeleteClick = (articleId: string) => {
    setArticleToDelete(articleId);
    setIsAlertOpen(true);
  };
  
  const confirmDelete = async () => {
      if (!articleToDelete) return;
      try {
          await deleteArticle(articleToDelete);
          toast({
              title: "Success",
              description: "Article deleted successfully.",
          });
          // The onSnapshot listener will auto-update the UI
      } catch (error) {
          toast({
              title: "Error",
              description: "Failed to delete article.",
              variant: "destructive",
            });
        } finally {
            setIsAlertOpen(false);
            setArticleToDelete(null);
        }
    };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Articles</h1>
          <p className="text-muted-foreground">
            Write and manage your blog articles here.
          </p>
        </div>
        <Button onClick={handleAddClick}>
          <PlusCircle className="mr-2" />
          Add Article
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
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {articles.map((article) => (
                    <TableRow key={article.id}>
                    <TableCell className="font-medium">{article.title}</TableCell>
                    <TableCell className="text-muted-foreground">/articles/{article.slug}</TableCell>
                    <TableCell>
                        <Badge variant={article.status === 'published' ? 'default' : 'secondary'}>
                            {article.status}
                        </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                        <Button variant="ghost" size="icon" onClick={() => handleEditClick(article)}>
                            <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDeleteClick(article.id)}>
                            <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                    </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </div>
      )}

      <ArticleForm
        isOpen={isFormOpen}
        setIsOpen={setIsFormOpen}
        article={selectedArticle}
        onFinished={() => { /* Listener will handle update */ }}
      />

        <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete this article.
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
