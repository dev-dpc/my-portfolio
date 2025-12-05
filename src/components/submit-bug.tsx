import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Bug, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';

// Define the validation schema for the form
const formSchema = z.object({
  title: z.string().min(2, {
    message: 'Title must be at least 2 characters.',
  }).max(50, {
    message: 'Title cannot exceed 50 characters.'
  }),
  description: z.string().min(5, {
    message: 'Description must be at least 5 characters.',
  }),
});

export function BugReportForm({ onOpenChange }: { onOpenChange: (open: boolean) => void }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
    },
  });

  // Simulate a form submission to a backend API
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log("Bug report submitted:", values);

      // Show a success toast notification using sonner's toast.success
      toast.success('Success!', {
        description: 'Thank you for submitting a bug report. We appreciate your feedback.',
      });

      // Reset the form and close the dialog
      form.reset();
      onOpenChange(false);
    } catch (error) {
      console.error("Submission failed:", error);
      toast.error('Error', {
        description: 'Failed to submit bug report. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Brief title of the bug" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Kindly describe what happened in detail" {...field} rows={6} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            'Submit Bug'
          )}
        </Button>
      </form>
    </Form>
  );
}

export function SubmitBugMenuItem() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <DropdownMenuItem
          className="cursor-pointer"
          onSelect={(e) => {
            e.preventDefault();
            setIsOpen(true);
          }}
        >
          <Bug className="mr-2 h-4 w-4" />
          Submit a bug
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Submit a Bug</DialogTitle>
          <DialogDescription>
            Found an issue? Please help us by describing it below.
          </DialogDescription>
        </DialogHeader>
        <BugReportForm onOpenChange={setIsOpen} />
      </DialogContent>
    </Dialog>
  );
}