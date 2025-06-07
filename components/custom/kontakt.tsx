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
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br py-8 ">
      <div className="flex flex-col-reverse md:flex-row gap-8 items-center w-full max-w-5xl">
        <div className="text-black  px-6 py-4 max-w-[600px]">
          <h1 className="text-4xl font-bold mb-4">Kontakta oss</h1>
          <p className="text-gray-700 mb-2">Har du frågor eller funderingar? Fyll i formuläret nedan så återkommer vi så snart som möjligt.</p>
          <div className="flex items-center gap-2 mb-2">
            <img
              src="/mail.png"
              alt="NordDev Logo"
              className="w-7 h-7 rounded-full border-4 border-gray-200 shadow-md select-none"
            />
            <a href="mailto:info@nordiskdev.se" className="font-semibold underline-none">
              info@nordiskdev.se
            </a>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <img
              src="/phone-call.png"
              alt="NordDev Logo"
              className="w-7 h-7 rounded-full border-4 border-gray-200 shadow-md select-none"
            />
            <a href="#" className="font-semibold underline-none">
              +46-xxxxxxxxx
            </a>
          </div>
          <p className="text-gray-500 mt-2">Vi ser fram emot att höra från dig!</p>
        </div>
        <div className="w-full max-w-lg bg-white/90  p-8">
        <h2 className="text-3xl font-bold text-center text-black mb-6">Kontaktformulär</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField 
              control={form.control}
              name="firstname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black">Förnamn</FormLabel>
                  <FormControl>
                    <Input placeholder="Ditt förnamn" {...field} className=" focus:bg-white" />
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
                  <FormLabel className="text-black">Efternamn</FormLabel>
                  <FormControl>
                    <Input placeholder="Ditt efternamn" {...field} className=" focus:bg-white" />
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
                    <Input placeholder="Din e-postadress" {...field} className=" focus:bg-white" />
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
                      className="w-full rounded-md border focus:bg-white focus:border-amber-400 p-3 resize-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full bg-amber-900 hover:bg-amber-800 text-white text-lg font-semibold py-2 rounded-lg transition cursor-pointer">
              Skicka
              <FormMessage/>
            </Button>
            <FormField
              control={form.control}
              name="consent"
              render={({ field }) => (
                <>
                  <FormItem className="flex items-center">
                    <FormControl>
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        name={field.name}
                        ref={field.ref}
                        className="mr-2 h-4 w-4 text-amber-600 border-gray-300 rounded focus:ring-amber-500"
                      />
                    </FormControl>
                    <FormLabel className="text-black">
                      Jag godkänner lagring av mina uppgifter
                    </FormLabel>
                    <FormMessage />
                  </FormItem>
                  <FormDescription className="text-left text-gray-500">
                    Jag har läst och förstått Nordiskdevs <a href="/privacy-policy" className='text-red-800'>integritetspolicy</a> och samtycker till insamling och användning av mina personuppgifter enligt beskrivningen däri.
                  </FormDescription>
                </>
              )}
            />
          </form>
        </Form>
      </div>
    </div>
    </div>
  );
}