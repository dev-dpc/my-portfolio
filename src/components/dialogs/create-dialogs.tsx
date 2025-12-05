import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { 
  Loader2,
} from 'lucide-react';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// Timesheet form schema and component (same as before)
const timesheetSchema = z.object({
  date: z.string().min(1, {
    message: 'Date is required.',
  }),
  startTime: z.string().min(1, {
    message: 'Start time is required.',
  }),
  endTime: z.string().min(1, {
    message: 'End time is required.',
  }),
  project: z.string().min(2, {
    message: 'Project must be at least 2 characters.',
  }),
  task: z.string().min(2, {
    message: 'Task must be at least 2 characters.',
  }),
  description: z.string().min(5, {
    message: 'Description must be at least 5 characters.',
  }),
}).refine((data) => {
  const start = new Date(`${data.date}T${data.startTime}`);
  const end = new Date(`${data.date}T${data.endTime}`);
  return end > start;
}, {
  message: 'End time must be after start time.',
  path: ['endTime'],
});

export function TimesheetDialog({ isOpen, onOpenChange }: { isOpen: boolean; onOpenChange: (open: boolean) => void }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<z.infer<typeof timesheetSchema>>({
    resolver: zodResolver(timesheetSchema),
    defaultValues: {
      date: new Date().toISOString().split('T')[0],
      startTime: '09:00',
      endTime: '17:00',
      project: '',
      task: '',
      description: '',
    },
  });

  const calculateHours = (date: string, startTime: string, endTime: string) => {
    if (!date || !startTime || !endTime) return 0;
    
    const start = new Date(`${date}T${startTime}`);
    const end = new Date(`${date}T${endTime}`);
    const diffMs = end.getTime() - start.getTime();
    const diffHours = diffMs / (1000 * 60 * 60);
    
    return Math.max(0, Math.round(diffHours * 100) / 100);
  };

  const watchedValues = form.watch(['date', 'startTime', 'endTime']);
  const hoursWorked = calculateHours(watchedValues[0], watchedValues[1], watchedValues[2]);

  async function onSubmit(values: z.infer<typeof timesheetSchema>) {
    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const submissionData = {
        ...values,
        hoursWorked,
      };
      
      console.log("Timesheet submitted:", submissionData);
      
      toast.success('Success!', {
        description: `Timesheet for ${hoursWorked} hours has been submitted successfully.`,
      });
      
      form.reset();
      onOpenChange(false);
    } catch (error) {
      console.error("Submission failed:", error);
      toast.error('Error', {
        description: 'Failed to submit timesheet. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create Timesheet</DialogTitle>
          <DialogDescription>
            Log your work hours and activities for time tracking.
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} className="w-full" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="flex flex-col">
                <FormLabel className="text-sm font-medium mb-2">Hours Worked</FormLabel>
                <div className="h-10 px-3 py-2 bg-muted rounded-md flex items-center text-sm">
                  {hoursWorked} hours
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="startTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Time</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} className="w-full" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="endTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End Time</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} className="w-full" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="project"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a project" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="project-alpha">Project Alpha</SelectItem>
                      <SelectItem value="project-beta">Project Beta</SelectItem>
                      <SelectItem value="project-gamma">Project Gamma</SelectItem>
                      <SelectItem value="maintenance">Maintenance</SelectItem>
                      <SelectItem value="training">Training</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="task"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Task</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Frontend development, Bug fixes, Meeting" {...field} />
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
                    <Textarea 
                      placeholder="Describe what you worked on in detail..." 
                      {...field} 
                      rows={4} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                'Submit Timesheet'
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export function LeaveRequestDialog({ isOpen, onOpenChange }: { isOpen: boolean; onOpenChange: (open: boolean) => void }) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Request Leave</DialogTitle>
          <DialogDescription>Submit a leave request form here.</DialogDescription>
        </DialogHeader>
        <p>Leave request form would go here...</p>
      </DialogContent>
    </Dialog>
  );
}