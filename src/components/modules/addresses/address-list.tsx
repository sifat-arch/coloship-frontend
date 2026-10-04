"use client";

import React, { useState } from "react";
import { useGetAddresses } from "@/hooks/customer.hook";
import { useGetMe } from "@/hooks/auth.hook";
import AddressCard from "./address-card";
import { AddAddressModal } from "@/components/modules/book-parcel/add-address-modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  MapPin,
  Plus,
  Search,
  Loader2,
  Building2,
  PackagePlus,
  AlertTriangle,
} from "lucide-react";
import Link from "next/link";

export default function AddressList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const { data: userData } = useGetMe();
  const isSuspended =
    userData?.data?.status === "SUSPENDED" || userData?.data?.status === "BLOCKED";

  const { data, isLoading } = useGetAddresses();
  const addresses = data?.data || [];

  const filteredAddresses = addresses.filter((addr) => {
    const term = searchTerm.toLowerCase().trim();
    if (!term) return true;
    return (
      addr.label?.toLowerCase().includes(term) ||
      addr.recipientName?.toLowerCase().includes(term) ||
      addr.phone?.toLowerCase().includes(term) ||
      addr.area?.toLowerCase().includes(term) ||
      addr.city?.toLowerCase().includes(term) ||
      addr.addressLine?.toLowerCase().includes(term)
    );
  });

  return (
    <div className="space-y-6">
      {/* Action Header & Search */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search saved addresses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>

        <Button
          onClick={() => setIsModalOpen(true)}
          className="gap-2 shadow-2xs"
          disabled={isSuspended}
          title={isSuspended ? "Account suspended: Cannot add address" : undefined}
        >
          {isSuspended ? (
            <>
              <AlertTriangle className="w-4 h-4 text-amber-500" /> Add Address (Suspended)
            </>
          ) : (
            <>
              <Plus className="w-4 h-4" /> Add New Address
            </>
          )}
        </Button>
      </div>

      {isSuspended && (
        <div className="p-3.5 rounded-xl border border-amber-300 bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 text-xs flex items-center gap-2.5">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
          <span>
            <strong>Account Suspended:</strong> Adding new addresses is disabled. You can still view your saved addresses.
          </span>
        </div>
      )}

      {/* Content Grid */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20 space-y-3">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Loading your address book...</p>
        </div>
      ) : addresses.length === 0 ? (
        // Empty State (No addresses yet)
        <div className="py-16 px-6 text-center space-y-4 bg-card border border-dashed rounded-2xl max-w-lg mx-auto">
          <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary mx-auto flex items-center justify-center shadow-2xs">
            <MapPin className="w-7 h-7" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-foreground">No Saved Addresses Yet</h3>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-xs mx-auto">
              Save your frequent pickup locations and delivery destinations to book parcels faster.
            </p>
          </div>
          <div className="pt-2">
            <Button
              onClick={() => setIsModalOpen(true)}
              className="gap-2"
              disabled={isSuspended}
              title={isSuspended ? "Account suspended: Cannot add address" : undefined}
            >
              {isSuspended ? (
                <>
                  <AlertTriangle className="w-4 h-4 text-amber-500" /> Adding Disabled (Suspended)
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" /> Add Your First Address
                </>
              )}
            </Button>
          </div>
        </div>
      ) : filteredAddresses.length === 0 ? (
        // Search Not Found
        <div className="py-12 text-center text-muted-foreground text-sm">
          No addresses matched your search query "{searchTerm}".
        </div>
      ) : (
        // Address Cards Grid
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredAddresses.map((addr) => (
            <AddressCard key={addr.id} address={addr} />
          ))}
        </div>
      )}

      {/* Add Address Modal with TanStack Form */}
      <AddAddressModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        defaultLabel="Home"
      />
    </div>
  );
}
