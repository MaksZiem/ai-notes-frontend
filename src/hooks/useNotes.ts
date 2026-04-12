import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../api/client";

export function useNotes() {
  const queryClient = useQueryClient()

  const notes = useQuery({
    queryKey: ['notes'],
    queryFn: async () => {
      const {data} = await api.get('/notes')
      return data
    }
  })

  const createNote = useMutation({
    mutationFn: (body: {title: string, content: string}) => 
      api.post('/notes', body),
    onSuccess: ()  => queryClient.invalidateQueries({queryKey: ['notes']})
  })

  const deleteNote = useMutation({
    mutationFn: (id: number) => api.delete(`/notes/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['notes'] }),
  })

  return {notes, createNote, deleteNote}
}