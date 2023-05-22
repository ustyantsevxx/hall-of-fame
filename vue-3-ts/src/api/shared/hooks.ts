import { cloneDeep, merge } from 'lodash-es'
import { useMutation, useQueryClient } from 'vue-query'

export type UseCreateMutationParams<T> = {
  itemsQueryKey: string | unknown[]
  mutationFn: (createDto: T) => any | Promise<any>
  addItemFn?: (items: T[], createDto: T) => T[]
  prepend?: boolean
}

export type UseUpdateMutationParams<T, TDto> = {
  itemsQueryKey: string | unknown[]
  mutationFn: (updateDto: TDto) => any | Promise<any>
  compareFn: (item: T, dto: TDto) => boolean
}

export type UseDeleteMutationParams<T, TDto> = UseUpdateMutationParams<T, TDto>

export const useCreateMutation = <T>({
  itemsQueryKey,
  mutationFn,
  addItemFn,
  prepend
}: UseCreateMutationParams<T>) => {
  const queryClient = useQueryClient()

  return useMutation(mutationFn, {
    onMutate: (createDto: T) => {
      const cachedItemsCopy = cloneDeep(
        queryClient.getQueryData(itemsQueryKey)
      ) as T[]

      let updatedItems: T[]

      if (prepend) {
        updatedItems = [createDto, ...cachedItemsCopy]
      } else if (addItemFn) {
        updatedItems = addItemFn(cachedItemsCopy, createDto)
      } else {
        updatedItems = [...cachedItemsCopy, createDto]
      }

      queryClient.setQueryData(itemsQueryKey, updatedItems)
    },
    onSettled: () => queryClient.invalidateQueries(itemsQueryKey)
  })
}

export const useUpdateMutation = <T, TDto>({
  itemsQueryKey,
  mutationFn,
  compareFn
}: UseUpdateMutationParams<T, TDto>) => {
  const queryClient = useQueryClient()

  return useMutation(mutationFn, {
    onMutate: async (updateDto: TDto) => {
      const cachedItems = queryClient.getQueryData(itemsQueryKey) as T[]
      const cachedItemsCopy = cloneDeep(cachedItems)
      const index = cachedItemsCopy.findIndex(item =>
        compareFn(item, updateDto)
      )

      if (index !== -1) {
        cachedItemsCopy[index] = merge(cachedItemsCopy[index], updateDto)
        queryClient.setQueryData(itemsQueryKey, cachedItemsCopy)
      }

      return () => queryClient.setQueryData(itemsQueryKey, cachedItems)
    },
    onSettled: () => queryClient.invalidateQueries(itemsQueryKey)
  })
}

export const useDeleteMutation = <T, TDto>({
  compareFn,
  itemsQueryKey,
  mutationFn
}: UseUpdateMutationParams<T, TDto>) => {
  const queryClient = useQueryClient()

  return useMutation(mutationFn, {
    onMutate: async (dto: TDto) => {
      const cachedItems = queryClient.getQueryData(itemsQueryKey) as T[]
      const updatedItems = cachedItems.filter(item => compareFn(item, dto))
      queryClient.setQueryData(itemsQueryKey, updatedItems)
      return () => queryClient.setQueryData(itemsQueryKey, cachedItems)
    },
    onSettled: () => queryClient.invalidateQueries(itemsQueryKey)
  })
}
