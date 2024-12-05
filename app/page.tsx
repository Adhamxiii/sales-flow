"use client";
import DeleteDialog from "@/components/DeleteDialog";
import Navbar from "@/components/layout/Navbar";
import StatsCard from "@/components/StatsCard";
import TableArea from "@/components/tableArea/TableArea";
import { Card } from "@/components/ui/card";
import { useState } from "react";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="m-5 poppins">
      <DeleteDialog />
      <Card>
        <Navbar setSearchQuery={setSearchQuery} searchQuery={searchQuery} />
        <StatsCard />
        <TableArea searchQuery={searchQuery} />
      </Card>
    </div>
  );
}
