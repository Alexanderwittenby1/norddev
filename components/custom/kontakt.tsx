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



const kontaktSchema = z.object({
  name: z.string().min(1, 'Du måste ange ett namn').max(50, 'Namnet får inte vara längre än 50 tecken'),
  email: z.string().email('Epostadressen är ogiltig').min(1, 'E-postadress är obligatorisk'),
  message: z.string().min(1, 'Meddelande är obligatoriskt'),
})

export function KontaktForm() {
  const form = useForm<z.infer<typeof kontaktSchema>>({
    resolver: zodResolver(kontaktSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  async function onSubmit(data: z.infer<typeof kontaktSchema>) {
    const res = await fetch('/api/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      console.log('Formuläret skickat:', data);
      form.reset();
      alert('Ditt meddelande har skickats!');
    }
    else {
      alert('Något gick fel, försök igen senare.');
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br  py-8">
      <div className="w-full max-w-lg bg-white/90 rounded-2xl shadow-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-black mb-6">Kontakta oss</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField 
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black">Namn</FormLabel>
                  <FormControl>
                    <Input placeholder="Ditt namn" {...field} className="bg-green-50 focus:bg-white" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black">E-post</FormLabel>
                  <FormControl>
                    <Input placeholder="Din e-postadress" {...field} className="bg-green-50 focus:bg-white" />
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
                  <FormLabel className="text-black">Meddelande</FormLabel>
                  <FormControl>
                    <textarea
                      placeholder="Ditt meddelande"
                      {...field}
                      rows={5}
                      className="w-full rounded-md border bg-green-50 focus:bg-white focus:border-amber-400 p-3 resize-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full bg-amber-900 hover:bg-amber-800 text-white text-lg font-semibold py-2 rounded-lg transition cursor-pointer">
              Skicka
            </Button>
            <FormDescription className="text-center text-gray-500">
              Fyll i formuläret ovan för att skicka ett meddelande.
            </FormDescription>
          </form>
        </Form>
      </div>
    </div>
  );
}