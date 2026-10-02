"use client";

import { ChangeEvent, Suspense, useState } from "react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useDebounce } from "@/hooks/debounce.hook";
import { UserParams, UserStatus } from "@/types/user.type";
import UserTable from "./user-table";
import UserSheet from "./user-sheet";
import UserTableSkeleton from "./user-table-skeleton";

const UserTabs = () => {
  const statusList: ["ALL" | UserStatus, string][] = [
    ["ALL", "All"],
    ["ACTIVE", "Active"],
    ["SUSPENDED", "Suspended"],
    ["BLOCKED", "Blocked"],
  ];

  const [tab, setTab] = useState<"ALL" | UserStatus>("ALL");
  const [roleFilter, setRoleFilter] = useState<string>("ALL");
  const [selectedId, setSelectedId] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [page, setPage] = useState(1);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
    setPage(1);
  };
  const debounceSearch = useDebounce(searchInput);

  const queryParams: UserParams = {
    page,
    limit: 10,
    ...(tab === "ALL" ? {} : { status: tab }),
    ...(roleFilter === "ALL" ? {} : { role: roleFilter }),
    ...(debounceSearch ? { searchTerm: debounceSearch } : {}),
  };

  const handleTabChange = (value: string) => {
    setTab(value as "ALL" | UserStatus);
    setPage(1);
  };

  const handleRoleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setRoleFilter(e.target.value);
    setPage(1);
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center mb-6">
        <div className="flex flex-1 flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <Input
            type="search"
            placeholder="Search by name or email..."
            className="w-full sm:w-72"
            value={searchInput}
            onChange={handleSearch}
          />

          <select
            value={roleFilter}
            onChange={handleRoleChange}
            aria-label="Filter by user role"
            className="h-10 text-sm border rounded-lg px-3 bg-background focus:outline-none focus:ring-2 focus:ring-primary w-full sm:w-40"
          >
            <option value="ALL">All Roles</option>
            <option value="CUSTOMER">Customer</option>
            <option value="COURIER">Courier</option>
            <option value="ADMIN">Admin</option>
          </select>
        </div>

        <Tabs value={tab} onValueChange={handleTabChange} className="w-full sm:w-auto">
          <TabsList className="grid grid-cols-4 sm:flex w-full">
            {statusList.map(([value, label]) => (
              <TabsTrigger value={value} key={value} className="text-xs sm:text-sm">
                {label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      <Suspense fallback={<UserTableSkeleton />}>
        <UserTable
          {...queryParams}
          handleReview={setSelectedId}
          handlePageChange={setPage}
        />
      </Suspense>

      <UserSheet
        selectedId={selectedId}
        onClose={() => setSelectedId("")}
        {...queryParams}
      />
    </>
  );
};

export default UserTabs;
