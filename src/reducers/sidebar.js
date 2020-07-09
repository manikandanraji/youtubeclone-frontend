import { OPEN_SIDEBAR, CLOSE_SIDEBAR } from "../actions/types";

const sidebar = (state = false, action) => {
  switch (action.type) {
    case OPEN_SIDEBAR:
      return true;
    case CLOSE_SIDEBAR:
      return false;
    default:
      return state;
  }
};

export default sidebar;
