import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/lib/api'
import { SpyCat } from '@/@types/spy-cat'

export const toSpyCat = (raw: any): SpyCat => ({
  id: raw.id,
  name: raw.name,
  yearsOfExperience: raw.years_experience,
  breed: raw.breed,
  salary: raw.salary
})

export const useCats = () =>
  useQuery<SpyCat[]>({
    queryKey: ['cats'],
    queryFn: async () => {
      const res = await api.get('/cats')
      console.log(res)
      return res.data.map(toSpyCat)
    },
  })

export const useCreateCat = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (cat: Omit<SpyCat, 'id'>) => {
      const payload = {
        name: cat.name,
        years_experience: cat.yearsOfExperience,
        breed: cat.breed,
        salary: cat.salary
      }
      await api.post('/cats', payload)
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['cats'] })
  })
}

export const useUpdateSalary = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async ({ id, salary }: { id: string; salary: number }) =>
      api.patch(`/cats/${id}`, { salary }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['cats'] })
  })
}

export const useDeleteCat = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (id: string) => api.delete(`/cats/${id}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['cats'] })
  })
}
