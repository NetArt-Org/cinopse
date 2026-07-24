"use client"

import { Drawer } from "@base-ui/react/drawer"
import { X } from "lucide-react"

import { RegistrationForm } from "@/components/event/registration-form"
import { Button } from "@/components/ui/button"

export function MobileRegistrationDrawer() {
  return (
    <Drawer.Root>
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 p-4 shadow-[0_-8px_30px_rgb(15_23_42_/_0.08)] backdrop-blur lg:hidden">
        <Drawer.Trigger
          render={
            <Button className="h-12 w-full bg-blue-800 text-base text-white hover:bg-blue-900" />
          }
        >
          Register Now
        </Drawer.Trigger>
      </div>
      <Drawer.Portal>
        <Drawer.Backdrop className="fixed inset-0 z-50 bg-slate-950/35 lg:hidden" />
        <Drawer.Popup className="fixed inset-x-0 bottom-0 z-50 max-h-[88dvh] overflow-y-auto rounded-t-3xl bg-white p-4 shadow-2xl lg:hidden">
          <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-slate-200" />
          <div className="mb-3 flex items-center justify-between">
            <Drawer.Title className="text-base font-semibold text-slate-950">
              Register Now
            </Drawer.Title>
            <Drawer.Close
              render={
                <Button
                  aria-label="Close"
                  className="text-slate-600"
                  size="icon"
                  variant="ghost"
                />
              }
            >
              <X className="size-4" aria-hidden="true" />
            </Drawer.Close>
          </div>
          <Drawer.Description className="sr-only">
            CINOPSE 2026 registration form
          </Drawer.Description>
          <RegistrationForm />
        </Drawer.Popup>
      </Drawer.Portal>
    </Drawer.Root>
  )
}
