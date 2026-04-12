import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { z } from 'zod'

export function useFormWithMutation<T extends z.ZodTypeAny>(
  schema: T,
  mutationFn: (values: z.infer<T>) => Promise<unknown>,
  options?: {
    onSuccess?: () => void
    onError?: (error: unknown) => void
  }
) {
  type FormValues = z.infer<T>

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
  })

  const mutation = useMutation({
    mutationFn,
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  })

  const onSubmit = form.handleSubmit((values) => mutation.mutate(values))

  return {
    form,
    onSubmit,
    isLoading: mutation.isPending,
    error: mutation.error,
  }
}