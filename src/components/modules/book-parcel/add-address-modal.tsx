"use client";

import { useForm } from "@tanstack/react-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { toast } from "@/components/ui/toast";
import { useCreateAddress } from "@/hooks/customer.hook";
import {
  createAddressValidationSchema,
  CreateAddressValidationFormValues,
} from "@/validation/address.validation";
import { MapPin, Loader2, Home, Building2, Warehouse } from "lucide-react";

interface AddAddressModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccessCreated?: (newAddressId: string) => void;
  defaultLabel?: string;
}

export function AddAddressModal({
  open,
  onOpenChange,
  onSuccessCreated,
  defaultLabel = "Home",
}: AddAddressModalProps) {
  const { mutate: createAddr, isPending } = useCreateAddress();

  const form = useForm({
    defaultValues: {
      label: defaultLabel || "Home",
      recipientName: "",
      phone: "",
      addressLine: "",
      area: "",
      city: "Dhaka",
      postalCode: "",
      isDefault: false,
    } as CreateAddressValidationFormValues,

    validators: {
      onSubmit: createAddressValidationSchema,
    },

    onSubmit: ({ value }) => {
      createAddr(
        {
          label: value.label.trim(),
          recipientName: value.recipientName.trim(),
          phone: value.phone.trim(),
          addressLine: value.addressLine.trim(),
          area: value.area.trim(),
          city: value.city.trim(),
          postalCode: value.postalCode?.trim() || undefined,
          isDefault: value.isDefault || false,
        },
        {
          onSuccess: (res) => {
            toast.add({
              title: "Address Saved",
              description: "New address added successfully.",
              type: "success",
            });
            form.reset();
            onOpenChange(false);
            if (res?.data?.id && onSuccessCreated) {
              onSuccessCreated(res.data.id);
            }
          },
          onError: (err: any) => {
            toast.add({
              title: "Failed to Add Address",
              description:
                err?.data?.message || err?.message || "Could not save address.",
              type: "error",
            });
          },
        }
      );
    },
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2 text-primary mb-1">
            <MapPin className="w-5 h-5" />
            <DialogTitle>Add New Address</DialogTitle>
          </div>
          <DialogDescription>
            Enter address details to save it to your address book.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-4 pt-2"
        >
          {/* 1. Label Selection */}
          <form.Field name="label">
            {(field) => {
              const isInvalid =
                (field.state.meta.isTouched || form.state.isSubmitted) &&
                !field.state.meta.isValid;

              const labelOptions = [
                { id: "Home", icon: Home },
                { id: "Office", icon: Building2 },
                { id: "Warehouse", icon: Warehouse },
              ];

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Address Label *</FieldLabel>
                  <div className="grid grid-cols-3 gap-2">
                    {labelOptions.map((opt) => {
                      const Icon = opt.icon;
                      const isSelected = field.state.value === opt.id;
                      return (
                        <button
                          type="button"
                          key={opt.id}
                          onClick={() => field.handleChange(opt.id)}
                          className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                            isSelected
                              ? "border-primary bg-primary/10 text-primary font-semibold ring-1 ring-primary"
                              : "border-border hover:bg-muted text-muted-foreground"
                          }`}
                        >
                          <Icon className="w-3.5 h-3.5" />
                          {opt.id}
                        </button>
                      );
                    })}
                  </div>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          {/* 2. Recipient Name & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <form.Field name="recipientName">
              {(field) => {
                const isInvalid =
                  (field.state.meta.isTouched || form.state.isSubmitted) &&
                  !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Recipient Name *</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      placeholder="e.g. John Doe"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                    />
                    {isInvalid && <FieldError errors={field.state.meta.errors} />}
                  </Field>
                );
              }}
            </form.Field>

            <form.Field name="phone">
              {(field) => {
                const isInvalid =
                  (field.state.meta.isTouched || form.state.isSubmitted) &&
                  !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Phone Number *</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      placeholder="01XXXXXXXXX"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                    />
                    {isInvalid && <FieldError errors={field.state.meta.errors} />}
                  </Field>
                );
              }}
            </form.Field>
          </div>

          {/* 3. Area & City */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <form.Field name="area">
              {(field) => {
                const isInvalid =
                  (field.state.meta.isTouched || form.state.isSubmitted) &&
                  !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Area / Thana *</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      placeholder="e.g. Dhanmondi, Banani"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                    />
                    {isInvalid && <FieldError errors={field.state.meta.errors} />}
                  </Field>
                );
              }}
            </form.Field>

            <form.Field name="city">
              {(field) => {
                const isInvalid =
                  (field.state.meta.isTouched || form.state.isSubmitted) &&
                  !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>City / District *</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      placeholder="e.g. Dhaka, Chittagong"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                    />
                    {isInvalid && <FieldError errors={field.state.meta.errors} />}
                  </Field>
                );
              }}
            </form.Field>
          </div>

          {/* 4. Address Line */}
          <form.Field name="addressLine">
            {(field) => {
              const isInvalid =
                (field.state.meta.isTouched || form.state.isSubmitted) &&
                !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>
                    Street Address / House / Flat *
                  </FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    placeholder="e.g. House #12, Road #4, Block #B"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          {/* 5. Postal Code */}
          <form.Field name="postalCode">
            {(field) => {
              const isInvalid =
                (field.state.meta.isTouched || form.state.isSubmitted) &&
                !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>
                    Postal Code (Optional)
                  </FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    placeholder="e.g. 1205"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          <DialogFooter className="mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Save Address
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
