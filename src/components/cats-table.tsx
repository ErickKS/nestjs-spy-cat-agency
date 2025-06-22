'use client'

import { useCats, useDeleteCat, useUpdateSalary } from '@/hooks/hooks'
import { useState } from 'react'

export default function SpyCatTable() {
  const { data } = useCats()
  const { mutate: remove } = useDeleteCat()
  const { mutate: update } = useUpdateSalary()
  const [editing, setEditing] = useState<string | null>(null)
  const [value, setValue] = useState<number>(0)

  if (!data) return <p>loading...</p>

  return (
    <table>
      <thead>
        <tr>
          <th>name</th><th>exp</th><th>breed</th><th>salary</th><th>actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map(cat => (
          <tr key={cat.id}>
            <td>{cat.name}</td>
            <td>{cat.yearsOfExperience}</td>
            <td>{cat.breed}</td>
            <td>
              {editing === cat.id
                ? (
                  <>
                    <input
                      type='number'
                      value={value}
                      onChange={e => setValue(Number(e.target.value))}
                      className='w-20'
                    />
                    <button onClick={() => { update({ id: cat.id, salary: value }); setEditing(null) }}>💾</button>
                  </>
                )
                : (
                  <>
                    {cat.salary}
                    <button onClick={() => { setEditing(cat.id); setValue(cat.salary) }}>✏️</button>
                  </>
                )}
            </td>
            <td><button onClick={() => remove(cat.id)}>🗑️</button></td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
