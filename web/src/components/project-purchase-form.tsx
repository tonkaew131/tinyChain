"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface ProjectPurchaseFormProps {
  projectId: number
  price: number
  availableCredits: number
}

export function ProjectPurchaseForm({ projectId, price, availableCredits }: ProjectPurchaseFormProps) {
  const [quantity, setQuantity] = useState(1)
  const [isLoading, setIsLoading] = useState(false)

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value)
    if (!isNaN(value) && value > 0 && value <= availableCredits) {
      setQuantity(value)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // This would be replaced with actual checkout logic
    window.location.href = `/checkout?project=${projectId}&quantity=${quantity}`
  }

  const totalPrice = quantity * price

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="quantity">Number of Credits (tons CO₂e)</Label>
        <Input
          id="quantity"
          type="number"
          min={1}
          max={availableCredits}
          value={quantity}
          onChange={handleQuantityChange}
        />
        <p className="text-xs text-muted-foreground">{availableCredits.toLocaleString()} credits available</p>
      </div>

      <div className="space-y-1">
        <div className="flex justify-between">
          <span>Price per credit:</span>
          <span>${price.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-bold">
          <span>Total price:</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Processing..." : "Purchase Credits"}
      </Button>

      <p className="text-xs text-center text-muted-foreground">By purchasing, you agree to our terms and conditions.</p>
    </form>
  )
}

