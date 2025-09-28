"use client"

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { motion } from 'framer-motion'

const kontaktSchema = z.object({
  firstname: z.string().min(1, 'Du måste ange ett Förnamn').max(50, 'Namnet får inte vara längre än 50 tecken'),
  lastname: z.string().min(1, 'Du måste ange ett efternamn').max(50, 'Efternamnet får inte vara längre än 50 tecken'),
  email: z.string().email('Epostadressen är ogiltig').min(1, 'E-postadress är obligatorisk'),
  message: z.string().min(1, 'Meddelande är obligatoriskt'),
  consent: z.boolean().refine(val => val === true, {
    message: 'Du måste godkänna lagring av dina uppgifter',
  }),
})

export function KontaktForm() {
  const form = useForm<z.infer<typeof kontaktSchema>>({
    resolver: zodResolver(kontaktSchema),
    defaultValues: {
      firstname: '',
      lastname: '',
      email: '',
      message: '',
      consent: false,
    },
  })

  async function onSubmit(data: z.infer<typeof kontaktSchema>) {
    const res = await fetch('/api/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (res.ok) {
      form.reset()
      alert('Ditt meddelande har skickats!')
    } else {
      alert('Något gick fel, försök igen senare.')
    }
  }

  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-50 py-24 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl w-full"
      >
        {/* Info-sektion */}
        <div className="space-y-6 hidden md:block py-8">
          <h1 className="text-4xl font-bold text-black">Kontakta oss</h1>
          <p className="text-gray-700">Har du frågor eller funderingar? Fyll i formuläret nedan så återkommer vi så snart som möjligt.</p>
          
          <div className="flex items-center gap-3">
            <img src="/mail.png" alt="E-post" className="w-8 h-8 rounded-full border-4 border-gray-200 shadow-md" />
            <a href="mailto:info@nordiskdev.se" className="font-semibold text-[var(--accent)] underline">info@nordiskdev.se</a>
          </div>

          <div className="flex items-center gap-3">
            <img src="/phone-call.png" alt="Telefon" className="w-8 h-8 rounded-full border-4 border-gray-200 shadow-md" />
            <span className="font-semibold text-gray-800">+46-xxxxxxxxx</span>
          </div>

          <p className="text-gray-500 mt-2">Vi ser fram emot att höra från dig!</p>
        </div>

        {/* Formulär-sektion */}
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-center text-black mb-6">Kontaktformulär</h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Förnamn</FormLabel>
                      <FormControl>
                        <Input placeholder="Ditt förnamn" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Efternamn</FormLabel>
                      <FormControl>
                        <Input placeholder="Ditt efternamn" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-post</FormLabel>
                    <FormControl>
                      <Input placeholder="Din e-postadress" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Meddelande</FormLabel>
                    <FormControl>
                      <textarea
                        placeholder="Ditt meddelande"
                        {...field}
                        rows={5}
                        className="w-full rounded-md border border-gray-300 focus:border-amber-400 p-3 resize-none"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="consent"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={field.onChange}
                        className="h-4 w-4 text-amber-600 border-gray-300 rounded focus:ring-amber-500"
                      />
                    </FormControl>
                    <FormLabel>Jag godkänner lagring av mina uppgifter</FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormDescription className="text-gray-500 text-sm">
                Jag har läst och förstått Nordiskdevs <a href="/privacy-policy" className="text-[var(--accent)] underline">integritetspolicy</a> och samtycker till insamling och användning av mina personuppgifter enligt beskrivningen däri.
              </FormDescription>

              <Button type="submit" className="w-full bg-[var(--accent)] hover:bg-[#DEB841] hover:cursor-pointer text-white text-lg font-semibold py-2 rounded-lg transition">
                Skicka
              </Button>
            </form>
          </Form>
        </div>
      </motion.div>
    </div>
  )
}
