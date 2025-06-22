'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'
import { useCreateCat } from '@/hooks/hooks'
import { useEffect } from 'react'
import { api } from '@/lib/api'

const schema = z.object({
  name: z.string().min(2),
  yearsOfExperience: z.number().int().nonnegative(),
  breed: z.string().min(2),
  salary: z.number().positive()
})
type FormData = z.infer<typeof schema>

export default function SpyCatForm() {
  const { mutate, isPending, error } = useCreateCat()
  const { register, handleSubmit, reset, formState } = useForm<FormData>({
    resolver: zodResolver(schema)
  })

  const onSubmit = (data: FormData) => {
    mutate(data, {
      onSuccess: () => reset()
    })
  }

  async function fetchCats() {
    const response = await api.get('/cats')
    console.log(response.data)
    return response.data
  }

  useEffect(() => {
    const response = fetchCats()
  }, [])


  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
      <input placeholder='Name' {...register('name')} />
      <input type='number' placeholder='Years of Exp' {...register('yearsOfExperience', { valueAsNumber: true })} />
      <input placeholder='Breed' {...register('breed')} />
      <input type='number' placeholder='Salary' {...register('salary', { valueAsNumber: true })} />

      <button disabled={isPending}>add</button>
      {error && <p className='text-red-500'>{String(error)}</p>}
    </form>
  )
}