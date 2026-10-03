"use client";

import React from "react";
import { useGetMe } from "@/hooks/auth.hook";
import { useGetMyShipments, useGetAddresses } from "@/hooks/customer.hook";
import ProfileImageUploader from "./profile-image-uploader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  User,
  Mail,
  ShieldCheck,
  Calendar,
  Package,
  MapPin,
  ExternalLink,
  Lock,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";

export default function CustomerProfileView() {
  const { data: userData, isLoading: userLoading } = useGetMe();
  const user = userData?.data;

  // Additional overview metrics
  const { data: shipmentsData } = useGetMyShipments({ limit: 1 });
  const { data: addressesData } = useGetAddresses();

  const totalShipments = shipmentsData?.meta?.total || 0;
  const totalAddresses = addressesData?.data?.length || 0;

  if (userLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-3">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground">Loading your profile details...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 1. Hero Profile Banner */}
      <div className="p-6 md:p-8 rounded-2xl border bg-card shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
          {/* Profile Image Uploader with Camera Badge */}
          <ProfileImageUploader
            currentImageUrl={user?.imageUrl}
            fallbackName={user?.name || "Customer"}
            size="lg"
            editable={true}
          />

          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2.5">
              <h2 className="text-2xl font-bold tracking-tight capitalize text-foreground">
                {user?.name || "Customer User"}
              </h2>
              <span className="flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full border bg-emerald-500/10 text-emerald-600 border-emerald-500/20">
                <ShieldCheck className="w-3.5 h-3.5" />
                Verified Customer
              </span>
            </div>

            <p className="text-sm text-muted-foreground flex items-center gap-1.5">
              <Mail className="w-4 h-4 text-primary" /> {user?.email}
            </p>

            <div className="flex items-center gap-3 pt-1 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" /> Member Account
              </span>
              <span>•</span>
              <span className="font-semibold text-emerald-600">● Active</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 self-stretch sm:self-auto">
          <Link href="/customer/book-parcel" className="w-full sm:w-auto">
            <Button size="sm" className="w-full sm:w-auto gap-1.5 shadow-2xs">
              <Package className="w-4 h-4" /> Book New Parcel
            </Button>
          </Link>
        </div>
      </div>

      {/* 2. Account Metric Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card className="border shadow-xs hover:shadow-sm transition-shadow">
          <CardContent className="p-5 flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs font-medium text-muted-foreground">Total Bookings</p>
              <p className="text-2xl font-bold">{totalShipments}</p>
              <Link
                href="/customer/shipments"
                className="text-xs text-primary font-medium hover:underline inline-flex items-center gap-1 pt-1"
              >
                View all shipments <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center">
              <Package className="w-6 h-6" />
            </div>
          </CardContent>
        </Card>

        <Card className="border shadow-xs hover:shadow-sm transition-shadow">
          <CardContent className="p-5 flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs font-medium text-muted-foreground">Saved Addresses</p>
              <p className="text-2xl font-bold">{totalAddresses}</p>
              <Link
                href="/customer/addresses"
                className="text-xs text-primary font-medium hover:underline inline-flex items-center gap-1 pt-1"
              >
                Manage address book <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
              <MapPin className="w-6 h-6" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 3. Account Details & Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border shadow-xs">
          <CardHeader className="pb-3 border-b">
            <CardTitle className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
              <User className="w-4 h-4 text-primary" /> Personal Information
            </CardTitle>
            <CardDescription className="text-xs">
              Your registered identity details.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground">Full Name</label>
              <p className="text-sm font-semibold text-foreground">{user?.name || "N/A"}</p>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground">Email Address</label>
              <p className="text-sm font-semibold text-foreground">{user?.email || "N/A"}</p>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground">Account Role</label>
              <p className="text-xs font-semibold px-2.5 py-1 bg-muted rounded-md inline-block uppercase font-mono">
                {user?.role || "CUSTOMER"}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border shadow-xs">
          <CardHeader className="pb-3 border-b">
            <CardTitle className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
              <Lock className="w-4 h-4 text-primary" /> Security & Account Status
            </CardTitle>
            <CardDescription className="text-xs">
              Account verification and password management.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center justify-between p-3 rounded-xl border bg-muted/20">
              <div className="space-y-0.5">
                <p className="text-xs font-semibold">Email Verified</p>
                <p className="text-[11px] text-muted-foreground">
                  Your email is authenticated for order notifications.
                </p>
              </div>
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl border bg-muted/20">
              <div className="space-y-0.5">
                <p className="text-xs font-semibold">Profile Photo</p>
                <p className="text-[11px] text-muted-foreground">
                  Click the camera icon on your avatar to upload a new photo.
                </p>
              </div>
              <ProfileImageUploader
                currentImageUrl={user?.imageUrl}
                fallbackName={user?.name}
                size="sm"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
