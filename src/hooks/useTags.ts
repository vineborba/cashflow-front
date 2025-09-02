import { tagsService } from "@app/services/tags.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useTags = () => {
  const queryClient = useQueryClient();

  const {
    data = [],
    isLoading,
    error: loadError,
    refetch,
  } = useQuery({
    queryKey: ["tags"],
    queryFn: tagsService.listTags,
  });

  const { mutateAsync: createTag, error: createError } = useMutation({
    mutationFn: tagsService.createTag,
    onSuccess: (data) => {
      queryClient.setQueryData<Tag[]>(["tags"], (state) => {
        if (!state) return [data];

        return [...state, data];
      });
    },
  });

  const { mutateAsync: deleteTag, error: deleteError } = useMutation({
    mutationFn: tagsService.deleteTag,
    onSuccess: (_, deletedId) => {
      queryClient.setQueryData<Tag[]>(["tags"], (state) => {
        if (!state) return [];

        return state.filter((tag) => tag.id !== deletedId);
      });
    },
  });

  return {
    tags: data,
    deleteTag,
    createTag,
    refetchTags: refetch,
    isLoadingTags: isLoading,
    tagsLoadError: loadError,
    createTagError: createError,
    deleteTagError: deleteError,
  };
};
