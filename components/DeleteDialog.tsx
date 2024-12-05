import { useSalesStore } from "@/app/useSalesStore";
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
import { useToast } from "@/hooks/use-toast";

const DeleteDialog = () => {
  const {
    deleteSale,
    selectedSale,
    isLoading,
    openDeleteDialog,
    setOpenDeleteDialog,
  } = useSalesStore();
  const { toast } = useToast();

  async function deleteSaleHandler() {
    if (selectedSale) {
      const result = await deleteSale(selectedSale.id);
      if (result) {
        toast({
          title: "Sale deleted",
          description: "The sale has been deleted successfully",
        });
        setOpenDeleteDialog(false);
      }
    }
  }

  return (
    <AlertDialog
      open={openDeleteDialog}
      onOpenChange={(open) => setOpenDeleteDialog(open)}
    >
      <AlertDialogContent className="p-8">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl">
            Are you absolutely sure?
          </AlertDialogTitle>
          <AlertDialogDescription className="mt-2">
            This action cannot be undone. This will permanently delete your
            sale.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="mt-8">
          <AlertDialogCancel onClick={() => setOpenDeleteDialog(false)}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction onClick={deleteSaleHandler}>
            {isLoading ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteDialog;
