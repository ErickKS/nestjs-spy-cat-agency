'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'
import { useCreateCat } from '@/hooks/hooks'
import { Label } from '@radix-ui/react-label'
import { Input } from './ui/input'
import { toast } from 'sonner'
import { Button } from './ui/button'

const schema = z.object({
  name: z.string().min(2),
  yearsOfExperience: z.coerce.number().int().nonnegative(),
  breed: z.string().min(2),
  salary: z.coerce.number().positive()
})
type FormData = z.infer<typeof schema>

export default function SpyCatForm() {
  const { mutate, isPending, error } = useCreateCat()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  function handleFormSubmit(data: FormData) {
    mutate(data, {
      onSuccess: () => reset(),
      onError: (e) => toast.error("Error creating new spy cat", {
        description: e.message,
        position: 'top-center'
      })
    })
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className='space-y-4'>
      <div className="space-y-5 mb-6">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="name">Name</Label>
          <Input id="name" {...register("name")} />
          {errors.name && <span className="text-sm text-destructive font-medium">{errors.name.message}</span>}
        </div>

        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="yearsOfExperience">Years of Exp</Label>
          <Input id="yearsOfExperience" type="number" {...register("yearsOfExperience")} />
          {errors.yearsOfExperience && <span className="text-sm text-destructive font-medium">{errors.yearsOfExperience.message}</span>}
        </div>

        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="breed">Breed</Label>
          <Input id="breed" type="text" {...register("breed")} />
          {errors.breed && <span className="text-sm text-destructive font-medium">{errors.breed.message}</span>}
        </div>

        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="salary">Salary</Label>
          <Input id="salary" type="number" {...register("salary")} />
          {errors.salary && <span className="text-sm text-destructive font-medium">{errors.salary.message}</span>}
        </div>
      </div>

      <Button type="submit" disabled={isPending}>Create</Button>
    </form>
  )
}