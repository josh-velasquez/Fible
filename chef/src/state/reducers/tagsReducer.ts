import { TagsActionType } from "../action-types";
import { TagsAction } from "../actions";

interface TagsState {
  loading: boolean;
  error: string | null;
  tags: string[] | null;
}

const initialState = {
  loading: false,
  error: null,
  tags: null,
};

const tagsReducer = (
  state: TagsState = initialState,
  action: TagsAction
): TagsState => {
  switch (action.type) {
    case TagsActionType.REQUEST_TAGS_API:
      return { loading: true, error: null, tags: null };
    case TagsActionType.REQUEST_TAGS_API_SUCCESS:
      return { loading: false, error: null, tags: action.payload };
    case TagsActionType.REQUEST_TAGS_API_ERROR:
      return { loading: false, error: action.payload, tags: null };

    default:
      return state;
  }
};

export default tagsReducer;
