'use client'

import { useCats, useDeleteCat, useUpdateSalary } from '@/hooks/hooks'
import { useState } from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from './ui/input'
import { Button } from './ui/button'

export default function SpyCatTable() {
  const { data } = useCats()

  const { mutate: remove } = useDeleteCat()
  const { mutate: update } = useUpdateSalary()
  const [editing, setEditing] = useState<string | null>(null)
  const [value, setValue] = useState<number>(0)

  if (!data) return <p>loading...</p>

  return (
    <Table>
      <TableCaption>😼 Spy Cats 😼</TableCaption>

      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead className='w-[120px]'>Experience</TableHead>
          <TableHead>Breed</TableHead>
          <TableHead className='w-[240px] text-right'>Salary</TableHead>
          <TableHead className='w-[140px] text-center'>Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {data.map(cat => (
          <TableRow key={cat.id}>
            <TableCell className='font-medium'>{cat.name}</TableCell>
            <TableCell>{cat.yearsOfExperience} yrs</TableCell>
            <TableCell>{cat.breed}</TableCell>

            <TableCell className='text-right'>
              {editing === cat.id ? (
                <Input
                  type='number'
                  value={value}
                  onChange={e => setValue(Number(e.target.value))}
                  className='w-24 h-8 ml-auto'
                />
              ) : (
                cat.salary.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
              )}
            </TableCell>

            <TableCell className='flex justify-center gap-2'>
              {editing === cat.id ? (
                <>
                  <Button size={'sm'} onClick={() => { update({ id: cat.id, salary: value }); setEditing(null) }}>Save</Button>
                  <Button size={'sm'} variant={'destructive'} onClick={() => setEditing(null)}>Cancel</Button>
                </>
              ) : (
                <>
                  <Button size={'sm'} variant={'outline'} onClick={() => { setEditing(cat.id); setValue(cat.salary) }}>Edit</Button>
                  <Button size={'sm'} variant={'destructive'} onClick={() => remove(cat.id)}>Delete</Button>
                </>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
