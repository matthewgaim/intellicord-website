"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

export function PathCrumbs() {
  const pathname = usePathname();
  let pathSegments = pathname.split("/").filter(Boolean);
  // dont show serverid when path is /dashboard/servers/serverid
  if (pathSegments.length > 2 && pathSegments[1] === "servers"){
    pathSegments = pathSegments.slice(0,2)
  }
  const formattedSegments = pathSegments.map(
    (segment) => segment.charAt(0).toUpperCase() + segment.slice(1)
  );

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {formattedSegments.map((segment, index) => {
          const href = "/" + pathSegments.slice(0, index + 1).join("/");
          const isLast = index === formattedSegments.length - 1;

          return (
            <React.Fragment key={href}>
              {index > 0 && <BreadcrumbSeparator />}
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{segment}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={href}>{segment}</BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
