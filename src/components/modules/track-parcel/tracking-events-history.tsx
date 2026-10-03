"use client";

import React from "react";
import { TrackingEventItem } from "@/types/courier-task.type";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { History, MapPin, Calendar, Clock, CheckCircle2 } from "lucide-react";

interface TrackingEventsHistoryProps {
  events: TrackingEventItem[];
}

export default function TrackingEventsHistory({
  events,
}: TrackingEventsHistoryProps) {
  if (!events || events.length === 0) {
    return (
      <Card className="border shadow-xs">
        <CardHeader>
          <CardTitle className="text-sm flex items-center gap-2">
            <History className="w-4 h-4 text-primary" /> Tracking History
          </CardTitle>
        </CardHeader>
        <CardContent className="py-8 text-center text-muted-foreground text-xs">
          No live tracking events recorded yet. Updates will appear as the courier moves.
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border shadow-xs">
      <CardHeader className="pb-3 border-b">
        <CardTitle className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
          <History className="w-4 h-4 text-primary" /> Live Milestone Updates
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="relative pl-6 space-y-6 border-l-2 border-primary/20 ml-2">
          {events.map((evt, idx) => {
            const isLatest = idx === 0;

            return (
              <div key={evt.id || idx} className="relative group">
                {/* Stepper Dot */}
                <div
                  className={`absolute -left-[31px] top-1 w-4 h-4 rounded-full border-2 bg-background flex items-center justify-center transition-transform ${
                    isLatest
                      ? "border-primary bg-primary/20 ring-4 ring-primary/10 scale-110"
                      : "border-muted-foreground/30"
                  }`}
                >
                  <div
                    className={`w-1.5 h-1.5 rounded-full ${
                      isLatest ? "bg-primary" : "bg-muted-foreground/40"
                    }`}
                  />
                </div>

                {/* Content */}
                <div className="space-y-1.5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-foreground">
                        {evt.status.replace(/_/g, " ")}
                      </span>
                      {isLatest && (
                        <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.2 rounded-full font-semibold border border-primary/20">
                          Latest
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-muted-foreground flex items-center gap-1 font-mono">
                      <Clock className="w-3 h-3" />
                      {new Date(evt.createdAt).toLocaleString(undefined, {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>

                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {evt.description}
                  </p>

                  {evt.location && (
                    <div className="flex items-center gap-1 text-[11px] text-muted-foreground/80 font-medium pt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-primary/70 shrink-0" />
                      <span>{evt.location}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
