"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import Link from "next/link";

interface APICardProps {
  api: {
    id: number;
    name: string;
    description: string;
    category: string;
    subscribed: number;
    latency: number | string | null;
    createdAt: string;
    tags: string[];
  };
}

export function APICard({ api }: APICardProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Card className="flex flex-col h-full transition-all duration-300 ease-in-out hover:translate-y-[-5px] hover:shadow-lg dark:hover:shadow-primary/20 bg-gradient-to-br from-card to-card/95 dark:from-card/80 dark:to-card/60 border border-border/50 hover:border-primary/50">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-lg font-semibold">
          <span className="text-primary">{api.name}</span>
          <Badge
            variant="outline"
            className="bg-primary/10 text-primary border-primary/30"
          >
            Demo
          </Badge>
        </CardTitle>
        <CardDescription className="line-clamp-3 text-muted-foreground">
          {api.description}
        </CardDescription>
        {api.description.length > 150 && (
          <div className="text-right">
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="link"
                  className="p-0 h-auto font-normal text-primary hover:text-primary/80"
                  onClick={(e) => e.stopPropagation()}
                >
                  Show more
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="text-primary">{api.name}</DialogTitle>
                </DialogHeader>
                <p className="text-muted-foreground">{api.description}</p>
                <DialogFooter>
                  <Button onClick={() => setIsOpen(false)}>Close</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        )}
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex flex-wrap gap-2 mb-2">
          {api.tags.map((tag, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="bg-secondary/50 text-secondary-foreground"
            >
              {tag}
            </Badge>
          ))}
        </div>
        <div className="text-sm text-muted-foreground">
          <span>
            Latency: {api?.latency ? `${api?.latency} ms` : "not given"}
          </span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center border-t border-border/30 pt-4">
        <span className="text-sm text-muted-foreground">
          Created: {api.createdAt}
        </span>
        <Link href={`/api/${api.id}`}>
          <Button
            variant="outline"
            className="hover:bg-primary hover:text-primary-foreground"
          >
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
