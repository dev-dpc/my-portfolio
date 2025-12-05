import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const mockPaystubs = [
  { id: 'ps-2025-10', date: '2025-10-31', amount: '$3,500.00' },
  { id: 'ps-2025-09', date: '2025-09-30', amount: '$3,450.00' },
  { id: 'ps-2025-08', date: '2025-08-31', amount: '$3,600.00' },
];

export function ViewPaystubDialog({ isOpen, onOpenChange }: { isOpen: boolean; onOpenChange: (open: boolean) => void }) {
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleDownload = async (id: string) => {
    try {
      setLoadingId(id);
      // simulate download
      await new Promise((resolve) => setTimeout(resolve, 800));
      toast.success('Download ready', { description: `Paystub ${id} downloaded (simulated).` });
    } catch (error) {
      console.error(error);
      toast.error('Failed to download paystub');
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[560px]">
        <DialogHeader>
          <DialogTitle>Paystubs</DialogTitle>
          <DialogDescription>Recent paystubs for your account.</DialogDescription>
        </DialogHeader>

        <div className="mt-4 space-y-3">
          {mockPaystubs.map((p) => (
            <div key={p.id} className="flex items-center justify-between rounded-md border p-3">
              <div>
                <div className="font-medium">{p.date}</div>
                <div className="text-sm text-muted-foreground">{p.amount}</div>
              </div>
              <div>
                <Button size="sm" onClick={() => handleDownload(p.id)} disabled={loadingId === p.id}>
                  {loadingId === p.id ? 'Downloading...' : 'Download'}
                </Button>
              </div>
            </div>
          ))}
        </div>

      </DialogContent>
    </Dialog>
  );
}
